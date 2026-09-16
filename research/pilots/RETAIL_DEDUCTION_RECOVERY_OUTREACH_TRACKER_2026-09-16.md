# Retail Deduction Recovery — Phase A Outreach / Qualification Tracker

Дата создания: 2026-09-16

Связанные документы:

- `RETAIL_DEDUCTION_RECOVERY_PREPILOT_2026-09-16.md`
- `RETAIL_DEDUCTION_RECOVERY_SAMPLE_REQUEST_2026-09-16.md`
- `RETAIL_DEDUCTION_RECOVERY_OUTREACH_READY_COHORT_A_2026-09-16.md`
- `RETAIL_DEDUCTION_RECOVERY_OUTREACH_READY_COHORT_B_2026-09-16.md`

Цель:

`10 qualified supplier historical samples`.

Это execution tracker, а не CRM и не рейтинг компаний.

## Status vocabulary

Outreach status:

- `NOT_SENT`
- `SENT`
- `NO_RESPONSE`
- `REPLIED`
- `ROUTED_TO_OWNER`
- `DECLINED`
- `QUALIFIED`
- `SAMPLE_AGREED`
- `SAMPLE_RECEIVED`
- `SAMPLE_REJECTED_INCOMPLETE`
- `AUDITED`

Qualification status:

- `UNKNOWN`
- `FAIL_NO_MATERIAL_PENALTY_FLOW`
- `FAIL_NO_EXPORT_PATH`
- `FAIL_NO_PROCESS_OWNER`
- `FAIL_TRUST_REFUSAL`
- `PASS_DISCOVERY`
- `PASS_SAMPLE_READY`

Do not infer qualification from company size or network presence.

---

## Wave 1 tracker

| # | Company | Preferred public channel | Retail evidence | Outreach | Qualification | EDI provider | 3-mo penalty count/RUB | Export 20–50 cases? | Sample | Notes / next action |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Витек | `logist@witek.ru` | X5, Magnit, Lenta + others | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Ask logistics to route to KAM/finance if needed |
| 2 | Семилукский пищекомбинат | `trapeza.ooo@mail.ru` | X5, Magnit, Lenta + others | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | General corporate route; ask who handles network deductions |
| 3 | ТМК-Сервис | `info@tmk-food.ru` | X5, Magnit, Lenta + others | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Packaged FMCG; route internally to KAM/finance/EDI |
| 4 | Сады Баксана | `info@sadbaksan.ru` | X5, Magnit, Lenta | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Fresh-produce stress-test; strict Tier-B exclusion |
| 5 | IDILIKA Food | `info@idilikafood.ru` | X5, Magnit, Lenta + others | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Dairy/fat products; measure quantity-vs-quality mix |
| 6 | Уфагормолзавод | `ugmz@ufamol.ru` | X5/Pyatyorochka, Magnit, Lenta, Perekrestok | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Multi-network dairy |
| 7 | Русский гриб | `info@russkiygrib.ru` | X5, Magnit, Lenta + others | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Direct RC/perishable profile |
| 8 | Экстра Фиш | `info@extra-fish.ru` | X5/Perekrestok/Pyatyorochka, Lenta + others | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Do not route through procurement first |
| 9 | СПЕЦРЕЗЕРВ | `spets_21@list.ru` | X5, Magnit, Lenta | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Fresh produce/import; re-verify channel before send if site unavailable |
| 10 | Любимый город | `info@lubgorod.ru` | Magnit, Lenta, Pyatyorochka, Perekrestok | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Dairy/perishable; quality human-only |
| 11 | Карельское лето | `info@kareliansummer.com` | Magnit, Lenta, Pyatyorochka, Perekrestok | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Mid-size manufacturer/control on sample access |
| 12 | Goodness Agro | `info@goodness-agro.com` | X5, Magnit, Lenta + others | NOT_SENT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | NONE | Larger agribusiness; access-friction stress-test |

---

# Mandatory first-response qualification

Before requesting files, capture exactly these facts.

## Q1 — One easiest retailer

`X5 / MAGNIT / LENTA / OTHER`

Do not ask for multiple networks first.

## Q2 — Materiality

Ask for an approximate range, not exact accounting if inconvenient:

- penalty/deduction document count in last 3 months;
- approximate total RUB;
- whether this is typical or exceptional.

