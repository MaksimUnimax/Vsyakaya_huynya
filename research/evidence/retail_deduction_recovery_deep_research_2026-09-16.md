# Deep Research — Retail Deduction / Penalty Recovery for Russian Suppliers

Дата: 2026-09-16

Связанный кандидат:

`research/candidates/B1_RETAIL_DEDUCTION_RECOVERY_RU.md`

Статус после deep-research pass:

`SURVIVES_DEEP_PASS__MATERIAL_RUBLE_EXPOSURE_AND_DETERMINISTIC_WEDGE_CONFIRMED__WRITE_PATH_AND_SUPPLIER_WTP_REMAIN_HARD_GATES`

Это **не GO** и не разрешение на implementation.

## 1. Тезис

Российский supplier-side revenue-recovery слой класса SupplyPike / SPS Revenue Recovery для поставщиков федеральных торговых сетей:

`штраф / deduction / недоплата / взаимозачёт`
→ получить штрафной документ и связанный EDI/order trail
→ проверить объективно проверяемую часть основания и расчёта
→ найти proof
→ сформировать objection/dispute package
→ human-confirmed reject / escalation
→ отслеживать исход и фактически возвращённые деньги
→ выявлять root cause, чтобы одинаковые потери не повторялись.

Критическая граница продукта после deep pass остаётся прежней:

- не AI-юрист;
- не обещание автоматически решить любой договорный спор;
- не автономный судебный/претензионный робот;
- только те классы, где вывод можно воспроизвести по договорному правилу, EDI-событиям и документам.

## 2. Global category — demand and economics remain proven

SupplyPike / SPS Revenue Recovery продолжает подтверждать отдельный зрелый software/service class для supplier deductions.

Current public functionality:

- identify deductions/chargebacks/compliance fines;
- validate recovery opportunities;
- automatically gather proof documentation;
- retailer-specific dispute workflows;
- bulk/auto disputing where supported;
- recovered-dollar tracking;
- root-cause analysis and prevention.

SPS публично заявляет более `$2B` recovered for supplier brands. Это vendor-reported evidence: оно доказывает production scale и willingness-to-pay категории, но не даёт права переносить американский recovery rate на Россию.

Sources:

- https://www.supplypike.com/
- https://www.spscommerce.com/products/revenue-recovery/
- https://www.spscommerce.com/deduction-management/

## 3. K1 — material ruble exposure: PARTIAL PASS

Первоначальная карточка доказывала наличие штрафов, но не доказывала, что суммы достаточно велики для отдельного продукта.

Deep pass дал прямые судебные примеры, где деньги материальны.

### X5 / Агроторг — 5.029 млн RUB

Дело `А56-10883/2025`.

ООО «АГРОТОРГ» потребовало взыскать с поставщика штраф `5 029 072,27 RUB`.

Особенно важно для продукта:

- заказы направлялись электронно;
- поставщик должен был сообщить о согласовании/отказе;
- договор содержал fill-rate logic;
- недопоставка штрафовалась как процент стоимости;
- факт направления/получения заказов подтверждался справками EDI-провайдера `СКБ Контур`.

Источник:

- https://sudact.ru/arbitral/doc/tDgascTmfBoK/

Этот кейс доказывает одновременно денежную значимость и пригодность EDI trail как evidence.

### Лента / Мираторг — 132.729 млн RUB начисленных штрафов

Дело `А56-49245/2022`.

В материалах фигурируют:

- `3 850 000 RUB` за несоответствие документов;
- `127 978 969,33 RUB` за несоблюдение уровня исполнения заказов;
- `900 000 RUB` за качество;
- итого `132 728 969,33 RUB`.

По fill-rate части договор использовал конкретную формулу — `10%` стоимости непоставленного товара при нарушении установленного уровня исполнения заказов.

Спор также показывает, что имеют значение:

