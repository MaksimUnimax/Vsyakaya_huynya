# B1 — Private Partner Account Mapping for Russian B2B

Дата: 2026-09-15

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__TRUST_AND_INCUMBENT_RISK`

## Коротко

Российский слой класса Crossbeam:

`Компания A: клиенты / prospects / opportunities`
+
`Компания B: клиенты / prospects / opportunities`
→ `privacy-preserving matching`
→ показать только разрешённые пересечения
→ `warm intro / co-sell / joint case / integration opportunity`
→ измерить partner-influenced pipeline/revenue.

Ключевая ценность не в VLOOKUP. Компании **не хотят раскрывать партнёру всю клиентскую и prospect-базу**. Продукт должен позволять узнать полезное пересечение без обмена полными списками.

## Demand proved abroad

### Crossbeam

- https://www.crossbeam.com/lp/account-mapping-software
- https://www.crossbeam.com/pricing

По текущим публичным данным Crossbeam:

- заявляет 30,000+ компаний в сети;
- автоматизирует account mapping между CRM партнёров;
- позиционирует secure/no-raw-data sharing как ключевую ценность;
- имеет бесплатный слой и платный Connector от `$4,800/year`;
- дополнительные full-access seats — `$1,800/user/year`;
- Supernode/Enterprise продаются по custom pricing.

После слияния с Reveal категория ещё сильнее консолидировалась вокруг Crossbeam.

### Результаты у клиентов

Публичные кейсы Crossbeam показывают, что account mapping используется не как «аналитический отчёт», а как revenue workflow:

- Gorgias: рост partner-influenced revenue и высокий вклад партнёров в общую выручку;
- Yotpo: 2x partner-sourced ACV;
- LeanData: резкий рост partner-influenced / partner-sourced revenue;
- Friendbuy: 35% opportunities partner-influenced or sourced;
- другие кейсы связывают overlaps с warm intros, deal acceleration, retention и joint case studies.

Источники:

- https://www.crossbeam.com/case-study/how-to-increase-your-tech-partner-programs-revenue-by-30-and-be-a-joy-to-work-with
- https://www.crossbeam.com/case-study/how-yotpo-doubled-their-partner-revenue-using-crossbeam-slack-and-an-elg-motion
- https://www.crossbeam.com/case-study/how-leandata-makes-it-easy-for-reps-to-close-partner-sourced-revenue
- https://www.crossbeam.com/case-study/how-friendbuy-cultivated-a-culture-of-partnerships-in-18-months

Vendor case studies нельзя считать независимым доказательством величины эффекта, но они подтверждают конкретные production workflows и willingness to pay.

## Почему Excel/VLOOKUP не заменяет продукт

Ручной способ требует, чтобы два партнёра:

1. выгрузили customer/prospect lists;
2. обменялись ими или передали третьей стороне;
3. подписали NDA;
4. нормализовали компании;
5. сделали VLOOKUP / matching;
6. повторяли это при каждом обновлении CRM.

Crossbeam-кейсы прямо описывают такой pre-product workflow как трудозатратный и неудобный.

Сильный продукт решает не вычисление пересечения, а **безопасность, постоянную синхронизацию, permissions и downstream co-sell workflow**.

## Российский рынок — что найдено

В РФ зрелый соседний рынок PRM уже существует. Найдены, среди прочих:

- PRM Online — https://prmonline.ru/
- PRM SaaS — https://prmsaas.ru/
- PARTNETIX — https://partnetix.ru/
- RevRoute — https://revroute.ru/

Каталог platforms.su в 2026 показывает 18 российских PRM-продуктов.

Эти продукты умеют различные комбинации:

- партнёры и кабинеты;
- лиды / deal registration;
- комиссии и выплаты;
- совместные сделки;
- CRM/API;
- обучение/материалы;
- реферальные и агентские программы.

Но в bounded competitor sweep на 2026-09-15 **не найдено прямого публично заявленного workflow**:

`две независимые компании подключают каждая свою CRM / список -> ни одна не раскрывает второй полный список -> система показывает только account overlaps -> warm-intro/co-sell action`.

Это не доказательство отсутствия скрытой функции. Особенно опасны PARTNETIX/PRM Online/RevRoute как adjacent incumbents.

## Российский localization wedge

### ИНН как сильный B2B entity key

В российском B2B у юридических лиц часто есть стабильный ИНН в CRM/ERP/договорах. Это позволяет точнее сопоставлять компании, чем только по fuzzy company name/domain.

Базовая модель overlap может использовать:

`ИНН + domain + normalized legal name`.

Для ИП/физлиц privacy/legal model нужно исследовать отдельно; на первом MVP можно ограничиться юрлицами.

### Локальные CRM

Потенциальные интеграции:

- Bitrix24;
- amoCRM;
- BPMSoft;
- 1С / 1С:CRM;
- Planfix;
- CSV/XLSX как initial wedge.

### Локальный co-sell workflow

Сделку можно связать с:

- запросом тёплого интро;
- deal registration;
- совместным КП;
- joint integration/case-study candidate;
- партнёрским влиянием на выручку.

## Privacy / trust — центральный продукт, а не checkbox

Customer/prospect list — коммерчески чувствительные данные. Если MVP требует «просто загрузите нам всю CRM, поверьте на слово», кандидат проваливает DATA_TRUST_GATE.

Нужен отдельный privacy-preserving design.

Желаемая гарантия:

- партнёр A не видит non-overlap records партнёра B;
- партнёр B не видит non-overlap records A;
- permissions определяют, какие population/fields раскрываются даже на overlap;
- raw lists не используются для unrelated enrichment/ads;
- audit log показывает, кто что открыл/экспортировал;
- для high-trust customers — local/self-hosted/private matching option.

Технически надо исследовать Private Set Intersection / OPRF или другой проверенный cryptographic protocol, а не изобретать собственную криптографию.

## MVP

Не строить PRM целиком.

### V0 — pair mapping

1. Компания A создаёт room и приглашает B.
2. Обе стороны загружают CSV: `ИНН/domain + population(customer/prospect/open opportunity)`.
3. Система считает разрешённые overlaps.
4. Каждая сторона видит только то, что разрешено sharing policy.
5. Можно отметить overlap как `request intro` / `joint opportunity`.
6. Есть audit/history и повторный sync.

### V1 — Russian CRM sync

- Bitrix24;
- amoCRM;
- webhooks/periodic sync;
- dynamic overlap changes.

### V2 — network effect

- один аккаунт может мапиться со многими партнёрами;
- score partners by overlap/revenue potential;
- invite loop;
- warm intro workflow;
- attribution.

## Distribution

Лучший initial ICP не «все бизнесы».

Проверять:

- SaaS/ИТ-вендоры с интеграторами;
- CRM/телефония/облачные сервисы;
- системные интеграторы;
- агентства + SaaS vendors;
- B2B fintech/HR-tech/MarTech ecosystems;
- дистрибьюторы и поставщики комплементарных B2B-продуктов.

Ключевой acquisition mechanic потенциально встроен в сам продукт:

`одна компания хочет map -> приглашает партнёра -> партнёр получает value -> приглашает следующего партнёра`.

Это и есть потенциальный network-effect moat.

## OWNER_VERIFIABILITY_GATE

Проходит хорошо.

Можно взять две контролируемые тестовые базы:

A: 100 компаний.
B: 100 компаний.
Known overlap: 17.

Проверяется:

- система нашла ровно разрешённые 17;
- не раскрыла остальные 83 записи каждой стороны;
- корректно обновила overlap после изменения;
- intro/deal workflow создал правильное действие;
- CRM sync воспроизводим по логам.

Коммерческий pilot также измерим: число найденных overlaps -> intro requests -> meetings -> pipeline -> closed-won.

## GENERAL_AI_SUBSTITUTION_GATE

Проходит.

LLM может сравнить два файла только если обе базы уже раскрыты ему/другой стороне. Он не заменяет постоянно синхронизируемый privacy-preserving two-party data network, sharing permissions и network effect.

AI здесь необязателен.

## DATA_TRUST_GATE

Это главный риск и одновременно потенциальный moat.

Кандидат проходит gate **только** если архитектура действительно уменьшает необходимость доверять платформе. Обычный SaaS upload полной CRM без сильной privacy model — KILL.

## Incumbent / copyability risk

Российский PRM-рынок уже существует. PRM Online, PARTNETIX, RevRoute или крупная CRM теоретически могут добавить overlap matching.

Защита появляется только если мы успеваем накопить:

- multi-company network;
- partner invite graph;
- secure matching reputation;
- integration coverage;
- historical overlap/outcome data;
- cross-PRM neutrality.

Без network effect это просто фича PRM и кандидат слабый.

## Следующий kill test

До product implementation нужны четыре проверки.

### 1. Process reality

15–20 partnership/channel managers российских B2B-компаний:

- делают ли они account mapping сейчас;
- обмениваются ли Excel/CRM lists;
- мешает ли NDA/trust;
- сколько партнёров приходится мапить;
- приводит ли overlap реально к intro/deal.

### 2. Incumbent capability audit

Проверить demo/docs/API минимум 10 ведущих российских PRM/CRM на exact workflow, а не только поисковую индексацию.

### 3. Privacy feasibility

Сделать отдельный architecture proof для pairwise private-set intersection на ИНН без custom crypto invention.

### 4. Willingness to pay

Проверить модель:

- free pair mapping;
- paid multi-partner/auto-sync;
- ориентир не micro-SaaS `$10/mo`, а B2B annual contract.

Если российские партнёрские команды почти не делают account mapping или готовы просто пересылать Excel — KILL.

## Предварительная оценка

`7.5/10` как исследовательский кандидат.

Сильные стороны:

- зрелый западный demand;
- высокая B2B willingness-to-pay;
- измеримый revenue workflow;
- owner-verifiable;
- не заменяется generic AI;
- потенциальный network-effect moat;
- российский ИНН упрощает entity matching;
- bounded search пока не нашёл direct local analog.

Слабые стороны:

- очень высокий trust barrier;
- российские PRM incumbents уже имеют buyer relationships;
- холодный старт two-sided network;
- пока не доказано, что российские B2B partnership teams реально делают эту операцию достаточно часто.

Статус остаётся `PROMISING__DEEP_RESEARCH_REQUIRED__TRUST_AND_INCUMBENT_RISK`, не GO.