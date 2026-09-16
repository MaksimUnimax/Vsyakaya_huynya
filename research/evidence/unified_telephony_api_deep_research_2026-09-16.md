# Deep Research — Unified Telephony / Call Center API for Russian SaaS

Дата: 2026-09-16

Связанный кандидат:

`research/candidates/B1_UNIFIED_TELEPHONY_API_RU.md`

Итог deep-research pass:

`KILL__DIRECT_RUSSIAN_UNIVERSAL_PBX_CONNECTOR_EXISTS__ALBATO_OWNS_HEADLESS_RUNTIME`

Это закрытие исходной идеи, а не implementation authorization.

## 1. Исходный тезис

Developer-facing unified API поверх российских ВАТС / call-center providers:

`CRM / speech analytics / QA / AI copilot / support-tech SaaS`
→ одна integration surface
→ `MANGO OFFICE / UIS / MTS / MegaFon / Beeline / Rostelecom / Novofon / Telfin / Sipuni / Asterisk / etc.`
→ normalized call lifecycle / recordings / events / selected call control.

Покупатель — SaaS vendor, чьи клиенты уже используют разные телефонные системы.

Global category доказана Unified.to и другими unified-integration vendors. Российская repeated engineering pain также реальна: CRM, speech analytics и vertical SaaS поддерживают множество отдельных telephony adapters.

Кандидат закрыт не из-за отсутствия боли.

## 2. Direct Russian competitor — «Простые звонки»

После deeper exact-product sweep найден текущий российский продукт, который закрывает core buyer/value thesis намного ближе, чем generic iPaaS.

Product:

- https://prostiezvonki.ru/
- https://prostiezvonki.ru/developers
- https://prostiezvonki.ru/kb/crm-developers-instruction
- https://prostiezvonki.ru/kb/http-api-for-pbx-developers

### Exact positioning

«Простые звонки» — bridge между ATS/PBX и CRM/customer systems.

Для разработчиков CRM/Helpdesk продукт прямо предлагает модель:

`интегрировать CRM один раз с Простыми звонками -> конечные клиенты подключают разные поддерживаемые АТС -> CRM получает единый call workflow`.

Developer page заявляет:

- HTTP API;
- JavaScript library;
- ActiveX / browser options for legacy cases;
- `60+ integrations for the price of one`;
- `5500+` combinations of PBX × CRM;
- explicit comparison that building/maintaining separate PBX integrations is expensive.

Это та же основная экономия, которую должен был продавать Unified Telephony API candidate.

### PBX coverage already broad

Current public developer page lists, among others:

- Beeline Business;
- MTS Business;
- MegaFon;
- MegaFon VATS 2.0;
- MANGO OFFICE;
- UIS;
- Telfin;
- Novofon;
- Rostelecom;
- MTS Exolve;
- MTT;
- MCN Telecom;
- onlinePBX;
- Asterisk / FreePBX;
- Avaya / Panasonic and other office PBX systems.

The company page states that by the beginning of 2025 the service already had integrations with about 40 PBXs and 65 CRM systems.

Sources:

- https://prostiezvonki.ru/developers
- https://prostiezvonki.ru/about

### Core canonical call lifecycle is already normalized

The universal PBX connector defines a provider-independent event model including:

- `Call` / call start;
- `Answer`;
- `Hang-up`;
- stable call id/group id;
- source/destination numbers and types;
- start/answer/end timestamps;
- line/company number;
- call status;
- recording URL;
- smart transfer request.

The connector also supports outbound methods such as:

- click-to-call;
- transfer.

Source:

- https://prostiezvonki.ru/kb/http-api-for-pbx-developers

This is already a normalized call/event surface, not merely a catalog of provider-specific links.

### Recording abstraction is already part of the product

If the underlying PBX supports recordings, «Простые звонки» receives the recording link and passes it into the CRM in the call-completion event.

The product documents provider-specific access limitations but centralizes the integration behavior and exposes the recording URL to the downstream customer system.

Source:

- https://prostiezvonki.ru/kb/instructions-team/call-records

### Current product is active

The service currently:

- operates a subscription model;
- publishes 2025–2026 updates/pricing;
- is listed in the Russian software registry;
- continues adding PBX/CRM integrations.

Sources:

- https://prostiezvonki.ru/
- https://prostiezvonki.ru/pricing
- https://prostiezvonki.ru/news

Therefore this is not an abandoned historical GitHub/library substitute.

## 3. Why «but we are not a CRM connector» does not rescue the thesis

The original V0 was intentionally narrow:

- calls;
- users/extensions;
- recordings;
- events/webhooks;
- selected call control;
- connection health/logs.

«Простые звонки» already closes the most commercially important cross-PBX primitives:

- call events/history;
- participant/internal extension mapping;
- recording links;
- click-to-call;
- transfer;
- reports;
- server-to-server API integration for downstream CRM/Helpdesk developers.

