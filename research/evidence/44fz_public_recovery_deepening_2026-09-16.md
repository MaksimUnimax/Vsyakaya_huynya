# 44-FZ Public Revenue Recovery — Deepening Pass

Дата: 2026-09-16

Кандидат:

`research/candidates/B1_44FZ_PUBLIC_REVENUE_RECOVERY_RU.md`

Текущий статус кандидата не повышается:

`PROMISING__OWNER_ACCESS_VALIDATED_ON_REAL_PUBLIC_CASES__SUPPLIER_INN_ENUMERATION_PASS__FREQUENCY_AND_INCUMBENT_ABSORPTION_OPEN`

Этот pass специально проверяет, не обманывает ли нас litigation-biased выборка.

## 1. Live public-EIS positive ground truth strengthened

Контракт:

`2380817197225000031`

Поставщик:

ООО «Л-ПИ Архитектура», ИНН `7704621582`.

Публичная ЕИС без авторизации показывает:

- документ приемки на `637 000 RUB`;
- дата подписания заказчиком приемки: `11.08.2025`;
- платежное поручение `№1408985`;
- дата платежного документа: `01.12.2025`;
- сумма платежа: `637 000 RUB`.

Public execution forms:

- acceptance execution record: `contractProcedureId=373453266`;
- payment execution record: `contractProcedureId=397627892`.

URL:

- `https://zakupki.gov.ru/epz/contract/printForm/view.html?contractProcedureId=373453266`
- `https://zakupki.gov.ru/epz/contract/printForm/view.html?contractProcedureId=397627892`

Court ground truth for the same contract:

`A19-27149/2025` / 04АП-1233/2026.

The court confirmed customer payment delay and awarded `31 239.83 RUB` late-payment penalty.

Important correction:

The court also found supplier delivery delay and offset supplier-side penalty `4 586.40 RUB`, reducing the base for customer late-payment penalty.

Therefore a public-EIS scanner can establish a **high-confidence potential late-payment claim**, but public data alone must not automatically promise the final recoverable amount unless all visible counterclaims/setoffs are reconciled.

Product wording must be:

`POTENTIAL_LATE_PAYMENT_CLAIM__PUBLIC_EVIDENCE`

not:

`GUARANTEED_UNCLAIMED_MONEY`.

## 2. Blind-control negative contract A

Registry:

`3262901102524000012`

Supplier:

same supplier INN `7704621582`.

Contract amount:

`63 500 RUB`.

This contract was selected from the supplier's normal public portfolio, not from litigation search.

Public EIS evidence:

- acceptance execution record `contractProcedureId=306440833`;
- acceptance document date: `24.09.2024`;
- date signed by customer: `15.10.2024`;
- payment execution record `contractProcedureId=306967356`;
- payment document date: `16.10.2024`;
- payment order: `№428375`;
- payment amount: `63 500 RUB`;
- contract process page shows `Исполнение завершено`, full amount executed and fully paid, no penalty row.

Conclusion:

`NEGATIVE_CONTROL__NO_CUSTOMER_PAYMENT_DELAY_SIGNAL`.

The scanner must not create an opportunity here.

## 3. Blind-control negative contract B

Registry:

`1631702805225000006`

Contract amount:

`2 044 349.59 RUB`.

Public EIS evidence:

- acceptance execution record `contractProcedureId=345271370`;
- acceptance document date: `24.03.2025`;
- date signed by customer: `25.03.2025`;
- payment execution record `contractProcedureId=346821820`;
- payment document date: `01.04.2025`;
- payment order: `№1143`;
- payment amount: `2 044 349.59 RUB`.

Conclusion:

`NEGATIVE_CONTROL__PAYMENT_WITHIN_NORMAL_7_WORKING_DAY_WINDOW`.

No opportunity should be created.

## 4. Blind-control negative contract C

Registry:

`3241102114524000013`

Contract amount:

`1 493 372.25 RUB`.

Public EIS evidence:

- acceptance execution record `contractProcedureId=295360291`;
- acceptance document date: `21.08.2024`;
- date signed by customer: `03.09.2024`;
- payment execution record `contractProcedureId=296024928`;
- payment document date: `04.09.2024`;
- payment order: `№806732`;
- payment amount: `1 493 372.25 RUB`.

Conclusion:

`NEGATIVE_CONTROL__PAYMENT_NEXT_DAY`.

No opportunity should be created.

## 5. What the first blind control means

Current manually checked set is intentionally too small for frequency inference:

