# Data layout and provenance contract

## Directory contract

Large generated datasets should normally be stored outside Git when they are too large, but every dataset used in a conclusion must have a committed manifest here.

Suggested logical layout:

```text
data/
  raw/          provider responses or JSONL page captures
  normalized/   one-row-per-market / one-row-per-observation tables
  derived/      calibration buckets, surge events, execution simulations
  manifests/    source URLs, retrieval times, hashes, row counts, schemas
```

Because Git does not track empty directories, `data/README.md` is the committed placeholder and authority until Work materializes datasets.

## Minimum raw market fields

Preserve, when the API provides them:

- market id;
- event id;
- condition id;
- slug;
- question/title;
- tags/category/sport when available;
- closed/active/accepting-orders state;
- start/end/closed/resolution timestamps;
- outcomes in source order;
- YES and NO token ids;
- negative-risk flag;
- fee/tick/min-order fields when available;
- final resolved outcome / terminal token values;
- raw source payload pointer/hash.

## Historical observation fields

For every sampled market/time point preserve:

- market id;
- token id;
- observation timestamp;
- seconds/hours/days to resolution;
- price source (`history`, `trade`, `bid`, `ask`, `mid`);
- price;
- bid and ask if known;
- volume/trade size if known;
- source endpoint;
- retrieval timestamp.

Never silently treat midpoint, last trade, candle close or token history as an executable price.

## Outcome integrity

Binary YES/NO studies must explicitly prove token/outcome mapping. Flag instead of silently coercing:

- ambiguous resolution;
- 50/50 or Unknown outcomes;
- multi-outcome/negative-risk structures that are not clean binary observations;
- markets with missing/contradictory terminal state.

## Reproducibility manifest

Every Work run that creates a dataset must write a machine-readable manifest containing:

- work id;
- date/time;
- exact source endpoints;
- request parameters and pagination cursors where practical;
- row counts before/after filters;
- SHA-256 of each materialized dataset;
- schema version;
- code/prompt revision;
- exclusion counts by reason;
- known gaps or provider failures.
