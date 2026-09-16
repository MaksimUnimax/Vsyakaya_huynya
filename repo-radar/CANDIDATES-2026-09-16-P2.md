# Repo Radar — Candidates — 2026-09-16 / Pass 2

Вторая партия реально просмотренных репозиториев. Этот файл является продолжением `CANDIDATES.md` и входит в anti-duplicate registry: перед новым поиском проверять все `CANDIDATES*.md`, а не только основной файл.

Как и раньше, `STRONG` / `MEDIUM` означает интерес для нашей игры, а не доказанную намеренную маскировку.

## Сильные кандидаты

### RR-011 — `Mosaera/core`

- URL: https://github.com/Mosaera/core
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 4/5 · зрелость 4/5 · амбиция 5/5 · public/private evidence 5/5
- Что это простыми словами: попытка собрать «AI-команду разработчиков в коробке». AI сам планирует работу, пишет изменения и готовит результат, но отдельные проверяющие и детерминированные правила решают, можно ли этот результат вообще пропускать дальше.
- Зачем: сделать автономную разработку менее похожей на «поверили агенту на слово» и больше похожей на нормальную инженерную организацию с независимым контролем качества и безопасности.
- Прямой public/private след: README говорит, что активная разработка идёт на private GitLab; GitHub нужен для публичной установки/дистрибуции. Каждый публичный релиз публикуется как свежий snapshot/single commit из внутреннего source, без внутренней Git-истории.
- Почему в радаре: это почти эталон «внутренняя разработка отдельно → наружу выдаётся очищенный публичный срез» плюс сам проект очень амбициозный.
- Не знаем: почему именно автор выбрал такую схему и связан ли переход к public с экономией CI; этого он не заявляет.

### RR-012 — `GodParticles1/Setpoint-CI-Mirror`

- URL: https://github.com/GodParticles1/Setpoint-CI-Mirror
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 5/5 · зрелость 4/5 · амбиция 3.5/5 · public/private evidence 5/5
- Что это простыми словами: похоже на систему, где на серверах стоят агенты, центральный сервер выдаёт им строго контролируемые проверки/операции, а оператор видит состояние через read-only security console. В публичном срезе видны проверки, controlled operations, ClickHouse-задачи, sysctl repair и другие инфраструктурные действия.
- Прямой public/private след: description буквально говорит `Public CI mirror`; private `GodParticles1/Setpoint` объявлен authoritative source of truth. В `.public-mirror/provenance.json` записан SHA private source и точный список публикуемых путей.
- Особенно интересно: публичный workflow сначала проверяет криптографическую привязку snapshot к private-source projection, потом гоняет frontend build/tests, Go tests/vet, security-boundary checks и race detector.
- Почему в радаре: структура почти один в один совпадает со схемой «private source → sanitised public CI projection».
- Не знаем: бизнес-назначение Setpoint целиком; public mirror специально показывает только projection, поэтому по нему безопасно говорить лишь о видимом infrastructure/security control plane.

### RR-013 — `7clan/medivault-ci-public`

- URL: https://github.com/7clan/medivault-ci-public
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 4/5 · зрелость 4/5 · амбиция 3.5/5 · public/private evidence 5/5
- Что это простыми словами: локальная система для медицинской практики/врача — пациенты, документы, визиты, рецепты, клинические заметки, отчёты, поиск, backup и локальная база. Есть macOS-упаковка и большой GUI/acceptance QA слой.
- Прямой public/private след: description говорит `history-free sanitized snapshots of the private canonical repo`; `.public-ci-source.json` хранит `private_source_sha` и purpose=`public-ci-mirror`.
- Почему в радаре: очень чистый пример private canonical development + public CI snapshot, причём наружу вынесена уже достаточно зрелая продуктовая поверхность с длинным bug register и GUI evidence.
- Не знаем: насколько далеко ушёл private canonical repo относительно публичного snapshot и почему автор выбрал public CI схему.

### RR-014 — `mindstone/rebel-app`

- URL: https://github.com/mindstone/rebel-app
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 3/5 · зрелость 4/5 · амбиция 4.5/5 · public/private evidence 5/5
- Что это простыми словами: AI-рабочий стол, который помнит проекты, умеет работать голосом и текстом, подключает внешние инструменты и может выполнять реальные действия; опасные действия должны ждать подтверждения пользователя.
- Большая идея: не очередной чат, а постоянное рабочее место с памятью, навыками, инструментами и агентным выполнением задач — встречи, почта, исследования, документы, календарь, тикеты и автоматизации.
- Прямой public/private след: description называет repo `Public mirror` и прямо говорит, что source of truth internal и публикуется one-way через CI.
- Почему не максимальная непрозрачность: сам public README уже честно рекламирует продукт; скрыта/отделена скорее внутренняя линия разработки, а не назначение продукта.

### RR-015 — `natyv-io/core`

