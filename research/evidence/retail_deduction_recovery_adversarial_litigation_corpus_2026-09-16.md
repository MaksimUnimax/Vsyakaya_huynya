# Retail Deduction Recovery — Adversarial Litigation Corpus

Дата: 2026-09-16

Связанные материалы:

- `research/candidates/B1_RETAIL_DEDUCTION_RECOVERY_RU.md`
- `research/evidence/retail_deduction_recovery_deep_research_2026-09-16.md`
- `research/evidence/retail_deduction_recovery_incumbent_cross_retailer_addendum_2026-09-16.md`

Цель: проверить идею против реальных судебных споров и отделить **детерминированные recoverable signals** от вопросов, которые требуют юридической/экспертной оценки.

Итог:

`SURVIVES__BUT_ONLY_WITH_STRICT_TIER_A_DETERMINISTIC_SCOPE__LEGAL_PROPORTIONALITY_AND_CAUSATION_MUST_STAY_HUMAN`

Это не GO и не оценка среднерыночного recovery rate. Судебная выборка сильно смещена к крупным/конфликтным делам.

## 1. Критический отрицательный вывод

Broad product thesis:

`штраф сети -> AI/правила определяют, законен он или нет -> автоматически требуют возврат`

**не проходит**.

Большая часть реально возвращаемых денег в судебной практике может зависеть от:

- статьи 333 ГК РФ;
- оценки соразмерности неустойки;
- фактических негативных последствий нарушения;
- причин нарушения;
- поведения сторон;
- качества товара;
- вины перевозчика;
- правильности уведомлений/претензий;
- договорной интерпретации.

Это нельзя выдавать как детерминированный machine verdict.

## 2. Тандер / Старт — крупный recovery, но юридический, не алгоритмический

Дело `А32-49679/2023`.

АО «Тандер» направило 33 претензии на общую сумму `13 896 261,45 RUB`:

- 6 за нарушение сроков поставки;
- 9 за качество;
- 11 за непоставку;
- 6 за недопоставку;
- 1 за изменение цены.

Поставщик потребовал снизить штраф до `823 148 RUB` и вернуть `13 073 113,71 RUB`.

Апелляция удовлетворила требования поставщика в существенной части именно потому, что оценила штраф 15–20% как явно несоразмерный последствиям нарушения и снизила его до 1%.

Кассация оставила этот результат.

Источники:

- https://base.garant.ru/66203280/
- https://base.garant.ru/40889213/
- https://sudact.ru/arbitral/doc/Y5BvMv0gX6gq/

### Product classification

`TIER_B_LEGAL_UPSIDE_SIGNAL`

Система может:

- показать размер удержанного штрафа;
- рассчитать ratio penalty/order value;
- собрать фактическую длительность просрочки/объём недопоставки;
- показать исторические comparable cases;
- собрать evidence.

Но нельзя автоматически объявлять сумму `recoverable`, потому что решение опирается на судебную оценку статьи 333 ГК РФ.

## 3. Тандер / Мастер МС — тот же pattern в 2026

Дело `А32-35819/2025`.

Поставщик оспаривал `7 156 945 RUB`, удержанные как штраф.

Суд снизил неустойку и взыскал значительную часть суммы обратно, но удержание как таковое было признано договорно допустимым; recovery возник из применения статьи 333 ГК РФ.

Источник:

- https://base.garant.ru/66881321/

### Product classification

`TIER_B_LEGAL_UPSIDE_SIGNAL`

Не автоматический claim.

## 4. Лента / Леви — огромная сумма, но supplier проиграл из-за evidence/procedure

Дело `А56-99122/2025`, апелляция 31.07.2026.

Лента зачла штрафы на `59 259 430,57 RUB`.

Поставщик признавал только `5 728 141,50 RUB` и оспаривал `48 930 526,17 RUB`.

Суд оставил начисления в силе. Среди проблем поставщика:

- возражения не были документально подтверждены;
- претензии направлялись не на официальные адреса;
- поставщик не доказал несоразмерность санкций.

Источник:

- https://base.garant.ru/66961853/

### Product classification

Смешанный:

- `TIER_A_PROCESS_CONTROL`: deadline, official channel, required evidence bundle;
- `TIER_B_LEGAL`: proportionality / merits.

