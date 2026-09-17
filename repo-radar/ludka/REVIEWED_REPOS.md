# Лудка — REVIEWED REPOS / ANTI-DUPLICATE LEDGER

Постоянный реестр ВСЕХ GitHub-репозиториев, уже просмотренных в рамках ветки `лудка` или её исходного NASCAR-разбора.

Цель: не тратить следующие поисковые проходы на повторное «открытие» тех же проектов.

## Обязательное правило поиска

Перед каждым новым discovery pass сначала сверять найденный `owner/repo` с этим файлом.

- `INTERESTING` — **только owner-approved**; полная карточка должна быть в `INTERESTING_REPOS.md`.
- `DEEP DIVE` — сейчас углубляем.
- `CANDIDATE` — стоит вернуться/допроверить.
- `ADVERSARIAL` — claims выглядят интересно/аномально, но сначала пытаться сломать методику.
- `AUDITED` — проведён отдельный независимый audit конкретного headline/mechanism.
- `WEAK` — просмотрен, недостаточно evidence/mechanics.
- `REJECTED` — не подходит текущей цели.
- `REVISIT` — старый repo получил существенное новое развитие; обновлять существующую запись, не считать новой находкой.

**Ассистент не имеет права сам переводить CANDIDATE/ADVERSARIAL в INTERESTING. Это делает только владелец явной командой.**

Наличие в этом файле означает: **не выдавать repo повторно как новый кандидат**.

Полные карточки:

- `CANDIDATES-2026-09-17-P2.md`
- `CANDIDATES-2026-09-17-P3.md`

---

## Strong / active research

