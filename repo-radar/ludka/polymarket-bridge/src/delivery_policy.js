(() => {
  "use strict";

  const PHASES = Object.freeze({
    CLAIMED: "claimed",
    ATTACHMENT_COMMITTED: "attachment_committed",
    ATTACHMENT_READY: "attachment_ready",
    SEND_COMMITTED: "attachment_send_committed",
    COMMITTED: "committed",
    FAILED_PAUSED: "attachment_failed_paused"
  });

  const PROCESSABLE_ATTACHMENT_PHASES = new Set([
    PHASES.CLAIMED,
    PHASES.ATTACHMENT_COMMITTED,
    PHASES.ATTACHMENT_READY,
    PHASES.SEND_COMMITTED
  ]);

  function shouldProcessAttachmentPhase(phase) {
    return PROCESSABLE_ATTACHMENT_PHASES.has(String(phase || ""));
  }

  function isPausedFailure(entry) {
    return String(entry?.phase || "") === PHASES.FAILED_PAUSED;
  }

  function needsVersionPause(entry, currentVersion) {
    if (!entry || entry.delivery_mode !== "attachment_v1") return false;
    if ([PHASES.COMMITTED, PHASES.FAILED_PAUSED].includes(String(entry.phase || ""))) return false;
    const version = String(entry.bridge_version || "");
    return !version || version !== String(currentVersion || "");
  }

  function pauseEntry(entry, { code, message, currentVersion, nowIso } = {}) {
    return Object.freeze({
      ...(entry || {}),
      phase: PHASES.FAILED_PAUSED,
      failed_code: String(code || "ATTACHMENT_RUNTIME_FAILED"),
      failed_message: String(message || "Attachment delivery paused after runtime failure.").slice(0, 4000),
      failed_at: String(nowIso || new Date().toISOString()),
      failed_under_bridge_version: String(currentVersion || "")
    });
  }

  globalThis.PMBDeliveryPolicy = Object.freeze({
    PHASES,
    shouldProcessAttachmentPhase,
    isPausedFailure,
    needsVersionPause,
    pauseEntry
  });
})();
