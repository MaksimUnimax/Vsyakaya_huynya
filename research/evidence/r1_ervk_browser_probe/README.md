# R1 ERVK browser probe

## Result

`R1_ERVK_BROWSER_PROBE = BLOCKED`

The required live public ERVK interface did not become available in the bounded browser session. Both the initial ordinary navigation and the single permitted recovery reload rendered an official Gosuslugi error page instead of the public notice search. No CAPTCHA, authentication prompt, geographic-restriction message, or explicit anti-bot message was shown. The cause is therefore recorded narrowly as a repeatable public-service error in this browser session, not guessed to be anti-bot blocking or general site downtime.

No commercial `GO / HOLD / KILL` decision is made here.

## Execution context

- Execution date: 2026-09-14.
- Observation interval: approximately 13:33:55–13:34:46 UTC.
- Browser/environment: Chrome in the ChatGPT Work cloud-browser environment; normal anonymous public browsing; no authentication.
- Repository base before evidence creation: `162d2de4e16205343178b85609d972c7a271a4d5` on `main`.
- Exact live public URL visited: `https://ervk.gov.ru/public/notices`.
- Search-engine discovery was not used as authority. The requested live ERVK page was the attempted authority.

## Bounded procedure and observed blocker

1. Opened `https://ervk.gov.ru/public/notices` directly in a normal browser tab.
2. The page title was `Ошибка`; the rendered page stated `Во время обработки запроса произошла ошибка` and showed error code `2026-09-14-13-33-55-36806C02340B458E:3`.
3. Captured the initial full-page screenshot.
4. Performed one normal reload as the only recovery attempt.
5. The same error UI rendered again with a distinct code: `2026-09-14-13-34-13-069BF7E6348C0053:3`.
6. Captured the post-reload full-page screenshot and stopped the affected path. No alternate route, proxy, fingerprint change, CAPTCHA handling, authentication, or access-control bypass was attempted.

The two different error codes show that the second observation was a new failed request rather than reuse of the first rendered text. They do not reveal the underlying cause.

## Required handoff fields

```text
R1_ERVK_BROWSER_PROBE = BLOCKED
PUBLIC_RECORDS_ACCESSIBLE = NO
PUBLIC_SUBMISSION_DATE = UNKNOWN
PUBLIC_DECLARED_START_DATE = UNKNOWN
PUBLIC_PHYSICAL_ADDRESS = UNKNOWN
PUBLIC_INN_OGRN = UNKNOWN
PUBLIC_PHONE = UNKNOWN
PUBLIC_EMAIL = UNKNOWN
MACHINE_ACCESS_CLASS = UNKNOWN__PUBLIC_UI_SERVICE_ERROR
PUBLICATION_LATENCY_CLASS = UNKNOWN
NEWEST_PUBLIC_RECORD_AGE_HOURS = UNKNOWN
SAME_DAY_PUBLIC_RECORDS = UNKNOWN
SAMPLE_COUNT = 0
MEDIAN_DECLARED_LEAD_DAYS = UNKNOWN
P25 = UNKNOWN
P75 = UNKNOWN
P90 = UNKNOWN
SAME_DAY_SHARE = UNKNOWN
1_3_DAY_SHARE = UNKNOWN
4_7_DAY_SHARE = UNKNOWN
8_14_DAY_SHARE = UNKNOWN
15_30_DAY_SHARE = UNKNOWN
BLOCKERS = Official public ERVK URL returned the Gosuslugi service-error page on initial navigation and one reload; notice search, results, details and public data requests never became observable.
```

`MACHINE_ACCESS_CLASS` is intentionally not forced into one of the source-transport classes from the prompt. None of `PUBLIC_DOCUMENTED_API`, `PUBLIC_UNDOCUMENTED_XHR`, `PUBLIC_EXPORT`, `HTML_ONLY`, `BROWSER_ONLY`, or `BLOCKED_PUBLIC_AUTOMATION` was proven. In particular, the rendered page contained no evidence that automation itself caused the failure.

## Sample scope

- Sample size: `0` notices.
- Regions covered: none.
- Verticals covered: none.
- Notice-detail views captured: `0`; the public result list was never accessible.
- Result-list screenshots captured: `0`; the public result list was never accessible.
- Blocker screenshots captured: `2`.

The target of at least 300 records and the 50-record noise classification could not start because the public source itself prevented record access. No values were imputed from search snippets, legislation, desk research, or prior assumptions.

## Exact limitations

- Public search filters, result columns, record fields, detail cards, revisions, status/change semantics, and multiple-place representation remain unobserved.
- UI-generated XHR/fetch requests, request schemas, pagination, sorting, and anonymous endpoint behavior remain unobserved because the application did not initialize.
- Newest-record age, same-day visibility, batching behavior, publication latency, lead-time distribution, and regional/vertical breakdowns remain unknown.
- Public visibility of identifiers, addresses, phones, email, representative data, submission time, and declared start date remains unknown.
- The generic service-error page does not establish whether the failure is transient, browser-specific, infrastructure-specific, or universal.

## Privacy handling

No notice records or personal contact details were accessed. The sample CSV contains only the required header row. The screenshots preserve the official blocker page exactly; the displayed IP address belongs to the cloud browser session, not to the user.

## Artifacts

- `README.md` — execution summary and terminal-style handoff.
- `PUBLIC_UI_FIELDS.md` — requested field matrix with evidence states.
- `NETWORK_REQUESTS.md` — network-discovery result and limits.
- `SAMPLE_NOTICES_REDACTED.csv` — schema-only, zero-record sample.
- `LEAD_TIME_ANALYSIS.md` — non-computable analysis with exact denominators.
- `PUBLICATION_LATENCY.md` — blocked latency gate.
- `SOURCE_FEASIBILITY.md` — cautious source-access classification.
- `BLOCKER_EVIDENCE.md` — exact attempt ledger and screenshot hashes.
- `screenshots/01_initial_error_code_2026-09-14-13-33-55.jpg` — initial blocker.
- `screenshots/02_reload_error_code_2026-09-14-13-34-13.jpg` — blocker after the single reload.
