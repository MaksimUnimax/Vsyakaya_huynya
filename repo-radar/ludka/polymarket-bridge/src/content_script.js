/* global PMBConversationIdentity, PMBComposerSend, PMBProduct */
(() => {
  "use strict";

  const ACTION_ATTR = "data-pmb-manual-action";
  const SURFACE_ID = "pmb-external-action-surface";
  const POLL_MS = 700;
  const STATE_MS = 1500;

  let manualEnabled = false;
  let stateTimer = null;
  let outboxTimer = null;
  let observer = null;
  let refreshQueued = false;

  let surfaceHost = null;
  let shadowRoot = null;
  let actionLayer = null;
  let statusLayer = null;

  const deliveryState = new Map();
  const actionByBlock = new Map();
  const blockId = new WeakMap();

  function identity() {
    const canonical = document.querySelector('link[rel="canonical"]')?.href || "";
    const a = PMBConversationIdentity.fromUrl(location.href);
    if (a.status === "confirmed") return a;
    return PMBConversationIdentity.fromUrl(canonical);
  }

  function conversationKey() { return identity().conversation_key || ""; }

  function sendWorker(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message)); else resolve(response);
      });
    });
  }

  function ensureSurface() {
    if (surfaceHost?.isConnected && shadowRoot && actionLayer && statusLayer) return;
    document.getElementById(SURFACE_ID)?.remove();

    surfaceHost = document.createElement("div");
    surfaceHost.id = SURFACE_ID;
    surfaceHost.setAttribute("data-pmb-owned", "true");
    Object.assign(surfaceHost.style, {
      position: "fixed",
      inset: "0",
      width: "0",
      height: "0",
      zIndex: "2147483647",
      pointerEvents: "none"
    });

    shadowRoot = surfaceHost.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      :host { all: initial; }
      #actions {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 2147483646;
      }
      .pmb-action {
        position: fixed;
        pointer-events: auto;
        appearance: none;
        border: 1px solid rgba(0,90,115,.35);
        border-radius: 8px;
        padding: 5px 9px;
        min-width: 92px;
        min-height: 28px;
        background: #59d7d0;
        color: #0b2025;
        font: 700 12px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0,0,0,.16);
      }
      .pmb-action:hover { filter: brightness(.98); }
      .pmb-action:disabled { opacity: .58; cursor: progress; }
      #status {
        position: fixed;
        right: 18px;
        top: 18px;
        width: min(420px, calc(100vw - 36px));
        display: grid;
        gap: 6px;
        pointer-events: none;
        z-index: 2147483647;
      }
      .pmb-status {
        justify-self: end;
        max-width: 100%;
        box-sizing: border-box;
        padding: 7px 10px;
        border-radius: 8px;
        background: rgba(20,40,55,.95);
        color: white;
        font: 600 12px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        box-shadow: 0 2px 10px rgba(0,0,0,.22);
      }
      .pmb-status[data-level="error"] { background: rgba(140,25,25,.96); }
      .pmb-status[data-level="ok"] { background: rgba(19,105,63,.96); }
    `;

    actionLayer = document.createElement("div");
    actionLayer.id = "actions";
    statusLayer = document.createElement("div");
    statusLayer.id = "status";
    shadowRoot.append(style, actionLayer, statusLayer);
    (document.documentElement || document.body).appendChild(surfaceHost);
  }

  function status(text, level = "info") {
    ensureSurface();
    let node = statusLayer.querySelector('[data-status-key="operation"]');
    if (!text) {
      node?.remove();
      return;
    }
    if (!node) {
      node = document.createElement("div");
      node.className = "pmb-status";
      node.dataset.statusKey = "operation";
      statusLayer.appendChild(node);
    }
    node.dataset.level = level;
    node.textContent = String(text);
    const stamp = String(Date.now());
    node.dataset.stamp = stamp;
    setTimeout(() => {
      if (node?.isConnected && node.dataset.stamp === stamp) node.remove();
    }, 5000);
  }

  function assistantContainerFor(node) {
    return node?.closest?.('[data-message-author-role="assistant"], article, [data-testid^="conversation-turn-"]') || null;
  }

  function candidateBlocks() {
    const candidates = [];
    const seen = new Set();
    for (const block of document.querySelectorAll('pre, [data-testid="code-block"], .code-block, #code-block-viewer')) {
      if (!block?.isConnected || seen.has(block) || !assistantContainerFor(block)) continue;
      seen.add(block);
      candidates.push(block);
    }

    // Same normalization used by the Yandex 0.1.9 reference: keep the outer
    // code-block container when ChatGPT renders nested matching elements.
    return candidates.filter((block) =>
      !candidates.some((other) => other !== block && other.contains?.(block))
    );
  }

  function blockText(block) {
    if (!block) return "";
    const cm = block.querySelector?.('.cm-content, [contenteditable="false"].cm-content');
    if (cm) return String(cm.innerText || cm.textContent || "").replace(/\r\n?/g, "\n").trim();
    const code = block.querySelector?.("code");
    return String((code || block).innerText || (code || block).textContent || "").replace(/\r\n?/g, "\n").trim();
  }

  function stableBlockId(block) {
    let id = blockId.get(block);
    if (!id) {
      id = `pmb-block-${globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`;
      blockId.set(block, id);
    }
    return id;
  }

  function actionPosition(block) {
    const rect = block.getBoundingClientRect();
    const width = 102;
    const gap = 10;
    const maxLeft = Math.max(8, window.innerWidth - width - 8);
    let left = rect.right + gap;

    // Exact Yandex-reference fallback: if there is no room to the right of the
    // block, keep the action on its top-right edge instead of creating a new row.
    if (left > maxLeft) left = Math.max(8, rect.right - width);

    return {
      top: Math.max(8, Math.min(window.innerHeight - 36, rect.top + 6)),
      left: Math.max(8, Math.min(maxLeft, left)),
      visible: rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth
    };
  }

  function layoutActions() {
    if (!manualEnabled) return;
    for (const [block, button] of actionByBlock) {
      if (!block.isConnected || !button.isConnected) continue;
      const p = actionPosition(block);
      button.style.top = `${Math.round(p.top)}px`;
      button.style.left = `${Math.round(p.left)}px`;
      button.style.display = p.visible ? "" : "none";
    }
  }

  function removeActions() {
    for (const button of actionByBlock.values()) button.remove();
    actionByBlock.clear();
  }

  function createAction(block) {
    ensureSurface();
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pmb-action";
    button.setAttribute(ACTION_ATTR, "true");
    button.dataset.blockId = stableBlockId(block);
    button.textContent = "Polymarket";
    button.title = "Выполнить этот блок через Polymarket Bridge";

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      button.disabled = true;
      try {
        const key = conversationKey();
        if (!key) throw new Error("Не удалось подтвердить текущий ChatGPT-диалог.");
        const response = await sendWorker({
          type: "PM_EXECUTE_MANUAL_BLOCK",
          conversation_key: key,
          block_text: blockText(block)
        });
        if (!response?.ok) throw new Error(response?.error || response?.code || "Команда не принята.");
        status("Polymarket: команда принята; результат будет отправлен в этот диалог.", "ok");
      } catch (error) {
        status(`Polymarket: ${error.message || error}`, "error");
      } finally {
        button.disabled = false;
      }
    });

    actionLayer.appendChild(button);
    actionByBlock.set(block, button);
    return button;
  }

  function refreshActions() {
    refreshQueued = false;
    ensureSurface();

    if (!manualEnabled || !conversationKey()) {
      removeActions();
      return;
    }

    const blocks = candidateBlocks();
    const live = new Set(blocks);

    for (const [block, button] of [...actionByBlock]) {
      if (!live.has(block) || !block.isConnected) {
        button.remove();
        actionByBlock.delete(block);
      }
    }

    for (const block of blocks) {
      if (!actionByBlock.has(block) && blockText(block)) createAction(block);
    }

    layoutActions();
  }

  function scheduleActionRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    queueMicrotask(refreshActions);
  }

  async function refreshState() {
    const key = conversationKey();
    if (!key) {
      manualEnabled = false;
      removeActions();
      return;
    }
    try {
      const response = await sendWorker({ type: "PM_GET_STATE", conversation_key: key });
      manualEnabled = response?.ok && response.manual_enabled === true;
      scheduleActionRefresh();
    } catch {
      // Service worker may be restarting; preserve current DOM and retry.
    }
  }

  async function finishCommitted(key, entry, local) {
    if (!PMBComposerSend.isReady(document)) return false;
    if (!local.ready_since) local.ready_since = Date.now();
    if (Date.now() - local.ready_since < 1500) return false;
    const response = await sendWorker({ type: "PM_DELIVERY_COMPLETE", conversation_key: key, delivery_id: entry.delivery_id });
    if (response?.ok) {
      local.completed = true;
      deliveryState.delete(entry.delivery_id);
      return true;
    }
    return false;
  }

  async function processOutbox() {
    const key = conversationKey();
    if (!key) return;
    try {
      const response = await sendWorker({ type: "PM_GET_OUTBOX", conversation_key: key });
      const entry = response?.ok ? response.outbox : null;
      if (!entry?.delivery_id) return;
      if (entry.delivery_mode === "attachment_v1") return; // file_delivery_content.js owns attachment delivery.
      const local = deliveryState.get(entry.delivery_id) || { injected: false, clicked: false, completed: false, ready_since: 0 };
      deliveryState.set(entry.delivery_id, local);

      if (entry.phase === "committed") {
        await finishCommitted(key, entry, local);
        return;
      }

      const composer = PMBComposerSend.findComposer(document);
      if (!composer) return status("Polymarket: поле ввода ChatGPT не найдено.", "error");
      const current = PMBComposerSend.readComposer(composer);
      if (current.trim() && current !== entry.report_text) return;

      if (!local.injected || current !== entry.report_text) {
        PMBComposerSend.setComposerText(composer, entry.report_text);
        local.injected = true;
        await new Promise((resolve) => setTimeout(resolve, 120));
      }

      if (local.clicked) return;
      const sendButton = PMBComposerSend.findSendButton(document);
      if (!sendButton) return;
      const committed = await sendWorker({ type: "PM_MARK_DELIVERY_COMMITTED", conversation_key: key, delivery_id: entry.delivery_id });
      if (!committed?.ok) return status("Polymarket: worker не подтвердил delivery commit.", "error");
      local.clicked = true;
      sendButton.click();
    } catch {
      // Retry next poll.
    }
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type !== "PM_CONTENT_SET_MANUAL") return false;

    Promise.resolve().then(async () => {
      const key = conversationKey();
      if (!key || key !== String(message.conversation_key || "")) {
        return { ok: false, code: "CONVERSATION_MISMATCH" };
      }
      const response = await sendWorker({
        type: "PM_SET_MANUAL",
        conversation_key: key,
        enabled: message.enabled === true
      });
      if (response?.ok) {
        manualEnabled = response.manual_enabled === true;
        scheduleActionRefresh();
      }
      return response;
    }).then(sendResponse).catch((error) => {
      sendResponse({ ok: false, code: "CONTENT_MANUAL_ERROR", error: error.message || String(error) });
    });
    return true;
  });

  ensureSurface();

  observer = new MutationObserver(scheduleActionRefresh);
  observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

  window.addEventListener("scroll", layoutActions, { passive: true, capture: true });
  window.addEventListener("resize", layoutActions, { passive: true });

  void refreshState();
  stateTimer = setInterval(() => void refreshState(), STATE_MS);
  outboxTimer = setInterval(() => void processOutbox(), POLL_MS);

  addEventListener("beforeunload", () => {
    clearInterval(stateTimer);
    clearInterval(outboxTimer);
    observer?.disconnect();
    removeActions();
  }, { once: true });
})();
