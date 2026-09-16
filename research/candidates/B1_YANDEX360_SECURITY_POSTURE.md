# B1 — Continuous Security Posture for Yandex 360

Дата закрытия: 2026-09-16

Статус: `KILL__ADJACENT_INCUMBENT_ALREADY_HAS_REQUIRED_PLATFORM_AND_DISTRIBUTION`

## Идея

Узкий российский SSPM-класс для Яндекс 360 for Business:

`подключить организацию -> автоматически проверить security posture по официальному стандарту Яндекс 360 -> постоянно отслеживать drift -> PASS/FAIL + evidence + remediation -> история/отчёт`.

Изначально кандидат выглядел сильным: Яндекс в июне 2026 опубликовал официальный security standard и API-проверки, рынок Яндекс 360 крупный, а результат детерминированно проверяем владельцем.

После углублённого competitor sweep кандидат закрыт.

## Что подтвердилось

### Боль и техническая возможность реальны

Яндекс публикует рекомендации по защите Яндекс 360 и прямо говорит, что аудит можно автоматизировать скриптами через API. Клиент по shared-responsibility отвечает за настройки доступов, паролей, 2FA, внутренний аудит и другие tenant-side меры.

Документация:

- https://yandex.cloud/ru/docs/security/standard-360/all
- https://yandex.ru/support/yandex-360/business/admin/ru/security/security-recommendations
- https://yandex.ru/dev/api360/doc/ru/

API позволяет одному пользователю управлять не более чем 500 организациями, поэтому MSP/partner multi-tenant model технически правдоподобна:

- https://yandex.ru/dev/api360/doc/ru/limits

### Большая часть checklist действительно автоматизируема

У Яндекса есть API для 2FA, password policy, session TTL, inactive-user analysis, secure phone, routing/DLP, portal-account checks, OAuth restrictions, service applications и других security settings.

Отдельный независимый разбор Александра Жогова (+Альянс) от сентября 2026 прошёл текущую страницу рекомендаций построчно и насчитал 10 API-проверяемых пунктов из 18 и 5 пунктов, которые можно ещё и автоматически настраивать.

Источник:

- https://habr.com/ru/articles/1077890/

Это подтверждает, что сам workflow не выдуман.

## Причина KILL — +Альянс уже занял соседний слой настолько близко, что posture является для него фичей

Критический конкурентный факт обнаружился после первичного sweep.

Компания +Альянс уже продаёт продукт:

`+Альянс Поток`

- https://plus-aliance.ru/solutions/automation/potok/

Это специализированный automation layer поверх Яндекс 360, а не generic integrator.

Публично заявлены:

- OAuth-подключение организации Яндекс 360;
- работа по событиям и расписанию;
- 18 типов триггеров;
- visual workflow engine;
- HTTP/webhook integrations;
- журнал выполнения;
- готовые templates;
- user/group/department administration;
- onboarding/offboarding workflows;
- security-alert scenarios;
- audit-log integration / SIEM export add-on;
- multi-step automatic actions;
- коммерческие тарифы от 14 900 RUB/month per organization;
- отдельные enterprise/add-on уровни.

Security-alert functionality уже публично описана:

- https://plus-aliance.ru/news/pro-business/alerty-bezopasnosti-v-yandeks-360-kak-nastroit-kontrol-riskovykh-deystviy-v-alyans-potoke/

Также +Альянс уже выпускает продукты для backup/migration Яндекс 360 и специализируется на automation вокруг cloud-office platform.

## Почему отсутствие отдельной кнопки `Posture Score` нас не спасает

Bounded search не показал, что +Альянс сегодня продаёт отдельный экран с названием `SSPM` или `Posture Score`.

Но это недостаточно для Strategy B gap.

У действующего игрока уже есть практически все дорогие компоненты:

1. OAuth connection к tenant;
2. scheduler;
3. event collection;
4. API actions;
5. security alerts;
6. logs/history;
7. customer trust;
8. pricing;
9. Яндекс 360 expertise;
10. existing customer/distribution channel.

Более того, основатель компании уже исследовал ровно официальный security checklist и расписал API methods и auto-remediation possibilities.

Следовательно:

`official Y360 checklist -> scheduled checks -> findings -> ticket/action -> report`

для +Альянс является естественным небольшим extension существующего продукта, а не новой архитектурой или новым рынком.

Это повторяет урок R1/Parsing.agency: нельзя считать moat то, что сильный соседний игрок может добавить за несколько недель и сразу продать существующей базе.

## Параллельная гипотеза BetterCloud-for-Yandex-360 — также закрыта

Во время исследования появилась более широкая формулировка:

`event -> rule -> automated action for Yandex 360 administration`

Она закрывается +Альянс Потоком ещё прямее.

Поток уже автоматизирует onboarding/offboarding, account operations, groups/departments, session revoke, mail/files, schedules, webhooks and external integrations.

Поэтому не возвращаться к формулировкам:

- BetterCloud for Yandex 360;
- Zapier/n8n for Yandex 360 administration;
- Yandex 360 offboarding automation;
- Yandex 360 security alerts;
- scheduled Yandex 360 security checklist;

без принципиально нового workflow, который структурно не может быть добавлен +Альянсом.

## OWNER_VERIFIABILITY и AI gates были хорошими, но этого недостаточно

Кандидат отлично проходил owner-verifiability: тестовую настройку можно переключить и проверить API PASS/FAIL.

Generic AI не заменяет continuous OAuth connection, scheduling, history and remediation.

Однако Strategy B требует не только реальной боли, но и defensibility / real market gap. После обнаружения +Альянс этого условия нет.

## Final status

`KILL__ADJACENT_INCUMBENT_ALREADY_HAS_REQUIRED_PLATFORM_AND_DISTRIBUTION`

Боль и рынок реальны, но наш первоначальный wedge уже лежит внутри естественной продуктовой поверхности существующего российского игрока.

Не строить и не возвращать как новую идею без нового факта, который создаёт структурный барьер для +Альянс Потока, а не просто ещё одну security-check feature.