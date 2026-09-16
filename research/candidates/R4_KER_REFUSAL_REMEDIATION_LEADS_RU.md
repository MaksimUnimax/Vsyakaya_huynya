# R4 — KER Refusal Remediation Leads RU

Дата: 2026-09-16

Статус: `PROMISING_R4__PUBLIC_FAILED_MANDATORY_KER_EVENTS__HIGH_TICKET_REMEDIATION_LEADS__STEADY_STATE_VOLUME_AND_CONVERSION_OPEN`

## Коротко

Информационный B2B-продукт для экологических консультантов и проектных организаций:

`публичный отказ Росприроднадзора в предоставлении КЭР`
→ `компания / ИНН / объект НВОС / код объекта / дата решения / основание отказа`
→ enrichment компании и контактов
→ нормализованный urgent remediation lead
→ экологический консультант предлагает повторную подготовку / исправление материалов / second opinion / сопровождение повторной подачи.

Это не прогноз потребности и не generic список объектов I категории. Сигнал появляется после того, как предприятие уже:

- обязано получить КЭР;
- инициировало процедуру;
- потратило время/деньги на заявку;
- получило официальный отрицательный результат;
- продолжает иметь нерешенную обязательную проблему.

## 1. Почему это соответствует canonical Strategy B / R-series

Тип сигнала:

`FAILED_MANDATORY_EVENT` / `REMEDIATION_INTENT`.

В отличие от обычного expiry lead:

- обязанность уже наступила;
- компания уже пыталась ее выполнить;
- failure подтвержден государственным органом;
- проблема не является предположением;
- timing — сразу после официального отказа;
- покупатель лида — экологический консультант / проектная организация, продающая подготовку и получение КЭР.

## 2. OWNER_ACCESSIBILITY_GATE — PASS

Core lead не требует:

- кабинета предприятия;
- ERP/1C;
- договора предприятия с действующим экологическим подрядчиком;
- внутренней переписки;
- банковских данных;
- частного API.

Территориальные органы Росприроднадзора публично размещают решения и уведомления по КЭР.

В разных управлениях наружу доступны комбинации полей:

- наименование заявителя;
- ИНН;
- наименование объекта НВОС;
- код объекта НВОС;
- результат — выдача/отказ;
- дата и номер решения;
- нормативное основание отказа;
- иногда полный PDF/DOCX уведомления;
- в отдельных регионах — публичная заявка и последующая история результата.

Источники:

- https://rpn.gov.ru/regions/16/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/23/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/42/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/51/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/59/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/63/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/64/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/75/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/34/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/36/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/38/govservices/complex-eco-approval/

Публичность неоднородна по форматам и полноте, но сам отказный event layer доказан как внешний и текущий.

## 3. CURRENT 2026 SIGNAL — PASS

Fresh public examples in 2026 include, among others:

### Volga / Tatarstan-Chuvash-Mari El management

Public table contains:

- ООО «ТЕТЮШИ ЖИЛСЕРВИС» — Полигон ТБО г. Тетюши — отказ 13.01.2026;
- АО «Казанькомпрессормаш» — объект `92-0116-001359-П` — отказ 15.01.2026;
- АО «СЗ ТУС» — Завод строительной керамики — отказ 03.03.2026;
- ООО «ТРАКС ВОСТОК РУС» — Производство каркасов кабин — отказ 20.03.2026.

Source:

https://rpn.gov.ru/regions/16/gov-services/complex-eco-approval/

### South Siberian management

Current page shows 2026 notices including:

- refusal 19.03.2026 for object `32-0142-000147-П`, coal field / underground mining object;
- earlier public refusals for mining/industrial objects, including ПАО «Кокс» and other industrial sites.

Source:

https://rpn.gov.ru/regions/42/gov-services/complex-eco-approval/

### Crimea / Krasnodar management

Current public chronology includes 2026 refusal PDFs, for example:

- ООО «КРЫМГАЗПРОМ»;
- АО «Дружба народов Нова»;
- ООО «СТРОЙДИЗАЙН»;
- ООО «Универсал»;
- ООО «КРЫМТОПЭНЕРГОСЕРВИС»;
- ООО «НПП ЭКОБИО».

