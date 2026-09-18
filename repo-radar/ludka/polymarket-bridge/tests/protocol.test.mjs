import assert from "node:assert/strict";

await import("../src/product.js");
await import("../src/protocol.js");
const P = globalThis.PolymarketBridgeProtocol;

assert.equal(P.PREFIX, "POLYMARKET_API_V1");

const markets = P.parseCommandText('POLYMARKET_API_V1\n{"method":"markets.list","closed":true,"limit":5}');
assert.deepEqual(markets, { method: "markets.list", limit: 5, closed: true });
assert.match(P.buildRequest(markets).url, /gamma-api\.polymarket\.com\/markets\/keyset/);

const price = P.normalizeCommand({ method: "price.get", tokenId: "123", side: "buy" });
assert.equal(price.side, "BUY");
assert.match(P.buildRequest(price).url, /side=BUY/);

const history = P.normalizeCommand({ method: "priceHistory.get", tokenId: "123", start: 10, end: 20, bucketSeconds: 5 });
assert.match(P.buildRequest(history).url, /prices-history/);
assert.throws(() => P.normalizeCommand({ method: "priceHistory.get", tokenId: "123" }), /безграничная history-команда/);

const books = P.buildRequest(P.normalizeCommand({ method: "books.get", tokenIds: ["1", "2"] }));
assert.equal(books.method, "POST");
assert.deepEqual(books.body, [{ token_id: "1" }, { token_id: "2" }]);

const multi = `text\n${P.PREFIX}\n{"method":"market.get","id":"7"}\nmore\n${P.PREFIX}\n{"method":"midpoint.get","tokenId":"99"}`;
const found = P.discover(multi);
assert.equal(found.length, 2);
assert.equal(found[0].ok, true);
assert.equal(found[0].command.method, "market.get");
assert.equal(found[1].command.method, "midpoint.get");

const malformed = P.discover(`${P.PREFIX}\n{"method":"unknown"}\n${P.PREFIX}\n{"method":"book.get","tokenId":"1"}`);
assert.equal(malformed.length, 2);
assert.equal(malformed[0].ok, false);
assert.equal(malformed[1].ok, true);

const trades = P.normalizeCommand({ method: "trades.list", conditionId: "0xabc", limit: 10, start: 1, end: 2 });
assert.match(P.buildRequest(trades).url, /data-api\.polymarket\.com\/v2\/trades/);

console.log("protocol tests: PASS");
