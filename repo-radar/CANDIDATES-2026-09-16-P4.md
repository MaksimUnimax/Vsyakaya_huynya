# Repo Radar — Candidates — 2026-09-16 / Pass 4

Четвёртый проход после уточнения цели: ищем именно **публичные рабочие репозитории**, где наружная GitHub-витрина скрывает, искажает или сильно занижает реальное назначение проекта. Private canonical → public CI mirror здесь не считается попаданием.

Для возраста отдельно фиксируем только то, что можно наблюдать публично. `created_at` — нижняя граница видимой публичной истории, а не доказанная дата начала идеи.

## Сильные попадания

### RR-026 — `AgentsLoop/PlayGround`

- URL: https://github.com/AgentsLoop/PlayGround
- Статус: `STRONG`
- Last checked: 2026-09-16
- Публичная витрина: имя `PlayGround`, description `Playground for browser game experiments`, 0 stars, topics нет. Текущий main почти пуст: `.github/` и крошечный README с той же фразой.
- Возраст: public repo создан 2026-09-01; на 2026-09-16 — около 15 дней видимой истории. Связанный движок `AgentsLoop/OhMyGithub` создан 2026-08-23 — около 24 дней видимой истории. Более ранний источник не доказан.
- Что это простыми словами: не просто папка, где человек делает браузерные игрушки, а испытательный полигон для конвейера, который пытается превращать GitHub Issue в готовый программный проект силами AI-агента.
- Как работает: Issue задаёт цель; workflow распознаёт OpenCode-задачу и вызывает reusable workflows из `AgentsLoop/OhMyGithub`; агент получает права работать с contents/issues/PR. В поздних заданиях прямо вводятся builder/critic роли: один агент строит, другой со свежим контекстом проверяет результат, сравнивает работающий артефакт с референсами и заставляет переделывать.
- Почему масштаб больше витрины: среди задач есть не только browser games, но и native Android APK; встречаются skill-installation tests, image-search, загрузка 3D-моделей, gauntlet-loop и проверки clean checkout. В репо 100+ issues, то есть это уже серия повторяемых испытаний, а не одна демка.
- Связанный `AgentsLoop/OhMyGithub` уже прямо описывает движок как систему, которая строит complete browser games/apps из одного GitHub issue prompt через OpenCode, tests, skills и previews. Значит скрытая часть PlayGround — не существование AI вообще, а роль этого невзрачного repo как acceptance/benchmark/proving ground для автономной разработки.
- Почему в радаре: GitHub search-result выглядит как почти пустая песочница с браузерными играми; реальная рабочая активность в issues/workflows показывает гораздо более системный эксперимент с автономным software delivery.
- Не знаем: намеренно ли автор занизил описание ради незаметности; это не доказано. Также размер repo сильно выше текущего main, но точная причина (history/branches/generated artifacts) не подтверждена.

### RR-027 — `beyondworks/argo`

