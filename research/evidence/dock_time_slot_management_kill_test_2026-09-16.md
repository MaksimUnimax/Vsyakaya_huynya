# Strategy B Kill Test — Warehouse Dock Appointment / Time-Slot Management for Russia

Дата: 2026-09-16

Итог:

`KILL__DIRECT_MATURE_RUSSIAN_TSM_YMS_PRODUCT_EXISTS`

## 1. Исходная гипотеза

Российский Opendock-like SaaS:

`warehouse/DC publishes dock capacity`
→ supplier/carrier self-books loading/unloading slot
→ automated capacity/resource rules
→ arrival/queue/status tracking
→ notifications
→ dock/carrier KPI
→ lower truck wait time and warehouse peaks.

The value is objectively verifiable by queue/wait-time and dock throughput, and the category is mature abroad.

## 2. Exact Russian product — ant Time Slot Management

Current product:

- https://www.ant-tech.ru/solutions/time-slot-management/
- https://www.ant-tech.ru/

`ant Time Slot Management` by ANT Technologies is an independent Russian time-slot/yards management product, not merely a hidden WMS feature.

Current public functionality includes:

- carrier self-service selection and booking of free loading/unloading windows in real time;
- scheduling based on docks, loading equipment, staff and other warehouse resources;
- queue/yards workflow and vehicle movement statuses;
- Gantt planning;
- notifications/communications;
- dock and carrier KPI/reporting;
- REST/SOAP Web API;
- integration with ERP/TMS/WMS/vehicle monitoring;
- use as a standalone system with any WMS.

This is the exact core workflow of the proposed candidate.

## 3. Product maturity/distribution are already substantial

ANT Technologies currently states:

- 20+ years in market;
- 120+ successful projects;
- 2M+ m² of automated warehouses;
- 1500+ users.

Current 2026 industry evidence shows ant TSM/YMS already deployed at enterprises including:

- Omega;
- EuroChem;
- Neohim;
- other high-load warehouse/manufacturing sites.

Sources:

- https://www.ant-tech.ru/
- https://www.cemat-russia.ru/news/gk-omega-vnedrila-ant-time-slot-management/
- https://www.cemat-russia.ru/news/tsifrovye-resheniya-dlya-upravleniya-skladom-i-dvorom/

This passes the fatal incumbent test: an entrant would not be discovering a missing Russian category.

## 4. Global/local alternatives reinforce the KILL

Cargoclix Timeslot is also available with a Russian-language surface and offers online dock time-slot and yard optimization integrated with ERP/WMS.

Source:

- https://start.cargoclix.com/ru/slot/

Russian software catalogs additionally treat warehouse time-slot management as an established category rather than a single vendor anomaly.

Source:

- https://soware.ru/categories/warehouse-time-slot-management-systems/made-in-rus

## 5. Why feature slicing does not rescue it

Do not reopen as:

- Opendock for Russia;
- dock appointment SaaS;
- supplier self-booking for warehouses;
- queue/demurrage reduction via warehouse slots;
- independent time-slot layer outside WMS;
- API-first dock scheduling.

ant TSM already provides exactly these primitives, including independent deployment and APIs.

A new candidate would require a distinct transaction/network workflow that current TSM/YMS products structurally cannot serve, not merely simpler UI or AI scheduling.

## 6. Gates

`OWNER_VERIFIABILITY_GATE`: would pass.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass.

`DATA_TRUST_GATE`: low/moderate.

The rejection is purely direct mature local competition.

## 7. Final

`KILL__DIRECT_MATURE_RUSSIAN_TSM_YMS_PRODUCT_EXISTS`
