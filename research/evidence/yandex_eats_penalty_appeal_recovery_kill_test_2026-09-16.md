# Strategy B Kill Test — Yandex Eats Penalty / Deduction Appeal Recovery

Дата: 2026-09-16

Итог:

`KILL__LOW_RECOVERY_POOL__POS_VIDEO_AND_CHANNEL_MANAGER_INCUMBENTS_OWN_CORE_PRIMITIVES__DEDICATED_GLOBAL_RECOVERY_CATEGORY_UNPROVEN`

## 1. Исходная гипотеза

Российский recovery/workflow layer для ресторанов и сетей:

`Яндекс Еда штраф / удержание`
→ определить order/reason
→ проверить, допускается ли апелляция
→ связать с POS order/check
→ автоматически найти нужные логи/фото/видео
→ проверить deadline/evidence requirements
→ собрать appeal package
→ human submit
→ track later reimbursement / `Сумма апелляции`.

Потенциальный structural pattern был похож на Retail Deduction Recovery:

`external platform deducts money -> partner owns independent transaction/evidence trail -> short appeal window -> recoverable money`.

После deeper pass идея не выдержала Strategy-B gates как отдельный business.

## 2. Боль и формальный appeal workflow реальны

Current Yandex Eats partner documentation states:

- since 1 October 2025 restaurants can receive fines for confirmed partner-side order violations;
- from 15 July 2026 fines are differentiated at `5% / 10% / 15%` of order value;
- restaurants can appeal eligible fines/retentions;
- Russian partner appeal window is currently 14 days from report receipt;
- appeal is submitted through `Поддержка -> Завершённый заказ`;
- different reason codes have explicit appealability/evidence requirements.

Sources:

- https://yandex.com/support/eda-vendor-ru/ru/rating/fines
- https://yandex.ru/legal/eda_standarts_partners/ru/

Examples of evidence rules:

- own-courier `Заказ не доставлен`: partner should attach a photo of the order at the customer door/address;
- some missing-item/modifier scenarios can require continuous video of order assembly/handoff;
- damaged-order appeals can depend on packaging evidence;
- some categories are explicitly non-appealable.

This means the workflow is structured enough for software assistance.

## 3. Financial/order-level data is structured

Yandex sends weekly/monthly financial reports with order-level detail.

Current documentation states the reports can include:

- order date/time;
- Yandex order number;
- integration order number used in the restaurant POS;
- order amount;
- commission base;
- commission percentage/amount;
- deductions/retentions;
- charges/additions;
- payout details.

Fines and retentions also appear in weekly/monthly reports / report of commission execution, and approved appeal amounts are reflected in financial reporting.

Sources:

- https://yandex.com/support/eda-vendor-ru/ru/finance/about-finance
- https://mobi.yandex.com/support/eda-vendor-ru/ru/finance/about-finance

So the input data is reproducible and owner-verifiable.

## 4. Fatal economic limiter — Yandex itself says restaurant-side violations are under 1% of orders

Current Russian Yandex Eats documentation states:

> less than 1% of orders on the service contain restaurant-side violations.

Source:

- https://yandex.com/support/eda-vendor-ru/ru/rating/fines

This creates a hard ceiling on the addressable recovery pool per location.

Even before estimating appeal success rate:

- only a small share of orders enter the violation pool;
- some violations are non-appealable;
- some appeals are correctly rejected because the restaurant was at fault;
- fines themselves are only 5–15% of order value, although some cases also include full/partial customer compensation retention.

Therefore the recoverable false-positive amount is only a fraction of an already sub-1%-of-orders event pool.

For a large chain this can still be operationally meaningful. For a single/medium restaurant it is unlikely to support expensive dedicated evidence infrastructure by itself.

No public evidence was found that the average appeal recovery creates a large enough standalone software budget.

## 5. Public Vendor API does not expose the recovery control plane

The current public Yandex Eats Vendor API exposes restaurant/order/menu/availability type methods, including order history/detail surfaces.

Public API documentation/spec search did **not establish** endpoints for:

- fines;
- retentions;
- financial penalty reports;
- appeal creation;
- appeal status/recovery.

Sources:

- https://yandex.ru/dev/eda-vendor/doc/ru/ref/
- https://yandex.ru/dev/eda-vendor/doc/ru/concepts/API-overview

Meanwhile current partner documentation says:

- notifications arrive by email;
- financial detail arrives in weekly/monthly Excel/accounting reports;
- appeal is submitted manually through support / completed order UI.

Source:

- https://yandex.com/support/eda-vendor-ru/ru/rating/fines

This does not make an MVP impossible — email/report ingestion plus human submission is feasible — but it means an independent SaaS does not own a stable programmable write path.

The external platform remains the source-of-truth and can change the appeal process.

## 6. Russian reconciliation primitive already exists

A direct Russian system named `Юпитер` currently documents an `Отчет "Сверка с агрегаторами"`.

It:

- ingests Excel reports from delivery aggregators such as Yandex Eats / Delivery Club;
- compares them automatically against internal orders;
- flags orders present only on one side;
- flags order-amount mismatches;
- creates a structured reconciliation report.

Sources:

- https://docs.jupiter.systems/books/dostavka/page/otchet-sverka-s-agregatorami
- https://docs.jupiter.systems/

This is already a direct Russian version of the core financial reconciliation primitive.

## 7. Restaurant channel-manager incumbents already own finance reconciliation and distribution

Current Surf restaurant-aggregator integration offering explicitly describes a channel manager that provides:

- one order/status/menu flow across aggregators and POS;
- per-order reconciliation against aggregator payouts;
- commission accounting by type;
- retroactive adjustments;
- profitability/margin analytics by channel;
- restaurant-network implementation experience.

Source:

- https://surf.ru/integraciya-restorana-s-agregatorami/

