# B1 — Unified Telephony / Call Center API for Russian SaaS

Дата закрытия: 2026-09-16

Статус: `KILL__DIRECT_RUSSIAN_UNIVERSAL_PBX_CONNECTOR_EXISTS__ALBATO_OWNS_HEADLESS_RUNTIME`

## Идея

Developer-facing unified API поверх российских ВАТС / call-center providers:

`CRM / speech analytics / QA / AI copilot / support-tech SaaS`
→ одна integration surface
→ `MANGO OFFICE / UIS / MTS / MegaFon / Beeline / Rostelecom / Novofon / Telfin / Sipuni / Asterisk / etc.`
→ calls / recordings / events / selected call control.

Global category и российская repeated engineering pain реальны, но после exact-product deep audit российский market gap не подтвердился.

## Причина KILL №1 — «Простые звонки» уже закрывают core thesis

Current product:

- https://prostiezvonki.ru/
- https://prostiezvonki.ru/developers
- https://prostiezvonki.ru/kb/crm-developers-instruction
- https://prostiezvonki.ru/kb/http-api-for-pbx-developers

«Простые звонки» прямо продают разработчикам CRM/Helpdesk модель:

`одна интеграция с сервисом -> конечные клиенты подключают разные АТС -> downstream system получает единый call workflow`.

Public developer page currently states:

- HTTP API and other developer tooling;
- `60+ integrations for the price of one`;
- `5500+` PBX × CRM combinations;
- support for Beeline, MTS, MegaFon, Mango Office, UIS, Telfin, Novofon, Rostelecom, MTS Exolve, MTT, MCN, Asterisk/FreePBX and many others.

Core normalized telephony semantics already include:

- call start;
- answer;
- hang-up;
- call/group ids;
- source/destination numbers;
- timestamps;
- status;
- recording URL;
- click-to-call;
- transfer / smart transfer.

The service also keeps call reports/history and passes recording links into downstream CRM where the underlying PBX supports recording.

This is not merely an adjacent CRM plugin. It is the cross-PBX connector layer whose duplicated engineering cost was the original candidate thesis.

## Причина KILL №2 — Albato already owns modern headless integration runtime

Albato Embedded / Headless currently provides:

- 1,000+ maintained connectors;
- multi-tenant customer connections;
- managed auth/credentials;
- headless REST API;
- Universal API for connector triggers/actions;
- monitoring/error handling;
- API-change maintenance;
- self-host/private-cloud and data-residency options for enterprise.

Sources:

- https://albato.com/headless-api
- https://albato.com/embedded/pricing
- https://docs.albato.com/docs/general-information

Albato already has substantive Russian telephony coverage including Mango Office, MegaFon, UIS, Telfin, MCN Telecom, Sipuni, Zadarma and others.

Mango Office itself documents Albato as an official integration route.

Examples:

- https://albato.com/apps/mangooffice
- https://albato.com/apps/mcntelecom
- https://albato.com/apps/zadarma
- https://wiki.mango-office.ru/support/5_api-i-razrabotka/1_api-mango-office/1_oglavlenie/

For Mango specifically Albato exposes call events, recording notification, call initiation/routing, employee-list request and recording retrieval.

Therefore the expensive primitives are already owned by incumbents:

- PBX adapters;
- customer connection/auth;
- event transport;
- recording access;
- connector maintenance;
- white-label/headless runtime.

## Why feature slicing does not rescue it

Do not reopen merely as:

- prettier canonical `Call / Participant / Recording` REST objects;
- recording proxy / zero-storage layer;
- Russian hosting / 152-FZ telephony API;
- speech-analytics oriented API instead of CRM-oriented API;
- embedded connection UI for Russian PBXs.

Those are useful implementation differences inside an already occupied integration layer. They do not establish a structural market gap that current incumbents cannot copy.

A separate realtime-media/RTP/programmable-voice thesis would be a **new product category** and must be researched from scratch rather than presented as a rescue of this candidate.

## Gates

`OWNER_VERIFIABILITY_GATE`: would pass strongly.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass; LLM does not replace connector runtime.

`DATA_TRUST_GATE`: manageable with minimal retention/zero-storage architecture.

These are not the rejection reason.

The rejection is market structure and incumbent ownership of the core primitives.

## Evidence

Full deep pass:

`research/evidence/unified_telephony_api_deep_research_2026-09-16.md`

## Final status

`KILL__DIRECT_RUSSIAN_UNIVERSAL_PBX_CONNECTOR_EXISTS__ALBATO_OWNS_HEADLESS_RUNTIME`
