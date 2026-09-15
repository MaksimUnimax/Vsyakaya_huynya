# B1 — Enterprise SSO/SCIM infrastructure for Russian B2B SaaS

Дата: 2026-09-15

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__OSS_SECURITY_AND_TAM_RISK`

## Коротко

Российский developer-facing слой класса WorkOS для B2B SaaS:

`SaaS-продукт -> один SDK/API -> каждый enterprise-клиент подключает свой IdP -> SAML/OIDC SSO + SCIM provisioning/deprovisioning + self-service Admin Portal + audit trail`.

Это **не корпоративный IdP/IAM**. Покупатель — разработчик SaaS, которому нужно продаваться крупным компаниям, а не сама корпорация, которая выбирает Keycloak/Avanpost/Blitz для сотрудников.

## Demand proved abroad

### WorkOS

Официальный pricing на 2026-09-15:

- SSO: `$125/month` за enterprise connection для первых 15 connections;
- Directory Sync: `$125/month` за connection;
- дальше действуют volume discounts;
- Audit Log streaming: `$125/month` за SIEM connection;
- enterprise annual plans дают SLA/support.

Источник:

https://workos.com/pricing

WorkOS показывает широкий список крупных production-клиентов, включая OpenAI, Anthropic, Cursor, Replit, Snowflake, Plaid, Vanta, Drata и др. Vendor list не доказывает revenue WorkOS, но доказывает серьёзность production adoption категории.

https://workos.com/customers

### Конкретная экономия engineering time

Tactic:

- интеграция <2 недель;
- Admin Portal экономит оценочно 10–20 часов на каждом enterprise customer onboarding;
- команда из ~4 инженеров считала in-house поддержку множества IdP/directory постоянной нагрузкой.

https://workos.com/customers/tactic

Prefect:

- SSO интегрирован меньше чем за неделю;
- vendor case study заявляет 300+ часов разработчиков, сэкономленных self-service onboarding.

https://workos.com/customers/prefect

Webflow:

- SCIM был hard requirement крупных клиентов;
- по оценке Webflow, надёжная in-house интеграция SCIM даже с одним IdP могла потребовать 2–3 инженера до квартала;
- WorkOS позволил сделать это одним инженером меньше чем за пару недель.

https://workos.com/customers/webflow

Это vendor-provided evidence, поэтому цифры не считаются независимым benchmark, но подтверждают повторяющийся costly workflow и willingness-to-pay.

## Российская боль существует

Российские SaaS уже сами реализуют enterprise identity.

### Planfix

Planfix поддерживает:

- SAML SSO;
- SP/IdP initiated login;
- JIT user creation;
- SCIM provisioning: create/update/deactivate/import users.

https://planfix.com/ru/help/Microsoft_Entra

### Pyrus

Pyrus имеет отдельные инструкции для SAML SSO через ADFS и Keycloak и продаёт SAML/SSO в Enterprise-контуре.

https://pyrus.com/ru/help/authentication/sso-saml-adfs
https://pyrus.com/ru/help/authentication/sso-keycloak
https://pyrus.com/en/pricing

### Custom-development evidence

AVAT публично предлагает enterprise SaaS development package от ~850k RUB / 3–4 недели, куда входят SAML 2.0 SSO, SCIM, audit log и on-prem.

https://avat.studio/services/saas/

Это не доказательство размера рынка, но показывает, что такой набор реально продаётся как отдельный дорогостоящий этап enterprise-readiness.

### Selectel guidance

Selectel в guide по SaaS отдельно пишет, что SaaS-приложение должно поддерживать OIDC/OAuth/SAML и синхронизацию корпоративных пользователей; среди вариантов на российском рынке называет Keycloak и Blitz Identity Provider.

https://selectel.ru/blog/saas_guide/

## Российские adjacent incumbents

### Blitz Identity Provider

Blitz — российский on-prem IAM/CIAM/SSO/MFA продукт. Он поддерживает SAML/OIDC/OAuth/REST и подключение приложений.

Критическое отличие: это в первую очередь IdP/identity server, который покупает/разворачивает организация. Документация Blitz прямо говорит: если подключаемое приложение не поддерживает SAML, приложение надо доработать.

https://identityblitz.com/
https://docs.identityblitz.com/latest/integration-guide/saml.html

### Avanpost

Avanpost — зрелый российский IAM/SSO/SCIM vendor для enterprise IT. Он подключает корпоративные приложения, SaaS/PaaS, Keycloak/ADFS и т.п.

https://www.avanpost.ru/products/avanpost-usso

Это опасный adjacent incumbent, но найденное positioning не является WorkOS-like multi-tenant developer API, где один SaaS-вендор принимает разные IdP множества независимых enterprise customers.

### Keycloak / managed image

Selectel даёт готовый Keycloak server примерно от 2.6–3.3k RUB/month и может добавить DevOps support.

https://selectel.ru/solutions/managed-services/cloud-keycloak/

Но сам Selectel подчёркивает, что это не PaaS: это преднастроенный сервер. Multi-tenant B2B SaaS всё равно должен построить tenant routing, per-customer connections, metadata/certificate support, self-service setup, SCIM model, support/debugging and lifecycle.

## Open-source risk — серьёзный

Прямые open-source WorkOS alternatives уже существуют:

- BoxyHQ / SAML Jackson — SAML/OIDC abstraction + SCIM, Apache-2.0;
- Keycloak — SAML/OIDC, organizations/multi-tenancy capabilities and growing SCIM support;
- Ory Polis — SAML/OIDC bridge + SCIM + admin UI, open/self-hosted options;
- Logto / SuperTokens / others cover adjacent auth.

Поэтому продукт нельзя продавать как:

> «мы поддерживаем SAML».

Это commodity.

Нужна ценность:

`российский enterprise customer self-configures connection -> platform validates it -> SaaS receives one normalized identity API -> users/groups provision correctly -> cert rotation/IdP quirks handled -> audit/support evidence available`.

## Почему это всё ещё может быть gap

Bounded competitor sweep на 2026-09-15 не нашёл российского продукта с явным positioning:

> `developer platform for Russian B2B SaaS vendors to add multi-tenant enterprise SSO + SCIM to their product through one API/SDK and hosted/self-hosted customer Admin Portal`.

Найдены:

- enterprise IdP/IAM vendors;
- Keycloak hosting/images;
- custom development studios;
- SaaS-products, которые сами пишут SAML/SCIM;
- глобальные/open-source libraries/platforms.

Отсутствие результата поиска не доказывает отсутствие скрытого конкурента; нужен exact capability audit.

## Возможный Russian wedge

### 1. Local IdP ecosystem

Готовые шаблоны/validation/support для:

- Avanpost;
- Blitz Identity Provider;
- Keycloak;
- AD FS;
- Microsoft Entra where permitted;
- ALD Pro / other standards-compliant local IAM where relevant;
- generic SAML 2.0 / OIDC.

### 2. Local hosting / VPC / on-prem

Identity data and auth path are sensitive. Российское размещение, VPC/on-prem and local support могут быть обязательным procurement requirement там, где WorkOS cloud не проходит.

### 3. Russian enterprise onboarding package

Не только protocol bridge:

- self-service Russian-language Admin Portal;
- metadata validator;
- certificate-expiry/rotation monitoring;
- attribute/group mapping;
- connection health test;
- SCIM test suite;
- audit evidence;
- setup instructions per local IdP;
- support package for IT department customer.

### 4. Developer-first model

Target is SaaS vendor, not enterprise IAM department.

One integration in product, many enterprise customer connections.

## MVP

Не строить full auth platform.

### V0 — Enterprise connection layer

1. Organizations / tenants API.
2. Per-organization SAML 2.0 connection.
3. OIDC enterprise connection.
4. Home Realm Discovery by domain/org.
5. Hosted setup-link / Admin Portal for customer IT.
6. Metadata/certificate validation and test login.
7. Normalized user identity payload.
8. Basic audit events.
9. SDKs: TypeScript + Python first.
10. Self-hosted/VPC deployment option from the start or very early.

### V1 — SCIM

- SCIM 2.0 Users;
- group sync;
- create/update/deactivate;
- attribute mapping;
- token rotation;
- provisioning log/test suite.

### Later, only if demanded

- audit-log streaming;
- organization policies;
- RBAC/FGA;
- directory connectors;
- enterprise security portal.

## OWNER_VERIFIABILITY_GATE

Mostly passes.

A deterministic fixture can test:

- Tenant A uses Keycloak;
- Tenant B uses generic SAML fixture / Blitz test environment;
- Tenant C uses OIDC;
- users land in exactly correct tenant;
- invalid assertions/certificates fail;
- SCIM create/update/deactivate changes exactly expected account state;
- disabled user cannot access;
- certificate rotation keeps connection operational;
- audit log matches each event.

However **security correctness cannot rely only on owner acceptance**. Before production, external security review/pentest and mature protocol libraries are mandatory. Do not invent authentication cryptography.

## GENERAL_AI_SUBSTITUTION_GATE

Pass.

LLM can write SAML integration code, but cannot replace permanent identity infrastructure, connection state, certificates, SCIM lifecycle, uptime/support and customer IT onboarding.

## DATA_TRUST_GATE

Medium/high but manageable.

The product handles identity metadata and sits on authentication path. That is sensitive, but substantially less broad than ingesting customers' full accounting/mail/document archives.

Trust wedge must include:

- local/VPC/on-prem deployment;
- minimal stored identity data;
- encryption/secret management;
- audit logs;
- clear data-processing model;
- external security audit.

## Business model hypothesis

Do not compete with Keycloak on VM price.

Potential pricing unit should follow enterprise connection/value:

- platform/vendor base plan;
- included enterprise connections;
- price per active SSO/SCIM connection;
- premium VPC/on-prem/support.

Exact RUB price is not yet validated.

WorkOS pricing proves that enterprise-connection pricing is viable abroad; Russian willingness-to-pay must be measured separately.

## Distribution

Potential channels:

- Russian B2B SaaS vendors moving upmarket;
- SaaS development studios, which can stop re-building SAML/SCIM on every project;
- cloud providers / marketplaces;
- startup/enterprise accelerators;
- software vendors receiving enterprise security questionnaires asking SSO/SCIM/on-prem;
- integrations with Bitrix/Planfix/etc are NOT the target; they are examples of products that had to build the feature themselves.

## Main kill risks

### 1. Russian TAM

The number of independent Russian SaaS vendors with enough enterprise customers to pay for this may be too small.

### 2. Open-source is good enough

A capable team can self-host BoxyHQ/Keycloak/Ory. If support burden remains low, managed abstraction has weak value.

### 3. Adjacent IAM incumbents

Avanpost/Blitz/cloud providers can potentially productize a SaaS-vendor layer.

### 4. Security bar

One auth vulnerability can be catastrophic. Small-team implementation is acceptable only by composing mature audited components and adding orchestration/support, not by implementing SAML/crypto from scratch.

### 5. Global products may already serve Russian vendors

Do not assume sanctions create the opportunity. Current WorkOS terms/availability and actual ability of Russian entities to contract/pay/use the service must be verified directly.

## Next kill tests

1. Build a bounded universe of 50–100 Russian B2B SaaS vendors selling Enterprise plans.
2. Classify `SSO/SAML`, `SCIM`, `on-prem`, `audit logs`, `custom integration`, and whether feature is already built.
3. Find 15 vendors that added/are adding SSO/SCIM and ask actual engineer-hours + support load + number of enterprise connections.
4. Exact capability audit of Avanpost, Blitz, managed Keycloak and any local CIAM vendors from the perspective of **multi-tenant SaaS SP**, not corporate IdP.
5. Test BoxyHQ/Ory/Keycloak on 3 IdPs and estimate how much work remains around onboarding/support.
6. Verify WorkOS contractual/technical availability for Russian companies; no assumptions from sanctions headlines.
7. Willingness-to-pay test for local managed/VPC solution.

## Preliminary score

`7.5/10` as a research candidate.

Why it is stronger than most recent ideas:

- mature, expensive western category;
- repeated measurable engineering pain;
- price/value tied to enterprise deals, not low-ARPU users;
- Russian SaaS already implement the feature themselves;
- bounded search has not found a direct developer-facing local equivalent;
- user can functionally QA the main workflow;
- generic AI does not replace the running infrastructure.

Why it is not GO:

- local TAM is unknown;
- open-source alternatives are strong;
- auth/security standard is high;
- adjacent Russian IAM vendors are powerful;
- direct WorkOS/global availability in Russia has not yet been resolved.

Status remains `PROMISING__DEEP_RESEARCH_REQUIRED__OSS_SECURITY_AND_TAM_RISK`.