Это важный product signal: даже без legal adjudication система может предотвращать потерю права/позиции из-за плохой процедуры и отсутствия evidence pack.

## 5. Агроторг / Прод-Сервис — старый договор демонстрирует exact 120-FZ opportunity

Дело `А45-28154/2025`.

Агроторг требовал `655 626,05 RUB`; суд взыскал `54 635,50 RUB` после снижения неустойки.

Критически важная старая договорная логика:

- сеть отправляет заказ через EDI;
- поставщик должен направить ORDRSP/информацию о поставке в течение 4 часов;
- если ответа нет, **заказ считается принятым поставщиком**.

Источник:

- https://sudact.ru/arbitral/doc/3TWFEvbei7r1/

С 01.09.2025 ФАС разъясняет обратное для covered food-supply relationships:

- каждый заказ требует активного согласия поставщика либо заранее согласованного конкретного плана;
- молчание/бездействие не является согласованием;
- unconditional/automatic order без supplier consent нельзя использовать как основание ответственности.

С 01.03.2026 противоречащие новым требованиям условия старых договоров не должны регулировать отношения сторон.

Источники:

- https://www.consultant.ru/document/cons_doc_LAW_510285/
- https://www.garant.ru/products/ipo/prime/doc/412689625/
- https://publication.pravo.gov.ru/document/0001202505230027

### Product classification

`TIER_A_DETERMINISTIC`

После 01.09.2025 / особенно после 01.03.2026 machine-checkable rule может выглядеть так:

`food supplier`
+
`retail network order`
+
`positive ORDRSP / other explicit active agreement / agreed plan exists?`
+
`if NO -> penalty for non-supply above agreed quantity is high-confidence compliance mismatch`

with human legal review before external submission.

## 6. Magnit itself confirms the 120-FZ process change

Magnit's 2025 annual report explicitly lists Federal Law 120-FZ and states that retail chains must request supplier confirmation for each shipment/order under the new rule.

Source:

- https://www.magnit.com/upload/iblock/fd7/vcyltyz1s5yttt1dl1hn08nza0663ujq/MAGNIT_AR_2025.pdf

This is unusually strong evidence that the consent event is operationally meaningful, not a theoretical legal construct invented by the candidate.

## 7. Existing EDI semantics support Tier A

Current EDI documentation describes ORDRSP as the supplier response containing consent and how fully the order can be executed.

Examples:

- https://ediweb.com/ru-ru/connect/network/td-holding
- https://ediweb.com/ru-ru/connect/network/zolotoe-yabloko

A current 2026 supplier guide explicitly notes that 120-FZ made ORDRSP legally important and gives the example:

`network asks 300 -> supplier confirms 200 -> supplier should not be penalized for unconfirmed 100`.

Source:

- https://selsup.ru/blog/edo-i-edi-dlya-postavok-v-seti/

This is secondary/vendor guidance, not legal authority, but it shows the new rule is already entering operational EDI practice.

## 8. Лента cases show service-level penalties are mechanically reconstructable, but not automatically invalid

Lenta contracts define service level as a monthly ratio of accepted compliant goods to ordered goods and impose a percentage penalty if the threshold is missed.

Examples:

- `А56-1795/2025`: https://base.garant.ru/66656480/
- `А56-121431/2024`: https://sudact.ru/arbitral/doc/7aqMojzIHUbC/
- `А56-104508/2025`: https://base.garant.ru/66961177/

### Product classification

Two layers:

`TIER_A_RECALCULATION`

- reconstruct order quantity/value;
- supplier-confirmed quantity where available;
- actual accepted quantity;
- timeliness;
- monthly service-level ratio;
- contract formula;
- compare network fine calculation with independently reproduced calculation.

`TIER_B_MERITS`

- whether an exception/quality/force-majeure argument makes the fine legally unenforceable;
- whether penalty should be reduced as disproportionate.

The product can confidently find arithmetic/event inconsistencies without giving legal judgment on all underlying breaches.

## 9. Агроторг / Артель — not every network penalty is supported by the actual evidence

Case `А41-58548/2022`.

Агроторг sought `1 167 636 RUB` for alleged underdelivery.

First instance recognized only `214 080 RUB` as properly accrued; appellate materials rejected the buyer's position on several other orders.

Source:

- https://base.garant.ru/66635336/

### Product classification

