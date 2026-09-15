# R1 — ERVK public API response findings

## Status

`PUBLIC_LIST_XHR_SCHEMA = CONFIRMED`
`PUBLIC_DETAIL_SCHEMA = CONFIRMED_ON_MULTIPLE_RECORDS`

Source: live public ERVK `Fetch/XHR` traffic observed in the owner's local Opera browser on 2026-09-15.

## Public list endpoint

Confirmed full Request URL:

`https://ervk.gov.ru/portal/public/widgets/notices?page=0&size=10`

The response was HTTP 200 and returned a JSON object with:

- `notices`: current page records;
- `filterValue`: dictionaries used by the public filters;
- `page`;
- `totalElements`;
- `totalPages`.

### Public list record schema

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

## Freshness evidence

The first records in the public API response had `noticeDate = 2026-09-15`, matching the current calendar day of observation. The public UI simultaneously showed more than 1.327 million total elements.

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

## Public detail response — confirmed fields

Two separate current records were inspected through the public expanded-card/detail response:

- `id = 1407077`, notice `У003/001407077`, `Магазин "SNAX"`;
- `id = 1407075`, notice `У003/001407075`, `Хороший День`.

Both returned the same detail structure.

Confirmed detail fields:

```text
id
number
noticeDate
controlObject.name
controlObject.address
controlObject.regionCode
controlObject.regionTitle
controlOrgan.code
controlOrgan.title
controlOrgan.ogrn
controlOrgan.agencyType
legalEntity.type
legalEntity.typeRecordId
legalEntity.inn
legalEntity.ogrnip OR ogrn where applicable
legalEntity.lastName / firstName / middleName for IP
legalEntity.okvedList.basicOKVED[]
legalEntity.okvedList.additionsOKVED[]
legalEntity.synchronizationDttm
activity.code
activity.title
activity.workAndServiceCode
activity.workAndServiceTitle
okvedList
terminated
```

### Critical negative result

Across both observed detail responses there was NO field corresponding to:

- declared / planned activity start date;
- submission datetime;
- createdAt / filing timestamp;
- phone;
- email;
- notice status beyond `terminated`;
- modification/history timestamps.

Therefore the original pre-opening lead-time hypothesis cannot be measured from the ordinary list + detail responses alone.

### `synchronizationDttm` interpretation boundary

Observed examples:

- `2026-09-15T02:00:43.026+00:00`
- `2026-09-15T02:00:43.966+00:00`

This timestamp is nested under `legalEntity`, not the notice object. It is therefore treated as legal-entity synchronization metadata, NOT as notice submission time, unless future primary evidence proves otherwise.

The nearly identical timestamps on different entities further support a batch/entity-sync interpretation rather than individual notice filing time.

## Feature-toggle clue for history

A live feature-toggle response observed in DevTools included:

`ervk.history.ERVK-6637 = enabled`

This is not evidence that a public history endpoint exists, but it is a concrete clue that history functionality exists somewhere in the ERVK frontend/backend. A bounded public-network probe should therefore check whether expanding/changing UI state triggers a separate history/revisions endpoint.

## Commercial implication

The public API is stronger than initially expected for a physical-point feed:

`same-day current notice -> exact physical address -> vertical/activity -> INN/OGRN enrichment`

But the strongest proposed moat — `declared future start date` — is not exposed in the normal list/detail payloads observed so far.

Therefore R1 currently splits into two possible theses:

1. `PRE_OPEN_LEAD_FEED` — remains unproven and depends on discovering a legitimate public history/metadata endpoint or another official source containing declared start date.
2. `SAME_DAY_PHYSICAL_POINT_EVENT_FEED` — technically supported by the current public API, but commercially weaker and must beat maps/contact databases on freshness.

## Next probe

Required next evidence:

1. capture the exact Request URL of the detail request;
2. inspect Network for any public request triggered by history/revision UI state;
3. inspect whether page/filter requests accept stable query parameters for activity/region/OKVED;
4. if no public start-date field exists anywhere, pivot R1 analysis away from claimed pre-open timing and test actual freshness vs Yandex/2GIS/industry databases.
