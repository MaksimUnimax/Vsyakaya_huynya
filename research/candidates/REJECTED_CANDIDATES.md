# Rejected Strategy-B Candidates

Дата обновления: 2026-09-15.

Назначение: не тратить повторно время на категории, которые уже были найдены, проверены и отвергнуты. Если категория здесь есть, она не возвращается в активный поиск без нового факта, который прямо устраняет указанную причину отказа.

## KILL — owner/domain fit

### Manufacturing inspection ballooning / ОТК drawing-to-control-plan

Статус: `KILL__OWNER_DOMAIN_FIT`.

Причина: владелец не обладает предметной экспертизой в ОТК, допусках, метрологии и инженерных чертежах и не может независимо контролировать качество выводов/продукта без постоянного сильного отраслевого эксперта.

Подробно: `B1_MANUFACTURING_INSPECTION_BALLOONING.md`.

## KILL — access/trust + general-AI substitution

### AP Recovery Audit / возврат старых переплат поставщикам

Статус: `KILL__ACCESS_FRICTION_AND_AI_COMMODITIZATION`.

Причины:
- для первого теста нужен доступ к чувствительной бухгалтерской истории незнакомой компании;
- высокий trust barrier возникает раньше proof-of-value;
- значимую часть первичного поиска дублей/аномалий бухгалтер уже может делать через универсальный AI + Excel/PDF/выгрузку;
- продукт быстро превращается в высокодоверительную аудиторско-консультационную услугу.

Подробно: `B1_AP_RECOVERY_AUDIT.md`.

## KILL — owner market mismatch

### Self-service returns/exchanges portal для independent e-commerce

Статус: `KILL__OWNER_MARKET_MISMATCH`.

Причина: основной e-commerce рынок владельца — Wildberries/Ozon, где возвратный workflow уже встроен в маркетплейс. Для independent D2C пришлось бы заново приобретать рынок и строить новые CMS/payment/logistics integrations.

Подробно: `B1_ECOMMERCE_SELF_SERVICE_RETURNS.md`.

## KILL — российский рынок уже занят / gap недостаточен

### Marketplace reimbursement / recovery для WB/Ozon

Российские сервисы и юридические/финансовые игроки уже предлагают поиск спорных удержаний и возврат денег селлерам. Не считать новой пустой категорией.

### Dynamic pricing для посуточной аренды

Российские специализированные продукты уже существуют, включая Revkit. Не возвращаться как к «западной модели без аналога».

### RFP / security-questionnaire / tender AI automation

В России уже есть КиберНорма, RFPilot и тендерные AI-инструменты. Ниша не пуста.

### Manufacturing RFQ / automatic quoting from drawings

Российские продукты/проекты уже есть: Ingro, ShopQuote, Аксиометрия, LASERGIS, COSTai и другие. Не считать незанятой категорией.

### Digital work instructions / process capture

Российские продукты уже появляются, включая Demiqo и смежные решения. Не считать отсутствующей категорией.

### Receivables / debtor chasing automation

Российский рынок закрывается Сальдо, Tiboh, Дебиторкой, 1С-решениями и банковско-факторинговыми инструментами. Не считать пустой западной нишей.

### Online proofing / creative approval

Drafty, Viewora, SEEDRAFT и другие уже закрывают значимую часть категории. Не возвращаться как к «аналога нет».

### Merchant chargeback automation

Payture и банковские API/процессы уже закрывают сопровождение диспутов/чарджбэков. Не считать пустой категорией.

### Subscription cancellation / churn recovery flow

VIOFLOW, Kometum, Pushwoosh, Softline Checkout и другие уже дают pause/cancel/retention mechanics. Не считать новым gap.

### RevenueCat-like backend только ради RuStore

RuStore уже имеет Pay SDK, Public API, server notifications, sandbox и subscription lifecycle. Отдельный «RevenueCat только для RuStore» не является очевидной пустой нишей.

### Brand protection / counterfeit monitoring на WB/Ozon

Российские BrandMonitor, ZIPDetect, GETPATENT, IP Dozor и собственные инструменты Wildberries уже закрывают категорию. Не возвращаться как к новой нише.

### Sales commission management

В России уже есть 5factor, Бонус24 и другие инструменты автоматизации мотивации/комиссий. Не считать отсутствующей категорией.

### Subscription billing / usage-based billing для российского SaaS

BillogicPlatform, LBX Billing, BillBill, айФлекс, Paypilot, BillControl, Кометум и другие уже дают тарификацию, recurring/usage-based mechanics и API. Не считать пустой нишей.

### Freight invoice audit / generic logistics overcharge audit

Российский CargoAudit AI уже заявляет success-fee поиск переплат в транспортных счетах. Не возвращаться к общей формулировке «parcel/freight audit» без принципиально новой механики.

### Interactive product demos / browser-recorded demos