Page also publicly exposes applications and later permit records, allowing lifecycle matching.

Source:

https://rpn.gov.ru/regions/23/gov-services/complex-eco-approval/

### Perm management

Current 2026 decision table includes refusals such as ООО «КАМА» plus other objects.

Source:

https://rpn.gov.ru/regions/59/gov-services/complex-eco-approval/

### Zabaykal / Buryatia management

Public 2026 notice example:

- 06.05.2026 refusal on object `76-0175-001238-П`, `Очистные сооружения (ОС)`.

Source:

https://rpn.gov.ru/regions/75/gov-services/complex-eco-approval/

### Lower Volga management

Publishes frequently updated XLSX registers named like:

`Реестр решений о выдаче, отказе КЭР на <date>`.

Examples exist through February 2026.

Source:

https://rpn.gov.ru/regions/34/gov-services/complex-eco-approval/

### Central Black Earth management

Publishes separate XLSX:

`Перечень_заявок_с_отказом_в_выдаче_и_пересмотре_комплексных_экологических_разрешений_до_01.03.2026.xlsx`

Source:

https://rpn.gov.ru/regions/36/gov-services/complex-eco-approval/

### Baikal management

Public 2026 refusal documents include:

- `уведомление об отказе в выдаче КЭР ПАО Яковлев.docx`;
- refusal in review of KER for ООО «Байкальская энергетическая компания».

Source:

https://rpn.gov.ru/regions/38/govservices/complex-eco-approval/

## 4. National problem volume — PASS historically, steady-state OPEN

Official Rosprirodnadzor 2024 activity report:

- 7,040 applications for KER;
- 2,245 KER issued / fully revised;
- 1,362 formal refusal notifications after application review;
- 2,523 applications refused at intake;
- 349 withdrawn.

Official report source:

https://base.garant.ru/412304112/

Important bound:

2024 was a deadline-heavy year. Do NOT extrapolate `1,362 refusals/year` into steady-state TAM.

2026 current regional evidence proves that refusals continue after the large initial deadline wave, but national steady-state annual volume remains an OPEN gate.

## 5. What public refusal reason means

Under Art. 31.1(9.1) Federal Law No. 7-FZ, refusal grounds include:

1. absence of required information/documents or non-compliance of submitted information/documents with established requirements;
2. failure to meet the deadline for eliminating comments on the application.

Public regional tables often expose at least `subparagraph 1` vs `subparagraph 2`.

That is enough for first-level routing:

- `PP1_DOCUMENT_OR_CONTENT_NONCOMPLIANCE`;
- `PP2_MISSED_REMEDIATION_DEADLINE`.

It is NOT enough for a detailed engineering/legal diagnosis.

Where the public refusal PDF/DOCX is available, V0 may parse and summarize the specific defects, but only evidence actually present in the document may be shown.

Do not invent a root cause from the statutory subparagraph alone.

## 6. Evidence that detailed defects can be material

Court cases show that KER refusals may contain detailed technical/document defects.

Example A63-15805/2023:

- refusal reason included non-compliance of the KER application;
- specific defect: planned temporary permissible discharges did not contain required volume/mass information for the period after implementation of the environmental-efficiency program;
- dispute also concerned timing/quality of prior comments.

Source:

https://sudact.ru/arbitral/doc/nlEaR3WuU7LT/

This proves that the underlying remediation problem can be concrete and technical, not merely a generic `rejected` status.

## 7. Vendor-switch / second-opinion market — PASS EXISTS, frequency OPEN

Critical question: does refusal ever open the supplier selection again?

Yes.

2026 appellate case `A21-4582/2025`:

- ООО «ЛУКОЙЛ-КМН» hired ООО «РуНедра» to prepare KER application materials for 13 I-category NВОС objects;
- Rosprirodnadzor issued multiple refusals and identified numerous errors in the package;
- court found prepared documentation unsuitable for obtaining KER and lacking consumer value;
- customer terminated the relationship;
- on 20.02.2025 customer entered a new, substantially similar contract with a different contractor — ООО «Волгограднефтепроект».

Source:

https://base.garant.ru/66857004/

