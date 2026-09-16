# Strategy B Kill Test — Hotel OTA Commission / Settlement Reconciliation for Russia

Дата: 2026-09-16

Итог:

`KILL__RUSSIAN_PMS_CHANNEL_MANAGERS_ALREADY_OWN_OTA_RECONCILIATION_PRIMITIVES_AND_HOTEL_DISTRIBUTION`

## 1. Исходная гипотеза

Российский product class уровня reconcileOTA / Terrace / InnRecon:

`PMS final stay + OTA financial statement + bank payout + contracted commission`
→ match reservation economics
→ detect commission/payout discrepancy
→ identify missed/incorrect settlement
→ prepare evidence/dispute
→ recover revenue.

Global category is real. Current products such as reconcileOTA automate OTA commission/VCC reconciliation and revenue recovery across hotel portfolios.

Sources:

- https://www.reconcileota.com/
- https://www.useterrace.ai/products/accounts-receivable/ota-reconciliation
- https://innrecon.com/hotel-ota-reconciliation/

## 2. Russian OTA financial trail is structured and reproducible

### Yandex Travel

Current partner financial documents expose:

- booking amounts;
- refunds;
- marketing compensation;
- agent/commission remuneration;
- amounts actually transferred to the property;
- daily payment-order registries with per-booking detail.

Source:

- https://travel.yandex.ru/pro/zakryvayushchie-dokumenty-dlya-partnyorov-servisa/

### Ostrovok

Current extranet runs a formal monthly reconciliation window before invoices/payouts.

The property can review reservations and correct no-shows/dates/amounts before billing closes.

Sources:

- https://aparts.ostrovok.ru/new
- https://t.me/s/extranetetg/319
- https://help.extranet.ostrovok.ru/ru/articles/13159827

Thus the mechanics needed for deterministic reconciliation exist.

## 3. Fatal incumbent #1 — TravelLine already productizes OTA commission reconciliation

Current TravelLine WebPMS messaging explicitly calls end-of-month reconciliation with sales channels a recurring hotel routine.

The product now includes a dedicated `Отчёт по агентам` intended to show how much is owed to each OTA/agent, including cases where commission rates changed during the season.

Sources:

- https://t.me/s/travelline_news/9028?q=%23travelline
- https://t.me/s/travelline_news/9247?q=%23tl_webpms

TravelLine also integrates agency documents into 1C accounting:

- each Yandex Travel/Ostrovok/Tutu booking can create an agent-report document;
- commission calculation method is transferred from the counterparty agreement;
- agent documents and discounts can be loaded into accounting.

Source:

- https://www.travelline.ru/support/knowledge-base/dopolnitelnye-nastroyki-pri-integratsii-s-1s-bukhgalteriya/

This means TravelLine already owns booking source, channel integration, commission rules and accounting export.

## 4. Fatal incumbent #2 — Bnovo already has commission/agent reconciliation

Bnovo currently provides:

- OTA/agency commission automatically shown in booking card;
- prepayment/commission synchronization;
- `Отчёт комиссионера`;
- a dedicated `Комиссия` report containing bookings and commission by channel;
- explicit positioning that the report is used for reconciliation with online booking systems/agencies.

Sources:

- https://bnovo.ru/blog/releases/automation-of-commissions/
- https://help.bnovo.ru/knowledgebase/%D0%BA%D0%BE%D0%BC%D0%B8%D1%81%D1%81%D0%B8%D1%8F-%D0%B8-%D0%BF%D1%80%D0%B5%D0%B4%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B0-%D0%BE%D1%82-%D0%BE%D1%82%D0%B0-%D0%B2-%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D1%87%D0%BA/
- https://bnovo.ru/blog/generate-reports-directly-in-the-booking-module/

Again, the expensive source-data primitives are already inside the incumbent PMS/channel manager.

## 5. Kontur.Hotel and Saby Hotel reinforce that the category is already native PMS functionality

### Kontur.Hotel

Current product has dedicated reports:

- `Сверка с каналами`;
- `Сверка с контрагентами. Партнёры`;
- payment/debt reports.

Sources:

- https://kontur.ru/qa/24502
- https://www.kf4.ru/kontur/kontur_otel/sistema-upravleniya-otelem

### Saby Hotel

Current system:

- integrates OTA channels;
- stores channel/booking/payment data;
- builds financial reports by channel;
- allows commission amount configuration;
- handles OTA booking/accounting documentation inside Saby ecosystem.

Sources:

- https://link.saby.ru/hotel/knowledge?folderId=4499bff5-ea63-418a-ba88-e968867a7a09
- https://saby.ru/hotels

Therefore several Russian PMS/channel-management incumbents already view channel reconciliation as a native product responsibility.

## 6. Russian market structure is less favorable than the western VCC-recovery archetype

A large part of western OTA recovery economics is driven by Booking.com/Expedia-style virtual-card settlement complexity and missed VCC collections.

The current Russian Yandex Travel/Ostrovok workflows visible in public materials are more centered on:

- agent reports;
- commission/merchant/agency models;
- bank payouts;
- monthly reconciliation;
- structured booking registries.

This creates reconciliation work, but it is closer to the data model already owned by PMS/channel-manager vendors.

## 7. Why `bank payout mismatch + dispute queue` does not rescue the thesis

An independent product could still add:

- bank-statement matching;
- discrepancy exception queue;
- deadline alerts;
- evidence pack;
- dispute tracking.

But incumbents already own:

- final PMS stay data;
- booking status/cancellation/no-show;
- OTA channel connections;
- commission rate/configuration;
- hotel distribution/customer relationship;
- accounting export.

Adding bank matching/dispute workflow is a bounded feature for them. A startup would need to recreate PMS/OTA integrations or ask hotels to duplicate sensitive data into another financial system.

This fails the Strategy B incumbent rule.

## 8. Underlying market size does not override the incumbent problem

Russia has a large accommodation base; current public registry mirrors show tens of thousands of accommodation objects.

Example snapshot:

- https://hotgrade.ru/hotels

But `number of hotels` is not sufficient when the likely buyers already use PMS/channel-management systems that own the exact booking/commission data path.

## 9. Gates

`OWNER_VERIFIABILITY_GATE`: would pass — reservation, commission, payout and discrepancy are objective.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass for a persistent multi-source reconciliation runtime.

`DATA_TRUST_GATE`: moderate — hotel financial/guest data.

The rejection is incumbent ownership of the source data, reconciliation primitives and distribution.

## 10. Final

`KILL__RUSSIAN_PMS_CHANNEL_MANAGERS_ALREADY_OWN_OTA_RECONCILIATION_PRIMITIVES_AND_HOTEL_DISTRIBUTION`

Do not reopen as:

- reconcileOTA for Russia;
- OTA commission auditor for Yandex/Ostrovok;
- hotel payout reconciliation SaaS;
- OTA discrepancy recovery;
- hotel agent-report reconciliation;

without a structural data/action advantage current PMS/channel managers cannot add themselves.
