# Strategy B Kill Test — Returnable Asset / Reusable Packaging Tracking for Russia

Дата: 2026-09-16

Итог:

`KILL__NATIVE_1C_RETURNABLE_PACKAGING_CORE__VERTICAL_SOFTWARE_AND_RFID_PROJECTS_OWN_ITEM_LEVEL_LAYER`

## 1. Исходная гипотеза

Российский TrackAbout / RTI / PackControl-like product:

`pallets / crates / kegs / gas cylinders / IBC / racks`
→ unique asset identity
→ issue to customer/carrier
→ chain of custody / current holder
→ return due date / aging
→ loss/damage
→ deposit/rental billing
→ maintenance/washing/inspection
→ inventory and lifecycle analytics.

Global category is mature. TrackAbout, RTI eP360, PackControl, xTrack PMS and similar systems show reusable-asset software as an established class.

Examples:
- https://www.datacor.com/products/trackabout
- https://rtintel.com/reusable-packaging/
- https://www.packcontrol.com/capabilities
- https://axessoftware.com/pms/

## 2. Native 1C already owns the generic accounting/return core

Current 1C:ERP 2.5 supports multi-turn returnable packaging with:

- returnable packaging attached to goods/packaging;
- customer/supplier agreements defining deposit price;
- return term in days and calculation method;
- transfer to customers and receipt from suppliers;
- workplace for `Переданная возвратная тара` / `Принятая возвратная тара`;
- return or buyout when packaging is damaged/lost/not returned;
- control of packaging balances and return deadlines.

Sources:
- https://its.1c.ru/db/erp25ltsdoc/bookmark/AccountingForMultiTurnContainers/AccountingForMultiTurnContainers
- https://edu.1cfresh.com/articles/2025-1c-erp-up-2-5-part-1
- https://edu.1cfresh.com/articles/2025-1c-erp-up-2-5-part-2
- https://efsol.ru/manuals/returnable-packaging-erp/

1C:Accounting also has explicit returnable-packaging accounting and settlement/deposit treatment.

Source:
- https://www.1c-usoft.ru/article/uchet-vozvratnoy-tary-v-programme-1s-bukhgalteriya-8-redaktsiya-3-0/

Therefore a generic SaaS whose V0 is `counterparty + quantity + deposit + due date + return/buyout` is already native ERP functionality.

## 3. Item-level/RFID layer is already served by Russian integrators

### VanTag

Current Russian RFID integrator explicitly sells a solution for returnable packaging.

Publicly stated workflow/value:

- identify which counterparty received a specific container;
- identify who returned damaged packaging or did not return it;
- speed up issue/receipt;
- reduce packaging loss/replacement;
- reduce shortages/stoppages;
- RFID-based transparency across the circulation loop.

Vendor claims typical projects pay back within the first year.

Source:
- https://vantag-id.ru/solutions/rfid-dlja-ucheta-vozvratnojj-tary/

### General RFID/WMS ecosystem

Russian RFID/WMS/mobile-software vendors already provide:

- pallet/package identifiers;
- RFID/QR scanning;
- gate/handheld event capture;
- ERP/1C integration;
- warehouse movement/inventory.

Examples:
- https://iqsklad.ru/
- https://data-mobile.ru/datamobile/
- https://vekas-automation.ru/?solutions=uchet-pallet

Thus the physical event-capture layer is not a missing technology primitive.

## 4. Vertical Russian software already closes high-value niches

### Gas cylinders — RUSIT

Current Russian web SaaS is specifically built for dangerous-gas cylinders.

Public features include:

- unique QR per cylinder;
- detailed per-cylinder history;
- receipt/shipment/refill/technical inspection;
- status/attributes;
- stock across enterprises;
- counterparties;
- role access;
- hosted web application.

Public pricing starts around 4,200 RUB/month; unlimited-cylinder business/enterprise tiers are available.

Source:
- https://rusitballony.ru/

