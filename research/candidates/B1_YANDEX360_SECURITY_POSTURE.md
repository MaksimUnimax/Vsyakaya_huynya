# B1 — Continuous Security Posture for Yandex 360

Дата: 2026-09-16

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__CHANNEL_AND_WTP_TO_VALIDATE`

## Коротко

Узкий российский SSPM-класс для Яндекс 360 for Business:

`подключить организацию -> автоматически проверить security posture по официальному стандарту Яндекс 360 -> постоянно отслеживать drift -> показать PASS/FAIL, evidence и конкретное исправление -> журнал изменений / отчёт`

Первый wedge — только Яндекс 360. Не делать сразу универсальную кибербезопасность.

## Почему это не выдуманный security checklist

Яндекс сам опубликовал в 2026 году официальный стандарт по защите и безопасному использованию Яндекс 360. В текущей версии есть 14 именованных контролей `Y360-*`, включая:

- минимизацию числа администраторов;
- обязательную 2FA;
- парольную политику;
- recovery владельца;
- ограничение cookie/session TTL;
- блокировку неактивных пользователей;
- включение и мониторинг аудит-логов;
- secure phone;
- DLP-routing;
- запрет личных @yandex.ru аккаунтов в организации;
- SSO;
- ревизию OAuth/service applications и scopes;
- запрет внешней OAuth-аутентификации;
- allowlist/service-app restrictions.

Критически важно: стандарт прямо указывает, как проверять большинство контролей через официальный API Яндекс 360. Яндекс отдельно пишет, что аудит всех рекомендаций можно автоматизировать скриптами.

Источники:

- https://yandex.cloud/ru/docs/security/standard-360/all
- https://yandex.ru/dev/api360/doc/ru/

Это даёт owner-verifiable ground truth: правило не придумывает AI; система либо читает официальный параметр/API правильно, либо нет.

## Demand proved abroad

SSPM — зрелый западный класс.

### AppOmni

- защищает 101+ млн SaaS user accounts;
- анализирует около 2 млрд security events/day;
- публичный AWS Marketplace listing: $7,500/year за блок 100 пользователей одного SaaS;
- категория включает continuous posture, identities, connected apps, compliance и remediation.

Источники:

- https://appomni.com/about-us/
- https://aws.amazon.com/marketplace/pp/prodview-esohvavnjpcka

Также класс подтверждают Palo Alto SaaS Security, Obsidian, Reco и другие SSPM-вендоры.

## Российский underlying market

По официальным данным Яндекса за I полугодие 2026:

- более 185,000 организаций используют Яндекс 360;
- 8.9 млн платных учётных записей;
- 2.4 млн платных аккаунтов относятся к крупному бизнесу;
- выручка Яндекс 360 за I полугодие 2026 — 11.6 млрд ₽, +42% YoY;
- партнёрская сеть — 390 компаний;
- выручка партнёрского канала +57% YoY.

Источник:

- https://www.yandex.ru/company/news/12-08-2026-01
- https://360.yandex.ru/blog/news/bolee-185-tis-organizatsii-yandeks-360-obyavlyaet-finansovie-rezultati-za-pervoe-polugodie/

Это на порядки больший reachable platform market, чем у browser-extension payments.

## Почему встроенная безопасность Яндекс 360 не закрывает задачу полностью

Яндекс даёт сами настройки, API, audit logs и официальный security standard. Но текущая документация прямо перекладывает ответственность за безопасную конфигурацию tenant на клиента и предлагает автоматизировать аудит собственными скриптами.

То есть провайдер предоставляет `controls + API + benchmark`, но не найден отдельный managed continuous layer уровня:

`каждый день проверить все Y360 controls -> увидеть drift -> evidence -> ticket/remediation -> история -> multi-tenant dashboard`.

Это важное различие: продукт не заменяет безопасность Яндекса, а автоматизирует customer-side shared-responsibility.

## Bounded competitor sweep

На 2026-09-16 не найден прямой российский продукт, который публично заявляет continuous SSPM именно для Яндекс 360 по official Y360 controls.

Найдены adjacent решения:

- Kaspersky KUMA умеет принимать/нормализовать события Яндекс 360 — это SIEM/event analytics, а не posture-as-code;
- Solar Dozor и Staffcop контролируют почтовый/пользовательский канал — DLP/UEBA, не security configuration posture;
- Yandex Security Deck CIEM относится к Yandex Cloud IAM, не к Яндекс 360 tenant posture;
- сам Яндекс 360 даёт API и рекомендации, но предлагает клиенту автоматизировать аудит самостоятельно.

Отсутствие найденного аналога не доказывает, что скрытых MSSP/скриптов нет. Нужен отдельный sweep среди 390 партнёров Яндекс 360.

## Сильный distribution wedge — партнёры Яндекс 360

Яндекс официально говорит, что партнёры зарабатывают на внедрении, администрировании, миграции, техподдержке и других услугах. По состоянию на H1 2026 партнёрская сеть — 390 компаний.

Это может быть лучший ICP, чем продавать каждой организации напрямую:

`партнёр/MSSP -> подключает 10/50/200 customer tenants -> единый dashboard posture -> recurring managed-security service`.

Так появляется multi-tenant economics и понятный канал дистрибуции.

Источники:

- https://360.yandex.ru/business/partners-program/
- https://360.yandex.ru/business/partners/

## MVP

V0 только read-only и только официальный стандарт.

1. OAuth/app connection к одной организации Яндекс 360.
2. Автоматические проверки всех API-измеримых `Y360-*` controls.
3. PASS / FAIL / NOT_AUTOMATABLE.
4. Evidence: какой API/поле дало результат.
5. Официальная ссылка на remediation instruction.
6. Daily/weekly rescan и drift history.
7. Alert при переходе PASS -> FAIL.
8. PDF/HTML report для администратора/ИБ.
9. Multi-tenant mode для партнёра как следующий bounded step.

Не делать в первом MVP:

- собственный SIEM;
- DLP;
- anomaly ML;
- авто-ремедиацию write API;
- VK WorkSpace/Bitrix24;
- generic compliance engine.

## OWNER_VERIFIABILITY_GATE

Проходит хорошо.

Для тестового tenant можно вручную включать/выключать конкретные настройки и сверять:

`2FA off -> FAIL`
`2FA on -> PASS`
`cookie TTL = 0 -> FAIL`
`cookie TTL <= 604800 -> PASS`
`лишнее service application -> finding`
`OAuth restriction off -> FAIL`

Каждый результат воспроизводим через официальный API и консоль Яндекса.

## GENERAL_AI_SUBSTITUTION_GATE

Проходит.

LLM может написать разовый скрипт, но не заменяет continuous connection, credential lifecycle, scheduled checks, drift history, multi-tenant partner dashboard, evidence trail и alerts.

## DATA_TRUST_GATE

Средний риск, но контролируемый.

Потребуется OAuth/service-app access к административным security данным tenant. Поэтому V0 должен быть read-only, минимальные scopes, прозрачный перечень читаемых данных, отсутствие чтения содержимого почты/файлов там, где контроль этого не требует.

Для крупных клиентов позже может понадобиться self-hosted/on-prem collector.

## Главные kill-risks

### 1. Яндекс сам может встроить posture dashboard

Это главный platform risk. Поскольку стандарт и API принадлежат Яндексу, native product technically straightforward.

Защита должна быть в cross-tenant partner workflow, history, reporting и позже multi-SaaS coverage, а не в самих 14 checks.

### 2. Клиентам может хватать разового скрипта/аудита

Если security posture меняется редко и willingness-to-pay за continuous monitoring низкая — отдельный SaaS слаб.

### 3. Партнёры уже могут иметь внутренние скрипты

Нужно опросить/проверить минимум 15–20 партнёров из официального каталога: как они сейчас проводят security review, есть ли recurring service, сколько времени занимает один tenant.

### 4. High-end customers могут уже собирать всё в SIEM/IAM

ICP V0 вероятнее: средний бизнес и партнёры, у которых есть много tenant-ов, но нет собственной security engineering команды.

## Следующий kill test

1. Sweep 30–50 официальных партнёров Яндекс 360: найти публичные security-audit/managed-security offerings и прямой аналог.
2. Интервью/контакт 15–20 партнёров: делают ли они проверки official standard вручную/скриптами, сколько customer tenants, готовы ли платить за multi-tenant automation.
3. Проверить, сколько из 14 official controls действительно полностью автоматизируются current API без чтения чувствительного content.
4. Проверить частоту drift на тестовых/реальных tenants: если за месяцы почти ничего не меняется, continuous value слаб.
5. Узнать готовность платить по модели `₽/tenant/month` или `₽/100 users/month`.

## Предварительная оценка

`8/10` как исследовательский кандидат.

Сильнее текущего WorkOS-RU по:

- размеру локального platform market;
- официальному машиночитаемому ground truth;
- owner-verifiability;
- локальной специфике, которую западный AppOmni обычно не покрывает;
- готовому partner channel из 390 компаний.

Слабее по defensibility: Яндекс или крупный ИБ/партнёр может относительно быстро повторить basic checks.

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__CHANNEL_AND_WTP_TO_VALIDATE`, не GO.