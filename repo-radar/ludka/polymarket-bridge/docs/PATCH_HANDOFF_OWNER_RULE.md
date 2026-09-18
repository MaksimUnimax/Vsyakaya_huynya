# Polymarket Bridge — mandatory patch handoff owner rule

Status: **MANDATORY / OWNER CONTROL**

Date: 2026-09-18

This rule applies to **every patch/build** handed to the owner for install, browser test, or acceptance.

## Required handoff wording

Before providing a patch/build, the architect MUST write exactly:

**ХУЕСОС ПРОГНАЛ ПАТЧ ЧЕРЕЗ ЭТИ ГЕЙТЫ:**

Then list **every gate actually executed**, with an explicit result for each gate.

Example shape:

- G-001 — <gate name>: PASS
- G-002 — <gate name>: PASS
- G-003 — <gate name>: PASS

The architect must NOT substitute vague wording such as:
- “tests passed”;
- “CI green”;
- “checked”;
- “everything is fine”.

## Hard rule

If any mandatory gate:
- was not executed;
- is still pending;
- failed;
- has no evidence;

then the patch **MUST NOT be handed to the owner**.

The architect must instead state which gate is blocking handoff and continue fixing/testing.

## Gate evidence requirement

For every listed gate, preserve at least one concrete evidence item where applicable:
- test name;
- workflow run/job id;
- commit SHA;
- exact command/test result;
- browser acceptance evidence;
- artifact SHA-256.

## Root-cause linkage

Every new defect must:
1. be recorded with its **architect/process root cause**, not only symptom;
2. create or extend a regression gate;
3. become part of the mandatory gate set for later patches when relevant.

## Owner wording is not optional

Every future patch handoff in chat must include the exact heading:

**ХУЕСОС ПРОГНАЛ ПАТЧ ЧЕРЕЗ ЭТИ ГЕЙТЫ:**

No patch handoff is valid without it.
