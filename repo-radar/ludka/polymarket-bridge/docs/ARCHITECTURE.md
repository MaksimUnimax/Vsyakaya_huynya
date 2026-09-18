# Architecture

## Reference behavior inherited from Yandex Marketing Bridge

The product intentionally reuses these proven concepts:

1. **Conversation binding** — commands/results are scoped to a confirmed ChatGPT `/c/<conversation-id>` URL.
2. **Separate Manual action** — native ChatGPT Copy remains untouched; Manual ON adds one separate `Polymarket` sibling action per code block.
3. **Worker-owned command validation** — the content script sends the complete block; it does not decide whether the command is valid.
4. **Multi-command discovery** — scan the full block, extract balanced JSON after each marker, execute in source order.
5. **Strict serial provider execution** — no hidden fan-out.
6. **Durable outbox** — provider result is persisted before delivery.
7. **Delivery fence** — inject the result into the ChatGPT composer, mark it committed, click Send once, then clear the outbox only after the page returns to ready state.
8. **Observable errors** — invalid blocks/commands produce chat-visible controlled results and zero provider requests.

## Deliberate differences

- Product is Polymarket-only.
- v0.1.0 is public-read-only.
- No billing/cost policy is needed for public endpoints.
- No unsafe large-file/Base64 transport is inherited.
- No Autorun in v0.1.0. Manual commands are explicit owner actions.

## Runtime components

### `content_script.js`

- resolves current conversation;
- decorates assistant code blocks while Manual is enabled;
- sends full clicked block to the worker;
- polls the conversation outbox;
- writes the result into ChatGPT composer and sends it once.

### `service_worker.js`

- owns Manual state and operation fence;
- asks `protocol.js` to discover/normalize commands;
- executes provider requests serially;
- caps provider response size;
- stores the combined result in `chrome.storage.local` outbox.

### `protocol.js`

Pure command/URL/validation layer. It does not access Chrome APIs.

### Popup

Shows current conversation state and enables/disables Manual mode.

## Large data

This bridge is intentionally a bounded command transport, not a corpus-analysis runtime.

Full-corpus work belongs to ChatGPT Work. The bridge can provide bounded API pages/samples and later may gain a resource-safe IndexedDB collector only after a separate resource gate.
