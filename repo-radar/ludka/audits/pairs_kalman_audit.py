#!/usr/bin/env python3
"""Independent audit of maxstw23/pairs-trading Kalman headline.

Reproduces the author's five published pairs and Kalman signals, then compares:
1) the repository's residual-difference PnL accounting;
2) a self-financing price-PnL accounting where changing alpha/beta is NOT profit;
3) the same corrected accounting plus an incremental cost for re-hedging beta while a position stays open.

The goal is not to propose a trading strategy. It isolates whether the reported
Sharpe can be created by revaluing yesterday's position with today's fitted model.
"""
from __future__ import annotations

import json
import math
from pathlib import Path

import numpy as np
import pandas as pd
import yfinance as yf

OUT = Path("audit-out-pairs")
OUT.mkdir(exist_ok=True)

PAIRS = [("V", "MA"), ("KO", "PEP"), ("COST", "LOW"), ("COP", "MPC"), ("BAC", "PNC")]
TICKERS = sorted({x for p in PAIRS for x in p})
START = "2015-01-01"
END = "2026-03-31"
TEST_START = pd.Timestamp("2023-01-01")
DELTA = 1e-4
TC = 5.0 / 10_000.0


def fetch_prices() -> pd.DataFrame:
    raw = yf.download(TICKERS, start=START, end=END, auto_adjust=True, progress=False)
    if isinstance(raw.columns, pd.MultiIndex):
        px = raw["Close"].copy()
    else:
        px = raw[["Close"]].copy()
    px = px[TICKERS].ffill().dropna()
    if len(px) < 2500:
        raise RuntimeError(f"too few price rows: {len(px)}")
    return px


def kalman_filter(y1: pd.Series, y2: pd.Series, delta: float = DELTA) -> pd.DataFrame:
    n = len(y1)
    y1v, y2v = y1.to_numpy(float), y2.to_numpy(float)
    warm = 60
    Y = y1v[:warm]
    X = np.column_stack([np.ones(warm), y2v[:warm]])
    theta, *_ = np.linalg.lstsq(X, Y, rcond=None)
    residuals = Y - X @ theta
    R = max(float(np.var(residuals, ddof=2)), 1e-8)
    Q = delta / (1 - delta) * np.eye(2)
    P = np.eye(2)

    alpha = np.full(n, np.nan)
    beta = np.full(n, np.nan)
    z = np.full(n, np.nan)

    for t in range(warm, n):
        H = np.array([1.0, y2v[t]])
        P_pred = P + Q
        e = y1v[t] - H @ theta
        S = float(H @ P_pred @ H) + R
        K = P_pred @ H / S
        theta = theta + K * e
        P = (np.eye(2) - np.outer(K, H)) @ P_pred
        alpha[t], beta[t] = theta
        z[t] = e / math.sqrt(S)

    return pd.DataFrame({"alpha": alpha, "beta": beta, "zscore": z}, index=y1.index)


def signals(kf: pd.DataFrame, entry=2.0, exit=0.5, stop=3.5) -> pd.Series:
    z = kf["zscore"]
    pos = pd.Series(0.0, index=kf.index)
    in_trade = False
    cur = 0.0
    for i in range(1, len(z)):
        zv = z.iloc[i]
        if pd.isna(zv):
            cur = 0.0
            in_trade = False
        elif not in_trade:
            if zv < -entry:
                cur, in_trade = 1.0, True
            elif zv > entry:
                cur, in_trade = -1.0, True
        else:
            if abs(zv) < exit or abs(zv) > stop:
                cur, in_trade = 0.0, False
        if i + 1 < len(pos):
            pos.iloc[i + 1] = cur
    return pos


def original_returns(prices, kf, pos, a, b):
    beta = kf["beta"].shift(1)
    alpha = kf["alpha"].shift(1)
    spread = prices[a] - alpha - beta * prices[b]
    capital = prices[a].abs() + beta.abs() * prices[b].abs()
    spread_ret = spread.diff() / capital.shift(1).clip(lower=1e-8)
    gross = pos * spread_ret
    cost = pos.diff().abs() * TC * 2
    return (gross - cost).fillna(0.0)


def corrected_returns(prices, kf, pos, a, b, add_beta_rehedge_cost: bool):
    """Self-financing PnL: only asset-price moves generate profit.

    beta_known[t] is yesterday's fitted beta and is therefore available before
    the t return interval. alpha never appears in PnL because it is not tradable.
    The base cost deliberately keeps the author's entry/exit cost convention so
    the first correction isolates only the PnL-accounting defect.
    """
    beta_known = kf["beta"].shift(1)
    p1, p2 = prices[a], prices[b]
    d1, d2 = p1.diff(), p2.diff()
    capital = p1.shift(1).abs() + beta_known.abs() * p2.shift(1).abs()
    price_pnl = d1 - beta_known * d2
    gross = pos * price_pnl / capital.clip(lower=1e-8)

    base_cost = pos.diff().abs() * TC * 2
    extra = pd.Series(0.0, index=pos.index)
    if add_beta_rehedge_cost:
        # When the same spread position remains open, a changing beta requires
        # buying/selling the second leg. The original backtest charges nothing
        # for that turnover. Charge it incrementally on top of the author's base
        # entry/exit cost so this sensitivity can only reduce returns.
        same_active = (pos == pos.shift(1)) & (pos != 0)
        delta_beta = (beta_known - beta_known.shift(1)).abs()
        rehedge_notional = delta_beta * p2.shift(1).abs()
        extra = (TC * rehedge_notional / capital.clip(lower=1e-8)).where(same_active, 0.0)

    return (gross - base_cost - extra).fillna(0.0)


