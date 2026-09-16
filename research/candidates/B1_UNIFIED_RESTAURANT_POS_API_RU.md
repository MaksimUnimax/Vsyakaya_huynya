# B1 — Unified Restaurant POS API for Russia / CIS

Дата: 2026-09-16

Статус: `HOLD_HIGH__EXACT_CIS_COMPETITOR_FOUND__RUSSIAN_IIKO_RKEEPER_WEDGE_STILL_OPEN__WTP_AND_PROVIDER_APPROVAL_REQUIRED`

## Идея

Developer-facing unified API класса Olo Omnivore:

`restaurant-tech SaaS / AI / loyalty / CRM / analytics / booking / delivery`
→ одна canonical API
→ `iiko / r_keeper / Poster / FrontPad / СБИС / Quick Resto / ...`
→ normalized menu / modifiers / availability / stop-list / orders / statuses.

Покупатель — независимый restaurant-tech vendor, который иначе поддерживает отдельный adapter к каждой POS.

## Что подтвердилось

### Global demand — PASS

Olo Omnivore and other western middleware platforms prove the category.

### Russian duplicated engineering — PASS

Many independent Russian/CIS restaurant-tech products separately support iiko + r_keeper + other POS systems.

The detailed corpus is in:

`research/evidence/restaurant_pos_api_deep_research_2026-09-16.md`

Examples found during deep research include ReMarked, RESTOCRM, Smartomato, ReStar, Loyallyst, Yumsurf, Baskar, Tezo, SOVREST, rest.global, Trigly, ITLabs, PRTV, MenuHub, Delever, NeuroTechnus and others.

### Source/provider feasibility — PARTIAL PASS

iiko has an explicit Technology Partner/API model.

r_keeper has an aggregator/integrator route through White Server/API infrastructure.

So third-party integration is technically/commercially possible in principle.

### OWNER_VERIFIABILITY — PASS

Canonical menu/modifier/stop-list/order/status behavior can be tested on controlled POS fixtures.

### GENERAL_AI_SUBSTITUTION — PASS

LLM can write one adapter but does not replace live credentials, provider partner/licensing, runtime, retries, idempotency, connection health, version maintenance and fleet support.

### DATA_TRUST — PASS WITH BOUNDS

V0 can avoid card data and sensitive HR data and focus on menu/orders/status with minimal customer fields.

## What weakened the candidate

### Exact CIS product-form competitor — Birga Gateway

After the initial deep pass, an exact neutral gateway was found in Uzbekistan:

`Birga Gateway`

- https://birga-gateway.uz/
- https://docs.birga-gateway.uz/

Public positioning is essentially:

`One gateway. Every POS.`

Current public evidence shows/supports:

- one API over multiple POS systems;
- mapping/protocol abstraction;
- retries/health layer;
- developer-facing gateway;
- R-Keeper support;
- Poster support;
- iiko shown in integration block/roadmap context.

This invalidates the old claim:

`there is no neutral unified POS API in RU/CIS`.

Exact competitor evidence:

`research/evidence/restaurant_pos_api_birga_competitor_update_2026-09-16.md`

## Why not KILL yet

Birga is exact by product form, but bounded public evidence did NOT establish:

- large Russian/CIS distribution;
- hundreds/thousands of connected locations;
- strong customer network;
- production iiko support at meaningful scale;
- Russian iiko Technology Partner approval;
- strong capital/brand/network moat;
- ability to serve Russian legal entities without structural disadvantage.

Therefore Birga weakens uniqueness but is not yet a fatal incumbent under Strategy-B rules.

## Adjacent incumbents remain dangerous

### Smartomato

Already owns multiple POS adapters + public API, but primarily as its own restaurant operating/delivery platform rather than neutral developer middleware.

### RESTOCRM

Same pattern: iiko/r_keeper adapters + API, but API belongs to the RESTOCRM product model.

### Albato

Has iiko and Embedded/Headless runtime. Generic iPaaS does not currently prove a full restaurant canonical model, but it already owns expensive connector/auth/runtime primitives.

### ApiMenu

Specialized iiko developer/integration tooling, but not multi-POS canonical layer.

## Hard provider risk — iiko business model

Current iiko Technology Partner offer explicitly governs commercial API use.

Before any implementation, exact proposed architecture must receive written clarification/approval:

`one normalized API sold to independent downstream restaurant-tech vendors, each connecting restaurants that use iiko`.

Need answers on:

1. integrated-solution vs prohibited resale/sublicensing;
2. whether one partner app may serve many downstream SaaS vendors;
3. downstream registration/approval;
4. per-restaurant connector billing;
5. applicable tariff for menu/stop-list/order/status;
6. request/RPS economics at 10/100/1,000/10,000 locations.

KILL if iiko requires an economically impossible model.

## r_keeper economics remain open

Need official aggregator/integration economics for:

- 10 restaurants;
- 100 restaurants;
- 1,000 restaurants;

including who pays each component: restaurant / middleware / downstream SaaS.

Legacy/on-prem support may become service-heavy.

## WTP remains open

Underlying restaurant count is not TAM.

Buyer is a restaurant-tech vendor.

Need 15+ current multi-POS vendors and actual build-vs-buy interviews:

- number of adapters;
- engineering/support cost;
- lost deals due missing POS;
- willingness to use external neutral gateway;
- acceptable pricing model;
- whether Russian hosting/support matters.

No assumption that western ~$30/location/month pricing transfers to Russia.

## Current decision

Do NOT implement.

Do NOT present as greenfield category.

Do NOT call it current top while Retail Deduction Recovery is the only candidate that has survived multiple adversarial passes without exact strong incumbent.

Current status:

`HOLD_HIGH__EXACT_CIS_COMPETITOR_FOUND__RUSSIAN_IIKO_RKEEPER_WEDGE_STILL_OPEN__WTP_AND_PROVIDER_APPROVAL_REQUIRED`

Reopen/advance only after:

- Birga production-scale reality check;
- written iiko business-model approval;
- r_keeper aggregator economics;
- downstream vendor WTP/build-vs-buy evidence.

No code before those gates.