- корректность уведомлений;
- своевременный протест поставщика;
- подтверждающие документы;
- правильный расчёт;
- процесс зачёта.

Источники:

- https://base.garant.ru/41458874/
- https://sudact.ru/arbitral/doc/cHMtWxg53vrl/

Этот кейс не означает, что типичный supplier теряет 132 млн RUB. Он лишь отвергает тезис, что штрафы федеральных сетей слишком малы, чтобы отдельный workflow имел экономический смысл.

### Магнит / Тандер — 7.157 млн RUB удержания, часть возвращена по суду

Дело `А32-35819/2025`, постановление от 13.05.2026.

Supplier требовал вернуть `7 156 945 RUB`, удержанные покупателем как штраф. Первая инстанция взыскала значительную часть суммы, спор касался в том числе соразмерности договорной ответственности.

Источник:

- https://base.garant.ru/66881321/

Это уже менее пригодный класс для V0, потому что существенная часть результата зависит от правовой оценки/ст. 333 ГК РФ. Он полезен как money signal, но не как автоматический rule candidate.

### Historical recovery signal — 3.479 млн RUB

В деле `А32-5390/2018` стороны закрепили мировое соглашение: сеть уменьшила штраф до `400 000 RUB` и должна была выплатить поставщику `3 478 658 RUB` долга за товар.

Источник:

- https://sudact.ru/arbitral/doc/RdyolRMAiAQh/

Исторический пример подтверждает сам факт recoverable cash, но не является current benchmark.

### K1 conclusion

`PARTIAL PASS`.

Доказано:

- штрафы/удержания бывают от сотен тысяч до десятков/сотен миллионов RUB;
- часть споров приводит к реальному возврату/снижению;
- финансовый результат достаточно конкретен для ROI model.

Не доказано:

- среднее значение penalties на одного supplier;
- частота;
- какая доля objectively invalid;
- какая доля уже оспаривается вручную;
- сколько supplier готов платить SaaS вместо внутреннего сотрудника/юриста.

До GO нужны реальные anonymized samples минимум 20–30 поставщиков.

## 4. K2 — deterministic subset: PASS

Самый сильный результат deep pass — появился ещё более чистый machine-checkable rule family.

### Федеральный закон N 120-ФЗ — новый deterministic wedge

Федеральный закон от 23.05.2025 N 120-ФЗ дополнил статью 9 Закона о торговле частью 12.1.

С 01.09.2025 нельзя включать/исполнять условие об ответственности поставщика продовольственных товаров за непоставку количества, которое превышает количество, **согласованное сторонами**.

С 01.03.2026 противоречащие требованиям условия старых договоров недействительны.

Источники:

- https://www.consultant.ru/document/cons_doc_LAW_505833/
- https://www.consultant.ru/law/hotdocs/89369.html
- https://www.consultant.ru/document/cons_doc_LAW_519660/969a2a2daa58229f540df0a46ffd2f39abfa9e4c/

### ФАС отдельно исключила «молчаливое согласование»

Письмо ФАС России от 14.07.2025 N ТН/65638/25 разъясняет:

- ответственность допустима только если supplier действительно согласовал соответствующее количество;
- согласие предполагает активное волеизъявление;
- молчание/бездействие поставщика не является согласованием количества;
- «обязательный заказ», сформированный сетью без действительного supplier approval, не создаёт законного основания для такого штрафа.

Источник:

- https://www.consultant.ru/document/cons_doc_LAW_510285/

### Почему это технически важно

Для продовольственного supplier появился bounded rule:

`ORDERS quantity`
+
`есть ли positive ORDRSP / иной active agreement / agreed plan`
+
`фактический DESADV / RECADV`
+
`штрафной документ и расчёт`

→ система может проверить, начислена ли liability на quantity, которую supplier вообще не согласовывал.

Это **не требует LLM interpretation**, если contract mapping и event semantics заранее настроены.

### Другие deterministic классы

