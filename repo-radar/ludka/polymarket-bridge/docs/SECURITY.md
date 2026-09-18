# Security boundary

## v0.1.0

Public read-only API only.

The extension has host permissions only for:

- ChatGPT;
- Gamma API;
- CLOB API;
- Data API.

There is no wallet private key field and no trading endpoint allowlist.

## Secrets forbidden in Git/chat

Never commit or paste:

- signer private key or seed phrase;
- CLOB L2 secret/passphrase;
- Builder secret/passphrase;
- Polymarket browser cookies/session tokens.

## Why trading is deferred

Real order placement requires more than a public API key: CLOB authentication uses wallet proof/L2 credentials and an order itself must be wallet-authorized. Putting a long-lived wallet private key into ordinary extension storage would be an unacceptable shortcut.

A later trading phase must choose and test a signer architecture (preferably a scoped/session signer when generally available), explicit order confirmation, size caps, duplicate/replay fencing, account reconciliation and a real small-order acceptance plan.

## Large payload safety

Yandex Marketing Bridge previously documented an unreleased large-file path whose Base64/storage design amplified memory and failed a repeated 64 MB resource gate. Polymarket Bridge must not clone that path.

v0.1.0 therefore:

- caps provider response text before durable chat delivery;
- does not Base64 entire large corpora;
- does not persist giant payloads in one `chrome.storage.local` object;
- asks the caller to use pagination/bounded history windows;
- delegates full-corpus processing to ChatGPT Work.
