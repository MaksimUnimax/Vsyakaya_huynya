# Deep Research — Unified Restaurant POS API RU/CIS

Дата: 2026-09-16

Кандидат:

`research/candidates/B1_UNIFIED_RESTAURANT_POS_API_RU.md`

Статус после deep-research pass:

`SURVIVES__DIRECT_GAP_STILL_OPEN__IIKO_BUSINESS_MODEL_APPROVAL_AND_DEVELOPER_WTP_REMAIN_KILL_GATES`

Это **не GO** и не implementation authorization.

## 1. Тезис

Developer-facing слой класса Olo Omnivore для России/СНГ:

`restaurant-tech SaaS / AI / loyalty / CRM / analytics / booking / delivery`
→ одна canonical API
→ `iiko / r_keeper / Poster / FrontPad / СБИС / Quick Resto / ...`
→ normalized menu / modifiers / availability / stop-list / orders / statuses / selected read-side data.

Покупатель — независимый разработчик/вендор, которому сегодня приходится поддерживать отдельный adapter к каждой POS.

## 2. Direct competitor sweep — exact kill пока не найден

### Smartomato — adjacent, но не neutral Omnivore

Smartomato уже имеет adapter fleet к нескольким ресторанным POS и публичный API.

Однако публичная модель API относится к сущностям самой Smartomato platform: Organization, Restaurant, DraftDish, orders, clients, promotions и т.п. POS-adapters обслуживают operating/delivery workflow Smartomato. Чтобы использовать этот слой, ресторан фактически становится клиентом Smartomato.

Источники:

- https://smartomato.ru/
- https://api.smartomato.ru/
- https://help.smartomato.ru/

Вывод: опасный adjacent incumbent, потому что adapter library уже существует, но bounded evidence не показывает модель `third-party SaaS -> one neutral POS API -> arbitrary restaurant customer`.

### RESTOCRM — тот же pattern

RESTOCRM имеет глубокие iiko/r_keeper integrations и API, но API — интерфейс собственного магазина/доставки/CRM RESTOCRM. iiko/r_keeper подключаются как модули операционного продукта ресторана.

Источники:

- https://help.restocrm.com/docs/integrations/rkeeper-iiko/
- https://help.restocrm.com/docs/api/

Вывод: сильный adjacent incumbent, но не exact neutral developer middleware.

### Albato / generic iPaaS

Albato имеет iiko connector и Embedded/Headless model, но это generic app-integration layer. Bounded search не показал полноценной restaurant canonical model поверх iiko+r_keeper с domain semantics: modifier groups, stop-lists, order lifecycle, idempotency, per-POS capabilities and connection health.

Источники:

- https://albato.com/apps/iiko
- https://albato.com/embedded

Generic field mapping alone does not remove POS-specific semantics/support burden.

### ApiMenu — iiko-specialized developer tooling, но не multi-POS

ApiMenu дает инструменты/diagnostics для iiko API, тестовые заказы, меню, loyalty, webhooks and integration support.

Источник:

- https://apimenu.ru/

Это подтверждает demand на specialized integration tooling, но пока не является direct multi-POS canonical competitor.

### Global platforms

Deliverect and other global restaurant-integration vendors have broad adapter fleets. Bounded sweep found r_keeper-related integration evidence in some markets, but did not establish a current neutral developer platform serving the exact RU/CIS combination `iiko + r_keeper` as an Omnivore-like abstraction available to local SaaS vendors.

No absence claim is absolute; this remains a competitor-monitoring risk.

## 3. iiko — technical route exists, but legal/commercial approval is a hard gate

### Technology Partner is an explicit commercial category

iiko publishes a dedicated API license offer for Technology Partners.

Official offer page:

- https://iiko.ru/oferta/

Current relevant Technology Partner API offer listed on the page:

- version dated 01.04.2026;
- a later 25.06.2026 link is also listed and must be contract-reviewed before any commitment because public linking/versioning may change.

The examined offer explicitly describes a Technology Partner as a legal entity/IP using iiko API to create, distribute, support and develop commercial products/services/integration solutions for third parties.