Российский Demiqo уже продаёт запись браузерного сценария и превращение его в интерактивное демо. Ниша не пуста.

### Browser bug capture / technical repro capture

Kaiten уже имеет browser recording workflow, а open-source OpenReplay Spot умеет видео + console + network + user-agent. Локализация такого слоя слишком легко копируется и не даёт достаточного moat.

### Feature flags / remote config

Зрелые self-hosted/open-source Unleash, Flagsmith, GrowthBook, FeatBit делают российскую локализацию слабой возможностью без отдельного distribution wedge.

### Digital Sales Room / deal room

Оферта24 в Битрикс24 и Tartip уже дают digital sales room / живое КП / аналитику открытия материалов. Не считать отсутствующей категорией.

### Affiliate/referral management для SaaS

Recca и Track360 уже закрывают embedded/API affiliate mechanics. Ниша не пуста.

### Video testimonials collection

Proofwall, Видвиджет и смежные продукты уже закрывают сбор/публикацию видео-отзывов.

### Feedback board + public roadmap + changelog

FeedBackTalk существует локально; open-source Fider делает категорию очень легко воспроизводимой. Слабый moat.

### PagerDuty / on-call incident routing

AlertDuty.ru прямо позиционируется как российский аналог PagerDuty и даёт расписания, эскалации, Telegram/SMS/звонки, интеграции мониторинга. Ниша уже замечена рынком.

### Product registration / QR digital warranty / post-purchase portal

Warrantex и «Паспорт Товара» уже предлагают QR, цифровую гарантию, документы, обращения и post-purchase contact layer. Не считать пустой категорией.

### Jobsite photo documentation / CompanyCam class

Planado и Okdesk уже умеют фото «до/после», гео/время, отчёты и клиентские процессы. Категория поглощена FSM-продуктами.

### Cloud-to-cloud backup for Yandex 360

ROC Backup и +Альянс Бэкап уже дают резервирование и granular restore сервисов Яндекс 360. Не считать санкционным вакуумом.

### SaaS spend management

Российские продукты уже существуют, включая Buvei. Не возвращаться как к «западной категории без аналога» без принципиально нового wedge.

### Product-led sales / PQL

КОМЕТУМ уже заявляет PQL по продуктовым событиям и связанные sales/retention workflows. Ниша не пуста.

### Customer Success health scoring

КОМЕТУМ уже имеет индекс здоровья, плейбуки, retention-задачи и прогнозы продления. Не считать отсутствующей категорией.

### API-first software licensing

Guardant Station / Guardant SLK и API уже закрывают современное лицензирование, облачную активацию и кроссплатформенные сценарии. Ниша не пуста.

### Embedded integrations platform / unified API / white-label connectors

Albato Embedded уже даёт SaaS-разработчикам white-label/iframe/API слой и 1000+ коннекторов, включая 1С, Битрикс24, Ozon/WB. Не считать пустым WorkOS/Merge/Paragon-подобным gap.

### CSV/XLSX importer-as-a-service

Прямой российский лидер не найден, но зрелые open-source ImportCSV/TableFlow/react-csv-importer дают mapping/validation/XLSX. Локализация слишком легко копируется, moat слабый.

### Client onboarding / implementation portal

Planfix и Kaiten уже дают шаблоны проектов, внешний доступ и клиентские порталы. Специализацию уровня Rocketlane можно сравнительно легко собрать поверх универсального PM; недостаточный moat.

### Content/document request portal / Content Snare class

F.Doc уже умеет список обязательных документов, SMS-ссылку, загрузку, accept/reject/reupload; Saby поддерживает обязательные document-request этапы. Ниша не пуста.

### AI data-loss gateway / LLM DLP

Российский рынок уже заполнен INFERA AI.Firewall, SolidWall AI Security Gateway, Platform V SOWA AI, StarGuard AI, HiveTrace и другими. Не считать новой санкционной дырой.

### WB/Ozon fines / appeals automation

PINDI, НеОтдам, ПРЕТЕНЗОР.РФ, Selleru AI, Refundly и профильные юристы уже автоматизируют поиск штрафов/удержаний, сбор доказательств и подготовку/ведение оспаривания.

### Creator / affiliate attribution for WB/Ozon brands

WB Инфлюенс уже работает по CPO и показывает переходы, корзины, покупки и выручку; Ozon Blogger использует реферальные ссылки/заказы. Площадки сами владеют source-of-truth attribution.

### DMARC / email-domain protection

Есть локальные сервисы и большое число глобальных/open-source решений. Локализация не создаёт достаточного moat.

### Webhook reliability / webhook delivery infrastructure

Глобальные/open-source решения и локальные adjacent notification products делают категорию слишком легко доступной без отдельного сильного wedge.

### Status page / uptime notification infrastructure

PingDesk, Notifly и глобальные/open-source продукты закрывают категорию. Не считать gap.

