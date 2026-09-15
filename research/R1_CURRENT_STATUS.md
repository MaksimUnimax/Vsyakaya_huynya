# R1 CURRENT STATUS — 2026-09-15

`R1 = HOLD__RAW_PREOPEN_THESIS_REJECTED__QUALIFIED_SIGNAL_THESIS_UNDER_TEST`

## What is now verified

- Live current ERVK public register is accessible in the owner's local Opera browser.
- Earlier ChatGPT Work failure is environment-specific, not proof of a global outage.
- Same-calendar-day notices are publicly visible.
- Public list XHR exists and returns structured JSON.
- Public list endpoint schema includes notice id/number/date, activity, work/service, OKVED, region, physical location name/address, control authority and filter dictionaries.
- Public detail endpoint pattern is confirmed:
  - `GET /portal/public/notices/{id}`
- Public detail data exposes legal-entity identity, INN, OGRN/OGRNIP, detailed OKVED, physical point, activity and `terminated`.
- Public list/detail requests use a frontend `Token` header plus normal browser session/XSRF state; exact token values/cookies are not persisted in research artifacts.
- `synchronizationDttm` is associated with legal-entity synchronization and is NOT treated as filing time.
- The ordinary list/detail response does NOT expose declared future activity start date or exact submission time.

## Critical new result

A bounded audit of the first 10 fresh notices shows at least 9/10 correspond to physical points/operators that existed before the current ERVK notice or have strong pre-existing-location evidence.

Therefore the naive thesis:

`fresh ERVK notice = new business about to open`

is rejected.

See:

`research/evidence/r1_signal_precision_preliminary/README.md`

## Current product thesis

R1 survives only if we can cheaply classify fresh ERVK events into useful commercial states:

- `TRUE_NEW_POINT_HIGH_CONFIDENCE`
- `EXISTING_CHAIN_NEW_LOCATION`
- `NEW_OPERATOR_EXISTING_LOCATION`
- `LATE_NOTICE_EXISTING_POINT`
- `RELOCATION_OR_CHANGE`
- `UNKNOWN`

A raw alert feed has no acceptable commercial precision.

## Highest-priority next questions

1. Why do long-existing points receive fresh current ERVK notices?
2. Is a public history/revision/change endpoint available?
3. Can legal-entity age + map/directory existence + point/brand history isolate true new points with useful precision?
4. What is the surviving lead volume after qualification?
5. Which buyers still have a purchasing decision open at the moment the qualified signal appears?
6. Does any competitor already provide this qualified result?

## Current commercial status

`HOLD`

Not `GO`: raw signal quality failed the first precision check.

Not yet `KILL`: the official feed is rich, current, physical-location-level, and may support a higher-value qualified-event product if true new points/new locations can be isolated automatically.
