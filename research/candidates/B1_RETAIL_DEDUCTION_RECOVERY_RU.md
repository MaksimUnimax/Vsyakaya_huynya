# B1 — Retail Deduction / Penalty Recovery for Russian Suppliers

Дата: 2026-09-16

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__RETAILER_RULES_EDI_ACCESS_AND_WTP_TO_VALIDATE`

## Коротко

Российский revenue-recovery слой класса SupplyPike / SPS Revenue Recovery для поставщиков федеральных торговых сетей:

`штраф / deduction / недоплата / взаимозачёт от сети`
→ автоматически получить документ и связанный EDI/order trail
→ проверить объективную обоснованность по договорному правилу и фактическим событиям
→ найти доказательства
→ собрать dispute package
→ отклонить/подать возражение через доступный канал
→ отслеживать статус и возврат денег
→ выявлять root cause, чтобы штраф не повторялся.

Первый wedge — **не “ИИ-юрист” и не все возможные споры**.

V0 должен работать только с классами, где решение воспроизводимо по данным:

- согласованный объём заказа;
- ORDRSP;
- DESADV;
- RECADV;
- timestamps;
- EDI delivery logs;
- документы поставки/приёмки;
- явно заданная в договоре формула/срок;
- входящий штрафной акт/счёт.

Сложные договорные, качественные и юридические споры остаются человеку.

## Demand proved abroad

Прямой эталон — SupplyPike, в 2025 объединённый в SPS Revenue Recovery.

Продукт работает для Walmart, Amazon, Target, Kroger, Home Depot, CVS, Lowe's, Walgreens и других retailer/distributor workflows.

Публично заявлены:

- автоматическое получение deduction details;
- validity checks;
- автоматический сбор shipping/proof documents;
- bulk/auto disputing;
- retailer-specific workflows;
- root-cause analysis;
- prevention of repeat deductions;
- tracking paid-back amounts;
- flat annual pricing rather than percentage of recovery.

SPS в 2026 заявляет более `$2B` recovered for brands. Vendor-reported numbers доказывают production scale/category maturity, но не считаются независимым benchmark recovery rate.

Источники:

- https://www.supplypike.com/
- https://www.supplypike.com/recover-invalid-deductions
- https://www.spscommerce.com/products/revenue-recovery/
- https://help.supplypike.com/

Категория зрелая и денежная: customer покупает не текст/аналитику, а возврат/предотвращение конкретных удержаний.

## Российская боль существует напрямую

### X5 имеет отдельный формализованный штрафной/спорный workflow

X5 публикует согласительную комиссию для поставщиков.

Для обращения по штрафам требуется:

- номера заказов;
- сами штрафы;
- объяснение некорректности выставления/расчёта;
- договор поставки и допсоглашения;
- переписка;
- подтверждающие документы;
- для большого числа заказов — отдельный файл.

Источник:

- https://x5.ru/ru/conciliation-commission/

Это почти прямое описание manual evidence-assembly problem.

### Штрафы реально передаются электронно

Для X5 на EDI Platform существуют отдельные типы:

- `SHTRAF_AKT`;
- `SHTRAF_SCHET`;
- quality-fine documents;
- mutual-settlement acts;
- free-form penalty acts for specific workflows.

Поставщик может подписать либо отклонить штрафной акт с причиной.

Источники:

- https://ediweb.com/ru-ru/support/kb/361
- https://ediweb.com/ru-ru/support/kb/405
- https://ediweb.com/ru-ru/support/kb/406
- https://ediweb.com/ru-ru/support/kb/1439

Следовательно, штраф не является только письмом/телефонным разговором; значительная часть события уже появляется в machine-readable/structured document contour.

## Deterministic evidence trail уже существует

Товарная EDI-цепочка X5 включает:

`ORDERS -> ORDRSP -> DESADV -> RECADV -> INVOIC / УПД / correction documents`.

Контур прямо описывает, что сервис фиксирует содержание каждого этапа поставки и помогает снижать риск штрафа за недопоставку/несвоевременную поставку.

Источники:

- https://kontur.ru/edi/clients/x5
- https://x5.ru/ru/supplier-services/edi/

В судебных материалах 2026 EDI logs/ORDRSP/DESADV используются как доказательства фактов обмена и сроков; отчёт EDI-провайдера может подтверждать события документооборота.

Пример:

- https://base.garant.ru/66926177/

Это важно для OWNER_VERIFIABILITY: значительная часть V0 может быть построена не на AI-оценке, а на timestamp/document matching.

## Source access технически реален

### X5 работает не с одним EDI-провайдером

Текущий список X5 включает:

- Контур.EDI;
- SABY;
- LERADATA;
- DOCLINK;
- СФЕРА;
- Ediweb.

Источник:

- https://x5.ru/ru/supplier-services/edi/

Это одновременно риск интеграций и potential moat независимого cross-provider layer.

### Контур.EDI

Публично поддерживает:

- API integration;
- FTP/AS2;
- модуль 1С;
- integration license for customer accounting systems.

Актуальный прайс определяет `API-лицензию` как право клиента интегрировать Контур.EDI с любой своей учётной системой.

Источники:

- https://kontur.ru/edi
- https://kontur.ru/edi/work/1c
- https://kontur.ru/Files/userfiles/file/products/edi/price/Price_Kontur_EDI.pdf

### Ediweb / CorePlat

Публикует REST API. Текущая документация содержит методы получения списков EDI-документов с фильтрами по типам/контрагентам/датам/status.

Источники:

- https://ediweb.com/ru-ru/support/kb/612
- https://ediweb.com/files/kb/ru-ru/CorePlat/rest-api-coreplat.pdf

Следовательно, MVP может подключаться не через screen scraping к retailer portal, а через уже оплаченный supplier EDI account / 1С data path.

## Direct Russian competitor sweep

На 2026-09-16 bounded search не обнаружил публичного российского продукта с exact positioning:

`X5/Magnit/Lenta/etc deductions -> determine validity -> gather EDI/proof -> dispute/reject -> track recovered money -> root-cause prevention`.

Найдены adjacent классы.

### EDI providers

Контур/Ediweb/SABY и другие:

- передают заказы/отгрузку/приёмку/штрафные документы;
- сокращают ошибки;
- иногда автоматизируют отдельные network-specific document workflows;
- дают API/1С integration.

Но текущие публичные материалы не показывают SupplyPike-like revenue-recovery product, который сам определяет potentially invalid deductions, собирает proof и ведёт recovery across networks/providers.

### 1С / integrators

Есть кастомные отчёты сверки `заказ -> счёт -> реализация`, чтобы ловить расхождения до штрафа.

Пример текущего публичного кейса:

- https://tenchat.ru/media/5548555-sverka-zakazov-i-otgruzok-cherez-edi-kak-zakryvat-den-za-15-minut

Это доказывает боль и willingness to automate, но не post-deduction recovery platform.

### Consulting/legal services

Есть компании, которые вручную помогают поставщикам входить в сети и оспаривать штрафы.

Пример:

- https://tovarnapolke.ru/services/

Это скорее evidence willingness-to-pay за результат, но service-heavy substitute.

### Marketplace fine automation is NOT the same market

PINDI, Selleru AI, НеОтдам и другие работают с WB/Ozon/PVZ seller disputes. Этот класс уже закрыт отдельно и не является direct competitor traditional retail supplier deductions.

## Market size proxy

Не использовать количество магазинов как TAM.

Relevant buyer = поставщик/производитель/дистрибьютор, который:

- работает с крупной сетью;
- имеет заметный EDI volume;
- регулярно сталкивается с deductions/штрафами/расхождениями;
- имеет достаточно денег в удержаниях, чтобы automation окупалась.

Current hard proxies:

### X5

По итогам 2025 года X5 сообщила о `7,598` поставщиках продукции на полках; 60% — МСП/микро/средние.

- https://www.x5.ru/ru/news/h5-privlekla-15-tysyachi-novyh-postavshhikov-v-2025-godu/

### Magnit

Current business-model page сообщает `>5,000` enterprises-suppliers.

- https://www.magnit.com/ru/about-company/business-model/

Эти множества сильно пересекаются; **их нельзя складывать как TAM**.

Но уже две сети доказывают buyer universe в тысячах компаний. Дополнительно существуют Лента, Metro, Lemana PRO, ВкусВилл, O'Key и другие networks.

Точный reachable TAM/WTP ещё не доказан.

## Почему это потенциально сильнее обычного EDI enhancement

EDI provider оптимизирует transport/document exchange.

Revenue-recovery product оптимизирует другой KPI:

`сколько денег сеть удержала -> сколько удержаний валидно -> сколько можно вернуть -> сколько реально вернули -> какая причина повторяется`.

Cross-provider / cross-retailer product может агрегировать данные поверх разных EDI operators и разных retailer rulebooks.

Это отличается от incumbent feature, если customer работает:

- с несколькими сетями;
- через разных EDI providers;
- с собственной 1С/ERP;
- с разными deduction codes/workflows.

Однако incumbent-copy risk высокий: Контур/Ediweb уже владеют data path и supplier distribution.

## MVP — намеренно узкий

Не строить full legal-claims platform.

### V0: X5 objective deductions only

1. Подключение к одному EDI provider first (например, CorePlat API или customer-side export/API).
2. Import supplier contract parameters manually as structured rules.
3. Ingest:
   - ORDERS;
   - ORDRSP;
   - DESADV;
   - RECADV;
   - incoming penalty acts/accounts;
   - basic shipping/proof docs.
4. Link penalty to affected orders/shipments.
5. Deterministic validity checks for 1–2 classes, e.g. shortage/late-response/delivery timing where contract formula is explicit.
6. Show evidence timeline.
7. Generate recommended action:
   - accept;
   - reject with factual reason;
   - `NEEDS_HUMAN_REVIEW`.
8. Generate evidence pack + draft rejection reason.
9. Human confirmation before sending/rejecting.
10. Track status/paid-back amount manually or by available API.
11. Root-cause dashboard by warehouse/SKU/order/process.

No autonomous legal submission in V0.

## OWNER_VERIFIABILITY_GATE

**PASS for bounded V0.**

Controlled fixture can define:

- order quantity;
- response quantity/time;
- actual shipment;
- actual acceptance;
- contract deadline/formula;
- penalty document.

Expected result is deterministic.

Examples:

- ORDRSP timely + agreed qty 100 + DESADV 100 + RECADV 100, but shortage penalty claims 20 units -> system should flag inconsistency;
- response sent after contractual deadline -> penalty may be objectively valid according to configured rule;
- evidence missing/ambiguous -> system must return `NEEDS_HUMAN_REVIEW`, not invent legal conclusion.

Owner can inspect original EDI events and formula.

## GENERAL_AI_SUBSTITUTION_GATE

**PASS.**

ChatGPT can help write one objection if all documents are manually supplied.

It does not replace:

- continuous monitoring for new deductions;
- deadline tracking;
- EDI ingestion;
- order/shipment/document reconciliation;
- proof retrieval;
- deterministic validity engine;
- submission/status workflow;
- recovered-money ledger;
- retailer-specific rule/version history.

AI may draft explanation text, but is not the product.

## DATA_TRUST_GATE

**Moderate / acceptable for pilot.**

Inputs are commercially sensitive:

- orders;
- shipments;
- contracts;
- prices;
- penalties.

But pilot does not need full accounting database or payroll/personal data.

Preferred trust model:

- read-only connector to EDI/customer 1C;
- encrypted storage;
- customer-controlled document retention;
- option to upload bounded historical sample/export first;
- no end-consumer PII in core V0.

## Main risks / hard kill gates

### K1 — Is recoverable value large enough in Russia?

Western deduction percentages cannot be copied to Russia.

Need 20–30 actual Russian suppliers and measure:

- annual network sales;
- number/value of penalty/deduction documents;
- portion disputed today;
- win/recovery amount;
- staff hours spent;
- write-offs because amount is too small to chase.

KILL if most suppliers have trivial annual deductions or almost all are objectively valid.

### K2 — Retailer-rule complexity / owner-verifiability

For each intended automated rule, prove it from:

- customer contract/addendum;
- retailer published process;
- EDI events;
- clear formula.

KILL broad automation if outcomes repeatedly require lawyers/quality experts/subjective evidence.

The product can still survive with only a narrow deterministic subset if that subset contains enough money.

### K3 — Submission channel / API write path

Reading data is not enough.

Determine for each network:

- can supplier reject/send reason via EDI API;
- must use email;
- must use supplier portal;
- requires manual form/КЭП;
- status/result can be read automatically.

If most disputes require brittle browser automation and manual portal work, unit economics worsen materially.

### K4 — EDI incumbent copy risk

Interview current users of at least 3 EDI providers.

Determine whether provider already has hidden/private deduction automation not indexed publicly.

Also test why customer would buy independent layer instead of waiting for Контур/Ediweb.

Potential structural defence must be:

`cross-retailer + cross-EDI + rule history + recovery outcome data + proof mapping`.

If one incumbent already closes most of this for its clients, KILL/downgrade.

### K5 — WTP versus consultant / internal 1C

Compare three alternatives:

1. internal employee/manual process;
2. 1C custom report + manual objection;
3. consultant/lawyer success-fee.

Product must win on measurable recovered cash + labor savings.

## Preliminary assessment

`7.8/10 research candidate` — **not GO**.

Strengths:

- mature western category with clear revenue-recovery economics;
- direct Russian pain and documented dispute workflow;
- machine-readable EDI source path exists;
- buyer universe in thousands rather than dozens;
- objective bounded V0 possible;
- outcome measurable in RUB recovered/avoided;
- generic AI does not replace runtime;
- no expensive third-party data API required;
- no direct Russian SupplyPike-like product found in bounded current search.

Weaknesses:

- retailer rules and contracts vary;
- some disputes become legal/subjective;
- submission channels may be partly manual;
- strong EDI providers already own source data/distribution and could copy features;
- exact Russian deduction volume and WTP are not yet measured;
- multi-retailer expansion requires substantial rule maintenance.

## Current conclusion

This candidate survives the initial and first deep kill tests and is currently strong enough to sit beside / potentially above the Restaurant POS API survivor.

But no implementation should start before K1–K4.

Current status remains:

`PROMISING__DEEP_RESEARCH_REQUIRED__RETAILER_RULES_EDI_ACCESS_AND_WTP_TO_VALIDATE`
