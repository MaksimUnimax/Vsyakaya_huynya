# Лудка — REVIEWED REPOS / ANTI-DUPLICATE LEDGER

Постоянный реестр ВСЕХ GitHub-репозиториев, уже просмотренных в рамках ветки `лудка` или её исходного NASCAR-разбора.

Цель: не тратить следующие поисковые проходы на повторное «открытие» тех же проектов.

## Обязательное правило поиска

Перед каждым новым discovery pass сначала сверять найденный `owner/repo` с этим файлом.

- `INTERESTING` — сильная находка; полная карточка должна быть в `INTERESTING_REPOS.md`.
- `DEEP DIVE` — сейчас углубляем.
- `CANDIDATE` — стоит вернуться/допроверить.
- `ADVERSARIAL` — claims выглядят интересно/аномально, но сначала пытаться сломать методику.
- `WEAK` — просмотрен, недостаточно evidence/mechanics.
- `REJECTED` — не подходит текущей цели.
- `REVISIT` — старый repo получил существенное новое развитие; обновлять существующую запись, не считать новой находкой.

Наличие в этом файле означает: **не выдавать repo повторно как новый кандидат**.

---

## Strong / active research

| Repo | Status | Domain / reason | Next action |
|---|---|---|---|
| `routsiddharth/vela` | **INTERESTING / DEEP DIVE** | Kalshi short-dated BTC/ETH structural settlement mispricing; live execution; public notebook/code/data subset; 0 stars/forks/watchers | Deep audit completed; keep as interesting reference, no more Kalshi-account work for now |
| `jckund/test` | **INTERESTING / DEEP DIVE** | NASCAR Kalshi + sportsbook probability reconciliation; saved EV alerts; preliminary outcome backtest; 0 stars | Contract-level Top3-NO ticker/settlement/depth/mapping verification |
| `spencerfletcher/arbitrage-engine` | **INTERESTING / STRONG** | Kalshi ↔ Polymarket US taker-arb measurement system; ~69% of detected edges became stale-feed illusions; documented wrong-game matcher, fee, FOK and latency reversals | Deep-read CASE_STUDY/code and reconstruct which measurements remain independently reproducible |
| `spencerfletcher/market-maker` | **INTERESTING / COMPANION** | Successor to failed taker-arb thesis; exact-Decimal maker engines, queue/fee/freshness/crash rails; public reasoning is rich but all numeric results/tuning are withheld | Study failure classes and compare with arbitrage-engine; do not treat profitability as public evidence |
| `mperi1208/value-bet-model` | **INTERESTING / STRONG** | European football value betting; ML null result, sharp-book/slow-book line-shopping edge; two public downward corrections; 20,676 historical bets and CLV focus | Audit data causality, max-odds availability and forward-test artifacts; distinguish historical edge from current book limits |
| `PredictionMarketTrader/openthomas` | **CANDIDATE / STRONG** | Weather prediction markets; 7-model NWP consensus, leak-free station hindcast, market-prior blend; replay moved from -3.8c/ct to breakeven after bias/timing fixes | Verify replay data/orderbook source and whether public paper-run track record is actually committed |
| `charlieyang1557/polymarket-arb` | **CANDIDATE / STRONG** | Polymarket/Kalshi sports market making; real fills; adverse-selection post-mortem; four strategies negative/neutral | Reconstruct live fill evidence and simulator vs realized PnL |
| `tanamsethi31/footymodel` | **CANDIDATE / STRONG** | Football value betting; Dixon-Coles/xG/lineups; walk-forward; CLV; many explicit negative results | Finish latest RESULTS chronology and causal line-shopping audit |
| `GasparCoquet/pairs-trading-backtest` | **CANDIDATE / STRONG** | Equities pairs/stat-arb post-mortem; synthetic fallback + multiple-testing false edge exposed | Audit Git history of original false result vs correction |
| `santzmr/funding-rate-arbitrage` | **CANDIDATE** | BTC perpetual funding carry; fees turn theoretical positive result negative; documented 8h timestamp alignment bug | Reproduce corrected alignment/result tables; maker-fill realism |
| `himnishpersonal/arb-trading-bot` | **CANDIDATE** | Kalshi <-> Polymarket cross-venue arb framework; semantic contract-equivalence safeguards | Determine whether committed quote history/backtest evidence exists |
| `aayanvatsa04/btc-perpetual-funding-arbitrage` | **CANDIDATE** | Bybit BTC funding; OU signal, 2-year walk-forward, live paper bot claims | Verify generated result files/public evidence and exact backtest mechanics |
| `yoho369/crypto-perpetual-arbitrage` | **CANDIDATE / STRONG** | Funding-normalized cross-exchange perpetual stat-arb on one-minute BBO; rolling OU, EV gate, illiquidity guards, 2026 OOS claims; external master-data package | Reproduce report from supplied master data; attack OOS universe/parameter selection and taker execution assumptions |
| `seralifatih/pm-arbitrage` | **CANDIDATE / STRUCTURAL** | Polymarket multi-outcome basket arithmetic, top-K identities, per-leg liquidity checks; explicitly warns about missing “Other” probability mass | Verify event classifier/completeness logic and find preserved historical signals/fills before treating outputs as true arb |