This directly proves:

`KER refusal -> failed prior contractor -> new contractor purchase`

can occur in the real market.

But do not assume every refusal means vendor switch. Many companies rework the application with the existing consultant/internal team.

## 8. Public lifecycle examples — remediation window exists

Public regional histories show repeated sequences:

### АО «Сегежский ЦБК»

- refusal 12.11.2024;
- KER issued 10.02.2025.

### ООО «КОСВВ»

- refusal 21.04.2025;
- new application 09.06.2025;
- KER issued 15.07.2025.

### ООО «РК-Гранд»

- refusal 20.12.2024;
- refusal again 20.03.2025;
- later new applications / process;
- KER issued 16.03.2026.

Source:

https://rpn.gov.ru/regions/51/gov-services/complex-eco-approval/

Therefore the unresolved period after refusal can range from weeks to many months.

## 9. Urgency / economic pain — PASS

For I-category NВОС objects, absence of valid KER can have severe financial consequences.

Current 2026 court practice confirms that absence of KER / permit basis can lead to application of a coefficient of 100 when calculating relevant negative-environmental-impact charges in applicable cases.

Examples:

- https://base.garant.ru/66960650/
- https://base.garant.ru/66959675/
- https://base.garant.ru/66851868/

Rosprirodnadzor also announced a 2026 inspection campaign covering hundreds of enterprises that had not obtained KER on time.

Source:

https://rpn.gov.ru/press/news/po_porucheniyu_pravitelstva_rosprirodnadzor_proverit_348_predpriyatiy_ne_poluchivshikh_ker/

Do not calculate each prospect's actual monetary exposure from this alone; NВОС payment depends on the object and emissions/discharges/waste data.

The point is urgency, not a guaranteed penalty amount.

## 10. Buyer economics — PASS at service-ticket level

Russian environmental consultants publicly quote KER preparation/support in ranges such as:

- from ~80k–130k RUB for simpler scopes;
- ~100k+ typical entry price;
- ~300k–800k RUB for medium/large industrial objects;
- some offers ~450k–500k+ and higher.

Market examples:

- https://acteco.ru/services/kjer/
- https://ecolife.group/services/ker/
- https://vash-ecolog.ru/services/kompleksnoe-ekologicheskoe-razreshenie/

Exact quoted pricing varies heavily with object complexity.

For lead economics, this is sufficient to establish that one converted refusal lead can be worth materially more than generic SMB contact data.

## 11. Competition audit — no exact feed established yet

Current adjacent players found:

### ENV / environmental analytics

`env.ru` publishes KER status analytics and historically counted issued permits/refusals.

Source:

- https://env.ru/
- https://env.ru/keranalitycs/

Threat:

They already know the data and domain.

Difference currently observed:

Their public product is research/sector analytics, not an operational nationwide sales feed:

`fresh refusal -> company -> object -> reason/doc -> enrichment -> remediation lead`.

This remains an incumbent-absorption risk.

### EcoStandard / EcoStandard Journal

Strong environmental consulting/content player with KER expertise. No exact public refusal-lead feed established in bounded search.

### Eco-manager / ecology software / consultant platforms

Tools exist for companies to manage compliance, reporting and KER work. No exact product found selling new KER refusals as normalized commercial leads to consulting providers.

### Generic B2B data providers

They can enrich INN/company/contact data but do not currently appear to own the fragmented Rosprirodnadzor refusal-source pipeline.

Absence claim is bounded, not absolute.

## 12. Why source fragmentation is potentially valuable

Unlike a single structured license registry, KER refusal information is fragmented across territorial Rosprirodnadzor surfaces:

- HTML tables;
- XLS/XLSX registers;
- DOC/DOCX lists;
- individual PDF notices;
- long attachment catalogs;
- different historical/current layouts.

A useful product needs:

1. territorial-source map;
2. polling and change detection;
3. document extraction;
4. deduplication by company/object/application;
5. lifecycle stitching (`application -> refusal -> reapplication -> issue`);
6. reason normalization;
7. company/contact enrichment;
8. freshness tracking.

This is still copyable, but materially less trivial than `one API -> one filter`.