| Repo | Status | Domain / reason | Full card / next action |
|---|---|---|---|
| `routsiddharth/vela` | **INTERESTING / OWNER-APPROVED / DEEP DIVE** | Kalshi short-dated BTC/ETH structural settlement mispricing; live execution; independent audit completed | `INTERESTING_REPOS.md`; `deep-dives/VELA_2026-09-17.md`; keep as reference, no more Kalshi-account work for now |
| `jckund/test` | **INTERESTING / OWNER-APPROVED / DEEP DIVE** | NASCAR Kalshi + sportsbook probability reconciliation; saved EV alerts; preliminary outcome reconstruction | `INTERESTING_REPOS.md`; `deep-dives/NASCAR_JCKUND_TEST.md`; next = contract-level Top3-NO verification |
| `mpatout/kalshi-market-research` | **CANDIDATE / STRONG / ADVERSARIAL FILL AUDIT NEEDED** | ~75k settled Kalshi markets; longshot bias, surge/reversal, maker strategies, committed backtest outputs; huge PnL relies on assumed capture of candle volume | Full card P3; replace `volume × 25%` fill assumption with queue/trade-through/adverse-selection model |
| `mifisher/kalshi-weather-bot` | **CANDIDATE / STRONG NEGATIVE RESULT** | Weather forecast has real Brier skill but ~950 real-quote walk-forward simulated trades lose after fees even under optimistic always-fill passive assumption | Full card P3; inspect station/model PnL breakdown and why forecast skill fails to beat market prices |
| `Aaaaarin/vol-surface-dispersion` | **CANDIDATE / STRONG SELF-FALSIFIED ALPHA** | Options dispersion/implied correlation; author diagnoses own Sharpe ~4.7 as circular identity caused by shared implied term and refuses performance claim | Full card P3; only worth revisiting with real historical single-stock IV panel |
| `spencerfletcher/arbitrage-engine` | **CANDIDATE / STRONG** | Kalshi ↔ Polymarket US taker-arb measurement system; stale-feed selection, wrong-game matcher, fee/FOK/latency reversals | Full card P2; deep-read fire path and reproduce what public evidence permits |
| `spencerfletcher/market-maker` | **CANDIDATE / ENGINEERING** | Successor maker engine; exact-Decimal, queue/fee/freshness/crash rails; numeric results/tuning withheld | Full card P2; use as execution-audit reference, not profitability evidence |
| `mperi1208/value-bet-model` | **CANDIDATE / STRONG** | Football: ML null, then sharp-book/slow-book line-shopping thesis; two public downward corrections | Full card P2; audit odds timestamps, Max-price executability, CLV and forward ledger |
| `PredictionMarketTrader/openthomas` | **CANDIDATE / STRONG** | Weather prediction markets; NWP consensus, station bias, leak-free hindcast, replay corrected toward breakeven | Full card P2; verify historical-orderbook/replay source and public paper record |
| `charlieyang1557/polymarket-arb` | **CANDIDATE / STRONG** | Polymarket/Kalshi sports market making; real fills; adverse-selection post-mortem; four strategies negative/neutral | Reconstruct live fill evidence and simulator vs realized PnL |
| `tanamsethi31/footymodel` | **CANDIDATE / STRONG** | Football value betting; Dixon-Coles/xG/lineups; walk-forward; CLV; many explicit negative results | Finish latest RESULTS chronology and causal line-shopping audit |
| `GasparCoquet/pairs-trading-backtest` | **CANDIDATE / STRONG** | Equities pairs/stat-arb post-mortem; synthetic fallback + multiple-testing false edge exposed | Audit Git history of original false result vs correction |
| `santzmr/funding-rate-arbitrage` | **CANDIDATE** | BTC perpetual funding carry; fees flip theoretical positive to negative; documented 8h timestamp bug | Reproduce corrected alignment/result tables; maker-fill realism |
| `himnishpersonal/arb-trading-bot` | **CANDIDATE** | Kalshi ↔ Polymarket cross-venue arb; semantic contract-equivalence safeguards | Determine whether committed quote history/backtest evidence exists |
| `aayanvatsa04/btc-perpetual-funding-arbitrage` | **CANDIDATE** | BTC funding; OU signal, 2-year walk-forward, live paper bot claims | Verify generated result files/public evidence and exact mechanics |
| `yoho369/crypto-perpetual-arbitrage` | **CANDIDATE / DEEPENED / EXECUTION UNPROVEN** | Same-perp cross-venue stat-arb; funding-normalized OU/s-score; BERA retrospective holdout 23 trades / +336.9bps, but minute BBO lacks depth/two-leg fill realism | `deep-dives/CANDIDATE_CRYPTO_PERPETUAL_YOHO369_2026-09-17.md`; only revisit with reproducible data + execution realism |
| `seralifatih/pm-arbitrage` | **CANDIDATE / STRUCTURAL** | Polymarket multi-outcome basket arithmetic; exact-K identity only valid with complete outcome space | Full card P2; verify completeness, rules, fees and preserved real opportunities |
| `counterfactual5/funding-arb` | **CANDIDATE / ACTIVE EXECUTION FRAMEWORK** | CEX/DEX funding carry scanner + paper/live executor, fee/mark-spread/cross-interval logic; active Sep 17 | Full card P3; find preserved real scanner/position/backtest ledger before treating as edge evidence |
| `tfrmma/options-volatility-trading-strats` | **CANDIDATE / OPTIONS ENGINEERING** | Crypto vol/VRP/dispersion/surface strategies with bid/ask, W-W hedge bands, scenario margin; only dispersion wired end-to-end | Full card P3; lacks complete historical result chain |
| `willhammondhimself/adaptive-volatility-arbitrage` | **CANDIDATE / OPTIONS ENGINEERING** | Heston/GARCH/LSTM vol-arb platform; execution currently at midpoint, historical raw options excluded | Full card P3; not executable evidence until bid/ask and reproducible raw data exist |
| `tfrmma/realistic-mm-backtester` | **ENGINEERING REFERENCE / AUDIT TOOL** | FIFO queue, latency, cancel/requote, true-book arrival, taker depth, OOS/walk-forward; useful for testing others rather than claiming edge | Full card P3; use as fill/execution reference |

---

## Adversarial / audited false-alpha queue

| Repo | Status | Finding / next action |
|---|---|---|
| `maxstw23/pairs-trading` | **AUDITED / HEADLINE INVALID** | Independent audit reproduced original Sharpe ~4.05, then correct self-financing PnL collapsed portfolio to Sharpe ~-0.336 / -2.13%. Root cause: `spread.diff()` monetizes changing Kalman alpha/beta. See `audits/PAIR_TRADING_KALMAN_AUDIT_2026-09-17.md`. No further profitability audit needed. |
| `oddsflowai-team/oddsflow-ai-football-value-signals` | **ADVERSARIAL** | Claims ~3,181 bets / ~57.4% hit rate / ~38.5% ROI and higher Monte-Carlo variants. Must audit odds timestamps, leakage, duplicates, stake/PnL arithmetic, selection and settlement. |
| `PandaXPanther/pandaxpanther-prediction-bot` | **ADVERSARIAL** | Claims structural arb, cross-venue arb, crypto latency and NOAA weather plus persisted fills/PnL. Breadth itself requires hard evidence. |
| `ImMike/polymarket-arbitrage` | **ADVERSARIAL / LOW CONFIDENCE** | Simulation claims around 99.6% win rate and ~$573 profit; only revisit if quote history and realistic execution evidence are public. |

