/* global PMBConversationIdentity */
(() => {
  "use strict";
  const manual = document.getElementById("manual");
  const conversation = document.getElementById("conversation");
  const status = document.getElementById("status");
  let currentKey = "";

  function show(text, error = false) {
    status.textContent = text || "";
    status.classList.toggle("error", error);
  }

  function runtimeSend(message) {
    return new Promise((resolve, reject) => chrome.runtime.sendMessage(message, (response) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message)); else resolve(response);
    }));
  }

  function activeTab() {
    return new Promise((resolve, reject) => chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message)); else resolve(tabs?.[0] || null);
    }));
  }

  async function refresh() {
    const tab = await activeTab();
    const id = PMBConversationIdentity.fromUrl(tab?.url || "");
    currentKey = id.conversation_key;
    if (!currentKey) {
      conversation.textContent = "Откройте конкретный ChatGPT-диалог.";
      manual.checked = false;
      manual.disabled = true;
      return;
    }
    conversation.textContent = `Диалог: ${id.conversation_id}`;
    const response = await runtimeSend({ type: "PM_GET_STATE", conversation_key: currentKey });
    if (!response?.ok) throw new Error(response?.error || response?.code || "Не удалось получить состояние.");
    manual.checked = response.manual_enabled === true;
    manual.disabled = false;
    show(response.outbox ? "Есть незавершённая доставка результата." : "Готово.");
  }

  manual.addEventListener("change", async () => {
    manual.disabled = true;
    try {
      if (!currentKey) throw new Error("Нет подтверждённого ChatGPT-диалога.");
      const tab = await activeTab();
      const changed = await new Promise((resolve, reject) => chrome.tabs.sendMessage(tab.id, { type: "PM_CONTENT_SET_MANUAL", conversation_key: currentKey, enabled: manual.checked }, (response) => {
        const e = chrome.runtime.lastError; if (e) reject(new Error(e.message)); else resolve(response);
      }));
      if (!changed?.ok) throw new Error(changed?.error || changed?.code || "Не удалось изменить Manual mode.");
      show(changed.manual_enabled ? "Manual bridge включён." : "Manual bridge выключен.");
    } catch (error) {
      show(error.message || String(error), true);
    } finally {
      manual.disabled = false;
    }
  });

  refresh().catch((error) => show(error.message || String(error), true));
})();
