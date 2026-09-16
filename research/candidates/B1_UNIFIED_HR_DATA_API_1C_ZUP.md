# B1 — Unified HR Data API / Finch for Russian HR SaaS

Дата закрытия: 2026-09-16

Статус: `KILL__DUPLICATE_OF_REJECTED_1C_HRIS_THESIS__STANDARD_IS_COMMODITY_CUSTOM_IS_PROJECT`

## Идея

Developer-facing слой для российских HR/benefits/IDM/employee-SaaS:

`1С:ЗУП / БОСС-Кадровик / другие кадровые источники`
→ local connector/agent
→ normalized `company / employee / department / position / employment event`
→ единый REST API + webhooks.

Свежая формулировка намеренно исключала payroll/tax и пыталась спасти идею двумя ограничениями:

1. только сравнительно стандартные employee/org/lifecycle objects;
2. local/on-prem agent, чтобы не требовать полного cloud access к ЗУП.

После control pass это не создаёт новую возможность. Кандидат является более узкой версией уже закрытого `B1_UNIFIED_1C_HRIS_API_RU.md` и не устраняет его structural kill.

## Уже существующий canonical reject

В репозитории ранее закрыт:

`B1_UNIFIED_1C_HRIS_API_RU.md`

со статусом:

`KILL__STANDARD_LAYER_COMMODITIZED__HIGH_VALUE_LAYER_BECOMES_CUSTOM_INTEGRATION`.

Reopen condition той карточки требовал одновременно доказать:

- highly standardized source objects;
- many independent SaaS vendors needing the same integration;
- absence of native/canonical integration infrastructure;
- low per-customer customization;
- willingness to pay for abstraction rather than an integration project.

Новая карточка не прошла эти условия.

## Что подтвердилось — recurring problem существует

Российские HR/LMS/IDM/KEDO/expense продукты действительно снова и снова строят похожие интеграции с 1С:ЗУП.

Примеры:

- HRBP.ru синхронизирует оргструктуру, сотрудников, должности, managers, hire/termination/transfer;
- 1IDM использует специализированный 1С:ЗУП connector и универсальные JSON/REST варианты;
- Directum HR Pro поставляет расширение для 1С:ЗУП;
- Raketa устанавливает extension в 1С и синхронизирует через API/token;
- МояКоманда имеет готовую интеграцию 1С:ЗУП;
- Контур.КЭДО/другие HR vendors используют свои модули/коннекторы;
- отдельные интеграторы продают проекты по обмену employee/org/lifecycle data.

Это доказывает повторяемость engineering task, но не отдельную platform economics.

## Критический split №1 — стандартная ЗУП уже дёшева и типизируема

### 1IDM

1IDM прямо описывает простой сценарий:

- 1С:ЗУП не кастомизировалась либо изменения не затрагивают объекты чтения;
- устанавливается готовое расширение с HTTP service;
- используется специализированный connector `HR 1C:ЗУП 3.1`;
- заявленная скорость интеграции — от 10 минут.

Источник:

- https://1idm.ru/novostdetalno_10_10300/

### HRBP.ru

HRBP пишет:

- для стандартной 1С:ЗУП 3.1 используется готовый набор API endpoints;
- готовый connector настраивается без программирования;
- типичный запуск интеграции — несколько рабочих дней;
- синхронизируются именно те сущности, которые предлагались как V0 нового Finch-layer: org structure, employees, positions, managers, hire, termination, transfer.

Источник:

- https://hrbp.ru/blog/integratsiya-hr-platformy-s-1c-zachem-i-kak

Следствие:

> narrowing to employee/org/lifecycle does not rescue the thesis; it places the product precisely in the most standardized part of the integration problem.

## Критический split №2 — изменённая ЗУП снова превращает слой в integration project

Тот же 1IDM прямо разделяет второй сценарий:

- в ЗУП значительно изменены объекты сбора данных;
- либо действует собственная enterprise integration policy;
- требуется собственный HTTP service returning HR data as JSON;
- либо нужно адаптировать agent/connector под изменённый состав объектов и методов;
- нужны компетенции 1С-разработчика.

Источник:

- https://1idm.ru/novostdetalno_10_10300/

HRBP также отдельно указывает, что Enterprise integration настраивается индивидуально с учётом специфики customer 1C configuration.

Источник:

- https://hrbp.ru/blog/integratsiya-hr-platformy-s-1c-zachem-i-kak

Это именно исходный structural kill:

`standard employer -> reusable connector already cheap`

`valuable complex employer -> per-customer mapping/development/support`.

