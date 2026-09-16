# Strategy B Kill Test — Rebate / Trade Promotion Management for Russia

Дата: 2026-09-16

Итог:

`KILL__NATIVE_1C_REBATE_WORKFLOW_AND_MULTIPLE_RUSSIAN_TPM_INCUMBENTS`

## 1. Исходная гипотеза

Российский продукт класса Enable / UpClear / Flintfox для производителей, дистрибьюторов и FMCG:

`договорные ретро-бонусы / trade spend / промо`
→ условия и бюджет
→ фактические sell-in / sell-out / остатки
→ расчёт accrual / claim / settlement
→ сверка
→ поиск недополученных / переплаченных денег
→ post-promo ROI и контроль trade investment.

Западный demand доказан зрелыми rebate/TPM продуктами. Но Strategy B требует российского gap, а не просто существования глобального класса.

## 2. Узкий rebate-management слой уже нативно закрыт 1С:ERP

Актуальная документация `1С:ERP Управление предприятием 2, редакция 2.5` содержит полноценные контуры ретро-бонусов как для клиентов, так и для поставщиков.

### Клиентские ретро-бонусы

Поддерживаются:

- виды ретро-бонусов;
- расчёт внутри системы или вне системы;
- согласование;
- условия;
- целевые показатели по количеству / сумме / пакетам / диапазонам;
- начисление;
- акты премии клиенту;
- списание;
- отчётность и анализ.

Источники:

- https://its.1c.ru/db/erp25doc/bookmark/RetroBonus/RetroBonus71
- https://its.1c.ru/db/content/updinfo/src/erp/2.5.19.44/index.htm

### Ретро-бонусы поставщиков

Актуальный контур поддерживает:

- `Закупки (Sell-in)`;
- `Продажи (Sell-out)`;
- `Остатки (Price-protect)`;
- настройку и согласование условий;
- автоматический расчёт;
- начисление;
- акт премии поставщика;
- списание;
- отчёты по действующим/рассчитанным бонусам.

Источники:

- https://its.1c.ru/db/erp25doc/bookmark/RetroBonusSupplier/RetroBonusSupplier112
- https://its.1c.ru/db/content/updinfo/src/erp/2.5.21.125/index.htm
- https://its.1c.ru/db/content/updinfo/src/erp/2.5.22.48/index.htm

Следовательно, продукт уровня `отдельный SaaS для расчёта ретро-бонусов поверх 1С` не является пустой инфраструктурной нишей. Core accounting/workflow уже у владельца ERP/data-path.

## 3. Более широкий TPM/RGM rescue тоже не проходит

Попытка расширить scope до:

`promotion calendar + trade budget + approvals + forecasting + execution + accrual + post-promo analytics + ROI`

также не создаёт gap: российский рынок уже содержит несколько специализированных TPM/TPO решений.

### ProSpace.Promo

Current product позиционируется как end-to-end система управления и оптимизации ценового промо для FMCG/retail.

Публично заявлены:

- промо-календарь;
- массовое создание акций;
- прямые/непрямые промо;
- скидки производителя/ритейлера;
- бюджеты;
- гибкие согласования;
- plan/fact;
- P&L акции;
- ROI / profitability metrics;
- post-promo analytics;
- scenario planning;
- AI optimization.

Источник:

- https://prospace.tech/promo

### GTM TPM

GTM Business Solutions прямо позиционирует продукт как:

`Российская TPM-платформа для FMCG компаний`.

Функциональность включает управление промо-эффективностью, trade-investment и рекомендации по акциям/бюджету.

Источники:

- https://gtmbs.ru/
- https://gtmbs.ru/trade_promo_management

### Rubbles TPM / Promo Planning

Публично заявляет сквозной промо-процесс:

- прогнозирование;
- pre-analysis;
- ценовые условия в ERP;
- post-analysis;
- ML baseline/promo forecast;
- ROI optimization.

Источники:

- https://rubbles.ru/media/news/промо-в-fmcg-узкие-места»-и-подходы-rubbles-к-их-преодолению
- https://rubbles.ru/products/goods/promo

### ST Чикаго / Sys4tec

Текущий продукт закрывает:

- контроль исполнения промо;
- расчёт ретро-бонусов на основе sell-out;
- контроль расходования промобюджета дистрибьюторами;
- uplift-анализ;
- focus promo programs.

Источник:

- https://sys4tec.com/product/st-chicago/

### CDC / BASYS TPM и Comarch

Рынок имеет и более старые зрелые решения для производителей/дистрибьюторов:

- BASYS TPM / CDC — planning, bonus agreements, assortment, forecasts, budgets, analytics;
- Comarch Trade Promotion Management — budget planning, promotion calculation/approval, historical effectiveness analysis.

Источники:

- https://www.cdc.ru/press-center/press-relizy/kompaniya-basys-i-gk-sidisi-cdc-predstavlyayut-programmnoe-reshenie-dlya-avtomatizatsii-protsessov-t/
- https://www.comarch.ru/trade-and-services/data-management/trade-promotion-management/

## 4. Почему feature slicing не спасает идею

Не считать новой нишей формулировки:

- `Enable для 1С`;
- `автоматическая сверка ретро-бонусов`;
- `sell-in / sell-out rebate SaaS`;
- `trade spend dashboard`;
- `промо budget approval`;
- `post-promo ROI`;
- `AI optimization for FMCG promotions`;
- `UpClear для России`.

Всё это либо уже нативно существует в 1С:ERP, либо продаётся специализированными российскими TPM/TPO vendors.

Чтобы создать structural gap, пришлось бы найти новую transaction/data network, которую текущие ERP/TPM players не могут получить или быстро добавить. В текущем pass такого преимущества не найдено.

## 5. Owner / AI / trust gates

Технически продукт был бы проверяемым по деньгам и формулам, а generic AI не заменяет persistent workflow.

Но эти преимущества не имеют значения после incumbent kill.

Кроме того, полноценный TPM требует существенной FMCG domain model: baseline/uplift, promo cannibalization, demand planning, trade terms, settlement and finance integration. Это увеличивает domain/support burden без доказанного market gap.

## 6. Final

`KILL__NATIVE_1C_REBATE_WORKFLOW_AND_MULTIPLE_RUSSIAN_TPM_INCUMBENTS`

Не возвращаться без принципиально нового workflow/data/distribution wedge, который нельзя закрыть 1С:ERP + ProSpace/GTM/Rubbles/ST Чикаго/другими TPM incumbents.
