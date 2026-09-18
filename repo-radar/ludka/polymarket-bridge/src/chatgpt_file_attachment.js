(() => {
  "use strict";

  function base64ToBytes(value) {
    const input = String(value || "").replace(/\s+/g, "");
    if (!input) return new Uint8Array(0);
    if (input.length % 4 !== 0) throw Object.assign(new Error("Invalid base64 chunk length."), { code: "ATTACHMENT_BASE64_INVALID" });
    const binary = atob(input);
    const out = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) out[index] = binary.charCodeAt(index);
    return out;
  }

  async function sha256Hex(bytes) {
    const source = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
    const digest = await crypto.subtle.digest("SHA-256", source);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function createFile(parts, descriptor = {}) {
    const filename = String(descriptor.filename || "polymarket-result.json");
    const mime = String(descriptor.mime_type || "application/json").split(";", 1)[0].trim() || "application/octet-stream";
    return new File(parts, filename, { type: mime, lastModified: Date.now() });
  }

  function fileInput(doc = document) {
    const direct = doc.querySelector('#upload-files[type="file"]');
    if (direct instanceof HTMLInputElement && direct.isConnected) return direct;

    const composer = doc.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], textarea[id*="prompt" i], textarea[data-testid*="prompt" i], [contenteditable="true"][id*="prompt" i], [contenteditable="true"][data-testid*="prompt" i]');
    const form = composer?.closest?.("form");
    if (!(form instanceof Element)) return null;

    const candidates = [...form.querySelectorAll('input[type="file"]')].filter((item) => item instanceof HTMLInputElement && item.isConnected);
    return candidates.length === 1 ? candidates[0] : null;
  }

  function setInputFiles(input, files) {
    if (!(input instanceof HTMLInputElement) || String(input.type || "").toLowerCase() !== "file" || !input.isConnected) {
      throw Object.assign(new Error("ChatGPT file input недоступен."), { code: "ATTACHMENT_FILE_INPUT_INVALID" });
    }
    if (!Array.isArray(files) || !files.length || files.some((file) => !(file instanceof File))) {
      throw Object.assign(new Error("Некорректный список файлов."), { code: "ATTACHMENT_FILE_LIST_INVALID" });
    }
    const transfer = new DataTransfer();
    for (const file of files) transfer.items.add(file);
    input.files = transfer.files;
    const actual = [...(input.files || [])];
    if (actual.length !== files.length || actual.some((file, index) => file.name !== files[index].name || file.size !== files[index].size)) {
      throw Object.assign(new Error("ChatGPT file input не принял полный набор файлов."), { code: "ATTACHMENT_FILE_INPUT_SET_FAILED" });
    }
    input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return actual;
  }

  function attachmentPreview(filename, doc = document) {
    const target = String(filename || "");
    if (!target) return null;
    for (const node of doc.querySelectorAll('[role="group"][aria-label], [data-testid*="file" i][aria-label]')) {
      const aria = String(node.getAttribute("aria-label") || "");
      if (aria === target || aria.includes(target)) return node;
    }
    const composer = doc.querySelector('#prompt-textarea, [data-testid="prompt-textarea"]');
    const form = composer?.closest?.("form");
    if (form) {
      for (const node of form.querySelectorAll('[aria-label], [title]')) {
        const label = `${node.getAttribute("aria-label") || ""} ${node.getAttribute("title") || ""}`;
        if (label.includes(target)) return node;
      }
    }
    return null;
  }

  function surfaceText(node) {
    if (!(node instanceof Element)) return "";
    const parts = [node.textContent || "", node.getAttribute("aria-label") || "", node.getAttribute("title") || ""];
    for (const child of node.querySelectorAll('[aria-label], [title]')) {
      parts.push(child.getAttribute("aria-label") || "", child.getAttribute("title") || "");
    }
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }

  function previewPending(preview) {
    if (!(preview instanceof Element)) return true;
    if (preview.matches('[aria-busy="true"], [data-state="loading"], [data-state="uploading"]')) return true;
    if (preview.querySelector('[aria-busy="true"], [role="progressbar"], [data-state="loading"], [data-state="uploading"], [data-testid*="uploading" i], [data-testid*="progress" i]')) return true;
    const text = surfaceText(preview);
    return /(?:uploading|processing|preparing|загруз(?:ка|ается|ить)|обработ(?:ка|ывается)|подготов)/i.test(text) &&
      /(?:cancel|progress|upload|processing|загруз|обработ|подготов)/i.test(text);
  }

  function previewFailed(preview) {
    const text = surfaceText(preview);
    return /(?:upload failed|failed to upload|could not upload|unsupported file|file error|ошибк.*(?:файл|загруз)|не удалось.*загруз|не поддерж)/i.test(text);
  }

  function attachmentState(descriptors, doc = document) {
    const list = Array.isArray(descriptors) ? descriptors : [];
    if (!list.length) return { ready: false, code: "ATTACHMENT_DESCRIPTORS_EMPTY" };
    for (const descriptor of list) {
      const filename = String(descriptor?.filename || "");
      const preview = attachmentPreview(filename, doc);
      if (!preview?.isConnected) return { ready: false, code: "ATTACHMENT_PREVIEW_MISSING", filename };
      if (previewFailed(preview)) return { ready: false, code: "ATTACHMENT_PREVIEW_FAILED", filename };
      if (previewPending(preview)) return { ready: false, code: "ATTACHMENT_PREVIEW_PENDING", filename };
      if (!surfaceText(preview).includes(filename)) return { ready: false, code: "ATTACHMENT_FILENAME_MISMATCH", filename };
    }
    return { ready: true, code: null };
  }

  function attachmentReady(descriptors, doc = document) { return attachmentState(descriptors, doc).ready; }

  globalThis.PMBChatGPTFileAttachment = Object.freeze({
    base64ToBytes, sha256Hex, createFile, fileInput, setInputFiles,
    attachmentPreview, attachmentState, attachmentReady
  });
})();
