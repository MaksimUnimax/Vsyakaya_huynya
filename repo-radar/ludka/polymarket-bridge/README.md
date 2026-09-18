# Polymarket Bridge — ChatGPT ↔ Polymarket public APIs

Version: **0.1.0**
Status: **INITIAL READ-ONLY RESEARCH BRIDGE**

Dedicated browser extension for the `лудка` Polymarket experiment.

Reference lineage: Yandex Marketing Bridge from `MaksimUnimax/Yandex_direct`, especially its conversation binding, separate Manual sibling action, worker-owned parsing/validation, serial multi-command execution, durable outbox and ChatGPT composer delivery lifecycle.

## Purpose

Let ChatGPT issue bounded Polymarket API commands in code blocks and have the browser extension:

`ChatGPT code block -> Polymarket button -> worker -> public Polymarket API -> durable outbox -> ChatGPT composer -> Send`

The bridge exists for research acquisition and bounded inspection. It is **not** a trading bot in v0.1.0.

## Security boundary

v0.1.0 supports **public read-only operations only** and stores **no wallet private key, CLOB secret or passphrase**.

Polymarket public market data is available without credentials, so credentials are not needed for the initial longshot/calibration experiment.

Authenticated account reads and real order placement are intentionally deferred to a later security-reviewed phase.

## Install locally

1. Download/checkout this directory.
2. Open `chrome://extensions` (or the Chromium-compatible browser's extensions page).
3. Enable Developer mode.
4. Choose **Load unpacked**.
5. Select `repo-radar/ludka/polymarket-bridge/src`.
6. Open a concrete ChatGPT conversation (`/c/<id>`).
7. Open the extension popup and turn **Manual bridge** ON for that conversation.

## Command format

One command:

```text
POLYMARKET_API_V1
{"method":"markets.list","closed":true,"limit":5}
```

Multiple commands can be placed in the same code block. They are discovered in source order and executed strictly serially.

Supported v0.1.0 methods:

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

See `docs/PROTOCOL.md` for exact fields.

## Large-result rule

The bridge does not copy the withdrawn unsafe Yandex large-file design. Provider responses are capped before chat delivery. If a response is too large, use narrower pagination/time ranges and hand the complete corpus to ChatGPT Work using the experiment's canonical Work prompt.

Large-data analysis belongs in:

`../experiments/polymarket-longshot-calibration/work-prompts/POLYMARKET_FULL_CORPUS_WORK_PROMPT.md`
