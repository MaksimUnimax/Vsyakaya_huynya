# B1 — Unified Restaurant POS API for Russia / CIS

Дата: 2026-09-16

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__PARTNER_AND_INCUMBENT_RISK`

## Коротко

Российский аналог класса Olo Omnivore / universal restaurant POS API:

`SaaS / AI / loyalty / CRM / analytics / booking / delivery product`
→ **одна интеграция** с нашей canonical API
→ `iiko / r_keeper / Poster / FrontPad / СБИС Престо / Quick Resto / др.`
→ menu / modifiers / availability / stop-list / orders / statuses / selected read-side sales data.

Продукт продаётся **не ресторану как ещё одна CRM**, а разработчику restaurant-tech, который сегодня вынужден поддерживать отдельный adapter для каждой POS.

## Demand proved abroad

### Olo Omnivore

Официальная страница Omnivore на 2026 год заявляет:

- 12 POS systems behind one integration;
- 23,000+ restaurant locations;
- 5.6M API calls/day;
- основной buyer — technology companies / app developers;
- ключевая ценность — не строить и не сопровождать каждую POS integration отдельно.

Источник:
- https://www.olo.com/omnivoreapi

Текущие клиенты/интеграторы Omnivore показывают реальную per-location willingness to pay: примерно `$30–34.99 / location / month` поверх собственного SaaS.

Примеры:
- 7shifts: https://kb.7shifts.com/hc/en-us/articles/4417513859987-Aloha-POS-Omnivore
- WISK: https://help.wisk.ai/en/articles/4423343-pos-integration-omnivore

Это не доказательство той же цены в РФ, но подтверждает отдельный коммерческий middleware-класс.

## Российская повторяющаяся боль

В РФ множество независимых продуктов каждый строит один и тот же набор POS-adapters.

Примеры:

- RESTOCRM: iiko + r_keeper + другие integrations;
- Смартомато: iiko / r_keeper / FrontPad и др.;
- Tezo: iiko + r_keeper (+ другие для отдельных модулей);
- Forrest Foodtech: iiko + r_keeper;
- voice/AI restaurant products строят собственные adapters и добавляют POS по очереди;
- кастомные разработчики отдельно интегрируют сайт/приложение с каждой POS.

Свежие российские оценки отдельной интеграции показывают существенную стоимость:

- iiko: порядка 80–150 тыс. ₽;
- r_keeper: порядка 100–200 тыс. ₽;
- конкретный интегратор в 2026 продаёт site→iiko и site→r_keeper примерно по 89 900 ₽ и 22 рабочих дня каждый.

Это прямой signal duplicated engineering work.

## Размер underlying ecosystem

Публичные данные самих вендоров:

- iiko: `80 000+` ресторанов в 9 странах;
- r_keeper: `65 000+` заведений / более 30% рынка России и ближнего зарубежья по собственным данным компании.

Это не надо складывать как уникальные российские точки: есть география, legacy, пересечения и разные определения active customer. Но underlying installed base достаточно велик, чтобы категория не выглядела микроскопической.

## Российский competitor sweep

### Прямой developer-facing Omnivore-аналог

В bounded sweep на 2026-09-16 **не найден** российский продукт, который публично продаёт независимому SaaS-разработчику модель:

`integrate once -> one normalized API -> connect arbitrary restaurant customers on iiko/r_keeper/etc.`

### Опасные adjacent incumbents

#### Смартомато

Умеет подключать разные POS и имеет публичный REST API. Однако продукт позиционируется как operating/delivery platform для ресторана; его API работает с сущностями самого Смартомато. Для использования middleware restaurant фактически должен быть клиентом Смартомато.

Это очень опасный adjacent incumbent: технически часть adapter library у него уже есть, и он теоретически может открыть developer-facing access.

#### RESTOCRM

Имеет iiko/r_keeper adapters и публичный Server/Client API. Но основной продукт — CRM/delivery/site/loyalty platform ресторана, а не neutral POS infrastructure для сторонних SaaS.

Также может сравнительно быстро расшириться в эту сторону.

#### Другие restaurant platforms

Tezo, Forrest, delivery/loyalty/AI products имеют отдельные adapters, но пока используют их как internal capability своего конечного продукта.

## Почему generic iPaaS не равен этому продукту

Albato/Make-like flow может передавать поля, но canonical POS layer должен знать restaurant semantics и поддерживать их постоянно:

- menu categories/items;
- modifier groups / required modifiers;
- price variants;
- terminal groups / restaurants;
- stop lists / availability;
- order types;
- payment methods;
- order injection;
- lifecycle/status mapping;
- POS-specific licensing/version constraints;
- idempotency/retry semantics;
- health of the restaurant/POS connection.

Ценность — в compatibility matrix и support, а не в JSON transformation.

## Official integration feasibility

### iiko

В 2026 iiko перевела integration services на регистрацию через developer portal и публикует отдельную лицензионную оферту API для технологических партнёров.

То есть third-party integration — штатный сценарий, но требует partner/API process.

### r_keeper

Документация содержит API/XML/White Server interfaces и отдельные integration licenses. Быстрый старт для интеграторов говорит, что доступ/лицензии приобретаются через авторизованных дилеров, а платить может ресторан либо интегратор.

Это создаёт friction, но именно этот friction и является частью potential moat: новый конкурент должен пройти те же partner/install/licensing paths.

## MVP

Не пытаться сразу поддержать все POS и весь API.

### V0 — два доминирующих контура

`iiko + r_keeper`

Canonical API:

1. `organizations/locations`;
2. `menus/categories/items/modifiers`;
3. `availability/stop-list`;
4. `orders create/get/status`;
5. webhook normalized order status;
6. connection health;
7. idempotency + retry;
8. sandbox fixtures;
9. per-POS capability matrix.

### V1

- Poster / FrontPad / СБИС Престо / Quick Resto по реальному спросу;
- sales/tickets read-side;
- employees only if justified;
- unified SDKs;
- partner onboarding portal.

Не трогать payments/card data в MVP.

## Owner verifiability

Проходит хорошо.

Можно создать тестовое меню с заранее известными:

- 20 dishes;
- 3 modifier groups;
- 2 stop-list items;
- known order with modifiers.

Одинаковый canonical request должен:

- вернуть эквивалентную нормализованную структуру с iiko и r_keeper;
- корректно создать заказ;
- не продублировать заказ при retry;
- обновить status webhook;
- показать degraded/offline connection.

Результат проверяется через POS UI, API logs и фактический заказ; HoReCa-эксперт для приёмки транспортного слоя не нужен.

## GENERAL_AI_SUBSTITUTION_GATE

Проходит.

LLM может написать один adapter, но не заменяет production runtime, партнерские лицензии, connectivity, certification, regression matrix, version maintenance, retries, sandbox и fleet monitoring.

## DATA_TRUST_GATE

Лучше Finch-RU.

В MVP можно избегать платежных карт и чувствительных кадровых данных. Основной контур — меню, availability, orders и operational metadata.

Тем не менее restaurant order/customer PII требует минимизации, encryption и configurable field scope.

## Главные риски

### 1. Adjacent incumbents already own adapters

Смартомато/RESTOCRM и другие уже имеют несколько POS adapters. Если developer infrastructure окажется привлекательным, им дешевле открыть часть своего слоя наружу, чем нам построить adapters с нуля.

Нужна нейтральность, superior developer experience и partner distribution.

### 2. Partner/licensing friction

iiko/r_keeper могут менять partner terms, API auth, лицензии и certification. Это moat только пока economics позволяют поддерживать процесс.

### 3. Buyer universe smaller than restaurant universe

80k POS locations не означают 80k клиентов платформы. Покупатель — technology vendor, который затем приводит location connections.

Нужно измерить количество потенциальных SaaS/restaurant-tech vendors и среднее число locations на одного.

### 4. Service-heavy onboarding

Legacy/on-prem r_keeper versions и restaurant-specific configs могут требовать ручной установки. Если каждый объект превращается в проект интегратора, SaaS economics ломаются.

## Distribution / ICP

Первичные покупатели:

- AI voice/order assistants;
- loyalty/CRM vendors;
- restaurant analytics/BI;
- workforce/scheduling;
- procurement/inventory add-ons;
- reservation/waitlist;
- QR payment/order products;
- delivery/own-channel platforms;
- fintech/embedded finance for HoReCa;
- hotel/entertainment products with restaurant POS integration.

Вместо продажи каждому ресторану отдельно один vendor может привести сотни locations.

## Next kill tests

1. Собрать 50 российских/CIS restaurant-tech vendors и классифицировать поддерживаемые POS.
2. Найти минимум 15 компаний, которые поддерживают 2+ POS, и узнать реальную cost/time поддержки adapters.
3. Проверить, можно ли использовать Smartomato/RESTOCRM как фактический universal middleware уже сегодня. Если да — кандидат резко слабеет.
4. Получить точные current technology-partner terms iiko и integration economics r_keeper.
5. Сделать architecture spike только на canonical mapping `menu + modifiers + stop-list + order` между iiko/r_keeper без production customer data.
6. Проверить willingness-to-pay per connected location. Западный benchmark ~$30/location/mo, но российская цена может быть значительно ниже.

## Предварительная оценка

`7.6/10` как исследовательский кандидат.

Сильные стороны:
- очень чистый proven-abroad analog;
- крупный underlying POS footprint;
- множество российских продуктов уже дублируют adapters;
- реальные integration costs видны на рынке;
- ниже data-trust burden, чем Finch;
- высокая owner-verifiability;
- compatibility/partner matrix способна накапливать moat.

Слабые стороны:
- adjacent incumbents уже имеют adapters;
- partner/licensing dependency от iiko/r_keeper;
- неизвестен точный developer-buyer TAM;
- legacy r_keeper может сделать onboarding service-heavy;
- прямое отсутствие local analog пока подтверждено только bounded search.

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__PARTNER_AND_INCUMBENT_RISK`, не GO.