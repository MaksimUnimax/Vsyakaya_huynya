import assert from "node:assert/strict";

class FakeElement {
  constructor({ id = "", text = "", attrs = {} } = {}) {
    this.id = id;
    this.textContent = text;
    this.attrs = new Map(Object.entries(attrs));
    this.isConnected = true;
    this.disabled = false;
    this.parentElement = null;
    this.listeners = new Map();
    this.form = null;
    this.clickCount = 0;
  }
  getAttribute(name) { return this.attrs.get(name) ?? null; }
  setAttribute(name, value) { this.attrs.set(name, String(value)); }
  closest(selector) { return selector === "form" ? this.form : null; }
  contains(node) { return node === this || node?.form === this; }
  addEventListener(type, fn) {
    const list = this.listeners.get(type) || [];
    list.push(fn);
    this.listeners.set(type, list);
  }
  removeEventListener(type, fn) {
    const list = this.listeners.get(type) || [];
    this.listeners.set(type, list.filter((item) => item !== fn));
  }
  click() { this.clickCount += 1; }
  getBoundingClientRect() { return { width: 120, height: 32, top: 0, left: 0, right: 120, bottom: 32 }; }
}

globalThis.Element = FakeElement;
globalThis.getComputedStyle = () => ({ display: "block", visibility: "visible", opacity: "1" });
globalThis.document = {
  addEventListener() {},
  removeEventListener() {}
};

await import("../src/composer_send.js");
const C = globalThis.PMBComposerSend;
assert.ok(C, "PMBComposerSend must load");

const form = new FakeElement({ id: "composer-form" });
const composer = new FakeElement({ id: "prompt-textarea", text: "EXPECTED" });
const button = new FakeElement({
  id: "composer-submit-button",
  attrs: { "aria-label": "Send prompt", type: "submit" }
});
composer.form = form;
button.form = form;

const context = { doc: globalThis.document, composer, form, root: form };
const deps = {
  resolveContext: () => context,
  resolveButton: () => button,
  candidateButtons: () => [button],
  visible: () => true,
  disabled: () => false,
  readComposerText: () => "EXPECTED",
  fingerprint: C.targetFingerprint,
  requireAttachmentReady: () => true,
  sendBlockedReason: () => "",
  sleep: async () => {}
};

const target = await C.waitForValidatedTarget({
  expectedText: "EXPECTED",
  timeoutMs: 100,
  sampleIntervalMs: 0,
  requiredStableSamples: 1,
  deps
});

assert.ok(target, "validated target must be returned");
assert.equal(target.button, button, "validated target must preserve the resolved Send button");
assert.equal(target.context, context, "validated target must preserve composer context");
assert.match(target.snapshot.button_fingerprint, /composer-submit-button/);

const click = C.clickSynchronously({
  target,
  expectedText: "EXPECTED",
  deps
});
assert.equal(click.method_called, true);
assert.equal(click.method, "button.click");
assert.equal(button.clickCount, 1, "Send click must be invoked exactly once");

console.log("composer send runtime test: PASS");
