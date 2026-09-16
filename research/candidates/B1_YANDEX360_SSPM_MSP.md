# B1 — Continuous Security Posture / SSPM for Yandex 360 Partners

Дата: 2026-09-16.

Статус: `KILL__YANDEX_ONLY__NATIVE_AND_ADJACENT_INCUMBENTS_TOO_CLOSE`

## Итог

Первоначальная гипотеза была технически жизнеспособной, но **закрыта как самостоятельный Yandex-only продукт после более глубокого incumbent sweep**.

Идея:

`партнёр/MSP подключает клиентские организации Яндекс 360 -> сервис регулярно проверяет официальный baseline Y360-* -> хранит drift/evidence -> алертит -> формирует отчёт -> помогает исправлять нарушения`.

Западная механика доказана SSPM/MSP-продуктами уровня AppOmni, Microsoft 365 Lighthouse и Augmentt. Российский рынок Яндекс 360 также достаточно велик. Причина KILL — не отсутствие боли и не техническая невозможность.

Причина KILL: **сильные существующие игроки уже имеют почти весь технологический и дистрибуционный фундамент и могут добавить exact posture/baseline слой быстрее, чем новый игрок успеет создать moat**.

## Что технически подтвердилось

Официальный стандарт Яндекс 360 версии 1.0.0 от 18.06.2026 содержит 14 контролей `Y360-1...Y360-14` и прямо допускает автоматизацию аудита через API:

https://yandex.cloud/ru/docs/security/standard-360/all

Большая часть полезных проверок может работать read-only. Подробная матрица scopes/checks сохранена отдельно:

`research/evidence/y360_sspm_scope_and_platform_kill_test_2026-09-16.md`

То есть технический kill gate **не** сработал.

## Почему всё равно KILL

### 1. Яндекс уже владеет native partner surface

Partner Portal Yandex Cloud/Яндекс 360 уже управляет:

- customer accounts/subaccounts;
- связанными организациями Яндекс 360;
- тарифами и add-ons;
- историей и коммерческим lifecycle;
- публичным Partner Portal API (добавлен в Q1 2026).

Release notes:

https://yandex.cloud/ru/docs/partner/release-notes/

Следовательно, `единая панель нескольких организаций Яндекс 360` не является gap.

### 2. Яндекс уже строит security platform

Yandex Security Deck уже включает CSPM, DSPM, KSPM, CIEM, Threat Detection и другие модули. DSPM в 2026 уже умеет работать с Яндекс Дисками 360.

https://yandex.cloud/ru/docs/security-deck/

Яндекс имеет естественный доступ и к tenant surface, и к security product organization. Native Y360 posture — логичное расширение, которое внешний стартап не контролирует.

### 3. Найден слишком близкий российский adjacent incumbent — `+Альянс Поток`

`+Альянс` — технологический партнёр Яндекса и действующий вендор продуктов поверх Яндекс 360.

`+Альянс Поток` уже умеет:

- OAuth-подключение организаций Яндекс 360;
- event/schedule/webhook automation;
- security alerts;
- отчёты по доступам;
- блокировку пользователей;
- отзыв сессий/токенов;
- изменение прав на файлы;
- onboarding/offboarding;
- историю и трассировку запусков;
- сценарии из 1С;
- подключение до 3 организаций на корпоративном тарифе.

Product page:

https://plus-aliance.ru/solutions/automation/potok/

Security-alert workflow:

https://plus-aliance.ru/news/pro-business/alerty-bezopasnosti-v-yandeks-360-kak-nastroit-kontrol-riskovykh-deystviy-v-alyans-potoke/

1C/offboarding workflow and current limits:

https://plus-aliance.ru/news/tekhnoblog/prikaz-oformili-v-1s-uchetnaya-zapis-poyavilas-v-yandeks-360-svyazka-cherez-vkhodyashchiy-vebkhuk/

Для такого игрока добавить периодический набор из 14 официальных Y360-checks + report — **feature extension**, а не новая платформа.

Это повторяет главный урок R1/Parsing.agency: наличие пока не реализованной exact-фичи не создаёт moat, если сильный incumbent может быстро встроить её в существующий продукт и продать своей базе.

## Почему cross-platform variant не считается найденным кандидатом

Более широкая формулировка:

`Augmentt / Lighthouse для российских SaaS/workspace MSP: Yandex 360 + VK WorkSpace + другие платформы`

может быть отдельной гипотезой, но **она пока не доказана**.

Не подтверждено:

- достаточное admin/security API покрытие VK WorkSpace и других платформ;
- отсутствие прямых cross-platform российских конкурентов;
- наличие единого buyer/distribution motion;
- willingness-to-pay за cross-platform layer;
- невозможность локальным IAM/SIEM/MSP incumbents добавить тот же слой.

Поэтому нельзя спасать убитый Yandex-only кандидат обещанием будущей мультиплатформенности.

## Сохранённые полезные выводы

- официальный Y360 standard — отличный machine-verifiable source;
- большинство baseline checks можно сделать read-mostly;
- owner-verifiability была хорошей: raw API evidence ↔ официальный control;
- российские MSP действительно могут монетизировать recurring SaaS security operations — западный Augmentt подтверждает business model;
- но distribution/moat важнее technical novelty.

## Reopen condition

Не возвращаться к Yandex-only SSPM без нового факта, который прямо меняет конкурентную картину.

Допустимый новый факт, например:

- независимый cross-platform adapter layer уже доказан минимум для 2–3 крупных российских SaaS;
- найден buyer, который платит именно за vendor-neutral multi-tenant posture, а не за Yandex automation;
- появляется технический/network moat, недоступный Partner Portal / Security Deck / +Альянс;
- incumbents явно отказываются от этого направления.

До этого: `KILL__YANDEX_ONLY__NATIVE_AND_ADJACENT_INCUMBENTS_TOO_CLOSE`.