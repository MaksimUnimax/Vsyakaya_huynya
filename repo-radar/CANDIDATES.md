# Repo Radar — Candidates

Журнал реально просмотренных репозиториев. Даже отклонённые кандидаты остаются здесь, чтобы не находить и не разбирать их заново.

`STRONG`/`MEDIUM` означает интерес для нашей игры, а не доказанную намеренную маскировку. Намерение автора без прямых свидетельств не приписываем.

Последний первичный проход: **2026-09-16**.

## Сильные кандидаты

### RR-001 — `thetis-agent/runtime`

- URL: https://github.com/thetis-agent/runtime
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 5/5 · зрелость 4/5 · амбиция 5/5 · public/private evidence 2/5
- Что это: многопользовательская AI-система, в которой ИИ может писать и устанавливать новые модули, меняя собственные инструменты, память, prompt, subagents и последовательность работы.
- Зачем: вместо заранее зашитого ассистента получается среда, где поведение ИИ может постепенно перестраиваться самим ИИ.
- Почему в радаре: repo создан 2026-09-09, имя просто `runtime`, description пустой, около 1 star, но уже есть архитектура, sandbox/fence, packages, gateway, benchmarks, deployment и серьёзная многопользовательская модель.
- Не знаем: был ли проект раньше private и зачем выбрано настолько нейтральное публичное оформление.

### RR-002 — `cambrian-sh/core`

- URL: https://github.com/cambrian-sh/core
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 5/5 · зрелость 4.5/5 · амбиция 5/5 · public/private evidence 3/5
- Что это: похоже на «операционную систему» для команды AI-агентов: есть планирование, исполнители, долговременная память, граф знаний, проверяющие, права доступа и инфраструктура.
- Зачем: превращать одиночный AI в управляемую организацию из разных AI-работников.
- Почему в радаре: generic `core`, пустые description/topics, около 4 stars и ~111 MB, при этом внутри production-подобная архитектура, тесты, gRPC, MCP, PostgreSQL, agent pools, security и chaos/benchmark дисциплина.
- Сильный след разделения: OSS-ядро явно защищено от попадания premium-кода, то есть коммерческий слой проектируется отдельно.
- Не знаем: насколько большая premium/product часть уже существует вне OSS.

### RR-003 — `ayazkussan/workspace` → связанный `budlum-xyz/budlum`

- URLs: https://github.com/ayazkussan/workspace ; https://github.com/budlum-xyz/budlum
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки workspace: непрозрачность 4/5 · зрелость 4/5 · амбиция 5/5 · public/private evidence 4/5
- Что это: workspace — огромная внутренняя память/лаборатория разработки Budlum; Budlum — экспериментальная сеть расчётов/хранения с ZK VM, распределённым хранением и on-chain AI.
- Почему в радаре: GitHub показывает workspace как public, но его description называет его `Internal ... Private`, а README прямо говорит, что это внутреннее рабочее хранилище и «останется private».
- Самая необычная идея Budlum: в 3.0 автор заявляет модель, где постоянно хранится только маленький «рецепт», а содержимое должно детерминированно воспроизводиться заново.
- Осторожно: заявления о почти нулевой стоимости хранения нельзя принимать как доказанный прорыв; критично понять, для какого класса данных рецепт реально восстанавливает исходные байты.
- Не знаем: public workspace — ошибка, устаревший текст или сознательное изменение модели публикации.

### RR-004 — `lkh0310kr/workspace`

- URL: https://github.com/lkh0310kr/workspace
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 4/5 · зрелость 3.5/5 · амбиция 5/5 · public/private evidence 2/5
- Что это: единая инженерная рабочая среда: код, Markdown, терминал и браузер уже объединены, а дальше автор строит собственный 3D-engine, hardware simulator и AI-навыки для CAD/CAE.
- Большая цель: со временем объединить инструменты класса Figma/Photoshop, Blender, video editor, CAD/engineering и AI в одной оболочке.
- Почему в радаре: repo называется просто `workspace`, description/topics пустые, ~2 stars, но глубокие документы показывают гораздо более крупный замысел, чем публичная витрина.
- Не знаем: это сознательная непрозрачность или просто рабочее название личного проекта.

