# R1 — local Opera recovery of live ERVK public register

## Status

`LOCAL_OPERA_RECOVERY = PASS__PUBLIC_LIST_ACCESSIBLE`

Execution date: 2026-09-15.
Environment: owner's local Opera browser connected through Opera Browser Connector; ordinary anonymous public browsing; no login; no CAPTCHA solving; no TLS bypass; no proxy/VPN/stealth or other access-control bypass.

## Primary result

The live public ERVK route loaded successfully in the owner's local Opera browser:

`https://ervk.gov.ru/public/notices`

This disproves the hypothesis that the current public register is universally unavailable. The earlier ChatGPT Work cloud-browser failure remains valid evidence of an environment/service-path reliability problem, but not of a global ERVK outage.

Current reliability classification after this recovery:

`SOURCE_RELIABILITY_CLASS = ENVIRONMENT_SPECIFIC_FAILURE__LOCAL_BROWSER_WORKS`

This classification may be refined later if repeated local observations show intermittent service behavior.

## Public UI facts directly observed

The page rendered the public section `Уведомления о видах деятельности` without authentication.

Visible UI elements on the default list page:

- free-text search field: `Напишите, какие уведомления вы ищете`;
- `Расширенный поиск` control;
- current result count;
- pagination;
- public cards for notices.

At the observation time the UI displayed:

`Найдено совпадений: 1327900`

Pagination showed 10 records per page and a last page number of `132790`, consistent with the displayed count.

## Public fields visible in the default result cards

The following fields were directly visible without login:

- ERVK notification number, format `Уxxx/xxxxxxxxx`;
- displayed notice date (`От DD.MM.YYYY`);
- display/business/location name;
- high-level activity class;
- `Работы или услуги`;
- `Коды ОКВЭД` when present;
- `Субъект РФ`;
- `Адрес места осуществления деятельности`;
- `Наименование контрольного органа`.

The default result cards observed in this pass did NOT expose, at least in the rendered accessibility tree:

- INN;
- OGRN/OGRNIP;
- phone;
- email;
- exact submission time;
- declared future start date;
- status/change-history fields.

These may exist in expanded/detail/search states; their public visibility remains `UNKNOWN` until the UI is further interacted with or the public data requests are identified.

## Freshness / same-day evidence

On 2026-09-15, the first page consisted of ten records all displaying `От 15.09.2026`.

The top records used consecutive global sequence suffixes from `001407077` down to `001407068`.

This is direct evidence that records dated the current calendar day are visible in the public list. It materially weakens the old concern that the current public ERVK necessarily has a multi-day/10-day publication delay.

However this observation does NOT prove sub-hour or exact same-day publication latency because:

- the default card exposes only a date, not a submission timestamp;
- the browser connector did not expose the underlying XHR/API request in this pass;
- the exact meaning of `От` must still be tied to the canonical record field.

Current conservative classification:

`PUBLICATION_FRESHNESS = SAME_CALENDAR_DAY_CONFIRMED__EXACT_LATENCY_UNKNOWN`

## Latest 10-record sample

A redacted field-level sample is persisted in `LATEST_10_VISIBLE_RECORDS.csv`.

The ten visible records included:

- multiple retail points;
- four separate `АПТЕКА25.РФ` physical locations in Primorsky Krai;
- two `SNAX` stores in Sakhalin Oblast;
- one public-catering point (`Буфет Елкин Дом`) in Irkutsk Oblast.

This is important for the commercial thesis: the public list is clearly location-level rather than merely one row per legal entity. The same legal/business name appears at multiple distinct physical addresses as separate current records.

That strengthens the `EXISTING_ENTITY_NEW_LOCATION` / physical-point-event use case relative to generic new-entity databases.

## Current limitations

The Opera connector available to the architect can read page content, navigate URLs and take screenshots, but does not expose a generic click/set-value or DevTools network action in the current tool surface. Therefore this pass could not autonomously:

- open `Расширенный поиск`;
- enter a search value;
- change pages through UI controls;
- expand cards if the control changes hidden detail state;
- capture XHR/fetch requests;
- collect 300 records through pagination;
- calculate declared lead-time from submission/start dates.

No attempt was made to inject JavaScript. `javascript:` navigation is explicitly rejected by the browser connector.

## Immediate research implication

R1 is no longer blocked on proof that the live public ERVK can render.

The remaining critical evidence gates are now narrower:

1. expanded/detail public-field matrix;
2. public visibility of `submission datetime` and `declared start date`;
3. machine-access/XHR or another bounded collection route;
4. statistically useful declared lead-time sample;
5. actual-opening verification against maps/sites/social evidence;
6. buyer timing and competition.

Commercial `GO/HOLD/KILL` remains `HOLD` until these are measured.
