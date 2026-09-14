# R1 — Actual opening + buyer timing + competition browser pass

## Role

You are a bounded research executor for R1 in repository `MaksimUnimax/Vsyakaya_huynya`.

This is NOT an implementation task and NOT a sales-outreach task.

The purpose is to determine whether ERVK notifications create a commercially useful lead BEFORE or around a real business opening, and whether Russian competitors already sell the same signal.

## Prerequisite

Read in full:

1. `research/00_RESEARCH_MAP.md`
2. `research/01_START_OF_ACTIVITY_REGISTER.md`
3. `research/evidence/r1_desk_research/README.md`
4. `research/evidence/r1_ervk_browser_probe/README.md`
5. `research/evidence/r1_ervk_browser_probe/SAMPLE_NOTICES_REDACTED.csv`
6. `research/evidence/r1_ervk_browser_probe/LEAD_TIME_ANALYSIS.md`
7. `research/evidence/r1_ervk_browser_probe/PUBLICATION_LATENCY.md`

If the first ERVK browser-probe artifacts do not exist or contain no usable sample, STOP and return:

`R1_ACTUAL_OPENING_PASS = BLOCKED__ERVK_SAMPLE_REQUIRED`

Do not invent substitute notices.

## Hard boundaries

- Public browser research only.
- Do not log in to private accounts.
- Do not contact businesses, owners, suppliers or competitors.
- Do not submit forms, create accounts or buy data.
- Do not bypass CAPTCHA, authentication, geoblocks, anti-bot controls or paywalls.
- Do not use proxy rotation, stealth/fingerprint spoofing or evasion.
- Do not persist unnecessary personal phone/email data.
- Do not claim an opening date from an undated map listing.
- When evidence is insufficient, use `UNKNOWN`.

# PART A — Actual opening evidence

## A1. Sampling

From the ERVK sample, select a balanced bounded sample of up to 120 records, ideally:

- 30 public catering;
- 30 beauty / hairdressing / consumer service;
- 30 auto maintenance / repair;
- 30 retail or another high-volume vertical.

If one vertical has too few records, document the shortage and use another commercially relevant category.

Stratify the sample across declared lead-time buckets where possible:

- same day / <=0;
- 1–3 days;
- 4–7 days;
- 8–14 days;
- 15–30 days;
- >30 days.

## A2. Evidence sources

For each record, search for the earliest reliable public evidence that the PHYSICAL POINT at the ERVK address actually opened or was operating.

Allowed evidence sources:

- Yandex Maps;
- 2GIS;
- official company/venue website;
- official VK / Telegram / social page;
- dated opening announcement;
- dated first review when the review date is clearly visible;
- reputable local/industry publication;
- archived or cached public page only if normally accessible.

Do not use mere company-registration date as opening evidence.

## A3. Evidence confidence

For every record assign:

```text
ACTUAL_OPENING_CONFIDENCE =
  HIGH      # explicit 'we opened' / clear opening date at exact location
  MEDIUM    # first dated review or dated operating evidence at exact location
  LOW       # indirect evidence only
  UNKNOWN
```

Record:

```text
notice_id
vertical
region
activity_address
submission_datetime
declared_start_date
actual_opening_evidence_date
actual_opening_confidence
evidence_type
evidence_url
notes
```

Do not persist personal contacts.

## A4. Metrics

For HIGH/MEDIUM evidence only calculate:

```text
declared_lead_days = declared_start_date - submission_date
real_lead_days = actual_opening_evidence_date - submission_date
declared_vs_real_delta = actual_opening_evidence_date - declared_start_date
```

Report overall and by vertical:

- N usable;
- median real lead days;
- P25/P75/P90;
- % signal before real opening;
- % signal same day;
- % signal after real opening;
- median declared-vs-real delta;
- share HIGH vs MEDIUM evidence.

Also identify cases where the declared date is clearly unreliable.

# PART B — Signal-quality classification

Using ERVK record + external evidence, classify sampled records:

```text
NEW_ENTITY_FIRST_LOCATION
EXISTING_ENTITY_NEW_LOCATION
RELOCATION
CHANGE_ONLY
LATE_NOTIFICATION_EXISTING_POINT
DUPLICATE
UNKNOWN
```

For each vertical report the shares.

Important distinction:

- `NEW_ENTITY_FIRST_LOCATION` competes directly with new-company lead databases;
- `EXISTING_ENTITY_NEW_LOCATION` may be uniquely valuable but could inherit existing suppliers;
- relocation/change/late-notification are potential commercial noise.

# PART C — Buyer timing research

For each of the main verticals that survive Part A, research buyer timing using current Russian sources.

Do NOT merely list things the business buys. Determine whether a vendor can still realistically win the account when the ERVK signal appears.

For each candidate buyer category collect evidence for:

```text
buyer_category
product_or_service
when_selected_relative_to_opening
recurring_or_one_time
switchable_after_opening = YES/NO/PARTLY
approximate_ticket_or_value_basis if publicly supportable
sales_cycle_notes
competition/channel_notes
source_urls
```

