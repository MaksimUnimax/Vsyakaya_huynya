# Competitor Update — Birga Gateway vs Unified Restaurant POS API RU/CIS

Дата: 2026-09-16

Связанный кандидат:

`research/candidates/B1_UNIFIED_RESTAURANT_POS_API_RU.md`

Связанное основное evidence:

`research/evidence/restaurant_pos_api_deep_research_2026-09-16.md`

## Новый критический факт

После первого deep-research pass найден **exact product-form competitor в CIS**, которого первоначальный sweep пропустил:

`Birga Gateway` — Uzbekistan.

Сайт:

- https://birga-gateway.uz/

Документация:

- https://docs.birga-gateway.uz/

Позиционирование практически совпадает с исходной гипотезой:

`One gateway. Every POS.`

Birga публично заявляет:

- один API поверх нескольких POS;
- единый dashboard;
- отсутствие vendor lock-in;
- mapping/protocol abstraction;
- retries;
- health/reliability layer;
- developer-facing integration gateway;
- R-Keeper support;
- Poster support;
- iiko показан в integration block;
- новые POS adapters на roadmap.

Это **не** restaurant CRM/delivery platform уровня Smartomato/RESTOCRM. Это именно neutral integration-gateway product class, который мы считали потенциально пустым в RU/CIS.

## Важная противоречивость текущего public evidence

Главная страница показывает integration cards:

- R-Keeper;
- Poster;
- iiko.

Но FAQ на той же странице отвечает:

> currently support R-Keeper and Poster, with more adapters in development.

Следовательно, на 2026-09-16 нельзя считать iiko production-supported только по logo/card на сайте.

Наиболее осторожная интерпретация:

- R-Keeper + Poster: публично заявлены как текущая поддержка;
- iiko: либо integration in progress/roadmap, либо marketing page опережает фактическую availability;
- нужно direct confirmation before treating iiko as live.

## Public scale evidence слабое

Birga заявляет на собственной странице:

- `5 Partners`;
- `3+ POS systems`;
- 24/7 reliability.

Также показывает partner names/logos:

- Hoopla;
- QuickServe;
- UrbanEats;
- CloudKitchen.

Однако bounded web search не нашёл независимого подтверждения этих partner relationships, публичных customer cases, pricing, funding/team footprint или заметных third-party mentions самого Birga Gateway.

Документация публично индексируется, но в поисковой выдаче сейчас показывает только shell/landing title без достаточного API content for independent capability audit.

Это означает:

> Birga является **точным конкурентом по product form**, но пока не доказан как сильный incumbent по scale/distribution.

## Что этот факт меняет

### Старое утверждение больше нельзя использовать

Неверно продолжать говорить:

`в RU/CIS нет neutral unified POS API`.

CIS exact competitor существует.

### Но Russian iiko+r_keeper wedge пока не закрыт

На текущем evidence Birga не доказал production iiko support.

Российская гипотеза всё ещё может отличаться:

`production-grade iiko + r_keeper first`
+
`current Russian technology-partner/licensing support`
+
`Russian hosting/support/152-FZ where needed`
+
`deep restaurant canonical semantics`
+
`large Russian adapter-maintenance corpus`.

Однако это уже **не greenfield category**. Это competitive execution thesis against an early CIS entrant and multiple adjacent restaurant platforms.

## Strategic incumbent rule

Birga пока не проходит тот же fatal incumbent test, который убивал другие кандидаты.

Не найдено evidence, что Birga уже владеет:

- большой сетью restaurant-tech vendors;
- сотнями/тысячами connected locations;
- iiko Technology Partner production approval;
- сильной Russian distribution;
- proprietary network/data moat;
- capital/brand advantage, делающим догоняющую конкуренцию бессмысленной.

Поэтому exact competitor discovery **понижает** кандидат, но не даёт автоматический KILL.

## Новый status interpretation

До Birga:

`SURVIVES__DIRECT_GAP_STILL_OPEN__IIKO_BUSINESS_MODEL_APPROVAL_AND_DEVELOPER_WTP_REMAIN_KILL_GATES`

После Birga более корректно:

`HOLD_HIGH__EXACT_CIS_COMPETITOR_FOUND__RUSSIAN_IIKO_RKEEPER_WEDGE_STILL_OPEN__WTP_AND_PROVIDER_APPROVAL_REQUIRED`

Это не GO.

## Новые kill gates

### K0 — Birga iiko reality check

Нужно получить/найти прямое evidence:

1. iiko adapter уже production или roadmap;
2. current connected iiko locations;
3. current customer/partner count;
4. pricing model;
5. countries served;
6. whether Russian legal entities/customers can use the service;
7. r_keeper aggregator relationship/terms;
8. whether Birga exposes full canonical menu/modifier/stop-list/order semantics or only a narrower gateway.

KILL/downgrade further if Birga already has production iiko+r_keeper, meaningful customer scale and can sell into Russia without a structural disadvantage.

### K1 — iiko business-model approval

Unchanged from main deep research.

### K2 — r_keeper aggregator economics

Unchanged.

### K3 — downstream vendor WTP/build-vs-buy

Now ask additionally:

- have you evaluated Birga/other middleware;
- would an external neutral POS gateway be acceptable architecturally;
- what switching/trust requirements exist;
- is Russian hosting/support a procurement requirement or irrelevant.

## Current conclusion

Birga is a valuable discovery because it proves **two opposite things at once**:

1. the product form is real enough that an independent CIS team has already built exactly it;
2. the original market-gap claim was overstated — we no longer have a unique category discovery.

At the same time, Birga's currently visible scale is too weak and iiko support too ambiguous to justify killing the Russian candidate solely on its existence.

Current status:

`HOLD_HIGH__EXACT_CIS_COMPETITOR_FOUND__RUSSIAN_IIKO_RKEEPER_WEDGE_STILL_OPEN__WTP_AND_PROVIDER_APPROVAL_REQUIRED`
