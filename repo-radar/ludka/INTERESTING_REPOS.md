# Лудка — INTERESTING REPOS

Постоянный реестр сильных находок ветки `лудка`.

Этот файл хранит не все просмотренные проекты, а только те, к которым есть смысл возвращаться для глубокого разбора механики, данных, ошибок и фактических результатов. Полный антидубль-реестр находится в `REVIEWED_REPOS.md`.

Правило: сильный repo добавляется сюда сразу после подтверждения, что он PUBLIC и содержит достаточно кода/истории/данных для содержательного разбора. Claim из README не считается доказанным результатом.

---

## 1. `routsiddharth/vela`

URL: https://github.com/routsiddharth/vela

Статус: **INTERESTING / DEEP DIVE ACTIVE**

### GitHub footprint

- PUBLIC.
- Repo created: `2026-06-11T00:04:38Z`.
- First visible default-branch commit: `2026-06-11T00:03:13Z` (`fc59bf8e6a18577a009e88e9395b94321d335f1b`, `Initial commit`).
- Last public push/default-branch head activity found: `2026-07-01T12:44:48Z`.
- Visible default-branch commits found: 17.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Subscribers: 0.
- Open issues: 0.
- Topics: none.
- Repo size reported by GitHub: 91,730 KB.
- Primary language reported by GitHub: Jupyter Notebook.
- Public GitHub Traffic page views/clones are not available to non-owner observers, so do NOT invent a views number or substitute stars/watchers for views.

As of 2026-09-17 the repository itself is about 98 days old, but the visible public development window is concentrated into roughly 20 days (June 11 -> July 1). No public push was observed after July 1. This does not prove the live system stopped; it only proves the public repo stopped receiving visible pushes.

### What the author noticed

Kalshi short-dated BTC/ETH event contracts in this project settle using an arithmetic mean of 60 reference-index samples over the final 60 seconds, not simply the terminal BTC/ETH price.

The author's key observation is structural rather than directional forecasting:

`most settlement samples already fixed -> remaining samples have limited influence -> eventual outcome may already be nearly determined -> order book can still react strongly to the latest crypto tick -> buy the side whose settlement arithmetic is already strongly favored if the market still offers it cheaply enough`.

In simple terms: imagine the contract is decided by the average of 60 numbers. If 50 numbers are already known, one scary last-second BTC move may look dramatic on a chart but may be mathematically incapable of moving the 60-number average enough to change the contract outcome. If traders react to the scary last tick while the settlement rule reacts to the average, a temporary price gap can appear.

### Decision chain

1. Observe Binance 1-second BTC/ETH prints.
2. Reconstruct the final 60-second settlement average in real time.
3. Apply a causal Binance -> CF Benchmarks reference-index de-bias, because Binance and the official settlement index are not exactly identical.
4. Estimate remaining uncertainty and `p_side = P(chosen side settles at $1)`.
5. Around ~45 seconds before close, lock a side only if confidence passes a threshold.
6. Compare model probability with the Kalshi order book and exact fee model.
7. Place maker/taker order only when expected value remains positive after fees.
8. Hold fills to settlement, record PnL, then use completed settlements to update the de-bias estimate.

README describes three live pathways:

- BTC panic-fade: maker limit bid, `p_side >= 0.84`.
- BTC strong-take: taker buy when ask >= 0.95 late in the window.
- ETH panic-fade: same structural idea but `p_side >= 0.98`.

### Claimed live result

README currently states, after a 2026-06-18 bankroll reset:

- indexed equity about `1.40x`;
- realized PnL `+$20.23`;
- 210 traded windows;
- 205 wins / 5 losses;
- hit rate `97.6%`;
- per-window t-stat about `1.0`, explicitly labelled **not statistically significant**.

The author explicitly warns that the 97.6% hit rate is the least trustworthy headline because the payoff is left-skewed: many small wins can be offset by rare large losses. This is a major reason the repo is interesting: the author is not treating win-rate as proof of edge.

### Evidence actually public

Public repo includes:

- `notebooks/analysis.ipynb` as the declared main research artifact;
- `analysis/step2_signal_validate.py`;
- `analysis/step3_fill_calibration.py`;
- `analysis/step5_book_coverage.py`;
- Binance/Coinbase acquisition/backfill code;
- trading engine, Kalshi WebSocket/order logic, fee/risk code;
- public research parquet subset under `analysis/data/`, including `coinbase_trades_btc.parquet`, `rti_second.parquet`, `settlements.parquet`, `windows.parquet`;
- commit history documenting actual live-operation problems and repairs.

Important limitation: `.gitignore` explicitly excludes the runtime firehose and live DB/log files (`livepaper/data/`, `livepaper/data_*`, `*.db`, `*.jsonl`, `*.log`, most parquet). It even notes that runtime `livepaper/data` is about 10 GB. Therefore the exact raw 210 live windows/fills are NOT currently proven to be fully reconstructable from public committed data.

### Particularly useful commit-history evidence

- 2026-06-17: commit says both BTC and ETH bots were live with real Kalshi orders and adds strong-take/risk controls.
- 2026-06-21: commit documents that Kalshi deprecated the old v1 order endpoint. Bots remained connected and generated decisions but silently placed no orders; author reports 229 settlements with $0 realized on 2026-06-19. Migration to v2 was then tested in production; commit says first post-fix window won +$1.66 and 2026-06-20 closed +$4.34. This is strong evidence of a real operational system rather than a static backtest README, although the dollar claims still need independent reconciliation.
- 2026-06-28: replay/migration commit reports parity across 14,021 recorded BTC+ETH ticks and discovers a data-quality problem: persisted tick data had only about 43-44 of 60 seconds because the live loop sometimes drifted past 1 second, while the in-memory estimator saw a fuller buffer. This is an excellent example of the exact kind of developer reasoning we want to follow.