Candidate categories may include but are not limited to:

### HoReCa
- recurring food/beverage distribution;
- professional cleaning;
- pest-control;
- linen/laundry;
- maintenance/service contracts;
- delivery/customer acquisition;
- marketing/reputation;
- POS/CRM only if timing evidence supports it.

### Autoservice
- lubricants;
- parts distribution;
- auto chemicals;
- consumables;
- waste/recycling/used-oil services;
- customer acquisition;
- software only if switching/onboarding timing supports it.

### Beauty
- professional cosmetics;
- recurring consumables;
- sterilization/disinfection supplies;
- booking/customer-acquisition services;
- software only if timing supports it.

### Other surviving categories
Research only after ERVK sample shows volume and timing.

Classify each buyer category:

```text
BUYER_FIT =
  TOO_EARLY_FOR_ERVK
  POSSIBLE_AT_OPENING
  STRONG_RECURRING_POST_OPEN
  UNKNOWN
```

For each vertical identify TOP-3 buyer categories based on evidence, not intuition.

# PART D — Competition map

## D1. Direct competition

Search specifically for Russian services selling any of:

- ERVK-derived company/location data;
- notifications/start-of-activity data as leads;
- planned opening/new physical-point feeds before maps;
- opening alerts for HoReCa, beauty, autoservice or retail;
- feeds/API/Telegram of new business locations;
- lead databases where source freshness is tied to government notification/permit data.

Use Russian and English transliterations/queries where useful.

For each competitor record:

```text
name
url
buyer_segment
data_source if disclosed
physical_location = YES/NO
future_start_date = YES/NO/UNKNOWN
new_point_event = YES/NO
contacts = YES/NO
refresh_frequency
product_surface
pricing
API_or_export
Telegram_or_alerts
exclusive_or_shared_leads
notes
```

## D2. Indirect competition

Include at minimum:

- new IP/LLC lead databases;
- Kontur.Focus / SPARK / Seldon class;
- Yandex Maps / 2GIS-derived databases;
- DealRocket / industry contact vendors;
- Parsing.agency / new-chain-point monitoring;
- FMCG/pharma point-universe products such as SellOut+ if current and relevant;
- HoReCa editorial/new-opening channels;
- vertical procurement ecosystems that already give suppliers access to businesses.

## D3. Competitive answer

Answer separately:

1. Is generic new-company data commoditized? (expected yes; verify)
2. Is already-open physical-point data commoditized?
3. Is FUTURE declared physical-point opening data already productized?
4. Is ERVK itself already commercially productized as a lead source?
5. If no exact competitor is found, what is the nearest substitute and why would a buyer switch?

Do not claim `NO COMPETITORS` merely because search did not find one. Use:

`NO_DIRECT_COMPETITOR_FOUND_IN_BOUNDED_SEARCH`.

# PART E — Commercial packaging hypotheses

Do not build a product. Produce testable packaging only.

For each surviving buyer/vertical propose at most 3 minimal forms, e.g.:

```text
weekly CSV
Telegram alert
CRM webhook
```

For each describe:

- exact event sent;
- data fields;
- why it is timely;
- who pays;
- per-lead vs subscription vs territory/exclusive model;
- what existing alternative buyer uses today.

Do not invent pricing unless supported by competitor/current lead-market benchmarks. If unsupported, mark `PRICING_TEST_REQUIRED`.

# PART F — Required artifacts

Create:

```text
research/evidence/r1_actual_opening_and_competition/
  README.md
  ACTUAL_OPENING_SAMPLE_REDACTED.csv
  REAL_LEAD_TIME_ANALYSIS.md
  SIGNAL_QUALITY.md
  BUYER_TIMING_MATRIX.md
  COMPETITION_MAP.md
  COMMERCIAL_PACKAGING.md
  SOURCES.md
```

# Final handoff

Return:

```text
R1_ACTUAL_OPENING_PASS = PASS / PARTIAL / BLOCKED
SAMPLE_SELECTED = N
ACTUAL_OPENING_HIGH_MEDIUM_EVIDENCE = N
MEDIAN_REAL_LEAD_DAYS = ...
P25_REAL_LEAD_DAYS = ...
P75_REAL_LEAD_DAYS = ...
PRE_OPEN_SIGNAL_SHARE = ...
SAME_DAY_SHARE = ...
POST_OPEN_SIGNAL_SHARE = ...
NEW_ENTITY_FIRST_LOCATION_SHARE = ...
EXISTING_ENTITY_NEW_LOCATION_SHARE = ...
NOISE_SHARE = ...
TOP_SURVIVING_VERTICALS = ...
TOP_BUYER_CATEGORIES = ...
DIRECT_COMPETITORS_FOUND = N
ERVK_DIRECT_PRODUCT_FOUND = YES / NO_IN_BOUNDED_SEARCH / UNKNOWN
KEY_BLOCKERS = ...
ARTIFACTS = ...
```

Do NOT issue final GO/HOLD/KILL. The architect will combine this pass with the source probe and desk research.