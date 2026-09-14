# Public ERVK network/XHR discovery

## Result

`NETWORK_DISCOVERY = BLOCKED_BEFORE_APPLICATION_INITIALIZATION`

The browser navigated anonymously to:

```text
https://ervk.gov.ru/public/notices
```

The top-level navigation rendered the official Gosuslugi service-error document on the initial request and again after one reload. The ERVK notice-search application did not initialize, so it generated no observable search/results traffic from which an XHR/fetch contract could be documented.

## Request inventory

| Request purpose | URL | Method | Parameters/body | Pagination/sort/filter | Response content type/schema | Anonymous behavior |
|---|---|---|---|---|---|---|
| Top-level public-page navigation | `https://ervk.gov.ru/public/notices` | Browser navigation (`GET`) | None supplied | None supplied | Official rendered error document; raw content type and HTTP status were not exposed by the browser surface | Reached error document without login on both attempts |
| Notice list XHR/fetch | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | Not exercised; application did not initialize |
| Notice detail XHR/fetch | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | Not exercised; no notice was accessible |
| Export/API endpoint | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | Not discoverable from the failed UI |

## What was and was not observed

- Two distinct server-rendered error codes were visible, one per attempt.
- No CAPTCHA, login form, geographic restriction, rate-limit message, security-screening text, or explicit automation/bot message was rendered.
- No notice JSON schema, request body, query parameter, cursor/page number, sort field, filter syntax, public API documentation, or export control was observable.
- Browser console messages originating from the ChatGPT browser extension were excluded from ERVK evidence; they do not describe the target site's network behavior.

No endpoint guessing, source-code crawling, alternate-route probing, authentication analysis, or protected-request replay was attempted.
