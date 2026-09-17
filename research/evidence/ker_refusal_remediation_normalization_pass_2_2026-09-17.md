# KER Refusal Remediation — Normalization Pass 2

Дата: 2026-09-17

Связанные файлы:

- `research/candidates/R4_KER_REFUSAL_REMEDIATION_LEADS_RU.md`
- `research/evidence/ker_refusal_remediation_corpus_seed_2026-09-16.md`
- `research/evidence/ker_refusal_remediation_normalization_pass_1_2026-09-16.md`

Статус:

`NORMALIZATION_PASS_2__2026_STEADY_STATE_SIGNAL_STILL_PRESENT__POST_REFORM_PUBLIC_EVENT_LAYER_SURVIVES__CENTRAL_CURRENT_STATUS_AUTOMATION_OPEN__BUYER_TEST_NEXT`

## 1. Цель pass 2

Проверить три риска после первого normalization pass:

1. не является ли 2026 refusal flow хвостом дедлайновой волны 2024;
2. пережил ли публичный отказный event layer реформу КЭР с 01.03.2026;
3. не появился ли exact incumbent, уже продающий `fresh KER refusal -> remediation lead`.

Отдельно уточнить current-status crosscheck после миграции реестра.

---

## 2. 2026 refusal flow — bounded lower bound, PASS as existence, NOT TAM

Повторный current-web audit 2026-09-17 подтвердил, что отказные события продолжают публиковаться на нескольких независимых территориальных поверхностях.

Ниже только минимально подтвержденные события; это НЕ полный национальный подсчет.

### Samara / Ulyanovsk

Current official page has a dedicated `Отказы в выдаче КЭР 2026 год` section with at least 5 named refusals:

- ООО «СЭТ»;
- ООО «СИЛИКАТ», object `73-0173-000280-П`;
- ООО «ЭКОВОЛГА», object `73-0173-001169-П`;
- ООО «Экопром», object `18-0173-000774-П`;
- ООО «КРОНА», object `73-0173-000507-П`.

Source:

`https://rpn.gov.ru/regions/63/gov-services/complex-eco-approval/`

### Komi / Nenets AO

Current official page has a structured `Отказы в выдаче КЭР в 2026 году` table with at least 4 early-2026 refusals:

- АО «НЭМ ОЙЛ» — 12.01.2026;
- ООО «Тимано-Печорская газовая компания» — 16.01.2026;
- АО «Воркутауголь» — 09.02.2026;
- ЗАО «Тиман-Печора Эксплорэйшн» — 11.02.2026.

Source:

`https://rpn.gov.ru/regions/11/gov-services/complex-eco-approval/`

### South Siberian management

Current page exposes 2026 decisions including multiple refusals, among them:

- object `32-0142-000106-П`, pig-breeding object;
- object `01-0142-001617-П`, ZIF at Murzinskoye site;
- object `32-0142-000147-П`, Taldinskaya / Rechnoi coal-field object, refusal 19.03.2026.

Source:

`https://rpn.gov.ru/regions/42/gov-services/complex-eco-approval/`

### Volga / Tatarstan-Chuvashia-Mari El

Previously normalized current table confirms at least 4 2026 refusals:

- ООО «ТЕТЮШИ ЖИЛСЕРВИС» — 13.01.2026;
- АО «Казанькомпрессормаш» — 15.01.2026;
- АО «СЗ ТУС» — 03.03.2026;
- ООО «ТРАКС ВОСТОК РУС» — 20.03.2026.

Source:

`https://rpn.gov.ru/regions/16/gov-services/complex-eco-approval/`

### Perm / Udmurt

Current 2026 decision table confirms at least:

- ООО «КАМА», object `94-0159-002567-П`, refusal 20.01.2026;
- Завод «БУММАШ», refusal 06.04.2026 (already in seed corpus).

Source:

`https://rpn.gov.ru/regions/59/gov-services/complex-eco-approval/`

### Zabaykal / Buryatia

Current page confirms at least:

- refusal in reconsideration for ООО «КУЛТУМИНСКОЕ», 14.04.2026;
- refusal for object `76-0175-001238-П` «Очистные сооружения (ОС)», 06.05.2026.

Source:

`https://rpn.gov.ru/regions/75/gov-services/complex-eco-approval/`

### Baikal management

Current 2026 page includes at least:

- refusal in issuance for ПАО «Яковлев»;
- refusal in reconsideration for ООО «Байкальская энергетическая компания».

Source:

`https://rpn.gov.ru/regions/38/govservices/complex-eco-approval/`

### Crimea / Krasnodar

Already normalized current 2026 chronology includes at least seven refusal events across companies such as:

- ООО «КРЫМГАЗПРОМ»;
- АО «Дружба народов Нова»;
- ООО «СТРОЙДИЗАЙН»;
- ООО «Универсал»;
- ООО «КРЫМТОПЭНЕРГОСЕРВИС»;
- ООО «НПП ЭКОБИО»;
- plus the earlier 2026 refusal sequence retained in the seed.

Source:

`https://rpn.gov.ru/regions/23/gov-services/complex-eco-approval/`

### Far East

Current official page continues to expose refusal notices, including ООО «Дальэнергоуголь» and other industrial applicants. Exact 2026 date normalization remains incomplete for all rows, so these are not added into the numeric lower-bound count here.

Source:

`https://rpn.gov.ru/regions/25/gov-services/complex-eco-approval/`

### Bounded conclusion

The explicitly enumerated surfaces above already give a lower bound materially above 20 current-2026 refusal / refusal-in-review events across multiple territories.

This proves:

`2026 refusal flow != zero / one-region artifact`.

It does NOT prove national annual steady-state volume, unique-company monthly TAM, or consultant-convertible volume.

Do not extrapolate the 2024 national `1362 formal refusals` into 2026.

---

## 3. Reform continuity after 01.03.2026 — public event layer survives

Official regional pages now state that from 01.03.2026:

- applications are submitted via EPGU / Gosuslugi;
- GISP is no longer used for new applications;
- KER registry handling follows the new 2026 register rules.

Despite that reform, current territorial pages still publish external lifecycle events.

### Direct post-reform acceptance evidence

Zabaykal / Buryatia official page publicly shows:

- `03.03.2026 №293` — application accepted for ООО «Рудное», INN `0326545377`, object `81-0175-001990-П`;
- `04.03.2026 №294` — application accepted for ПАО «ППГХО», INN `7530000048`.

The same page later publishes:

- `14.04.2026 №295` — refusal in KER reconsideration for ООО «КУЛТУМИНСКОЕ`;
- `06.05.2026 №296` — refusal for object `76-0175-001238-П` «Очистные сооружения (ОС)`.

Independent public environmental reports associate object `76-0175-001238-П` with ПАО «ППГХО`.

However, the currently indexed territorial excerpt does not expose enough fields from the №294 attachment to treat `№294 -> №296` as an authoritative same-application pair without opening/normalizing the underlying application attachment.

Therefore the strict conclusion is:

- post-01.03.2026 **application-acceptance events are publicly visible**;
- post-01.03.2026 **refusal events remain publicly visible**;
- exact same-application post-reform lifecycle stitching is `PARTIAL / attachment normalization required`.

This is materially better than assuming the public refusal layer disappeared after reform.

---

## 4. Current KER status crosscheck — legal/public intent PASS, automation NOT PASS

Current official Rosprirodnadzor pages explicitly instruct users to use the public permits/licenses registry at:

`https://knd.gov.ru/licenses-registry`

for the current public permit register.

At the same time, multiple territorial pages still contain stale links to the old GISP KER registry.

Control attempts in the current research environment:

- old GISP public KER URL returned `403 Forbidden` to the automated browser/IP;
- prior KND control had connection timeout / unstable access.

Therefore:

`PUBLIC_REGISTER_LEGALLY_EXISTS = PASS`

but:

`STABLE_AUTOMATED_CURRENT_STATUS_LOOKUP = NOT YET PASS`.

V0 must not promise universal `UNRESOLVED_TODAY` classification.

Safe status model:

- `REFUSAL_CONFIRMED`;
- `REGIONAL_LIFECYCLE_RESOLUTION_FOUND` where a later issuance/reapplication is visible;
- `CURRENT_STATUS_CROSSCHECK_REQUIRED` where the central current register cannot be deterministically queried.

Regional pages remain valuable because some publish both refusal and later issuance history for the same object.

---

## 5. Inspection-pressure signal — real, but not yet a deterministic join

Rosprirodnadzor announced a nationwide control campaign for enterprises without KER:

- additional 348 enterprises;
- total 522 NVOС objects scheduled for controls from February through November 2026.

The same official communication says enterprises without KER face the 100x coefficient risk for applicable environmental-impact fees plus administrative liability.

Current regional news confirms real 2026 inspections under that campaign, e.g. an out-of-plan inspection of AO «Ю.М.Э.К.» in February 2026 because the enterprise had not obtained KER by the statutory deadline.

Sources:

- `https://rpn.gov.ru/press/news/po_porucheniyu_pravitelstva_rosprirodnadzor_proverit_348_predpriyatiy_ne_poluchivshikh_ker/`
- current territorial Rosprirodnadzor news surfaces.

Potential stronger lead ranking:

`KER_REFUSAL + PUBLIC_INSPECTION_SIGNAL`

