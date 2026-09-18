# Polymarket Bridge build status

Date: 2026-09-18
Current version: **0.1.2**
Scope: **public read-only research bridge + text/file delivery + validated Send lifecycle**.

## Reference

Owner-provided factual reference: `Yandex-Marketing-Bridge-0.1.9.zip`

SHA-256: `de4425a47645d537ef7b69994ef2df0f66c3e9bd6741b0b47884426bdd954c4c`

## 0.1.1 live defect

0.1.1 successfully completed:

`provider -> IndexedDB chunks -> SHA-256 -> File -> DataTransfer -> ChatGPT attachment preview`

but failed to automatically Send.

Observed live:
- JSON file attached;
- summary text inserted;
- ChatGPT displayed an enabled Send control;
- bridge did not click it.

Root cause: 0.1.1 copied the file transport but retained a simplified custom Send helper instead of the full Yandex 0.1.9 `composer_send.js` mechanics. It missed the complete candidate/stability/same-form/fingerprint/final-validation/click pipeline.

Therefore **0.1.1 FILE AUTO-SEND = REJECTED**.

## 0.1.2 correction

0.1.2 replaces that path with the reference-derived lifecycle:

1. resolve composer context;
2. enumerate Send candidates including `#composer-submit-button`;
3. require visible + enabled target;
4. require same composer form/root;
5. require composer text unchanged;
6. require attachment-ready;
7. require 3 stable target samples;
8. persist target fingerprint;
9. re-resolve and validate after durable commit;
10. call `clickSynchronously`;
11. persist click trace / dispatched state;
12. confirm a matching new user-turn;
13. cleanup artifact only after confirmation;
14. never automatically Send a second time after click dispatch.

## CI acceptance

Exact candidate commit: `bebd56ea282d566b063de20b9b2c58909cf09845`

GitHub Actions run: `35320777878`

Job: `105522558941`

Verdict: **SUCCESS**

Passed:
- syntax checks including `composer_send.js`;
- manifest parse;
- protocol tests;
- file-delivery contract tests;
- explicit reference-Send assertions;
- installable ZIP build;
- artifact upload.

## Exact artifact

Actions artifact id: `10536738619`

Outer artifact SHA-256:
`f890ab2f6abee72459d070b86ffc707900d517d94faba29118eb0494e475a831`

Exact inner installable ZIP SHA-256:
`4800090d173f075da6c97c5f2151b39a0533d626a5b9af35363bde91400afe59`

Fresh extraction verified:
- `manifest.json` at ZIP root;
- version `0.1.2`;
- product `Polymarket Bridge — ChatGPT ↔ Polymarket`.

## Remaining gate

**CI PASS / LIVE 0.1.2 AUTO-SEND PENDING OWNER RERUN.**
