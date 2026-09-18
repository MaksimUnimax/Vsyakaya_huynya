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
