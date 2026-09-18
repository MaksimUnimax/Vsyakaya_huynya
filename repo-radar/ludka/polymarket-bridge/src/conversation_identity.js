(() => {
  "use strict";
  const CHAT_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const ALLOWED_ORIGINS = new Set(["https://chatgpt.com", "https://chat.openai.com"]);

  function fromUrl(value) {
    try {
      const url = new URL(String(value || ""));
      const origin = ALLOWED_ORIGINS.has(url.origin) ? url.origin : "";
      const match = url.pathname.match(/(?:^|\/)c\/([^/?#]+)(?:\/|$)/i);
      const id = match && CHAT_ID_RE.test(match[1]) ? match[1].toLowerCase() : "";
      return Object.freeze({
        origin,
        conversation_id: id,
        conversation_key: origin && id ? `${origin}|${id}` : "",
        status: origin && id ? "confirmed" : "unconfirmed"
      });
    } catch {
      return Object.freeze({ origin: "", conversation_id: "", conversation_key: "", status: "unavailable" });
    }
  }

  function normalizeKey(value, { required = false } = {}) {
    const text = String(value || "").trim();
    const index = text.indexOf("|");
    if (index > 0) {
      const identity = fromUrl(`${text.slice(0, index)}/c/${text.slice(index + 1)}`);
      if (identity.status === "confirmed") return identity.conversation_key;
    }
    if (required) throw Object.assign(new Error("Не удалось подтвердить текущий ChatGPT-диалог."), { code: "CONVERSATION_KEY_INVALID" });
    return "";
  }

  globalThis.PMBConversationIdentity = Object.freeze({ CHAT_ID_RE, ALLOWED_ORIGINS, fromUrl, normalizeKey });
})();
