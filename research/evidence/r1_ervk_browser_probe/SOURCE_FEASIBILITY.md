# ERVK source feasibility

## Result

`SOURCE_FEASIBILITY = BLOCKED`

The public notice URL was reachable only as an official Gosuslugi service-error page in this bounded anonymous Chrome session. Notice data and the notice-search application were not accessible.

## Machine-access classification

```text
MACHINE_ACCESS_CLASS = UNKNOWN__PUBLIC_UI_SERVICE_ERROR
```

The source cannot responsibly be classified as any prescribed transport class from this run:

| Candidate class | Proven? | Reason |
|---|---|---|
| `PUBLIC_DOCUMENTED_API` | No | No API documentation or endpoint was observable. |
| `PUBLIC_UNDOCUMENTED_XHR` | No | Notice application did not initialize; no data XHR/fetch was observable. |
| `PUBLIC_EXPORT` | No | No export UI or endpoint was observable. |
| `HTML_ONLY` | No | The intended notice content did not render. |
| `BROWSER_ONLY` | No | Browser access did not reach notice data. |
| `BLOCKED_PUBLIC_AUTOMATION` | No | Access was blocked in practice, but the page gave no evidence that automation caused the failure. |

## Collector implications

A future low-frequency read-only collector cannot be scoped from this evidence. The following remain unknown:

- stable public endpoint(s);
- anonymous-access behavior;
- request method and schema;
- pagination and maximum page size;
- sort and filter parameters;
- rate behavior;
- change/history semantics;
- export availability;
- whether browser rendering is required.

No production collector, replay script, endpoint probe, or alternate access path was implemented.

## Safe next evidence condition

The same bounded probe may be repeated only in a later authorized execution when ordinary public ERVK browsing renders the notice search. A later run should not assume this session's service error is permanent or universal, and should retain the original requirements of a 300-record sample, 20-newest-record latency check, 50-record noise review, and low request volume.