This is service/custom rather than a standardized standalone SaaS, but it proves that restaurant integration incumbents already view financial reconciliation as a natural channel-manager capability.

Saby Presto also has native Yandex Eats integration and owns:

- incoming Yandex orders;
- internal order stages;
- POS accounting;
- settlement account `Взаиморасчеты с агрегаторами`;
- financial/accounting workflow.

Sources:

- https://saby.ru/help/integration/yandex_meal
- https://saby.ru/help/presto/delivery/yandex
- https://saby.ru/help/presto/delivery/saby/yandex_proc

An external recovery product would therefore sit on top of systems that already own both the internal order state and restaurant customer relationship.

## 8. The most expensive evidence primitive already exists in POS/video incumbents

A key proposed moat was:

`Yandex order -> automatically retrieve the exact required CCTV/photo evidence before the appeal deadline`.

But POS/video products already own much of this infrastructure.

### iiko + Ivideon

Current/established integration links video archive to iiko cash/POS events so the operator can open the relevant video fragment without searching manually.

Sources:

- https://iiko.restoran-service.ru/solutions/integratsiya/
- https://ru.ivideon.com/blog/videonablyudenie-reshenie-ivideon-kassyi-i-restorannyij-biznes/

### iiko + TRASSIR / ActivePOS

Current iiko ecosystem materials describe event-synchronized video for POS operations, evidence review and fast lookup.

Source:

- https://iiko.restoran-service.ru/solutions/iiko-video-security/

### r_keeper Surveillance

r_keeper has its own event video-surveillance layer synchronized with order/POS events.

Source:

- https://docs.rkeeper.ru/rk7/latest/ustanovka-i-nastrojka-sistemy-videokontrolya-kassovyh-operatsij-surveillance-41092981.html

### Modern video analytics

Current vendors such as UMSecurity already connect existing restaurant cameras with iiko/r_keeper POS data.

Source:

- https://umsec.ru/resheniya/videoanalitika-dlya-restorana

Therefore a startup would not own a unique video/order correlation asset. Existing POS/video vendors can add Yandex-specific evidence/appeal routing much more cheaply than a new entrant can recreate their installed-base integrations.

## 9. Exact global appeal-recovery category is not mature enough for Strategy B

Broad restaurant-delivery reconciliation is a real software category.

### Cointab

Cointab offers recurring POS vs food-delivery reconciliation across:

- orders;
- commissions;
- refunds;
- cancellations;
- deductions;
- settlement reports;
- payouts;
- bank credits.

It shows QSR customer use and reusable reconciliation workflows.

Sources:

- https://cointab.net/solutions/food-delivery-platform-reconciliation
- https://cointab.net/popular-reconciliations/pos-vs-food-delivery-platform
- https://cointab.net/business/reconciliation/our-clients/

This proves the broader reconciliation mechanic.

### Never86'd

Never86'd explicitly works on marketplace refunds/adjustments/dispute packets, but its current public site states:

- DoorDash is the strongest current pilot;
- Uber Eats/Grubhub are early-access validation tracks;
- repeat paid use, deterministic cross-platform coverage and enterprise reliability still have to be earned.

Sources:

- https://www.never86.ai/delivery-marketplace-reconciliation
- https://www.never86.ai/audit/refunds-adjustments

Thus the exact standalone `delivery marketplace deduction appeal recovery` category is **not yet a strongly mature proven-abroad business class**.

That fails an important Strategy-B premise for elevating a risky local feature into a priority business.

## 10. GENERAL_AI gate only passes for the heavy version — which incumbents can add

A weak product:

`upload Yandex report -> AI drafts appeal text`

fails `GENERAL_AI_SUBSTITUTION_GATE` immediately.

A strong product would need:

- persistent report/email ingestion;
- order matching;
- reason-code rules;
- deadline monitoring;
- evidence presence checks;
- video/photo/log correlation;
- appeal package generation;
- recovery ledger.

That heavy version is technically real, but its most expensive primitives are already owned by POS/channel-manager/video vendors.

## 11. OWNER_VERIFIABILITY boundaries

### Deterministic / owner-verifiable

- fine/retention exists;
- order ID mapping;
- fine percentage arithmetic;
- appealable/non-appealable reason according to published rule;
- deadline;
- required evidence present/missing;
- POS order/status mismatch;
- later refund/appeal credit exists.

### Human/platform judgment

- food taste/quality;
- health/safety causation;
- whether packaging was sufficiently compliant in a borderline case;
- whether a user's complaint was truthful;
- subjective service facts not captured by evidence.

The system must not pretend to adjudicate these.

## 12. Why expansion does not rescue it

Do not reopen by simply expanding to:

- Market Delivery;
- other restaurant aggregators;
- all POS systems;
- all camera systems.

That creates a broad restaurant channel-manager/reconciliation integration layer — exactly where current POS/channel-manager vendors already operate.

A new idea would need a structural asset those incumbents cannot add, not just more connectors.

## 13. Final

`KILL__LOW_RECOVERY_POOL__POS_VIDEO_AND_CHANNEL_MANAGER_INCUMBENTS_OWN_CORE_PRIMITIVES__DEDICATED_GLOBAL_RECOVERY_CATEGORY_UNPROVEN`

The operational pain is real and the workflow is software-friendly, but it is better interpreted as a **feature opportunity for existing restaurant POS/channel-management/video products**, not a standalone Strategy-B company for this search.

Do not return as:

- anti-fines for Yandex Eats;
- Yandex Eats appeal bot;
- restaurant delivery deduction recovery;
- automatic evidence finder for food-delivery fines;
- marketplace fine reconciliation for restaurants;

without new evidence of a materially larger recoverable pool or a structural distribution/data moat unavailable to current restaurant-tech incumbents.
