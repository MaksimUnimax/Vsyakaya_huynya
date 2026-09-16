# Retail Deduction Recovery — EDI Historical Access Gate

Дата: 2026-09-16

Связанный pre-pilot:

`research/pilots/RETAIL_DEDUCTION_RECOVERY_PREPILOT_2026-09-16.md`

Итог:

`TECHNICALLY_FEASIBLE__BOUNDED_EDI_HISTORY_ACCESS_EXISTS__CUSTOMER_PERMISSION_RETENTION_AND_PENALTY_DOCUMENT_ACCESS_REMAIN_OPEN`

Это не означает, что каждый supplier бесплатно/мгновенно выгрузит любой период. Вывод уже: **сама архитектура EDI-провайдеров не требует полного доступа к 1С для получения core event chain**.

## 1. Ediweb / CorePlat — direct REST history path exists

Current CorePlat REST API documentation exposes:

`GET /edi/api/v1.1/getListDocuments`

with filters including:

- organization id;
- partner organization id;
- document type;
- date_from/date_to;
- state;
- read status;
- sort/limit.

Current documented EDI document types include:

- `LEGACY_ORDER` — ORDERS;
- `LEGACY_ORDER_RESP` — ORDRSP;
- `LEGACY_DES_ADV` — DESADV;
- `LEGACY_REC_ADV` — RECADV;
- `EDI_CONTRL` and other EDI messages.

Source:

- https://ediweb.com/files/kb/ru-ru/CorePlat/rest-api-coreplat.pdf

This directly supports provider-side extraction of the four core event families by time window/partner.

### UI export also exists

Current CorePlat instructions for ORDERS explicitly expose:

`Другие действия -> Экспорт в файл`

and save ORDERS in XML format.

Source:

- https://ediweb.com/ru-ru/support/kb/2098

Current instructions also show ORDERS versions/functions can be:

- original;
- changed;
- deleted.

This is important for `ORDER_VERSION_MISMATCH`; the provider-side source is not limited to a single final ERP state.

Example:

- https://ediweb.com/ru-ru/support/kb/1410

### Implication

For an Ediweb supplier, Phase-A pilot can plausibly begin from either:

- bounded API read/export if customer already has/permits API access;
- customer-generated XML export from CorePlat UI;
- existing ERP integration archive.

No need to request production credentials in the first step.

## 2. Saby EDI — full accounting-system API workflow exists

Current Saby documentation states that when EDI messages/documents are handled in Saby but accounting is in an external system, the customer can use Saby EDI API and work fully from its accounting system.

Documented API workflow includes:

- authorization/session;
- order creation/sending;
- order response;
- receiving order response;
- DESADV;
- RECADV;
- UПД;
- **getting document list**.

Source:

- https://saby.ru/help/edi/integration/api

Saby's current EDI docs also explicitly state the service records every supply stage and timestamps creation/processing/receipt, which is useful for dispute evidence.

Source:

- https://saby.ru/help/edi

### X5

Current Saby X5 page confirms exchange of:

- ORDERS;
- ORDRSP;
- DESADV;
- RECADV;
- APERAK on DESADV;
- legal documents.

Source:

- https://saby.ru/help/edi/clients/network/x5

### Magnit/Tander

Current Saby page confirms:

- ORDERS;
- ORDRSP;
- DESADV;
- RECADV;
- PRICAT;
- RETORD;
- premium calculation act.

Source:

- https://saby.ru/help/edi/clients/network/tander

### Implication

For Saby customers, the core event model is directly represented in provider/API workflow. A bounded read/export pilot is technically plausible without reverse engineering the supplier's 1C database.

## 3. Kontur.EDI — API/FTP/connector integration is an official product mode

Current Kontur.EDI product page states customers can work by:

- web version;
- 1C module;
- API integration;
- FTP;
- connectors for nonstandard accounting systems.

Sources:

- https://kontur.ru/edi
- https://kontur.ru/edi/features
- https://kontur.ru/edi/spravka/38559-vybrat_edi_provaidera

The standard order flow exposes:

- ORDERS;
- ORDRSP;
- DESADV;
- RECADV.

Kontur's current pricing document explicitly defines an `API-лицензия` as the right to use Kontur.EDI via API for integration with **any customer accounting system**, plus separate FTP/AS2 integration licenses.

Source:

- https://kontur.ru/Files/userfiles/file/products/edi/price/Price_Kontur_EDI.pdf

### Implication

The provider already supports machine-readable data exchange outside the web UI. The pre-pilot does not require inventing a scraping path.

## 4. What this gate DOES prove

For the three important provider classes, current public evidence supports:

1. core EDI event types are stored/processed as explicit message objects;
2. supplier/accounting-system integrations are first-class supported workflows;
3. at least Ediweb exposes date/partner/type-filtered history list through REST;
4. XML/file export exists at least for Ediweb ORDERS and provider integration paths generally support machine-readable payloads;
5. X5/Magnit chains use the exact event types needed by the pre-pilot.

Therefore:

> `historical Tier-A audit requires rebuilding the entire supplier ERP integration before seeing any data`

is **not** supported by current evidence.

## 5. What this gate does NOT prove

Still open per supplier/provider:

### Retention

How many months/years of every EDI message/version are available in the live provider account/API?

Do not assume indefinite history from current API docs.

### Deleted/changed order completeness

Ediweb publicly shows original/changed/deleted ORDERS, but exact version history behavior must be validated for each network/provider/export mode.

### Penalty document API coverage

Core EDI events are accessible. It remains separate to prove:

- all penalty acts/accounts/DSF docs are machine-readable/listable by API;
- retailer-specific fine documents expose stable order/SKU references;
- reject/appeal status is retrievable/programmatically writable.

### Customer rights/licensing

API may require the customer's existing API license/tariff. Historical export could instead be performed manually by the customer for Phase A.

### Permission/trust

Technical access does not mean supplier is willing to share the export with an external research pilot.

That remains a real DATA_TRUST/sales gate.

## 6. Revised pre-pilot access strategy

Preferred order:

### Step 1 — customer-generated export

Ask participant to export bounded history itself.

No credentials.

### Step 2 — existing accounting-system archive

If supplier already receives all messages into 1C/ERP, accept that export as long as source message ids/versions/timestamps are preserved.

### Step 3 — provider API read-only

Only after historical audit proves value and customer authorizes integration.

Use official API/FTP/connector paths, not browser scraping.

## 7. Access gate decision

Old broad uncertainty:

`Can supplier data even be extracted without a bespoke IT project?`

Current answer:

`YES, technically plausible for major EDI providers.`

Remaining gate:

`Will real suppliers share sufficiently complete history, and is retention/version/penalty coverage adequate for deterministic audit?`

Status:

`TECHNICALLY_FEASIBLE__BOUNDED_EDI_HISTORY_ACCESS_EXISTS__CUSTOMER_PERMISSION_RETENTION_AND_PENALTY_DOCUMENT_ACCESS_REMAIN_OPEN`
