# Polymarket Bridge — defect root causes and mandatory regression gates

Status: MANDATORY / OWNER CONTROL
Updated: 2026-09-18

This file records WHY each defect was introduced, not only what the user observed.
Every defect creates a permanent regression gate.

## RC-001 — wrong Manual action placement

Architect/process root cause:
The owner said to copy the Yandex reference mechanism, but the architect improvised a custom inline DOM insertion before inspecting the exact owner-provided Yandex 0.1.9 implementation. The requirement was incorrectly treated as approximate visual similarity instead of reference fidelity.

Permanent gates:
- G-001 REFERENCE FIDELITY: inspect the exact owner-provided reference artifact first, record its hash/source files, and document any intentional deviation before coding.
- G-002 ACTION LAYOUT: external Shadow-DOM action surface + geometry-based placement must exist; historical inline insertBefore(button, block) path must be absent.

## RC-002 — large result stopped at DELIVERY_TOO_LARGE

Architect/process root cause:
The architect relied on an older repository checkpoint and failed to treat the owner-provided newer Yandex 0.1.9 ZIP as the factual authority for file delivery. Architecture was chosen before the supplied artifact was inspected.

Permanent gates:
- G-003 OWNER ARTIFACT PRECEDENCE: a newer owner-supplied artifact supersedes stale assumptions for that mechanism and must be hashed/inspected before design.
- G-004 LARGE RESULT FILE DELIVERY: large accepted-size batches must serialize to JSON, persist in IndexedDB chunks, verify per-chunk SHA-256, create a File and attach through DataTransfer instead of degrading to DELIVERY_TOO_LARGE.

## RC-003 — v0.1.1 attached file but did not auto-Send

Architect/process root cause:
The architect copied only the file-attachment half of the reference and retained a simplified custom Send helper, while incorrectly claiming the mechanism had been copied. The full reference composer/send lifecycle was not transferred.

Permanent gate:
- G-005 FULL SEND LIFECYCLE: candidate enumeration including #composer-submit-button, same-form validation, stable target samples, fingerprint, pre-click revalidation, clickSynchronously, durable click-dispatched state, user-turn confirmation and no duplicate automatic Send after dispatch.

## RC-004 — v0.1.2 runtime ReferenceError: button is not defined

Immediate cause:
waitForValidatedTarget built the target with a misspelled identifier/property: { context, buttn } instead of { context, button }.

Architect/process root cause:
The reference code was transplanted through manual/generated text editing without executing the critical runtime function. The existing contract test only searched source text for function names. It did not invoke waitForValidatedTarget, so CI could be green while the real path still threw ReferenceError.

Permanent gates:
- G-006 COMPOSER SEND RUNTIME: actually call waitForValidatedTarget on a fake DOM target, assert the returned target contains the resolved button, call clickSynchronously and assert exactly one click.
- G-007 HISTORICAL TYPO: source must not contain identifier buttn; validated target construction must use context + button.

## RC-005 — failed delivery repeatedly reinserted the same summary into composer

Immediate cause:
After the Send runtime exception, durable outbox phase stayed attachment_ready. file_delivery_content polls roughly every 700 ms. The catch handler only displayed an error toast and did not change durable state. The next poll ran processReady again and composerFor restored report_text whenever the composer was empty.

Architect/process root cause:
The state machine had no terminal/paused state for pre-send runtime failures. Failure behavior was not modeled as a first-class durable state, so retry polling was allowed to keep mutating the user's composer after an internal bug.

Permanent gates:
- G-008 FAILURE PAUSE: every non-user-occupancy runtime exception before confirmed Send persists attachment_failed_paused with code/message/version.
- G-009 NO REINJECTION: attachment_failed_paused is non-processable by polling; after pause, polling may not inject composer text, attach files or invoke Send.

## RC-006 — unfinished durable outbox can survive extension update

Architect/process root cause:
Durable outbox state was intentionally persisted, but entries had no bridge_version and startup had no migration/quarantine rule. The design assumed fresh runtime state despite using persistent storage.

Permanent gates:
- G-010 STALE OUTBOX VERSION: every new delivery stores bridge_version; startup converts unfinished attachment entries with missing/different version to attachment_failed_paused rather than replaying them.
- G-011 PAUSED RECOVERY: a paused stale/failed delivery cannot auto-replay, but the next explicit owner command may clear that paused state and start fresh work.

## Mandatory patch gate set

For every patch touching UI, delivery, outbox, file transport, composer or Send, all applicable gates G-001 through G-011 are mandatory.
Provider/protocol gates are also mandatory: syntax/manifest, protocol parsing, ordered multi-command execution, invalid-command isolation and result-envelope integrity.

Every handoff must use the exact owner-required heading from PATCH_HANDOFF_OWNER_RULE.md:

ХУЕСОС ПРОГНАЛ ПАТЧ ЧЕРЕЗ ЭТИ ГЕЙТЫ:

Then list every actually executed applicable gate with PASS/FAIL and concrete evidence. If a mandatory gate is not executed or is not PASS, the patch must not be handed to the owner.
