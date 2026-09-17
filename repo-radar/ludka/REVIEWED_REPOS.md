# Лудка — REVIEWED REPOS / ANTI-DUPLICATE LEDGER

Постоянный реестр ВСЕХ GitHub-репозиториев, уже просмотренных в рамках ветки `лудка` или её исходного NASCAR-разбора.

Цель: не тратить следующие поисковые проходы на повторное «открытие» тех же проектов.

## Обязательное правило поиска

Перед каждым новым discovery pass сначала сверять найденный `owner/repo` с этим файлом.

- `INTERESTING` — **только owner-approved**; полная карточка должна быть в `INTERESTING_REPOS.md`.
- `DEEP DIVE` — сейчас углубляем.
- `CANDIDATE` — стоит вернуться/допроверить.
- `ADVERSARIAL` — claims выглядят интересно/аномально, но сначала пытаться сломать методику.
- `WEAK` — просмотрен, недостаточно evidence/mechanics.
- `REJECTED` — не подходит текущей цели.
- `REVISIT` — старый repo получил существенное новое развитие; обновлять существующую запись, не считать новой находкой.

**Ассистент не имеет права сам переводить CANDIDATE/ADVERSARIAL в INTERESTING. Это делает только владелец явной командой.**

Наличие в этом файле означает: **не выдавать repo повторно как новый кандидат**.

Полные карточки текущего P2-pass: `CANDIDATES-2026-09-17-P2.md`.

---

## Strong / active research

| Repo | Status | Domain / reason | Full card / next action |
|---|---|---|---|
| `routsiddharth/vela` | **INTERESTING / OWNER-APPROVED / DEEP DIVE** | Kalshi short-dated BTC/ETH structural settlement mispricing; live execution; independent audit completed | `INTERESTING_REPOS.md`; `deep-dives/VELA_2026-09-17.md`; keep as reference, no more Kalshi-account work for now |
| `jckund/test` | **INTERESTING / OWNER-APPROVED / DEEP DIVE** | NASCAR Kalshi + sportsbook probability reconciliation; saved EV alerts; preliminary outcome reconstruction | `INTERESTING_REPOS.md`; `deep-dives/NASCAR_JCKUND_TEST.md`; next = contract-level Top3-NO verification |
| `spencerfletcher/arbitrage-engine` | **CANDIDATE / STRONG** | Kalshi ↔ Polymarket US taker-arb measurement system; stale-feed selection, wrong-game matcher, fee/FOK/latency reversals | Full card in `CANDIDATES-2026-09-17-P2.md`; deep-read fire path and reproduce what public evidence permits |
| `spencerfletcher/market-maker` | **CANDIDATE / ENGINEERING** | Successor maker engine; exact-Decimal, queue/fee/freshness/crash rails; numeric results/tuning withheld | Full card in P2; use as execution-audit reference, not profitability evidence |
| `mperi1208/value-bet-model` | **CANDIDATE / STRONG** | Football: ML null, then sharp-book/slow-book line-shopping thesis; two public downward corrections | Full card in P2; audit odds timestamps, Max-price executability, CLV and forward ledger |
| `PredictionMarketTrader/openthomas` | **CANDIDATE / STRONG** | Weather prediction markets; NWP consensus, station bias, leak-free hindcast, replay corrected toward breakeven | Full card in P2; verify historical-orderbook/replay source and public paper record |
| `charlieyang1557/polymarket-arb` | **CANDIDATE / STRONG** | Polymarket/Kalshi sports market making; real fills; adverse-selection post-mortem; four strategies negative/neutral | Reconstruct live fill evidence and simulator vs realized PnL |
| `tanamsethi31/footymodel` | **CANDIDATE / STRONG** | Football value betting; Dixon-Coles/xG/lineups; walk-forward; CLV; many explicit negative results | Finish latest RESULTS chronology and causal line-shopping audit |
| `GasparCoquet/pairs-trading-backtest` | **CANDIDATE / STRONG** | Equities pairs/stat-arb post-mortem; synthetic fallback + multiple-testing false edge exposed | Audit Git history of original false result vs correction |
| `santzmr/funding-rate-arbitrage` | **CANDIDATE** | BTC perpetual funding carry; fees flip theoretical positive to negative; documented 8h timestamp bug | Reproduce corrected alignment/result tables; maker-fill realism |
| `himnishpersonal/arb-trading-bot` | **CANDIDATE** | Kalshi ↔ Polymarket cross-venue arb; semantic contract-equivalence safeguards | Determine whether committed quote history/backtest evidence exists |
| `aayanvatsa04/btc-perpetual-funding-arbitrage` | **CANDIDATE** | BTC funding; OU signal, 2-year walk-forward, live paper bot claims | Verify generated result files/public evidence and exact mechanics |
| `yoho369/crypto-perpetual-arbitrage` | **CANDIDATE / ADVERSARIAL REPRO NEEDED** | Funding-normalized cross-exchange perpetual stat-arb using minute BBO, rolling OU/s-score, EV and liquidity gates; strong OOS claims | Full human card in P2; reconcile 2025 default main vs README 2026 OOS, external data, imputed exits and parameter selection |
| `seralifatih/pm-arbitrage` | **CANDIDATE / STRUCTURAL** | Polymarket multi-outcome basket arithmetic; exact-K identity only valid with complete outcome space | Full card in P2; verify completeness, rules, fees and preserved real opportunities |

