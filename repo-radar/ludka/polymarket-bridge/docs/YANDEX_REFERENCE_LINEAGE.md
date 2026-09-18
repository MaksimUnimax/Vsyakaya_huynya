# Yandex Bridge reference lineage

Reference repository:

`MaksimUnimax/Yandex_direct`

Reference branch reviewed:

`roadmap/kwork-productization-2026-08-28`

The Polymarket Bridge was designed from these Yandex Marketing Bridge concepts/files:

- `extension/src/content_script.js` — ChatGPT DOM boundary and result-delivery lifecycle;
- `extension/src/service_worker.js` — durable outbox and worker-owned provider execution;
- `extension/src/shared/conversation_identity.js` — exact ChatGPT conversation binding;
- `extension/src/shared/composer_send.js` — composer/Send integration;
- `extension/src/shared/service_registry.js` — command prefix routing;
- `extension/src/shared/search_protocol.js` — strict protocol normalization and result envelopes;
- `extension/src/shared/search_batch_*` — ordered multi-command/batch design;
- `extension/docs/MANUAL_CODE_BLOCK_ACTION_CONTRACT_V2_2026-08-17.md` — separate Manual sibling action and worker-owned validation;
- `extension/docs/YMB_ASYNC_FILE_PATCH_CHECKPOINT_2026-09-11.md` — negative evidence against unsafe large-file storage/Base64 amplification.

This is architectural reuse, not a copy of Yandex API contracts. Polymarket endpoints, validation and security scope are defined independently from current Polymarket documentation.
