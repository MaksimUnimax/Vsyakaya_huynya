# R1 desk research — ERVK start-of-activity lead engine

## Status

`DESK_RESEARCH_IN_PROGRESS__BROWSER_PROBE_REQUIRED`

This file persists evidence collected before the live ERVK browser/sample pass. It is not a final GO/HOLD/KILL verdict.

Last updated: 2026-09-14.

## 1. Core correction: the underlying register is not a new 2025 invention

Registers of notifications on commencement of activity existed long before 2025. The commercial thesis therefore must NOT be marketed as “a brand-new government database”.

The material changes relevant to R1 are:

- 2024 reform centralized the notification flow in the Unified Register and Gosuslugi workflow;
- current records are structured around actual activity locations and declared activity start;
- 2025 Decree No. 725 replaced the prior rules from 1 September 2025 and standardized the current regime.

Commercial value, if any, must come from **future start date + physical activity location + activity type + entity identifier + event/change semantics**, not from novelty of the register.

Key sources:

- Government Decree No. 725, 27.05.2025 (current rules): https://www.consultant.ru/document/cons_doc_LAW_506214/
- current notice form: https://www.consultant.ru/document/cons_doc_LAW_506214/6e1a8ec29760fb25c10b18d4bca60ae72cdf7d4d/
- Rospotrebnadzor current description: https://www.44.rospotrebnadzor.ru/Registraciya_uvedoml/6725/

## 2. Current source semantics

The notification must be submitted after state registration/tax registration but **before actual performance of the notified work/services**.

The current notice form includes:

- entity/IP identity;
- INN and OGRN/OGRNIP;
- legal address;
- actual place(s) of notified activity;
- notified activity/work/services;
- declared start date.

The Unified Register’s legal schema also contains operational fields such as submission date/time, start date, status, change/termination information, competent authority, activity codes and activity-place information.

Important caveat: legal presence of phone/email/representative fields in the register does **not** prove those fields are exposed in the public UI. Public-field visibility remains browser-probe evidence.

Sources:

- Federal Law Article 8 (submission before actual activity): https://www.consultant.ru/document/cons_doc_LAW_83079/bee4fe4ca4e76ef8f2352c1ee26a65200dc4f2ed/
- current form: https://www.consultant.ru/document/cons_doc_LAW_506214/6e1a8ec29760fb25c10b18d4bca60ae72cdf7d4d/
- FMBA current guidance: https://mru81.fmba.gov.ru/deyatelnost/gosudarstvennye-uslugi/2/

## 3. Physical-location signal

Current practice/guidance states that the actual place of activity is entered in the notification. Current industry guidance also states a notice is filed for each place of activity.

This is commercially important because it potentially distinguishes R1 from generic “new LLC/IP” lead databases:

- generic database: `NEW_ENTITY`;
- ERVK: potentially `ENTITY X -> ACTIVITY Y -> PHYSICAL LOCATION Z -> DECLARED_START_DATE`.

An existing legal entity may therefore create a new physical point without appearing in a “new company” feed.

Source examples:

- Rospotrebnadzor filing algorithm with exact actual address + declared start date: https://pda.04.rospotrebnadzor.ru/index.php/press-center/press-reliz/20123-03072025.html
- Honest Mark community guidance: https://markirovka.ru/community/system-data/uvedomlenie-o-nachale-osushchestvleniya-predprinimatelskoy-deyatelnosti-2026

## 4. Critical timing risk

Law only requires filing before actual activity; it does not create a large mandatory advance window.

Practical business/legal guidance commonly recommends filing only shortly before launch (often a few days / 2–3 days before launch). Therefore the Western “license application months before opening” economics must not be transferred to ERVK without measurement.

### Preliminary implication

Likely poor buyer segments when ERVK is the only signal:

- renovation/build-out contractors;
- kitchen fit-out;
- ventilation/HVAC installation;
- heavy auto-service equipment;
- core salon equipment/furniture;
- other vendors normally selected well before launch.

Likely better buyer classes:

- recurring supplies/consumables;
- distributors that can replace/augment an incumbent supplier after launch;
- marketing/delivery/reputation/customer-acquisition services;
- recurring maintenance/cleaning/pest-control/service contracts;
- services that can be adopted immediately at launch with little implementation time.

Sources used for practical workflow validation:

- restaurant/opening guidance from T-Business Secrets (2026): https://secrets.tbank.ru/
- autoservice workflow showing equipment and CRM before the first customer: https://xcrm.pro/blog/kak-otkryt-avtoservis
- restaurant franchise launch sequence: https://yasno.rest/

## 5. Publication-latency risk

This is a separate timing variable from `declared_start_date - submission_date`.

Old regional public-register workflows could publish registered notice information on the public Rospotrebnadzor website only within up to 10 calendar days after registration. Example current/transition-era filing algorithm still mentions a 10-calendar-day public-site publication period:

https://pda.04.rospotrebnadzor.ru/index.php/press-center/press-reliz/20123-03072025.html

Current ERVK ingestion is described as automated, but **desk research has not proved that public ERVK visibility is immediate**.

If:

- a business files 2–3 days before launch; and
- the public record is visible several days later,

then pre-opening commercial value may collapse.

The live browser probe therefore treats publication latency as a mandatory gate.

## 6. Current activity universe

The current notification regime covers multiple commercially relevant verticals, including subsets of:

- household/consumer services;
- beauty/hairdressing;
- auto maintenance/repair;
- public catering;
- retail;
- certain wholesale activities;
- certain food/beverage manufacturing;
- furniture and packaging;
- building-material related production;
- travel agencies and other listed activities.

Exact code coverage must be normalized to the current Decree No. 725 appendix before any collector/business model is defined.

Sources:

- Decree 725 current appendix/rules: https://www.consultant.ru/document/cons_doc_LAW_506214/
- Rospotrebnadzor current explanation: https://www.44.rospotrebnadzor.ru/Registraciya_uvedoml/6725/

## 7. Volume evidence

There is enough raw notification volume to justify continued research.

Examples found during desk research include:

- Moscow: roughly 16,000 notices during 2025 according to the annual Rospotrebnadzor reporting referenced in research;
- regional annual volumes commonly in the low thousands;
- regional composition examples show retail and catering as large components.

These are **not** yet treated as stable current 2026 addressable-lead volumes because:

- rules/categories changed during the 2025 transition;
- notices include changes and potentially non-greenfield events;
- one entity may generate multiple place/activity events;
- only a subset may be commercially useful.

The browser sample must produce a current 2026 vertical/region breakdown.

## 8. Competition — generic lead databases

The Russian market for generic company/contact leads is crowded and cheap.

Observed classes:

- new IP/LLC datasets;
- industry contact databases;
- Yandex Maps/2GIS derived databases;
- direct-contact enrichment;
- CRM-ready lead lists.

Examples:

- DealRocket autoservice/contact database: https://dealrocket.ru/baza_avtoservisov/
- DomeNGOOD beauty base: https://domengood.ru/download/catalog/36/
- DomeNGOOD autoservice base: https://domengood.ru/download/catalog/15/
- Parsing.agency chain-point monitoring: https://parsing.agency/chain-points-lists

### Preliminary decision

`GENERIC_NEW_COMPANY_DATABASE = KILL`

R1 is only interesting if it can deliver a **materially fresher/high-intent event** that those databases do not: a new physical activity point with an explicit start date.

## 9. Competition — physical point / opening data

There is real competition around already-active/newly-observed points:

- chain-point monitoring services track opened/closed points and provide files/feeds/APIs;
- FMCG/pharma point-universe vendors provide broad active-point datasets;
- maps/contact databases expose current operating points;
- HoReCa editorial channels publish actual or imminent openings.

Concrete example:

- Parsing.agency monitors 1,900+ chains and provides newly opened/closed locations: https://parsing.agency/chain-points-lists
- Moscow restaurant openings are actively covered by channels such as RaidedRests: https://t.me/s/raidedrests

This reinforces the same commercial requirement:

**R1 must win on EARLY signal, not on “we know a point exists”.**

If ERVK public data arrives only after opening, R1 loses against maps/editorial/universe datasets.

## 10. Buyer timing — preliminary rejection/hold map

### 10.1 HoReCa

Evidence from restaurant-opening workflows places:

- premises;
- renovation/fit-out;
- core equipment;
- initial supply setup;

before opening.

Therefore these are currently `WEAK_FOR_ERVK_ONLY`.

More promising:

- recurring food/beverage distribution;
- alternative/secondary suppliers;
- delivery/customer-acquisition channels;
- recurring cleaning/pest/service contracts;
- operational consumables.

