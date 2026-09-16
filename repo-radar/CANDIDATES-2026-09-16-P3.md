# Repo Radar — Pass 3 — PUBLIC_CANONICAL_MASKED

Дата проверки: **2026-09-16**.

Этот проход выполнялся уже по уточнённому target: **public active working source + слабая/маскирующая GitHub-витрина**. Private-source mirrors/snapshots не считаются успехом.

## Сильные кандидаты

### RR-020 — `robertpelloni/workspace`

- URL: https://github.com/robertpelloni/workspace
- Статус: `STRONG`
- Оценки: маскировка/низкая обнаружимость 5/5 · зрелость 4/5 · амбиция/ценность 5/5 · уверенность public working source 4/5
- Public surface: repo называется просто `workspace`, description — `My development workspace`, topics отсутствуют, ~2 stars.
- Что это на самом деле: огромный federated monorepo/orchestration hub примерно для 125+ связанных проектов и десятков submodules. Внутри AI-agent infrastructure, game/rhythm engines, browser forks, desktop/web products, crypto/trading experiments и слой автоматизации, который синхронизирует, собирает, мержит и развёртывает связанные проекты.
- Самая необычная часть: README описывает multi-model maintenance pipeline `Claude → Gemini → GPT → DeepSeek`, а roadmap ведёт к zero-touch `prompt-to-deploy`.
- Признаки зрелости: AGENTS/CLAUDE rules, AI contribution reports, большой changelog, build results, memory/devkit infrastructure, десятки/сотни submodules, build/sync/merge scripts, Docker/Prometheus/MCP/CI.
- Почему соответствует target: GitHub search result выглядит как обычный персональный `workspace`; реальный масштаб — целая программная экосистема + AI orchestration — становится виден только после открытия и чтения README/docs.
- Срок разработки: текущий GitHub repo создан **2025-10-25** (~10 месяцев 22 дня). В текущем дереве есть workspace/AI-orchestration документы с датой **2025-01-21**, поэтому наблюдаемое project evidence уходит как минимум примерно на **1 год 8 месяцев** назад. Это дата документов в текущем дереве, а не доказательство первоначального commit в тот день. Фактическое начало всей экосистемы неизвестно и может быть раньше.
- Что неизвестно: намеренно ли слабая metadata выбрана для снижения discoverability; какую часть 125+ repo следует считать одним продуктом, а какую — агрегированной личной экосистемой.

### RR-021 — `specht/workspace`

- URL: https://github.com/specht/workspace
- Статус: `STRONG`
- Оценки: маскировка/низкая обнаружимость 5/5 · зрелость 4/5 · амбиция/ценность 3.5/5 · уверенность public working source 5/5
- Public surface: generic `workspace`, **description пустой, topics пустые, homepage пустой**, около 4 stars.
- Что это на самом деле: `Hackschule Workspace` — браузерная Linux-среда для обучения информатике. Ученики получают постоянный workspace с VS Code, terminal, Git, compilers, databases и большим набором языков/SDK без установки на свой компьютер.
- Реальный продуктовый масштаб: BASIC/Pascal/C/Python/JS/Rust, web development, MySQL/Neo4j, graphics, interactive stories, Flutter+Android APK, TCP/IP labs, LaTeX; shared live apps, network isolation и persistent school/home environments.
- Признаки зрелости: Docker-based deployment, отдельный школьный production server, Playwright E2E/toolchain tests, login/session/workspace lifecycle tests, network-isolation tests, tutorial verification вплоть до Flutter APK build, bootstrap scripts и серверная эксплуатация на Hetzner.
- Почему соответствует target: по GitHub search result невозможно понять, что это практически self-hosted educational cloud IDE / managed development platform. README раскрывает это только после входа в repo.
- Срок разработки: public repo создан **2024-10-11**, то есть почти **1 год 11 месяцев** к моменту проверки; активные pushes продолжались в сентябре 2026. Более раннее фактическое начало по текущему evidence не установлено.
- Что неизвестно: это сознательная маскировка или просто отсутствие времени/интереса к GitHub metadata; насколько продукт используется кроме указанного школьного deployment.

## Средние кандидаты

### RR-022 — `GS-SystemAnalyzer/core`

- URL: https://github.com/GS-SystemAnalyzer/core
- Статус: `MEDIUM`
- Оценки: маскировка 3.5/5 · зрелость 4/5 · амбиция 3.5/5 · public working source 5/5
- Public surface: repo `core`, description пустой, topics пустые, ~2 stars; owner `GS-SystemAnalyzer` всё же частично выдаёт назначение.
- Что это: cross-platform system telemetry + disk intelligence cockpit: Task Manager/TreeSize/HWiNFO-like product с Flutter frontend и ASP.NET backend, realtime SignalR, process explorer, thermal sensors, duplicate/large-file analysis, bulk deletion with dry-run, history/reporting и management actions.
- Состояние: README говорит `Pre-Beta v2.0`, public beta планируется на Sep 2026, official release Oct/Nov 2026; большая часть beta feature matrix уже marked shipped.
- Срок разработки: repo создан **2026-04-06**, около **5 месяцев 10 дней**. Номер v2.0 сам по себе не доказывает более раннюю разработку; подтверждённого pre-repo срока пока нет.
- Почему только MEDIUM: продукт серьёзнее публичной metadata, но owner name уже содержит `SystemAnalyzer`, поэтому discoverability не настолько низкая, как у RR-020/021.