### RR-005 — `dnettoRaw/app-core-public`

- URL: https://github.com/dnettoRaw/app-core-public
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 5/5 · зрелость 4/5 · амбиция ?/5 · public/private evidence 4/5
- Что это: публичные Rust-компоненты большого runtime-фундамента: API, control plane, scheduler, security, storage, gateway, peer RPC, distributed contracts и providers.
- Почему в радаре: README прямо говорит, что это source mirror только уже опубликованных crates и что **unpublished development work здесь отсутствует**.
- Интерес: публично видны «детали двигателя», но конечный продукт/свежая разработка остаются вне этого repo.
- Не знаем: что именно является конечным AppCore-продуктом и насколько он велик.

### RR-006 — `brain-models/core`

- URL: https://github.com/brain-models/core
- Статус: `STRONG`
- Last checked: 2026-09-16
- Оценки: непрозрачность 4/5 · зрелость 2.5/5 · амбиция 5/5 · public/private evidence 1/5
- Что это: попытка строить AI не как один большой LLM, а как набор специализированных подсистем по аналогии с таламусом, гиппокампом, мозжечком, базальными ганглиями и global workspace мозга.
- Зачем: разные части можно независимо заменять, улучшать и экспериментально сравнивать.
- Почему в радаре: generic `core`, пустой description/topics, мало stars, а внутри довольно фундаментальная исследовательская теза.
- Не знаем: насколько концепция даст практическое преимущество; пока это больше исследовательская архитектура, чем зрелый продукт.

### RR-007 — `Genesis-Quant/runtime`

- URL: https://github.com/Genesis-Quant/runtime
- Статус: `MEDIUM`
- Last checked: 2026-09-16
- Оценки: непрозрачность 4/5 · зрелость 4/5 · амбиция 3.5/5 · public/private evidence 1/5
- Что это: исследовательская фабрика для алгоритмической торговли — данные, факторы, backtest, автоматический подбор параметров, sensitivity и out-of-sample проверки.
- Зачем: проверять торговые идеи и снижать риск того, что стратегия просто красиво подогнана под прошлое.
- Почему в радаре: название `runtime`, description/topics пустые, 0 stars, а внутри уже зрелый стек анализа и исполнения исследований.
- Не знаем: есть ли над этим отдельный продукт или закрытый торговый слой.

## Средние/слабые аномалии

### RR-008 — `yuxua24/workspace`

- URL: https://github.com/yuxua24/workspace
- Статус: `MEDIUM`
- Last checked: 2026-09-16
- Что это: исследовательский workspace, объединяющий MerchantBench, Hermes Agent и pi-agent, с большим аудитом интеграций.
- Почему заметили: создан 2026-09-01, 0 stars, description/topics пустые, ~62 MB; default branch сам выдаёт `autoresearch/pi-agent-merchantbench...`.
- Вывод: интересная research-сборка, но пока нет признаков самостоятельного скрытого продукта.

### RR-009 — `hena-agent/workspace`

- URL: https://github.com/hena-agent/workspace
- Статус: `WEAK`
- Last checked: 2026-09-16
- Что это: большой mirror/fork-подобный workspace вокруг OpenCode.
- Аномалия: repo public, но description говорит `Private mirror of opencode`; ~298 MB, 0 stars.
- Вывод: public/private-противоречие есть, но пока это больше похоже на зеркало существующего проекта, чем на самостоятельную необычную идею.

### RR-010 — `between-sundays/workspace`

- URL: https://github.com/between-sundays/workspace
- Статус: `WEAK`
- Last checked: 2026-09-16
- Что видно: очень крупный (~275 MB) workspace с 0 stars; description упоминает `agent contributions`, `the brain` и production system.
- Вывод: потенциально странный, но пока недостаточно разобран, чтобы считать сильным кандидатом.

