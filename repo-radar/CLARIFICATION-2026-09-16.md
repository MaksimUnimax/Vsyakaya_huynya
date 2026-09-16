# Repo Radar — target clarification — 2026-09-16

Эта запись исправляет смещение критериев во втором проходе.

## Главная цель

Ищем **публичные активные рабочие репозитории, которые маскируют или сильно занижают своё реальное назначение/масштаб на публичной GitHub-витрине**.

Не ищем private development, вынесенный наружу только как mirror/snapshot/CI projection.

## Переклассификация Pass 2

### OFF_TARGET_PRIVATE_SOURCE

#### RR-011 — `Mosaera/core`
- Причина: GitHub description прямо говорит, что это public mirror для установки, а development идёт на GitLab.
- Public repo age на 2026-09-16: около 20 дней (`created_at` 2026-08-27).
- Интересный продукт, но не наша основная схема.

#### RR-012 — `GodParticles1/Setpoint-CI-Mirror`
- Причина: private authoritative source of truth + public CI projection.
- Public repo age: около 26 дней (`created_at` 2026-08-21).
- Оставляем как отрицательный/control пример.

#### RR-013 — `7clan/medivault-ci-public`
- Причина: description прямо называет repo history-free sanitized snapshot private canonical repo.
- Public repo age: около 10 дней (`created_at` 2026-09-06).
- Не target.

#### RR-014 — `mindstone/rebel-app`
- Причина: public mirror; source of truth internal и публикуется one-way.
- Public repo age: около 3 месяцев (`created_at` 2026-06-16).
- Сам продукт интересен, но маскировки назначения почти нет и основная разработка не public.

#### RR-P01 — `intelege-ma/hermes-agent-ci`
- Причина: README прямо говорит, что это sanitised public CI mirror private fork.
- Сохраняем только как evidence существования другой схемы; в поисковый target больше не входит.

## Кандидаты, которые всё ещё соответствуют новой цели

### RR-016 — `project-pitchee/Core`
- Статус после уточнения: `MEDIUM / ON-TARGET`.
- Public repo age: около 4 дней (`created_at` 2026-09-12).
- Почему остаётся: repo реально public, generic `Core`, description пустой, topics пустые, а внутри неожиданно специализированный cross-platform voice-analysis product.
- Ограничение: public история очень молодая; фактическое начало разработки неизвестно. Большой объём/зрелость не доказывают, где и когда работа началась.

### RR-015 — `natyv-io/core`
- Статус после уточнения: `WEAK/MEDIUM`.
- Public repo age: около 18 дней (`created_at` 2026-08-29).
- Почему не выбрасываем полностью: это public source и продуктовая идея серьёзнее обычного generic `core`.
- Почему понижаем: description уже объясняет, что это natyv runtime, а topics (`desktop-app`, `wasm`, `webassembly`, `zig`) заметно снижают степень маскировки.

## Прозрачные проекты из Pass 2 — CONTROL

### RR-017 — `QuintonMcLeod/tradebot-public`
Назначение прямо раскрыто; не masked target.

### RR-018 — `vaibhav0xq/kyro-public`
Продукт, сайт, API и wallet-intelligence назначение подробно раскрыты; не masked target.

### RR-019 — `thienvyma/autoreason`
README полностью объясняет research idea; не masked target.

## Что меняется в следующих проходах

Перед глубоким чтением обязательный canonicality gate:

`PUBLIC ACTIVE SOURCE?` → да → продолжаем.

`PRIVATE SOURCE + PUBLIC MIRROR/SNAPSHOT/CI?` → сразу CONTROL/OFF_TARGET.

Для каждого оставшегося кандидата обязательное поле `Срок разработки`, где отдельно указываются public repo age, earliest verified evidence и реальный срок проекта, если он доказуем.
