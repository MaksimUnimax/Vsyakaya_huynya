# POLYMARKET_API_V1 protocol

Prefix:

`POLYMARKET_API_V1`

Every marker must be followed by exactly one JSON object.

## Result prefixes

- one successfully parsed command: `POLYMARKET_RESULT_V1`
- a multi-command block: `POLYMARKET_BATCH_RESULT_V1`
- controlled parse/discovery error: `POLYMARKET_ERROR_V1`

## Operations

### `markets.list`

Public Gamma keyset feed.

Fields:
- `closed` boolean, optional;
- `limit` integer 1..100, default 20;
- `afterCursor` string, optional;
- `tagId` positive integer, optional.

### `market.get`

Exactly one of:
- `id` string;
- `slug` string.

### `events.list`

Same pagination fields as `markets.list`.

### `event.get`

Exactly one of `id` or `slug`.

### `book.get`

- `tokenId` required.

Reads the current CLOB order book.

### `books.get`

- `tokenIds` array, 1..100 in this bridge version.

Polymarket itself supports larger batches; the bridge uses a lower bound to control ChatGPT payload size.

### `price.get`

- `tokenId` required;
- `side`: `BUY` or `SELL`.

`BUY` means current lowest ask. `SELL` means current highest bid.

### `midpoint.get`

- `tokenId` required.

### `priceHistory.get`

- `tokenId` required;
- optional `interval` string such as `1d`;
- optional `start` Unix seconds;
- optional `end` Unix seconds;
- optional `asOf` Unix seconds;
- optional `bucketSeconds` positive integer.

Use bounded time windows for fine-grained history. The bridge rejects an unbounded request with no `interval`, `start/end`, or `asOf` selector.

### `trades.list`

Public Data API trades feed.

Fields:
- `conditionId` required;
- `limit` integer 1..100, default 20;
- optional `cursor` string;
- optional `start` Unix seconds;
- optional `end` Unix seconds.

## Examples

```text
POLYMARKET_API_V1
{"method":"market.get","slug":"will-the-us-confirm-that-aliens-exist-before-2027-789-924-249"}
```

```text
POLYMARKET_API_V1
{"method":"price.get","tokenId":"<token>","side":"BUY"}

POLYMARKET_API_V1
{"method":"book.get","tokenId":"<token>"}
```

## Result envelope

Every provider execution returns at minimum:

- `bridge`;
- `version`;
- `service`;
- `operation`;
- `request_id`;
- `status`;
- `request_executed`;
- `command`;
- `http_status`;
- `elapsed_ms`;
- `result` or controlled error payload.
