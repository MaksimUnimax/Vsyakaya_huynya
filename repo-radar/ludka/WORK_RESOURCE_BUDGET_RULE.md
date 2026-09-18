# Ludka / Work resource-budget rule

Status: MANDATORY / OWNER CONTROL

Updated: 2026-09-18

Main Chat must warn the owner BEFORE assigning any Work task that may consume materially large resources.

The warning is mandatory when the planned task may plausibly involve:
- hundreds of thousands or millions of entities/rows;
- tens of thousands or more API/provider calls;
- multi-gigabyte raw or normalized data;
- hours of acquisition/processing;
- large persistent Work/local storage growth;
- expensive multi-partition pagination;
- repeated full-corpus passes.

Before such a task starts, Main Chat must provide the owner with a resource preflight containing:
1. estimated corpus/entity count;
2. estimated request count;
3. estimated data volume;
4. estimated normalized row count/storage;
5. expected runtime order of magnitude;
6. whether all of that volume is required for the current objective;
7. cheaper staged alternatives that preserve correctness;
8. which heavy lanes can be deferred.

The high-volume task may start only after explicit owner approval.

If actual execution grows materially beyond the approved estimate, Work must pause and return a revised estimate instead of silently consuming more resources.

Default architecture for uncertain huge corpora:
metadata/discovery -> deterministic eligibility filter -> size report -> owner approval -> heavy history/trades/full-content acquisition.

Do not use sampling merely to avoid this gate unless the owner explicitly authorizes sampling.

This rule applies to future large-data Work assignments in the ludka research track, not only the current Polymarket experiment.