Уже подтверждены судебными материалами и EDI process:

- согласованный объём vs фактически поставленный;
- response deadline;
- наличие/отсутствие ORDRSP;
- DESADV sent/not sent;
- RECADV accepted quantity;
- delivery timestamp/window;
- арифметика percentage fine по явно заданной формуле;
- наличие/отсутствие обязательного proof document;
- протест/ответ supplier within explicit deadline.

### Что нельзя автоматизировать как окончательный вывод

В `NEEDS_HUMAN_REVIEW` должны уходить:

- качество товара и причины брака;
- force majeure;
- вина перевозчика при сложной allocation;
- добросовестность сторон;
- несоразмерность неустойки / статья 333 ГК РФ;
- спорная трактовка договора;
- устные договорённости;
- причинно-следственные юридические оценки.

### K2 conclusion

`PASS for bounded V0`.

Owner-verifiability здесь сильная: исходные EDI events, timestamps, quantity и formula можно сверить вручную.

## 5. K3 — submission/write path: PARTIAL / OPEN

### X5 / Ediweb — electronic reject definitely exists

Ediweb прямо документирует `SHTRAF_AKT` / `SHTRAF_SCHET` и отдельный workflow reject.

Supplier может:

- открыть штрафной акт;
- нажать `Отклонить`;
- ввести причину;
- отправить;
- в X5 уходит status с причиной отказа.

Для quality-fine workflow `FROV_FINE_ACT` действует аналогичный reject flow.

Sources:

- https://ediweb.com/ru-ru/support/kb/361
- https://ediweb.com/ru-ru/support/kb/406

Это хороший факт: objection не всегда требует суда или письма менеджеру.

### Public REST API exists, but exact fine-reject API is not proven

CorePlat / DropCat публикует REST API:

- `GET /getListDocuments`;
- document retrieval;
- `POST /createDocument`;
- `EDI_CONTRL` and document state operations;
- batch document creation.

Sources:

- https://ediweb.com/files/kb/ru-ru/CorePlat/rest-api-coreplat.pdf
- https://ediweb.com/ru-ru/support/kb/2127
- https://ediweb.com/ru-ru/support/kb/2134

Но bounded audit **не нашёл публично документированного exact method**, который гарантированно воспроизводит UI action:

`reject X5 SHTRAF_AKT/FROV_FINE_ACT + rejection reason`.

Наличие generic `createDocument` / `EDI_CONTRL` недостаточно, чтобы это предполагать.

Следовательно, API write-back остаётся kill gate и требует прямого вопроса Ediweb/Kontur/Saby.

### X5 escalation is still a manual form workflow

Согласительная комиссия X5 требует:

- номера заказов;
- конкретные штрафы;
- объяснение некорректности;
- договор + все приложения/допсоглашения;
- переписку и proof;
- при >5 заказах — отдельный файл.

Источник:

- https://x5.ru/ru/conciliation-commission/

Это сильное evidence для automated evidence-pack generation, но не для autonomous submission.

### Revised V0 submission policy

V0 не должен использовать brittle browser automation как core dependency.

Разумный первый scope:

`detect -> validate -> proof timeline -> draft reason -> human confirmation -> deep link / copy action / supported EDI reject where contractually/API permitted`.

Escalation to X5 commission remains manual until legitimate API/action path is confirmed.

### K3 conclusion

`PARTIAL / OPEN`.

Electronic reject exists. Fully programmable write path is not yet proven.

## 6. K4 — Russian direct competitor / incumbent copy risk: SURVIVES, HIGH RISK

### Exact supplier-side SupplyPike analog still not found in bounded search

No current public product was established with the exact positioning:

`multi-retailer supplier deductions -> validate against retailer-specific rules + EDI proof -> dispute/reject -> track recovered RUB -> root-cause prevention`.

This is a bounded-search conclusion, not an absolute absence claim.

### EDI incumbents are the main threat

