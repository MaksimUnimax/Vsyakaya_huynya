# B1 — Payments + Entitlements for Browser Extensions in Russia

Дата: 2026-09-15

Статус: `KILL__TAM_TOO_SMALL_FOR_RU_ONLY_PRODUCT`

## Идея

Российский слой уровня ExtensionPay/Add-on Pay:

`browser extension -> hosted checkout -> YooKassa/CloudPayments -> entitlement -> trial/subscription/lifetime -> multi-device restore -> cancel/refund`.

Техническая боль реальна: российские PSP дают payment rails, но разработчик расширения сам строит webhooks, billing lifecycle, paid entitlement, восстановление доступа после переустановки и на другом устройстве.

## Почему сначала выглядело перспективно

ExtensionPay, Add-on Pay и ExtensionBill подтверждают отдельную зарубежную категорию. ExtensionPay поддерживает recurring/one-time payments, trials и multi-device access и заявляет более `$500,000` заработка разработчиков через платформу.

В российском bounded-search прямого drop-in аналога `extension SDK + российский PSP + entitlement + restore + subscription lifecycle` найдено не было. Русскоязычные расширения действительно строят такие стеки самостоятельно. Owner-verifiability и технический MVP были хорошими.

## Новое evidence, которое убило кандидат

После отдельной проверки экономики самой зарубежной категории выяснилось:

- ExtensionPay берёт около 5% transaction fee и при этом за несколько лет заявляет лишь `$500k+` совокупного заработка разработчиков через платформу;
- грубый верхнеуровневый порядок комиссии при `$500k GMV` — около `$25k`, хотя точная сумма может отличаться из-за специальных/flat тарифов;
- публичные founder updates ExtensionPay в 2021–2022 показывали сотни регистраций, но service revenue порядка лишь `$100–240/month`;
- в 2026 появился ещё один глобальный конкурент ExtensionBill с тарифами примерно `$19–99/month`.

Это меняет вывод: боль существует, но **самостоятельная категория слишком мала даже глобально**, а Россия/СНГ — ещё более узкий подрынок.

Дополнительный риск — ExtAds уже имеет relationship/distribution среди browser-extension publishers и при появлении заметного спроса потенциально может добавить paid-entitlement слой.

## Итог

Технически хороший micro-SaaS, но плохой кандидат для нашего поиска бизнеса.

`KILL__TAM_TOO_SMALL_FOR_RU_ONLY_PRODUCT`

Не возвращаться к идее без нового evidence, что рынок платных browser extensions в РФ/СНГ существенно больше оценённого либо продукт расширяется в намного более крупную adjacent-категорию без потери фокуса.