would be higher urgency than a refusal alone.

But no complete public machine-readable list of all 522 inspection targets was established in this pass.

Do not claim nationwide join coverage yet.

---

## 6. Buyer-ticket evidence strengthened

Current 2026 procurement evidence confirms that KER-related technical/environmental work can be multi-million-ruble services, not only 100k retail consulting packages.

Example:

AO «ОмскВодоканал» procurement `32615932080`:

`Оказание услуг по подготовке материалов для внесения изменений в комплексное экологическое разрешение ...`

initial price:

`3,075,478 RUB`.

Public tender mirrors:

- `https://www.tenderguru.ru/tender/93809131`
- `https://b2b.house/activepurchase/03b9c07c-d799-4a30-9081-c14ef1a8b0fa_81b1cca1/`

This is not evidence that a refusal lead is worth 3.1m RUB. It only establishes a meaningful high-ticket tail for KER professional work.

The direct vendor-switch court case `A21-4582/2025` remains the strongest proof that a failed KER project can lead to a replacement contractor purchase.

---

## 7. Exact-incumbent challenge — no exact feed established

Fresh bounded searches for combinations of:

- KER refusal monitoring;
- KER refusal registry;
- refusal alerts;
- KER leads;
- refusal remediation feed;

again did not establish a public Russian product whose stated core is:

`nationwide fresh KER refusals -> normalized company/object/reason -> lifecycle status -> contact enrichment -> remediation sales lead`.

### ENV

`env.ru` remains the strongest data/analytics-adjacent threat.

Current public site still presents `Статус выдачи КЭР` as a 2024 analytical study/report, not a current operational refusal-lead feed.

This is not proof ENV lacks a private/internal capability.

### Environmental consultancies

EcoStandard, Eco Center and other firms actively sell KER preparation/remediation expertise and publish refusal guidance, but no public refusal-lead subscription/feed was established.

Therefore:

`EXACT_PUBLIC_INCUMBENT_FOUND = NO (bounded)`

`INCUMBENT_ABSORPTION_RISK = HIGH`.

---

## 8. New strategic interpretation

The strongest part of this candidate is no longer simply `we found public refusals`.

The defensible work, if any, is:

`many fragmented territorial sources`
+ `history snapshots`
+ `company/object/application identity resolution`
+ `refusal reason/document extraction`
+ `reapplication/issuance lifecycle stitching`
+ `status confidence`
+ `contact enrichment`
+ optional `inspection-pressure` join
→ `high-confidence remediation timing signal`.

A single stable central API would weaken the moat substantially.

The current fragmented reality still imposes nontrivial normalization cost.

---

## 9. Remaining gates after research-only pass

### K1 — steady-state economic volume

Improved but not closed.

We now have a cross-region 2026 lower-bound well above isolated-event level, but still need actual unique-company/month distribution and duplicate/repeat-object adjustment before TAM.

### K2 — publication coverage/freshness

Partially passed.

Multiple territories continue to publish current 2026 events, but nationwide coverage is heterogeneous.

### K3 — vendor-switch / buyer conversion

Still OPEN and cannot be honestly resolved from web evidence alone.

A real buyer test is required.

### K4 — already-known leads

Still OPEN.

Need ask active KER consultants whether these refusals are new/useful or already tracked manually/through industry networks.

### K5 — incumbent absorption

Still OPEN / high risk.

No exact public feed found, but ENV/EcoStandard/data vendors can potentially add this source.

### K6 — source-only moat

Currently survives provisionally because source fragmentation/history/lifecycle normalization is still real.

Would fail if a stable complete current registry/API exposes all refusal/lifecycle fields trivially.

---

## 10. Current decision

Do NOT promote to GO.

Do NOT kill.

Research-only evidence now supports:

- current 2026 cross-region refusal flow exists;
- post-reform public event publication survives;
- remediation windows are often weeks/months;
- high-ticket KER professional work exists;
- real contractor replacement after failed KER exists;
- no exact public normalized remediation lead feed was established.

The remaining decisive questions are buyer-side, not another large generic web sweep:

1. do 3–5 active KER consultants consider fresh refusal leads actionable?
2. what share do they already know?
3. does a refusal actually create vendor-switch / second-opinion openness?
4. what freshness/geography/reason detail is worth paying for?
5. would they pay per lead/feed?

Current candidate status:

`PROMISING_R4__2026_REFUSAL_FLOW_AND_POST_REFORM_EVENT_LAYER_CONFIRMED__HIGH_TICKET_REMEDIATION__CURRENT_STATUS_AUTOMATION_AND_BUYER_CONVERSION_OPEN`

No external buyer contact without explicit owner authorization.
