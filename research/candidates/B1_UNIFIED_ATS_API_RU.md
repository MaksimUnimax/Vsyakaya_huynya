# B1 — Unified ATS API for Russian HR-tech / Kombo-RU

Дата: 2026-09-16

Статус: `HOLD__ALBATO_OWNS_CONNECTOR_RUNTIME__PARTNER_AND_DATA_BARRIERS__CANONICAL_MODEL_MOAT_UNPROVEN`

## Идея

Developer-facing unified API поверх российских Applicant Tracking Systems:

`HR-tech / assessment / background-check / AI-interview / onboarding SaaS`
→ одна canonical API
→ `Huntflow / Potok / Talantix / e-Staff / FriendWork / Skillaz / другие ATS`
→ jobs / candidates / applications / stages / attachments / write-back / webhooks.

Не ATS для рекрутера и не generic iPaaS. Покупатель — другой B2B SaaS, которому нужно работать внутри ATS его клиентов.

## Demand proved abroad

Прямой западный эталон — Kombo.

Kombo продаёт unified ATS/HRIS/LMS/payroll API: одну нормализованную модель, read/write, embedded connection flow, custom fields, raw-provider passthrough, sync status, auth health, logs и webhooks.

Источники:

- https://www.kombo.dev/use-cases/ats-api
- https://www.kombo.dev/use-cases/assessment-api
- https://www.kombo.dev/integrations

Категория доказана. Причина downgrade — не отсутствие global demand.

## Российская repeated engineering pain подтверждена

Несколько независимых downstream products уже поддерживают наборы ATS-adapters.

### Xenia AI

Публично заявлены интеграции с:

- Potok Recruit;
- e-Staff;
- Huntflow;
- FriendWork;
- Talantix;
- hh.ru.

Источник:

- https://xeniaai.com/public-interview

### HR Messenger

Публично заявляет one-click / bidirectional integrations с:

- E-Staff;
- Skillaz;
- FriendWork;
- Potok;
- Huntflow.

Может не только читать, но и создавать кандидатов, прикреплять резюме/переписку и возвращать данные в ATS.

Источники:

- https://hrmessenger.com/integrations
- https://blog.hrmessenger.com/2023/12/29/obnovleniya-chat-bota-hr-messenger-2023/

### Другие signals

- Qooqa публично перечисляет Huntflow / Skillaz / Talantix / Potok среди integrations;
- Proaction интегрируется с recruitment systems в рамках assessment workflow;
- карьерные сайты/HR portals отдельно интегрируются с Huntflow / Talantix / E-Staff / Potok;
- Nord Clan перечисляет e-staff / Huntflow / FriendWork / Potok среди поддерживаемых HR integrations.

Это подтверждает recurring adapter work и реальный downstream buyer type.

## Source APIs — технически хороший фундамент

### Huntflow

Имеет API, webhooks и sandbox.

- https://huntflow.ru/api

### Potok Recruit

Текущая продуктовая страница прямо заявляет open API + webhooks и работу с vacancies, candidates, resumes, funnel movement и внешними системами.

- https://potok.io/recruitment/
- https://potok.io/features/otkrytoe-api-potok/

### Talantix

Имеет крупный GraphQL API с read/write operations: vacancies, candidates, responses, hiring requests, stages and other objects.

API доступен только на тарифе `Оптимальный`. Authorization создаётся администратором; write-use can require an admin seat. Access/refresh lifecycle требует отдельного handling.

- https://api.talantix.ru/docs/
- https://api.talantix.ru/docs/authorization/
- https://talantix.ru/promo/price

### e-staff

Публично заявляет официальный API по vacancies / candidates / users / events и test environment.

- https://e-staff.ru/
- https://e-staff.ru/tariffs

### Skillaz

Продолжает развивать OpenAPI: create/edit persons, candidate applications, publications and other methods.

- https://skillaz.ru/blog/release-of-the-ats-module
- https://skillaz.ru/blog/the-updates-in-the-ats-module