---

## Adversarial queue

| Repo | Status | Why it is not accepted yet |
|---|---|---|
| `oddsflowai-team/oddsflow-ai-football-value-signals` | **ADVERSARIAL** | Claims ~3,181 bets / ~57.4% hit rate / ~38.5% ROI and still higher Monte-Carlo variants. Must audit odds timestamps, leakage, duplicates, stake/PnL arithmetic, selection and settlement before believing anything. |
| `PandaXPanther/pandaxpanther-prediction-bot` | **ADVERSARIAL** | Claims several strategies at once: structural arb, cross-venue arb, crypto latency, NOAA weather plus persisted fills/PnL. Attractive breadth itself is a reason to demand actual history/evidence. |
| `ImMike/polymarket-arbitrage` | **ADVERSARIAL / LOW CONFIDENCE** | README surfaced simulation claims around 99.6% win rate and ~$573 profit. Simulation headline alone is weak; only revisit if quote history and realistic execution evidence are public. |
| `maxstw23/pairs-trading` | **ADVERSARIAL** | Static FDR screen says no pair survives, yet Kalman path claims OOS Sharpe 4.03 and max DD -0.67%; price data not committed and repo is one-day snapshot | Full card in P2; first question = what exact `pairs` DataFrame is passed into `kalman_backtest` after FDR null? |

---

## Reviewed weak / rejected repos

These repos were surfaced and inspected enough to know they should NOT be returned as fresh discoveries without material new evidence.

| Repo | Status | Reason |
|---|---|---|
| `SohamMahale/crypto-arbitrage-project` | **WEAK / METHODOLOGY CONCERN** | Full card in P2. Annualized monthly averages are presented like backtest returns; no path-dependent position/funding simulation; spot/futures rows aligned by row count rather than timestamp. |
| `arkda34/sports-simulate-trade` | **WEAK** | Sports simulation/trading theme surfaced, but no evidence base comparable to stronger candidates. |
| `eskayML/sportsbookdata` | **WEAK** | Primarily sportsbook data tooling; not enough model/decision/result chain for current radar. |
| `johnpqja7331/sports-betting-ai` | **WEAK** | Generic sports-betting AI framing; insufficient independently checkable execution/results in initial pass. |
| `gabmrocha05/sports-betting` | **WEAK** | Sports betting project surfaced but did not clear evidence/mechanics threshold. |
| `albarqouni/Sport-betting` | **WEAK** | Betting/model theme but weak fit relative to current evidence standard. |
| `arbriov/arbitrage-betting-bot-demo` | **REJECTED** | Demo repo; current track requires inspectable mechanics/history rather than a demonstration shell. |
| `dirkcgrunwald/sportsbookreview-scraper` | **REJECTED** | Old scraper/data acquisition, not an edge/model/execution research system; multiple scraper clones add noise. |
| `Sports-Betting-Applications/EM_Project` | **REJECTED** | Aggregate/course-style project rather than an active independently verifiable strategy system. |
| `kmoise/betfair-arbitrage` | **REJECTED** | Tutorial/skeleton-level arbitrage implementation; insufficient evidence/history. |
| `stanpost1/Sports-Betting-Arbitrage-Script-LowCode` | **REJECTED** | Low-code automation glue; not enough underlying probability/market-mechanics research. |
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