# R1 — ERVK browser probe

## Role

You are a bounded research executor for the R1 study in repository `MaksimUnimax/Vsyakaya_huynya`.

This is NOT a product implementation task. Do not build a SaaS, collector, bot, extension, or production integration.

The goal is to close the evidence gap around the public Unified Register of Notifications on commencement of business activities (ЕРВК / реестр уведомлений), especially `https://ervk.gov.ru/public/notices`.

## Hard boundaries

- Use a normal browser and normal public access only.
- Do NOT log in or use private accounts unless explicitly instructed by the owner later.
- Do NOT bypass CAPTCHA, geoblocks, authentication, anti-bot controls, rate limits, or other access controls.
- Do NOT use proxy rotation, stealth plugins, fingerprint spoofing, or evasion techniques.
- Do NOT submit any forms that create/update/terminate notices.
- Read-only public research only.
- Do NOT collect or publish more personal data than needed for the research question.
- If the site exposes phone/email publicly, record whether those fields exist and their visibility, but for samples persist redacted values unless exact values are necessary to prove a field exists.
- Use low request volume. A bounded sample is enough.

## Repository authority

Read in full before work:

1. `research/00_RESEARCH_MAP.md`
2. `research/01_START_OF_ACTIVITY_REGISTER.md`

Treat them as the research contract.

## Primary questions

### A. Public UI and data structure

Open the public notice-search interface and document:

1. all visible search filters;
2. all visible result columns/fields;
3. all fields shown in a notice detail/card;
4. whether multiple places of activity are represented separately;
5. how statuses/changes/termination are represented;
6. whether submission date/time is public;
7. whether declared start date is public;
8. whether activity type / OKVED is public;
9. whether physical address is public;
10. whether company identifiers (INN, OGRN/OGRNIP) are public;
11. whether representative name / phone / email are public;
12. whether historical revisions are visible.

Take screenshots of the search page, one result list, and at least 3 representative notice-detail views if the browser environment permits screenshots. Do not screenshot secrets or authenticated/private data.

### B. Network/XHR discovery

Using the browser's normal network/devtools capabilities, identify how the public UI obtains data.

For every relevant request, record:

- request URL;
- HTTP method;
- query/body parameters;
- pagination model;
- sort/filter parameters;
- response content type;
- response schema / field names;
- whether request works anonymously;
- whether a documented public API/export endpoint exists.

Do not reverse-engineer protected authentication. We only care about requests the public page itself makes during ordinary use.

### C. Bounded recent sample

If public access permits it, obtain a bounded sample of recent notices sufficient for preliminary lead-time analysis.

Target sample:

- at least 300 notices total if readily available without aggressive crawling;
- preferably across Moscow, Saint Petersburg, Moscow Oblast and one smaller region;
- target verticals where data permits:
  - public catering / OKVED 56;
  - beauty / hairdressing / consumer services;
  - auto maintenance / repair;
  - retail;
  - other frequent categories.

For each sampled notice capture only research-relevant fields:

```text
notice_id
submission_datetime
declared_start_date
status
inn
ogrn_or_ogrnip
legal_name
activity_code_or_type
activity_place_name
activity_address
region
competent_authority
change_date if present
termination_date if present
source_url_or_public_record_id
```

If phone/email or representative data are public, record booleans such as `public_phone_present=true` and `public_email_present=true`; do not persist exact personal values in the research dataset unless needed for a field-level proof.

### D. Declared lead-time analysis

For all records with valid dates compute:

`declared_lead_days = declared_start_date - date(submission_datetime)`

Report:

- sample count;
- missing-date count;
- negative lead count;
- same-day count;
- median;
- mean;
- P25;
- P75;
- P90;
- buckets:
  - same day / <=0;
  - 1–3 days;
  - 4–7 days;
  - 8–14 days;
  - 15–30 days;
  - 31–60 days;
  - >60 days.

Repeat by vertical and by region where sample size is sufficient. Never claim national representativeness from a small regional sample.

### E. New-point vs change noise

On at least 50 sampled records, inspect whether the record appears to be:

```text
NEW_BUSINESS_NEW_LOCATION
EXISTING_BUSINESS_NEW_LOCATION
RELOCATION
CHANGE_ONLY
LATE_NOTIFICATION_EXISTING_POINT
DUPLICATE
UNKNOWN
```

Use only evidence visible in the public record and basic public company lookup. Do not guess when evidence is insufficient.

### F. Machine-access feasibility

Classify the source:

```text
PUBLIC_DOCUMENTED_API
PUBLIC_UNDOCUMENTED_XHR
PUBLIC_EXPORT
HTML_ONLY
BROWSER_ONLY
BLOCKED_PUBLIC_AUTOMATION
```

Estimate what a future low-frequency read-only collector would require, but DO NOT implement it.

## Stop conditions

Immediately stop the affected path and report `BLOCKED` if ordinary public browsing encounters:

- CAPTCHA or anti-bot gate that cannot be passed through normal human browsing;
- mandatory authentication;
- access-control/geographic restriction;
- need to defeat TLS/app protections;
- a requirement for high-volume scraping to answer the question.

Do not bypass the block.

## Required artifacts

Create under the repository (or provide them in the handoff if the environment cannot commit):

```text
research/evidence/r1_ervk_browser_probe/
  README.md
  PUBLIC_UI_FIELDS.md
  NETWORK_REQUESTS.md
  SAMPLE_NOTICES_REDACTED.csv
  LEAD_TIME_ANALYSIS.md
  SOURCE_FEASIBILITY.md
  screenshots/   # only if allowed/available
```

`SAMPLE_NOTICES_REDACTED.csv` must not contain private credentials or unnecessary personal phone/email values.

## README.md must include

- execution date/time and timezone;
- browser/environment used;
- exact public URLs visited;
- sample size;
- regions/verticals covered;
- any blocks encountered;
- exact limitations;
- list of artifacts created.

## Final handoff

Return a concise terminal/report-style handoff with:

```text
R1_ERVK_BROWSER_PROBE = PASS / PARTIAL / BLOCKED
PUBLIC_RECORDS_ACCESSIBLE = YES / NO
PUBLIC_SUBMISSION_DATE = YES / NO / UNKNOWN
PUBLIC_DECLARED_START_DATE = YES / NO / UNKNOWN
PUBLIC_PHYSICAL_ADDRESS = YES / NO / UNKNOWN
PUBLIC_INN_OGRN = YES / NO / UNKNOWN
PUBLIC_PHONE = YES / NO / UNKNOWN
PUBLIC_EMAIL = YES / NO / UNKNOWN
MACHINE_ACCESS_CLASS = ...
SAMPLE_COUNT = N
MEDIAN_DECLARED_LEAD_DAYS = N / UNKNOWN
P25 = ...
P75 = ...
SAME_DAY_SHARE = ...
1_3_DAY_SHARE = ...
4_7_DAY_SHARE = ...
8_14_DAY_SHARE = ...
15_30_DAY_SHARE = ...
BLOCKERS = ...
ARTIFACTS = ...
```

Do not make a commercial GO/HOLD/KILL decision. The architect will combine this evidence with competition, buyer timing, economics and actual-opening research.