- URL: https://github.com/beyondworks/argo
- Статус: `STRONG`
- Last checked: 2026-09-16
- Публичная витрина: имя `argo`, description отсутствует, topics отсутствуют, homepage отсутствует, около 5 stars. По результату поиска вообще не видно, что внутри коммерчески ориентированный AI-продукт.
- Возраст: public repo создан 2026-07-10; на 2026-09-16 — чуть больше 2 месяцев подтверждённой публичной разработки. Более раннюю историю пока не доказали.
- Что это простыми словами: попытка сделать на компьютере пользователя **маленькую фирму из AI-сотрудников**, которые имеют роли, общую долговременную память, умеют делегировать друг другу работу, проводить «совещания», выполнять расписания и продолжать работу через разные модели.
- Ключевой принцип: не один чат-бот и не облачный SaaS. Основные агенты, память и orchestration работают локально на машине владельца. Пользователь может подключать Claude, Codex, Gemini, GLM, Kimi и другие runner-ы. Облачная часть нужна в основном для аккаунта, зашифрованной синхронизации между устройствами и мессенджеров.
- Память: агентная «компания» хранит общий рабочий контекст в файловой структуре — journal, notes, projects, wiki-связи. Идея в том, чтобы новые AI-сессии не начинали жизнь с нуля, а приходили в уже накопленную организационную память.
- Автономность: автор с 2026-07-30 перешёл к модели, где crews получают очень широкие возможности — чтение/запись файлов, shell, web, MCP. Опасные внешние действия могут возвращаться на approval-карты, но внутри хоста это не является настоящим security sandbox.
- Очень важный признак зрелости: SECURITY.md не делает вид, будто prompt injection решена. Автор прямо пишет, что успешная инъекция может превратиться в локальное выполнение команд от имени пользователя и что настоящий OS-level sandbox пока не поставляется. Есть запретные зоны для credentials/control files, но автор честно описывает обходные границы shell и внешних CLI runners.
- Почему интересно: большая идея — локальный «AI-офис», который знает историю компании, состоит из разных специализированных работников и может использовать разные модели как взаимозаменяемых исполнителей. Это уже ближе к операционной системе для персональной AI-команды, чем к чат-ассистенту.
- Почему в радаре: GitHub-витрина полностью пустая, хотя внутри есть desktop/self-host install, подписываемые сборки, security model, sync design, messenger integration и коммерческая source-available модель.
- Не знаем: это сознательная маскировка или просто создатель не заполнил metadata. README после открытия уже довольно подробно раскрывает продукт, поэтому глубина маскировки меньше, чем у идеального ложного description.

### RR-028 — `sj58320/test`

- URL: https://github.com/sj58320/test
- Статус: `STRONG_MASKING / MEDIUM_PRODUCT`
- Last checked: 2026-09-16
- Публичная витрина: repo называется буквально `test`, description тоже `test`, topics нет, homepage нет, 0 stars.
- Возраст: public repo создан 2026-01-30; на 2026-09-16 — примерно 7.5 месяца подтверждённой публичной истории и продолжает обновляться.
- Что это на самом деле: поддерживаемый мультиязычный companion-site для игрового сообщества/сервера RSS Zombie Escape, а не тестовый мусор.
- Что внутри: FAQ, правила, команды сервера, словарь терминов Zombie Escape, новости, skin previews, Korean/English/Japanese интерфейс, поиск, фильтрация команд, избранное и deep links.
- Операционная часть: GitHub Actions синхронизируют Discord news примерно каждые 15 минут; отдельные скрипты собирают skin/image/video каталоги из Discord-thread данных. Есть автоматическая генерация каталогов, а не просто вручную сверстанная страница.
- Монетизация/сообщество: README описывает VIP/free/exclusive benefits и разные каналы поддержки/оплаты для языковых аудиторий, включая Ko-fi и корейскую платёжную схему.
- Почему интересно: по GitHub search его практически невозможно классифицировать — `test / test / 0 stars`. После открытия оказывается реальный продуктовый и операционный слой игрового сообщества. Это один из лучших примеров именно **маскировки витрины**, хотя сам проект по масштабу скромнее AI/infra кандидатов.
- Не знаем: специально ли автор назвал его `test` ради сокрытия. Мотив не доказан.

### RR-029 — `Astropulse/nova-play`

