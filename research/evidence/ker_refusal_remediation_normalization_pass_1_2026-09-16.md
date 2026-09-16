# KER Refusal Remediation — Normalization Pass 1

Дата: 2026-09-16

Связанные файлы:

- `research/candidates/R4_KER_REFUSAL_REMEDIATION_LEADS_RU.md`
- `research/evidence/ker_refusal_remediation_corpus_seed_2026-09-16.md`

Статус:

`NORMALIZATION_PASS_1__REPEAT_FAILURE_AND_LONG_REMEDIATION_WINDOWS_CONFIRMED__POST_2026_CENTRAL_REGISTRY_STATUS_CROSSCHECK_REQUIRED`

## Цель

Не считать raw seed готовым TAM.

Первый normalization pass проверяет:

1. точность отдельных seed-строк;
2. реальные цепочки `отказ -> повторная заявка -> новый отказ/выдача`;
3. длину remediation-window;
4. publication lag там, где дата решения и дата публикации одновременно видны;
5. ограничения после миграции реестра КЭР с 01.03.2026.

Основной источник этого pass — публичная хронология Южного межрегионального управления Росприроднадзора:

`https://rpn.gov.ru/regions/23/gov-services/complex-eco-approval/`

Дополнительный source — Волжско-Камское / Татарстан-Чувашия-Марий Эл управление:

`https://rpn.gov.ru/regions/16/gov-services/complex-eco-approval/`

## 1. Seed correction / confidence downgrade

### `СТРОЙДИЗАЙН` — row 13 confirmed, but only after exact-code recheck

Seed row:

`ООО «СТРОЙДИЗАЙН» / 03-0123-006519-П / refusal 02.03.2026`

Initial bounded search surfaced only the 2025 refusals and therefore temporarily made the 2026 row look suspicious.

Exact current territorial chronology later confirmed:

- application 18.02.2025;
- refusal 22.04.2025;
- reapplication 26.05.2025;
- refusal 28.07.2025;
- reapplication 19.09.2025;
- later application 18.12.2025;
- refusal decision `02.03.2026`, published `17–18.03.2026`.

Conclusion:

Seed row 13 is **confirmed**, but this episode demonstrates why indexed snippets alone are insufficient for normalization.

### `СЗ ТУС` — refusal reason precision correction

Seed currently says:

`refusal 03.03.2026, pp.2`.

Current official regional table visibly supports:

`Отказ в выдаче КЭР №168 от 03.03.2026 (п.9.1 ст.31.1 ...)`

but the retrieved public table excerpt does not support narrowing that row to `pp.2`.

Therefore until a refusal document/table version explicitly exposes the subparagraph:

`refusal_class = ARTICLE_31_1_9_1__SUBPARAGRAPH_NOT_CONFIRMED`

Do not use `pp.2` from the raw seed as authoritative.

## 2. Repeated failure / remediation cycles — measured

### A. ООО «СТРОЙДИЗАЙН», object `03-0123-006519-П`

Observed public sequence:

- refusal: `22.04.2025`;
- reapplication: `26.05.2025`;
- interval: **34 days**;
- refusal: `28.07.2025`;
- reapplication: `19.09.2025`;
- interval: **53 days**;
- later new application: `18.12.2025`;
- refusal: `02.03.2026`.

This is not a one-day clerical failure. Public history shows a multi-attempt remediation cycle lasting many months.

### B. ООО «КРЫМГАЗПРОМ», object `35-0123-012160-П`

Observed:

- refusal: `19.01.2026`;
- new application: `28.02.2026`;
- refusal -> reapplication interval: **40 days**;
- repeat refusal: `18.05.2026`.

Therefore a refusal can leave a commercially relevant unresolved/remediation window for months and can recur after a fresh application.

### C. ООО «НПП ЭКОБИО», object `03-0123-001753-П`

Observed:

- refusal: `21.07.2025`;
- next verified application: `09.02.2026`;
- interval: **203 days**;
- repeat refusal: `14.04.2026`.

### D. АО «Крайжилкомресурс», object `03-0123-009117-П`

Observed:

- refusal: `19.03.2025`;
- reapplication: `29.05.2025`;
- interval: **71 days**;
- refusal: `31.07.2025`;
- next application: `29.12.2025`;
- interval: **151 days**;
- repeat refusal: `12.03.2026`.

### E. АО «Дружба народов Нова», object `35-0291-001839-П`

Observed:

- refusal: `21.08.2025`;
- reapplication: `28.08.2025`;
- interval: **7 days**;
- refusal: `23.09.2025`;
- reapplication: `27.11.2025`;
- interval: **65 days**;
- repeat refusal: `21.01.2026`.

### Simple interval summary

Verified refusal -> next-application intervals from the sequences above:

`7, 34, 40, 53, 65, 71, 151, 203 days`

Median:

approximately **59 days**.

This is a bounded sample, not a national market statistic.

It does prove that the remediation opportunity does not structurally disappear within 24–72 hours after refusal.

## 3. Publication lag — measured on current 2026 examples

Where both refusal-decision date and territorial-page file publication timestamp are visible:

- `КРЫМТОПЭНЕРГОСЕРВИС`: refusal `13.03.2026`; public file `31.03.2026` -> ~18 days;
- `СТРОЙДИЗАЙН`: refusal `02.03.2026`; public file `18.03.2026` -> ~16 days;
- `Универсал`: refusal `27.02.2026`; public file `18.03.2026` -> ~19 days;
- `Крайжилкомресурс`: refusal `12.03.2026`; public file `26.03.2026` -> ~14 days;
- `НПП ЭКОБИО`: refusal `14.04.2026`; public file `15.04.2026` -> ~1 day;
- `Дружба народов Нова`: refusal `21.01.2026`; public file `05.02.2026` -> ~15 days.

Observed range:

`1–19 days`.

Median is roughly **16 days**.

Interpretation:

- this is a real freshness penalty;
- however the measured remediation windows above are frequently many weeks/months, so a 1–3 week publication delay does not automatically destroy commercial timing;
- buyer test still must determine how quickly incumbent consultants react internally.

## 4. Official repeat-remediation workflow — structural support

Current law/rules explicitly support the remediation loop:

- comments are sent to the applicant;
- applicant receives a bounded correction period;
- refusal can follow non-remediation/non-compliance;
- after refusal applicant may submit a new KER application again.

This means `refusal -> remediation -> repeat application` is an expected legal workflow, not an accidental pattern in the regional page.

## 5. External market evidence that repeated attempts are common

Publicly reported data cited by the State Duma ecology committee / Kommersant:

- only ~4% of objects obtained KER on the first application;
- ~28% obtained KER only after the 4th–5th application;
- ~15% after 6–16 applications.

Treat these as attributed sector statistics, not independently recomputed official Rosprirodnadzor metrics.

They materially strengthen the thesis that remediation is a recurring purchased/managed workflow.

## 6. Consultant-side remediation service exists

Public environmental-consulting materials demonstrate that consultants already sell/support the exact workflow after comments/refusals.

Example EcoPlan public case history:

- first KER application;
- formal refusal;
- second application;
- formal refusal;
- repeat application;
- comments;
- corrected application;
- refusal;
- repeat application;
- further comments;
- eventually KER issuance.

Consulting firms also publicly advertise remediation of regulator comments / support through approval.

Therefore `refusal -> need for paid technical/environmental remediation` is a real service market.

What is NOT yet proven:

- that consultants buy external refusal leads;
- that a meaningful share of applicants switch vendor after refusal;
- that current consultant does not already own the remediation work.

## 7. Critical post-01.03.2026 status problem

From 01.03.2026:

- new KER applications move to EPGU;
- the public KER register moves to `https://knd.gov.ru/licenses-registry`;
- old territorial pages can continue to contain applications/refusals and legacy history, but absence of a later issuance on that page is NOT sufficient proof that no KER was later issued.

The public central register is officially documented as public/open.

Current browser control on 2026-09-16:

`https://knd.gov.ru/licenses-registry`

returned a connection timeout in the current environment.

This is a **technical access block for the current control pass**, not evidence that the register is legally closed.

Therefore do NOT currently classify current 2026 refusal leads as:

`UNRESOLVED_TODAY`

solely because no later permit appears on the territorial Rosprirodnadzor page.

Allowed state until central-register crosscheck works:

`REFUSAL_CONFIRMED__POST_REFUSAL_CURRENT_KER_STATUS_CROSSCHECK_REQUIRED`.

## 8. Current normalized conclusion

New evidence strengthens:

- refusal is a real repeated workflow problem;
- repeat applications are common enough to be structurally plausible;
- public histories show remediation windows from days to many months;
- publication delay is nonzero but often shorter than the remediation period;
- paid environmental consultants already work exactly on comment/refusal remediation.

Still OPEN:

1. central current KER status after the 01.03.2026 registry migration;
2. national steady-state refusal volume after the 2024 deadline wave;
3. share of refusals that create a real vendor-switch/second-opinion opportunity;
4. consultant willingness to pay for an external refusal feed;
5. exact incumbent feed audit.

Candidate remains:

`PROMISING_R4__PUBLIC_FAILED_MANDATORY_KER_EVENTS__HIGH_TICKET_REMEDIATION_LEADS__STEADY_STATE_VOLUME_AND_CONVERSION_OPEN`

Do not promote to GO or contact buyers yet.