- known positive litigation-ground-truth contract: `1`;
- normal portfolio controls sampled after the candidate was formed: `3`;
- normal portfolio late-payment opportunities in those 3 controls: `0`.

Do **not** report `25%`, `0%`, or any other market frequency from this set.

The result only proves two things:

1. public EIS exposes the same acceptance/payment primitives for ordinary non-litigation contracts;
2. the scanner can abstain correctly on clearly timely payments.

It also reinforces that litigation search is strongly selection-biased and cannot establish TAM/frequency.

## 6. Registry/data architecture evidence strengthened

Current contract-registry rules explicitly include execution parameters and payment evidence, including details of the acceptance/obligation document and the payment document.

Since 2022 electronic acceptance is broadly mandatory for electronic 44-FZ procedures; since 2024 treasury-payment linkage has become more structured for many public customers.

This improves the structural data thesis, but does not prove every contract has perfectly complete history.

K1 remains open:

`PUBLIC_PAYMENT_DATE_COMPLETENESS`.

## 7. Competitor challenge update

### EIS Filter

Current public FAQ says its bot can show a supported event or a calculated payment deadline, but explicitly does **not** determine whether payment is overdue in the legal sense / does not confirm the money arrived.

Therefore it is adjacent monitoring, not the exact retrospective found-money workflow.

### Tenderplan / ZakupkiPro

They expose customer/payment-history scoring and procurement analytics. This is relevant adjacent functionality and means payment timing is not a novel raw feature.

No exact public workflow was established in this pass:

`arbitrary supplier INN -> historical EIS portfolio -> reconstruct acceptance/payment -> detect missed customer-penalty RUB -> evidence pack before supplier signup`.

### AURA

AURA is the strongest absorption risk.

Current public materials advertise post-win contract execution management, payment-deadline alerts, penalty calculation by CBR rate and a claim assistant when the customer delays payment.

However the currently observed product story starts from **the user's own won contract**. This pass still did not establish a public retrospective scanner over an arbitrary supplier's historical EIS portfolio before signup.

This is not a moat. AURA already owns most adjacent primitives and could add the public retrospective scan.

K4 therefore remains hard-open.

### Legium

Current public content is document/claim generation and calculators after facts are supplied. No exact proactive public-EIS retro scanner was established.

## 8. Data-collection economics

The owner-access thesis does not require private supplier data.

Possible reusable public/market data layers found:

- public EIS HTML itself;
- MultiTender supplier/contract API fields, including executed amount, actually paid, penalties and penalty payment;
- DaMIA procurement API with low-cost entry tiers;
- TenderGuru contract API for broad contract enumeration.

These do not themselves establish durable moat. They only reduce initial ingestion cost.

High-volume public-EIS crawling resilience/rate limits remain unproven. No CAPTCHA bypass or prohibited collection method is acceptable.

## 9. Stronger V0 precision rule

A candidate late-payment finding must require positive public evidence:

1. customer-signed acceptance date exists;
2. actual payment document/date exists;
3. applicable payment deadline can be determined from law + contract/context;
4. payment is later than the computed deadline;
5. public penalty/counterclaim/setoff information is checked;
6. if counterclaim completeness is uncertain, output is bounded as a potential claim;
7. if any critical date/rule is ambiguous, abstain.

Do not flag `no payment visible` as equivalent to `customer owes money`.

## 10. Current decision

The candidate remains:

`PROMISING__OWNER_ACCESS_VALIDATED_ON_REAL_PUBLIC_CASES__SUPPLIER_INN_ENUMERATION_PASS__FREQUENCY_AND_INCUMBENT_ABSORPTION_OPEN`

This pass neither promotes nor kills it.

Why it remains alive:

- true public owner-access survives direct live testing;
- one real positive case is reconstructable from public EIS and matches later court ground truth;
- three ordinary negative controls were also reconstructable and correctly produce no opportunity;
- no exact retrospective public found-money incumbent was established in bounded competitor search.

Why it is still not GO:

- unbiased opportunity frequency is unknown;
- public counterclaim/setoff completeness is imperfect;
- 200+ contract corpus is still required;
- AURA can potentially absorb the feature quickly;
- conversion from public signal to previously-unclaimed supplier money is unknown.

Next mandatory gate remains:

`20–30 suppliers / 200+ completed contracts`, sampled independently of litigation, with explicit counts for reconstructability, true delay, potential penalty RUB, abstention reasons, visible counterclaims and likely-new-vs-already-known claim status.