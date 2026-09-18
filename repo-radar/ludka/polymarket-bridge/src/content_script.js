/* global PMBConversationIdentity, PMBComposerSend, PMBProduct */
(() => {
  "use strict";

  const ACTION_ATTR = "data-pmb-manual-action";
  const BLOCK_ATTR = "data-pmb-block-bound";
  const POLL_MS = 700;
  const STATE_MS = 1500;
  let manualEnabled = false;
  let stateTimer = null;
  let outboxTimer = null;
  let observer = null;
  let refreshQueued = false;
  const deliveryState = new Map();

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

  function status(text, level = "info") {
    let node = document.getElementById("pmb-status-toast");
    if (!node) {
      node = document.createElement("div");
      node.id = "pmb-status-toast";
      Object.assign(node.style, {
        position: "fixed", right: "18px", top: "18px", zIndex: "2147483647",
        maxWidth: "420px", padding: "8px 11px", borderRadius: "9px",
        color: "white", font: '600 12px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        boxShadow: "0 2px 12px rgba(0,0,0,.22)"
      });
      document.documentElement.appendChild(node);
    }
    node.style.background = level === "error" ? "rgba(140,25,25,.96)" : level === "ok" ? "rgba(19,105,63,.96)" : "rgba(20,40,55,.95)";
    node.textContent = text;
    clearTimeout(node.__timer);
    node.__timer = setTimeout(() => node.remove(), 5000);
  }

  function candidateBlocks() {
    const all = [...document.querySelectorAll("pre")];
    return all.filter((block) => {
      if (block.closest(`[${ACTION_ATTR}]`)) return false;
      const message = block.closest('[data-message-author-role="assistant"]');
      if (message) return true;
      const article = block.closest("article");
      return Boolean(article && /assistant/i.test(article.getAttribute("data-turn") || article.getAttribute("aria-label") || ""));
    });
  }

  function removeActions() {
    document.querySelectorAll(`[${ACTION_ATTR}="true"]`).forEach((node) => node.remove());
    document.querySelectorAll(`[${BLOCK_ATTR}="true"]`).forEach((node) => node.removeAttribute(BLOCK_ATTR));
  }

  function blockText(block) {
    return String(block.innerText ?? block.textContent ?? "").trim();
  }

  function decorate() {
    if (!manualEnabled) { removeActions(); return; }
    for (const block of candidateBlocks()) {
      if (block.getAttribute(BLOCK_ATTR) === "true") continue;
      const text = blockText(block);
      if (!text) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute(ACTION_ATTR, "true");
      button.textContent = "Polymarket";
      Object.assign(button.style, {
        marginLeft: "8px", padding: "5px 9px", borderRadius: "8px",
        border: "1px solid rgba(0,90,115,.35)", background: "#59d7d0", color: "#0b2025",
        font: '700 12px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', cursor: "pointer"
      });
      button.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        button.disabled = true;
        try {
          const key = conversationKey();
          if (!key) throw new Error("Не удалось подтвердить текущий ChatGPT-диалог.");
          const response = await sendWorker({ type: "PM_EXECUTE_MANUAL_BLOCK", conversation_key: key, block_text: blockText(block) });
          if (!response?.ok) throw new Error(response?.error || response?.code || "Команда не принята.");
          status("Polymarket: команда принята; результат будет отправлен в этот диалог.", "ok");
        } catch (error) {
          status(`Polymarket: ${error.message || error}`, "error");
        } finally {
          button.disabled = false;
        }
      });
      block.setAttribute(BLOCK_ATTR, "true");
      const toolbar = block.parentElement?.querySelector?.('[class*="flex"], [class*="toolbar"]');
      if (toolbar && toolbar !== block) toolbar.appendChild(button);
      else block.parentElement?.insertBefore(button, block);
    }
  }

  function scheduleDecorate() {
    if (refreshQueued) return;
    refreshQueued = true;
    queueMicrotask(() => { refreshQueued = false; decorate(); });
  }

  async function refreshState() {
    const key = conversationKey();
    if (!key) { manualEnabled = false; removeActions(); return; }
    try {
      const response = await sendWorker({ type: "PM_GET_STATE", conversation_key: key });
      manualEnabled = response?.ok && response.manual_enabled === true;
      scheduleDecorate();
    } catch { /* service worker may be restarting */ }
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
    } catch { /* retry next poll */ }
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type !== "PM_CONTENT_SET_MANUAL") return false;
    Promise.resolve().then(async () => {
      const key = conversationKey();
      if (!key || key !== String(message.conversation_key || "")) return { ok: false, code: "CONVERSATION_MISMATCH" };
      const response = await sendWorker({ type: "PM_SET_MANUAL", conversation_key: key, enabled: message.enabled === true });
      if (response?.ok) { manualEnabled = response.manual_enabled === true; scheduleDecorate(); }
      return response;
    }).then(sendResponse).catch((error) => sendResponse({ ok: false, code: "CONTENT_MANUAL_ERROR", error: error.message || String(error) }));
    return true;
  });

  observer = new MutationObserver(scheduleDecorate);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  void refreshState();
  stateTimer = setInterval(() => void refreshState(), STATE_MS);
  outboxTimer = setInterval(() => void processOutbox(), POLL_MS);

  addEventListener("beforeunload", () => {
    clearInterval(stateTimer); clearInterval(outboxTimer); observer?.disconnect();
  }, { once: true });
})();
