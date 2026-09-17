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

Kalshi short-dated BTC/ETH event contracts settle using an arithmetic mean of 60 CF Benchmarks RTI samples over the final 60 seconds, not simply the terminal BTC/ETH price.

The author's key observation is structural rather than directional forecasting:

`most settlement samples already fixed -> remaining samples have limited influence -> eventual outcome may already be nearly determined -> order book can still react strongly to the latest crypto tick -> buy the side whose settlement arithmetic is already strongly favored if the market temporarily offers it cheaply enough`.

In simple terms: imagine the contract is decided by the average of 60 numbers. If 50 numbers are already known, one scary last-second BTC move may look dramatic on a chart but may be mathematically incapable of moving the 60-number average enough to change the contract outcome. If traders react to the scary last tick while the settlement rule reacts to the average, a temporary price gap can appear.

### How the idea evolved — this is the interesting part

The repo contains a much better research trail than the README headline suggests.

#### Phase 1 — prove the "lock" exists

`backtest/FINDINGS_SOFAR.md` and the red-team audit describe 6,308 settled KXBTC15M windows from 2026-04-03 through 2026-06-09, with 1-second Binance data and sampled Kalshi trades.

The core settlement estimate turned out to be extremely accurate late in the window after a causal Binance -> RTI de-bias:

- tau=30s, |estimated margin| > $50: 1 flip / 3,848 = 99.974% win-side accuracy;
- tau=30s, margin > $75: 0 flips / 2,903;
- tau=45s, margin > $50: 0 flips / 3,833 in the synthesis;
- the red-team scripts report no look-ahead, no effective interpolation leakage and correct timestamp alignment on that historical sample.

So the mathematical phenomenon is not merely "BTC usually keeps moving the same direction." The remaining 60-second-average arithmetic genuinely makes many late outcomes nearly locked.

#### Phase 2 — obvious taker trade FAILS

The obvious idea was: once the outcome is nearly locked, aggressively buy the future winner.

It failed.

When the model was highly confident, the Kalshi crowd already priced the winning side around 0.985–0.999. The gross gap was sub-cent to ~1.5c and the fee rounding consumed it. The independent red-team audit reproduced negative net EV in every tested taker cell, roughly -0.55 to -1.10 cents/contract with realistic execution.

This is an important project lesson: **being able to predict the outcome almost perfectly does not imply you can make money if the market already prices that information.**

#### Phase 3 — generic maker trade also FAILS

The author then tested resting bids on the side the model believed would win.

That also mostly failed because of classic adverse selection: your cheap bid gets filled disproportionately when the market is moving against your thesis. The historical maker study shows unconditional ~99% accuracy degrading materially on the subset that actually touched/fills the resting bid. At meaningful historical volume the best generic maker cell was roughly break-even and most were negative.

So "avoid taker fees and become maker" was not enough.

#### Phase 4 — refined panic-fade hypothesis

The synthesis then isolates a narrower phenomenon:

- settlement average is already anchored;
- a late spot move scares last-price-focused traders;
- they dump the side that the 60-second average still strongly favors;
- instead of buying every near-locked winner, rest a deliberately cheap bid and only trade when this late panic temporarily pushes the likely winner down to the bid.

Historical synthesis says cheap winning-side offers <=0.97 appeared repeatedly across days/months, with much of the cheap volume coming from takers selling the eventual winner. The proposed rule is roughly:

`decision around 45s -> sufficiently large TWAP-estimated margin -> rest bid on favored side -> only accept sufficiently cheap price -> hold fill to settlement`.

Historical backtest examples in the synthesis reported positive net cents/contract and zero losing windows in the tested two-month subset for several conservative threshold/cap combinations. This was still explicitly labelled as needing paper/live fill validation because historical prints cannot prove your queue position.

#### Phase 5 — live forward test

The live engine then generated actual order/fill data. The committed analysis summary currently reports:

- 1,034 distinct BTC maker-fade attempts;
- 88 filled;
- overall fill rate: 8.5%;
- model mean `p_side` on filled trades: 0.9795;
- realized win rate on those filled trades: 0.9659 (n=88);
- mean `p_side` on UNFILLED attempts: 0.9976;
- reported E[PnL | fill]: +$0.1803 per filled attempt;
- mean filled size: 7 contracts.

That filled-vs-unfilled split is exactly the adverse-selection problem in live form: the most certain opportunities often do NOT fill; the ones that do fill are slightly worse than the model population.

The same analysis lineage reports 1,356 order placements with a book snapshot within 2 seconds for 100% of placements (1,354 within 1 second), which is useful for execution-quality analysis.

### Decision chain in the live engine

1. Observe Binance 1-second BTC/ETH prints.
2. Reconstruct the final 60-second settlement average in real time.
3. Apply causal Binance -> CF Benchmarks reference-index de-bias.
4. Estimate remaining uncertainty and `p_side = P(chosen side settles at $1)`.
5. Around ~45 seconds before close, lock a side only if confidence passes a threshold.
6. Compare model probability with the Kalshi order book and exact fee model.
7. Place maker/taker order only when expected value remains positive after fees.
8. Hold fills to settlement, record PnL, then use completed settlements to update the de-bias estimate.

README describes three live pathways:

- BTC panic-fade: maker limit bid, `p_side >= 0.84`.
- BTC strong-take: taker buy when ask >= 0.95 late in the window.
- ETH panic-fade: same structural idea but `p_side >= 0.98`.

### Claimed overall live result

README currently states, after a 2026-06-18 bankroll reset:

- indexed equity about `1.40x`;
- realized PnL `+$20.23`;
- 210 traded windows;
- 205 wins / 5 losses;
- hit rate `97.6%`;
- per-window t-stat about `1.0`, explicitly labelled **not statistically significant**.

The author explicitly warns that the 97.6% hit rate is the least trustworthy headline because the payoff is left-skewed: many small wins can be offset by rare large losses. This is a major reason the repo is interesting: the author is not treating win-rate as proof of edge.

### Evidence actually public — corrected inventory

Public repo includes:

- `notebooks/analysis.ipynb` as the declared main research artifact, including stored execution outputs/plots;
- `analysis/step2_signal_validate.py` and its committed text output;
- `analysis/step3_fill_calibration.py` and committed text output;
- `analysis/step5_book_coverage.py` and committed text output;
- Binance/Coinbase acquisition/backfill code;
- trading engine, Kalshi WebSocket/order logic, fee/risk code;
- public `analysis/data/fill_calibration_btc.parquet` (~61 KB), derived from the live BTC runtime DB;
- public `analysis/data/binance_1s_btc_full.parquet` (~15.6 MB), `coinbase_1s_btc.parquet` (~21.6 MB), and `coinbase_trades_btc.parquet` (~103 MB);
- commit history documenting actual live-operation problems and repairs.

**Correction made during our audit:** current `main` does NOT contain `analysis/data/windows.parquet`, `settlements.parquet`, or `rti_second.parquet`. Earlier notes incorrectly treated these as current committed artifacts. Do not rely on that old statement.

Important limitation: `.gitignore` explicitly excludes the runtime firehose and live DB/log files (`livepaper/data/`, `livepaper/data_*`, `*.db`, `*.jsonl`, `*.log`, most parquet) and notes that runtime `livepaper/data` is about 10 GB. `backtest/data/` is also ignored. Therefore neither the complete original 6,308-window raw backtest dataset nor the complete 210-window live settlement ledger is currently committed as a directly replayable public bundle.

The committed `fill_calibration_btc.parquet` materially improves verifiability of the maker-fill analysis, but it is a derived table, not the full exchange/runtime database.

### Particularly useful commit-history evidence

