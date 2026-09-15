# B1 — Payments + Entitlements for Browser Extensions in Russia

Дата: 2026-09-15

Статус: `PROMISING__MARKET_SIZE_AND_INCUMBENT_RISK_TO_VALIDATE`

## Коротко

Российский слой уровня ExtensionPay/Add-on Pay для платных браузерных расширений:

`расширение -> hosted checkout -> российский PSP -> paid entitlement -> trial/subscription/lifetime -> multi-device restore -> cancel/refund -> dashboard`

Не новый эквайринг и не универсальный billing SaaS. Разработчик подключает собственный магазин YooKassa / CloudPayments / другой PSP, деньги идут ему напрямую, а продукт закрывает специфичную для browser-extension связку платежа, идентичности пользователя и доступа к premium-функциям.

## Какую проблему решает

После отключения Chrome Web Store Payments разработчику платного расширения приходится самостоятельно собирать:

- checkout;
- backend и webhooks;
- учет paid/unpaid/trial состояния;
- восстановление premium-доступа после переустановки и на другом устройстве;
- recurring billing lifecycle;
- отмены/refunds;
- безопасную серверную проверку entitlement;
- cross-browser identity;
- disclosure paid features для Chrome Web Store;
- связку с российским платежным провайдером.

Сам платеж через YooKassa/CloudPayments сделать можно. Боль — весь glue вокруг платежа и extension runtime.

## Demand proved abroad

### ExtensionPay

https://extensionpay.com/

ExtensionPay специализируется именно на монетизации browser extensions и заявляет:

- monthly / quarterly / yearly / one-time payments;
- free trials;
- multi-device / multi-browser login;
- paid-status API/SDK;
- hosted payment flow;
- отсутствие необходимости писать собственный backend;
- 5% transaction fee;
- более `$500,000` заработка разработчиков через платформу.

Это не гигантский рынок само по себе, но это реальная платная категория, а не придуманная функция.

### Другие зарубежные решения

- https://addonpay.com/
- https://extensionbill.com/

Наличие нескольких специализированных продуктов подтверждает отдельный workflow-класс.

Свежие обсуждения разработчиков в 2026 году продолжают показывать одну и ту же проблему: как принимать оплату, проверять подписку/лицензию, восстанавливать доступ на другом устройстве и не писать отдельный billing backend.

## Российская боль — найдено прямое evidence

### ExtAds

https://extads.dev/ru/monetizaciya-chrome-extension/

Российский/русскоязычный продукт ExtAds, работающий непосредственно с browser-extension publishers, в руководстве по монетизации прямо отмечает для внутренних платежей/подписок:

- высокий LTV;
- сложность реализации;
- для разработчика из РФ подключение платежей и вывод денег становятся отдельной задачей;
- подписочная модель обычно имеет смысл уже при сформированной аудитории (~2000+ пользователей).

ExtAds решает другой слой — рекламную монетизацию расширений — и заявляет охват своей extension-сети более 5M пользователей worldwide. Это одновременно evidence существования publisher ecosystem и важный incumbent-risk.

### Реальные расширения делают стек сами

В текущем Chrome Web Store найдены русскоязычные расширения, где платный доступ собран вручную поверх YooKassa / Telegram / собственного backend.

Пример: pulsr. proxy — email login + trial + подписка через YooKassa/CryptoBot.

Другой публичный российский кейс разработки расширения описывает отдельные Telegram Payments + bot + API/backend только для управления paid access.

Это не доказывает большой TAM, но подтверждает, что glue реально строят вручную.

## Почему YooKassa сама не закрывает продукт

Официальная документация YooKassa подтверждает recurring payments и сохранение способа оплаты, но периодичность списаний и отключение автоплатежей реализуются на стороне магазина.

Источники:

- https://yookassa.ru/developers/payment-acceptance/scenario-extensions/recurring-payments/basics
- https://yookassa.ru/developers/payment-acceptance/scenario-extensions/recurring-payments/pay-with-saved

То есть YooKassa дает payment rail. Она не дает browser-extension entitlement/auth layer.

CloudPayments аналогично дает рекуррентные платежи/API, но не специфичный extension workflow:

- https://developers.cloudpayments.ru/

## Bounded Russian competitor sweep

На 2026-09-15 в ограниченном поиске не найден прямой российский drop-in аналог, который одновременно заявляет:

`Chrome/Edge/Firefox/Opera SDK + YooKassa/CloudPayments + hosted checkout + paid entitlement + trial + subscription/lifetime + multi-device restore + developer dashboard`.

Найдены:

- универсальные payment providers;
- универсальное software licensing;
- custom development shops;
- отдельные расширения со своей самописной оплатой;
- ExtAds для рекламной монетизации.

