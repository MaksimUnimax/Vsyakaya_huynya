# B1 — Unified HR Data API / Finch for Russian HR SaaS

Дата: 2026-09-16

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__DATA_TRUST_AND_CUSTOM_1C_RISK`

## Коротко

Developer-facing слой для российских HR/benefits/IDM/employee-SaaS:

`1С:ЗУП / БОСС-Кадровик / другие кадровые источники`
→ локальный connector/agent
→ нормализованная схема `company / employee / department / position / employment event`
→ единый API + webhooks для SaaS-разработчика.

Цель — не делать HRM и не заменять 1С. Цель — убрать повторяющуюся разработку и сопровождение индивидуальных кадровых интеграций у каждого SaaS-вендора.

## Demand proved abroad

Finch — зрелый unified HRIS/payroll API. Он стандартизует данные разных HRIS/payroll providers в одну модель, поддерживает 250+ провайдеров, webhooks, sandbox и единый developer API. В 2026 сама категория включает Finch, Merge, Kombo, Bindbee, Truto, Knit, Apideck и другие.

Источники:
- https://www.tryfinch.com/finch-api
- https://www.tryfinch.com/integrations
- https://www.tryfinch.com/blog/best-unified-apis-hris-payroll

## Российское evidence повторяющейся боли

На российском рынке не найден прямой публично заявленный аналог Finch, который продаётся разработчику как neutral multi-customer normalized HR API.

При этом повторяющаяся интеграционная работа видна у многих независимых продуктов:

- HRBP.ru отдельно синхронизирует 1С:ЗУП: сотрудники, должности, оргструктура, приём/увольнение/перевод;
- Directum HR Pro поставляет отдельное расширение/коннектор для 1С:ЗУП и других кадровых систем;
- 1IDM поддерживает специальные и универсальные коннекторы и прямо описывает необходимость собственного HTTP-сервиса/адаптации при изменённой ЗУП;
- Timetta имеет собственный коннектор 1С:ЗУП для НСИ и кадровых событий;
- Websoft прямо пишет, что файловый обмен с 1С занимал много времени и ресурсов и поэтому был заменён API-интеграцией;
- Bitrix24 имеет штатный коннектор ЗУП, который продолжает активно дорабатываться;
- БОСС создал отдельный mapping/extension для связи с ЗУП;
- отдельная интеграция `Контур.КЭДО ↔ 1С:ЗУП` продаётся как проект примерно за 79 900 ₽ и 20 рабочих дней.

Это не доказывает TAM, но подтверждает один и тот же engineering problem у большого числа российских SaaS/enterprise-продуктов.

## Почему это не Albato / generic iPaaS

Albato и другие iPaaS соединяют приложения и поля, но основной продукт здесь — стабильная canonical employment model и lifecycle semantics:

- организация;
- сотрудник;
- подразделение;
- должность;
- manager relation;
- дата найма;
- увольнение;
- перевод;
- статус;
- webhook об изменении;
- source identifiers/versioning;
- health/status соединения.

Клиент интегрируется с одной схемой и не должен понимать внутренние объекты каждой конфигурации 1С/HRM.

## Главный российский технический wedge

### Local/on-prem agent

Из-за ФЗ-152 и чувствительности кадровых данных оптимальная архитектура не должна требовать прямого открытия 1С наружу или полной выгрузки базы в чужое облако.

Предпочтительный вариант:

`agent/расширение внутри сети клиента`
→ читает разрешённые кадровые объекты
→ нормализует/фильтрует
→ инициирует исходящее TLS-соединение
→ наружу уходит только минимально разрешённый набор полей.

Для high-trust клиентов возможен полностью self-hosted gateway.

## MVP

Не трогать зарплаты, налоги и payroll на первом этапе.

V0:
1. connector для типовой 1С:ЗУП 3.1;
2. company / departments / employees / positions;
3. hire / transfer / termination events;
4. canonical REST API;
5. webhook on change;
6. connection health/logs;
7. field allowlist;
8. sandbox/test dataset;
9. SDK для SaaS-разработчика.

V1:
- custom-field mapping;
- БОСС-Кадровик / второй HR source;
- write-back только после доказанного спроса;
- self-hosted gateway.

## OWNER_VERIFIABILITY_GATE

Проходит.

На контролируемой тестовой базе можно создать 20 сотрудников и заранее известные события:

`hire -> department transfer -> manager change -> termination`.

Проверяется:
- API возвращает ровно ожидаемые записи;
- webhook приходит один раз и с правильным событием;
- запрещённые поля не выходят наружу;
- после изменения в source canonical state обновляется;
- лог показывает источник/время/ошибку.

Предметная HR-экспертиза для проверки базового transport/mapping результата не нужна.

## GENERAL_AI_SUBSTITUTION_GATE

Проходит.

LLM может написать конкретный коннектор, но не заменяет постоянно работающий fleet агентов, compatibility matrix, schema normalization, sync state, webhooks и многолетнее сопровождение версий/кастомизаций.

## DATA_TRUST_GATE

Главный риск.

Кадровые данные чувствительны. Кандидат допустим только при data-minimization и local-agent архитектуре. Если MVP потребует `дайте нам полный доступ к вашей ЗУП в облако`, кандидат должен быть закрыт.

## Главный риск — кастомизированная 1С

1IDM прямо отмечает: для изменённой ЗУП может потребоваться собственный HTTP-сервис и адаптация. Это означает одновременно:

- потенциальный moat через накопленную compatibility/adapters knowledge;
- высокий support-cost;
- риск превратиться из SaaS в интегратора.

Kill gate: если >20–30% первых целевых клиентов требуют уникальной ручной разработки, модель становится слишком сервисной.

## Direct / adjacent competition

Найдены продуктовые коннекторы у конкретных вендоров (Directum, 1IDM, HRBP, Timetta, Bitrix24, БОСС, Websoft) и generic integration services, но в bounded sweep не найден neutral developer platform с моделью:

`одна интеграция SaaS -> многие работодатели с 1С/HRM -> единая schema/webhooks`.

Это не доказательство полного отсутствия скрытого конкурента.

## Distribution / ICP

Не продавать работодателю напрямую на первом этапе.

Первичный ICP:
- HR-tech SaaS;
- КЭДО;
- LMS/employee experience;
- IDM/IAM;
- корпоративные benefits/ДМС/страхование;
- time tracking/workforce tools;
- travel/expense platforms, которым нужна структура сотрудников;
- B2B SaaS, которому нужно автоматическое provisioning/offboarding из кадрового источника.

Один SaaS-клиент затем потенциально приносит десятки/сотни employer connections.

## Следующий kill test

1. Собрать минимум 50 российских SaaS/enterprise-продуктов, которым нужны employee/org data.
2. Для каждого определить: есть ли 1С:ЗУП connector, сколько стоила/заняла интеграция, есть ли maintenance pain.
3. Найти минимум 15 продуктовых/engineering руководителей и проверить willingness-to-pay за connector-as-infrastructure вместо собственного кода.
4. На 10 реальных/демо конфигурациях ЗУП измерить долю, которую покрывает один типовой agent без ручной доработки.
5. Проверить direct competitors и 1С Marketplace/партнёрские продукты глубже.

## Предварительная оценка

`7.2/10` как исследовательский кандидат.

Сильные стороны:
- доказанная зарубежная категория;
- повторяющаяся российская инженерная работа уже видна;
- крупная установленная база 1С:ЗУП/российских HR-систем;
- хороший owner-verifiability;
- generic AI не заменяет runtime;
- compatibility library может накапливать moat.

Слабые стороны:
- чувствительные данные;
- кастомные конфигурации 1С;
- высокий риск service-heavy onboarding;
- прямой TAM developer-platform пока не измерен;
- 1С/крупные HR-вендоры теоретически могут выпустить более стандартный API layer.

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__DATA_TRUST_AND_CUSTOM_1C_RISK`, не GO.