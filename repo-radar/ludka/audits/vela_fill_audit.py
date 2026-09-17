#!/usr/bin/env python3
"""Independent adversarial audit of routsiddharth/vela fill_calibration_btc.parquet.

No Vela runtime DB is used. The committed derived parquet is downloaded from a
pinned Vela commit. For all order attempts we independently fetch final Kalshi
market outcomes from the public API, so filled and unfilled rows are evaluated on
the same realised-outcome basis.

Outputs:
  audit_report.json
  audit_report.md
  kalshi_outcomes.json
"""
from __future__ import annotations

import hashlib
import json
import math
import os
import statistics
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import numpy as np
import pandas as pd
import requests

VELA_COMMIT = "ecade821de06c98a6e025229c5554404236345e1"
PARQUET_URL = (
    "https://raw.githubusercontent.com/routsiddharth/vela/"
    f"{VELA_COMMIT}/analysis/data/fill_calibration_btc.parquet"
)
EXPECTED_BLOB_SHA = "857809c596a4b008da200a7d73946ad6c2f4abe5"
OUT = Path(os.environ.get("AUDIT_OUT", ".")).resolve()
OUT.mkdir(parents=True, exist_ok=True)
PARQUET = OUT / "fill_calibration_btc.parquet"

API_HOSTS = [
    "https://api.elections.kalshi.com/trade-api/v2",
    "https://api.kalshi.com/trade-api/v2",
    "https://external-api.kalshi.com/trade-api/v2",
]


def download() -> bytes:
    r = requests.get(PARQUET_URL, timeout=60)
    r.raise_for_status()
    PARQUET.write_bytes(r.content)
    return r.content


def kalshi_host(sample_ticker: str) -> str | None:
    for host in API_HOSTS:
        try:
            r = requests.get(f"{host}/markets/{sample_ticker}", timeout=15)
            if r.status_code == 200:
                obj = r.json()
                if isinstance(obj, dict) and ("market" in obj or "ticker" in obj):
                    return host
        except Exception:
            pass
    return None


def fetch_one(session: requests.Session, host: str, ticker: str) -> dict:
    url = f"{host}/markets/{ticker}"
    last = None
    for attempt in range(5):
        try:
            r = session.get(url, timeout=20)
            last = r.status_code
            if r.status_code == 200:
                obj = r.json()
                m = obj.get("market", obj)
                return {
                    "ok": True,
                    "ticker": ticker,
                    "result": str(m.get("result") or "").lower() or None,
                    "status": m.get("status"),
                    "expiration_value": m.get("expiration_value"),
                    "close_time": m.get("close_time"),
                    "settlement_timer_seconds": m.get("settlement_timer_seconds"),
                }
            if r.status_code in (429, 500, 502, 503, 504):
                time.sleep(min(0.75 * (2 ** attempt), 8))
                continue
            return {"ok": False, "ticker": ticker, "http": r.status_code}
        except Exception as e:
            if attempt == 4:
                return {"ok": False, "ticker": ticker, "error": repr(e), "http": last}
            time.sleep(min(0.5 * (2 ** attempt), 5))
    return {"ok": False, "ticker": ticker, "http": last}


def exact_binom_tail(n: int, p: float, k: int, upper: bool = True) -> float:
    # stable enough for n<=1034. Computes P[X>=k] or P[X<=k].
    vals = []
    rng = range(k, n + 1) if upper else range(0, k + 1)
    for i in rng:
        logp = (
            math.lgamma(n + 1) - math.lgamma(i + 1) - math.lgamma(n - i + 1)
            + i * math.log(p) + (n - i) * math.log1p(-p)
        )
        vals.append(math.exp(logp))
    return min(1.0, float(sum(vals)))


def poisson_binom_loss_tail(ps_win: np.ndarray, observed_losses: int) -> float:
    # DP distribution for X = number of losses with individual q_i=1-p_i.
    dist = np.array([1.0])
    for p in ps_win:
        q = 1.0 - float(p)
        nxt = np.zeros(len(dist) + 1)
        nxt[:-1] += dist * (1.0 - q)
        nxt[1:] += dist * q
        dist = nxt
    return float(dist[observed_losses:].sum())


