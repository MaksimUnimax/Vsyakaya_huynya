# Polymarket Bridge live acceptance — 2026-09-18

Status: **PARTIAL LIVE PASS / CONTINUE**

Owner environment:
- Polymarket account: NO
- Credentials: NONE
- Extension installed: YES
- Current scope: public read-only

## Live smoke #1

Command:

`POLYMARKET_API_V1 {"method":"markets.list","closed":true,"limit":3}`

Observed returned envelope:
- bridge: `polymarket-bridge`
- version: `0.1.0`
- operation: `markets.list`
- status: `OK`
- request_executed: `true`
- HTTP: `200`
- elapsed_ms: `1083`
- returned markets: `3`
- next_cursor: present

Verdict:
- ChatGPT code-block action -> worker -> public Gamma API -> durable result -> same ChatGPT conversation delivery: **PASS**
- public access without account/credentials: **PASS**

## Data-integrity observation from smoke response

The returned legacy closed markets demonstrate that Gamma metadata cannot be treated as a ready-made resolved-outcome table without normalization:

- `closed:true` can coexist with `active:true`;
- legacy rows returned `outcomePrices:["0","0"]`;
- therefore final outcome must not be inferred from `outcomePrices` alone.

The large-corpus Work prompt must preserve this as an integrity gate: resolution/outcome mapping must be independently established from source-supported terminal fields or other authoritative Polymarket resolution data before calibration statistics.

## Remaining live acceptance

1. multi-command block executes in source order;
2. `market.get` works for a concrete id;
3. historical price endpoint works or returns a controlled provider error;
4. malformed command yields controlled chat-visible error and does not consume the following valid command;
5. result-size cap fails boundedly.


## Live smoke #2 — multi-command + legacy history

One code block contained, in source order:

1. `market.get id=12`
2. `priceHistory.get` for that market's YES token with `interval=max`, `bucketSeconds=86400`.

Observed:
- envelope: `POLYMARKET_BATCH_RESULT_V1`
- count: `2`
- command 1: HTTP 200 / OK / request_executed=true
- command 2: HTTP 200 / OK / request_executed=true
- command 2 result: empty `data: []`, no pagination continuation.

Verdict:
- multi-command discovery: **PASS**
- source-order serial execution: **PASS**
- later command does not destroy earlier successful result: **PASS**
- public historical-price endpoint transport: **PASS**
- historical coverage for this 2020 token: **NO DATA**

### Research consequence

A resolved-market corpus cannot assume uniform price-history retention back to Polymarket's earliest markets. Full-corpus Work must first produce a coverage matrix by market year/date/horizon and explicitly distinguish:

- market metadata available;
- outcome/resolution identifiable;
- historical price series available;
- historical trade series available.

Missing historical price data must never be imputed as zero or treated as a no-trade observation.
