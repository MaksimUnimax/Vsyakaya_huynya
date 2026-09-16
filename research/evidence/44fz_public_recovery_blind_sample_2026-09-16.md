# Public 44-FZ Revenue Recovery — Blind Economics Sample

Date: 2026-09-16

Candidate:

`research/candidates/B1_44FZ_PUBLIC_REVENUE_RECOVERY_RU.md`

Purpose: adversarial frequency/economics check. These contracts were not selected because a court case or known debt already indicated a payment problem. The sample is intentionally small and does not estimate population frequency; it is used to test whether ordinary public EIS portfolios immediately show material found-money opportunities.

## Status

`OWNER_ACCESS_PASS__BLIND_ECONOMICS_WEAK_SO_FAR__PP783_WEDGE_WEAKENED__DO_NOT_PROMOTE`

## A. Known positive ground truth kept separate

Registry contract `2380817197225000031` is NOT counted as blind evidence.

Public EIS exposed:

- acceptance signed by customer: `11.08.2025`;
- payment order `1408985`: `01.12.2025`;
- amount: `637,000 RUB`.

Court case `A19-27149/2025` later awarded `31,239.83 RUB` customer-delay penalty.

This proves the data path and material tail, not frequency.

## B. Blind ordinary contracts — supplier INN 7704621582

### 1. Registry `3262901102524000012`

- amount: `63,500 RUB`;
- acceptance signed: `15.10.2024`;
- payment: `16.10.2024`, payment order `428375`;
- result: `TIMELY__NO_OPPORTUNITY`.

Public EIS:

- https://zakupki.gov.ru/epz/contract/contractCard/process-info.html?reestrNumber=3262901102524000012

### 2. Registry `1631702805225000006`

- amount: `2,044,349.59 RUB`;
- acceptance signed: `25.03.2025`;
- payment: `01.04.2025`, payment order `1143`;
- result: `WITHIN_BASELINE_WINDOW__NO_OPPORTUNITY`.

Public EIS:

- https://zakupki.gov.ru/epz/contract/contractCard/process-info.html?reestrNumber=1631702805225000006

### 3. Registry `3241102114524000013`

- amount: `1,493,372.25 RUB`;
- acceptance signed: `03.09.2024`;
- payment: `04.09.2024`, payment order `806732`;
- result: `TIMELY__NO_OPPORTUNITY`.

Public EIS:

- https://zakupki.gov.ru/epz/contract/contractCard/process-info.html?reestrNumber=3241102114524000013

## C. Blind ordinary contracts — independent supplier INN 2360000401

Five contracts were taken from the supplier's ordinary public EIS portfolio, not from litigation search.

### 4. Registry `3234401102925000012`

- amount: `1,576,057.45 RUB`;
- acceptance signed: `16.09.2025`;
- payment: `25.09.2025`, payment order `306424`;
- roughly seven working days;
- result: `TIMELY_OR_BOUNDARY__NO_MATERIAL_LATE_PAYMENT_SIGNAL`.

Customer also charged supplier a penalty. Public EIS later records PP783 writeoff:

- writeoff: `27,686.08 RUB`;
- date: `29.09.2025`.

Therefore this is a negative PP783 recovery case: the statutory process already worked.

### 5. Registry `3234401245625000014`

- amount: `533,124.77 RUB`;
- acceptance signed: `02.09.2025`;
- payment: `12.09.2025`, payment order `75665`;
- baseline signal: approximately one working day beyond a seven-working-day window, before exception/contract checks;
- result: `POTENTIAL_SHORT_DELAY__ECONOMIC_VALUE_TINY`.

Customer penalty was already written off in public EIS:

- writeoff: `7,037.25 RUB`;
- date: `20.10.2025`;
- basis: obligations fully performed with accrued penalty.

### 6. Registry `3234401305825000005`

- amount: `322,627.92 RUB`;
- acceptance signed: `13.08.2025`;
- payment: `26.08.2025`, payment order `510039`;
- baseline signal: approximately two working days beyond a seven-working-day window, before exception/contract checks;
- result: `POTENTIAL_SHORT_DELAY__ECONOMIC_VALUE_TINY`.

### 7. Registry `3234401380525000007`

