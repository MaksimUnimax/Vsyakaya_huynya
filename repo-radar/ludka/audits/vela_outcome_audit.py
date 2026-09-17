#!/usr/bin/env python3
"""Vela audit pass 2: recover realised outcomes for filled AND unfilled attempts.

Kalshi now archives settled markets behind /historical/markets/{ticker}. The
original Vela step3 only has realised `won` labels for filled fade windows because
its `windows` table is written only when s.fills is non-empty. This script closes
that asymmetry from public exchange data and tests whether fill-conditional
underperformance remains after accounting for each row's model p_side.
"""
from __future__ import annotations

import json
import math
import os
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
BASES = [
    "https://external-api.kalshi.com/trade-api/v2",
    "https://api.elections.kalshi.com/trade-api/v2",
]
OUT = Path(os.environ.get("AUDIT_OUT", ".")).resolve()
OUT.mkdir(parents=True, exist_ok=True)


def get_df() -> pd.DataFrame:
    raw = requests.get(PARQUET_URL, timeout=60)
    raw.raise_for_status()
    p = OUT / "fill_calibration_btc.parquet"
    p.write_bytes(raw.content)
    return pd.read_parquet(p)


def probe(ticker: str):
    attempts = []
    paths = ["historical/markets", "markets"]
    for base in BASES:
        for prefix in paths:
            url = f"{base}/{prefix}/{ticker}"
            try:
                r = requests.get(url, timeout=20, headers={"User-Agent":"vela-public-audit/2.0"})
                attempts.append({"url":url,"status":r.status_code,"text":r.text[:160]})
                if r.status_code == 200:
                    obj = r.json(); m = obj.get("market", obj)
                    return base, prefix, attempts, m
            except Exception as e:
                attempts.append({"url":url,"error":repr(e)})
    return None, None, attempts, None


def fetch_market(base: str, prefix: str, ticker: str) -> dict:
    url = f"{base}/{prefix}/{ticker}"
    headers={"User-Agent":"vela-public-audit/2.0"}
    for attempt in range(6):
        try:
            r = requests.get(url, timeout=25, headers=headers)
            if r.status_code == 200:
                obj=r.json(); m=obj.get("market",obj)
                result=str(m.get("result") or "").lower()
                # Newer schemas may express settlement as settlement_value_dollars.
                sv=m.get("settlement_value_dollars")
                if result not in ("yes","no") and sv is not None:
                    try:
                        f=float(sv)
                        if f == 1.0: result="yes"
                        elif f == 0.0: result="no"
                    except Exception: pass
                return {"ok":True,"ticker":ticker,"result":result or None,
                        "status":m.get("status"),"expiration_value":m.get("expiration_value"),
                        "settlement_value_dollars":sv,"settlement_ts":m.get("settlement_ts"),
                        "close_time":m.get("close_time")}
            if r.status_code in (429,500,502,503,504):
                time.sleep(min(0.5*(2**attempt),8)); continue
            return {"ok":False,"ticker":ticker,"http":r.status_code,"text":r.text[:160]}
        except Exception as e:
            if attempt == 5: return {"ok":False,"ticker":ticker,"error":repr(e)}
            time.sleep(min(0.5*(2**attempt),5))
    return {"ok":False,"ticker":ticker}


def wilson(k,n,z=1.959963984540054):
    if n==0:return [None,None]
    p=k/n; d=1+z*z/n; c=(p+z*z/(2*n))/d
    h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d
    return [c-h,c+h]


def prop_z(k1,n1,k2,n2):
    p1=k1/n1; p2=k2/n2; pool=(k1+k2)/(n1+n2)
    se=math.sqrt(max(1e-30,pool*(1-pool)*(1/n1+1/n2)))
    z=(p1-p2)/se
    return {"difference":p1-p2,"z":z,"p_two_sided":math.erfc(abs(z)/math.sqrt(2))}


