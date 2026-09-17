# Лудка — INTERESTING REPOS

Постоянный индекс сильных public GitHub-находок ветки `лудка`.

Здесь хранятся только repos, к которым имеет смысл возвращаться ради **механики мышления автора, реальных данных, ошибок, отрицательных результатов, исполнения и проверяемых выводов**. Полный антидубль всех просмотренных проектов — `REVIEWED_REPOS.md`. Глубокие разборы и независимые аудиты лежат в `deep-dives/` и `audits/`.

## Правила реестра

- PUBLIC repo обязателен.
- Красивый README/PnL screenshot сам по себе не является evidence.
- Особенно ценны цепочки `идея -> тест -> ошибка/опровержение -> исправление -> новый тест`.
- Failed strategy может быть интереснее profitable claim, если видно, **почему** автор ошибся.
- Model edge отделять от execution edge: цена на графике не доказывает, что наш order исполнился бы.
- Для prediction markets отдельно проверять semantic equivalence, settlement rule, side mapping и полноту outcome space.
- Для каждой сильной находки фиксировать public footprint, что реально доказано и что остаётся claim.
- Public GitHub Traffic views/clones чужого repo недоступны; не подменять их stars/watchers.

---

# 1. `routsiddharth/vela`

URL: https://github.com/routsiddharth/vela

Status: **INTERESTING / DEEP AUDIT COMPLETED / KEEP AS REFERENCE**

Deep dive: `deep-dives/VELA_2026-09-17.md`

Independent audit: `audits/VELA_FILL_AUDIT_2026-09-17.md`

## Footprint

- Created: 2026-06-11.
- Last public push observed: 2026-07-01.
- Visible development concentrated into ~20 days.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Public repo almost unnoticed despite substantial code/data.

## Core finding

Kalshi short-dated crypto contracts settle on a **60-second arithmetic mean of CF Benchmarks RTI samples**, not the last BTC/ETH tick. As the settlement minute progresses, much of the final average becomes locked. Vela asks whether traders still overreact to the newest spot tick and temporarily sell the side whose settlement arithmetic is already strongly favored.

The project is valuable because the author did not stop at the first attractive result:

1. Historical lock-detection looked extraordinarily accurate.
2. Naive taker strategy failed because the market already priced the near-lock.
3. Early maker economics contained a fee-rounding mistake that the author later fixed.
4. A cheap-fill strategy then produced many small wins plus one large loss; the author discovered that “cheap” can mean the market knows the model is wrong, not that traders are panicking.
5. Live maker execution exposed low fill rates and left-tail risk.

## What our independent audit proved

Pinned committed `fill_calibration_btc.parquet`:

- 1,034 attempts;
- 88 fills = 8.51%;
- 85W / 3L = 96.5909%;
- all 88 settlement labels independently matched Kalshi historical results;
- all 946 unfilled chosen sides also independently resolved correctly;
- 88 filled rows sum to **+$15.87**, mean +$0.18034 per filled window;
- 85 winners made +$37.79 while only 3 losers lost -$21.92.

Important correction to the author's step-3 narrative: filled rows had lower average model confidence than unfilled rows. After adjusting for each row's own `p_side`, the extra fill-associated calibration penalty was about -1.60 percentage points with Monte-Carlo p≈0.266. Therefore this sample does **not** statistically prove an additional adverse-selection penalty beyond fills concentrating in weaker opportunities.

We also found dataset/execution defects:

- repeated placements collapsed by ticker;
- no actual filled quantity retained in the parquet;
- only first fill price retained;
- nearest book/estimate may be after placement;
- `our_depth` is total side depth, not queue-ahead depth;
- locally recorded maker price can differ from the actual submitted exchange price because the broker rounds to 2 decimals even where Kalshi supports 0.001 ticks;
- missing one-second feed buckets can make settlement confidence too high.

## Current limitation

The wider README claim `210 traded windows / 205W-5L / +$20.23` is not independently reproducible because the full runtime ledger is not committed.