def two_prop_z(k1, n1, k2, n2):
    if min(n1, n2) <= 0:
        return None
    p1, p2 = k1 / n1, k2 / n2
    pool = (k1 + k2) / (n1 + n2)
    se = math.sqrt(max(1e-30, pool * (1 - pool) * (1 / n1 + 1 / n2)))
    z = (p1 - p2) / se
    # two-sided normal p-value
    pval = math.erfc(abs(z) / math.sqrt(2))
    return {"z": z, "p_two_sided": pval, "diff": p1 - p2, "p1": p1, "p2": p2}


def wilson(k, n, z=1.959963984540054):
    if n == 0:
        return [None, None]
    p = k / n
    d = 1 + z*z/n
    c = (p + z*z/(2*n))/d
    h = z*math.sqrt(p*(1-p)/n + z*z/(4*n*n))/d
    return [c-h, c+h]


def infer_fill_qty(row, max_q=100):
    """Infer qty only when one-price/one-fee settlement is consistent.

    This is diagnostic, not ground truth. A live order may receive multiple partial
    fills/prices/fee_cost rows, so mismatches are expected and informative.
    """
    if not row.filled or pd.isna(row.fill_px) or pd.isna(row.net_pnl) or pd.isna(row.won):
        return None
    p = float(row.fill_px)
    target = float(row.net_pnl)
    best = None
    cap = max(max_q, int(math.ceil(float(row.contracts) if not pd.isna(row.contracts) else 1)))
    for q in range(1, cap + 1):
        fee = math.ceil(0.0175 * q * p * (1-p) * 100 - 1e-12) / 100
        pred = (q * (1-p) if bool(row.won) else -q*p) - fee
        err = abs(pred-target)
        if best is None or err < best[0]:
            best = (err, q, pred, fee)
    return best


