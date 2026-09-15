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

## KILL — российский рынок уже занят

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
