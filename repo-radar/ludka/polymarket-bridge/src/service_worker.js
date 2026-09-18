"use strict";

importScripts("product.js", "conversation_identity.js", "protocol.js");

const Protocol = globalThis.PolymarketBridgeProtocol;
const Identity = globalThis.PMBConversationIdentity;
const KEYS = Object.freeze({
  MANUAL: "pmb_manual_modes_v1",
  OUTBOX: "pmb_outbox_v1",
  OPERATIONS: "pmb_operations_v1"
});
const MAX_BLOCK_COMMANDS = 10;
const MAX_DELIVERY_CHARS = 200_000;
const FETCH_TIMEOUT_MS = 30_000;

function storageGet(keys) {
  return new Promise((resolve, reject) => chrome.storage.local.get(keys, (value) => {
    const error = chrome.runtime.lastError;
    if (error) reject(new Error(error.message)); else resolve(value || {});
  }));
}

function storageSet(value) {
  return new Promise((resolve, reject) => chrome.storage.local.set(value, () => {
    const error = chrome.runtime.lastError;
    if (error) reject(new Error(error.message)); else resolve();
  }));
}

function normalizeKey(value) { return Identity.normalizeKey(value, { required: true }); }
function uid(prefix = "pmb") { return `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`}`; }
function nowIso() { return new Date().toISOString(); }

async function getMap(key) {
  const data = await storageGet(key);
  return data[key] && typeof data[key] === "object" ? data[key] : {};
}

async function setMap(key, map) { await storageSet({ [key]: map }); }

async function getManual(conversationKey) {
  const key = normalizeKey(conversationKey);
  return (await getMap(KEYS.MANUAL))[key] === true;
}

async function setManual(conversationKey, enabled) {
  const key = normalizeKey(conversationKey);
  const map = await getMap(KEYS.MANUAL);
  map[key] = enabled === true;
  await setMap(KEYS.MANUAL, map);
  return map[key];
}

async function getOutbox(conversationKey) {
  const key = normalizeKey(conversationKey);
  return (await getMap(KEYS.OUTBOX))[key] || null;
}

async function putOutbox(conversationKey, entry) {
  const key = normalizeKey(conversationKey);
  const map = await getMap(KEYS.OUTBOX);
  map[key] = { ...entry, conversation_key: key, updated_at: nowIso() };
  await setMap(KEYS.OUTBOX, map);
  return map[key];
}

async function clearOutbox(conversationKey, deliveryId = null) {
  const key = normalizeKey(conversationKey);
  const map = await getMap(KEYS.OUTBOX);
  if (!deliveryId || map[key]?.delivery_id === deliveryId) delete map[key];
  await setMap(KEYS.OUTBOX, map);
}

async function getOperation(conversationKey) {
  const key = normalizeKey(conversationKey);
  return (await getMap(KEYS.OPERATIONS))[key] || null;
}

async function putOperation(conversationKey, operation) {
  const key = normalizeKey(conversationKey);
  const map = await getMap(KEYS.OPERATIONS);
  map[key] = { ...operation, conversation_key: key, updated_at: nowIso() };
  await setMap(KEYS.OPERATIONS, map);
  return map[key];
}

async function clearOperation(conversationKey, operationId = null) {
  const key = normalizeKey(conversationKey);
  const map = await getMap(KEYS.OPERATIONS);
  if (!operationId || map[key]?.operation_id === operationId) delete map[key];
  await setMap(KEYS.OPERATIONS, map);
}

function senderConversationKey(sender) {
  const url = sender?.tab?.url || sender?.url || "";
  return Identity.fromUrl(url).conversation_key || "";
}

function ownerFence(conversationKey, sender) {
  const key = normalizeKey(conversationKey);
  const live = senderConversationKey(sender);
  if (!live || live !== key) return { ok: false, code: "CONVERSATION_OWNER_MISMATCH", error: "Команда пришла не из привязанного ChatGPT-диалога." };
  return null;
}

async function executeProvider(command) {
  const request = Protocol.buildRequest(command);
  const id = uid("req");
  const started = performance.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let response;
  let rawText = "";
  try {
    response = await fetch(request.url, {
      method: request.method,
      headers: request.body ? { "Content-Type": "application/json" } : undefined,
      body: request.body ? JSON.stringify(request.body) : undefined,
      signal: controller.signal,
      cache: "no-store"
    });
    rawText = await response.text();
  } catch (error) {
    const elapsed = Math.round(performance.now() - started);
    const code = error?.name === "AbortError" ? "FETCH_TIMEOUT" : "NETWORK_ERROR";
    return Protocol.resultEnvelope({
      command,
      elapsedMs: elapsed,
      status: "ERROR",
      requestExecuted: "UNKNOWN",
      id,
      error: { code, message: String(error?.message || error).slice(0, 2000) }
    });
  } finally {
    clearTimeout(timeout);
  }

  const elapsed = Math.round(performance.now() - started);
  if (rawText.length > Protocol.MAX_RESPONSE_CHARS) {
    return Protocol.resultEnvelope({
      command,
      httpStatus: response.status,
      elapsedMs: elapsed,
      status: "ERROR",
      requestExecuted: true,
      id,
      error: {
        code: "RESULT_TOO_LARGE",
        message: `Ответ Polymarket содержит ${rawText.length} символов и превышает bridge cap ${Protocol.MAX_RESPONSE_CHARS}. Сузьте limit/time range или используйте pagination.`
      },
      result: { response_chars: rawText.length, bridge_cap_chars: Protocol.MAX_RESPONSE_CHARS }
    });
  }

  let parsed = rawText;
  if (rawText.trim()) {
    try { parsed = JSON.parse(rawText); } catch { /* preserve provider text */ }
  } else {
    parsed = null;
  }

  if (!response.ok) {
    return Protocol.resultEnvelope({
      command,
      httpStatus: response.status,
      elapsedMs: elapsed,
      status: "ERROR",
      requestExecuted: true,
      id,
      error: { code: "POLYMARKET_HTTP_ERROR", message: `HTTP ${response.status}` },
      result: parsed
    });
  }

  return Protocol.resultEnvelope({ command, httpStatus: response.status, elapsedMs: elapsed, status: "OK", requestExecuted: true, id, result: parsed });
}

function discoveryErrorEnvelope(item) {
  return Protocol.resultEnvelope({
    command: null,
    status: "ERROR",
    requestExecuted: false,
    error: { code: item.code || "COMMAND_DISCOVERY_ERROR", message: item.message || "Некорректная команда." },
    result: null
  });
}

async function executeBlock(conversationKey, blockText, sender) {
  const key = normalizeKey(conversationKey);
  const fence = ownerFence(key, sender);
  if (fence) return fence;
  if (!(await getManual(key))) return { ok: false, code: "MANUAL_OFF", error: "Manual bridge выключен для этого диалога." };
  if (await getOutbox(key)) return { ok: false, code: "DELIVERY_IN_PROGRESS", error: "Сначала завершите текущую доставку." };
  if (await getOperation(key)) return { ok: false, code: "OPERATION_IN_PROGRESS", error: "Для этого диалога уже выполняется операция." };

  const discovered = Protocol.discover(blockText);
  if (discovered.length === 0) {
    const report = Protocol.formatError({ bridge: PMBProduct.BRIDGE_ID, version: PMBProduct.VERSION, status: "ERROR", request_executed: false, error: { code: "NO_COMMANDS", message: `В блоке нет ${Protocol.PREFIX}.` } });
    const deliveryId = uid("delivery");
    await putOutbox(key, { delivery_id: deliveryId, type: "manual", tab_id: sender.tab.id, phase: "claimed", report_text: report, created_at: nowIso() });
    return { ok: true, accepted: true, delivery_id: deliveryId, request_executed: false };
  }
  if (discovered.length > MAX_BLOCK_COMMANDS) return { ok: false, code: "TOO_MANY_COMMANDS", error: `В одном блоке разрешено максимум ${MAX_BLOCK_COMMANDS} команд.` };

  const operationId = uid("operation");
  await putOperation(key, { operation_id: operationId, status: "executing", count: discovered.length, tab_id: sender.tab.id, created_at: nowIso() });
  const envelopes = [];
  try {
    for (const item of discovered) {
      if (!item.ok) envelopes.push(discoveryErrorEnvelope(item));
      else envelopes.push(await executeProvider(item.command));
    }

    let report = envelopes.length === 1 ? Protocol.formatSingle(envelopes[0]) : Protocol.formatBatch(envelopes);
    if (report.length > MAX_DELIVERY_CHARS) {
      report = Protocol.formatError({
        bridge: PMBProduct.BRIDGE_ID,
        version: PMBProduct.VERSION,
        status: "ERROR",
        request_executed: envelopes.some((item) => item.request_executed === true) ? true : envelopes.some((item) => item.request_executed === "UNKNOWN") ? "UNKNOWN" : false,
        error: { code: "DELIVERY_TOO_LARGE", message: `Совокупный результат ${report.length} символов превышает delivery cap ${MAX_DELIVERY_CHARS}. Повторите меньшими страницами/диапазонами.` },
        results_summary: envelopes.map((item) => ({ operation: item.operation, status: item.status, http_status: item.http_status, request_executed: item.request_executed }))
      });
    }

    const deliveryId = uid("delivery");
    await putOutbox(key, {
      delivery_id: deliveryId,
      operation_id: operationId,
      type: "manual",
      tab_id: sender.tab.id,
      phase: "claimed",
      report_text: report,
      created_at: nowIso()
    });
    await putOperation(key, { operation_id: operationId, status: "delivering", count: discovered.length, tab_id: sender.tab.id, delivery_id: deliveryId, created_at: nowIso() });
    return { ok: true, accepted: true, operation_id: operationId, delivery_id: deliveryId };
  } catch (error) {
    await clearOperation(key, operationId);
    throw error;
  }
}

async function handleMessage(message, sender) {
  const type = String(message?.type || "");
  if (type === "PM_GET_GLOBAL_STATE") return { ok: true, product: PMBProduct };

  if (type === "PM_GET_STATE") {
    const key = normalizeKey(message.conversation_key);
    return { ok: true, manual_enabled: await getManual(key), outbox: await getOutbox(key), operation: await getOperation(key), product: PMBProduct };
  }

  if (type === "PM_SET_MANUAL") {
    const key = normalizeKey(message.conversation_key);
    const fence = ownerFence(key, sender);
    if (fence) return fence;
    return { ok: true, manual_enabled: await setManual(key, message.enabled === true) };
  }

  if (type === "PM_EXECUTE_MANUAL_BLOCK") return executeBlock(message.conversation_key, message.block_text, sender);

  if (type === "PM_GET_OUTBOX") {
    const key = normalizeKey(message.conversation_key);
    const fence = ownerFence(key, sender);
    if (fence) return fence;
    const entry = await getOutbox(key);
    if (entry && Number(entry.tab_id) !== Number(sender?.tab?.id)) return { ok: false, code: "TAB_OWNER_MISMATCH" };
    return { ok: true, outbox: entry };
  }

  if (type === "PM_MARK_DELIVERY_COMMITTED") {
    const key = normalizeKey(message.conversation_key);
    const fence = ownerFence(key, sender);
    if (fence) return fence;
    const entry = await getOutbox(key);
    if (!entry || entry.delivery_id !== message.delivery_id) return { ok: false, code: "DELIVERY_NOT_FOUND" };
    await putOutbox(key, { ...entry, phase: "committed", committed_at: nowIso() });
    return { ok: true };
  }

  if (type === "PM_DELIVERY_COMPLETE") {
    const key = normalizeKey(message.conversation_key);
    const fence = ownerFence(key, sender);
    if (fence) return fence;
    const entry = await getOutbox(key);
    if (!entry || entry.delivery_id !== message.delivery_id) return { ok: false, code: "DELIVERY_NOT_FOUND" };
    await clearOutbox(key, entry.delivery_id);
    if (entry.operation_id) await clearOperation(key, entry.operation_id);
    return { ok: true };
  }

  return { ok: false, code: "UNKNOWN_MESSAGE", error: `Unknown message: ${type}` };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  Promise.resolve(handleMessage(message, sender))
    .then((response) => sendResponse(response))
    .catch((error) => sendResponse({ ok: false, code: error.code || "INTERNAL_ERROR", error: error.message || String(error) }));
  return true;
});
