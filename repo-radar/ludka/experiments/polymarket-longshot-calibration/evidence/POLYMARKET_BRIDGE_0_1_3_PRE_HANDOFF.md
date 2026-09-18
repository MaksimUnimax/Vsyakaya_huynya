# Polymarket Bridge 0.1.3 — PRE-HANDOFF evidence

Status: **PRE-HANDOFF PASS / OWNER INSTALL REQUIRED FOR LIVE ACCEPTANCE**

Date: 2026-09-18

## Exact source / CI

- Source commit under test: `27b1ef30b6dad348b98badf0414a93bf1d0da66e`
- GitHub Actions run: `35322771547`
- Job: `105528787305`
- Job conclusion: **SUCCESS**
- Actions artifact id: `10537453623`
- Outer Actions artifact SHA-256: `8fdd95289ede651b2f8acaf853aebd2c5a73fd1ffaa460a4d4b240ef10329dd7`
- Exact installable inner ZIP SHA-256: `5c6b246ff15d8169da8b3d1613e49ab04b738f732496d1955f72c2f9bbd8d241`
- Installable ZIP root contains `manifest.json`
- Manifest version: `0.1.3`

## Mandatory gate evidence

### G-001 — REFERENCE FIDELITY: PASS
Owner-provided reference remains `Yandex-Marketing-Bridge-0.1.9.zip`.
Reference SHA-256:
`de4425a47645d537ef7b69994ef2df0f66c3e9bd6741b0b47884426bdd954c4c`.

Reference-derived mechanisms retained:
- external action surface;
- IndexedDB file artifact store;
- File/DataTransfer attachment;
- validated Send target lifecycle;
- durable exactly-once Send state.

### G-002 — ACTION LAYOUT REGRESSION: PASS
`file_delivery_contract.test.mjs` asserts:
- external action surface exists;
- geometry placement uses `getBoundingClientRect()`;
- historical inline `insertBefore(button, block)` path is absent.

### G-003 — OWNER ARTIFACT PRECEDENCE: PASS
The owner-supplied Yandex 0.1.9 archive is recorded as the factual implementation authority in repository documentation and is used instead of the older stale checkpoint assumptions.

### G-004 — LARGE RESULT FILE DELIVERY: PASS
Contract/source gates assert:
- large JSON result path;
- IndexedDB storage;
- ~256 KiB chunks;
- per-chunk SHA-256;
- browser `File`;
- `DataTransfer`;
- no `DELIVERY_TOO_LARGE` fallback for this accepted path.

Prior live evidence already established that the 5-command ~282k result was successfully converted to and attached as a JSON file under 0.1.2. The 0.1.3 patch does not replace that working transport; it changes Send/failure-state safety around it.

### G-005 — FULL SEND LIFECYCLE FIDELITY: PASS
Contract gates assert:
- `#composer-submit-button`;
- `sendCandidates`;
- `targetFingerprint`;
- `validateTarget`;
- `waitForValidatedTarget`;
- `clickSynchronously`;
- attachment-ready condition;
- durable pre-click commit;
- click-dispatched persistence;
- user-turn confirmation.

### G-006 — COMPOSER SEND RUNTIME: PASS
CI step: **Composer Send runtime gate**.

`composer_send_runtime.test.mjs` actually executes:
- `waitForValidatedTarget()`;
- verifies returned target preserves the resolved Send button;
- `clickSynchronously()`;
- verifies Send click method is invoked exactly once.

This is the runtime class that would have caught the historical `buttn` defect before owner handoff.

### G-007 — HISTORICAL TYPO REGRESSION: PASS
Contract gate asserts:
- source contains exact target construction `{ context, button }`;
- source contains no identifier `buttn`.

### G-008 — FAILURE PAUSE STATE: PASS
`delivery_policy_runtime.test.mjs` executes the failure policy and verifies:
- `pauseEntry()` creates `attachment_failed_paused`;
- failure code/message/version are preserved;
- paused phase is non-processable.

Worker/content contract also requires `PM_PAUSE_ATTACHMENT_DELIVERY`.

### G-009 — NO REINJECTION AFTER FAILURE: PASS
Content contract asserts polling is gated through `shouldProcessAttachmentPhase()`.
`attachment_failed_paused` is not processable, so the failed delivery cannot repeatedly call composer/file/Send paths.

### G-010 — STALE OUTBOX VERSION QUARANTINE: PASS
Every new delivery stores `bridge_version`.
Worker startup runs `pauseLegacyAttachmentOutboxesForCurrentVersion()`.
Unfinished attachment outbox created by missing/different bridge version is converted to paused state with `STALE_OUTBOX_VERSION`, not replayed into ChatGPT.

### G-011 — PAUSED DELIVERY EXPLICIT RECOVERY: PASS
Final contract gate on commit `27b1ef30...` asserts the next explicit owner command:
- detects `DeliveryPolicy.isPausedFailure(existingOutbox)`;
- clears that paused outbox/artifact;
- clears the associated failed operation;
- then starts fresh work.

There is no automatic replay of the paused delivery.

## Base CI gates

All PASS in job `105528787305`:
- Syntax
- Manifest parse
- Protocol tests
- File-delivery contract gates
- Composer Send runtime gate
- Delivery failure policy runtime gate
- Build installable ZIP
- Upload installable ZIP

## Previously observed live failures now covered

1. Wrong Manual button placement -> G-001/G-002.
2. Large result replaced by DELIVERY_TOO_LARGE -> G-003/G-004.
3. File attached but no Send -> G-005/G-006.
4. `button is not defined` from `buttn` -> G-006/G-007.
5. Failed summary repeatedly reinserted into composer -> G-008/G-009.
6. Old unfinished outbox surviving extension upgrade -> G-010/G-011.

## Remaining acceptance boundary

This is **PRE-HANDOFF PASS**, not browser-live acceptance.

Owner must install exact 0.1.3 ZIP and run the same large 5-command browser test.

Expected live PASS:
1. 5 provider requests succeed.
2. Complete JSON result attaches.
3. Summary appears once.
4. Bridge automatically clicks Send exactly once.
5. One resulting user-turn appears with the file.
6. No duplicate Send.
7. If a runtime error occurs before Send, delivery becomes paused and the composer is not repeatedly re-populated.
