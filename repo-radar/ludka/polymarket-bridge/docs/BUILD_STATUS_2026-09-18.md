# Polymarket Bridge build status

Date: 2026-09-18

Current developer version: **0.1.0**

Scope: **public read-only research bridge**.

## Accepted in this developer checkpoint

- Manifest V3 parses.
- JavaScript syntax checks pass for protocol, service worker, content script and popup.
- Protocol unit tests pass.
- Command discovery supports multiple `POLYMARKET_API_V1` commands in one code block and preserves later commands after an earlier invalid command.
- Worker executes commands serially.
- Conversation owner/tab fences and a durable outbox are present.
- ChatGPT result delivery uses inject -> commit -> one Send -> ready-state completion.
- Provider/chat payload caps are present.
- No wallet private key, CLOB secret/passphrase or write/trading endpoint is present.

## Local exact dev ZIP

Filename:

`polymarket-bridge-0.1.0-dev.zip`

SHA-256:

`2754c1c9bc9ab0d16afd8ddef5dbddc82ae64bf5b026062f86ff318cfdffe96a`

The ZIP is built from `src/` with `manifest.json` at archive root.

## Still not claimed

This checkpoint is **not** a browser live-acceptance PASS yet.

Still required after the owner installs it:

1. load unpacked / install ZIP;
2. open a concrete ChatGPT conversation;
3. enable Manual bridge;
4. verify separate `Polymarket` buttons appear without changing native Copy;
5. execute a bounded public API smoke command;
6. verify exactly one provider call and one result delivery into the same conversation;
7. verify a two-command block executes in source order;
8. verify malformed command returns a chat-visible controlled error with zero provider request;
9. verify a result-too-large case fails boundedly rather than materializing an unsafe file transport.

Authenticated/private reads and all trading remain out of scope.