Важно: отсутствие найденного конкурента в поиске не является доказательством отсутствия скрытого/малого продукта.

## MVP

Минимум, который реально проверяет тезис:

1. developer account;
2. connect own YooKassa shop;
3. создать extension/product + тариф: lifetime/month/year;
4. небольшой MV3 SDK;
5. `getUser()` / `getEntitlement()`;
6. `openPaymentPage()`;
7. webhook processing;
8. email OTP / magic-link restore paid access на другом устройстве;
9. cancel / refund sync;
10. test mode;
11. dashboard paid users / status;
12. шаблон обязательного disclosure для Chrome Web Store.

Деньги покупателя должны идти через merchant account самого разработчика, а не через общий кошелек платформы. Это снижает финансовую/регуляторную сложность и trust barrier.

## Owner verifiability

Проходит gate очень хорошо.

Тестовый extension можно проверить полностью руками:

`free user -> payment -> premium unlocked -> reinstall -> restore -> second browser/device -> same entitlement -> cancel -> expiration -> premium locked`.

Никакой предметной экспертизы, которой владелец не обладает, не требуется.

## GENERAL_AI_SUBSTITUTION_GATE

Проходит.

Generic LLM может написать пример интеграции, но не заменяет постоянно работающую платежную инфраструктуру, webhooks, entitlement state, multi-device identity и subscription lifecycle.

## DATA_TRUST_GATE

В целом проходит.

Не нужны бухгалтерские архивы, договоры клиентов или закрытая предметная документация. Нужны PSP credentials разработчика; это чувствительный секрет, поэтому архитектура должна минимизировать scope, шифровать credentials и по возможности поддерживать provider OAuth/ограниченные ключи.

## Distribution

Потенциальные первые каналы:

- разработчики существующих русскоязычных Chrome/Opera/Yandex-browser extensions;
- extension development studios;
- Habr / Telegram / GitHub extension-dev communities;
- publishers, которым реклама ExtAds не подходит или которые хотят subscription + ads одновременно;
- open-source extensions с заметной пользовательской базой, которые хотят включить Pro tier.

## Главные риски

### 1. TAM может быть слишком маленьким

Это главный kill gate. ExtensionPay подтверждает workflow, но заявленные `$500k+` creator revenue через всю платформу не означают огромный рынок. Нужно отдельно оценить число российских/СНГ extension publishers с 2k+ активных пользователей и желанием брать деньги.

### 2. ExtAds — очень опасный adjacent incumbent

ExtAds уже имеет relationship с extension publishers и SDK/script distribution. Если paid subscriptions окажутся востребованы, им потенциально проще добавить payment/entitlement layer, чем новому игроку построить distribution с нуля.

Поэтому просто "ExtensionPay на YooKassa" недостаточно как moat.

### 3. DIY остается реальной альтернативой

Хороший разработчик может собрать YooKassa + webhook + DB + auth сам. Продукт должен экономить не часы, а дни/недели и снижать support/edge-case burden.

### 4. Store-policy risk

Chrome Web Store допускает third-party monetization, но paid/paywall behavior должен быть раскрыт, а сторонние библиотеки обязаны соответствовать user-data policies. Это нужно встроить в продукт как policy-safe defaults.

## Что может стать moat

Не payment API сам по себе, а накопленный extension-specific layer:

- cross-browser/user identity;
- entitlement history;
- migrations между PSP;
- install/reinstall/device recovery;
- policy-safe SDK;
- extension-specific conversion/churn analytics;
- dunning/cancel/refund state;
- готовые adapters для российских PSP;
- migration tooling из самописных схем;
- distribution среди extension publishers.

## Следующий kill test

До разработки полноценного продукта нужно доказать две вещи.

### A. Market-size test

Собрать bounded universe минимум из 100 русскоязычных/RU-origin browser extensions с заметной активной базой и классифицировать:

- free only;
- ads/affiliate;
- paid extension/subscription;
- extension как companion к большому SaaS;
- custom payment stack;
- потенциально монетизируемый standalone tool.

Если потенциальных standalone paid publishers очень мало — KILL.

### B. Founder pain / willingness-to-pay test

Найти 15–20 разработчиков расширений, у которых уже есть либо планируется paid tier, и проверить:

- сколько времени ушло/уйдет на billing + entitlement;
- что используют сейчас;
- сколько support проблем с восстановлением доступа/подписками;
- готовы ли они подключить SDK;
- готовы ли платить fixed fee или %.

## Предварительная оценка

`7/10` как исследовательский кандидат.

Сильнее большинства последних отсевов по owner fit, MVP и реальности боли. Слабее по доказанному размеру российского рынка и defensibility против ExtAds/DIY.

Не строить до прохождения market-size kill test.