### FinOps / cloud-cost optimization for Russian clouds

Cloudmaster уже работает в российской облачной экосистеме, плюс нативные бюджеты/billing крупных облаков закрывают базовый слой. Не считать очевидной пустой нишей.

### Generic marketplace rules/offerta monitoring

Ferta и смежные сервисы уже мониторят изменения правил WB/Ozon. Не возвращаться к простой формулировке «алерт по новой оферте».

### Contract renewal / auto-renewal management

Document Relay/Bitrix24 workflows, Futura Legal и существующий договорной контур уже закрывают контроль сроков, автопролонгации и напоминаний. Отдельный западный renewal-calendar без более сильного workflow не считать gap.

### Visual regression testing

Российский Delta-QA уже предлагает no-code visual regression, on-prem и Storybook-сценарии; глобальные open-source/облачные инструменты также доступны. Ниша не пустая.

### Third-party service/API status aggregation

GMONIT, DownScope, Сбои.инфо, DETECTOR404 и глобальные StatusGator/IsDown-подобные продукты уже закрывают слой «внешний сервис упал/деградировал». Не смешивать с отдельным живым кандидатом по code-impact API changes.

### Generic external API spec/changelog monitoring

Обычный слой `OpenAPI/changelog changed -> diff -> alert` закрывается oasdiff, APIWatch, SpecFlag и другими SaaS/open-source решениями. Живой кандидат возможен только если продукт связывает upstream change с конкретным клиентским codebase и доводит до verified migration PR.

### Email deliverability / inbox-placement testing

В РФ уже появился Live Direct Marketing inbox-check: seed accounts, Gmail/Outlook/Mail.ru/Yandex, SPF/DKIM/DMARC, screenshots и API/MCP. Не считать отсутствующей категорией.

### AI Search Visibility / GEO monitoring

Российские spioniro.ru, GeoWatch, brandfound.ai и встроенная «Видимость сайта в Алисе AI» Яндекс Вебмастера уже закрывают мониторинг присутствия бренда/сайта в AI-ответах. Ниша не пустая.

### Business caller reputation / spam-label monitoring

Yandex, MTS, T-Bank и Beeline владеют значительной частью caller-ID source-of-truth, а Novotels уже предлагает «Здоровье номеров/Репутация номеров», мониторинг и помощь со снятием ложных spam-labels. Недостаточный gap.

### Yandex Direct click-fraud detection / refund recovery

Яндекс автоматически фильтрует/возвращает значимую часть недействительного трафика и принимает обращения по подозрительным кликам; UNTARGET.AI и другие инструменты уже работают с click-fraud для Директа. Не считать пустой recovery-категорией.

### Automotive recall management / recall outreach

Западная BizzyCar-механика доказана, но российский AutoCRM DNM уже умеет VIN-проверку отзывных кампаний, KPI, автоматическое назначение лида и работу recall-процесса дилера. Прямой функциональный overlap.

### Marketplace product-card backup / versioned rollback

Идея «Rewind для WB/Ozon» не является пустой нишей. MP Manager сохраняет историю редактирования характеристик на Wildberries/Ozon/Яндекс Маркете и позволяет восстановить прошлую версию; MarketGuru хранит сохранённые версии карточек, сравнивает их с текущей и применяет старую версию. Более широкий backup слой слишком легко расширить существующим seller-suite.

## Общие новые фильтры

### GENERAL_AI_SUBSTITUTION_GATE

Если основная ценность продукта сводится к:

`пользователь загружает свои документы/таблицу -> AI ищет подозрения/делает вывод -> выдаёт текст/список`,

то кандидат получает сильный отрицательный балл. Нужно доказать существенный workflow/moat сверх того, что компетентный пользователь уже может сделать универсальным LLM вручную.

Допустимые исключения: продукт доводит действие до результата, работает постоянно/автоматически, интегрирован в transaction workflow, имеет proprietary data/network/history или даёт объективно недоступную generic-AI функцию.

### DATA_TRUST_GATE

Если даже первый pilot требует, чтобы незнакомый клиент передал новому сервису особо чувствительные данные — полную бухгалтерию, коммерческие договоры, персональные/медицинские данные, закрытую техническую документацию и т.п. — это сильный минус.

Такой кандидат допустим только при очевидном distribution/trust wedge: trusted marketplace/app-store install, on-prem/local execution, существующий канал доверия или возможность доказать value на обезличенных/несекретных данных.

### OWNER_VERIFIABILITY_GATE

Владелец должен иметь возможность самостоятельно проверить основную ценность продукта через понятный observable outcome: деньги, статус, лог, транзакцию, визуальный результат, время выполнения, конкретную автоматизацию. Если для оценки корректности нужна постоянная вера в узкого специалиста/AI, кандидат не подходит без отдельного domain cofounder/expert.