Fresh September BRTI history would require authenticated Kalshi access. Owner currently has no phone available for Kalshi account verification, so **do not spend more project time trying to operationalize Vela now**. Keep it as an unusually good reasoning/reference repo.

## Reusable idea

The transferable insight is **settlement-function research**:

`literal resolution formula -> identify what becomes mathematically fixed early -> compare with what humans visibly react to -> test transient mismatch -> separately test fillability`.

---

# 2. `jckund/test`

URL: https://github.com/jckund/test

Status: **INTERESTING / CONTRACT-LEVEL VERIFICATION PENDING**

Deep dive: `deep-dives/NASCAR_JCKUND_TEST.md`

## Footprint

- Created: 2025-08-06.
- Active/pushed during our 2026-09-17 audit.
- Repo size around ~1.05 GB when inspected.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Almost empty public description/topics; repo name is simply `test`.

## Core finding

Automated NASCAR research system combining:

- Kalshi Winner/Top3/Top5/Top10 markets;
- FanDuel/sportsbook probability extraction;
- no-vig normalization;
- Monte-Carlo finishing-position model;
- persisted market histories and EV alerts.

Our preliminary reconstruction on four settled races found 112 first saved signals with paper cost ~$38.60 and payout $61, apparent paper P/L +$22.40. Almost all apparent edge came from **NO**, especially Top-3 NO on weak drivers; YES-only was approximately flat/slightly negative.

## Why it remains unresolved

The apparent anomaly is so large that the next task is not more backtesting. It is contract-level falsification:

`exact alert -> exact ticker -> exact settlement rule -> YES/NO transformation -> quoted price/depth -> sportsbook fair probability -> official finish -> Kalshi settlement -> executable return`.

Correlation is also severe: many Top-3 NO bets in one race are mechanically dependent because only three drivers can finish Top 3.

---

# 3. `spencerfletcher/arbitrage-engine`

URL: https://github.com/spencerfletcher/arbitrage-engine

Status: **INTERESTING / HIGH-PRIORITY REASONING REPO**

## Footprint

- Created: 2026-07-17.
- Last public push observed: 2026-09-16.
- Stars: 0.
- Forks: 0.
- Watchers: 0.
- Python; public snapshot of a private working repo, history intentionally squashed.

## What the author tried

Cross-venue **taker arbitrage** between Kalshi and Polymarket US. The naive thesis is simple: buy opposite sides of the same event across two venues for total cost < $1 and lock the difference.

The interesting part is that the author built an instrument specifically to prove his own detector wrong before risking capital.

## Major failures the instrument found

### 1. Most detected arb was stale-feed fiction

Fresh order-book re-reads showed roughly **69% of detected opportunities** were stale-feed illusions. The detector selected precisely the moments where a feed lag manufactured an apparent price gap. Random-market probes looked clean; detection-selected moments did not. This is a clean example of **selection bias in market data**.

### 2. Matcher created fake “guaranteed profit”

Doubleheaders broke event matching: game 1 on one venue paired against game 2 on the other. **149 of 264** logged “guaranteed profit” opportunities in one dataset were actually unrelated games.

### 3. Real venue behavior contradicted API documentation

A real probe order requested fill-or-kill for 300 shares where only 255 were available. The documented expectation was zero fill; venue behavior filled **255**. The first response record even showed zero, with the real fill in a later message. For an arb engine this can strand one leg and turn “risk-free” arb into directional exposure.

### 4. Fee model rejected genuine candidates

The author initially modeled a Kalshi display-table rounding behavior rather than the actual formula. Tiny real probe orders established the real charge; correcting the model recovered **327 of 3,234 (~10%)** opportunities previously rejected as unprofitable.

### 5. Latency assumption was reversed by measurement

The author nearly killed the strategy assuming ~0.3s edge lifetime was too short. In-region measurement found verification ~30ms and two order legs around ~78ms total. Latency was not the binding problem; **fillability was**.

### 6. Settlement equivalence was actually tested

Across **408 settled paired games** (MLB, WNBA, World Cup) the matched markets reportedly produced zero settlement divergences and zero voids. This supports the matching/settlement premise better than title similarity alone.

## Why this repo is unusually valuable

