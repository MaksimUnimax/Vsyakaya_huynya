"use strict";

importScripts("product.js", "conversation_identity.js", "protocol.js", "file_artifact_store.js");

const Protocol = globalThis.PolymarketBridgeProtocol;
const Identity = globalThis.PMBConversationIdentity;
const ArtifactStore = globalThis.PMBFileArtifactStore;

const KEYS = Object.freeze({
  MANUAL: "pmb_manual_modes_v1",
  OUTBOX: "pmb_outbox_v1",
  OPERATIONS: "pmb_operations_v1"
});

const MAX_BLOCK_COMMANDS = 10;
const CHAT_FILE_THRESHOLD_CHARS = 160_000;
const MAX_PROVIDER_RESPONSE_CHARS = 32_000_000;
const FETCH_TIMEOUT_MS = 30_000;
const ATTACHMENT_MODE = "attachment_v1";
const ATTACHMENT_SEND_COMMITTED = "attachment_send_committed";

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
  const previous = map[key] || null;
  map[key] = { ...entry, conversation_key: key, updated_at: nowIso() };
  await setMap(KEYS.OUTBOX, map);
  if (previous?.delivery_mode === ATTACHMENT_MODE && previous.delivery_id !== map[key]?.delivery_id) {
    await ArtifactStore.cleanupDescriptors(previous.artifact_descriptors || []).catch(() => null);
  }
  return map[key];
}

