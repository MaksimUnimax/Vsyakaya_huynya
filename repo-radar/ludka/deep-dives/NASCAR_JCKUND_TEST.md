# `jckund/test` — NASCAR Kalshi / sportsbook probability reconciliation

URL: https://github.com/jckund/test

Status: **INTERESTING / CONTRACT-LEVEL VERIFICATION PENDING**

## GitHub footprint

- PUBLIC.
- Repo created: 2025-08-06.
- Still pushed/updated on 2026-09-17 during our audit.
- GitHub size observed around 1,104,973 KB (~1.05 GB).
- Primary language: Python.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Open issues: 0.
- Description/topics: effectively empty.
- Default branch name itself references a Claude NASCAR scraper task rather than a polished product branch.

This was the original reference find that motivated the `лудка` research direction: an almost invisible repo named simply `test` containing a surprisingly substantial live probability/market-monitoring system.

## What it does

The system collects NASCAR event markets and bookmaker information, normalizes them into comparable probabilities, and searches for large disagreement between Kalshi contract prices and sportsbook-derived fair probabilities.

Observed components include:

- Kalshi Winner / Top 3 / Top 5 / Top 10 (and series-dependent additional) markets;
- periodic market snapshots, roughly every 15 minutes in the observed workflow;
- bid/ask, last price, volume and open-interest histories;
- large-trade watcher with overlapping pagination window and deduplication;
- FanDuel acquisition through real Chromium/Playwright, listening to page network JSON rather than naïvely scraping rendered text;
- bookmaker-margin removal / no-vig normalization;
- `ev_model.py` converting Winner/Top3/Top5/Top10 cumulative probabilities into approximate finishing-position buckets and running ~300,000 Monte-Carlo simulations for driver-vs-driver comparisons;
- `evwatch.py` comparing both YES and NO Kalshi prices against independent fair probabilities with fees included;
- persisted `EV_ALERTS.md` and Git history that allowed retrospective outcome checks.

## Saved-signal backtest we performed

Using only already-completed races, saved alerts, one contract per unique first signal, and excluding alerts inside the final 15 minutes / during the race, our preliminary paper reconstruction produced:

| Race | Unique signals | Wins | Paper cost | Payout | P/L | Paper ROI |
|---|---:|---:|---:|---:|---:|---:|
| Fleetio 200 | 14 | 2 | $1.6085 | $2 | +$0.3915 | +24.3% |
| Cook Out Southern 500 | 9 | 1 | $0.9217 | $1 | +$0.0783 | +8.5% |
| Nu Way Auto Parts 225 | 35 | 24 | $16.6006 | $24 | +$7.3994 | +44.6% |
| Enjoy Illinois 300 | 54 | 34 | $19.4659 | $34 | +$14.5341 | +74.7% |
| **Total** | **112** | **61** | **$38.5967** | **$61** | **+$22.4033** | **+58.0%** |

Crucial split:

- YES signals: ~$5.0354 cost -> $5 payout -> about `-0.7%` paper ROI.
- NO signals: ~$33.5613 cost -> $56 payout -> about `+66.9%` paper ROI.

Therefore the interesting phenomenon was NOT “the model predicts NASCAR winners.” The apparent profit concentrated in contracts such as Top-3 NO on weak drivers where the sportsbook-derived model implied a very high chance of NOT making the Top 3 while Kalshi's recorded NO price looked surprisingly cheap.

## Why the result is not accepted as a real edge yet

Three unresolved failure modes remain:

1. **Correlation.** Buying Top-3 NO on many weak drivers in the same race mechanically creates many simultaneous winners because only three drivers can finish in the Top 3. Win rate is not an independent-trials statistic.
2. **Depth / fillability.** Saved best ask does not prove meaningful size was available at that price. One contract at 51c followed by the rest at 90c is economically different from hundreds available at 51c.
3. **Mapping / NO bug risk.** A sportsbook model saying `P(NO) ~ 99%` while a supposedly equivalent Kalshi NO trades near 51-67c is so extreme that exact ticker, event, settlement wording, side transformation and timestamp must be checked contract-by-contract before believing it.

## Next deep-dive check

Take one closed Top-3-NO contract from Nu Way 225 or Enjoy Illinois 300 and reconstruct:

`EV alert timestamp -> exact Kalshi ticker -> exact settlement wording -> recorded bid/ask -> available depth if recoverable -> sportsbook fair probability -> YES-to-NO transform -> fee -> official finish -> Kalshi settlement -> actually executable return`.

Repeat across several contracts and both races. Only after that decide whether this is a real microstructure anomaly, a tiny-liquidity curiosity, or a mapping/model bug.