def model_adjusted_mc(g: pd.DataFrame, reps=100000, seed=20260917):
    """Null: outcomes are Bernoulli(p_side); fill flag adds no extra outcome info.

    Statistic is calibration residual difference:
      mean(y-p | filled) - mean(y-p | unfilled)
    Negative => filled attempts do worse than their own model probabilities relative
    to unfilled attempts. Monte Carlo respects each row's individual p_side.
    """
    p=g.p_side.to_numpy(float)
    f=g.filled.to_numpy(bool)
    y=g.api_won.to_numpy(float)
    obs=float((y[f]-p[f]).mean()-(y[~f]-p[~f]).mean())
    rng=np.random.default_rng(seed)
    ge=0; le=0; vals=[]
    batch=2000
    for start in range(0,reps,batch):
        b=min(batch,reps-start)
        sim=(rng.random((b,len(p))) < p).astype(float)
        st=(sim[:,f]-p[f]).mean(axis=1)-(sim[:,~f]-p[~f]).mean(axis=1)
        ge += int((st >= abs(obs)).sum())
        le += int((st <= -abs(obs)).sum())
        if len(vals)<10: vals.extend(st[:min(10-len(vals),len(st))].tolist())
    p2=(ge+le+1)/(reps+1)
    return {"observed_residual_difference":obs,"mc_reps":reps,"p_two_sided":min(1.0,p2)}