#### Ediweb

Already owns:

- X5 fine documents;
- sign/reject UI;
- EDI document API;
- document/status history.

#### Kontur.EDI

Already owns:

- supplier/order EDI trail;
- order-response-shipment-acceptance data;
- reconciliation/discrepancy tooling;
- supply analytics aimed at reducing shortage/late-delivery penalties.

#### Saby

Already offers:

- EDI supplier workflow;
- automated order/document checks;
- reconciliation;
- API integrations;
- positioning around reducing errors and penalty risk.

These players have data access, customer trust and distribution.

### Why candidate still survives

Their public positioning remains primarily:

`transport / EDI / reconciliation / prevention / document workflow`.

The proposed layer optimizes a different KPI:

`penalty money detected -> invalid amount identified -> proof assembled -> objection managed -> recovered cash measured`.

The strongest structural wedge is **neutrality across both dimensions**:

- multiple retailers;
- multiple EDI providers.

A supplier may simultaneously work with X5, Magnit, Lenta, Metro, VkusVill, Lemana PRO etc., while using different EDI/accounting paths.

An independent layer can accumulate:

- retailer rule versions;
- EDI event mappings;
- evidence recipes;
- dispute outcome history;
- recovery statistics by rule/retailer;
- root-cause patterns across networks.

### But this is not a secure moat yet

If Kontur/Ediweb/Saby already provide a private/unindexed recovery module, or decide to build it and can cover most customer relationships, standalone economics weaken sharply.

Required direct incumbent calls/questions before GO:

1. Do they automatically detect potentially invalid fines?
2. Do they map a fine back to ORDERS/ORDRSP/DESADV/RECADV?
3. Do they calculate validity by retailer contract rule?
4. Do they create objection packages/reasons?
5. Can they submit reject/status programmatically?
6. Do they track recovered cash?
7. Are they cross-retailer but naturally only inside their own EDI data path?

### K4 conclusion

`SURVIVES bounded audit; HIGH incumbent-copy risk`.

## 7. K5 — WTP / buying motion: OPEN

### Service-market evidence exists

There are legal/consulting services explicitly selling disputes against retail-chain fines.

One public case states that after a dispute with a federal retailer the supplier received `3 478 658 RUB`, while the fine used for set-off was reduced to `400 000 RUB`.

Public case:

- https://zanaszakon.ru/spor-postavshchika-s-torgovoy-setyu/

Underlying court settlement:

- https://sudact.ru/arbitral/doc/RdyolRMAiAQh/

This proves somebody will spend money/time to recover enough cash in sufficiently large cases.

It does **not** prove SaaS WTP or ideal pricing.

### Potential buyer roles

Likely owners of pain:

- finance / accounts receivable;
- key account / network-sales team;
- EDI/operator specialist;
- commercial department;
- legal team;
- supply-chain operations.

A multi-role process can make sales slower unless recovered-cash ownership is clear.

### Best pre-product WTP test

Do not ask `would you buy software?`.

Run a bounded historical audit:

- 3–6 months of one retailer;
- penalty documents;
- ORDERS/ORDRSP/DESADV/RECADV export;
- relevant contract rule;
- no full 1C/database access required.

Measure:

- total penalty RUB;
- mechanically invalid / suspicious RUB;
- already disputed RUB;
- recovered/written-off RUB;
- hours per month spent finding proof;
- missed deadlines;
- penalties ignored because they were individually too small.

Then test commercial options against actual discovered recovery:

- fixed annual platform fee;
- per-retailer fee;
- audit/pilot fee;
- hybrid base + success component.

No pricing conclusion should be made before this evidence.

### K5 conclusion

`OPEN`.

## 8. New timing wedge — regulation changed recently

Law 120-FZ and FAS clarification create a time-bounded market-entry advantage in 2025–2026:

