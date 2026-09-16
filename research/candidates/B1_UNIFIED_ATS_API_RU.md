# B1 — Unified ATS API for Russian HR-tech / Kombo-RU

Дата: 2026-09-16

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__ALBATO_AND_TAM_RISK`

## Коротко

Developer-facing unified API поверх российских Applicant Tracking Systems:

`HR-tech / assessment / background-check / AI-interview / onboarding SaaS`
→ одна canonical API
→ `Huntflow / Potok / Talantix / e-Staff / FriendWork / Skillaz / другие ATS`
→ jobs / candidates / applications / stages / attachments / write-back / webhooks.

Не ATS для рекрутера и не generic iPaaS. Покупатель — другой B2B SaaS, которому нужно работать внутри ATS его клиентов.

## Demand proved abroad

Прямой западный эталон — Kombo.

Kombo продаёт unified ATS/HRIS/LMS/payroll API и заявляет 250+ интеграций. Для ATS слой включает:

- одну нормализованную модель;
- jobs / candidates / applications / attachments;
- read + write;
- embedded connection flow;
- custom-field mapping;
- raw-data/passthrough для edge cases;
- sync status, logs и authentication health;
- webhooks.

Assessment/background-check use case прямо предназначен для продуктов, которым нужно писать результаты обратно в множество ATS.

Источники:
- https://www.kombo.dev/use-cases/ats-api
- https://www.kombo.dev/use-cases/assessment-api
- https://www.kombo.dev/integrations

## Российский ecosystem — достаточная фрагментация

Российский ATS-рынок не состоит из одной доминирующей системы.

Текущие публичные ориентиры:

- Huntflow — около 2 000 клиентов;
- e-staff — 2 500+ компаний;
- FriendWork — 500+ компаний;
- Skillaz — крупные enterprise-проекты;
- Talantix / Potok / Skillaz / FriendWork / e-Staff / Huntflow и другие входят в текущие российские обзоры развитых ATS.

Эти числа нельзя складывать как число уникальных работодателей: возможны миграции, разные даты и методики. Но они подтверждают достаточно большой installed ecosystem, а не единичные внедрения.

Источники:
- https://huntflow.ru/about
- https://e-staff.ru/
- https://friend.work/ats_dlya_hr
- исследование ТеДо / Созвездие ATS 2025.

## Прямое evidence duplicated engineering

### Xenia AI

AI-interviewer публично заявляет готовые интеграции с:

- Potok Recruit;
- e-Staff;
- Huntflow;
- FriendWork;
- Talantix;
- hh.

То есть один downstream-product уже поддерживает минимум пять независимых ATS adapters.

Источник:
- https://xeniaai.com/public-interview

### HR Messenger

Публично заявляет интеграции с:

- E-Staff;
- Skillaz;
- FriendWork;
- Potok;
- Huntflow;

и двустороннюю передачу данных: создавать кандидатов, прикреплять резюме/переписку и т.п.

Источники:
- https://hrmessenger.com/integrations
- https://blog.hrmessenger.com/2023/12/29/obnovleniya-chat-bota-hr-messenger-2023/

### EasyDocs

Отдельно документирует интеграции с Huntflow, Talantix и Potok.

Источник:
- https://wiki.easydocs.ru/books/integraciia-s-sistemami-upravleniia-kandidatami/

### Интеграторы

Nord Clan в списке HR-интеграций отдельно поддерживает hh.ru, e-staff, Huntflow, FriendWork, Potok и proAction.

Это подтверждает recurring adapter work вне одного продукта.

## Source APIs реально существуют

### Huntflow

Имеет developer API, OAuth/personal tokens, webhooks и sandbox.

- https://huntflow.ru/api
- https://github.com/huntflow/api

### Talantix

Имеет отдельный API; доступ зависит от тарифа, access/refresh token lifecycle требует собственного handling.

- https://api.talantix.ru/docs/authorization/

Другие ATS требуют отдельного capability/access audit до реализации.

## Главный прямой риск — Albato Embedded

Albato уже имеет готовые коннекторы минимум к Huntflow, Potok и Skillaz, а его Embedded-продукт даёт:

- white-label embedded integrations;
- managed authentication;
- headless API;
- customer connections;
- health/error monitoring;
- 1 000+ приложений.

Тариф Embedded начинается примерно от `$3,000/month`, Pro от `$5,000/month` по текущей публичной странице.

Источники:
- https://albato.com/embedded
- https://albato.com/embedded/pricing
- https://albato.com/apps/huntflow
- https://albato.ru/app-potok

### Почему Albato не является точным Kombo сегодня

Albato в найденном публичном интерфейсе продаёт trigger/action workflows и field mapping. Kombo продаёт постоянную category-specific canonical model: один объект `candidate/application/job` независимо от source ATS, full/delta sync, custom fields, write-back, provider passthrough и connection health.

Но это **не moat само по себе**: Albato уже имеет buyer relationship, embedded runtime и часть adapters. Он может достроить HR vertical layer. Поэтому competitor risk высокий.

## MVP

Не делать весь HR stack.

V0 — 3 ATS:

`Huntflow + Potok + Talantix`

Canonical model:

1. jobs;
2. candidates;
3. applications;
4. stages/statuses;
5. attachments/resume;
6. notes/activities — если source API позволяет;
7. create/update candidate/application;
8. stage/write-back;
9. delta sync/webhooks;
10. connection health + logs;
11. raw provider payload / passthrough escape hatch.

V1 по реальному buyer demand:

- e-Staff;
- FriendWork;
- Skillaz.

## OWNER_VERIFIABILITY_GATE

Проходит хорошо.

На тестовых ATS-аккаунтах заранее создаём:

- 3 вакансии;
- 20 кандидатов;
- несколько applications;
- разные стадии;
- resume attachment.

Проверяем:

- одинаковый canonical response независимо от ATS;
- изменение стадии корректно записывается обратно;
- webhook/delta появляется один раз;
- deleted/archived state корректно обрабатывается;
- auth expiry виден как connection error;
- raw provider ID/payload позволяют сверить данные с source UI.

HR-эксперт для проверки transport/normalization слоя не нужен.

## GENERAL_AI_SUBSTITUTION_GATE

Проходит.

LLM может написать один adapter, но не заменяет production sync fleet, OAuth/token lifecycle, provider compatibility, logs, webhooks, mapping и постоянное сопровождение API множества customer connections.

## DATA_TRUST_GATE

Существенный риск: резюме и данные кандидатов — персональные данные.

Нужны:

- российское размещение;
- 152-ФЗ модель обработки;
- strict scopes;
- минимизация retention;
- encryption;
- возможность не хранить resume blobs дольше технически необходимого;
- для enterprise — local relay/self-hosted option, если потребуется.

Риск выше restaurant POS, сравним с Finch.

## Distribution / ICP

Первичные покупатели:

- AI interviewers;
- assessment/test platforms;
- background-check / security-check products;
- HR chatbots;
- career-site/lead capture products;
- onboarding/KEDO products;
- HR analytics / recruiting intelligence;
- reference-check products;
- staffing/recruiting automation add-ons.

Один buyer может принести десятки/сотни employer connections.

## Главные kill tests

### 1. Buyer universe

Собрать минимум 50 российских HR-tech products, которым нужен candidate/job/application data exchange, и определить, сколько поддерживают 2+ ATS.

### 2. Albato exact-capability audit

Проверить, можно ли на Albato Embedded сегодня построить white-label full-sync/write-back для Huntflow/Potok/Skillaz без отдельной product-specific adapter logic.

Если да — gap резко слабеет.

### 3. Source API feasibility

Проверить current API/access/partner terms у Huntflow, Potok, Talantix, e-Staff, FriendWork, Skillaz. Если два-три крупнейших не допускают scalable third-party integrations, кандидат KILL.

### 4. Willingness to pay

15–20 product/engineering leaders downstream HR-tech:

- сколько adapters поддерживают;
- сколько инженеро-месяцев съедает maintenance;
- сколько customer deals зависит от ATS integration;
- готовы ли платить за connection/month или platform fee.

### 5. Service-heavy risk

Если каждая customer ATS требует уникального consulting/mapping проекта, economics хуже. Canonical model должна покрывать основную массу use cases без ручного кода.

## Предварительная оценка

`7.1/10` как исследовательский кандидат.

Сильные стороны:

- очень чистый proven-abroad analog;
- российская ATS fragmentation реальна;
- duplicated engineering подтверждён несколькими downstream products;
- source APIs существуют;
- schema уже и понятнее, чем общий HRIS/1С слой;
- высокий owner-verifiability;
- generic AI runtime не заменяет.

Слабые стороны:

- buyer universe заметно меньше employer universe;
- Albato Embedded — серьёзный adjacent incumbent;
- персональные данные кандидатов;
- часть ATS может ограничивать API партнёрскими условиями;
- direct local unified ATS API пока не найден только в bounded search.

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__ALBATO_AND_TAM_RISK`, не GO.