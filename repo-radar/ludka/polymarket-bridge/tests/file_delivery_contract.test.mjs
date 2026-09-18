import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../src/", import.meta.url);
const read = (name) => fs.readFileSync(new URL(name, root), "utf8");

const manifest = JSON.parse(read("manifest.json"));
assert.equal(manifest.version, "0.1.1");
assert.deepEqual(
  manifest.content_scripts[0].js.slice(-3),
  ["chatgpt_file_attachment.js", "content_script.js", "file_delivery_content.js"]
);

const worker = read("service_worker.js");
assert.match(worker, /file_artifact_store\.js/);
assert.match(worker, /CHAT_FILE_THRESHOLD_CHARS\s*=\s*160_000/);
assert.match(worker, /stageTextArtifact/);
assert.match(worker, /delivery_mode:\s*ATTACHMENT_MODE/);
assert.match(worker, /PM_GET_OUTBOX_ARTIFACT_CHUNK/);
assert.match(worker, /PM_MARK_ATTACHMENT_COMMITTED/);
assert.match(worker, /PM_MARK_ATTACHMENT_READY/);
assert.match(worker, /PM_COMMIT_ATTACHMENT_SEND/);
assert.match(worker, /PM_MARK_ATTACHMENT_CLICK_DISPATCHED/);
assert.match(worker, /PM_CONFIRM_ATTACHMENT_SEND/);
assert.doesNotMatch(worker, /DELIVERY_TOO_LARGE/);

const store = read("file_artifact_store.js");
assert.match(store, /indexedDB\.open/);
assert.match(store, /256 \* 1024/);
assert.match(store, /SHA-256/);
assert.match(store, /cleanupDescriptors/);

const attach = read("chatgpt_file_attachment.js");
assert.match(attach, /new DataTransfer\(\)/);
assert.match(attach, /new File\(/);
assert.match(attach, /input\[type="file"\]/);
assert.match(attach, /attachmentReady/);

const content = read("file_delivery_content.js");
assert.match(content, /PM_GET_OUTBOX_ARTIFACT_CHUNK/);
assert.match(content, /ATTACHMENT_CHUNK_SHA256_MISMATCH/);
assert.match(content, /PMBChatGPTFileAttachment\.setInputFiles/);
assert.match(content, /PMBChatGPTFileAttachment\.attachmentReady/);
assert.match(content, /PM_COMMIT_ATTACHMENT_SEND/);
assert.match(content, /PM_MARK_ATTACHMENT_CLICK_DISPATCHED/);
assert.match(content, /PM_CONFIRM_ATTACHMENT_SEND/);
assert.match(content, /Автоматический повтор Send запрещён/);

const ordinary = read("content_script.js");
assert.match(ordinary, /entry\.delivery_mode === "attachment_v1"/);
assert.match(ordinary, /pmb-external-action-surface/);
assert.match(ordinary, /getBoundingClientRect/);
assert.doesNotMatch(ordinary, /insertBefore\(button, block\)/);

console.log("file delivery contract tests: PASS");
