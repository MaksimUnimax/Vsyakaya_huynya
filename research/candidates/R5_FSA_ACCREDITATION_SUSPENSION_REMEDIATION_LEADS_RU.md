# R5 — FSA Accreditation Suspension Remediation Leads RU

Дата: 2026-09-17

Статус: `KILL__EXACT_PUBLIC_REGISTRY_NORMALIZATION_AND_CHANGE_FEED_ALREADY_EXISTS__CERTSTATUS`

## Коротко

Проверялась идея:

`свежее публичное приостановление аккредитации в РАЛ Росаккредитации`
→ `лаборатория / орган / RA.RU номер / дата / статус`
→ `remediation urgency`
→ `лид консультанту по устранению несоответствий / подтверждению компетентности / восстановлению аккредитации`.

Идея имеет реальную боль и высокий service-ticket, но продуктовый data-layer уже построен прямым публичным incumbent.

## 1. Problem / urgency — PASS

Current 2026 accreditation schemes confirm that suspension is a real mandatory-remediation event.

For medical and testing laboratories, Rosakkreditatsiya can suspend accreditation after identified nonconformities. Depending on the procedure, the accredited/applicant entity receives a bounded period to correct the nonconformities. During suspension the accredited entity may not issue documents in the suspended scope until accreditation is resumed or terminated.

Current sources:

- https://base.garant.ru/414437433/
- https://base.garant.ru/414687130/
- https://www.garant.ru/products/ipo/prime/doc/414337433/

This makes the event commercially meaningful for accreditation/remediation consultants.

## 2. Service economics — PASS

Public Russian consulting offers show meaningful tickets for laboratory accreditation / remediation support, ranging from smaller remediation work to several hundred thousand and >1m RUB for broader accreditation projects.

Therefore buyer economics were not the kill reason.

## 3. Owner accessibility — likely PASS, but direct FSA UI automation is operationally awkward

The Register of Accredited Persons (RAL) is legally/publicly described as open and searchable. Current organizations continue linking to public `pub.fsa.gov.ru/ral/view/...` pages.

Current court decisions also describe the register as open and publicly searchable.

However, current automated Opera/web access to `pub.fsa.gov.ru/ral` was slow/unreliable in this research environment.

This does not kill the idea by itself, because a third-party mirror proves the dataset is in fact collectable.

## 4. Exact incumbent — FAIL

`CertStatus.pro` already provides the product primitives that would have been our core data moat.

Observed current public capabilities in September 2026:

- nationwide catalogue of `30,841` accredited organizations;
- status filters including `Действует`, `Приостановлен`, `Частично приостановлен`, `Прекращен`, etc.;
- for testing laboratories alone: `22,228` records, with `282` currently `Приостановлен` and `81` `Частично приостановлен` (363 total suspended/partially suspended on the current page);
- per-entity accreditation history with dated suspension / resumption / scope-reduction decisions;
- weekly synchronization against the Rosakkreditatsiya register;
- a current `Что изменилось в реестре` change feed exposing transitions such as `Действует -> Приостановлен`;
- geography/type filtering.

Sources:

- https://certstatus.pro/
- https://certstatus.pro/type/il/
- example history: https://certstatus.pro/organy/ra-ru-21pk60/

Current example from the change feed:

- FGBU research laboratory status changed `Действует -> Приостановлен` in the reconciliation observed 06.09.2026.

Another current 2026 history example:

- ИЛ ООО «Уральский Центр Техносферной ...» — suspension 05.05.2026, later scope changes and resumption 11.06.2026.

Source:

- https://certstatus.pro/organy/ra-ru-21uts01/

## 5. Why `add remediation lead routing` is not enough

A possible differentiation would be:

`CertStatus-like status event -> company enrichment -> consultant outreach`.

But that is not a durable product moat.

The difficult reusable layer is already owned publicly by an incumbent:

`collect RAL -> normalize statuses -> preserve dated history -> detect changes -> expose suspended organizations`.

A remediation consultant, CRM vendor, or CertStatus itself can add contact enrichment / alerts / lead export much more cheaply than a new entrant can rebuild and defend the same data layer.

Therefore this candidate fails the project anti-incumbent / moat test even though the problem, public data, urgency and service ticket are real.

## Final decision

`PROBLEM = PASS`

`OWNER_ACCESS = PASS / technically collectable`

`HIGH_TICKET_REMEDIATION = PASS`

`CURRENT_FAILURE_SIGNAL = PASS`

`EXACT_INCUMBENT_DATA_LAYER = FAIL`

`DEFENSIBLE_MOAT = FAIL`

Final:

`KILL__EXACT_PUBLIC_REGISTRY_NORMALIZATION_AND_CHANGE_FEED_ALREADY_EXISTS__CERTSTATUS`

Do not reopen merely because CertStatus does not publicly market itself as a lead-generation service. The core event/history/filter layer is already built; lead routing is an easily absorbed downstream use case.
