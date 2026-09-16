# B1 — Unified Developer API for Russian Marketplaces

Дата закрытия: 2026-09-16.

Статус: `KILL__DIRECT_RUSSIAN_UNIFIED_MARKETPLACE_API_EXISTS`

## Идея

Rutter/Merge-like canonical developer API over Wildberries, Ozon, Yandex Market and later other marketplaces:

`one auth/model/API -> products + prices + stocks + orders + shipments + finance -> provider maintains marketplace API changes`.

The intended distinction from embedded iPaaS was a stable normalized developer data/control surface rather than workflow automation.

## Exact competitor found: RDV API

RDV API publicly positions itself as:

- `одна интеграция для всех маркетплейсов`;
- Ozon, Wildberries, Yandex Market and Megamarket;
- standardized methods independent of marketplace-specific requirements;
- one stable method structure;
- provider-maintained marketplace API changes;
- orders, prices, stocks, FBS/DBS/FBO/FBM, shipments and financial analytics;
- integration with any external accounting/business system supporting API.

Product:
https://rdv-market.ru/rdv-api/

API docs:
https://api.rdv-market.ru/

The public API documentation explicitly says the methods are unified regardless of marketplace requirements. Example: one stock update can be distributed to multiple marketplace seller accounts by the service.

RDV also publicly states it is an official technology partner of marketplaces and is listed in the Russian software registry.

This is the same buyer/value thesis as the proposed candidate: reduce engineering and maintenance cost by abstracting changing marketplace APIs behind a stable normalized layer.

## Additional direct evidence

Another current service, `ozon-wb-api.com`, publicly advertises a single REST API for Ozon and Wildberries covering products, prices, stocks, orders and webhooks.

https://ozon-wb-api.com/

Even if its scale claims require independent verification, its existence further shows the category is already discovered.

## Why this is KILL

Do not rescue by narrowing to:

- only Ozon + WB;
- webhooks;
- rate limiting/retries;
- normalized prices/stocks/orders;
- API version maintenance;
- adding Yandex later.

These are core features of the already occupied abstraction category, not a new market wedge.

A future candidate would need a structurally different layer with independent demand/moat, not simply a better unified marketplace API.

Final: `KILL__DIRECT_RUSSIAN_UNIFIED_MARKETPLACE_API_EXISTS`.