- URL: https://github.com/natyv-io/core
- Статус: `MEDIUM`
- Last checked: 2026-09-16
- Оценки: непрозрачность 3/5 · зрелость 3/5 · амбиция 4.5/5 · public/private evidence 2/5
- Что это простыми словами: попытка сделать более лёгкую альтернативу Electron — desktop-приложение без упаковки целого Chrome внутрь каждого приложения. Логика приложения работает как WebAssembly-модуль внутри нативной оболочки.
- Зачем: меньше размер приложения и расход памяти, при этом разработчик может писать переносимую логику и запускать её в sandbox.
- Почему в радаре: `core` сам по себе мало что объясняет, 0 stars; связанный основной repo `natyv-io/natyv`, на который ссылается README, сейчас публично недоступен (404).
- Не знаем: основной repo private, удалён или просто переименован. Утверждать private нельзя.

### RR-016 — `project-pitchee/Core`

- URL: https://github.com/project-pitchee/Core
- Статус: `MEDIUM`
- Last checked: 2026-09-16
- Оценки: непрозрачность 4/5 · зрелость 3/5 · амбиция 3.5/5 · public/private evidence 1/5
- Что это простыми словами: измерительный движок для тренировки голоса. Он анализирует аудио и выдаёт метрики pitch/F0, naturalness и другие оценки, ориентированные на voice-feminization training.
- Для кого: в README указаны transgender women, voice coaches, speech therapists и исследовательские сценарии; отдельно написано, что это не медицинская диагностика и не определитель личности.
- Почему в радаре: repo создан недавно, называется просто `Core`, description/topics пустые, а внутри неожиданно узкий и полноценный cross-platform C++/ONNX продукт.
- Не знаем: существует ли отдельный закрытый продуктовый слой или это просто нейтрально названный open-source core.

### RR-017 — `QuintonMcLeod/tradebot-public`

- URL: https://github.com/QuintonMcLeod/tradebot-public
- Статус: `MEDIUM`
- Last checked: 2026-09-16
- Оценки: непрозрачность 2/5 · зрелость 4/5 · амбиция 4/5 · public/private evidence 3/5
- Что это простыми словами: автоматический торговый робот с desktop dashboard. Он умеет гонять несколько десятков стратегий, делать backtest/paper trading, выбирать стратегию через внутренний «турнир» и отправлять реальные сделки брокерам/криптобиржам.
- Почему интересно: в одном приложении собраны стратегии, risk controls, paper/live режимы, OANDA/IBKR/Gemini/Coinbase/Kraken и optional AI review/tuning.
- Почему не STRONG: назначение проекта открыто написано в README; слово `Public Mirror` есть, но само по себе не доказывает скрытую уникальную разработку.
- Важно: наличие кода и заявленных стратегий не доказывает прибыльность или безопасность торговли; это high-risk software.

### RR-018 — `vaibhav0xq/kyro-public`

- URL: https://github.com/vaibhav0xq/kyro-public
- Статус: `MEDIUM`
- Last checked: 2026-09-16
- Оценки: непрозрачность 2/5 · зрелость 4/5 · амбиция 4/5 · public/private evidence 4/5
- Что это простыми словами: «кредитная/репутационная проверка» криптокошелька перед тем, как переводить ему деньги, давать займ, делать escrow или массовую выплату. Сервис выдаёт allow/caution/block, причины и рекомендуемый лимит.
- Большая идея: превратить историю блокчейн-кошелька, связи/attestations и coverage данных в понятное решение до транзакции, а не расследовать после потери денег.
- Public/private разделение: public repo содержит сайт, SDK, OpenAPI, docs и клиентскую логику; README прямо говорит, что scoring pipeline, decision rules, data providers и persistence работают в hosted service и в repo не входят.
- Почему не STRONG: продукт публично и подробно описан; закрыт именно engine, а не назначение.

### RR-019 — `thienvyma/autoreason`

- URL: https://github.com/thienvyma/autoreason
- Статус: `MEDIUM`
- Last checked: 2026-09-16
- Оценки: непрозрачность 2/5 · зрелость 3/5 · амбиция 4/5 · public/private evidence 2/5
- Что это простыми словами: метод, который заставляет AI не бесконечно «улучшать» ответ, а каждый раунд сравнивать три варианта: оставить старый как есть, сделать жёсткую переработку или собрать гибрид. Независимые судьи вслепую выбирают победителя, и «ничего не менять» считается полноценным вариантом.
- Зачем: обычная команда «покритикуй и улучши ещё раз» часто портит уже хороший ответ; проект исследует, как научить refinement вовремя остановиться.
- Почему в радаре: `AigenLabs public mirror`, 0 stars, большой пакет экспериментов/результатов и paper; идея сама по себе необычна.
- Почему не STRONG: README сразу полностью раскрывает исследование; это скорее интересная находка, чем маскирующийся продукт.

