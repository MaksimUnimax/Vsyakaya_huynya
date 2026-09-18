# Yandex Marketing Bridge 0.1.9 file-delivery reference

Owner-provided reference archive:

`Yandex-Marketing-Bridge-0.1.9.zip`

SHA-256:

`de4425a47645d537ef7b69994ef2df0f66c3e9bd6741b0b47884426bdd954c4c`

This owner-supplied 0.1.9 archive supersedes the older repository checkpoint as the factual implementation reference for file delivery.

## Verified mechanisms reused for Polymarket Bridge 0.1.1

The archive contains and was inspected for:

- `shared/file_artifact_store.js`
  - IndexedDB persistence;
  - ~256 KiB chunks;
  - per-chunk SHA-256;
  - manifest metadata;
  - TTL cleanup.

- `shared/chatgpt_file_attachment.js`
  - `File` creation;
  - ChatGPT file-input discovery;
  - `DataTransfer` file injection;
  - attachment-preview readiness/failure detection.

- `file_delivery_worker_transport.js`
  - plain-text threshold -> attachment mode;
  - chunk fetch ownership/integrity fences;
  - durable attachment phases;
  - exactly-once Send barrier;
  - cleanup after confirmed delivery.

- `file_delivery_content.js`
  - bounded chunk retrieval;
  - hash verification;
  - attachment materialization;
  - preview-ready gate;
  - Send commit before click;
  - no automatic duplicate Send after dispatch;
  - chat confirmation before cleanup.

- `shared/search_async_export.js`
  - bounded Search export pages;
  - JSON file naming;
  - staged artifact delivery instead of returning the full corpus through the composer.

## Polymarket adaptation

Polymarket Bridge 0.1.1 applies the same architecture to a complete multi-command Polymarket batch:

`provider responses -> normalized result envelopes -> one JSON payload -> chunked IndexedDB artifact -> File/DataTransfer -> same ChatGPT conversation`

Small results remain normal text messages.

Large results are no longer replaced with `DELIVERY_TOO_LARGE`; they are delivered as a JSON attachment with a short text summary.

Full historical corpus analysis still belongs to ChatGPT Work. File delivery is a transport mechanism, not permission for Main Chat to analyze large corpora.