def main():
    df=get_df()
    sample=str(df.ticker.iloc[0])
    base,prefix,probe_attempts,sample_market=probe(sample)
    (OUT/"probe.json").write_text(json.dumps({"ticker":sample,"base":base,"prefix":prefix,
        "attempts":probe_attempts,"sample_market":sample_market},indent=2),encoding="utf-8")
    if not base:
        raise SystemExit("No Kalshi market endpoint worked; see probe.json")

    records={}
    def task(t): return fetch_market(base,prefix,t)
    with ThreadPoolExecutor(max_workers=8) as ex:
        fut={ex.submit(task,str(t)):str(t) for t in df.ticker}
        for f in as_completed(fut):
            r=f.result(); records[r["ticker"]]=r
    (OUT/"outcomes.json").write_text(json.dumps(records,indent=2,sort_keys=True),encoding="utf-8")

    api=pd.DataFrame([x for x in records.values() if x.get("ok") and x.get("result") in ("yes","no")])
    m=df.merge(api[["ticker","result","status","expiration_value","settlement_value_dollars"]],on="ticker",how="left")
    m["api_won"]=np.where(m.result.isin(["yes","no"]),(m.result==m.side).astype(float),np.nan)
    g=m.dropna(subset=["api_won","p_side"]).copy()
    gf=g[g.filled==1]; gu=g[g.filled==0]

    # Raw filled-vs-unfilled outcome comparison.
    kf=int(gf.api_won.sum()); ku=int(gu.api_won.sum())
    raw_test=prop_z(kf,len(gf),ku,len(gu)) if len(gf) and len(gu) else None

    # Cross-check author's filled labels against public settlement.
    chk=gf.dropna(subset=["won"])
    disagree=chk[chk.won.astype(int)!=chk.api_won.astype(int)]

    # Calibration residuals, and model-adjusted fill effect test.
    cal={}
    for name,x in (("filled",gf),("unfilled",gu),("all",g)):
        if len(x):
            y=x.api_won.to_numpy(float); p=x.p_side.to_numpy(float)
            cal[name]={
                "n":len(x),"wins":int(y.sum()),"actual_win_rate":float(y.mean()),
                "mean_p_side":float(p.mean()),"residual_actual_minus_model":float((y-p).mean()),
                "brier":float(np.mean((y-p)**2)),"wilson95":wilson(int(y.sum()),len(y)),
                "expected_losses":float((1-p).sum()),"actual_losses":int((1-y).sum()),
            }
    mc=model_adjusted_mc(g) if len(gf) and len(gu) else None

    # p-side stratification: check fill penalty at broadly comparable confidence.
    edges=[0.84,0.90,0.95,0.98,0.99,0.995,0.999,1.0000001]
    labels=[".84-.90",".90-.95",".95-.98",".98-.99",".99-.995",".995-.999",".999-1"]
    g["p_bin"]=pd.cut(g.p_side,edges,labels=labels,include_lowest=True,right=False)
    bins=[]
    for b,x in g.groupby("p_bin",observed=True):
        rec={"bin":str(b)}
        for name,z in (("filled",x[x.filled==1]),("unfilled",x[x.filled==0])):
            rec[f"{name}_n"]=len(z)
            rec[f"{name}_win_rate"]=float(z.api_won.mean()) if len(z) else None
            rec[f"{name}_mean_p"]=float(z.p_side.mean()) if len(z) else None
        bins.append(rec)

    # Evidence that GROUP BY ticker averaged multiple resting placements.
    # A real v2 limit is cent-aligned and integer-sized. Averaging multiple rows can
    # create non-cent price / non-integer count. Also a buy fill above the logged
    # limit is impossible for a single correctly paired order.
    cent_error=np.abs(df.our_bid*100-np.round(df.our_bid*100))
    count_error=np.abs(df.contracts-np.round(df.contracts))
    aggregation={
        "our_bid_not_cent_aligned":int((cent_error>1e-8).sum()),
        "contracts_not_integer":int((count_error>1e-8).sum()),
        "filled_px_above_logged_buy_limit":int((gf.fill_px>gf.our_bid+1e-12).sum()) if len(gf) else None,
        "filled_px_equal_logged_limit":int(np.isclose(gf.fill_px,gf.our_bid).sum()) if len(gf) else None,
        "filled_px_below_logged_limit":int((gf.fill_px<gf.our_bid-1e-12).sum()) if len(gf) else None,
        "anomaly_rows":gf[gf.fill_px>gf.our_bid+1e-12][["ticker","side","our_bid","fill_px","contracts","p_side","api_won","net_pnl"]].to_dict("records") if len(gf) else [],
    }

    out={
      "endpoint":{"base":base,"prefix":prefix,"covered":len(api),"total":len(df)},
      "raw_filled_vs_unfilled":raw_test,
      "calibration":cal,
      "model_adjusted_fill_effect_mc":mc,
      "p_side_bins":bins,
      "filled_label_disagreements":len(disagree),
      "filled_label_disagreement_rows":disagree[["ticker","side","won","result","p_side","fill_px","net_pnl"]].to_dict("records"),
      "aggregation_invariants":aggregation,
    }
    (OUT/"outcome_audit.json").write_text(json.dumps(out,indent=2,sort_keys=True),encoding="utf-8")

    def pct(v): return "n/a" if v is None else f"{100*v:.3f}%"
    L=["# Vela independent outcome audit","",f"Endpoint: `{base}/{prefix}/{{ticker}}`",
       f"Coverage: **{len(api)}/{len(df)}**","",
       "## Realised outcomes on the same basis",]
    if "filled" in cal:
        L += [f"- Filled: **{cal['filled']['wins']}/{cal['filled']['n']} = {pct(cal['filled']['actual_win_rate'])}**, mean model p={pct(cal['filled']['mean_p_side'])}, residual={pct(cal['filled']['residual_actual_minus_model'])}"]
    if "unfilled" in cal:
        L += [f"- Unfilled: **{cal['unfilled']['wins']}/{cal['unfilled']['n']} = {pct(cal['unfilled']['actual_win_rate'])}**, mean model p={pct(cal['unfilled']['mean_p_side'])}, residual={pct(cal['unfilled']['residual_actual_minus_model'])}"]
    if raw_test:
        L += [f"- Raw filled-minus-unfilled win-rate difference: **{pct(raw_test['difference'])}**, p={raw_test['p_two_sided']:.6g}"]
    if mc:
        L += [f"- Model-adjusted calibration-residual difference: **{pct(mc['observed_residual_difference'])}**, Monte-Carlo p={mc['p_two_sided']:.6g}"]
    L += [f"- Parquet filled-label vs public Kalshi outcome disagreements: **{len(disagree)}**","",
          "## Aggregation/invariant checks",
          f"- Non-cent-aligned `our_bid`: **{aggregation['our_bid_not_cent_aligned']}**",
          f"- Non-integer `contracts`: **{aggregation['contracts_not_integer']}**",
          f"- Filled price ABOVE logged buy limit: **{aggregation['filled_px_above_logged_buy_limit']}**",
          f"- Equal: **{aggregation['filled_px_equal_logged_limit']}**; below: **{aggregation['filled_px_below_logged_limit']}**","",
          "## Confidence bins"]
    for b in bins:
        L.append(f"- {b['bin']}: filled n={b['filled_n']} win={pct(b['filled_win_rate'])} meanP={pct(b['filled_mean_p'])}; unfilled n={b['unfilled_n']} win={pct(b['unfilled_win_rate'])} meanP={pct(b['unfilled_mean_p'])}")
    (OUT/"outcome_audit.md").write_text("\n".join(L)+"\n",encoding="utf-8")
    print("\n".join(L))

if __name__=="__main__": main()