## Очень сильные свидетельства именно схемы private → public CI

### RR-P01 — `intelege-ma/hermes-agent-ci`

- URL: https://github.com/intelege-ma/hermes-agent-ci
- Тип: `PATTERN EVIDENCE`
- Last checked: 2026-09-16
- Это не новый самостоятельный продукт, а private fork открытого Hermes Agent.
- Почему очень важно для нашей гипотезы: README буквально говорит, что это **sanitised, fresh-history public CI mirror**, который используется `exclusively to run GitHub Actions on a private fork without exposing private repository history`.
- Ещё прямее: автор пишет, что snapshots отправляются сюда, чтобы гонять lint/test/build на **free GitHub Actions runners**.
- Вывод: это прямое публичное доказательство ровно той механики, которую мы обсуждали — private canonical/fork остаётся закрытым, наружу выгружается очищенный snapshot без private history ради бесплатного CI. Это НЕ доказательство, что все похожие repo созданы по той же причине.

## CONTROL / REJECT — просмотрены, повторно не тратить время без нового сигнала

### RR-C15 — `harness-lens/core`
- URL: https://github.com/harness-lens/core
- Что это: анализатор instruction-файлов для coding AI (`AGENTS.md`, `CLAUDE.md`, Cursor rules и т.п.): ищет дубли/противоречия и оценивает лишнюю стоимость prompt-токенов.
- Почему CONTROL: интересный инструмент, но публично всё объяснено.

### RR-C16 — `noy-db/core`
- URL: https://github.com/noy-db/core
- Что это: encrypted offline-first document store с zero-knowledge подходом и pluggable backends.
- Почему CONTROL: назначение уже прямо в description.

### RR-C17 — `gtfo-ai/platform`
- URL: https://github.com/gtfo-ai/platform
- Что это: AI software factory — ticket проходит через цепочку специализированных coding-agents до reviewable merge request.
- Почему CONTROL: metadata снаружи пустая, но README сразу раскрывает идею и прямо говорит, что проект built in public.

### RR-C18 — `miashopstudio/platform`
- URL: https://github.com/miashopstudio/platform
- Вывод: size anomaly оказался почти целиком огромным `index.html`; признаков зрелого скрытого проекта не найдено.

### RR-C19 — `foundersoftwarevala/platform`
- URL: https://github.com/foundersoftwarevala/platform
- Вывод: очень большой по size, но README показывает обычный Lovable/generated web project `Color Enhancer`; размер сам по себе был ложным сигналом.

### RR-C20 — `TracyHQ/platform`
- URL: https://github.com/TracyHQ/platform
- Что это: registry/extensions intelligence для WordPress/Joomla/Shopify.
- Почему CONTROL: назначение прямо в description.

### RR-C21 — `axiolid/kernel`
- URL: https://github.com/axiolid/kernel
- Что это: geometry kernel для CAD/BIM/computational geometry.
- Почему CONTROL: технически серьёзно, но description/topics полностью прозрачны.

### RR-C22 — `FreeLinX/kernel`
- URL: https://github.com/FreeLinX/kernel
- Что это: Linux-дистрибутив без GNU userland, вокруг LLVM + musl.
- Почему CONTROL: README подробно объясняет идею; скрытого продукта не обнаружено.

### RR-C23 — `erkamuzuncayir/primordial-engine`
- URL: https://github.com/erkamuzuncayir/primordial-engine
- Что это: C++20 game engine с custom ECS, Vulkan/DX11, particles, day/night/seasons и editor.
- Public/private след: GitHub — read-only mirror, активная разработка на личном Forgejo.
- Почему CONTROL: mirror реальный, но назначение обычного game engine полностью раскрыто.

### RR-C24 — `HomeScaleCloud/homescale-public`
- URL: https://github.com/HomeScaleCloud/homescale-public
- Что это: Infrastructure-as-Code для private cloud/homelab семьи и друзей на Kubernetes/Talos/Terraform/ArgoCD/Tailscale.
- Почему CONTROL: public mirror, но назначение полностью прозрачно и это не отдельная необычная продуктовая идея.

### RR-C25 — `tehnik58/public-mirror-bazov`
- URL: https://github.com/tehnik58/public-mirror-bazov
- Что видно: текущий tree почти пустой (`README.md` + `.gitignore`), README содержит только `open-xr-hand-traching-bazov`, а исторический repo size очень большой.
- Почему REJECT: недостаточно текущей содержательной поверхности; похоже на старое/очищенное зеркало, а не пригодный для разбора активный кандидат.

## Примечание к следующему поиску

Перед новым проходом искать полное `owner/repo` по всем файлам `repo-radar/CANDIDATES*.md`. Совпадение означает «уже видели»; повторно открывать только при новом сильном сигнале или по прямой команде владельца.
