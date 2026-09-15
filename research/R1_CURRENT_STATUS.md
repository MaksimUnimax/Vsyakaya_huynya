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
- UI route query parameters such as `?page=N&size=N` are ignored for list pagination; prior apparent variation was caused by new live records arriving. Public API pagination therefore cannot be assumed from UI URL navigation.

## Critical new result — raw signal precision failed

A bounded audit of the first 10 fresh notices shows at least 9/10 correspond to physical points/operators that existed before the current ERVK notice or have strong pre-existing-location evidence.

Therefore the naive thesis:

`fresh ERVK notice = new business about to open`

is rejected.

See:

`research/evidence/r1_signal_precision_preliminary/README.md`

## Why this noise exists — now supported by current rules

Current Rospotrebnadzor guidance under Government Decree No. 725 states:

- legal-entity address / IP residence / reorganization changes can flow automatically from EGRUL/EGRIP;
- when the **actual place of activity changes**, a notification is filed on the day of the actual change;
- the previous notification is terminated and a **new notification** is formed.

This makes ERVK a register of current notification events, not a clean greenfield-opening feed.

The migration/registry design also explicitly includes an `old notice number` concept and separate notice rows per physical place.

This explains the observed cases where long-running points receive current-day notice rows and why `noticeDate` alone cannot be interpreted as opening date.

## Competition — direct analog found

A direct Russian service already sells the qualified result that R1 would need after raw ERVK filtering failed:

`Parsing.agency / Новые компании на карте`

It publicly advertises:

- monitoring of new organizations/points across Yandex Maps, Google Maps, 2GIS, catalogs and registries;
- false-opening filtering for relocations, renames and duplicates;
- distinction between a new company and a new network branch;
- phone/email/site enrichment;
- files, feed, API and web interface;
- daily/hourly schedules;
- fresh point delivery within 1–2 days after source appearance in daily mode;
- project pricing from `$150`.

See:

`research/evidence/r1_competition/README.md`

Generic new-company leads are also strongly commoditized by products such as Спрос.Радар and DealRocket.

Therefore:

`R1_COMPETITIVE_ADVANTAGE = UNPROVEN`

R1 must prove it can detect a valuable event **earlier than map/catalog monitoring** or classify a different high-intent transition that those competitors do not sell.

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

1. Can the public event/history/old-notice linkage distinguish `actual place changed` / prior notice / new operator from a true new point?
2. Can legal-entity age + map/directory absence + same-address/brand history isolate true new points with useful precision?
3. What share/volume of fresh ERVK events survives that qualification?
4. For surviving true-new events, does ERVK appear **before** Yandex/2GIS/Google/catalog sources?
5. Which buyers still have a purchasing decision open at that moment?
6. Can ERVK beat or complement Parsing.agency at a lower acquisition cost or with an earlier signal?

## Current commercial status

`HOLD`

Not `GO`:
- raw signal precision failed;
- direct qualified-result competitor exists;
- original declared-start-date field is not exposed by ordinary public list/detail API.

Not yet `KILL`:
- the official feed is same-day, structured and physical-location-level;
- a true pre-map opening subset may still exist;
- ERVK may expose administrative transition semantics that map-based competitors detect later or not at all.

### Next kill gate

Move to `KILL` if a bounded enriched sample shows either:

- true new points/new locations are too rare or too expensive to distinguish; or
- qualified ERVK events do not appear materially before the direct competitor's map/catalog signals.