- 2026-06-17: commit says both BTC and ETH bots were live with real Kalshi orders and adds strong-take/risk controls.
- 2026-06-21: commit documents that Kalshi deprecated the old v1 order endpoint. Bots remained connected and generated decisions but silently placed no orders; author reports 229 settlements with $0 realized on 2026-06-19. Migration to v2 was then tested in production; commit says first post-fix window won +$1.66 and 2026-06-20 closed +$4.34. This is strong evidence of a real operational system rather than a static backtest README, although the dollar claims still need independent reconciliation.
- 2026-06-28: replay/migration commit reports parity across 14,021 recorded BTC+ETH ticks and discovers a data-quality problem: persisted tick data had only about 43-44 of 60 seconds because the live loop sometimes drifted past 1 second, while the in-memory estimator saw a fuller buffer. This is an excellent example of the exact kind of developer reasoning we want to follow.

### Current-rule check (2026-09-17)

Current Kalshi crypto documentation still states that crypto expiration values are computed by averaging 60 CF Benchmarks RTI observations at one-second intervals over the expiration minute. Kalshi also states that the RTI is available through its API as a pass-through.

Therefore the **settlement-rule premise still exists in September 2026**. This does NOT prove the June mispricing still exists. Market participants/market makers may have learned the same arithmetic, liquidity may have changed, and fee details/incentives may have changed. A fresh forward-data pass is required before calling the opportunity current.

### Current verification status

Strongly supported by public material:

- the 60-second-average structural thesis is real and remains consistent with current Kalshi crypto documentation;
- the author tested and rejected the naive taker strategy rather than cherry-picking only a winning story;
- historical lock detection was subjected to a separate red-team replication in the repo;
- the live execution stack existed and experienced real API/endpoint operational failures;
- live maker-fill calibration is backed by a committed derived parquet and text report;
- public development is extremely low-profile: 0 stars/forks/watchers.

NOT independently proven from the current public tree:

- exact `+$20.23` from all 210 live traded windows;
- exact 205/5 ledger from raw exchange-confirmed fills;
- the complete original 6,308-window raw backtest without recollecting source data;
- exact queue position / whether all historical apparent cheap volume could have been captured;
- persistence of the edge in September 2026;
- long-run tail risk from rare wrong settlements/proxy dislocations.

### How we can verify it ourselves

A serious independent validation should be split into levels:

**Level A — settlement arithmetic:** collect fresh CF RTI/Binance data, reproduce the final-60s average and prove how early an outcome becomes mathematically hard to flip.

**Level B — price reaction:** simultaneously record Kalshi order books/trades and determine whether the TWAP-favored side still experiences late panic discounts after the outcome is near-locked.

**Level C — fill realism:** submit no-capital paper/resting-order simulations with actual queue/depth tracking. Best-ask/trade prints are not enough; estimate whether our order would genuinely have filled.

**Level D — forward outcomes:** freeze thresholds before collecting the evaluation period, then measure fill rate, conditional win rate, fees, worst loss, PnL, calibration and statistical uncertainty. Do not tune on the evaluation sample.

**Level E — tiny live validation only if earlier levels survive:** reconcile exchange-confirmed fills/fees/settlements to a ledger. Paper success is not proof of executable live edge.

### How the idea is reusable

The most valuable reusable insight is not “trade BTC 15m exactly like Vela.” It is a research template:

1. Read settlement/resolution rules literally.
2. Identify contracts where the resolution function becomes partly or mostly determined BEFORE trading stops.
3. Compute a causal lower/upper bound on the final result using already-realized inputs.
4. Compare that bounded reality with the variable traders appear to react to (last price, latest poll, latest score, latest weather observation, etc.).
5. Search only for moments where the market temporarily prices the wrong variable.
6. Forward-test fillability and adverse selection before believing paper EV.

That template can be applied to other averaged indexes, rolling windows, multi-sample weather measurements, election/poll aggregation, sports markets with deterministic tie/qualification constraints, range/ladder contracts, and other event markets — provided their settlement rules create an information state the order book may process imperfectly.

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