The author repeatedly published a hopeful inference, then downgraded it after a better measurement. The public `CASE_STUDY.md` is effectively a diary of:

`claim -> probe -> probe itself was wrong -> new probe -> selection effect -> strategy thesis changed`.

The eventual conclusion is not “arb works.” It is still **pending**: latency appears cleared, settlement equivalence held in the measured sample, but whether the remaining real edges are fillable at meaningful size was still open.

## Evidence limitation

Market selection, tuned values and full measurement datasets/results are intentionally withheld. The reasoning and code are public; the full reproducible measurement corpus is not. Treat reported counts as documented observations, not independently replayed results yet.

## Next action

Deep-read `CASE_STUDY.md`, exact matcher/fire-path/fee code and any captured fixtures. Determine which of the published measurements can be independently reconstructed from committed material.

---

# 4. `mperi1208/value-bet-model`

URL: https://github.com/mperi1208/value-bet-model

Status: **INTERESTING / STRONG**

## Footprint

- Created: 2026-03-16.
- Last public push observed: 2026-09-14.
- Stars: 3.
- Forks: 1.
- Watchers: 3.
- Python; active several-month research history.

## The surprising result

The author started by asking whether public football data plus ML could beat European bookmaker prices.

It could not.

Five ML iterations, 53 features, 25 seasons and 10 leagues produced an honest result around **-6.7% ROI** with AUC ceiling ~0.56. The repo says an earlier false-positive version and later -3.2% headline were both inflated by methodological errors.

Then the useful edge appeared only after the author effectively **deleted the prediction model**:

`Pinnacle sharp price -> power devig -> compare soft-book odds -> bet only when a slow bookmaker offers >2% estimated EV`.

The thesis became market microstructure, not football forecasting.

## Reported historical evidence

Portfolio 2012–2024:

- 20,676 bets;
- ROI +4.86%;
- reported 95% interval [+2.6%, +7.1%];
- CLV +3.05%;
- selected bets beat Pinnacle close in all 13 seasons, ~68% individually.

Robustness reported:

- leave any league out -> remaining result +4.4% to +5.4%;
- worst-case execution using Bet365 only -> +1.6% ROI, +1.4% CLV;
- EV buckets form a monotonic gradient from losing negative-EV bets to strongest positive bucket;
- indiscriminately betting panel maximum still loses, arguing that “best available odds” alone does not explain the result.

## Two public downward corrections

### July 2026

ML headline corrected from -3.2% to **-6.7%** because global isotonic recalibration used the entire OOS set and leagues had been excluded after seeing results. Earlier v1 had even shown a false +3.8%.

### September 2026

Asian Handicap CLV corrected from +1.6% to **+0.4%**, essentially a coin flip. The author explicitly removes that leg as evidential support instead of preserving the prettier story.

## Most important business/mechanics conclusion

The edge appears to be **slow soft-book repricing relative to a sharp reference**, not superior match prediction. The author says it does **not** survive on Betfair Exchange: only ~51% of selections beat close and realistic commission makes it negative. Soft books also limit winning accounts, which may be the real scalability ceiling.

The repo also reports clear decay: qualifying 1X2 mispricings roughly halved from ~1,810/season in 2012–2014 to ~845 in 2022–2024. Recent ROI is much less conclusive even while CLV remains positive.

## Why it belongs here

This is exactly the reasoning pattern we want:

`ML thesis fails -> audit makes result worse -> diagnostic accidentally reveals price-dispersion clue -> delete ML -> formulate simpler structural thesis -> test placebo/CLV/league robustness -> explicitly document decay and operational limit`.

## Next action

Audit odds timestamp causality, whether historical “Max” odds were genuinely available/executable at the assumed time, exact power-devig implementation, CLV calculation and any committed forward paper-trading ledger.

---

# 5. `spencerfletcher/market-maker`

URL: https://github.com/spencerfletcher/market-maker

Status: **INTERESTING / ENGINEERING COMPANION / RESULTS WITHHELD**

## Footprint