## CONTROL — уже просмотрены, повторно не тратить время без нового сигнала

### RR-C01 — `GitM-Labs/runtime`
- URL: https://github.com/GitM-Labs/runtime
- Что это: система, оптимизирующая выполнение GPU workloads по telemetry.
- Почему CONTROL: проект сам очень интересный и амбициозный, но публичное описание и README подробно объясняют назначение; непрозрачности почти нет.

### RR-C02 — `amirrrreza1/Workspace`
- URL: https://github.com/amirrrreza1/Workspace
- Что это: self-hosted персональный органайзер напоминаний/заметок/уведомлений.
- Почему CONTROL: generic имя и пустой description, но README полностью раскрывает обычное назначение.

### RR-C03 — `Powerpowername/Engine`
- URL: https://github.com/Powerpowername/Engine
- Что это: экспериментальный C++/DirectX 12 render engine с terrain, shadows и массовым instancing.
- Почему CONTROL: generic имя, но README подробно и честно описывает проект; похоже на серьёзный graphics/portfolio project, не на скрытый продукт.

### RR-C04 — `UniClipboard/Engine`
- URL: https://github.com/UniClipboard/Engine
- Что это: end-to-end encrypted P2P core для синхронизации clipboard.
- Почему CONTROL: назначение уже прямо написано в description.

### RR-C05 — `SolZeroAI/platform`
- URL: https://github.com/SolZeroAI/platform
- Что это: платформа для развёртывания AI-агентов на Cloudflare.
- Почему CONTROL: description сразу раскрывает продукт; generic repo-name не помогает скрывать смысл.

### RR-C06 — `solveathome/platform`
- URL: https://github.com/solveathome/platform
- Что это: framework, где AI-агенты разных людей совместно решают одну открытую проблему и взаимно проверяют результаты.
- Почему CONTROL: идея необычная, но description и topics прямо её рекламируют.

### RR-C07 — `CodeDrobe/core`
- URL: https://github.com/CodeDrobe/core
- Что это: reversible theming runtime для AI desktop apps.
- Почему CONTROL: description и topics очень конкретные.

### RR-C08 — `DisruptorProxy/Core`
- URL: https://github.com/DisruptorProxy/Core
- Что это: GUI-клиент для Xray/VLESS/VMess/Trojan/Shadowsocks и других proxy-протоколов.
- Почему CONTROL: всё сразу раскрыто description/topics.

### RR-C09 — `tome-io/core`
- URL: https://github.com/tome-io/core
- Что это: библиотека/клиенты для поиска и загрузки книг через extensions.
- Почему CONTROL: назначение прямо в description.

### RR-C10 — `workdock-dev/engine`
- URL: https://github.com/workdock-dev/engine
- Что это: orchestration engine для разработки ПО с AI agents.
- Почему CONTROL: description, homepage и topics прямо объясняют идею.

### RR-C11 — `klar-im/engine`
- URL: https://github.com/klar-im/engine
- Что это: локальный inference engine для spam filtering/классификации.
- Почему CONTROL: topics очень явно раскрывают назначение.

### RR-C12 — `flaught/core`
- URL: https://github.com/flaught/core
- Что это: adversarial AI-reviewer для pull requests.
- Почему CONTROL: description и topics полностью прозрачны.

### RR-C13 — `virtfoundry/core`
- URL: https://github.com/virtfoundry/core
- Что это: Kubernetes/KubeVirt private-cloud platform.
- Почему CONTROL: description/topics сразу всё объясняют.

### RR-C14 — `aubrey-anima/core`
- URL: https://github.com/aubrey-anima/core
- Что это: world-simulation engine для LLM-driven agents с памятью и отношениями.
- Почему CONTROL: идея интересная, но description/topics её прямо раскрывают — не наш основной тип аномалии.

## Правило новых записей

Новый repo получает новый `RR-...` ID только после реального просмотра metadata + хотя бы README/корневого дерева. Простые search hits сюда не заносим.

Если существующий repo переименовали, новую карточку не создаём: дописываем alias и новое имя в старую.