def phantom_component(prices, kf, pos, a, b):
    """The model-state revaluation embedded in original spread.diff()."""
    beta = kf["beta"].shift(1)
    alpha = kf["alpha"].shift(1)
    dbeta = beta.diff()
    dalpha = alpha.diff()
    capital = prices[a].shift(1).abs() + beta.abs() * prices[b].shift(1).abs()
    phantom = pos * (-(dalpha) - dbeta * prices[b].shift(1)) / capital.clip(lower=1e-8)
    return phantom.fillna(0.0)


def metrics(r: pd.Series) -> dict:
    r = r.fillna(0.0)
    n = len(r)
    sd = float(r.std(ddof=1))
    sh = float(r.mean()) / sd * math.sqrt(252) if sd > 0 else 0.0
    eq = (1 + r).cumprod()
    total = float(eq.iloc[-1] - 1)
    ann = (1 + total) ** (252 / n) - 1 if n else 0.0
    dd = float((eq / eq.cummax() - 1).min())
    return {"total_return": total, "annualized_return": ann, "sharpe": sh, "max_drawdown": dd,
            "nonzero_days": int((r != 0).sum())}


def main():
    px = fetch_prices()
    pair_rows = []
    orig_df, corr_df, corr_turn_df, phantom_df = {}, {}, {}, {}

    for a, b in PAIRS:
        kf = kalman_filter(px[a], px[b])
        pos = signals(kf)
        o = original_returns(px, kf, pos, a, b).loc[TEST_START:]
        c = corrected_returns(px, kf, pos, a, b, False).loc[TEST_START:]
        ct = corrected_returns(px, kf, pos, a, b, True).loc[TEST_START:]
        ph = phantom_component(px, kf, pos, a, b).loc[TEST_START:]
        key = f"{a}/{b}"
        orig_df[key], corr_df[key], corr_turn_df[key], phantom_df[key] = o, c, ct, ph
        row = {"pair": key, "original": metrics(o), "corrected_same_cost": metrics(c),
               "corrected_plus_beta_rehedge": metrics(ct),
               "phantom_sum": float(ph.sum()),
               "original_minus_corrected_sum": float((o-c).sum())}
        pair_rows.append(row)

    def portfolio(d):
        return pd.DataFrame(d).mean(axis=1)

    po, pc, pct, pph = portfolio(orig_df), portfolio(corr_df), portfolio(corr_turn_df), portfolio(phantom_df)
    result = {
        "data_rows": len(px), "first_date": str(px.index.min().date()), "last_date": str(px.index.max().date()),
        "pairs": pair_rows,
        "portfolio": {
            "original": metrics(po),
            "corrected_same_cost": metrics(pc),
            "corrected_plus_beta_rehedge": metrics(pct),
            "phantom_sum": float(pph.sum()),
            "original_minus_corrected_sum": float((po-pc).sum()),
        }
    }
    (OUT / "result.json").write_text(json.dumps(result, indent=2), encoding="utf-8")

    lines = ["# Independent Kalman PnL audit", "",
             f"Data: {result['first_date']} -> {result['last_date']} ({result['data_rows']} rows)", "",
             "| Pair | Original Sharpe | Corrected Sharpe | Corrected + beta rehedge | Original total | Corrected total |",
             "|---|---:|---:|---:|---:|---:|"]
    for r in pair_rows:
        lines.append(f"| {r['pair']} | {r['original']['sharpe']:.3f} | {r['corrected_same_cost']['sharpe']:.3f} | {r['corrected_plus_beta_rehedge']['sharpe']:.3f} | {r['original']['total_return']:.2%} | {r['corrected_same_cost']['total_return']:.2%} |")
    P=result['portfolio']
    lines += ["", "## Portfolio", "",
              f"- Original formula: Sharpe **{P['original']['sharpe']:.3f}**, total **{P['original']['total_return']:.2%}**, maxDD **{P['original']['max_drawdown']:.2%}**",
              f"- Correct self-financing PnL, same entry/exit cost convention: Sharpe **{P['corrected_same_cost']['sharpe']:.3f}**, total **{P['corrected_same_cost']['total_return']:.2%}**, maxDD **{P['corrected_same_cost']['max_drawdown']:.2%}**",
              f"- Same corrected PnL + incremental beta-rehedge cost: Sharpe **{P['corrected_plus_beta_rehedge']['sharpe']:.3f}**, total **{P['corrected_plus_beta_rehedge']['total_return']:.2%}**, maxDD **{P['corrected_plus_beta_rehedge']['max_drawdown']:.2%}**",
              f"- Sum of explicit model-state 'phantom' component (portfolio daily-return units): **{P['phantom_sum']:.6f}**",
              "", "Interpretation: changing fitted alpha/beta is not a cash flow. If the original headline collapses under self-financing accounting, the Kalman filter did not create trading alpha; the backtest was monetizing model re-fitting."]
    report="\n".join(lines)+"\n"
    (OUT / "report.md").write_text(report, encoding="utf-8")
    print(report)

if __name__ == "__main__":
    main()