## 13. V0 output — strict evidence-only

Example lead:

```yaml
company: ООО "Example"
inn: 1234567890
nvos_object_code: 00-0000-000000-P
nvos_object_name: Industrial site
territorial_authority: ...
application_date: 2026-04-01
refusal_date: 2026-05-05
refusal_decision_no: ...
refusal_class: PP1_DOCUMENT_OR_CONTENT_NONCOMPLIANCE
refusal_document_url: ...
detailed_issue_summary: null  # unless public refusal document supports it
status_after_refusal: NO_PUBLIC_KER_FOUND_YET
lead_age_days: 3
source_urls:
  - ...
```

Never claim:

- `current consultant failed` unless evidence supports it;
- `company is looking for a new consultant`;
- `exact reason is X` when only statutory code is public;
- `they will pay Y`;
- `KER cannot be obtained internally`.

Allowed commercial framing:

`Official KER refusal published on <date>; mandatory process remains unresolved in public records; potential remediation/second-opinion opportunity.`

## 14. Next mandatory pre-pilot — no product build

### Phase A — source/precision corpus

Collect at least 50 recent refusal events from at least 8 territorial Rosprirodnadzor administrations.

For each:

- source authority;
- publication timestamp if available;
- company;
- INN;
- object code/name;
- refusal decision/date;
- statutory ground;
- refusal document availability;
- later reapplication/issuance status;
- lead age;
- public contact-enrichment availability.

Measure:

- unique companies vs duplicate objects/applications;
- share of refusals with INN;
- share with object code;
- share with actual refusal document;
- publication delay;
- share already resolved within 7/30/60 days;
- share still unresolved at observation date.

### Phase B — buyer test

Only after Phase A quality passes.

Show 15–20 fresh normalized leads to 3–5 environmental consulting firms.

Ask:

- which leads are genuinely actionable;
- which they already knew;
- whether they can identify whether another consultant is incumbent;
- preferred geography/sectors;
- acceptable freshness;
- willingness to pay per qualified lead / monthly feed;
- whether refusal reason/document changes value.

Do not contact anyone without explicit owner authorization.

## 15. Hard kill gates

### K1 — steady-state volume

KILL/HOLD if current 2026+ flow drops so much after the historical KER deadline wave that fewer than an economically useful number of fresh unique refusal companies appear per month.

### K2 — publication coverage/freshness

KILL/HOLD if refusal publication is inconsistent across most territories, delayed by months, or disappears after the 2026 process reform.

### K3 — vendor-switch conversion

KILL if environmental consultants report that companies almost always stay with the same incumbent and unsolicited second-opinion/remediation offers almost never convert.

### K4 — already-known leads

KILL if active KER consultants already monitor these refusal pages manually or through internal industry networks and the feed provides no new timing advantage.

### K5 — incumbent absorption

KILL if ENV/EcoStandard/another established environmental data/provider product already offers or launches the exact normalized nationwide refusal lead feed.

### K6 — source-only moat

KILL if pipeline reduces to a stable single registry/API that any data provider can add as one trivial filter without differentiated history/lifecycle/reason normalization.

## Current decision

The candidate currently passes:

- `SOURCE_EXISTS`;
- `OWNER_ACCESSIBILITY`;
- `CURRENT_2026_SIGNAL_EXISTS`;
- `MANDATORY_UNRESOLVED_NEED`;
- `HIGH_TICKET_BUYER_ECONOMICS`;
- `VENDOR_SWITCH_EXISTS_IN_REAL_CASES`;
- `NO_EXACT_PUBLIC_INCUMBENT_ESTABLISHED_IN_BOUNDED_SEARCH`.

It has not passed:

- steady-state national refusal volume;
- full territorial coverage;
- real consultant WTP;
- real vendor-switch rate;
- anti-incumbent moat over time.

Therefore:

`PROMISING_R4__PUBLIC_FAILED_MANDATORY_KER_EVENTS__HIGH_TICKET_REMEDIATION_LEADS__STEADY_STATE_VOLUME_AND_CONVERSION_OPEN`

Do not build a SaaS. Next work is a bounded 50-event source/precision corpus and then an owner-authorized buyer test.