### RR-023 — `digitalwayhk/core`

- URL: https://github.com/digitalwayhk/core
- Статус: `MEDIUM`
- Оценки: маскировка 4/5 · зрелость 4/5 · амбиция 3.5/5 · public working source 5/5
- Public surface: generic `core`, description пустой, topics пустые, ~4 stars.
- Что это: Go framework, который пытается стандартизировать разработку business services специально для AI-agent collaboration: auth, CRUD/manage UI, Public/Private API contracts, persistence, WebSocket, transactions/state machines, caching/write-behind, RBAC, microservices, horizontal scale, statistics/reporting, multi-tenant DB routing и built-in operational topology.
- Необычная ставка: максимально фиксированные conventions, чтобы AI мог генерировать бизнес-сервисы предсказуемо, а человек мог аудировать небольшой объём business code.
- Срок разработки: public repo создан **2022-09-08**, то есть уже около **4 лет**; push activity продолжается в день проверки 2026-09-16. Это самый длинный подтверждённый public-development срок среди новых кандидатов этого прохода.
- Почему не STRONG: это скорее framework/engineering foundation, чем явно отдельный коммерческий продукт, и README после открытия очень подробно раскрывает цель.

### RR-024 — `RosyGraph/chrimbus`

- URL: https://github.com/RosyGraph/chrimbus
- Статус: `MEDIUM`
- Оценки: маскировка 5/5 · зрелость 3/5 · амбиция/ценность 2.5/5 · public working source 5/5
- Public surface: бессмысленное для постороннего имя `chrimbus`, description пустой, topics пустые, около 3 stars; при этом repo ~273 MB и активно развивается.
- Что это: language-agnostic format + service + website для создания анимаций на физической матрице адресуемых LEDs.
- README прямо ссылается на `v0` как original implementation, то есть текущая версия является как минимум вторым поколением реализации.
- Срок разработки: current repo создан **2024-12-12**, около **1 года 9 месяцев**; `v0` существует внутри истории текущего repo, но более ранний календарный срок пока не проверен.
- Почему только MEDIUM: отличная маскировка и реальная долгая public development, но пока виден скорее серьёзный maker/art-system, чем крупный коммерческий продукт.

## Слабая аномалия

### RR-025 — `0f0x64/platform`

- URL: https://github.com/0f0x64/platform
- Статус: `WEAK`
- Public surface: максимально непрозрачный owner + generic `platform`, description/topics/homepage отсутствуют, ~5 stars, около 263 MB, активный push 2026-09-16.
- Что удалось понять: Windows C++/DirectX11 editor/runtime с shader reflection/recompilation, timeline/audio/project files и отдельными editor/release/reflector build modes. В репозитории нет нормального README, поэтому конечная цель пока не доказана.
- Срок разработки: repo создан **2024-03-20**, около **2.5 лет** публичной истории.
- Почему WEAK: masking signal очень сильный, но пока не установлен достаточный продуктовый/коммерческий масштаб. Повторно глубоко копать только при новом сигнале.

## CONTROL — прозрачные результаты этого прохода

### RR-C15 — `JaaJSoft/workspace`
- Большой self-hosted productivity suite, но description и topics сразу перечисляют files/chat/mail/calendar/notes/AI assistants; не masked target.

### RR-C16 — `muxi-ai/runtime`
- Runtime для MUXI formations; description/topics/homepage прямо объясняют назначение.

### RR-C17 — `pixlise/core`
- Backend/API для PIXLISE platform; назначение прямо указано в description и README.

### RR-C18 — `Supernova-Labs-Org/impulse`
- Production-minded HTTP/3/QUIC edge runtime/proxy; description, topics и README полностью объясняют продукт.

### RR-C19 — `Mental-Wealth-Academy/platform`
- Огромный agentic/research LMS, но owner, description, topics и homepage подробно раскрывают назначение.

### RR-C20 — `Medal-Social/meda`
- Shared UI/runtime package для Meda/Medal Social; owner, description, topics и homepage раскрывают продукт.

### RR-C21 — `IgeNiaI/QCDE`
- Quake Champions: Doom Edition mod. Название-аббревиатура непрозрачно, но это game mod, а не интересующий нас рабочий коммерческий/инженерный продукт.

## Вывод прохода

После исправления критерия качество поиска заметно выросло: strongest новые совпадения — **RR-020 `robertpelloni/workspace`** и **RR-021 `specht/workspace`**. Оба действительно public и активно развиваются, при этом GitHub search surface сильно занижает реальный масштаб. Private-source mirrors в эту выборку больше не попадают.
