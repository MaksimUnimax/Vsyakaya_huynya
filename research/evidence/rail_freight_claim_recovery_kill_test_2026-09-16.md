# Strategy B Kill Test — Rail Freight Claim / Penalty Recovery for Russia

Дата: 2026-09-16

Итог:

`KILL__RZD_DIGITAL_CLAIM_RAIL_AND_DIRECT_MC_SLEZHENIE_RECOVERY_AUTOMATION_ALREADY_EXIST`

## 1. Исходная гипотеза

Российский deterministic-recovery layer для железнодорожных грузоперевозок:

`ЭТРАН / накладная / вагонные события`
→ independently calculate delivery deadline / delay / wagon-use charge / penalty
→ detect overcharge or compensable delay
→ retrieve proof
→ assemble claim
→ submit/track
→ recover money.

Особенно привлекательный первый use case:

`ст. 97 УЖТ: просрочка доставки -> рассчитать пеню -> автоматически собрать документы -> подать претензию РЖД`.

Механика объективно проверяемая и денежная. Но российский market gap отсутствует.

## 2. Exact Russian third-party product — МЦ-Слежение

Current case page:

- https://www.mc-service.ru/cases/avtomatizaciya-raboty-s-pretenziyami-po-97-state-uzht-v-zheleznodorozhnyh-gruzoperevozkah-i-upravlenii-vagonami

`МЦ-Сервис Инжиниринг` уже разработал в ПК `МЦ-Слежение` специализированный контур:

`Погрузки. Претензионная работа по 97 статье УЖТ`.

Публично описанная функциональность включает:

- автоматический расчёт срока доставки;
- автоматическое определение фактической просрочки;
- расчёт ставки/суммы пени;
- учёт увеличения срока доставки по актам общей формы;
- расчёт провозной платы;
- получение фактической/плановой даты из железнодорожных данных;
- автоматический запрос печатных форм накладных из АС ЭТРАН;
- формирование документов-претензий;
- фиксацию результата выгрузки/запроса документов;
- использование данных ЭТРАН и внутренних отчётов `МЦ-Слежение`.

Это практически буквальный V0 предполагаемого продукта.

В отраслевой публикации РЖД-Партнёр от 16.12.2025 тот же класс решения описан как автоматизация претензионной работы по ст. 97 УЖТ, направленная на сокращение ручного расчёта пени, сбора документов и обработки claims.

Source:

- https://www.rzd-partner.ru/logistics/news/avtomatizatsiya-pretenzionnoy-raboty-po-st-97-uzht-novyy-uroven-transformatsii-protsessov-ot-mts-ser/

## 3. МЦ-Слежение is not a tiny one-off script

Current vendor case catalog shows `МЦ-Слежение` as a broader production platform for rail freight/wagon operations, with examples around:

- wagon location/monitoring;
- ETRAN waybill creation/signing;
- delay/idle-time analysis;
- document generation;
- tariff integration;
- claims automation.

Source:

- https://www.mc-service.ru/cases

Therefore the incumbent already owns the data/runtime relationship with the exact target ICP.

## 4. RZD itself owns the official electronic claim rail

RZD order N 2132/r established digital processing of incoming freight claims through `ЕАСАПР СФТО`.

Current published procedure describes:

- electronic claim submission through `ЛК РЖД ГРУЗ`;
- automatic registration with number/date/time;
- formal-rule validation;
- electronic claim case creation;
- automatic retrieval of primary documents from connected railway systems;
- search by wagon/container/shipment/period;
- XML/electronic document retrieval;
- automatic counter-calculation;
- automatic-review algorithms for supported claim categories;
- electronic statuses/results.

Source:

- https://legalacts.ru/doc/rasporjazhenie-oao-rzhd-ot-29092020-n-2132r-ob-utverzhdenii/

The procedure explicitly references integration with:

- АС ЭТРАН;
- ЕАСАПР СФТО;
- АСУ Право;
- other internal RZD systems.

So the official source-of-truth and claim workflow are already digitized by the counterparty itself.

## 5. RZD system already performs automatic evidence retrieval and countercalculation

The same procedure states that ЕАСАПР СФТО automatically:

- checks for required primary electronic documents;
- requests them from source systems;
- attaches them to the electronic claim case;
- forms countercalculation from formalized source data;
- determines RZD responsibility according to supported algorithms;
- can complete automatic consideration for claim categories.

This removes the strongest possible infrastructure wedge for a new entrant.

## 6. Refund/correction path is integrated back into ETRAN

For satisfied claim categories, published RZD procedure states that ЕАСАПР СФТО sends the relevant correction order (`ФДУ-22`) to АС ЭТРАН, where primary accounting documents are corrected.

The process includes claims such as return of wrongly charged penalties/fees in supported categories.

Therefore the official system owns not only intake but the downstream correction/recovery action.

## 7. Wagon-infrastructure charge claims were already automated years ago

RZD order N 1400r on wagon-infrastructure charges describes:

- charge calculation in ETRAN;
- claims handling in ЕАСАПР СФТО;
- control calculation;
- refund claims for incorrectly charged amounts;
- interaction among ЕАСАПР/ЭТРАН/АСОУП/АСУ Право.

Source:

- https://www.garant.ru/products/ipo/prime/doc/71387858/

Thus widening beyond Article 97 into wagon-delay/incorrect-fee recovery does not reopen a greenfield opportunity.

## 8. Why a prettier external wrapper does not create a business gap

A new entrant could theoretically add:

- cleaner dashboard;
- cross-shipment prioritization;
- notification/reminder UX;
- success-fee pricing;
- analytics of recovered RUB.

But incumbents already own the expensive primitives:

### RZD

- official source-of-truth;
- ETRAN shipment documents;
- official electronic claim channel;
- automated claim handling;
- accounting correction/refund path.

### МЦ-Слежение

- customer-side rail data;
- automatic deadline/penalty calculation;
- ETRAN document retrieval;
- claim-package generation;
- established freight/wagon customer distribution.

A startup would mostly repackage an existing product category rather than exploit a missing workflow.

## 9. OWNER / AI / trust gates

`OWNER_VERIFIABILITY_GATE`: PASS.

Delivery dates, tariff, days of delay and penalty arithmetic are objectively reproducible.

`GENERAL_AI_SUBSTITUTION_GATE`: PASS.

This is a persistent event/document/action workflow, not a PDF chatbot.

`DATA_TRUST_GATE`: manageable for a logistics client.

These positive gates are irrelevant because the market-gap/incumbent gate fails catastrophically.

## 10. Do not reopen as

- Article 97 UZhT claim bot;
- ETRAN delay penalty calculator;
- RZD refund auditor;
- wagon-delay recovery SaaS;
- automated railway claim package;
- rail freight penalty recovery on success fee;

unless a fundamentally different claim class appears that is not already supported by RZD digital claim systems or existing rail-management software.

## 11. Final

`KILL__RZD_DIGITAL_CLAIM_RAIL_AND_DIRECT_MC_SLEZHENIE_RECOVERY_AUTOMATION_ALREADY_EXIST`
