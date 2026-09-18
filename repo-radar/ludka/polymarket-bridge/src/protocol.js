(() => {
  "use strict";

  const PREFIX = "POLYMARKET_API_V1";
  const RESULT_PREFIX = "POLYMARKET_RESULT_V1";
  const BATCH_RESULT_PREFIX = "POLYMARKET_BATCH_RESULT_V1";
  const ERROR_PREFIX = "POLYMARKET_ERROR_V1";
  const MAX_RESPONSE_CHARS = 160_000;
  const METHODS = new Set([
    "markets.list", "market.get", "events.list", "event.get",
    "book.get", "books.get", "price.get", "midpoint.get",
    "priceHistory.get", "trades.list"
  ]);

  function fail(code, message) {
    const error = new Error(message || code);
    error.code = code;
    throw error;
  }

  function stringValue(value, name, { required = false, max = 2048 } = {}) {
    if (value === undefined || value === null || value === "") {
      if (required) fail("MISSING_FIELD", `Отсутствует обязательное поле: ${name}`);
      return undefined;
    }
    const text = String(value).trim();
    if (required && !text) fail("MISSING_FIELD", `Отсутствует обязательное поле: ${name}`);
    if (text.length > max) fail("FIELD_TOO_LONG", `${name}: длина превышает ${max}.`);
    return text;
  }

  function intValue(value, name, { required = false, fallback, min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
    if ((value === undefined || value === null || value === "") && !required) return fallback;
    const number = Number(value);
    if (!Number.isSafeInteger(number) || number < min || number > max) fail("INVALID_FIELD", `${name} должен быть целым числом ${min}..${max}.`);
    return number;
  }

  function boolValue(value, name) {
    if (value === undefined) return undefined;
    if (typeof value !== "boolean") fail("INVALID_FIELD", `${name} должен быть boolean.`);
    return value;
  }

  function ensureFields(raw, allowed) {
    for (const key of Object.keys(raw)) if (!allowed.has(key)) fail("UNSUPPORTED_FIELD", `Поле ${key} не разрешено для ${raw.method || "<unknown>"}.`);
  }

  function normalizeList(raw, kind) {
    ensureFields(raw, new Set(["method", "closed", "limit", "afterCursor", "tagId"]));
    const out = { method: `${kind}.list`, limit: intValue(raw.limit, "limit", { fallback: 20, min: 1, max: 100 }) };
    const closed = boolValue(raw.closed, "closed");
    const afterCursor = stringValue(raw.afterCursor, "afterCursor", { max: 4096 });
    const tagId = intValue(raw.tagId, "tagId", { min: 1, max: 1_000_000_000 });
    if (closed !== undefined) out.closed = closed;
    if (afterCursor) out.afterCursor = afterCursor;
    if (tagId !== undefined) out.tagId = tagId;
    return Object.freeze(out);
  }

  function normalizeGet(raw, kind) {
    ensureFields(raw, new Set(["method", "id", "slug"]));
    const id = stringValue(raw.id, "id", { max: 240 });
    const slug = stringValue(raw.slug, "slug", { max: 600 });
    if (Boolean(id) === Boolean(slug)) fail("EXACTLY_ONE_IDENTIFIER_REQUIRED", `${kind}.get требует ровно одно поле: id или slug.`);
    return Object.freeze({ method: `${kind}.get`, ...(id ? { id } : { slug }) });
  }

  function normalizeCommand(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail("INVALID_JSON_ROOT", "Команда должна быть JSON-объектом.");
    const method = stringValue(raw.method, "method", { required: true, max: 80 });
    if (!METHODS.has(method)) fail("UNSUPPORTED_METHOD", `Метод ${method} не поддерживается в v0.1.0.`);

    if (method === "markets.list") return normalizeList(raw, "markets");
    if (method === "events.list") return normalizeList(raw, "events");
    if (method === "market.get") return normalizeGet(raw, "market");
    if (method === "event.get") return normalizeGet(raw, "event");

    if (method === "book.get" || method === "midpoint.get") {
      ensureFields(raw, new Set(["method", "tokenId"]));
      return Object.freeze({ method, tokenId: stringValue(raw.tokenId, "tokenId", { required: true, max: 256 }) });
    }

    if (method === "books.get") {
      ensureFields(raw, new Set(["method", "tokenIds"]));
      if (!Array.isArray(raw.tokenIds) || raw.tokenIds.length < 1 || raw.tokenIds.length > 100) fail("INVALID_TOKEN_IDS", "tokenIds должен содержать 1..100 значений.");
      const tokenIds = raw.tokenIds.map((value, index) => stringValue(value, `tokenIds[${index}]`, { required: true, max: 256 }));
      return Object.freeze({ method, tokenIds: Object.freeze(tokenIds) });
    }

    if (method === "price.get") {
      ensureFields(raw, new Set(["method", "tokenId", "side"]));
      const side = stringValue(raw.side, "side", { required: true, max: 8 }).toUpperCase();
      if (!new Set(["BUY", "SELL"]).has(side)) fail("INVALID_SIDE", "side должен быть BUY или SELL.");
      return Object.freeze({ method, tokenId: stringValue(raw.tokenId, "tokenId", { required: true, max: 256 }), side });
    }

    if (method === "priceHistory.get") {
      ensureFields(raw, new Set(["method", "tokenId", "interval", "start", "end", "asOf", "bucketSeconds"]));
      const out = { method, tokenId: stringValue(raw.tokenId, "tokenId", { required: true, max: 256 }) };
      const interval = stringValue(raw.interval, "interval", { max: 40 });
      const start = intValue(raw.start, "start", { min: 0 });
      const end = intValue(raw.end, "end", { min: 0 });
      const asOf = intValue(raw.asOf, "asOf", { min: 0 });
      const bucketSeconds = intValue(raw.bucketSeconds, "bucketSeconds", { min: 1, max: 604800 });
      if (start !== undefined && end === undefined || start === undefined && end !== undefined) fail("HISTORY_RANGE_INCOMPLETE", "start и end должны задаваться вместе.");
      if (start !== undefined && end <= start) fail("HISTORY_RANGE_INVALID", "end должен быть больше start.");
      if (!interval && start === undefined && asOf === undefined) fail("HISTORY_BOUND_REQUIRED", "Задайте interval, start+end или asOf; безграничная history-команда запрещена.");
      if (interval) out.interval = interval;
      if (start !== undefined) { out.start = start; out.end = end; }
      if (asOf !== undefined) out.asOf = asOf;
      if (bucketSeconds !== undefined) out.bucketSeconds = bucketSeconds;
      return Object.freeze(out);
    }

    if (method === "trades.list") {
      ensureFields(raw, new Set(["method", "conditionId", "limit", "cursor", "start", "end"]));
      const out = {
        method,
        conditionId: stringValue(raw.conditionId, "conditionId", { required: true, max: 256 }),
        limit: intValue(raw.limit, "limit", { fallback: 20, min: 1, max: 100 })
      };
      const cursor = stringValue(raw.cursor, "cursor", { max: 4096 });
      const start = intValue(raw.start, "start", { min: 0 });
      const end = intValue(raw.end, "end", { min: 0 });
      if (start !== undefined && end !== undefined && end <= start) fail("TRADES_RANGE_INVALID", "end должен быть больше start.");
      if (cursor) out.cursor = cursor;
      if (start !== undefined) out.start = start;
      if (end !== undefined) out.end = end;
      return Object.freeze(out);
    }

    fail("UNSUPPORTED_METHOD", method);
  }

  function parseCommandText(text) {
    const source = String(text || "").replace(/\u00a0/g, " ").trim();
    if (!source.startsWith(PREFIX)) fail("NOT_COMMAND", `Команда должна начинаться с ${PREFIX}.`);
    const rest = source.slice(PREFIX.length).trim();
    if (!rest) fail("MISSING_JSON", `После ${PREFIX} должен идти JSON-объект.`);
    let raw;
    try { raw = JSON.parse(rest); } catch (error) { fail("INVALID_JSON", `Некорректный JSON: ${error.message}`); }
    return normalizeCommand(raw);
  }

  function extractJsonObject(source, startIndex) {
    const text = String(source || "");
    let index = Number(startIndex || 0);
    while (index < text.length && /\s/.test(text[index])) index += 1;
    if (text[index] !== "{") return { ok: false, code: "MISSING_JSON_OBJECT", message: "После маркера не найден JSON-объект.", end: index };
    const start = index;
    let depth = 0, inString = false, escape = false;
    for (; index < text.length; index += 1) {
      const char = text[index];
      if (inString) {
        if (escape) { escape = false; continue; }
        if (char === "\\") { escape = true; continue; }
        if (char === '"') inString = false;
        continue;
      }
      if (char === '"') { inString = true; continue; }
      if (char === "{") depth += 1;
      else if (char === "}") {
        depth -= 1;
        if (depth === 0) {
          const jsonText = text.slice(start, index + 1);
          try { return { ok: true, raw: JSON.parse(jsonText), jsonText, start, end: index + 1 }; }
          catch (error) { return { ok: false, code: "INVALID_JSON", message: error.message, start, end: index + 1 }; }
        }
      }
    }
    return { ok: false, code: "UNTERMINATED_JSON", message: "JSON-объект не закрыт.", start, end: text.length };
  }

  function discover(text) {
    const source = String(text || "").replace(/\u00a0/g, " ");
    const items = [];
    let from = 0;
    while (from < source.length) {
      const index = source.indexOf(PREFIX, from);
      if (index < 0) break;
      const extracted = extractJsonObject(source, index + PREFIX.length);
      if (extracted.ok) {
        try {
          items.push(Object.freeze({ index, ok: true, command: normalizeCommand(extracted.raw), end: extracted.end }));
        } catch (error) {
          items.push(Object.freeze({ index, ok: false, code: error.code || "INVALID_COMMAND", message: error.message || String(error), end: extracted.end }));
        }
      } else {
        items.push(Object.freeze({ index, ok: false, code: extracted.code, message: extracted.message, end: extracted.end }));
      }
      from = Math.max(index + PREFIX.length, extracted.end || 0, index + 1);
    }
    return Object.freeze(items);
  }

  function query(params) {
    const usp = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== null && value !== "") usp.set(key, String(value));
    return usp.toString();
  }

  function buildRequest(command) {
    const c = normalizeCommand(command);
    if (c.method === "markets.list" || c.method === "events.list") {
      const resource = c.method.startsWith("markets") ? "markets" : "events";
      const qs = query({ closed: c.closed, limit: c.limit, after_cursor: c.afterCursor, tag_id: c.tagId });
      return Object.freeze({ method: "GET", url: `https://gamma-api.polymarket.com/${resource}/keyset?${qs}` });
    }
    if (c.method === "market.get" || c.method === "event.get") {
      const resource = c.method.startsWith("market") ? "markets" : "events";
      const suffix = c.id ? encodeURIComponent(c.id) : `slug/${encodeURIComponent(c.slug)}`;
      return Object.freeze({ method: "GET", url: `https://gamma-api.polymarket.com/${resource}/${suffix}` });
    }
    if (c.method === "book.get") return Object.freeze({ method: "GET", url: `https://clob.polymarket.com/book?${query({ token_id: c.tokenId })}` });
    if (c.method === "books.get") return Object.freeze({ method: "POST", url: "https://clob.polymarket.com/books", body: c.tokenIds.map((tokenId) => ({ token_id: tokenId })) });
    if (c.method === "price.get") return Object.freeze({ method: "GET", url: `https://clob.polymarket.com/price?${query({ token_id: c.tokenId, side: c.side })}` });
    if (c.method === "midpoint.get") return Object.freeze({ method: "GET", url: `https://clob.polymarket.com/midpoint?${query({ token_id: c.tokenId })}` });
    if (c.method === "priceHistory.get") return Object.freeze({
      method: "GET",
      url: `https://data-api.polymarket.com/v2/prices-history?${query({ token_id: c.tokenId, interval: c.interval, start: c.start, end: c.end, as_of: c.asOf, bucket_seconds: c.bucketSeconds })}`
    });
    if (c.method === "trades.list") return Object.freeze({
      method: "GET",
      url: `https://data-api.polymarket.com/v2/trades?${query({ condition: c.conditionId, limit: c.limit, cursor: c.cursor, start: c.start, end: c.end })}`
    });
    fail("UNSUPPORTED_METHOD", c.method);
  }

  function requestId() {
    return globalThis.crypto?.randomUUID?.() || `pmb-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function resultEnvelope({ command, httpStatus = 0, elapsedMs = 0, result = null, status = "OK", requestExecuted = false, error = null, id = null }) {
    return Object.freeze({
      bridge: String(globalThis.PMBProduct?.BRIDGE_ID || "polymarket-bridge"),
      version: String(globalThis.PMBProduct?.VERSION || "0.1.0"),
      service: "polymarket",
      operation: command?.method || null,
      request_id: id || requestId(),
      status,
      request_executed: requestExecuted,
      command: command || null,
      http_status: Number(httpStatus || 0),
      elapsed_ms: Number(elapsedMs || 0),
      result,
      ...(error ? { error } : {})
    });
  }

  function formatSingle(envelope) { return `${RESULT_PREFIX}\n${JSON.stringify(envelope, null, 2)}`; }
  function formatBatch(envelopes) { return `${BATCH_RESULT_PREFIX}\n${JSON.stringify({ count: envelopes.length, results: envelopes }, null, 2)}`; }
  function formatError(payload) { return `${ERROR_PREFIX}\n${JSON.stringify(payload, null, 2)}`; }

  globalThis.PolymarketBridgeProtocol = Object.freeze({
    PREFIX, RESULT_PREFIX, BATCH_RESULT_PREFIX, ERROR_PREFIX, MAX_RESPONSE_CHARS, METHODS,
    normalizeCommand, parseCommandText, extractJsonObject, discover, buildRequest,
    resultEnvelope, formatSingle, formatBatch, formatError
  });
})();