- URL: https://github.com/Astropulse/nova-play
- Статус: `STRONG`
- Last checked: 2026-09-16
- Публичная витрина: `nova-play`, description отсутствует, topics отсутствуют, homepage отсутствует, около 5 stars. README вообще отсутствует.
- Возраст: public repo создан 2026-03-14; на 2026-09-16 — около 6 месяцев подтверждённой публичной разработки.
- Что это простыми словами: уже довольно большой **космический action/roguelite с прогрессией и настоящим multiplayer**, который запускается в web и Android и имеет архитектуру под desktop/будущий Steam transport.
- Геймплейные признаки: десятки килобайт achievement definitions, боссы, волны врагов, разные корабли, upgrades, encounters и большие пакеты диалогов/lore. Есть lifetime/run статистика и скрытые achievements, которые открывают дальнейшую прогрессию.
- Сетевая часть: отдельные `netSession`, `netSync`, protocol, remotePlayer и transport слои. Поддержаны direct LAN/WebSocket с desktop host и relay-rooms через Cloudflare Worker, чтобы можно было подключаться по коду комнаты без port forwarding. В коде уже предусмотрен общий интерфейс для будущего Steamworks transport.
- Платформы: Capacitor-конфиг показывает Android app `com.nova.game`, appName `NOVA`; network layer отдельно упоминает desktop app и web build.
- Почему интересно: GitHub-страница почти ничего не рассказывает, но внутри не прототип из пары файлов, а системный game project с progression, multiplayer sync, relay infrastructure, mobile packaging и тестовыми hooks для multiplayer.
- Не знаем: коммерческий ли это будущий релиз, учебный проект или личная игра; README/описания нет, поэтому бизнес-цель пока не доказана.

## Средние / полезные попадания

### RR-030 — `mcleanjack/Test`
- URL: https://github.com/mcleanjack/Test
- Статус: `MEDIUM`
- Surface: `Test`, description `Test`, 0 stars, no topics; default branch сам имеет Claude-generated style name.
- Возраст: создан 2026-08-18 — около месяца.
- Внутри: не тестовый шаблон, а конкретный интерактивный 3D BIM/building-information viewer для Mayde Tate house на Three.js. Package metadata говорит о Revit-derived GLB, sketch-style outlines, click-to-isolate building elements и привязанных к модели строительных/product callouts.
- Почему не STRONG: продукт узкий и молод; маскировка хорошая, но масштаб пока ниже главных кандидатов.

## Контроли / отклонённые, чтобы больше не тратить время

### `JR-Wesley/Notes` — CONTROL
- Видимая история с 2024-10-18, ~5 stars.
- Хотя имя generic, description честно говорит про личные учебные notes по HPC/VLSI/computer architecture. Не скрытый продукт.

### `ORTHOPUS-EXPLORER/explorer_ws` — CONTROL
- Создан 2025-05-26, активен 2026-09-01, 0 stars.
- Description сразу говорит `explorer ROS2 workspace`, owner тоже раскрывает робототехнический контекст. Для нашей игры недостаточно скрыт.

### `aaryansingh91/test` — REJECT
- `test`, 0 stars, создан 2025-03-15, огромный размер.
- Корень оказался в основном коллекцией APK-файлов с разными battle/game названиями, а не единым развиваемым source product. Размер дал ложноположительный сигнал.

### `TeamHY/Astrobirth` — CONTROL
- Долгоживущий active repo с 2021-05-20, ~5 stars, но description прямо говорит, что это hard mod. Не скрыт.

### `abetusk/scratch` — REJECT
- Очень старый (с 2014), active, generic name/description, но дерево действительно является многолетним личным scratch repo: art/cs/data/electronics/experiments/game/dotfiles/notes. Нет единого спрятанного продукта.

### `Lascade-Co/scratch` — REJECT
- Идеальная пустая metadata-оболочка, но текущий main содержит лишь крошечный README и два GLB asset-файла. Нет подтверждённого продукта.

### `Astropulse/nova-play` distinction
- Оставлен STRONG именно потому, что в отличие от asset/scratch dumps код показывает связный продукт: game engine/data/world/UI + Android packaging + multiplayer protocol/session/sync/relay.

## Новая эвристика из Pass 4

Сильнее учитывать не размер репозитория сам по себе, а сочетание:

`generic/empty search surface` + `coherent product tree` + `repeated real operations/tests/issues` + `months of active updates`.

Большой размер без связной архитектуры часто оказывается APK/ZIP/data dump. Хороший скрытый repo, наоборот, может иметь относительно умеренный размер, но выдаётся по тому, что внутри есть отдельные product subsystems, deployment/runtime, network protocol, security model, acceptance loop или автоматизированная эксплуатация.