- amount: `1,144,189.03 RUB`;
- acceptance signed: approximately `06.08.2025`;
- payment: `08.08.2025`, payment order `168819`;
- result: `TIMELY__NO_OPPORTUNITY`.

### 8. Registry `3234401401225000003`

- amount: `3,483,632.46 RUB`;
- acceptance chronology publicly visible; latest execution print supports signed acceptance around `18.07.2025`;
- payment: `25.07.2025`, payment order `723211`;
- result: `WITHIN_BASELINE_WINDOW__NO_MATERIAL_LATE_PAYMENT_SIGNAL`.

Customer penalty was already written off:

- writeoff: `8,429.15 RUB`;
- date: `21.07.2025`.

## D. Blind larger completed contracts from generic EIS search

These were selected from a generic completed-contract search, not by known payment problems.

### 9. Registry `3521900167826000004`

- amount: `5,799,276.29 RUB`;
- acceptance signed: `01.09.2026`;
- payment: `03.09.2026`, payment order `748`;
- result: `TIMELY__NO_OPPORTUNITY`.

### 10. Registry `3671501231926000009`

- amount: `6,651,862.14 RUB`;
- acceptance signed: `14.09.2026`;
- payment order `5941`: `14.09.2026`, `5,518,143.00 RUB`;
- payment order `5942`: `14.09.2026`, `1,133,719.14 RUB`;
- full amount paid on acceptance date;
- result: `TIMELY__NO_OPPORTUNITY`.

## E. One additional latest-completed control

### 11. Registry `2054501692226000089`

- amount: `394,176.00 RUB`;
- acceptance signed: `11.08.2026`;
- payment: `20.08.2026`, payment order `75368`;
- seven working days under the ordinary baseline;
- result: `TIMELY_OR_BOUNDARY__NO_MATERIAL_OPPORTUNITY`.

## Observed blind result so far

Excluding the court-selected positive ground truth:

- `11` ordinary/public contracts checked with reconstructable acceptance/payment chronology;
- `9` show no late-payment opportunity or are exactly on the ordinary boundary;
- `2` show only potential short delay of about `+1/+2` working days before exception/contract checks;
- `0` blind contracts produced a clearly material late-payment penalty opportunity;
- `3` supplier-penalty cases inspected for PP783 treatment;
- `3/3` were already written off by the customer in public EIS.

This is a negative economic signal. It does not estimate national frequency, but it invalidates any claim that material missed recovery is easy to find in an ordinary small portfolio.

## Economic implication

At current key-rate order of magnitude, a one- or two-day delay on several hundred thousand RUB produces only hundreds of RUB of penalty. Such events cannot support customer acquisition, legal review or manual support.

The product would require a sufficiently frequent tail of:

- larger principal amounts;
- materially longer delays;
- missed/unclaimed penalty rather than already-managed claims.

National public-debt statistics prove delayed public payment exists but do not prove the missed-penalty SaaS/recovery economics.

## PP783 implication

The second initial money class is materially weakened.

In the checked blind supplier portfolio, all three visible supplier penalties were already processed through the mandatory writeoff mechanism. Public EIS even records writeoff amount, basis, date and notification.

Therefore do NOT treat PP783 as an independent acquisition wedge unless a larger unbiased corpus shows a meaningful rate of eligible-but-not-written-off penalties.

## Collection/scalability note

Public HTML owner-access remains a PASS. Exact dates are recoverable from EIS execution/event/print-form pages without supplier credentials.

However:

- old anonymous bulk-data access is not assumed available;
- third-party indexes can help enumerate contracts but may not expose exact acceptance/payment dates;
- scalable respectful collection from public EIS remains an operational gate.

## Decision impact

Do not promote candidate to PRE-PILOT/GO.

Recommended status after this bounded pass:

`HOLD__OWNER_ACCESS_STRONG__BLIND_ECONOMICS_WEAK__PP783_WEDGE_FAILING__MATERIAL_TAIL_AND_INCUMBENT_ABSORPTION_UNPROVEN`

Reopen/promote only if a larger unbiased corpus demonstrates repeatable material opportunities, preferably at least tens of thousands RUB per supplier/year before recovery friction, and if AURA/other procurement incumbents do not already absorb the workflow.
