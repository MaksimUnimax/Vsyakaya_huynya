# B1 — Enterprise SSO/SCIM infrastructure for Russian B2B SaaS

Дата закрытия: 2026-09-16.

Статус: `KILL__DIRECT_RUSSIAN_DEVELOPER_FACING_CIAM_EXISTS`

## Идея

Российский developer-facing слой класса WorkOS для B2B SaaS:

`SaaS-продукт -> один API/SDK -> enterprise-клиенты подключают свои IdP -> SAML/OIDC SSO + SCIM + multitenancy + admin/delegated setup`.

Изначально идея выглядела как gap между российскими workforce-IAM (Avanpost/Blitz/Keycloak) и SaaS-разработчиком. Gap **не подтвердился** после обнаружения KeyDee.

## Причина KILL — KeyDee является прямым российским конкурентом

На 2026-09-16 KeyDee публично позиционируется именно как CIAM/IdP-платформа **для продукта / SaaS / Enterprise-сервиса**, а не только как внутренний IAM для сотрудников.

Главная страница:

https://keydee.ru/

Enterprise/SaaS:

https://keydee.ru/c/solutions/enterprise

Developer page:

https://keydee.ru/c/product/developers

Pricing:

https://keydee.ru/c/pricing

Публично заявлены:

- API-first integration;
- OAuth 2.0 / OIDC;
- SAML;
- SCIM 2.0;
- multitenancy;
- delegated administration;
- REST API / webhooks;
- SDK for JS/TS, Python, Go, PHP;
- RBAC;
- MFA/passkeys/OTP/social login;
- local Russian hosting and 152-FZ positioning;
- SLA;
- dedicated installation option;
- explicit scenario for SaaS vendors whose enterprise customers require SSO.

### Pricing evidence

Current public pricing includes:

- Free: 0 RUB, up to 5k MAU, no enterprise SSO connections;
- Growth: 9,900 RUB/month, includes 3 SSO connections;
- Enterprise: 59,000 RUB/month, includes 10 SSO connections;
- extra SSO connection: 3,950 RUB/month;
- Custom: dedicated installation / negotiated model.

The pricing page explicitly says the paid plan is intended to create a wow-effect for the first Enterprise customers, and the Enterprise plan is for SAML, multitenancy, high SLA, hybrid/multi-region and 152-FZ DPA requirements.

This is the same buyer/value axis we intended to use.

## Why this is an exact kill, not an adjacent competitor

Earlier incumbents such as Avanpost, Blitz and managed Keycloak were mostly corporate identity infrastructure: the enterprise IT department runs the IdP, while the SaaS still needs application-side protocol support.

KeyDee removes that distinction. It directly tells a SaaS/enterprise-service developer to integrate ready-made CIAM through API instead of building identity infrastructure themselves.

Its partner page even states the exact pain:

`SaaS-vendors: enterprise customers require SSO and role model, but you do not have them`.

Therefore a product whose thesis is merely:

`WorkOS with Russian hosting / SAML / SCIM / 152-FZ / local support`

would be entering an already occupied category against a local vendor with matching positioning and public pricing.

## Western demand remains proven

The category itself is valid. WorkOS/Ory/Stytch/Frontegg/Descope/Clerk and others show that enterprise identity overlays are a mature paid category.

But Strategy B requires a Russian gap, not just global demand. That gap no longer exists at the level we were proposing.

## Open-source pressure makes the situation worse

Even without KeyDee, global/self-hosted alternatives continue to improve:

- Ory Polis — SAML/OIDC bridge + SCIM for SaaS;
- RealmSSO — self-hosted B2B SSO control plane;
- Keycloak — native SAML/OIDC and experimental SCIM in 26.6;
- other developer-first CIAM platforms.

So a new entrant would fight both a direct Russian vendor and increasingly capable OSS/global stacks.

## Do not rescue by feature slicing

Do not reopen this candidate merely by saying:

- `we only do SAML`;
- `we only do SCIM`;
- `we have local IdP templates`;
- `we have an admin portal`;
- `we deploy on-prem`.

Those are feature differences inside an occupied category, not a demonstrated market gap.

A reopen requires a genuinely distinct workflow or segment that KeyDee and comparable products structurally do not serve, plus evidence of demand and defensibility.

## Final status

`KILL__DIRECT_RUSSIAN_DEVELOPER_FACING_CIAM_EXISTS`

Useful lesson: search for exact buyer positioning, not only protocol capabilities. A Russian competitor may call itself CIAM rather than “WorkOS analogue”, and generic queries for SAML/SCIM can miss it.