A new product could improve DX by exposing a prettier REST schema or add normalized pull/history endpoints, but that is feature differentiation inside an occupied category, not a proven Russian market gap.

Speech-analytics or AI products could still need extra features, but they can already consume call events/recording links from this existing layer or use another integration backend rather than requiring a new company to rebuild the whole PBX adapter fleet.

## 4. Albato makes the remaining differentiation even thinner

Even if «Простые звонки» is viewed as CRM-oriented, Albato Embedded now owns a more general SaaS integration runtime.

Current Albato Embedded / Headless capabilities include:

- 1,000+ maintained app connectors;
- multi-tenant customer connections;
- managed authentication and credential lifecycle;
- headless REST API;
- universal API for invoking connector triggers/actions;
- custom connection flows;
- monitoring/error handling;
- API-change maintenance;
- self-hosted/private-cloud option on enterprise plans;
- data-residency options.

Sources:

- https://albato.com/headless-api
- https://albato.com/embedded/pricing
- https://docs.albato.com/docs/general-information

### Russian telephony coverage is already substantive

Albato currently has connectors for multiple Russian/CIS telephony systems, including examples such as:

- Mango Office;
- MegaFon;
- UIS;
- Telfin;
- MCN Telecom;
- Sipuni;
- Zadarma/Novofon-related workflows and others.

Examples:

- https://albato.com/apps/mangooffice
- https://albato.com/apps/mcntelecom
- https://albato.com/apps/zadarma

Mango Office itself documents Albato as a supported integration path.

Source:

- https://wiki.mango-office.ru/support/5_api-i-razrabotka/1_api-mango-office/1_oglavlenie/

Albato Mango actions already include call initiation, routing, employee list and conversation-recording retrieval; triggers include call start/end and recording notification.

Therefore a new entrant would not even need to own every low-level connector in order to build a canonical call schema: an incumbent embedded-iPaaS already owns much of the expensive runtime.

## 5. Remaining differences are not structural moat

Potential attempted rescues:

### `We expose Call / Participant / Recording objects`

Useful DX, but «Простые звонки» already normalizes the event model and Albato already abstracts connection/runtime. A canonical object schema alone is easy for incumbents to add if demand appears.

### `We proxy recordings with zero storage`

Useful security feature, but not sufficient category moat. Existing connector layers already pass recording links; Albato offers enterprise deployment/data controls. Zero-storage proxy can be implemented as an additional service rather than requiring a new adapter network.

### `We support Russian hosting / 152-FZ`

«Простые звонки» is a Russian product and is in the domestic software registry. This is not an exclusive wedge.

### `We target AI/speech analytics rather than CRM`

Buyer wording changes, but the underlying task remains:

`customer connects PBX -> receive normalized events + recording access -> downstream product processes them`.

The expensive part — PBX coverage and event plumbing — is already available.

### `We add realtime media/RTP streaming`

That is a materially different product category closer to CPaaS/media infrastructure. It would require a fresh Strategy-B thesis and independent demand/competition audit. It does not rescue this candidate as originally scoped.

## 6. OWNER_VERIFIABILITY / AI / DATA TRUST

These gates were not the rejection reason.

### OWNER_VERIFIABILITY_GATE

Would pass: calls, timestamps, recording mapping and event delivery are objectively testable.

### GENERAL_AI_SUBSTITUTION_GATE

Would pass: generic AI does not replace connector runtime/auth/webhooks/recording lifecycle.

### DATA_TRUST_GATE

Was a real but manageable risk via minimal retention/zero-storage architecture.

However good technical fit cannot overcome the direct incumbent evidence.

## 7. Incumbent rule

This candidate now fails the same strategic rule used elsewhere in Strategy B:

> Do not enter a category merely because an incumbent lacks one preferred schema/UI detail when it already owns the costly adapters, customer connection path and core workflow.

«Простые звонки» owns the exact Russian multi-PBX integration thesis for CRM/Helpdesk developers.

Albato owns a general headless multi-tenant integration backend plus several of the same PBX connectors.

CRM/speech-tech vendors additionally maintain their own adapter fleets.

A startup would be competing on packaging rather than exploiting an empty structural gap.

## 8. Final status

`KILL__DIRECT_RUSSIAN_UNIVERSAL_PBX_CONNECTOR_EXISTS__ALBATO_OWNS_HEADLESS_RUNTIME`

Do not reopen as:

- Unified.to for Russian telephony;
- one API for Mango/UIS/MegaFon/Telfin/Sipuni;
- normalized call-recording API for Russian PBXs;
- embedded telephony connections for SaaS;
- telephony API gateway for speech analytics;

without a genuinely different workflow that both «Простые звонки» and embedded-iPaaS platforms structurally cannot serve.

A possible realtime-media / RTP / programmable voice thesis is a new candidate, not a reopen condition for this one.