---

## Reviewed weak / rejected / infrastructure-only repos

These repos were inspected enough that they must not return as fresh discoveries without material new evidence.

| Repo | Status | Reason |
|---|---|---|
| `umaangk13/Delta-Neutral-Volatility-Arbitrage-Engine` | **WEAK / METHODOLOGY BROKEN** | Historical backtest uses real SPY spot but synthetic BSM options with constant `sigma=0.20` at entry/mark/exit. Does not test historical implied-vs-realized vol edge. Full card P3. |
| `guzus/dr-manhattan` | **REJECTED FOR EDGE TRACK / INFRASTRUCTURE** | Good unified API/CCXT-like layer across prediction markets, but no concrete edge hypothesis/preserved result chain found. Full card P3. |
| `else24/kalshi-market-bot` | **WEAK / GENERIC TOOLKIT** | UI + generic configurable fair-value/momentum/reversion; no concrete fair-value research or preserved historical edge result. Full card P3. |
| `DanielTomaro13/sportsdata-agents` | **ENGINEERING PLATFORM / NOT CLEAN EDGE RESULT** | Large odds warehouse/agents/CLV/backtest/betting platform, but no single compact preserved strategy/result chain surfaced in initial review. Full card P3. |
| `SohamMahale/crypto-arbitrage-project` | **WEAK / METHODOLOGY CONCERN** | Full card P2. Annualized monthly averages presented like backtest returns; no path-dependent position/funding simulation; spot/futures rows aligned by row count rather than timestamp. |
| `arkda34/sports-simulate-trade` | **WEAK** | Sports simulation/trading theme surfaced, but no evidence base comparable to stronger candidates. |
| `eskayML/sportsbookdata` | **WEAK** | Primarily sportsbook data tooling; not enough model/decision/result chain. |
| `johnpqja7331/sports-betting-ai` | **WEAK** | Generic sports-betting AI framing; insufficient independently checkable execution/results. |
| `gabmrocha05/sports-betting` | **WEAK** | Sports betting project did not clear evidence/mechanics threshold. |
| `albarqouni/Sport-betting` | **WEAK** | Betting/model theme but weak fit relative to evidence standard. |
| `arbriov/arbitrage-betting-bot-demo` | **REJECTED** | Demo repo; requires inspectable mechanics/history rather than demonstration shell. |
| `dirkcgrunwald/sportsbookreview-scraper` | **REJECTED** | Old scraper/data acquisition, not an edge/model/execution research system. |
| `Sports-Betting-Applications/EM_Project` | **REJECTED** | Aggregate/course-style project rather than active strategy research. |
| `kmoise/betfair-arbitrage` | **REJECTED** | Tutorial/skeleton-level arbitrage implementation; insufficient evidence/history. |
| `stanpost1/Sports-Betting-Arbitrage-Script-LowCode` | **REJECTED** | Low-code automation glue; insufficient underlying probability/market-mechanics research. |
| `bobster33/bookie_buster` | **REJECTED / INCOMPLETE** | Incomplete/weak evidence in initial inspection. |

---

## Reference from pre-branch repo-radar work

The following earlier `repo-radar` projects were already inspected in the parent research program and should not be re-surfaced as new `лудка` discoveries:

- `spot-rail-hq/main` — British rail map/platform; unrelated.
- `LandXI-Web/Main` — geospatial/satellite AI platform; unrelated.
- `coachofanalytics/dev` — analytics/investment/business Django platform; not a clean strategy-research candidate.
- `Smile-Wifi/Main` — local Wi-Fi/intranet portal; unrelated/mixed sandbox.
- `ASPECT-pipeline/main` — ESA/Hera hyperspectral scientific pipeline; unrelated.

---

## Maintenance rule

Every future search pass must:

1. add every repo meaningfully inspected, even rejected ones;
2. create a **full human-readable card** in the corresponding pass/deep-dive document;
3. use this file only as anti-duplicate index + pointer;
4. **never promote to `INTERESTING_REPOS.md` without explicit owner command**;
5. on material new commits/results use `REVISIT`, retaining the original identity;
6. never rely on chat memory alone for deduplication.