### Current verification status

Confirmed from public repo:

- the structural hypothesis exists in code and notebook, not only prose;
- settlement reconstruction/de-bias research datasets are partially public;
- live execution code and operational fixes exist;
- the author is aware of significance/adverse-selection/calibration issues;
- public development is extremely low-profile: 0 stars/forks/watchers.

NOT yet independently proven:

- exact `+$20.23` from all 210 live traded windows;
- exact 205/5 ledger from raw exchange-confirmed fills;
- fillability/queue position for maker entries;
- whether the edge survives larger N and rare-loss tails;
- whether current Kalshi rules/market microstructure still preserve the opportunity after July 2026.

### Next deep-dive checks

1. Reproduce the public notebook's settlement/TWAP arithmetic from committed parquet files.
2. Inspect exact de-bias causality: no future settlement leakage into current-window probability.
3. Inspect `step3_fill_calibration.py` and execution engine for fill-conditional adverse selection.
4. Inspect `scripts/pnl_report.py` and reconciliation code; determine exactly what raw inputs would be needed to reproduce the 210-window PnL.
5. Quantify the five losing windows if evidence is public: loss magnitude vs typical win.
6. Test whether a late terminal-price shock really leaves enough TWAP margin in historical public data.
7. Separate the reusable idea (settlement-rule lag) from this exact Kalshi implementation.

### Why it matters to our radar

This is a prime example of the pattern we want: **read the boring settlement specification more carefully than other traders, convert it into arithmetic, then test whether human/order-flow behavior still prices the wrong variable**. The potentially reusable insight is not “copy this bot”; it is “search event markets for contracts whose settlement function creates a deterministic/near-deterministic state before participants stop trading as though uncertainty remains.”

---

## 2. `jckund/test` — NASCAR Kalshi / sportsbook probability reconciliation

URL: https://github.com/jckund/test

Статус: **INTERESTING / CONTRACT-LEVEL VERIFICATION PENDING**

### GitHub footprint

- PUBLIC.
- Repo created: 2025-08-06.
- Still pushed/updated on 2026-09-17 during our audit.
- GitHub size about 1,104,973 KB (~1.05 GB).
- Primary language: Python.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Open issues: 0.
- Description/topics: effectively empty.
- Default branch name itself references a Claude NASCAR scraper task rather than a polished product branch.

This is the original reference find for the `лудка` research direction: an almost invisible repo named simply `test` that contains a surprisingly substantial live probability/market-monitoring system.

### What it does

The system collects NASCAR event markets and bookmaker information, normalizes them into comparable probabilities, and searches for large disagreement between Kalshi contract prices and sportsbook-derived fair probabilities.

Observed components include:

- Kalshi Winner / Top 3 / Top 5 / Top 10 (and other series-dependent) markets;
- periodic market snapshots, roughly every 15 minutes in the observed workflow;
- bid/ask, last price, volume, open interest histories;
- large-trade watcher with overlapping pagination window and deduplication;
- FanDuel acquisition through real Chromium/Playwright, listening to page network JSON rather than naïvely scraping rendered text;
- bookmaker-margin removal / no-vig normalization;
- an `ev_model.py` that converts Winner/Top3/Top5/Top10 cumulative probabilities into approximate finishing-position buckets and runs ~300,000 Monte-Carlo simulations for driver-vs-driver comparisons;
- `evwatch.py` comparing YES and NO Kalshi prices against independent fair probabilities, fees included;
- persisted `EV_ALERTS.md` and Git history that allowed retrospective outcome checks.

### Saved-signal backtest we performed

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

### Why the result is not yet accepted as a real edge

Three unresolved failure modes remain:

1. **Correlation.** Buying Top-3 NO on many weak drivers in the same race mechanically creates many simultaneous winners because only three drivers can finish in the Top 3. Win rate is not an independent-trials statistic.
2. **Depth / fillability.** Saved best ask does not prove meaningful size was available at that price. One contract at 51c followed by the rest at 90c is economically different from hundreds available at 51c.
3. **Mapping / NO bug risk.** A sportsbook model saying `P(NO) ~ 99%` while a supposedly equivalent Kalshi NO trades near 51-67c is so extreme that exact ticker, event, settlement wording, side transformation and timestamp must be checked contract-by-contract before believing it.

### Next deep-dive check

Take one closed Top-3-NO contract from Nu Way 225 or Enjoy Illinois 300 and reconstruct:

`EV alert timestamp -> exact Kalshi ticker -> exact settlement wording -> recorded bid/ask -> available depth if recoverable -> sportsbook fair probability -> YES-to-NO transform -> fee -> official finish -> Kalshi settlement -> actually executable return`.

Repeat across several contracts and both races. Only after that decide whether this is a real microstructure anomaly, a tiny-liquidity curiosity, or a mapping/model bug.

---

## Registry rule

Before every future `лудка` search pass:

1. Check `REVIEWED_REPOS.md` first.
2. Do not re-add a previously reviewed repo as a new discovery.
3. If an old repo has materially new commits/results, update its existing record and mark it `REVISIT`, rather than treating it as a new find.
4. If a reviewed repo graduates into a strong find, add/update its full card here.