Potential `TIER_A_EVIDENCE_MISMATCH`:

- did the alleged order exist in the correct version?;
- was delivery rejected because of supplier lateness or network-side circumstance?;
- what was actually supplied/accepted?;
- is the fine line linked to the correct order/event chain?

Exact automation rule requires the underlying case documents; the public judgment alone is not enough to encode the rule.

## 10. Quality penalties are mostly outside initial Tier A

Cases such as Agrtorg quality disputes show courts evaluating:

- whether goods were actually unusable;
- whether buyer paid/returned goods;
- actual loss;
- proportionality of 100% penalty.

Example:

- https://sudact.ru/arbitral/doc/cXZj8VJwPfLr/

### Product classification

`TIER_B_OR_EXCLUDED_V0`

Quality/causation is too expert-heavy for initial deterministic recovery.

The system may collect acts/photos/RECADV reason codes, but must not auto-adjudicate product quality.

## 11. Transport pass-through penalties are also human unless proof is purely temporal

Supplier/carrier disputes can pass retailer penalties downstream to logistics providers, but causation may require proving:

- arrival/departure;
- fault;
- road/warehouse circumstances;
- relation between carrier delay and retailer penalty.

Examples:

- https://base.garant.ru/66961368/
- https://base.garant.ru/39772733/
- https://base.garant.ru/41327743/

### Product classification

Mostly `TIER_B`.

A timestamp contradiction can be a signal, but automatic liability judgment is unsafe.

## 12. Product scope after adversarial corpus

### Tier A — allowed deterministic V0

1. `120FZ_CONSENT_MISMATCH`
   - penalty quantity exceeds actively agreed quantity;
   - no positive ORDRSP / approved schedule evidence.

2. `PENALTY_CALC_MISMATCH`
   - retailer formula vs actual formula/amount differs.

3. `ORDER_VERSION_MISMATCH`
   - penalty references cancelled/modified/wrong order version.

4. `SHIPMENT_ACCEPTANCE_MISMATCH`
   - fine says missing X, but DESADV/RECADV/accepted quantity proves another value.

5. `DUPLICATE_PENALTY`
   - same breach/order/value penalized twice under configured rules.

6. `DEADLINE_OR_PROCESS_RISK`
   - objection deadline approaching;
   - wrong submission channel;
   - mandatory evidence missing.

7. `MISSING_SOURCE_EVIDENCE`
   - network claim cannot be reconciled to required order/shipment/acceptance events.

Outputs must be evidence-first:

- exact source events;
- timestamps;
- quantity/value;
- configured contract/law rule;
- reproducible calculation;
- confidence/reason code.

### Tier B — human legal review only

- Article 333 proportionality;
- product quality;
- force majeure;
- causation/fault;
- transport responsibility;
- unclear contract interpretation;
- oral/side agreements;
- actual damages;
- fairness/good-faith arguments.

Product may surface these as `LEGAL_REVIEW_OPPORTUNITY`, never as automatic recoverable money.

## 13. Important market-timing insight

The 120-FZ wedge may be **time-sensitive, not permanent moat**.

Retailers and EDI providers will adapt their contracts/processes to active order confirmation.

Therefore the 2026 wedge is best used as:

`historical/current audit acquisition hook`

not as the whole long-term company.

Long-term value must come from the broader deterministic evidence engine across:

- calculation errors;
- order-version mismatch;
- shipment/acceptance mismatch;
- duplicate penalties;
- retailer-specific objective rules;
- deadline/evidence management;
- cross-retailer/cross-EDI recovery history.

## 14. Bias warning

Court cases are not representative samples of all supplier fines.

They overrepresent:

- large sums;
- escalated disputes;
- legally ambiguous cases;
- suppliers willing to litigate.

Therefore this corpus **cannot** estimate:

- average penalty per supplier;
- average objectively invalid share;
- SaaS TAM;
- expected recovery rate.

Only real anonymized supplier datasets can answer those questions.

## 15. Current decision

The adversarial corpus **does not kill Retail Deduction Recovery**, but it sharply narrows what the product is allowed to claim.

Current interpretation:

`SURVIVES__STRICT_DETERMINISTIC_RECOVERY_AUDIT_ONLY__LEGAL_ADJUDICATION_EXCLUDED`

The next decisive evidence is still real supplier data, not more web research.
