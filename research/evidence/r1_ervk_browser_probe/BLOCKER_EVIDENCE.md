# ERVK blocker evidence

## Attempt ledger

| Attempt | Action | Rendered title | Exact visible error code | Outcome |
|---:|---|---|---|---|
| 1 | Normal anonymous navigation to `https://ervk.gov.ru/public/notices` | `Ошибка` | `2026-09-14-13-33-55-36806C02340B458E:3` | Official Gosuslugi service-error page; no notice UI |
| 2 | One normal reload | `Ошибка` | `2026-09-14-13-34-13-069BF7E6348C0053:3` | Same service-error UI; no notice UI |

Last explicit browser observation: `2026-09-14T13:34:46.952Z`; URL remained `https://ervk.gov.ru/public/notices` and title remained `Ошибка`.

## Visible text common to both attempts

- `Доступ к сервисам электронного правительства`
- `Во время обработки запроса произошла ошибка`
- `Приносим извинения за временные неудобства`
- `Вернуться назад`
- `Перейти на главную`

The page also displayed the cloud-browser session IP address. It is retained only inside the exact screenshots and is not transcribed here because it is unnecessary for the research conclusions.

## Screenshot integrity

| File | SHA-256 |
|---|---|
| `screenshots/01_initial_error_code_2026-09-14-13-33-55.jpg` | `669f2746a55489dd43dc8b3e935527e703535a3a8347d0dc8b20eecd8a38a4f6` |
| `screenshots/02_reload_error_code_2026-09-14-13-34-13.jpg` | `498817bc942f7c83b50d4e84f44a2045f4377536c013f3ff4c241bf2b0f6ad60` |

## Classification discipline

This evidence proves only that the requested public ERVK route failed twice in this specific bounded browser session. It does not prove:

- that the site is generally unavailable;
- that the failure is permanent;
- that access is geographically restricted;
- that a CAPTCHA or authentication is required;
- that automation was detected;
- that a particular HTTP status was returned;
- that public notice fields or endpoints do not exist.
