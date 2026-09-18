# Main Chat -> Work command delivery state rule

Status: MANDATORY / OWNER CONTROL
Updated: 2026-09-18

Main Chat does not have an implicit control channel into a separate ChatGPT Work session.

Therefore Main Chat MUST distinguish between a command that has merely been prepared in chat and a command that has actually been delivered to Work.

Allowed status labels:

- NOT_SENT_TO_WORK — Main Chat only prepared the prompt/instruction. The owner still needs to paste/send it into the Work session.
- OWNER_SENT_TO_WORK — the owner explicitly confirms the instruction was sent.
- WORK_ACKNOWLEDGED — Work visibly acknowledged or acted on the instruction.

Main Chat MUST NOT say or imply:
- "Work is stopped";
- "I stopped Work";
- "Work is now doing X";
- "the correction is active";

unless there is evidence that the separate Work session actually received the instruction.

Whenever Main Chat provides an urgent Work control message (STOP, scope correction, resource halt), it must prefix it with:

NOT_SENT_TO_WORK — PASTE THIS INTO THE ACTIVE WORK SESSION NOW

This rule exists because on 2026-09-18 Main Chat prepared a resource STOP but described the situation ambiguously enough that the owner reasonably believed Work had already been stopped, while Work continued Gamma acquisition.

Root cause:
Main Chat conflated "instruction drafted" with "instruction delivered".

Permanent gate:
Before reporting any Work state transition, verify command-delivery status explicitly.
