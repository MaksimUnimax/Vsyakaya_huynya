# Public ERVK UI field inventory

## Evidence state

`BLOCKED_BEFORE_NOTICE_UI`

The requested public URL rendered an official Gosuslugi service-error page on both allowed attempts. The notice search, results table, and detail/card UI were not rendered. Therefore absence from the error page must not be interpreted as absence from ERVK.

## UI surfaces

| Requested surface | Evidence state | Observation |
|---|---|---|
| Public notice search | `NOT_ACCESSIBLE` | Replaced by official service-error page. |
| Search filters | `UNKNOWN` | Search UI did not render. |
| Result columns/fields | `UNKNOWN` | Result list did not render. |
| Notice detail/card fields | `UNKNOWN` | No record could be opened. |
| Multiple activity places | `UNKNOWN` | No record could be opened. |
| Status/change/termination representation | `UNKNOWN` | No record could be opened. |
| Historical revisions | `UNKNOWN` | No record could be opened. |

## Requested public-field matrix

| Field/question | Public visibility | Reason |
|---|---|---|
| Notice number / public record ID | `UNKNOWN` | Notice UI unavailable. |
| Submission date | `UNKNOWN` | Notice UI unavailable. |
| Submission time | `UNKNOWN` | Notice UI unavailable. |
| Declared start date | `UNKNOWN` | Notice UI unavailable. |
| Change date | `UNKNOWN` | Notice UI unavailable. |
| Termination date | `UNKNOWN` | Notice UI unavailable. |
| Status | `UNKNOWN` | Notice UI unavailable. |
| INN | `UNKNOWN` | Notice UI unavailable. |
| OGRN / OGRNIP | `UNKNOWN` | Notice UI unavailable. |
| Legal name / individual entrepreneur name | `UNKNOWN` | Notice UI unavailable. |
| Activity type | `UNKNOWN` | Notice UI unavailable. |
| OKVED / activity code | `UNKNOWN` | Notice UI unavailable. |
| Activity-place name | `UNKNOWN` | Notice UI unavailable. |
| Physical activity address | `UNKNOWN` | Notice UI unavailable. |
| Region | `UNKNOWN` | Notice UI unavailable. |
| Competent authority | `UNKNOWN` | Notice UI unavailable. |
| Representative name | `UNKNOWN` | Notice UI unavailable. |
| Phone | `UNKNOWN` | Notice UI unavailable. |
| Email | `UNKNOWN` | Notice UI unavailable. |

## Fields actually visible on the blocker page

- Gosuslugi branding and text identifying access to electronic-government services.
- Heading: `Во время обработки запроса произошла ошибка`.
- Per-attempt error code.
- Cloud-browser session IP address.
- Generic apology for temporary inconvenience.
- `Вернуться назад` and `Перейти на главную` links.

These are blocker-page fields only and are not ERVK notice fields.

## Screenshot coverage

The prompt asked for a search-page screenshot, one result-list screenshot, and at least three notice-detail screenshots when the environment permits. Screenshots were technically possible, but those requested states never existed in the session. Two full-page blocker screenshots were preserved instead; fabricating or substituting search-engine material was prohibited.