Therefore third-party commercial integration is an intended scenario.

### Commercial models in the examined 01.04.2026 offer

The offer provides multiple compensation models, including:

- percentage of order/payment;
- fixed active-connector fee;
- volume/subscription arrangements by agreement.

Published schedule in the examined offer included:

- order creation: `0.4%` of paid order amount, with stated minimum monthly payment;
- payment scenario: `0.2%`, with stated minimum;
- fixed model: `900 RUB per active connector`;
- baseline technical limits around `10 RPS` and `500,000 requests/month` before individual agreement.

Current dealer pages also publish many iiko connectors at roughly `900 RUB/month`, confirming that a recurring connector fee is used in the market.

### Critical contractual risk

The offer also contains restrictions around resale/sublicensing of API access, while allowing API use as an integral part of an Integrated Solution under agreement terms.

iiko reserves rights around approval/control of Technology Partner business model and commercial use.

Therefore the candidate **must not assume** that a generic proxy/resold iiko API is automatically allowed.

The exact proposal must be presented to iiko as:

`one normalized API sold to third-party restaurant-tech vendors, each of which connects restaurants that use iiko`

and written confirmation is required on:

1. whether this architecture qualifies as an Integrated Solution rather than prohibited resale;
2. whether one Technology Partner App ID may serve multiple independent downstream SaaS vendors/legal entities;
3. whether each downstream SaaS vendor needs separate registration/approval;
4. whether each restaurant is an Active Connector for billing;
5. which tariff applies to menu/stop-list/order/status operations;
6. applicable RPS/request-volume pricing for 100/1,000/10,000 restaurant connections.

Without affirmative commercial/legal confirmation, candidate is KILL regardless of technical merit.

## 4. r_keeper — explicit aggregator route exists, but licensing can be expensive/operationally heavy

Current r_keeper documentation explicitly describes an aggregator/integrator path around White Server API.

Architecture:

`third-party service -> White Server -> WS Agent in restaurant -> r_keeper/store_house -> response`.

To obtain access, integration documentation instructs an aggregator to contact r_keeper integrations, describe company/service and receive authentication/access materials.

Sources:

- https://docs.rkeeper.ru/wsapi/
- https://docs.rkeeper.ru/wsapi/licensing/

### Licensing complexity

r_keeper integration can involve several license components depending on scenario: White Server, interface, product/API components and restaurant-side integration modules.

A current 2026 RESTOCRM explanation of r_keeper Delivery/API economics publishes an example around:

- first restaurant: roughly `3,100 RUB/month` for the required base/branch/API combination;
- two restaurants: roughly `53,500 RUB/year` total;
- five restaurants: roughly `121,000 RUB/year` total.

Source:

- https://help.restocrm.com/docs/integrations/rkeeper-iiko/

These figures are not a vendor quote for our proposed aggregator and must not be treated as our future cost. They demonstrate that the underlying POS licensing layer can be materially more expensive than iiko and that per-location economics matter.

Required next step: obtain a current official aggregator quote/model for `10 / 100 / 1,000` restaurants and clarify which license components are paid by restaurant vs aggregator vs downstream SaaS.

## 5. Buyer universe — repeated multi-POS adapter work is directly evidenced

The relevant TAM is **not the number of restaurants**. It is the number of independent restaurant-tech vendors/products that need the same POS adapters across many customer locations.

A bounded current sweep already found 15+ independent products/contractors with support for, or explicit roadmap toward, two or more POS systems.

Examples include:

- ReMarked — iiko + r_keeper and others;
- RESTOCRM — iiko + r_keeper;
- Smartomato — iiko + r_keeper + FrontPad/SBIS and others;
- ReStar — iiko + r_keeper + Poster and others;
- Loyallyst — Poster + iiko + r_keeper and others;
- Yumsurf — iiko + Poster + Quick Resto + r_keeper + 1C and others;
- Baskar — iiko + r_keeper + Poster and others;
- Tezo — iiko + r_keeper, with more POS in adjacent modules;
- SOVREST — iiko + Poster + Saby/SBIS + MoySklad + r_keeper;
- rest.global — iiko + r_keeper;
- Trigly — iiko + r_keeper + Poster;
- ITLabs — iiko + r_keeper + 1C;
- PRTV — r_keeper + iiko + Quick Resto menu integration;
- MenuHub — iiko + r_keeper;
- Delever — iiko + r_keeper/Syrve + Poster and others;
- NeuroTechnus — iiko + r_keeper + Poster;
- kontora-rest — full iiko today, r_keeper and Poster publicly on roadmap for Q4 2026.

Representative public sources:

- https://help.remarked.ru/article/126
- https://help.restocrm.com/docs/integrations/rkeeper-iiko/
- https://s.prtv.su/podklyuchenie-restorannyh-servisov-r_keeper-iiko-quickresto
- https://itlabs-soft.ru/blog/integraciya-iiko-r-keeper
- https://kontora-rest.ru/

This is strong evidence that adapter development is repeatedly duplicated across independent vendors.

It is still not TAM proof: many of these vendors may have only a few dozen connected locations or may prefer to keep strategic POS integrations in-house.

## 6. Engineering cost and maintenance are material

### Initial integration cost

Current development materials show non-trivial cost for dual-POS integration.

AVOdigital publishes a 2026 example where the iiko/r_keeper integration block for a delivery application is budgeted at roughly:

- 20 working days;
- 540,000 RUB;

covering menu, stop-list, modifiers and order injection.

Source:

- https://avodigital.ru/blog/tz-foodtech-delivery-app-iiko-rkeeper/

This is a vendor estimate, not a universal market benchmark.

### Ongoing maintenance

iiko changed authorization in 2026 and required all integration services to register through its developer portal. Old API-key authentication was scheduled for deprecation/shutdown.

Source:

- https://iiko.ru/news/perehod-na-novuyu-shemu-avtorizaczii-v-api/

This demonstrates a key middleware value proposition:

`provider change -> one adapter maintained centrally -> all downstream SaaS customers continue working`

rather than each vendor independently patching the same change.

### Configuration/onboarding burden

ReMarked's current integration guide for iiko/r_keeper requests substantial restaurant-side connection data/licenses/accesses, particularly for r_keeper.

Source:

- https://help.remarked.ru/article/126

This is both moat and risk: accumulated onboarding automation/support knowledge is valuable, but service-heavy restaurant-by-restaurant work can destroy platform margins.

## 7. Economics — the candidate survives, but incremental platform pricing is the central commercial risk

Underlying POS/API licensing exists even for direct integrations, so the platform should not be charged with the entire POS license cost in an apples-to-apples comparison.

The relevant comparison is:

### Direct

`vendor engineering + ongoing adapter maintenance + certification/partner/admin overhead + restaurant onboarding`

versus

### Unified API

`underlying POS license + middleware platform fee + reduced engineering/maintenance/onboarding cost`.

The middleware wins only if its incremental fee remains below the buyer's avoided engineering/support cost at the buyer's actual number of connected locations.

A simplistic high per-location markup is dangerous because a SaaS vendor with 100–1,000 restaurant locations may rationally internalize the adapters.

Therefore pricing should initially be tested as:

- platform commitment / minimum monthly fee;
- included connection bands;
- volume tiers;
- possibly usage/connector overage;

not an assumed western `$30/location/month` clone.

No Russian price has been validated yet.

## 8. Gates after this pass

### OWNER_VERIFIABILITY_GATE — PASS

Strong.

A controlled test can use identical fixture semantics in iiko and r_keeper:

- categories/items;
- required/optional modifier groups;
- stop-list states;
- order with known modifiers;
- retry/idempotency;
- status transitions;
- offline/degraded connection.

Canonical API output can be compared to POS UI/logs and actual test orders.

### GENERAL_AI_SUBSTITUTION_GATE — PASS

LLM can help write an adapter, but does not replace:

- live credentials/session lifecycle;
- provider partner/licensing process;
- compatibility matrix;
- webhook/retry/idempotency runtime;
- provider API change maintenance;
- connection monitoring;
- restaurant fleet support.

### DATA_TRUST_GATE — PASS WITH BOUNDS

Better than HR/payroll ideas.

V0 can avoid card data and minimize end-customer PII by focusing on:

- menu;
- modifiers;
- availability/stop-list;
- order injection/status with minimal customer fields.

Live delivery orders may still include phone/address and require 152-FZ minimization/security controls.

### DIRECT MARKET GAP — SURVIVES CURRENT BOUNDED SWEEP

No exact Russian neutral developer-facing unified API across iiko+r_keeper was established in this pass.

Adjacent products exist and have strong adapter libraries, so absence is not a permanent moat.

### DEFENSIBILITY — PLAUSIBLE, NOT PROVEN

Potential accumulating moat:

- normalized restaurant semantics;
- adapter edge-case history;
- partner/certification relationships;
- per-POS auth/licensing orchestration;
- regression fixtures;
- provider change tracking;
- connection health and diagnostics;
- onboarding automation;
- troubleshooting history.

The moat is operations/compatibility, not AI.

## 9. Remaining hard kill tests

### K1 — Written iiko business-model approval

Present exact architecture to iiko and obtain written answer.

KILL if neutral normalized API mediation is treated as prohibited resale/sublicensing or requires an economically impossible downstream registration model.

### K2 — r_keeper aggregator economics

Obtain current official quote/terms for:

- 10 restaurants;
- 100 restaurants;
- 1,000 restaurants;

including who pays each license and whether one aggregator account can serve many independent downstream SaaS products.

KILL if restaurant-by-restaurant licensing/onboarding creates large manual dealer work that cannot be automated or delegated.

### K3 — Developer WTP / build-vs-buy

Interview at least 10 multi-POS vendors from the identified list.

For each collect:

- current connected restaurant count by POS;
- engineering time/FTE spent building initial adapters;
- annual maintenance/support time;
- average restaurant onboarding time;
- API-change incidents in last 12 months;
- whether adapter IP is considered strategic;
- acceptable platform fee at 20 / 100 / 500 connected locations;
- exact point where they prefer to own integrations in-house.

KILL if most serious vendors say POS integration is core product IP and would not outsource even at a price below current engineering cost.

### K4 — Two-POS architecture spike

Without production customer data:

1. iiko sandbox/test tenant;
2. r_keeper test environment;
3. one canonical model for menu/categories/items/modifiers;
4. stop-list/availability;
5. create/get order;
6. normalized statuses;
7. idempotent retry;
8. connection health.

Measure:

- percentage of semantics that map cleanly;
- POS-specific escape hatches required;
- setup steps per new restaurant;
- manual operations required;
- provider-specific fields downstream SaaS cannot avoid.

KILL if a useful canonical layer degenerates into exposing raw provider APIs for most real workflows.

## 10. Current conclusion

The candidate survives substantially deeper scrutiny than most Strategy-B ideas.

Positive evidence now includes:

- proven global middleware category;
- explicit iiko Technology Partner commercial framework;
- explicit r_keeper aggregator integration route;
- 15+ local vendors visibly duplicating multi-POS adapter work;
- current engineering-cost evidence;
- current API-change/maintenance evidence;
- no exact neutral RU/CIS developer platform found in bounded search;
- strong owner-verifiability;
- no expensive external data-source dependency;
- no narrow expert-correctness dependency.

But this is **not GO**.

Two facts can still kill it cleanly:

1. provider contracts/licensing do not permit or economically support neutral API mediation;
2. serious multi-POS SaaS vendors prefer owning adapters and will not pay enough for abstraction at scale.

Until K1–K3 are answered with direct evidence, status remains:

`SURVIVES__DIRECT_GAP_STILL_OPEN__IIKO_BUSINESS_MODEL_APPROVAL_AND_DEVELOPER_WTP_REMAIN_KILL_GATES`
