# Polymarket Bridge build status

Date: 2026-09-18

Current developer version: **0.1.1**

Scope: **public read-only research bridge + bounded text/file delivery**.

## Reference

Owner-provided factual file-delivery reference:

`Yandex-Marketing-Bridge-0.1.9.zip`

SHA-256:

`de4425a47645d537ef7b69994ef2df0f66c3e9bd6741b0b47884426bdd954c4c`

## 0.1.1 changes

- Manual action placement changed to the Yandex 0.1.9 overlay/layout model: fixed Shadow-DOM action surface, anchored to the code block's top-right geometry and repositioned on scroll/resize.
- Large multi-command results no longer return `DELIVERY_TOO_LARGE`.
- When serialized chat delivery exceeds 160,000 characters, the complete result is serialized as one JSON artifact.
- Artifact persistence uses IndexedDB, ~256 KiB chunks, per-chunk SHA-256 and TTL cleanup.
- Content runtime fetches chunks one-by-one, verifies metadata and SHA-256, creates a browser `File`, injects it into the ChatGPT file input using `DataTransfer`, and waits for a ready attachment preview.
- Attachment delivery has durable phases and a Send commit barrier. After Send dispatch, automatic duplicate Send is forbidden.
- Temporary artifact chunks are deleted only after the resulting user-turn is confirmed.
- Full-corpus statistical analysis remains delegated to ChatGPT Work.

## CI acceptance

GitHub Actions run:

`35316206939`

Commit tested:

`69fe97e0f7bf7402b1b3f8b8072746c5aada0afa`

Job:

`105508282829`

Result: **SUCCESS**

Passed steps:

- JavaScript syntax checks;
- manifest parse;
- protocol tests;
- file-delivery contract tests;
- installable ZIP build;
- artifact upload.

## Exact installable ZIP

Inner installable ZIP SHA-256:

`6b059ecd3b75c40ad38c840606d5bf90063913c35e6f83f02a7c9cd5c744f8d4`

GitHub Actions artifact archive SHA-256:

`7ff35833b4aba11691c223819b8a58de41ca1440bed9cea54ea9b20bc9218aa6`

The installable ZIP contains `manifest.json` at archive root.

## Required live acceptance for 0.1.1

1. Update/reinstall the extension from the 0.1.1 ZIP.
2. Confirm the Polymarket action is positioned at the code block's top-right area instead of a separate row.
3. Re-run the previous five-command batch that produced ~282k serialized characters.
4. Expected result: a short Polymarket Bridge summary **plus a JSON attachment**, not `DELIVERY_TOO_LARGE`.
5. Open the attachment and verify it contains all five result envelopes.
6. Confirm only one ChatGPT user-turn is sent and no duplicate Send occurs.
