# Rejected Strategy-B Candidates — Pass 2 — 2026-09-15

Назначение: продолжение `REJECTED_CANDIDATES.md`. Категории ниже уже проверялись в текущем Strategy-B discovery и не должны повторно подаваться как новые идеи без нового факта, который устраняет конкретную причину отказа.

## Browser-extension payments / entitlements for Russia

Статус: `KILL__TAM_TOO_SMALL_FOR_RU_ONLY_PRODUCT`.

Боль реальна, но глобальная специализированная категория слишком мала: ExtensionPay заявляет лишь `$500k+` creator earnings через платформу за несколько лет при 5% fee; публичные founder updates показывали порядка `$100–240/month` service revenue при сотнях регистраций. В 2026 глобальный ExtensionBill продаёт похожую инфраструктуру примерно за `$19–99/month`. Российский TAM ещё уже, рядом уже находится ExtAds с distribution среди extension publishers.

Подробно: `B1_BROWSER_EXTENSION_PAYMENTS_RU.md`.

## Marketplace certificate/declaration compliance monitoring

Статус: `KILL__DIRECT_LOCAL_COMPETITION`.

AutoFSA уже ищет документы ФСА, привязывает их к Ozon/WB через API и регулярно проверяет недействительные/просроченные/истекающие документы с поиском замены. Vexoz в 2026 запускает отдельный мониторинг сертификатов/деклараций для маркетплейсов. ФСА также развивает API-проверки для площадок. Ниша уже замечена рынком.

## Legal web-evidence capture / Page Vault class

Статус: `KILL__DIRECT_LOCAL_COMPETITION`.

В РФ уже есть ShotApp/«Вебджастис», Fixator, DigitalEvidence, ProofSnap и смежные сервисы фиксации веб-страниц/доказательств. Не считать санкционным или локализационным gap.

## Fleet parking/fines/tolls management

Статус: `KILL__SATURATED_LOCAL_MARKET`.

Driverpass, Паркоматика, РосШтрафы, Parkmon, CarsMonitoring, ШтрафовНет и другие уже закрывают штрафы/парковки/корпоративный автопарк. Ниша не пустая.

## Self-storage management software

Статус: `KILL__DIRECT_LOCAL_COMPETITION`.

Точка.CRM / selfstoragecrm, КрутоПлан, PRO-КЛАДОВКИ и другие уже автоматизируют аренду боксов, оплаты, долги, клиентские кабинеты и операционные процессы self-storage.

## Flight-delay compensation / AirHelp clone

Статус: `KILL__NO_LOCAL_GAP`.

AirHelp сам имеет русскоязычный рабочий сервис и contingency-модель. Сам факт западного происхождения продукта не создаёт российский вакуум.

## Lost-and-found software for hotels/venues

Статус: `KILL__WEAK_GAP_AND_ADJACENT_INCUMBENTS`.

Западная категория Chargerback/lostandfound.io реальна, но российские hotel-operations продукты уже включают учёт забытых вещей (например HMS Flow), а рынок отдельных объектов сравнительно узок. Cross-venue matching/shipping слой не показал достаточной экономики против incumbents и enterprise sales friction.

## Job-change / champion-tracking signals for Russian B2B

Статус: `KILL__DATA_DEPENDENCY_AND_INCUMBENT_ADJACENCY`.

UserGems/Champify подтверждают сильную западную механику, но в РФ нет столь же удобного LinkedIn source-of-truth. Для продукта пришлось бы строить тяжёлый people/employment data business либо зависеть от сторонней базы. DealRocket уже собирает и актуализирует сотрудников/место работы из локальных и исторических источников и потенциально может добавить job-change alerts.

## Generic competitive-intelligence / AI battlecards for B2B SaaS

Статус: `KILL__DIRECT_LOCAL_COMPETITION_AND_AI_COMMODITIZATION`.

Embase уже предлагает российский AI-радар конкурентов, realtime alerts, мониторинг множества каналов и AI battlecards. Дополнительно lightweight CI сильно коммодитизируется generic LLM + page monitoring. Не возвращаться к простой формулировке «российский Klue/Crayon».

## Standalone mock/sandbox API for Wildberries

Статус: `KILL__PLATFORM_ALREADY_PROVIDES_SANDBOX`.

Wildberries уже имеет официальный Test scope / sandbox и тестовые сценарии для части API workflows. Самостоятельный mock-service без более сильного downstream workflow не даёт достаточной ценности/moat.

## Cloud/vendor SLA-credit recovery as standalone product

Статус: `HOLD__INCUMBENT_TOO_CLOSE_FOR_STANDALONE_PRODUCT`.

SLA claims действительно могут требовать ручной подачи в срок и доказательств (MWS/Selectel и др.), но российский wiSLA уже мониторит SLA, рассчитывает компенсацию и формирует принимаемые операторами отчёты/данные для скидки. Последний шаг claim automation слишком легко добавить действующему игроку. Не возвращаться без принципиально нового wedge.

## Customer reference management / advocacy

Статус: `HOLD__REAL_PROCESS_BUT_WEAK_MOAT`.

Западный класс зрелый (ReferenceEdge, Influitive и др.), а российские B2B/IT-компании реально используют референс-листы и референсные звонки. Прямой специализированный российский ReferenceEdge в bounded search не найден. Однако базовый workflow слишком легко собрать в Bitrix24/BPMSoft/Planfix, а TAM ограничен крупным B2B. Возвращаться только при доказательстве дорогой ручной боли вокруг advocate overuse/matching/consent/revenue attribution, которую CRM не закрывает.

## Примечание по живому кандидату

`Private Partner Account Mapping for Russian B2B` **НЕ является reject**. Он вынесен отдельно в `B1_PRIVATE_PARTNER_ACCOUNT_MAPPING_RU.md`, потому что отличается от обычного PRM/privacy-preserving overlap между независимыми базами и пока проходит следующий deep-research gate.