Технический source-coverage gap сам по себе не является главным препятствием.

## Deep competitor audit — Albato materially weakens the thesis

Первоначальная карточка недооценивала Albato.

На 2026-09-16 Albato Embedded — уже не просто workflow iFrame.

### Current platform capabilities

Albato продаёт:

- 1,000+ connectors;
- unlimited customer app connections;
- managed authentication;
- white-label embedded integrations;
- Headless API;
- usage/health dashboard;
- real-time error notifications;
- staging;
- API monitoring and updates;
- custom app development / premium integration enablement;
- enterprise self-hosting/private cloud/on-prem and data residency.

Pricing:

- Starter: from $3,000/month;
- Pro: from $5,000/month;
- Enterprise: custom.

Headless API and full white-label are Pro/Enterprise capabilities.

Sources:

- https://albato.com/embedded/pricing
- https://albato.com/headless-api
- https://albato.com/embedded/api

### Existing Russian ATS connectors are already substantive

#### Huntflow

Current Albato connector exposes triggers/actions including:

- new/update applicant;
- applicant actions;
- offers;
- search applicants;
- create/update applicant;
- get/update vacancies;
- attach applicant/response to vacancy;
- change application status;
- custom API request.

- https://albato.com/apps/huntflow

#### Potok

Current connector includes:

- vacancy trigger;
- create candidate;
- add candidate to vacancy;
- create appointment;
- custom API request.

- https://albato.com/apps/potok

#### Skillaz

Current connector exposes create/update candidate and related actions.

- https://albato.com/connect/albatoai-with-skilllaz

### Albato can extend coverage quickly

Current Albato help center states that requested apps can often be added/tested in roughly 1–2 weeks when API/test access is available, and customers can also build apps through the no-code Apps Integrator.

- https://albato.com/wiki/articles/i-need-a-new-app-in-albato

Therefore our startup would not be competing against `generic Zapier` in the abstract. We would compete against an existing embedded integration infrastructure provider that already owns:

- customer connection/auth runtime;
- several core Russian ATS adapters;
- monitoring/update machinery;
- distribution to SaaS teams;
- self-host/data-residency path;
- a process for adding missing connectors.

## What remains different from Albato

Albato still does **not publicly present** a Kombo-style canonical ATS data model where every source maps to the same permanent API objects:

`Job / Candidate / Application / Stage / Attachment`

with:

- full/delta sync;
- provider-independent IDs/semantics;
- normalized write-back;
- historical state;
- custom-field abstraction;
- raw-provider passthrough;
- connection-specific schema handling.

So exact `Kombo-RU` has not been found as a standalone Russian product.

But the remaining product moat is now much thinner:

> `canonical model + sync semantics on top of connectors/runtime that Albato already owns`.

That is a real value layer, but it is not yet proven to be structurally difficult for Albato or another embedded-iPaaS player to add.

## Provider commercial/contract barrier

### Huntflow

Current user agreement allows commercial use of Huntflow by the licensee but prohibits resale/rental/transfer/use for profit by third parties unless separately agreed in writing.

It also explicitly allows a test cloud environment for integration development.

- https://huntflow.ru/docs/terms
- https://huntflow.ru/api

Implication: a neutral middleware must obtain explicit commercial permission/partner treatment; simply using one customer's credentials as a reseller model cannot be assumed lawful.

### FriendWork

Current API terms are stricter:

- API access is for registered FriendWork users with a current service right;
- API use normally requires an active contract with FriendWork;
- API right is limited, non-exclusive, non-transferable and revocable;
- API credentials/tokens cannot be passed to third parties without written permission;
- FriendWork may impose per-function/request/data limits and change API functionality.

- https://friend.work/api

This does not prove a partner middleware is impossible. It proves a new entrant must negotiate access/processor/credential handling, while Albato already has a mature third-party-connection model for the systems it supports.

### Talantix