Suggested bands:

- `<10 docs`
- `10–25`
- `26–50`
- `51–100`
- `100+`

RUB:

- `<50k`
- `50–250k`
- `250k–1m`
- `1–5m`
- `5m+`

These are collection bands, not market conclusions.

## Q3 — Reason-family mix

Capture rough share/count:

- non-delivery / shortage;
- order confirmation mismatch;
- late delivery;
- acceptance discrepancy;
- calculation/formula;
- duplicate/repeated charge;
- document/process issue;
- quality;
- logistics/carrier;
- other/contract/legal.

Do not classify quality/legal as Tier A.

## Q4 — EDI provider

Record exact supplier answer:

- Ediweb/CorePlat;
- Saby;
- Kontur.EDI;
- Sfera;
- other;
- multiple;
- unknown.

## Q5 — Bounded export feasibility

Can the company export without a custom IT project:

- 20–50 penalty docs;
- linked ORDERS;
- ORDRSP;
- DESADV;
- RECADV;
- 5–10 known historical outcomes?

Answer:

`YES / PARTIAL / NO / NEEDS_IT`.

If `NEEDS_IT`, ask estimated work only once. Do not start integration.

---

# Qualification decision

## PASS_DISCOVERY

Use only if:

- recurring/material penalty flow exists;
- one target network can be isolated;
- process owner is identifiable;
- EDI/source trail exists;
- bounded export is plausible.

Then send:

`RETAIL_DEDUCTION_RECOVERY_SAMPLE_REQUEST_2026-09-16.md`

## FAIL_NO_MATERIAL_PENALTY_FLOW

Use when the supplier's real burden is too small/intermittent to justify sample work.

This is valuable negative evidence. Do not persuade them to manufacture a use case.

## FAIL_NO_EXPORT_PATH

Use when source events cannot be obtained without substantial custom integration.

Record provider/network and exact reason.

## FAIL_TRUST_REFUSAL

Use when a technically feasible sample is refused because the company will not share even pseudonymized bounded history.

Trust refusal is a DATA_TRUST result, not a sales failure to ignore.

---

# Sample receipt acceptance gate

On receipt, do not start analysis until checking:

1. stable order ids exist;
2. all relevant order versions are present or explicitly unavailable;
3. ORDRSP can be linked to ORDERS;
4. DESADV/RECADV can be linked to order/shipment;
5. penalties have stable ids and amounts;
6. at least some penalty-to-order link is possible;
7. outcome ground truth exists for at least 5–10 cases, if available;
8. source timestamps are preserved;
9. sensitive unrelated data has been removed where practical;
10. contract/rule excerpt is available for the selected reason family.

If fields are missing, classify:

- `USABLE`
- `USABLE_WITH_GAPS`
- `NOT_USABLE_FOR_TIER_A`

Do not silently reconstruct missing authoritative source data with an LLM.

---

# Phase A aggregate counters

Keep these counters updated:

- targets contacted: `0/12`
- replies: `0`
- process-owner conversations: `0`
- qualified suppliers: `0`
- sample agreements: `0`
- samples received: `0`
- usable samples: `0`
- audited samples: `0/10`

Economic counters remain empty until real data exists:

- total penalty RUB: `N/A`
- Tier-A-classifiable RUB: `N/A`
- deterministic mismatch RUB: `N/A`
- false-positive RUB: `N/A`
- historical recovered RUB: `N/A`
- staff hours/month: `N/A`

No extrapolation from court cases or public supplier size into these fields.

---

# Stop conditions

Stop outbound expansion and reassess before contacting more companies if:

- first 5 qualified conversations consistently show trivial penalty burden;
- first 5 show Tier-A almost absent and mostly quality/legal disputes;
- common EDI providers cannot produce linked historical exports;
- trust refusal is systematic even for pseudonymous bounded data;
- a hidden incumbent is identified as already performing the same independent invalid-penalty detection/recovery workflow.

Do not respond to weak evidence by increasing cold outreach volume indefinitely.

# Next executable action

`SEND_WAVE_1_TO_PUBLIC_CORPORATE_CHANNELS` only after owner authorization for outbound communication.

Until that authorization exists, status remains:

`OUTREACH_PACKAGE_COMPLETE__NOT_SENT`.
