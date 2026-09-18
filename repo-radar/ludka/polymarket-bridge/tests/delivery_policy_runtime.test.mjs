import assert from "node:assert/strict";

await import("../src/delivery_policy.js");
const P = globalThis.PMBDeliveryPolicy;
assert.ok(P, "PMBDeliveryPolicy must load");

for (const phase of ["claimed", "attachment_committed", "attachment_ready", "attachment_send_committed"]) {
  assert.equal(P.shouldProcessAttachmentPhase(phase), true, phase + " must be processable");
}
assert.equal(P.shouldProcessAttachmentPhase("attachment_failed_paused"), false);
assert.equal(P.shouldProcessAttachmentPhase("committed"), false);

const current = {
  delivery_mode: "attachment_v1",
  phase: "attachment_ready",
  bridge_version: "0.1.3",
  delivery_id: "d1"
};
assert.equal(P.needsVersionPause(current, "0.1.3"), false);
assert.equal(P.needsVersionPause({ ...current, bridge_version: "0.1.2" }, "0.1.3"), true);
assert.equal(P.needsVersionPause({ ...current, bridge_version: undefined }, "0.1.3"), true);

const paused = P.pauseEntry(current, {
  code: "BUTTON_REFERENCE_ERROR",
  message: "button is not defined",
  currentVersion: "0.1.3",
  nowIso: "2026-09-18T00:00:00.000Z"
});
assert.equal(paused.phase, "attachment_failed_paused");
assert.equal(paused.failed_code, "BUTTON_REFERENCE_ERROR");
assert.equal(paused.failed_message, "button is not defined");
assert.equal(paused.failed_under_bridge_version, "0.1.3");
assert.equal(P.shouldProcessAttachmentPhase(paused.phase), false);
assert.equal(P.isPausedFailure(paused), true);

console.log("delivery policy runtime test: PASS");
