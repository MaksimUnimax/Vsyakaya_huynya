# Polymarket longshot / calibration experiment

Status: **ACTIVE EXPERIMENT / OWNER-APPROVED RESEARCH TRACK**

This directory is the only canonical home for the Polymarket experiment that grew out of the `mpatout/kalshi-market-research` longshot-bias idea.

## Research question

Do Polymarket prices systematically miscalibrate low-probability and high-probability outcomes, and do extreme price surges/reversals contain a repeatable anomaly after we separate prediction/calibration edge from execution/fill edge?

The experiment does **not** assume that the Kalshi result transfers to Polymarket. It transfers only the research method:

`market price -> implied probability -> later resolved outcome -> calibration error`

and, separately:

`price path / surge -> subsequent reversal or settlement -> conditional outcome frequency`.

## Hard separation of claims

1. **Calibration/model edge**: can be tested from public historical market metadata, price history, trades and final resolution.
2. **Executable taker edge**: additionally requires contemporaneous bid/ask and fees/slippage.
3. **Executable maker edge**: additionally requires realistic fill/queue/adverse-selection evidence; a touched price or candle volume is never treated as a fill by itself.
4. **Real-money proof**: requires actual small forward orders and exchange-confirmed fills. It is not inferred from backtest data.

## Data rule

All Polymarket experiment artifacts belong under this directory. Do not scatter raw pulls, normalized tables, manifests or reports elsewhere in the repo.

- `data/` — raw/normalized/derived data manifests and bounded artifacts.
- `evidence/` — hashes, source manifests, sample responses, execution evidence.
- `docs/` — methodology, credential setup, schemas, decisions.
- `work-prompts/` — canonical ChatGPT Work prompts for large-data collection/analysis.

## Large-data rule

**Main Chat must not attempt full-corpus analysis.**

Main Chat may:
- design the experiment;
- inspect small bounded samples;
- define schemas and acceptance gates;
- review Work output and perform targeted spot checks;
- audit code and methodology.

Full historical acquisition, normalization, joins, calibration tables, surge scans, resampling, statistical analysis and large-file processing must be handed to **ChatGPT Work** using the prompt in `work-prompts/POLYMARKET_FULL_CORPUS_WORK_PROMPT.md`.

## Current extension

The browser-side command bridge lives separately at:

`repo-radar/ludka/polymarket-bridge/`

Its first release is deliberately **public-read-only**. Public market data does not need credentials; trading/authentication will be a separate gated phase after the research pipeline is accepted.

## Frozen initial hypotheses

Before inspecting the full corpus, the first pass must test these predeclared hypotheses without retuning bucket boundaries to the result:

- H1: low-price YES outcomes (longshots) may resolve YES less often than their market-implied probability.
- H2: very high-price outcomes may show the opposite or a different calibration bias.
- H3: fast moves from low/moderate probability to 95-99% may overreact in some market families and horizons.
- H4: any effect may be category-specific and must not be pooled across unrelated markets before subgroup reporting.
- H5: calibration edge, if present, may disappear after executable bid/ask, fees and fill selection are applied.

No profitability claim is accepted merely because H1-H4 are statistically non-zero.