The recurring nature matters because a signal near opening can still create a sale after the venue starts.

Relevant market evidence:

- PromoPult HoReCa supplier page describes restaurants repeatedly buying from existing suppliers or METRO, showing supplier switching/ongoing procurement remains an operational problem: https://partner.promopult.ru/prodvizhenie-horeca-postavschika.html
- Chibbis explicitly markets customer acquisition to new restaurants: https://academy.chibbis.ru/new-partners

### 10.2 Autoservice

Current opening guides place equipment and CRM before first customer, so:

- lifts/heavy equipment = `WEAK`;
- initial workshop tooling = `WEAK`;
- prelaunch CRM = `WEAK/MEDIUM` depending publication lead;

Potential recurring categories remain:

- lubricants;
- chemicals;
- parts/distribution;
- consumables;
- marketing/customer acquisition;
- ongoing software if switching is realistic.

Source: https://xcrm.pro/blog/kak-otkryt-avtoservis

### 10.3 Beauty

Core fit-out/equipment likely occurs too early. Recurring professional cosmetics and consumables remain commercially plausible, but channel competition is meaningful. In 2026 YCLIENTS integrated procurement with iBT.ru, giving suppliers direct access to tens of thousands of beauty businesses.

Source: https://www.yclients.com/journal/news/yclients-i-ibt-ru-uprostili-zakupku-kosmetiki-dlya-salonov-krasoty

Therefore beauty recurring-supplies is `HOLD`, not an obvious first vertical.

### 10.4 Retail

Generic retail has strong existing location/universe/data competition. Unless ERVK is demonstrably pre-open and near-real-time, retail is `WEAK/HOLD`.

## 11. New-entity vs existing-entity point expansion

R1 must explicitly segment:

```text
NEW_ENTITY_FIRST_LOCATION
EXISTING_ENTITY_NEW_LOCATION
RELOCATION
CHANGE_ONLY
LATE_NOTIFICATION_EXISTING_POINT
UNKNOWN
```

Why:

- `NEW_ENTITY_FIRST_LOCATION` is more likely to need broad vendor relationships but overlaps with generic new-company feeds;
- `EXISTING_ENTITY_NEW_LOCATION` can be uniquely visible at location level but may already inherit suppliers centrally;
- relocation/change events may be false positives for many buyers.

This segmentation is mandatory before unit economics.

## 12. Actual-opening evidence design

Declared start date is not enough.

For a bounded sample the project must collect a third timestamp when possible:

```text
submission_datetime
declared_start_date
first_external_opening_evidence_date
```

External evidence sources may include:

- Yandex Maps / 2GIS;
- official site;
- VK/Telegram;
- dated opening announcement;
- first public review.

The comparison produces:

```text
declared_lead_time = declared_start_date - submission_date
real_lead_time = first_external_opening_evidence_date - submission_date
```

Without this, R1 cannot claim “X days before opening”.

## 13. Machine access / unresolved browser gap

The public URL is:

https://ervk.gov.ru/public/notices

Normal research tooling currently receives HTTP 403 and the attached Opera browser connector is not connected.

This is **not** treated as absence of data.

A bounded Work/Codex browser research prompt has been persisted at:

`research/prompts/R1_ERVK_BROWSER_PROBE.md`

It requires:

- public UI field inventory;
- public XHR/network discovery;
- publication-latency measurement;
- a bounded recent sample;
- declared lead-time distribution;
- new-point/change noise classification;
- source-feasibility classification.

No final commercial verdict is allowed before this evidence returns.

## 14. Preliminary thesis

Current evidence does NOT support “months-early new-business leads”.

The strongest remaining R1 hypothesis is narrower:

> ERVK may be a high-intent, near-opening physical-location event that can outperform generic new-company/contact databases for **recurring goods/services that are still sellable at launch or immediately after launch**.

The hypothesis survives only if the browser sample proves:

1. public ERVK publication is near-real-time or at least same-day;
2. a meaningful share of notices have positive lead time;
3. physical-location precision is high;
4. the source identifies new points rather than mostly changes/late filings;
5. enrichment/contact cost is acceptable;
6. direct competitors are not already productizing the same ERVK signal.

Current R1 verdict: `HOLD__BROWSER_AND_SAMPLE_EVIDENCE_REQUIRED`.