Talantix uses customer/admin-generated tokens rather than a clearly public multi-tenant partner OAuth app model in the examined docs. API is tied to paid plan and admin permissions.

Again: feasible, but customer onboarding is not zero-friction.

## Data trust is materially worse than restaurant POS

A unified ATS layer handles:

- names;
- phone/email;
- resumes;
- work history;
- interview/assessment data;
- possibly security/background-check outputs;
- candidate consent state.

This creates a serious 152-FZ/data-processor burden.

Required architecture would likely need:

- Russian data residency;
- strict source scopes;
- encryption;
- minimal retention;
- token isolation;
- audit logs;
- ability not to persist resume blobs;
- potentially local relay/self-hosted deployment for enterprise.

Albato Enterprise already advertises self-hosting/data residency, further reducing localization as a moat.

## Buyer universe — real, but still narrower than employer universe

Repeated adapters are visibly used by AI interviewers, HR bots, assessments, career sites, KEDO/onboarding and integrators.

This passes the `real buyer type` test.

However current public evidence does not yet show 50+ meaningful Russian independent software vendors with enough ATS connections to sustain a dedicated infrastructure company.

The relevant TAM is not number of employers and not number of ATS users. It is:

`number of downstream HR-tech vendors × employer connections per vendor × willingness to outsource integrations`.

This remains unmeasured.

## Gates

### OWNER_VERIFIABILITY_GATE — PASS

Transport/normalization/write-back can be objectively tested against controlled ATS fixtures.

### GENERAL_AI_SUBSTITUTION_GATE — PASS

A general LLM does not replace production auth/sync/webhook/runtime maintenance.

### DATA_TRUST_GATE — WEAK / EXPENSIVE

Can be solved technically, but raises procurement/security cost.

### DIRECT LOCAL COMPETITOR — SURVIVES BOUNDED SEARCH

No exact public Russian Kombo-like neutral unified ATS API was established.

### DEFENSIBILITY — NOT PROVEN

This is now the main failure to reach PROMISING.

The hard connector/auth/runtime layer is substantially owned by Albato. Canonical ATS semantics may be copied or implemented as a vertical layer by an incumbent with existing connections.

## Current assessment

Downgrade from `7.1/10 PROMISING` to approximately `6.2/10 HOLD`.

Positive:

- mature global category;
- clear Russian ATS fragmentation;
- duplicated adapter engineering directly evidenced;
- source APIs are fairly rich;
- objective technical verification;
- no dependence on expensive external data API.

Negative:

- Albato already owns much of the expensive integration infrastructure and several relevant connectors;
- Albato Headless explicitly targets SaaS teams that want an integration backend;
- missing connectors can be added quickly;
- canonical model is the main remaining product distinction and its moat is unproven;
- commercial permissions/partner agreements are needed for some ATS;
- candidate PII/data-residency burden is high;
- direct developer-platform TAM remains unmeasured.

## Reopen / promote conditions

Do not promote back to `PROMISING` unless at least one of these is established with direct evidence:

1. 10+ serious downstream HR-tech vendors say generic Albato-style integration is insufficient specifically because they need persistent normalized full-sync/write-back semantics, and they would pay meaningful platform fees for it;
2. Albato cannot legally/technically provide the required full-sync/read-write model for key ATS, while an independent partner agreement can;
3. a high-value subvertical emerges where the canonical semantics are materially harder than field mapping (for example compliance-heavy assessment/background-check lifecycle) and produces defensible accumulated compatibility data;
4. partner agreements with at least 3 major ATS are obtainable on scalable multi-customer terms;
5. buyer TAM and WTP exceed the security/onboarding/support burden.

Otherwise treat `Kombo-RU` as a real pain but weakly defended product layer adjacent to an incumbent embedded-integration platform.

## Final current status

`HOLD__ALBATO_OWNS_CONNECTOR_RUNTIME__PARTNER_AND_DATA_BARRIERS__CANONICAL_MODEL_MOAT_UNPROVEN`
