# Polymarket Work artifact handoff rule

Status: **MANDATORY / OWNER CONTROL**

Updated: 2026-09-18

ChatGPT Work is a large-data execution/analysis worker only.

For every Polymarket Work task:

1. GitHub access is **READ-ONLY**.
2. Work MUST NOT commit, push, create/update repository files, open PRs, upload result artifacts to GitHub, or mutate repository state through git/API/browser/connectors.
3. Work MUST generate result files in its own Work/chat environment.
4. Work MUST return all material outputs to the chat as downloadable artifacts/files.
5. Every material artifact must be accompanied by:
   - exact filename;
   - downloadable link or Work artifact identifier;
   - byte size;
   - row count where applicable;
   - schema where applicable;
   - SHA-256;
   - proposed repository destination path.
6. Proposed repository paths are advisory only. Work does not decide or execute final placement.
7. The owner downloads the Work artifacts and manually uploads them to GitHub.
8. Main Chat is the authority that inspects the owner-uploaded files, decides final paths/names, distributes them across the repository, accepts/rejects the Work pass, and issues any next large-data task.
9. Work MUST NOT consider the task incomplete merely because no GitHub write occurred. Completion means the requested large-data processing is complete and the resulting artifacts are downloadable, hashed, described and returned to Main Chat/owner.
10. If another large-data pass is needed, Work reports that need but does not start it without a new explicit Main Chat task.

This rule overrides any older Work wording that instructs Work to commit, push or write outputs directly to GitHub.