This is already a TrackAbout-like vertical product for one of the most attractive expensive-asset segments.

### Kegs / breweries

Russian 1C implementations already track each keg with a unique barcode and lifecycle:

- fill;
- customer dispatch;
- return;
- current location;
- maintenance due date;
- specific product/batch inside each keg.

The 1C case for brewery `ЕрмолаевЪ` explicitly describes the business moving from unknown/lost kegs to item-level lifecycle tracking inside 1C.

Source:
- https://v8.1c.ru/metod/cases/chto-delat-kogda-prishel-uspekh-navesti-poryadok-na-proizvodstve-istoriya-avtomatizatsii-pivovarni-ermolaev.htm

Other beer software also supports keg issue/return/cleaning/repair and deposit accounting.

Example:
- https://www.ususoft.ru/programma_dlya_pivnogo_magazina.php

## 5. Cross-industry platforms exist nearby, but the bigger problem is economics of implementation

Platforms/integrators such as WebRozum Original and RFID solution providers already offer:

- QR/DataMatrix/RFID/NFC identity;
- per-asset digital passport;
- movement/return/washing/repair/write-off history;
- counterparty/location status;
- overdue/loss analytics;
- ERP/WMS/MES integration;
- multi-client/white-label structures.

Example:
- https://original.webrozum.com/rus/about/partners/returnable-container-manufacturers/

WebRozum is not a Russian incumbent, but it proves the software pattern is available as an off-the-shelf/project platform rather than requiring new invention.

## 6. Fatal market split

The Russian opportunity splits into two unattractive layers for a new standalone SaaS.

### Layer A — ordinary quantity/deposit/return accounting

Already solved by 1C/ERP:

`how many containers are at customer X, deposit, return deadline, return/buyout`.

No strong moat.

### Layer B — expensive serialized assets with automatic custody tracking

Requires:

- durable barcode/RFID/QR identity;
- tagging process;
- scanners/handhelds/gates;
- site survey/read tests;
- warehouse/dispatch process changes;
- ERP/WMS integration;
- per-industry maintenance/cleaning/inspection logic.

This is sold today as RFID/automation implementation or vertical software.

A new entrant therefore risks becoming a hardware/integration company rather than a repeatable low-touch SaaS.

## 7. Hardware/service burden is not incidental

Returnable-packaging RFID deployments require project-specific decisions around:

- asset material/geometry;
- durable tag type and attachment;
- washing/chemicals/temperature;
- read zones/doors;
- forklift/vehicle movement;
- handheld vs fixed readers;
- network/WMS/ERP event mapping.

This is the expensive part of achieving better visibility than native 1C.

Owner-verifiability of software state is good, but deployment/support economics become the dominant business problem.

## 8. Why feature slicing does not rescue it

Do not reopen as:

- TrackAbout for Russia;
- pallet return tracker;
- keg tracking SaaS;
- gas-cylinder custody SaaS;
- RFID returnable packaging dashboard;
- customer portal for returnable assets;
- overdue packaging/deposit billing;
- QR lifecycle passport for reusable containers.

Those either sit inside native 1C/vertical applications or require the same RFID/ERP project work already offered by incumbents/integrators.

A genuinely new thesis would require a scalable cross-company pooling/network asset that current ERP/RFID players cannot recreate, not merely better item-level tracking UI.

## 9. Gates

`OWNER_VERIFIABILITY_GATE`: PASS for state/custody/return checks.

`GENERAL_AI_SUBSTITUTION_GATE`: PASS; AI does not replace runtime event capture.

`DATA_TRUST_GATE`: good.

The rejection is market structure and service-heavy implementation, not technical correctness.

## 10. Final

`KILL__NATIVE_1C_RETURNABLE_PACKAGING_CORE__VERTICAL_SOFTWARE_AND_RFID_PROJECTS_OWN_ITEM_LEVEL_LAYER`
