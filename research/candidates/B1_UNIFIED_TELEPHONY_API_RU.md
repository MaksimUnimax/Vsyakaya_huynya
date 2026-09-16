# B1 — Unified Telephony / Call Center API for Russian SaaS

Дата: 2026-09-16

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__DIRECT_COMPETITOR_AND_DATA_TRUST_RISK`

## Коротко

Developer-facing unified API поверх российских ВАТС / call-center providers:

`CRM / speech analytics / QA / AI copilot / sales-tech / support-tech SaaS`
→ одна canonical API
→ `MANGO OFFICE / UIS / МТС Exolve / МегаФон ВАТС / Билайн / Ростелеком / Novofon / Телфин / Sipuni / др.`
→ calls / agents-users / recordings / events-webhooks / selected call control.

Покупатель — не компания, которая ищет новую телефонию. Покупатель — SaaS-разработчик, чьи клиенты уже сидят на разных ВАТС и не хотят менять провайдера ради интеграции.

## Demand proved abroad

Прямой класс уже существует у Unified.to.

Unified.to Call Center API на 2026 год заявляет 39 интеграций и стандартизирует:

- calls;
- recordings;
- contacts;
- comments;
- webhooks/events;
- provider-specific raw payload passthrough.

Позиционирование ровно такое: Aircall, RingCentral, Dialpad, 8x8, Zoom Phone и другие имеют разные APIs/auth/webhooks/data models; product team интегрируется один раз и не поддерживает отдельные pipelines.

Источники:
- https://unified.to/uc/
- https://docs.unified.to/uc/overview
- https://docs.unified.to/uc/integrations

### Pricing evidence

Unified.to — не микросервис с $10 тарифом. Текущие production планы:

- Grow: `$750+/month`, 750k API calls;
- Pro: `$1,500+/month`, 2M calls;
- Scale: `$3,000+/month`, 6M calls;
- Enterprise: custom/private/on-prem.

Платформа покрывает много unified-API categories, поэтому нельзя приписывать всю willingness-to-pay именно call-center модулю. Но это подтверждает, что developer integration infrastructure может иметь существенный B2B ACV.

Источник:
- https://unified.to/pricing

## Российский underlying market очень большой и фрагментированный

По данным ТМТ Консалтинг по итогам 2025 года:

- рынок ВАТС РФ: `34.4 млрд ₽`;
- `540.7 тыс.` компаний-клиентов (уникальных ИНН);
- `3.746 млн` пользователей;
- рынок вырос на 17.1% по выручке год к году.

Структура по числу компаний-клиентов раздроблена. В публичном рейтинге фигурируют Ростелеком/MANGO OFFICE, МТС, Novofon, Билайн, МегаФон, UIS, Дом.ру, Алло Инкогнито, Sipuni, Телфин, MCN и другие.

Источник:
- https://tmt-consulting.ru/napravleniya/telekommunikacii/fiksirovannaya-svyaz/tmt-rejting-rossijskij-rynok-virtualnyx-ats-itogi-2025-goda/

Underlying 540k компаний — не TAM платформы: наш buyer — SaaS/vendor, который затем приводит customer connections. Но fragmentation customer base достаточно велика, чтобы integration coverage влияла на продажи downstream SaaS.

## Прямое evidence duplicated engineering в России

### Dialecto

Speech-analytics platform публично перечисляет собственные подключения к:

- Mango Office;
- МТС Exolve;
- МегаФон;
- Билайн;
- UIS;
- OnlinePBX;
- Oktell;
- Zadarma;
- Телфин;
- Ростелеком;
- MCN Telecom;
- Sipuni;
- Calltouch;
- Callibri;
- CoMagic;
- Asterisk;
- custom server.

Источник:
- https://dialecto.ru/

### ReMarked

CRM/help docs перечисляют несколько десятков ВАТС/provider integrations, включая МТС, МегаФон, Ростелеком, MTT, Mango, Beeline, UIS, Zadarma, MCN, Sipuni и др.

Источник:
- https://help.remarked.ru/article/45

### Spice360

Speech analytics поддерживает отдельные adapters к Mango, UIS/Comagic, Asterisk, Oktell, Beeline, Megafon, Telfin, MTS, MTT, Sipnet и др.

Источник:
- https://spice360.ru/integrations/

### AvangardAI / CRM products

Также публично показывают многочисленные independent telephony connectors.

Это подтверждает recurring adapter work: downstream voice/CRM/AI vendors повторяют один и тот же слой вместо использования common Russian unified telephony API.

## Source API feasibility

### MANGO OFFICE

Открытый API ВАТС поддерживает realtime events, call commands, statistics, recordings и webhooks.

- https://help.mango-office.ru/support/5_api-i-razrabotka/

### UIS

Поддерживает HTTP events/webhooks в сторонние CRM/analytics systems.

- https://www.uiscom.ru/academiya/spravochnyj-centr/obshchie-nastroyki-v-lichnom-kabinete/http-uvedomleniya/

### МегаФон ВАТС

Публично документирует Management API и Data/REST API; доступны управление ВАТС и CRM integration events/call history/recording links.

- https://vats.megafon.ru/management-api
- https://vats.megafon.ru/rest_api

### МТС Exolve

Developer/API platform: call APIs, application keys, realtime call status notifications, recordings, transcription, SIP/voice SDK.

- https://exolve.ru/products/api/
- https://exolve.ru/faq/kak-nachat-rabotu-s-api-mts-exolve/

### Билайн

Имеет developer/B2S APIs и Cloud PBX API surfaces; записи/управление доступны в provider stack.

- https://beeline.ru/business/developers-section/developers-section/ (regional mirrors may surface in search)

Нужно отдельно проверить current commercial/partner terms каждого provider; наличие API не гарантирует scalable third-party redistribution model.

## Российский competitor sweep

На 2026-09-16 bounded search не нашёл прямого neutral developer platform с явным positioning:

`one integration -> customer chooses existing Russian VATS provider -> canonical calls/recordings/events API -> no need to move telephony provider`.

Найдены:

- сами ВАТС со своими APIs;
- speech analytics / CRM products с internal adapter libraries;
- iPaaS/webhook automation products;
- new telephony platforms such as Pro-zvon, которые дают единый API поверх собственной communications platform rather than neutral abstraction of arbitrary existing ВАТС;
- products that connect many VATS as a feature of their end application.

Это не доказательство отсутствия скрытого direct competitor. Exact competitor audit remains mandatory.

## Почему SIP/Twilio-like provider не заменяет продукт

Компания может перевести связь в одну новую ВАТС или завести SIP trunk в programmable provider, но downstream SaaS обычно не может потребовать от всех своих клиентов сменить телеком-провайдера.

Unified API ценен именно при условии:

`оставьте Mango/UIS/MTS/etc. как есть -> подключите credentials -> third-party SaaS immediately gets same canonical data/events`.

## MVP

Не начинать с full telephony control plane.

### V0 — read/event side, 3 providers

`MANGO OFFICE + UIS + МегаФон` (точный набор после buyer interviews).

Canonical objects:

1. connections/accounts;
2. users/extensions;
3. calls;
4. call participants/direction/status;
5. recordings metadata + secure streaming/download proxy;
6. native/virtual webhooks for call start/end/recording ready;
7. provider raw payload escape hatch;
8. normalized errors/rate limits;
9. health/status/logs.

### V1

- MTS Exolve;
- Beeline;
- Novofon/Telfin/Sipuni according to demand;
- click-to-call/call initiation where semantics allow;
- queues/agents only after proven use cases.

Do not store recordings by default.

## Privacy / zero-storage wedge

Recordings and phone numbers are personal/sensitive business data. DATA_TRUST_GATE is real.

Preferred design resembles current Unified.to zero-storage pattern:

- source request executed live against provider API;
- credentials encrypted / customer-managed where possible;
- metadata retention minimal and configurable;
- audio not persisted by platform by default;
- recording can be streamed/proxied or returned as expiring provider link;
- Russian hosting and 152-FZ processing agreements;
- optional self-hosted relay for enterprise.

A product that silently copies every call recording into its own cloud is a much worse fit.

## OWNER_VERIFIABILITY_GATE

Passes strongly.

Create equivalent test calls in three provider accounts and verify:

- one canonical call schema;
- direction/timestamps/duration/status match source UI;
- recording points to the correct call;
- call-end/recording-ready webhook arrives exactly once or obeys documented retry semantics;
- provider outage/auth expiry becomes a clear connection-health state;
- raw provider IDs let us reconcile every canonical object back to source.

No telecom expert is required to verify the core normalization/runtime result.

## GENERAL_AI_SUBSTITUTION_GATE

Passes.

LLM can implement a single provider adapter. It does not replace maintained provider fleet, credentials, webhooks, retries, rate limits, schema normalization, connection health and API-change maintenance across hundreds/thousands of customer connections.

## Distribution / initial ICP

Primary buyers are not telecom departments. They are software vendors whose product needs call data from customers' existing systems:

- speech analytics;
- AI QA / sales coaching;
- CRM / vertical CRM;
- support/helpdesk;
- hospitality/medical/real-estate call analytics;
- AI meeting/call summarization;
- attribution/call intelligence;
- AI copilots/agent-assist;
- workforce/contact-center analytics;
- compliance/quality monitoring.

One SaaS buyer can bring dozens/hundreds/thousands of VATS customer connections.

## Moat

Not JSON field mapping itself.

Potential accumulated moat:

- provider compatibility matrix;
- auth/credential onboarding;
- normalization semantics;
- reliable native + virtual webhooks;
- recording lifecycle abstraction;
- provider quirks/rate-limit/retry knowledge;
- regression fixtures;
- historical reliability metrics;
- local 152-FZ / zero-storage architecture;
- embedded customer connection UI;
- downstream SDK ecosystem.

## Main risks / kill tests

### 1. Hidden direct competitor

Search Russian telecom integrators, speech-tech infrastructure and CPaaS products beyond web-indexed SaaS. Kill if a neutral multi-VATS developer API with equivalent one-to-many customer connection model already exists and has distribution.

### 2. Adjacent incumbents can expose internal adapters

Dialecto, ReMarked, Spice360, CRM vendors and others already maintain many adapters. They could expose them as infrastructure.

Need interview evidence that they view integrations as internal implementation detail rather than platform business, and assess whether their adapters are deeply reusable or tightly coupled to their own product.

### 3. Provider commercial restrictions

Need exact terms for third-party API credentials, recording access and redistribution/proxy across Mango/UIS/Megafon/MTS/Beeline. Kill if major providers prohibit scalable embedded access.

### 4. Buyer TAM

540k companies is not our direct TAM. Need at least 50 downstream Russian/CIS SaaS vendors that need 2+ VATS integrations, and 15–20 interviews quantifying engineering/support cost and deal loss from missing providers.

### 5. Read-only value may be insufficient

If buyers insist on full realtime call control/queues/SIP media streaming, complexity jumps sharply. Need prove that calls/recordings/events alone already saves meaningful engineering and unlocks sales.

### 6. Data-trust

If enterprise buyers require each recording and all metadata to remain entirely inside their network, cloud unified API may need local relay/self-hosted data plane. Validate early.

## Preliminary assessment

`7.7/10` as a research candidate.

Current strengths:
- exact mature global analog;
- global product has meaningful B2B pricing;
- very large and fragmented Russian VATS installed base;
- repeated local adapter engineering is directly visible across multiple SaaS products;
- source providers expose enough APIs/webhooks to make V0 feasible;
- strong owner-verifiability;
- less custom-schema chaos than 1C:ZUP;
- generic AI does not remove runtime/maintenance burden.

Current weaknesses:
- call recordings / phone metadata create real privacy burden;
- adjacent Russian products already own adapter libraries;
- provider commercial terms need verification;
- direct buyer universe still not measured;
- exact local competitor absence is only bounded-search evidence.

Status remains `PROMISING__DEEP_RESEARCH_REQUIRED__DIRECT_COMPETITOR_AND_DATA_TRUST_RISK`, not GO.