async function clearOutbox(conversationKey, deliveryId = null) {
  const key = normalizeKey(conversationKey);
  const map = await getMap(KEYS.OUTBOX);
  const previous = map[key] || null;
  if (!deliveryId || previous?.delivery_id === deliveryId) delete map[key];
  await setMap(KEYS.OUTBOX, map);
  if (previous?.delivery_mode === ATTACHMENT_MODE && (!deliveryId || previous.delivery_id === deliveryId)) {
    await ArtifactStore.cleanupDescriptors(previous.artifact_descriptors || []).catch(() => null);
  }
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

function bytesToBase64(bytes) {
  const source = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
  let binary = "";
  const step = 0x8000;
  for (let offset = 0; offset < source.length; offset += step) {
    binary += String.fromCharCode(...source.subarray(offset, Math.min(source.length, offset + step)));
  }
  return btoa(binary);
}

function safeFilename(value, fallback = "polymarket-result.json") {
  const raw = String(value || "").replace(/[\u0000-\u001f\u007f]/g, "").replace(/[\\/]/g, "_").trim();
  const clean = raw.replace(/^\.+/, "").replace(/\.{2,}/g, ".").slice(0, 180);
  return clean && clean !== "." && clean !== ".." ? clean : fallback;
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

  if (rawText.length > MAX_PROVIDER_RESPONSE_CHARS) {
    return Protocol.resultEnvelope({
      command,
      httpStatus: response.status,
      elapsedMs: elapsed,
      status: "ERROR",
      requestExecuted: true,
      id,
      error: {
        code: "PROVIDER_RESPONSE_HARD_LIMIT",
        message: `Одиночный ответ Polymarket содержит ${rawText.length} символов и превышает hard limit ${MAX_PROVIDER_RESPONSE_CHARS}. Разбейте provider request на страницы/диапазоны.`
      },
      result: { response_chars: rawText.length, hard_limit_chars: MAX_PROVIDER_RESPONSE_CHARS }
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

  return Protocol.resultEnvelope({
    command,
    httpStatus: response.status,
    elapsedMs: elapsed,
    status: "OK",
    requestExecuted: true,
    id,
    result: parsed
  });
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

function resultPayload(envelopes) {
  return envelopes.length === 1
    ? envelopes[0]
    : { bridge: PMBProduct.BRIDGE_ID, version: PMBProduct.VERSION, service: "polymarket", count: envelopes.length, results: envelopes };
}

function shortAttachmentReport(filename, envelopes) {
  const providerOk = envelopes.filter((item) => item.status === "OK" && item.request_executed === true).length;
  const localErrors = envelopes.filter((item) => item.request_executed === false).length;
  return `Polymarket Bridge: полный результат прикреплён файлом ${filename}. Команд: ${envelopes.length}; provider OK: ${providerOk}; локальных ошибок без API: ${localErrors}.`;
}

async function buildDelivery({ key, senderTabId, operationId, envelopes }) {
  const deliveryId = uid("delivery");
  const textReport = envelopes.length === 1 ? Protocol.formatSingle(envelopes[0]) : Protocol.formatBatch(envelopes);

  if (textReport.length <= CHAT_FILE_THRESHOLD_CHARS) {
    return {
      delivery_id: deliveryId,
      operation_id: operationId,
      type: "manual",
      tab_id: senderTabId,
      phase: "claimed",
      delivery_mode: "text",
      report_text: textReport,
      created_at: nowIso()
    };
  }

  const payloadText = JSON.stringify(resultPayload(envelopes), null, 2);
  const filename = safeFilename(`polymarket-result-${operationId}.json`);
  const descriptor = await ArtifactStore.stageTextArtifact({
    artifactKey: `delivery:${deliveryId}:0`,
    deliveryId,
    filename,
    mimeType: "application/json;charset=utf-8",
    text: payloadText
  });

  return {
    delivery_id: deliveryId,
    operation_id: operationId,
    type: "manual",
    tab_id: senderTabId,
    phase: "claimed",
    delivery_mode: ATTACHMENT_MODE,
    report_text: shortAttachmentReport(filename, envelopes),
    artifact_descriptors: [descriptor],
    expected_attachment_names: [filename],
    provider_result_count: envelopes.length,
    created_at: nowIso()
  };
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
    const report = Protocol.formatError({
      bridge: PMBProduct.BRIDGE_ID,
      version: PMBProduct.VERSION,
      status: "ERROR",
      request_executed: false,
      error: { code: "NO_COMMANDS", message: `В блоке нет ${Protocol.PREFIX}.` }
    });
    const deliveryId = uid("delivery");
    await putOutbox(key, {
      delivery_id: deliveryId,
      type: "manual",
      tab_id: sender.tab.id,
      phase: "claimed",
      delivery_mode: "text",
      report_text: report,
      created_at: nowIso()
    });
    return { ok: true, accepted: true, delivery_id: deliveryId, request_executed: false };
  }

  if (discovered.length > MAX_BLOCK_COMMANDS) {
    return { ok: false, code: "TOO_MANY_COMMANDS", error: `В одном блоке разрешено максимум ${MAX_BLOCK_COMMANDS} команд.` };
  }

  const operationId = uid("operation");
  await putOperation(key, {
    operation_id: operationId,
    status: "executing",
    count: discovered.length,
    tab_id: sender.tab.id,
    created_at: nowIso()
  });

  const envelopes = [];
  try {
    for (const item of discovered) {
      if (!item.ok) envelopes.push(discoveryErrorEnvelope(item));
      else envelopes.push(await executeProvider(item.command));
    }

    const delivery = await buildDelivery({
      key,
      senderTabId: sender.tab.id,
      operationId,
      envelopes
    });

    await putOutbox(key, delivery);
    await putOperation(key, {
      operation_id: operationId,
      status: "delivering",
      count: discovered.length,
      tab_id: sender.tab.id,
      delivery_id: delivery.delivery_id,
      delivery_mode: delivery.delivery_mode,
      created_at: nowIso()
    });

    return {
      ok: true,
      accepted: true,
      operation_id: operationId,
      delivery_id: delivery.delivery_id,
      delivery_mode: delivery.delivery_mode
    };
  } catch (error) {
    await clearOperation(key, operationId);
    throw error;
  }
}

async function ownedAttachment(message, sender) {
  const key = normalizeKey(message.conversation_key);
  const fence = ownerFence(key, sender);
  if (fence) return { key, entry: null, error: fence };
  const entry = await getOutbox(key);
  if (!entry || entry.delivery_id !== String(message.delivery_id || "")) {
    return { key, entry: null, error: { ok: false, code: "DELIVERY_NOT_FOUND" } };
  }
  if (Number(entry.tab_id) !== Number(sender?.tab?.id)) {
    return { key, entry, error: { ok: false, code: "TAB_OWNER_MISMATCH" } };
  }
  if (entry.delivery_mode !== ATTACHMENT_MODE) {
    return { key, entry, error: { ok: false, code: "ATTACHMENT_MODE_REQUIRED" } };
  }
  return { key, entry, error: null };
}

async function attachmentChunk(message, sender) {
  const owned = await ownedAttachment(message, sender);
  if (owned.error) return owned.error;

  const descriptor = (owned.entry.artifact_descriptors || [])
    .find((item) => String(item.artifact_key) === String(message.artifact_key || ""));
  if (!descriptor) return { ok: false, code: "OUTBOX_ARTIFACT_NOT_DECLARED" };

  const index = Number(message.chunk_index);
  const expected = (descriptor.chunk_manifest || [])
    .find((item) => Number(item.chunk_index) === index);
  if (!expected) return { ok: false, code: "OUTBOX_ARTIFACT_CHUNK_NOT_DECLARED" };

  const chunk = await ArtifactStore.getChunk(descriptor.artifact_key, index);
  if (chunk.byte_length !== Number(expected.byte_length) || chunk.sha256 !== String(expected.sha256 || "")) {
    return { ok: false, code: "OUTBOX_ARTIFACT_CHUNK_INTEGRITY_MISMATCH" };
  }

  return {
    ok: true,
    artifact_key: descriptor.artifact_key,
    chunk_index: index,
    byte_length: chunk.byte_length,
    sha256: chunk.sha256,
    total_byte_length: Number(descriptor.byte_length || 0),
    chunk_base64: bytesToBase64(chunk.bytes)
  };
}

async function markAttachmentCommitted(message, sender) {
  const owned = await ownedAttachment(message, sender);
  if (owned.error) return owned.error;
  if (["attachment_committed", "attachment_ready", ATTACHMENT_SEND_COMMITTED, "committed"].includes(owned.entry.phase)) {
    return { ok: true, already_committed: true, outbox: owned.entry };
  }
  if (owned.entry.phase !== "claimed") return { ok: false, code: "ATTACHMENT_PHASE_INVALID" };

  const next = await putOutbox(owned.key, {
    ...owned.entry,
    phase: "attachment_committed",
    attachment_committed_at: nowIso()
  });
  return { ok: true, outbox: next };
}

async function markAttachmentReady(message, sender) {
  const owned = await ownedAttachment(message, sender);
  if (owned.error) return owned.error;
  if (["attachment_ready", ATTACHMENT_SEND_COMMITTED, "committed"].includes(owned.entry.phase)) {
    return { ok: true, already_ready: true, outbox: owned.entry };
  }
  if (owned.entry.phase !== "attachment_committed") return { ok: false, code: "ATTACHMENT_PHASE_INVALID" };

  const expected = (owned.entry.artifact_descriptors || []).map((item) => String(item.filename));
  const actual = Array.isArray(message.attached_filenames) ? message.attached_filenames.map(String) : [];
  if (JSON.stringify(expected) !== JSON.stringify(actual)) return { ok: false, code: "ATTACHMENT_FILESET_MISMATCH" };

  const next = await putOutbox(owned.key, {
    ...owned.entry,
    phase: "attachment_ready",
    attached_filenames: actual,
    attachment_ready_at: nowIso()
  });
  return { ok: true, outbox: next };
}

async function commitAttachmentSend(message, sender) {
  const owned = await ownedAttachment(message, sender);
  if (owned.error) return owned.error;
  if (owned.entry.phase === ATTACHMENT_SEND_COMMITTED) return { ok: true, already_committed: true, outbox: owned.entry };
  if (owned.entry.phase !== "attachment_ready") return { ok: false, code: "ATTACHMENT_NOT_READY" };

  const expected = (owned.entry.artifact_descriptors || []).map((item) => String(item.filename));
  const provided = Array.isArray(message.expected_attachment_names) ? message.expected_attachment_names.map(String) : expected;
  if (JSON.stringify(expected) !== JSON.stringify(provided)) return { ok: false, code: "ATTACHMENT_FILESET_MISMATCH" };

  const next = await putOutbox(owned.key, {
    ...owned.entry,
    phase: ATTACHMENT_SEND_COMMITTED,
    attachment_send_committed_at: nowIso(),
    send_marker: String(message.send_marker || owned.entry.report_text || ""),
    baseline_message_ids: Array.isArray(message.baseline_message_ids) ? message.baseline_message_ids.map(String).slice(0, 1000) : [],
    expected_attachment_names: provided,
    send_click_dispatched: false
  });
  return { ok: true, outbox: next };
}

async function rollbackAttachmentSend(message, sender) {
  const owned = await ownedAttachment(message, sender);
  if (owned.error) return owned.error;
  if (owned.entry.phase !== ATTACHMENT_SEND_COMMITTED) return { ok: false, code: "ATTACHMENT_SEND_NOT_COMMITTED" };
  if (owned.entry.send_click_dispatched === true) return { ok: false, code: "ATTACHMENT_SEND_DISPATCHED_NO_ROLLBACK" };

  const next = { ...owned.entry, phase: "attachment_ready", attachment_send_rollback_at: nowIso() };
  for (const field of ["attachment_send_committed_at", "send_marker", "baseline_message_ids", "expected_attachment_names", "send_click_dispatched", "send_click_dispatched_at"]) {
    delete next[field];
  }
  return { ok: true, outbox: await putOutbox(owned.key, next) };
}

async function markAttachmentClickDispatched(message, sender) {
  const owned = await ownedAttachment(message, sender);
  if (owned.error) return owned.error;
  if (owned.entry.phase !== ATTACHMENT_SEND_COMMITTED) return { ok: false, code: "ATTACHMENT_SEND_NOT_COMMITTED" };
  if (owned.entry.send_click_dispatched === true) return { ok: true, already_dispatched: true, outbox: owned.entry };

  const next = await putOutbox(owned.key, {
    ...owned.entry,
    send_click_dispatched: true,
    send_click_dispatched_at: nowIso()
  });
  return { ok: true, outbox: next };
}

async function confirmAttachmentSend(message, sender) {
  const owned = await ownedAttachment(message, sender);
  if (owned.error) return owned.error;
  if (owned.entry.phase !== ATTACHMENT_SEND_COMMITTED) return { ok: false, code: "ATTACHMENT_SEND_NOT_COMMITTED" };

  const operationId = owned.entry.operation_id || null;
  await putOutbox(owned.key, {
    ...owned.entry,
    phase: "committed",
    committed_at: nowIso(),
    confirmation_message_id: message.confirmation_message_id || null
  });

  await clearOutbox(owned.key, owned.entry.delivery_id);
  if (operationId) await clearOperation(owned.key, operationId);
  return { ok: true, confirmed: true };
}

async function handleMessage(message, sender) {
  const type = String(message?.type || "");

  if (type === "PM_GET_GLOBAL_STATE") return { ok: true, product: PMBProduct };

  if (type === "PM_GET_STATE") {
    const key = normalizeKey(message.conversation_key);
    return {
      ok: true,
      manual_enabled: await getManual(key),
      outbox: await getOutbox(key),
      operation: await getOperation(key),
      product: PMBProduct
    };
  }

  if (type === "PM_SET_MANUAL") {
    const key = normalizeKey(message.conversation_key);
    const fence = ownerFence(key, sender);
    if (fence) return fence;
    return { ok: true, manual_enabled: await setManual(key, message.enabled === true) };
  }

  if (type === "PM_EXECUTE_MANUAL_BLOCK") {
    return executeBlock(message.conversation_key, message.block_text, sender);
  }

  if (type === "PM_GET_OUTBOX") {
    const key = normalizeKey(message.conversation_key);
    const fence = ownerFence(key, sender);
    if (fence) return fence;
    const entry = await getOutbox(key);
    if (entry && Number(entry.tab_id) !== Number(sender?.tab?.id)) {
      return { ok: false, code: "TAB_OWNER_MISMATCH" };
    }
    return { ok: true, outbox: entry };
  }

  if (type === "PM_MARK_DELIVERY_COMMITTED") {
    const key = normalizeKey(message.conversation_key);
    const fence = ownerFence(key, sender);
    if (fence) return fence;
    const entry = await getOutbox(key);
    if (!entry || entry.delivery_id !== message.delivery_id) return { ok: false, code: "DELIVERY_NOT_FOUND" };
    if (entry.delivery_mode === ATTACHMENT_MODE) return { ok: false, code: "ATTACHMENT_COMMIT_REQUIRED" };
    await putOutbox(key, { ...entry, phase: "committed", committed_at: nowIso() });
    return { ok: true };
  }

  if (type === "PM_DELIVERY_COMPLETE") {
    const key = normalizeKey(message.conversation_key);
    const fence = ownerFence(key, sender);
    if (fence) return fence;
    const entry = await getOutbox(key);
    if (!entry || entry.delivery_id !== message.delivery_id) return { ok: false, code: "DELIVERY_NOT_FOUND" };
    if (entry.delivery_mode === ATTACHMENT_MODE) return { ok: false, code: "ATTACHMENT_CONFIRM_REQUIRED" };
    await clearOutbox(key, entry.delivery_id);
    if (entry.operation_id) await clearOperation(key, entry.operation_id);
    return { ok: true };
  }

  if (type === "PM_GET_OUTBOX_ARTIFACT_CHUNK") return attachmentChunk(message, sender);
  if (type === "PM_MARK_ATTACHMENT_COMMITTED") return markAttachmentCommitted(message, sender);
  if (type === "PM_MARK_ATTACHMENT_READY") return markAttachmentReady(message, sender);
  if (type === "PM_COMMIT_ATTACHMENT_SEND") return commitAttachmentSend(message, sender);
  if (type === "PM_ROLLBACK_ATTACHMENT_SEND") return rollbackAttachmentSend(message, sender);
  if (type === "PM_MARK_ATTACHMENT_CLICK_DISPATCHED") return markAttachmentClickDispatched(message, sender);
  if (type === "PM_CONFIRM_ATTACHMENT_SEND") return confirmAttachmentSend(message, sender);

  return { ok: false, code: "UNKNOWN_MESSAGE", error: `Unknown message: ${type}` };
}

void ArtifactStore.cleanupExpired().catch(() => null);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  Promise.resolve(handleMessage(message, sender))
    .then((response) => sendResponse(response))
    .catch((error) => sendResponse({
      ok: false,
      code: error.code || "INTERNAL_ERROR",
      error: error.message || String(error)
    }));
  return true;
});
