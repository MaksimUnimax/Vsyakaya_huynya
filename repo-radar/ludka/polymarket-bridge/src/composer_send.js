(() => {
  "use strict";

  function findComposer(doc = document) {
    for (const selector of [
      '#prompt-textarea',
      'div[contenteditable="true"][data-lexical-editor="true"]',
      'div[contenteditable="true"][role="textbox"]',
      'textarea'
    ]) {
      const element = doc.querySelector(selector);
      if (element) return element;
    }
    return null;
  }

  function readComposer(element) {
    if (!element) return "";
    if ("value" in element && typeof element.value === "string") return element.value;
    return String(element.innerText ?? element.textContent ?? "");
  }

  function setComposerText(element, text) {
    if (!element) return false;
    const value = String(text ?? "");
    element.focus?.();
    if ("value" in element && typeof element.value === "string") {
      const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), "value")?.set;
      if (setter) setter.call(element, value); else element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    }
    element.textContent = value;
    element.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: value }));
    return true;
  }

  function findSendButton(doc = document) {
    for (const selector of [
      'button[data-testid="send-button"]',
      'button[aria-label*="Send" i]',
      'button[aria-label*="Отправ" i]'
    ]) {
      const element = doc.querySelector(selector);
      if (element && !element.disabled) return element;
    }
    return null;
  }

  function isReady(doc = document) {
    const composer = findComposer(doc);
    return Boolean(composer && !readComposer(composer).trim());
  }

  globalThis.PMBComposerSend = Object.freeze({ findComposer, readComposer, setComposerText, findSendButton, isReady });
})();
