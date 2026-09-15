# R1 — Preliminary signal-precision audit of fresh ERVK notices

## Status

`RAW_PREOPEN_SIGNAL_PRECISION = FAIL_ON_INITIAL_SAMPLE`

Execution date: 2026-09-15.

This is a bounded preliminary audit of the first 10 fresh public ERVK notice rows observed in the live current register. It is not a nationally representative sample, but it is strong enough to falsify the naive thesis that a fresh ERVK row can be treated as a newly opening physical point without further qualification.

## Primary finding

Of the first 10 fresh rows, at least **9/10** have evidence that the physical point/operator/location existed before the 2026-09-15 ERVK notice, or that the exact commercial location was already in active use long before the notice.

Therefore:

`fresh ERVK notice != new opening`

The raw feed contains material noise from late notifications, operator/legal-entity changes, re-filings, existing-chain points, and/or other administrative events.

A commercial product cannot sell the raw feed as "businesses about to open".

## Initial 10-record review

### 1. Cafe "Мимино", Хабаровск, ул. Серышева, 42

ERVK notice date: `2026-09-15`.

External evidence: the exact cafe/address is an established point with hundreds of ratings/reviews in public maps/directories well before the ERVK notice.

Classification: `LATE_OR_ADMINISTRATIVE_NOTICE__EXISTING_POINT`.

### 2. SNAX, Южно-Сахалинск, ул. Фархутдинова, 3

ERVK notice date: `2026-09-15`.

External evidence:
- official SNAX site lists the exact point as operating;
- public map data indexed the exact point months before the notice;
- official SNAX news in 2025 described this address as an upcoming/opening store long before the 2026 ERVK notice.

The ERVK detail response identifies the current operator as IP Poklitar T.I., registered 2026-06-03. Thus the 2026 notice can coexist with a physical point that predates the current legal operator.

Classification: `NEW_OR_CHANGED_OPERATOR__EXISTING_PHYSICAL_POINT`.

### 3. ИП Конных А.В., Находка, Угольная 13, склад 4/5

ERVK notice date: `2026-09-15`.

External evidence:
- public procurement/supplier records show IP Konnykh A.V. using `Угольная, 13, склад №4/5` as a food-supply warehouse at least in 2022;
- business directories also show IP Konnykh A.V. as a long-running food wholesale company in Nakhodka.

Classification: `EXISTING_OPERATOR_AND_LOCATION`.

### 4. "Хороший День", Находка, ул. Сидоренко, 1

ERVK notice date: `2026-09-15`.

Detail response identifies IP Abdurakhmonova S.A., registered 2026-05-21.

No sufficiently strong exact-point pre-notice evidence has yet been established.

Classification: `UNKNOWN__POSSIBLE_NEW_POINT`.

### 5. Аптека25.рф, Владивосток, Борисенко 35

ERVK notice date: `2026-09-15`.

External evidence: the pharmacy at the same base address was already listed in public maps/directories months before the ERVK notice.

Classification: `LATE_OR_ADMINISTRATIVE_NOTICE__EXISTING_POINT`.

### 6. Хлеб-Соль, Ангарск, 254-й квартал, 3

ERVK notice date: `2026-09-15`.

External evidence: company/news sources report the exact store opened on **2015-05-29**. Current company store listings continue to list the same address.

Classification: `CONFIRMED_LONG_EXISTING_POINT`.

### 7. Аптека25.рф, Владивосток, Сочинская 15

ERVK notice date: `2026-09-15`.

External evidence: exact pharmacy/address present in public maps/directories months before the notice.

Classification: `LATE_OR_ADMINISTRATIVE_NOTICE__EXISTING_POINT`.

### 8. SNAX, Южно-Сахалинск, Космонавта Поповича 65

ERVK notice date: `2026-09-15`.

External evidence: official SNAX 2025 news identifies this as the first Sakhalin store, already operating long before the 2026 notice.

Classification: `NEW_OR_CHANGED_OPERATOR__EXISTING_PHYSICAL_POINT`.

### 9. Аптека25.рф, Владивосток, Станюковича 12

ERVK notice date: `2026-09-15`.

External evidence: exact pharmacy/address already present in 2GIS/VL and other directories months before the notice.

Classification: `LATE_OR_ADMINISTRATIVE_NOTICE__EXISTING_POINT`.

### 10. Аптека25.рф, Владивосток, Ватутина 6

ERVK notice date: `2026-09-15`.

External evidence: exact pharmacy/address already present in public directories months before the notice; a March 2026 directory update already listed this address.

Classification: `LATE_OR_ADMINISTRATIVE_NOTICE__EXISTING_POINT`.

## Quantitative preliminary result

Initial sample: `10`.

- confirmed/strong evidence existing before current notice: `9`;
- unresolved / possible true new point: `1`;
- raw-new-opening precision upper bound on this tiny sample: `<=10%`;
- raw false-positive/noise share for the naive new-opening thesis: `>=90%`.

Do NOT generalize the 90% figure nationally from this sample. The correct conclusion is narrower: **raw notice freshness is not sufficient evidence of a new opening**.

## Important mechanism evidence

The SNAX case demonstrates the key failure mode cleanly:

1. physical store existed before the current ERVK notice;
2. current ERVK detail points to an IP registered in June 2026;
3. ERVK notice appears in September 2026.

This supports an `operator/legal-entity change at an existing physical point` interpretation and shows why entity-registration recency alone cannot identify a greenfield opening.

The Apteka25 cluster is another strong warning: several already-running branches appeared as same-day fresh ERVK rows together, consistent with a chain/operator administrative event rather than multiple simultaneous new openings.

## Consequence for the product thesis

The original simple product:

`fresh ERVK row -> new business about to open -> sell lead`

is **rejected**.

R1 remains alive only as a derived-signal problem:

`ERVK event + legal-entity age + map/directory existence + brand/location history + event/change semantics -> qualified commercial-intent event`

Potential useful classes after enrichment:

- `TRUE_NEW_POINT_HIGH_CONFIDENCE`;
- `EXISTING_CHAIN_NEW_LOCATION`;
- `NEW_OPERATOR_EXISTING_LOCATION`;
- `LATE_NOTICE_EXISTING_POINT`;
- `RELOCATION_OR_CHANGE`;
- `UNKNOWN`.

The commercial question is now whether `TRUE_NEW_POINT_HIGH_CONFIDENCE` and `EXISTING_CHAIN_NEW_LOCATION` can be isolated cheaply enough and at sufficient volume to justify a product.

## Sources used in this bounded audit

- live ERVK public list/detail via the owner's local Opera browser;
- official SNAX store/news pages;
- 2GIS and regional business directories;
- public company directories based on state registry data;
- historical public procurement/supplier records;
- historical company opening announcement for Khleb-Sol.

No contact-list scraping or private data collection was required.

## Next gate

Do NOT spend effort estimating declared lead time until signal semantics are clarified.

Next R1 work should prioritize:

1. determine why fresh notices for long-existing points are created (new operator, re-notification, change, transfer, legal requirement, etc.);
2. inspect whether a public history/change endpoint exists;
3. test whether newly registered entities plus map absence improves precision;
4. estimate true-new-point volume after dedupe/enrichment;
5. only then run buyer-value and unit-economics evaluation.
