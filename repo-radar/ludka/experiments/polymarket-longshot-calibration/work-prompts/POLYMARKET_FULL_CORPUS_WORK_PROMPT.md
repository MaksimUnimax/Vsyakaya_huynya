# ChatGPT Work prompt — Polymarket full-corpus calibration / longshot-bias experiment

WORK_ID: POLYMARKET_LONGSHOT_CALIBRATION_FULL_CORPUS_V1

CONTINUE THE EXISTING `лудка` RESEARCH TRACK.

Repository: `MaksimUnimax/Vsyakaya_huynya`
Branch: `лудка`
Experiment root:
`repo-radar/ludka/experiments/polymarket-longshot-calibration`

THIS IS A LARGE-DATA EXECUTION TASK.
THIS IS NOT A REQUEST FOR MAIN-CHAT SAMPLING.
PROCESS THE COMPLETE BOUNDED CORPUS AVAILABLE FOR THE DECLARED WINDOW/ENDPOINTS.
DO NOT SUBSTITUTE A SMALL SAMPLE FOR THE CORPUS.

## ROLE BOUNDARY — MAIN CHAT IS THE AUTHORITY

Main Chat is the principal architect, research lead and acceptance authority for this experiment.

ChatGPT Work is ONLY the large-data execution/analysis worker operating under Main Chat's task definition.

Work MUST NOT:
- redefine the research roadmap;
- accept or reject a project phase;
- change frozen hypotheses, buckets, horizons or integrity gates on its own;
- replace the experiment methodology with a different one;
- make product/architecture decisions for Polymarket Bridge;
- decide what the next project step is;
- silently launch a new follow-up study outside the bounded task;
- treat its own result as final project acceptance.

Work MUST:
1. execute the complete bounded large-data task defined below;
2. preserve provenance, hashes, row counts, exclusions and failures;
3. write required artifacts;
4. report findings and unresolved issues back to Main Chat;
5. stop after the bounded assignment is complete.

If the data reveals that another large-data pass is needed, Work may describe the proposed follow-up and why it is needed, but MUST NOT start that new pass unless Main Chat explicitly sends a new task.

Main Chat will review the Work return, determine acceptance, and issue any next Work prompt.

## Purpose

Test whether Polymarket exhibits stable probability miscalibration analogous in method (not assumed result) to the `mpatout/kalshi-market-research` longshot-bias study.

Separate:

1. calibration/model edge;
2. taker executability;
3. maker fill/queue/adverse-selection;
4. real forward execution evidence.

Never turn a calibration anomaly into a profitability claim without the later execution layers.

## Frozen hypotheses

Do not tune these after seeing the result:

- H1: low-price YES outcomes may resolve YES less often than their implied probability.
- H2: very high-price outcomes may show a distinct calibration bias.
- H3: fast moves into the 95-99% zone may overreact in some market families/horizons.
- H4: effects may differ materially by category and time-to-resolution.
- H5: statistical calibration edge may disappear after executable pricing and fill selection.

## Required acquisition

Use the current official Polymarket public APIs and/or bounded data artifacts produced by the Polymarket Bridge. Public data does not require credentials.

Acquire the full accessible resolved-market corpus for the declared run window. Persist source provenance before analysis.

Required source classes where available:

- Gamma market/event metadata and pagination;
- per-market fee fields / fee schedule metadata and whether fees are enabled;
- YES/NO token ids and outcome ordering;
- historical token price observations;
- public trade/activity data when available;
- final market resolution/terminal outcome;
- current/forward book data only when explicitly captured contemporaneously.

Do not invent historical order-book queue state that the source does not provide.

## Required integrity gates before statistics

1. Prove YES/NO token mapping from source fields.
2. Separate or exclude ambiguous, Unknown/50-50 and non-clean binary outcomes.
3. Treat negative-risk / multi-market events explicitly; do not silently flatten them into independent binary observations.
4. Deduplicate markets and observations using stable ids.
5. Record missing-history coverage by market age/horizon.
6. Preserve fee metadata per market. Never substitute one global fee model where source metadata differs by market.
7. Record every API failure and retry; never silently drop failed pages.
8. Freeze retrieval timestamp and endpoint/parameter manifest.