def main():
    raw = download()
    df = pd.read_parquet(PARQUET)
    sha256 = hashlib.sha256(raw).hexdigest()

    # Basic integrity and exact reproduction of published step3 summary.
    n = len(df)
    unique = int(df.ticker.nunique())
    dup = int(df.ticker.duplicated().sum())
    filled = df[df.filled == 1].copy()
    unfilled = df[df.filled == 0].copy()
    fl = filled.dropna(subset=["won", "p_side"])
    unfl = unfilled.dropna(subset=["p_side"])

    step3 = {
        "rows": n,
        "unique_tickers": unique,
        "duplicate_tickers": dup,
        "filled": int(df.filled.sum()),
        "fill_rate": float(df.filled.mean()),
        "filled_outcome_rows": len(fl),
        "filled_wins": int(fl.won.sum()),
        "filled_losses": int(len(fl) - fl.won.sum()),
        "realized_win_rate_filled": float(fl.won.mean()),
        "mean_model_p_filled": float(fl.p_side.mean()),
        "mean_model_p_unfilled": float(unfl.p_side.mean()),
        "gap_realized_minus_model_filled": float(fl.won.mean() - fl.p_side.mean()),
        "mean_net_pnl_per_filled_attempt": float(fl.net_pnl.mean()),
        "sum_net_pnl_filled_attempts": float(fl.net_pnl.sum()),
        "mean_submitted_contracts_filled_attempts": float(fl.contracts.mean()),
        "filled_missing_net_pnl": int(filled.net_pnl.isna().sum()),
        "unfilled_nonnull_won": int(unfilled.won.notna().sum()),
        "unfilled_nonnull_net_pnl": int(unfilled.net_pnl.notna().sum()),
    }

    by_regime = {}
    for reg, g in df.groupby("regime", dropna=False):
        by_regime[str(reg)] = {
            "n": len(g), "filled": int(g.filled.sum()), "fill_rate": float(g.filled.mean())
        }

    # Timing/book consistency.
    order_consistency = {
        "filled_fill_px_gt_our_bid": int((filled.fill_px > filled.our_bid + 1e-12).sum()),
        "filled_fill_px_lt_our_bid": int((filled.fill_px < filled.our_bid - 1e-12).sum()),
        "filled_fill_px_eq_our_bid": int(np.isclose(filled.fill_px, filled.our_bid, equal_nan=False).sum()),
        "filled_fill_px_min": float(filled.fill_px.min()),
        "filled_fill_px_max": float(filled.fill_px.max()),
        "our_bid_min": float(df.our_bid.min()),
        "our_bid_max": float(df.our_bid.max()),
        "attempt_ttc_min": float(df.time_to_close.min()),
        "attempt_ttc_max": float(df.time_to_close.max()),
        "attempt_ttc_median": float(df.time_to_close.median()),
        "first_ts_utc": pd.to_datetime(df.ts_ms.min(), unit="ms", utc=True).isoformat(),
        "last_ts_utc": pd.to_datetime(df.ts_ms.max(), unit="ms", utc=True).isoformat(),
    }

    # Calibration of the FILLED subset under the author's model probabilities.
    ps = fl.p_side.to_numpy(float)
    ys = fl.won.to_numpy(float)
    obs_losses = int((1-ys).sum())
    calibration = {
        "expected_losses_sum_1_minus_p": float((1-ps).sum()),
        "observed_losses": obs_losses,
        "poisson_binomial_p_losses_ge_observed": poisson_binom_loss_tail(ps, obs_losses),
        "brier": float(np.mean((ps-ys)**2)),
        "log_loss": float(-np.mean(ys*np.log(np.clip(ps,1e-12,1)) + (1-ys)*np.log(np.clip(1-ps,1e-12,1)))),
        "win_rate_wilson95": wilson(int(ys.sum()), len(ys)),
    }

    # PnL distribution and diagnostic qty inference.
    pnl = {
        "sum": float(fl.net_pnl.sum()),
        "mean": float(fl.net_pnl.mean()),
        "median": float(fl.net_pnl.median()),
        "min": float(fl.net_pnl.min()),
        "max": float(fl.net_pnl.max()),
        "winner_sum": float(fl.loc[fl.won==1, "net_pnl"].sum()),
        "winner_mean": float(fl.loc[fl.won==1, "net_pnl"].mean()),
        "loser_sum": float(fl.loc[fl.won==0, "net_pnl"].sum()),
        "loser_mean": float(fl.loc[fl.won==0, "net_pnl"].mean()),
    }
    inferred = []
    for _, r in fl.iterrows():
        inf = infer_fill_qty(r)
        if inf:
            err, q, pred, fee = inf
            inferred.append({
                "ticker": r.ticker, "submitted": float(r.contracts), "inferred_qty": q,
                "abs_err": err, "pred_net": pred, "reported_net": float(r.net_pnl),
                "first_fill_px": float(r.fill_px), "won": int(r.won), "fee_model": fee,
            })
    exactish = [x for x in inferred if x["abs_err"] <= 0.011]
    qty_diag = {
        "n": len(inferred),
        "single_price_model_matches_within_1p1c": len(exactish),
        "match_fraction": len(exactish)/len(inferred) if inferred else None,
        "partial_fill_inferred_lt_submitted_among_matches": sum(x["inferred_qty"] < x["submitted"] for x in exactish),
        "full_fill_inferred_eq_submitted_among_matches": sum(x["inferred_qty"] == x["submitted"] for x in exactish),
        "rows": sorted(inferred, key=lambda x: -x["abs_err"])[:20],
    }

    # Independent Kalshi outcomes for ALL attempts (filled and unfilled).
    tickers = df.ticker.astype(str).tolist()
    host = kalshi_host(tickers[0])
    outcome_records = {}
    if host:
        # one Session per worker task would be wasteful; requests.Session is not guaranteed
        # thread-safe, so create lightweight sessions inside chunks via thread local-ish call.
        def task(tk):
            s = requests.Session()
            s.headers.update({"User-Agent": "vela-public-audit/1.0"})
            return fetch_one(s, host, tk)
        with ThreadPoolExecutor(max_workers=8) as ex:
            futs = {ex.submit(task, tk): tk for tk in tickers}
            for fut in as_completed(futs):
                rec = fut.result()
                outcome_records[rec["ticker"]] = rec
    else:
        outcome_records = {tk: {"ok": False, "ticker": tk, "error": "no public API host responded"} for tk in tickers}

    (OUT / "kalshi_outcomes.json").write_text(json.dumps(outcome_records, indent=2, sort_keys=True), encoding="utf-8")

    api = pd.DataFrame([v for v in outcome_records.values() if v.get("ok") and v.get("result") in ("yes","no")])
    independent = {"host": host, "covered": len(api), "total": n}
    disagreement_rows = []
    if len(api):
        m = df.merge(api[["ticker","result","status","expiration_value"]], on="ticker", how="left")
        m["api_won"] = np.where(m.result.isin(["yes","no"]), (m.result == m.side).astype(float), np.nan)
        covered = m.dropna(subset=["api_won"])
        cf = covered[covered.filled == 1]
        cu = covered[covered.filled == 0]
        independent.update({
            "filled_covered": len(cf),
            "unfilled_covered": len(cu),
            "filled_api_wins": int(cf.api_won.sum()),
            "filled_api_win_rate": float(cf.api_won.mean()) if len(cf) else None,
            "unfilled_api_wins": int(cu.api_won.sum()),
            "unfilled_api_win_rate": float(cu.api_won.mean()) if len(cu) else None,
            "all_api_win_rate": float(covered.api_won.mean()),
            "filled_api_wilson95": wilson(int(cf.api_won.sum()), len(cf)),
            "unfilled_api_wilson95": wilson(int(cu.api_won.sum()), len(cu)),
        })
        z = two_prop_z(int(cf.api_won.sum()), len(cf), int(cu.api_won.sum()), len(cu))
        independent["filled_vs_unfilled_two_prop_z"] = z
        # Cross-check committed 'won' labels where present.
        chk = cf.dropna(subset=["won"])
        disagreements = chk[chk.won.astype(int) != chk.api_won.astype(int)]
        independent["filled_parquet_vs_api_outcome_disagreements"] = len(disagreements)
        disagreement_rows = disagreements[["ticker","side","won","result","fill_px","net_pnl"]].to_dict("records")
        # Model calibration for BOTH groups against the independent result.
        for tag, g in (("filled", cf), ("unfilled", cu), ("all", covered)):
            gg = g.dropna(subset=["p_side","api_won"])
            if len(gg):
                p = gg.p_side.to_numpy(float); y = gg.api_won.to_numpy(float)
                independent[f"{tag}_model_mean_p"] = float(p.mean())
                independent[f"{tag}_actual_win_rate"] = float(y.mean())
                independent[f"{tag}_brier"] = float(np.mean((p-y)**2))

    report = {
        "source": {"url": PARQUET_URL, "vela_commit": VELA_COMMIT, "github_blob_sha": EXPECTED_BLOB_SHA,
                   "bytes": len(raw), "sha256": sha256},
        "schema": {"columns": list(df.columns), "dtypes": {c: str(t) for c,t in df.dtypes.items()}},
        "step3_reproduction": step3,
        "by_regime": by_regime,
        "order_consistency": order_consistency,
        "filled_model_calibration": calibration,
        "pnl": pnl,
        "qty_inference_diagnostic": qty_diag,
        "independent_kalshi_outcomes": independent,
        "outcome_disagreements": disagreement_rows,
    }
    (OUT / "audit_report.json").write_text(json.dumps(report, indent=2, sort_keys=True), encoding="utf-8")

    def pct(x):
        return "n/a" if x is None else f"{100*x:.3f}%"
    ind = independent
    lines = [
        "# Independent Vela fill calibration audit",
        "",
        f"Pinned Vela commit: `{VELA_COMMIT}`",
        f"Parquet bytes: `{len(raw)}`; SHA-256: `{sha256}`",
        "",
        "## Direct reproduction from committed parquet",
        f"- Rows / unique tickers / duplicates: **{n} / {unique} / {dup}**",
        f"- Filled: **{step3['filled']}** ({pct(step3['fill_rate'])})",
        f"- Filled outcomes: **{step3['filled_wins']} W / {step3['filled_losses']} L = {pct(step3['realized_win_rate_filled'])}**",
        f"- Mean model p_side, filled: **{pct(step3['mean_model_p_filled'])}**",
        f"- Mean model p_side, unfilled: **{pct(step3['mean_model_p_unfilled'])}**",
        f"- Mean net PnL per filled attempt/window: **${step3['mean_net_pnl_per_filled_attempt']:+.6f}**",
        f"- Sum net PnL across the 88 rows: **${step3['sum_net_pnl_filled_attempts']:+.6f}**",
        f"- Mean submitted contracts among filled attempts: **{step3['mean_submitted_contracts_filled_attempts']:.3f}** (this is submitted order size, not filled quantity)",
        "",
        "## Filled-subset calibration",
        f"- Model expected losses Σ(1-p): **{calibration['expected_losses_sum_1_minus_p']:.3f}**",
        f"- Observed losses: **{calibration['observed_losses']}**",
        f"- P(model would produce >= observed losses; Poisson-binomial): **{calibration['poisson_binomial_p_losses_ge_observed']:.6g}**",
        f"- Wilson 95% interval for filled win rate: **{pct(calibration['win_rate_wilson95'][0])} .. {pct(calibration['win_rate_wilson95'][1])}**",
        "",
        "## PnL shape",
        f"- Winners total / mean: **${pnl['winner_sum']:+.6f} / ${pnl['winner_mean']:+.6f}**",
        f"- Losers total / mean: **${pnl['loser_sum']:+.6f} / ${pnl['loser_mean']:+.6f}**",
        f"- Min / max filled-window PnL: **${pnl['min']:+.6f} / ${pnl['max']:+.6f}**",
        "",
        "## Independent Kalshi outcome recovery",
        f"- Public API host: `{host}`",
        f"- Covered: **{ind.get('covered',0)}/{n}**",
    ]
    if ind.get("filled_covered") is not None:
        lines += [
            f"- Filled actual: **{ind['filled_api_wins']}/{ind['filled_covered']} = {pct(ind['filled_api_win_rate'])}**",
            f"- Unfilled actual: **{ind['unfilled_api_wins']}/{ind['unfilled_covered']} = {pct(ind['unfilled_api_win_rate'])}**",
            f"- Filled-vs-unfilled difference: **{pct(ind['filled_api_win_rate']-ind['unfilled_api_win_rate'])}**",
            f"- Two-proportion z-test p(two-sided): **{ind['filled_vs_unfilled_two_prop_z']['p_two_sided']:.6g}**",
            f"- Filled parquet-vs-API outcome disagreements: **{ind['filled_parquet_vs_api_outcome_disagreements']}**",
        ]
    lines += [
        "",
        "## Important structural limitations of the parquet",
        "- `contracts` is the submitted order count, not actual filled qty.",
        "- `fill_px` is only the first matching maker-fill price; multiple partial fills/prices are collapsed.",
        "- `net_pnl` is imported from the private runtime `windows` table; the parquet alone cannot recompute it exactly without all fill qty/price/fees.",
        "- `won` in the original generator comes from `windows`, and `windows` is only written for windows with fade fills; original step3 therefore has no realised outcome for unfilled attempts.",
        "- Book/estimate features are nearest within ±2 seconds using absolute distance, so the feature row can be post-placement; signed time delta is not retained in the parquet.",
        "- `our_depth` is total depth on the selected side (`sum(book side)`), not queue-ahead depth at our price.",
        "",
    ]
    (OUT / "audit_report.md").write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