## Российская стоимость подтверждает project economics

Публичные integration offers показывают, что buyer уже может купить bounded project вместо отдельной инфраструктурной подписки.

Примеры:

- Контур.КЭДО ↔ 1С:ЗУП: 79,900 RUB, 20 рабочих дней; includes employee mapping, кадровые номера, departments, hire/transfer/re-hire rules, queue/logging/statuses;
- SAP SuccessFactors ↔ 1С:ЗУП: 49,900 RUB, 12 рабочих дней; employee/employment/position/department/events mapping, delta sync, hire/transfer/termination test cases.

Источники:

- https://5factor.ru/uslugi/integracii-i-avtomatizaciya/integraciya-kontur-kedo-1c-zup/
- https://5factor.ru/uslugi/integracii-i-avtomatizaciya/kadrovye-dannye-sap-successfactors-1c-zup/

Это не universal benchmark цен рынка, но показывает существующий substitution path: один раз купить интеграционный проект за десятки тысяч рублей.

Для Finch-like vendor это опасно: SaaS customer должен иметь достаточно много employer connections, чтобы recurring platform fee + onboarding выигрывали у собственного connector/project.

## Local agent не является новым moat

Новая карточка пыталась использовать:

`agent inside customer network -> filter/normalize -> outbound TLS -> minimum fields`.

Архитектурно это разумно, но рынок уже использует тот же pattern:

- 1IDM ставит extension/HTTP service на стороне ЗУП;
- Raketa ставит расширение в 1С и авторизует через token;
- другие HR/KEDO vendors используют встраиваемые modules/connectors.

Источники:

- https://1idm.ru/novostdetalno_10_10300/
- https://raketa.world/1c_connector

То есть local connector — deployment technique, а не defensibility.

## 1С сама владеет canonical-integration primitives

На 2026-09-16 `1С:Интеграция КОРП` остаётся активным продуктом; актуальный релиз `1.0.5.1` датирован 15.07.2026.

Официально заявлены:

- каноническая модель данных;
- configurable conversion rules;
- universal 1C connector;
- registration of object changes;
- transport layer;
- routing;
- logs/monitoring;
- support for multiple BSP versions;
- integration with external systems.

Источники:

- https://solutions.1c.ru/catalog/integracorp
- https://solutions.1c.ru/catalog/integracorp/features

Это не direct Finch SaaS, но означает, что canonical normalization/connectivity itself is not an empty technical space.

## Почему employee/org-only scope всё равно не проходит reopen gate

### Highly standardized source objects

Частично да — и именно поэтому готовые connectors уже запускаются быстро.

### Many independent SaaS vendors

Да, repeated demand exists.

### No native/canonical platform

Нет. 1С Integration Corp / vendor-specific connectors / integration middleware already cover primitives.

### Low customization per customer

Только для типовой конфигурации. Valuable/custom enterprise cases explicitly require adaptation.

### Clear willingness to pay for unified API instead of project

Не доказано. Public market evidence пока показывает willingness to pay for a connector/module/project, а не neutral multi-tenant developer API.

Следовательно reopen condition не выполнен.

## Gates

### OWNER_VERIFIABILITY_GATE

Проходил хорошо. API state/events можно детерминированно тестировать.

### GENERAL_AI_SUBSTITUTION_GATE

Также проходил: runtime connector fleet не заменяется разовым LLM prompt.

### DATA_TRUST_GATE

Local agent снижает risk, но не создаёт business moat. Enterprise customers всё равно требуют deployment/security/integration work.

### MARKET STRUCTURE / DEFENSIBILITY GATE

Не проходит.

## Не возвращаться как

- `Finch for 1C:ZUP`;
- unified employee API for Russian HR SaaS;
- local-agent employee/org gateway;
- one API for hire/transfer/termination from 1C;
- HRIS abstraction without payroll;

если нет принципиально нового narrower source/workflow, который одновременно:

1. стандартизирован у большинства employers;
2. ещё не имеет cheap reusable connectors/native integration;
3. не требует per-customer 1C development;
4. имеет доказанный buyer population with many repeated employer connections;
5. имеет WTP выше стоимости bounded integration project.

## Final status

`KILL__DUPLICATE_OF_REJECTED_1C_HRIS_THESIS__STANDARD_IS_COMMODITY_CUSTOM_IS_PROJECT`

Повторяющаяся техническая боль реальна. Но новая формулировка не устранила уже установленную причину отказа; держать её как отдельный PROMISING candidate было бы противоречием reject-registry.
