# B1 — Dependabot for Wildberries/Ozon API Changes

Дата: 2026-09-15

Статус: `HOLD__WILLINGNESS_TO_PAY_AND_SOURCE_COVERAGE_REQUIRED`

## Коротко

Developer tool для команд, которые поддерживают интеграции с Wildberries/Ozon и другими российскими API:

`официальная документация / changelog / OpenAPI / live contract меняется`
→ `сервис определяет breaking/deprecation`
→ `сканирует подключённый GitHub-репозиторий`
→ `показывает конкретные затронутые call sites`
→ `создаёт issue или bounded PR с исправлением`
→ `прогоняет tests/contract checks`
→ `разработчик принимает PR`.

Не общий мониторинг страниц и не status page. Ценность — ответить: **"Это изменение поставщика затрагивает именно мой код? Если да — где и какой patch нужен?"**

## Почему боль реальна

Wildberries прямо рекомендует разработчикам и интеграционным сервисам постоянно следить за журналом изменений и Telegram-каналом API.

Официальный канал WB API имеет примерно 9.6k подписчиков и регулярно публикует:

- отключение deprecated methods;
- изменения доменов;
- изменения параметров и semantics;
- новые обязательные требования;
- изменения token categories;
- rate-limit и contract changes.

Источники:

- https://dev.wildberries.ru/docs/openapi/api-information
- https://t.me/s/wb_api_notifications

Официальная документация по интеграции WB с МойСклад отдельно говорит, что поддержка интеграции требует постоянного контроля версий методов, request/response changes, удаления методов, token/security и limits.

Ozon также ведёт отдельный поток Seller API changes; API-интеграторам приходится отслеживать изменения контрактов независимо от собственных релизов.

## Зарубежная механика уже появилась

### Patchbase

https://www.patchbase.space/

Позиционирование буквально `Dependabot for APIs`:

- watches provider API changes;
- matches them to repos;
- finds affected call sites;
- applies fix;
- verifies;
- opens PR.

### KeelCat

https://keelcat.in/

Похожая цепочка:

`read provider change -> locate usages -> fix -> verify -> PR`.

### Specc

https://www.speccapp.com/

Фокусируется на impact analysis third-party API changes в codebase.

Это подтверждает продуктовую механику, но категория пока ранняя и не имеет такой зрелости спроса, как старые SaaS-классы.

## Почему generic OpenAPI diff недостаточен

Open-source oasdiff уже умеет сравнивать две OpenAPI specs и находить breaking changes:

https://www.oasdiff.com/docs/monitor-external-apis

Поэтому продукт не может быть просто:

`скачать swagger -> показать diff`.

Нужен следующий слой:

`change -> exposure in customer's code -> migration action -> verified patch`.

## Российский competitor sweep

На 2026-09-15 в bounded поиске не найден российский SaaS, который заявляет именно:

`monitor WB/Ozon upstream API -> map change to connected repositories -> create verified migration PR`.

Есть:

- официальные changelog/Telegram streams;
- SDK maintainers, которые вручную отслеживают API;
- generic API monitoring / observability;
- open-source spec-diff tooling;
- seller SaaS, которые сами поддерживают собственные интеграции.

Это не доказательство отсутствия скрытого продукта.

## Owner verifiability

Очень высокий fit.

Можно взять реальный known breaking change WB API и репозиторий-fixture:

1. baseline code использует старый endpoint/field;
2. service получает официальный change;
3. должен указать точные affected files/lines;
4. создаёт patch;
5. contract/unit tests проходят;
6. owner вручную проверяет diff.

Результат бинарно/технически проверяем.

## GENERAL_AI_SUBSTITUTION_GATE

Проходит только при автоматизированном workflow.

ChatGPT может вручную прочитать changelog и исправить один repo, но не заменяет continuous monitoring десятков provider surfaces, dependency graph, history, code matching, automatic issue/PR generation и regression verification.

Если продукт сводится к "вставьте changelog и repo в AI", кандидат KILL.

## DATA_TRUST_GATE

Средний риск.

Для full impact analysis требуется read access к GitHub code. Для пилота можно работать с public/open-source repos и local GitHub Action, чтобы не требовать передачи private code на сервер.

Preferred trust model:

- GitHub App with minimal repo scopes; или
- local/CI scanner, который отправляет только dependency metadata; или
- self-hosted runner for private enterprise repos.

## MVP

Не пытаться поддержать все API.

Начать с одной вертикали:

`Wildberries + Ozon Seller APIs`.

MVP:

1. authoritative source watcher;
2. normalized change ledger;
3. breaking/deprecation classifier;
4. GitHub App;
5. endpoint/field usage scanner for TypeScript/Python;
6. impact report;
7. issue generation;
8. bounded patch for deterministic renames/removals;
9. CI verification;
10. PR with source evidence and deadline.

## Potential moat

Если продукт выживет, moat — не AI:

- accumulated historical contracts of Russian marketplace APIs;
- mapping official changes to real code patterns;
- migration recipes/outcome history;
- provider-specific edge cases;
- regression fixtures;
- coverage across WB/Ozon/Yandex Market/CDEK/1C/payment APIs;
- integration with developer workflows.

## Главные риски

### 1. Category maturity

Глобальные Patchbase/KeelCat/Specc сами выглядят новыми. Demand механически понятен, но ещё не доказан многолетней большой выручкой.

### 2. Willingness to pay

Интеграторы могут решить, что Telegram + changelog + Codex достаточно. Это главный коммерческий kill gate.

### 3. Source quality

Если provider documentation/OpenAPI отстают от фактического API, автоматический patch может быть ложным. Нужно хранить authority/evidence и не выдавать догадки за contract truth.

### 4. Small initial TAM

Покупатель — не любой seller, а разработчик/интегратор/SaaS с собственной marketplace integration.

## Следующий kill test

До implementation:

1. собрать 50–100 реальных команд/сервисов с собственными WB/Ozon integrations;
2. взять 20–30 реальных API changes за последние месяцы;
3. определить, сколько из них требовали code changes;
4. найти публичные issue/commit evidence, сколько времени занимала адаптация;
5. поговорить минимум с 10 maintainers и выяснить, платили бы они за `affected code + verified PR`, а не просто alert;
6. сделать ручной concierge pilot на 3 open-source repos.

Если changelog + AI вручную уже достаточно и willingness-to-pay отсутствует — KILL.

## Предварительная оценка

`6.5/10`.

Очень хороший owner fit и понятный recurring pain, особенно для WB/Ozon integrations. Но коммерческая зрелость категории и willingness-to-pay слабее, чем у browser-extension payment infrastructure.