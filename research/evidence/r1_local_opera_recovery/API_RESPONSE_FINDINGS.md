# R1 — ERVK public list API response findings

## Status

`PUBLIC_LIST_XHR_SCHEMA = CONFIRMED`

Source: live `Fetch/XHR` response for the public ERVK list request observed in the owner's local Opera browser on 2026-09-15.

Observed request label in DevTools:

`notices?page=0&size=10`

The response was HTTP 200 and returned a JSON object with:

- `notices`: current page records;
- `filterValue`: dictionaries used by the public filters;
- `page`;
- `totalElements`;
- `totalPages`.

## Public list record schema

Each record in `notices` exposed these fields:

```text
id
number
noticeDate
activityTitle
controlOrganTitle
workAndServiceTitle
okvedList
controlObjectName
regionTitle
diffResult
controlObjectAddress
```

Important negatives: this list endpoint did NOT expose, in the observed response:

- submission datetime / exact filing time;
- declared activity start date;
- INN;
- OGRN/OGRNIP;
- phone;
- email;
- status/history/change dates.

Those identifiers are nevertheless visible in the expanded public card, which implies either a separate detail endpoint/request or separately loaded detail data.

## Freshness evidence

The first records in the public API response had `noticeDate = 2026-09-15`, matching the current calendar day of observation. The public UI simultaneously showed 1,327,899 total elements after refresh.

This confirms same-calendar-day public list freshness, but not exact publication latency because `noticeDate` is date-only and its canonical meaning still needs confirmation.

## Physical-point semantics

The response directly carries `controlObjectAddress`, `controlObjectName`, region and activity data at the row level. Multiple records for the same business/brand at distinct addresses were observed, strengthening the use case as a physical-location event feed rather than only a legal-entity feed.

## Filter dictionaries

The response includes the full filter dictionaries used by the public UI.

Notable activity categories include:

- hotels / temporary accommodation;
- public catering;
- retail;
- wholesale;
- cargo transport;
- consumer services;
- beauty / hairdressing (`96.02`);
- vehicle maintenance and repair (`45.20...` and related codes);
- tourism;
- multiple food-manufacturing categories;
- packaging;
- furniture;
- construction-material manufacturing;
- social services;
- low-voltage equipment;
- gas-equipment maintenance;
- lift/escalator service;
- multiple industrial / hazardous-facility categories.

The response therefore supports vertical filtering far beyond HoReCa/retail.

## Commercial implication

The public list endpoint itself is already useful for:

`new/changed physical-point detection -> vertical filter -> region filter -> address/name enrichment`

But it is insufficient by itself for the original pre-opening lead-time thesis because it does not expose `declared start date` in the observed response.

The next required evidence is the detail request/endpoint triggered by expanding a card, because the expanded public UI exposes at least INN and OGRN/OGRNIP.

## Next probe

In DevTools Network, expand a current notice and identify any new `Fetch/XHR` request generated at that moment. Capture:

- request name;
- full Request URL;
- response JSON;
- whether it includes entity identifiers, filing timestamp, declared start date, status/change history.

Also capture the full Request URL of the public list endpoint from `Headers` so the base API host/path can be recorded exactly.