---

## Adversarial queue

| Repo | Status | Why it is not accepted yet |
|---|---|---|
| `oddsflowai-team/oddsflow-ai-football-value-signals` | **ADVERSARIAL** | Claims ~3,181 bets / ~57.4% hit rate / ~38.5% ROI and still higher Monte-Carlo variants. Must audit odds timestamps, leakage, duplicates, stake/PnL arithmetic, selection and settlement before believing anything. |
| `PandaXPanther/pandaxpanther-prediction-bot` | **ADVERSARIAL** | Claims several strategies at once: structural arb, cross-venue arb, crypto latency, NOAA weather plus persisted fills/PnL. Attractive breadth itself is a reason to demand actual history/evidence. |
| `ImMike/polymarket-arbitrage` | **ADVERSARIAL / LOW CONFIDENCE** | README surfaced simulation claims around 99.6% win rate and ~$573 profit. Simulation headline alone is weak; only revisit if quote history and realistic execution evidence are public. |
| `maxstw23/pairs-trading` | **ADVERSARIAL** | Honest static FDR null but then claims OOS Kalman Sharpe 4.03 [3.28,4.77] with max DD -0.67%; repo was created/pushed in one day, price data not committed. Needs full reproduction, pair-selection audit and turnover/execution review. |

---

## Reviewed weak / rejected repos

These repos were surfaced and inspected enough to know they should NOT be returned as fresh discoveries without material new evidence.

| Repo | Status | Reason |
|---|---|---|
| `SohamMahale/crypto-arbitrage-project` | **WEAK / METHODOLOGY CONCERN** | One-day 2026 snapshot, simplistic monthly/APY aggregation and flat 0.4% cost assumption; labels annualized funding numbers as “best month” and has no order/fill chain. Useful background, not a strong edge diary. |
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

The following earlier `repo-radar` projects were not necessarily betting/arbitrage projects and are not candidates for `лудка`, but should remain recognized as already inspected in the parent research program so generic searches do not waste time reclassifying them:

- `spot-rail-hq/main` — British rail map/platform; unrelated to current market-edge scope.
- `LandXI-Web/Main` — geospatial/satellite AI platform; unrelated to current scope.
- `coachofanalytics/dev` — analytics/investment/business Django platform; not a clean strategy-research candidate.
- `Smile-Wifi/Main` — local Wi-Fi/intranet portal; unrelated and later downgraded as mixed sandbox.
- `ASPECT-pipeline/main` — ESA/Hera hyperspectral scientific pipeline; technically interesting, unrelated to `лудка`.

These should not be surfaced as new `лудка` discoveries.

---

## Maintenance rule

Every future search pass must update this ledger **in the same pass**:

1. add every repo meaningfully inspected, even rejected ones;
2. record one-line reason/status;
3. promote strong finds into `INTERESTING_REPOS.md`;
4. on material new commits/results use `REVISIT`, retaining the original identity;
5. never rely on chat memory alone for deduplication.
