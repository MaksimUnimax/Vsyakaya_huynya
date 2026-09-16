# Repo Radar — 2026-09-16 / Pass 5

Цель прохода: публичные рабочие репозитории с непрозрачной GitHub-витриной. Мотив автора не приписываем без доказательств. WATCHLIST не изменён.

## RR-031 — Jack-J-C/TMP — STRONG
Public с 2026-06-30, 0 stars, без description/topics/homepage. Внутри — исследовательский pipeline для предсказания следующего места посещения по NYC mobility data: GraphRAG/candidate generation, несколько LoRA/LLM experts, gating/fusion, top-k и MRR metrics. MANIFEST показывает перенос из более раннего рабочего дерева, значит проект старше текущего public repo, но точное начало не установлено.

## RR-032 — ChemRacer/Test — STRONG_LONG_LIVED
Public с 2019-10-15, около 3 stars, пустая витрина. Внутри — DD-CASPT2 поверх OpenMolcas: серьёзный квантово-химический код для расчёта сложных электронных состояний молекул. README до сих пор называет repo private, хотя GitHub сейчас показывает PUBLIC. Связанный ChemRacer/DDCASPT2 существует с 2020-05-29.

## RR-033 — C-E-L-L/DEV — STRONG_SURFACE / MEDIUM_MATURITY
Public с 2026-05-08, 0 stars, description/topics/homepage пусты. Настоящий проект — C.E.L.L.: human-in-the-loop платформа для обучения и разметки изображений белых кровяных клеток. React frontend + Spring Boot/JWT/MySQL backend + FastAPI AI server, YOLO detection + DenseNet classification. Ученик размечает, эксперт подтверждает, система собирает статистику и verified dataset. Автоматическое retraining пока TODO.

## RR-034 — godexture/workspace — STRONG_SURFACE / EARLY_PRODUCT
Public с 2026-07-26, около 1 star, пустая витрина. Настоящее имя внутри — Godec: модульный Go-движок для media-processing pipelines с typed graph planner, bounded resources, plugins, queues/workers, cancellation и transactional outputs. WAV/PCM уже в контуре; MP4/MP3/FLAC/WASM — дальнейшие линии.

## RR-035 — between-sundays/workspace — MEDIUM_UNUSUAL
Public с 2026-08-09, 0 stars. AI-native production workspace для печатного христианского издания: несколько AI-агентов могут предлагать тексты/дизайн/страницы/код, общий brain хранит constitution, brand/design DNA, print rules и decisions, финальный выбор остаётся человеку.

## RR-036 — maddy3143/sandbox — MEDIUM_AMBITION / LOW_IMPLEMENTATION_PROOF
Public с 2026-05-06, 0 stars. Заявленная идея — AR Object Scanner / Digital Twin Platform: скан физического объекта, цифровой двойник, размеры, repair guides, diagnostics, AI assistant, parts marketplace и AR. Архитектура большая, но текущий object recognizer заметно прототипнее README: часть recognition/spec data пока hardcoded/scaffold.

## RR-037 — morimotogrowship-alt/tmp — MEDIUM_ARCHITECTURE
Public с 2026-07-09, 0 stars. GitHub используется как очередь/состояние/cron для автоматической публикации Instagram Stories/Reels: Actions выбирают media, публикуют через API и фиксируют состояние в repo.

## RR-038 — jorschneider/sandbox — MEDIUM_SURPRISE
Public с 2026-06-10, 0 stars. По описанию автора, внутри браузерный fully-3D live-rendered satirical teaser, а не обычный видеофайл: набор 3D-сцен, камер, титров и procedural WebAudio soundtrack. Интересный media experiment, но не главный product candidate.

## RR-039 — xZenLabs/repo — MEDIUM_SUPPORTING_INFRA
Public с 2026-05-30, около 2 stars. Внутри ZenPM package repository для Kindle/Kobo: GitHub Actions собирают package metadata/version history и signed manifest, GitHub Pages раздаёт репозиторий. Интересная production infrastructure, но скорее supporting repo.

## RR-040 — nghuylychee/untitled — LOW
Большой Unity project (~520 MB) с DedicatedServer, Networking, Gameplay, Leaderboard, Player, UI и weapon registry, но public repo был создан и последний раз pushed в один день — 2026-07-13. Пока нет доказательства живой растущей public-разработки.

## Уже просмотренные REJECT/CONTROL
swkang1062/Test; begin999/test; maceip/tmp; RLinf/misc; AmbroseRen/test; BrilliantBomber/Stuff; sschepis/stuff; una1veritas/Workspace; search3958/project; project-opusmc/runtime; Documental-xyz/Core.

Лучшие новые объекты прохода для глубокого разбора: Jack-J-C/TMP, ChemRacer/Test, C-E-L-L/DEV, godexture/workspace.