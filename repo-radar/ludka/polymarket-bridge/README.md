# Polymarket Bridge — ChatGPT ↔ Polymarket public APIs

Version: **0.1.2**
Status: **READ-ONLY RESEARCH BRIDGE / CI PASS / LIVE AUTO-SEND ACCEPTANCE PENDING**

Reference: owner-provided **Yandex Marketing Bridge 0.1.9**.

## Purpose

`ChatGPT code block -> Polymarket button -> worker -> public Polymarket API -> durable outbox -> text or JSON attachment -> validated ChatGPT Send`

No Polymarket account or credentials are required for the current public research scope.

## Supported operations

- `markets.list`
- `market.get`
- `events.list`
- `event.get`
- `book.get`
- `books.get`
- `price.get`
- `midpoint.get`
- `priceHistory.get`
- `trades.list`

## Large-result delivery

Small results return as text.

Large results use:
`JSON -> IndexedDB -> ~256 KiB chunks -> per-chunk SHA-256 -> File -> DataTransfer -> attachment-ready gate -> stable validated Send target -> durable fingerprint commit -> final validation -> clickSynchronously -> new user-turn confirmation -> cleanup`.

The v0.1.1 live defect was specifically the final Send path: attachment worked but auto-Send did not. v0.1.2 replaces the simplified helper with the Yandex 0.1.9 reference-derived target/validation/click lifecycle.

## Large-data rule

Attachment transport does not change the project rule: full-corpus acquisition/normalization/statistical analysis goes to ChatGPT Work.

Canonical prompt:
`../experiments/polymarket-longshot-calibration/work-prompts/POLYMARKET_FULL_CORPUS_WORK_PROMPT.md`