If any integrity gate materially fails, stop statistical interpretation and report the failure rather than guessing.

## Canonical time horizons

For each clean binary market, attempt point-in-time price observations at fixed horizons before resolution:

- 30 days;
- 7 days;
- 24 hours;
- 6 hours;
- 1 hour.

When exact timestamp is unavailable, define and document one deterministic nearest-prior rule. Never use an observation after the target horizon as if it were known earlier.

## Frozen calibration buckets

Use fixed YES price buckets for the first pass:

- [0.00, 0.02)
- [0.02, 0.05)
- [0.05, 0.10)
- [0.10, 0.20)
- [0.20, 0.40)
- [0.40, 0.60)
- [0.60, 0.80)
- [0.80, 0.90)
- [0.90, 0.95)
- [0.95, 0.98)
- [0.98, 1.00]

Do not redesign bucket boundaries because one version looks more profitable.

For every horizon and bucket report at minimum:

- N markets;
- mean/median quoted probability;
- actual YES frequency;
- calibration residual `actual - quoted`;
- binomial/Wilson 95% interval for actual frequency;
- bootstrap or other clearly defined uncertainty for the residual;
- Brier contribution where meaningful.

Also report category/tag subgroups only with explicit sample sizes. Do not pool correlated markets from the same event as if all were independent without an event-clustered sensitivity.

## Surge/reversal study

Predeclare a first-pass surge definition before running it. Suggested bounded definition:

- origin <= 0.35;
- later price >= 0.95;
- transition within <= 60 minutes;
- record maximum, time to maximum, subsequent minimum, time to resolution and final outcome.

Run sensitivities around the definition only after the primary result is frozen and label them exploratory.

Report:

- number of surge events;
- number of unique parent events;
- terminal YES rate;
- reversal frequencies at fixed thresholds;
- conditional results by time-to-resolution and category;
- clustering by event/day.

## No fake fill assumption

Historical calibration analysis must not say `filled` merely because:

- price touched a level;
- a candle included that level;
- aggregate volume existed in that candle.

Historical trade-through/taker simulations must be labeled separately from maker-fill simulations.

Maker simulation requires contemporaneous queue/order-book evidence. If unavailable, report `MAKER_FILL_NOT_IDENTIFIABLE_FROM_HISTORICAL_DATA`.

## Outputs

Write under the experiment root only.

Required:

- `data/manifests/<work_id>.json`
- normalized market table (Parquet preferred; CSV acceptable if bounded)
- normalized observation table
- surge-event table
- compact calibration table CSV
- `evidence/<work_id>_QA.md`
- `evidence/<work_id>_RESULTS.md`

For files too large for Git, retain them as Work artifacts and commit only manifest/hash/schema/row counts plus any bounded derived tables that are suitable for Git.

Every material data file must have SHA-256 in the manifest.

## Reporting standard

The final report must distinguish:

- SOURCE FACT;
- DERIVED RESULT;
- INFERENCE;
- NOT IDENTIFIABLE FROM CURRENT DATA.

Do not use phrases like `working strategy` unless execution has actually been demonstrated. A statistically significant calibration bias is only a candidate market inefficiency until transaction/execution layers survive.

Return exact file paths, row counts, hashes, exclusions and a concise result summary. Do not dump the full corpus into chat.


## LIVE QUOTE-SEMANTICS HARD GATE

Accepted v0.1.3 live evidence established for one YES token:
- `book.get` best bid = 0.037;
- `book.get` best ask = 0.038;
- `price.get side=BUY` = 0.037;
- `price.get side=SELL` = 0.038.

Therefore:

1. DO NOT infer executable buy/sell economics from the literal `side=BUY/SELL` label alone.
2. Before any execution/PnL calculation, reconcile the price endpoint semantics against the corresponding order-book best bid/best ask on bounded live samples.
3. Preserve both raw endpoint side labels and independently derived book-side labels.
4. If endpoint-side semantics cannot be proven stable, use explicit order-book bid/ask for execution modeling and mark the price endpoint as descriptive only.
5. Never silently swap or reinterpret sides to make results look coherent.