- Created: 2026-08-17.
- Last public push observed: 2026-09-16.
- Stars: 1.
- Forks: 0.
- Watchers: 1.
- README reports ~44.8k lines of Python and 878 public tests in the current export.

## Why it exists

This is the successor to `arbitrage-engine` after the author concluded that taker-arb catchability and edge realness were anti-correlated. Instead of racing for fleeting mispricing, the new thesis is:

> if you cannot reliably win the race to take liquidity, get paid to **be** liquidity — but only if you can measure fees, queue, markouts, inventory and venue failure honestly.

## Public reasoning is the asset

The author intentionally withholds market selection, tuning and every numerical result. So this is **not** a public-profitability repo.

What is public is a very detailed failure taxonomy:

- WebSocket can be alive by ping/frames but stale in **content**;
- per-process rate limits fail when several collectors/makers share one source IP;
- teardown itself can trigger venue bans and needs ownership that survives the dying process;
- a fill can exist at the venue but disappear from local accounting after SIGKILL;
- an alert channel cannot be the sole witness to its own failure;
- float noise amplified by ceil/floor/zero comparisons produced both fee and phantom-book bugs;
- venue fixtures should come from captured wire responses, not hand-written assumptions.

The code moved money fields to exact `Decimal` because both historical precision bugs occurred when tiny float error crossed a discrete threshold.

## Evidence limitation

The README explicitly states that profitability, strategy, books, tuning and measurement results stay private. Keep it because the reasoning is exceptional, **not** because it proves an edge.

## Next action

Use as a cross-check/reference when auditing execution claims in other repos: queue attribution, exact fee rounding, stale-content detection, crash recovery and exchange-response reality.

---

# 6. `PredictionMarketTrader/openthomas`

URL: https://github.com/PredictionMarketTrader/openthomas

Status: **INTERESTING / WEATHER RESEARCH / VERIFY PUBLIC TRACK RECORD**

## Footprint

- Created: 2026-07-03.
- Last public push observed: 2026-09-12.
- Stars: 5.
- Forks: 1.
- Watchers: 5.
- Python; active weather/prediction-market research project.

## Core idea

Weather markets settle on a named observation station. OpenThomas builds a probability distribution using multiple numerical weather-prediction models, learns station-specific systematic forecast bias from historical hindcasts, truncates against already-observed daily extremes and then blends/adjusts with market information. LLM output is bounded; deterministic risk code controls sizing and whether a proposed trade is allowed.

## Why it is interesting despite no accepted profit claim

The README publishes an explicit failure progression on a 21-day replay using real Kalshi order-book history:

- naked model-vs-market: about **-3.8 cents/contract**;
- add learned station bias + market-prior blend: about **-1.8 cents/contract**;
- fix a timing leak where replay accidentally knew the morning low too early: approximately **breakeven**.

That is a much better research signal than a synthetic “AI trader made 40%” claim. The project is explicitly trying to make the statistical baseline, data causality and calibration do the work rather than treating the LLM as magic.

The hindcast layer claims station-specific biases (for example Miami and Philadelphia) learned strictly from historical forecast-vs-settlement pairs, and the report command measures Brier skill against market prices by station × lead time.

## Current evidence gap

The repo says journals, verification history, calibration and learned strategy live under the user's local `~/.openthomas/`. The public source tree does not obviously contain a complete live paper-trading ledger. Therefore the current profitability/learning trajectory must be treated as **unproven until a public track record or reproducible replay bundle is found**.

## Next action

Audit replay order-book source, leak-free hindcast implementation, station mapping/resolution rules and whether `openthomas.com` or committed site artifacts preserve an independently checkable paper run.

---

# Registry maintenance

Before every future `лудка` discovery pass:

1. Check `REVIEWED_REPOS.md` first.
2. Never present a previously reviewed repo as a new discovery.
3. Every meaningfully inspected repo enters `REVIEWED_REPOS.md`, including weak/rejected ones.
4. Promote only genuinely strong reasoning/evidence repos here.
5. Keep detailed audits in `deep-dives/` or `audits/`; this file stays an index.
6. If an old repo gets materially new data/results, mark it `REVISIT` rather than duplicating it.
