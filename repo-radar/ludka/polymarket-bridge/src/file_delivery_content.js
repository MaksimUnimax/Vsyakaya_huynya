/* global PMBConversationIdentity, PMBComposerSend, PMBChatGPTFileAttachment */
(() => {
  "use strict";

  const POLL_MS = 700;
  const ATTACHMENT_MODE = "attachment_v1";
  const SEND_COMMITTED_PHASE = "attachment_send_committed";
  const ATTACHMENT_READY_TIMEOUT_MS = 30_000;
  const SEND_TARGET_TIMEOUT_MS = 20_000;
  const SEND_CONFIRM_TIMEOUT_MS = 120_000;

  const inFlight = new Set();
  const warned = new Set();
  let timer = null;

  function identity() {
    const canonical = document.querySelector('link[rel="canonical"]')?.href || "";
    const current = PMBConversationIdentity.fromUrl(location.href);
    return current.status === "confirmed" ? current : PMBConversationIdentity.fromUrl(canonical);
  }

  function conversationKey() { return identity().conversation_key || ""; }

  function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

  function sendWorker(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message)); else resolve(response);
      });
    });
  }

  function status(text, level = "info", sticky = false) {
    let node = document.getElementById("pmb-file-delivery-status");
    if (!node) {
      node = document.createElement("div");
      node.id = "pmb-file-delivery-status";
      Object.assign(node.style, {
        position: "fixed", right: "18px", top: "58px", zIndex: "2147483647",
        maxWidth: "440px", padding: "8px 11px", borderRadius: "9px",
        color: "white", font: '600 12px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        boxShadow: "0 2px 12px rgba(0,0,0,.22)", pointerEvents: "none"
      });
      document.documentElement.appendChild(node);
    }
    node.style.background = level === "error" ? "rgba(140,25,25,.96)" : level === "ok" ? "rgba(19,105,63,.96)" : "rgba(20,40,55,.95)";
    node.textContent = String(text || "");
    clearTimeout(node.__timer);
    if (!sticky) node.__timer = setTimeout(() => node.remove(), 6000);
  }

  function assertEntry(entry) {
    const key = conversationKey();
    if (!key || key !== String(entry?.conversation_key || "")) {
      throw Object.assign(new Error("Файловая доставка больше не принадлежит текущему ChatGPT-диалогу."), { code: "ATTACHMENT_CONVERSATION_CHANGED" });
    }
  }

  function composerFor(entry) {
    const composer = PMBComposerSend.findComposer(document);
    if (!composer) throw Object.assign(new Error("Поле ввода ChatGPT не найдено."), { code: "COMPOSER_NOT_FOUND" });
    const actual = PMBComposerSend.readComposer(composer).trim();
    const expected = String(entry.report_text || "").trim();
    if (actual && actual !== expected) {
      throw Object.assign(new Error("Поле ввода занято вашим текстом; файловая доставка ждёт."), { code: "COMPOSER_OCCUPIED" });
    }
    if (!actual) PMBComposerSend.setComposerText(composer, expected);
    return composer;
  }

  async function fetchArtifactParts(entry, descriptor) {
    assertEntry(entry);
    const total = Number(descriptor?.byte_length || 0);
    const manifest = Array.isArray(descriptor?.chunk_manifest) ? descriptor.chunk_manifest : [];
    if (!Number.isSafeInteger(total) || total < 0 || !manifest.length) {
      throw Object.assign(new Error("Некорректные метаданные файла."), { code: "ATTACHMENT_METADATA_INVALID" });
    }

    let accumulated = 0;
    const parts = [];
    for (const expected of manifest) {
      assertEntry(entry);
      const index = Number(expected.chunk_index);
      const response = await sendWorker({
        type: "PM_GET_OUTBOX_ARTIFACT_CHUNK",
        conversation_key: entry.conversation_key,
        delivery_id: entry.delivery_id,
        artifact_key: descriptor.artifact_key,
        chunk_index: index
      });
      assertEntry(entry);

      if (!response?.ok) {
        throw Object.assign(new Error(response?.error || response?.code || "Не удалось получить часть файла."), { code: response?.code || "ATTACHMENT_CHUNK_FAILED" });
      }

      const bytes = PMBChatGPTFileAttachment.base64ToBytes(response.chunk_base64 || "");
      if (String(response.artifact_key || "") !== String(descriptor.artifact_key || "") ||
          Number(response.chunk_index) !== index ||
          Number(response.total_byte_length) !== total) {
        throw Object.assign(new Error("Метаданные части файла не совпали."), { code: "ATTACHMENT_CHUNK_METADATA_MISMATCH" });
      }
      if (bytes.byteLength !== Number(expected.byte_length) ||
          bytes.byteLength !== Number(response.byte_length) ||
          accumulated + bytes.byteLength > total) {
        throw Object.assign(new Error("Размер части файла не совпал."), { code: "ATTACHMENT_CHUNK_LENGTH_MISMATCH" });
      }

      const sha = await PMBChatGPTFileAttachment.sha256Hex(bytes);
      if (sha !== String(expected.sha256 || "").toLowerCase() ||
          sha !== String(response.sha256 || "").toLowerCase()) {
        throw Object.assign(new Error("SHA-256 части файла не совпал."), { code: "ATTACHMENT_CHUNK_SHA256_MISMATCH" });
      }

      parts.push(bytes);
      accumulated += bytes.byteLength;
    }

    if (accumulated !== total) {
      throw Object.assign(new Error("Размер восстановленного файла не совпал."), { code: "ATTACHMENT_LENGTH_MISMATCH" });
    }
    return parts;
  }

  async function buildFiles(entry) {
    const descriptors = Array.isArray(entry.artifact_descriptors) ? entry.artifact_descriptors : [];
    if (!descriptors.length) throw Object.assign(new Error("Нет файлов для доставки."), { code: "ATTACHMENT_DESCRIPTORS_EMPTY" });

    const files = [];
    for (const descriptor of descriptors) {
      const parts = await fetchArtifactParts(entry, descriptor);
      files.push(PMBChatGPTFileAttachment.createFile(parts, descriptor));
    }
    return { descriptors, files };
  }

  async function waitAttachmentReady(descriptors, entry) {
    const deadline = Date.now() + ATTACHMENT_READY_TIMEOUT_MS;
    while (Date.now() < deadline) {
      assertEntry(entry);
      if (PMBChatGPTFileAttachment.attachmentReady(descriptors, document)) return true;
      await sleep(250);
    }
    return false;
  }

  function userTurns() {
    const seen = new Set();
    const nodes = [];
    for (const node of document.querySelectorAll('[data-message-author-role="user"]')) {
      const root = node.closest('[data-message-id], [data-testid^="conversation-turn-"]') || node;
      if (!seen.has(root)) { seen.add(root); nodes.push(root); }
    }
    return nodes;
  }

  function userTurnId(node, index) {
    return String(node?.getAttribute?.("data-message-id") || node?.getAttribute?.("data-testid") || node?.id || `user-${index}-${String(node?.textContent || "").slice(0, 80)}`);
  }

  function captureUserTurnIds() {
    return userTurns().map((node, index) => userTurnId(node, index));
  }

  function matchingNewUserTurn(entry) {
    const baseline = new Set(Array.isArray(entry.baseline_message_ids) ? entry.baseline_message_ids.map(String) : []);
    const marker = String(entry.send_marker || entry.report_text || "").trim();
    const filenames = (entry.expected_attachment_names || entry.artifact_descriptors?.map((item) => item.filename) || []).map(String).filter(Boolean);

    const turns = userTurns();
    for (let index = 0; index < turns.length; index += 1) {
      const node = turns[index];
      const id = userTurnId(node, index);
      if (baseline.has(id)) continue;
      const surface = String(node.textContent || "") + " " + String(node.getAttribute?.("aria-label") || "");
      const markerMatches = !marker || surface.includes(marker);
      const fileMatches = filenames.length === 0 || filenames.some((filename) => surface.includes(filename));
      if (markerMatches || fileMatches) return { id, node };
    }
    return null;
  }

  async function waitForSendButton(entry) {
    const deadline = Date.now() + SEND_TARGET_TIMEOUT_MS;
    let stable = null;
    let stableCount = 0;

    while (Date.now() < deadline) {
      assertEntry(entry);
      const button = PMBComposerSend.findSendButton(document);
      if (button && !button.disabled) {
        if (button === stable) stableCount += 1;
        else { stable = button; stableCount = 1; }
        if (stableCount >= 3) return button;
      } else {
        stable = null;
        stableCount = 0;
      }
      await sleep(120);
    }
    return null;
  }

  async function processClaimed(entry) {
    assertEntry(entry);
    composerFor(entry);

    const input = PMBChatGPTFileAttachment.fileInput(document);
    if (!input) throw Object.assign(new Error("ChatGPT file input не найден."), { code: "ATTACHMENT_FILE_INPUT_MISSING" });

    status("Polymarket: собираю большой результат в файл…", "info", true);
    const built = await buildFiles(entry);
    assertEntry(entry);

    const commit = await sendWorker({
      type: "PM_MARK_ATTACHMENT_COMMITTED",
      conversation_key: entry.conversation_key,
      delivery_id: entry.delivery_id
    });
    if (!commit?.ok) throw Object.assign(new Error(commit?.error || commit?.code || "Не удалось зафиксировать attachment."), { code: commit?.code || "ATTACHMENT_COMMIT_FAILED" });

    if (PMBChatGPTFileAttachment.fileInput(document) !== input) {
      throw Object.assign(new Error("Поле прикрепления изменилось до установки файла; автоматический повтор запрещён."), { code: "ATTACHMENT_TARGET_CHANGED" });
    }

    PMBChatGPTFileAttachment.setInputFiles(input, built.files);
    const ready = await waitAttachmentReady(built.descriptors, entry);
    if (!ready) throw Object.assign(new Error("ChatGPT не подтвердил готовность вложения за 30 секунд."), { code: "ATTACHMENT_PREVIEW_TIMEOUT" });

    const marked = await sendWorker({
      type: "PM_MARK_ATTACHMENT_READY",
      conversation_key: entry.conversation_key,
      delivery_id: entry.delivery_id,
      attached_filenames: built.descriptors.map((item) => String(item.filename))
    });
    if (!marked?.ok) throw Object.assign(new Error(marked?.error || marked?.code || "Не удалось зафиксировать готовность файла."), { code: marked?.code || "ATTACHMENT_READY_FAILED" });

    status("Polymarket: файл прикреплён и готов к отправке.", "ok");
  }

  async function processAttachmentCommitted(entry) {
    assertEntry(entry);
    composerFor(entry);
    const descriptors = Array.isArray(entry.artifact_descriptors) ? entry.artifact_descriptors : [];
    if (PMBChatGPTFileAttachment.attachmentReady(descriptors, document)) {
      const marked = await sendWorker({
        type: "PM_MARK_ATTACHMENT_READY",
        conversation_key: entry.conversation_key,
        delivery_id: entry.delivery_id,
        attached_filenames: descriptors.map((item) => String(item.filename))
      });
      if (!marked?.ok) throw Object.assign(new Error(marked?.code || "Attachment ready recovery failed."), { code: marked?.code || "ATTACHMENT_READY_RECOVERY_FAILED" });
      return;
    }

    const committedAt = Date.parse(entry.attachment_committed_at || "") || 0;
    if (committedAt && Date.now() - committedAt > ATTACHMENT_READY_TIMEOUT_MS) {
      const key = String(entry.delivery_id || "");
      if (!warned.has(key)) {
        warned.add(key);
        status("Polymarket: attachment был зафиксирован, но preview не подтверждён. Автоматическое повторное прикрепление запрещено.", "error", true);
      }
    }
  }

  async function processReady(entry) {
    assertEntry(entry);
    const descriptors = Array.isArray(entry.artifact_descriptors) ? entry.artifact_descriptors : [];
    if (!PMBChatGPTFileAttachment.attachmentReady(descriptors, document)) {
      throw Object.assign(new Error("Вложение перестало быть готовым; Send запрещён."), { code: "ATTACHMENT_NOT_READY_PRE_SEND" });
    }

    composerFor(entry);
    const button = await waitForSendButton(entry);
    if (!button) {
      status("Polymarket: стабильная кнопка Send пока не подтверждена.", "error");
      return;
    }

    const baseline = captureUserTurnIds();
    const expectedNames = descriptors.map((item) => String(item.filename));
    const commit = await sendWorker({
      type: "PM_COMMIT_ATTACHMENT_SEND",
      conversation_key: entry.conversation_key,
      delivery_id: entry.delivery_id,
      send_marker: String(entry.report_text || ""),
      baseline_message_ids: baseline,
      expected_attachment_names: expectedNames
    });
    if (!commit?.ok) throw Object.assign(new Error(commit?.error || commit?.code || "Send commit failed."), { code: commit?.code || "ATTACHMENT_SEND_COMMIT_FAILED" });
    if (commit.already_committed) return;

    assertEntry(entry);
    if (!PMBChatGPTFileAttachment.attachmentReady(descriptors, document)) {
      await sendWorker({
        type: "PM_ROLLBACK_ATTACHMENT_SEND",
        conversation_key: entry.conversation_key,
        delivery_id: entry.delivery_id
      }).catch(() => null);
      throw Object.assign(new Error("Вложение перестало быть готовым до клика; клика не было."), { code: "ATTACHMENT_NOT_READY_PRE_CLICK" });
    }

    const freshButton = PMBComposerSend.findSendButton(document);
    if (!freshButton || freshButton !== button || freshButton.disabled) {
      await sendWorker({
        type: "PM_ROLLBACK_ATTACHMENT_SEND",
        conversation_key: entry.conversation_key,
        delivery_id: entry.delivery_id
      }).catch(() => null);
      status("Polymarket: Send изменился до клика; клика не было, состояние безопасно откатилось.", "error");
      return;
    }

    freshButton.click();

    await sendWorker({
      type: "PM_MARK_ATTACHMENT_CLICK_DISPATCHED",
      conversation_key: entry.conversation_key,
      delivery_id: entry.delivery_id
    }).catch(() => null);

    status("Polymarket: Send вызван один раз; повтор запрещён, жду подтверждения сообщения.", "info", true);

    const durable = { ...(commit.outbox || entry), phase: SEND_COMMITTED_PHASE, send_click_dispatched: true };
    const deadline = Date.now() + SEND_CONFIRM_TIMEOUT_MS;
    while (Date.now() < deadline) {
      const match = matchingNewUserTurn(durable);
      if (match) {
        const confirmed = await sendWorker({
          type: "PM_CONFIRM_ATTACHMENT_SEND",
          conversation_key: durable.conversation_key,
          delivery_id: durable.delivery_id,
          confirmation_message_id: match.id
        });
        if (confirmed?.ok) {
          status("Polymarket: файловая доставка подтверждена; временный артефакт очищен.", "ok");
          return;
        }
      }
      await sleep(500);
    }

    status("Polymarket: Send был вызван, но новый user-turn пока не подтверждён. Автоматический повтор Send запрещён; состояние сохранено.", "error", true);
  }

  async function processSendCommitted(entry) {
    assertEntry(entry);
    const match = matchingNewUserTurn(entry);
    if (!match) return;
    const confirmed = await sendWorker({
      type: "PM_CONFIRM_ATTACHMENT_SEND",
      conversation_key: entry.conversation_key,
      delivery_id: entry.delivery_id,
      confirmation_message_id: match.id
    });
    if (confirmed?.ok) status("Polymarket: файловая доставка подтверждена после восстановления; артефакт очищен.", "ok");
  }

  async function processEntry(entry) {
    const id = String(entry?.delivery_id || "");
    if (!id || inFlight.has(id)) return;
    inFlight.add(id);
    try {
      if (entry.phase === "claimed") await processClaimed(entry);
      else if (entry.phase === "attachment_committed") await processAttachmentCommitted(entry);
      else if (entry.phase === "attachment_ready") await processReady(entry);
      else if (entry.phase === SEND_COMMITTED_PHASE) await processSendCommitted(entry);
    } catch (error) {
      const code = String(error?.code || "ATTACHMENT_DELIVERY_FAILED");
      if (code !== "COMPOSER_OCCUPIED") {
        status(`Polymarket: файловая доставка остановлена безопасно — ${error.message || error} (${code}).`, "error", true);
      }
    } finally {
      inFlight.delete(id);
    }
  }

  async function poll() {
    clearTimeout(timer);
    const key = conversationKey();
    if (key) {
      try {
        const response = await sendWorker({ type: "PM_GET_OUTBOX", conversation_key: key });
        const entry = response?.ok ? response.outbox : null;
        if (entry?.delivery_mode === ATTACHMENT_MODE) void processEntry(entry);
      } catch {
        // Worker may be restarting.
      }
    }
    timer = setTimeout(poll, POLL_MS);
  }

  void poll();
  addEventListener("beforeunload", () => clearTimeout(timer), { once: true });
})();