- suppliers must distinguish network-requested quantity from genuinely accepted quantity;
- historical contract logic may no longer be valid from 01.03.2026;
- silent acceptance cannot be treated as supplier consent according to FAS clarification;
- old 1C/EDI reports and penalty processes may not yet encode the new rule correctly.

This is useful for an initial acquisition wedge:

`audit 2026 shortage penalties for 120-FZ / active-consent compliance`.

But this **must not be treated as permanent moat**. EDI providers and networks can adapt.

## 9. Updated V0 after deep pass

### V0-A — historical audit first

No production integration required.

Input:

- one supplier;
- one retailer first (X5 preferred because evidence path is clearest);
- 3–6 months;
- ORDERS;
- ORDRSP;
- DESADV;
- RECADV;
- penalty acts/accounts;
- explicit relevant contract/addendum sections.

Output:

1. every penalty linked to affected orders;
2. timeline of EDI events;
3. explicit configured rule;
4. deterministic result:
   - `LIKELY_VALID`;
   - `OBJECTIVE_INCONSISTENCY`;
   - `120FZ_CONSENT_MISMATCH`;
   - `MISSING_EVIDENCE`;
   - `NEEDS_HUMAN_REVIEW`;
5. calculated disputed amount;
6. proof bundle;
7. draft factual objection reason;
8. human review.

### V0-B — only after historical economics are proven

Add read-only API connector to one EDI provider.

Then:

- detect new penalty automatically;
- deadline alerts;
- proof retrieval;
- one-click/human-confirmed reject where supported;
- recovery status ledger.

Do not build multi-retailer/multi-EDI platform before V0-A proves money.

## 10. Owner gates after deep pass

### OWNER_VERIFIABILITY_GATE — PASS

For deterministic classes, original EDI data and formula provide ground truth.

### GENERAL_AI_SUBSTITUTION_GATE — PASS

Generic LLM can draft text after documents are manually provided. It does not continuously ingest EDI, reconcile events, version retailer rules, enforce deadlines, assemble proof and maintain recovery outcomes.

### DATA_TRUST_GATE — PASS WITH BOUNDS

Commercially sensitive data is required, but a pilot can use bounded exports rather than full ERP access. No consumer PII is required for core V0.

## 11. Current decision

The candidate **survives deep research**.

What became stronger:

- material money is directly evidenced in Russian disputes;
- EDI is accepted as factual evidence;
- X5 fine rejection is already an electronic workflow;
- a new 2025–2026 legal rule creates a highly deterministic first audit class;
- no exact Russian supplier-side cross-retailer revenue-recovery platform was established in bounded search.

What remains unresolved:

- representative recoverable value across 20–30 real suppliers;
- actual SaaS willingness-to-pay;
- exact programmatic write path for fine rejection/escalation;
- hidden/private functionality of Kontur/Ediweb/Saby;
- economics outside X5 and across multiple retailer rulebooks.

Therefore:

`SURVIVES_DEEP_PASS__MATERIAL_RUBLE_EXPOSURE_AND_DETERMINISTIC_WEDGE_CONFIRMED__WRITE_PATH_AND_SUPPLIER_WTP_REMAIN_HARD_GATES`

No implementation authorization.

## 12. Next mandatory kill tests

1. Obtain 10 anonymized historical supplier penalty datasets first; expand to 20–30 only if initial data shows material recovery.
2. Run 120-FZ active-consent audit on every shortage/non-delivery fine in those datasets.
3. Measure objective-invalid RUB, not number of findings.
4. Directly ask Ediweb/Kontur/Saby whether fine reject/status and reason can be written through supported API.
5. Directly ask the same providers whether they already offer invalid-penalty detection/recovery privately.
6. Compare one historical audit against internal employee/manual processing and one legal/consulting process.
7. Test willingness-to-pay on discovered RUB recovery, not abstract feature interest.
8. Only after K1/K3/K4/K5 evidence decide GO/HOLD/KILL.
