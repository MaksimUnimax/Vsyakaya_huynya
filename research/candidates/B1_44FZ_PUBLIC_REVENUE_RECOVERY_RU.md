# B1 — Public 44-FZ Revenue Recovery Scanner for Russian Suppliers

Дата: 2026-09-16

Статус: `PROMISING__OWNER_ACCESS_VALIDATED_ON_REAL_PUBLIC_CASES__SUPPLIER_INN_ENUMERATION_PASS__FREQUENCY_AND_INCUMBENT_ABSORPTION_OPEN`

## Коротко

Supplier-side found-money product, который начинает работу **до подключения клиента**:

`ИНН поставщика`
→ публичный реестр контрактов ЕИС
→ публичные сведения об исполнении / приемке / оплате / неустойках
→ только детерминированные money-opportunities
→ exact evidence + расчет
→ затем outreach поставщику уже с найденным кейсом.

Первый V0 должен проверять два независимых публичных денежный класса:

1. `CUSTOMER_LATE_PAYMENT_PENALTY` — возможная пеня поставщику за просрочку оплаты заказчиком по ч. 5 ст. 34 44-ФЗ.
2. `PP783_PENALTY_WRITEOFF` — начисленная поставщику неустойка, которая при выполнении условий ПП РФ №783 подлежит обязательному списанию.

Это принципиально отличается от закрытого Retail Deduction Recovery: здесь core evidence можно получить самим из публичной ЕИС без ERP, банка, кабинета поставщика или предварительного доверия клиента.

---

## 1. OWNER_ACCESSIBILITY_GATE — PASS, подтверждено руками на живой ЕИС

### 1.1 Публичный поиск всех контрактов поставщика по ИНН

На `zakupki.gov.ru` публичный реестр контрактов позволяет фильтровать поставщика параметром `supplierTitle=<ИНН>`.

Контрольный тест:

- supplier INN: `7704621582`;
- без авторизации;
- ЕИС вернула **46 контрактов**;
- доступны реестровые номера, заказчики, цены, статусы, сроки и ссылки на карточки исполнения.

Контрольный URL:

`https://zakupki.gov.ru/epz/contract/search/results.html?morphology=on&fz44=on&contractStageList_0=on&contractStageList_1=on&contractStageList_2=on&contractStageList_3=on&contractStageList=0%2C1%2C2%2C3&selectedContractDataChanges=ANY&budgetLevelsIdNameHidden=%7B%7D&supplierTitle=7704621582&countryRegIdNameHidden=%7B%7D&sortBy=UPDATE_DATE&pageNumber=1&sortDirection=false&recordsPerPage=10&showLotsInfoHidden=false`

Это означает, что cold discovery может начинаться с публичного ИНН, а не с подключения клиента.

### 1.2 Public execution pages реально содержат нужные primitives

Контрольный реестровый контракт:

`2380817197225000031`

Публично без login были открыты:

- common-info;
- process-info;
- event-journal;
- electronic execution documents.

В `process-info` видны:

- фактически исполнено;
- фактически оплачено;
- электронный документ приемки;
- платежное поручение.

В `event-journal` видна хронология размещения исполнения.

Контрольные URL:

- `https://zakupki.gov.ru/epz/contract/contractCard/common-info.html?reestrNumber=2380817197225000031`
- `https://zakupki.gov.ru/epz/contract/contractCard/process-info.html?reestrNumber=2380817197225000031&contractInfoId=101046006`
- `https://zakupki.gov.ru/epz/contract/contractCard/event-journal.html?reestrNumber=2380817197225000031&contractInfoId=101046006`
- `https://zakupki.gov.ru/epz/rdik/card/info.html?contractRegNum=2380817197225000031`

### 1.3 Public HTML is technically parseable

Independent evidence: dissertation appendix contains working Power Query M code that reads tables directly from public EIS `process-info.html` pages and normalizes penalty fields.

Source:

- https://nsuem.ru/upload/iblock/4c2/%2B%20%D0%94%D0%B8%D1%81%D1%81%D0%B5%D1%80%D1%82%D0%B0%D1%86%D0%B8%D1%8F_%D0%91%D0%B5%D1%80%D0%B5%D0%B7%D0%BE%D0%B2%D0%B0%20%D0%A2%D0%93.pdf

Therefore the public layer is not only visually readable by a human; structured extraction from HTML has precedent.

### Important caveat

Official high-volume machine-readable EIS/XML access may require EIS registration / machine-readable data credentials. Do not assume we have that path.

V0 feasibility currently rests on public HTML pages. Rate limits, anti-bot resilience and sustainable collection volume remain OPEN.

---

## 2. CUSTOMER_LATE_PAYMENT_PENALTY — money class #1

### Rule family

For applicable 44-FZ contracts, customer payment is generally due within the statutory/contract period after signed acceptance; common current baseline is 7 working days for EIS electronic acceptance, with documented exceptions.

Part 5 Art. 34 44-FZ allows supplier to demand penalty for customer delay:

`unpaid amount × 1/300 × current CBR key rate × overdue days`.

Do not assume universal 7 days. Contract-specific terms and exceptions must be checked.

Primary/current sources:

- https://normativ.kontur.ru/document?documentId=507679&moduleId=1
- https://eisfilter.ru/articles/srok-oplaty-po-kontraktu-44-fz/

### Ground-truth case A — public EIS + court match

Case:

`A19-27149/2025`

Contract:

- registry: `2380817197225000031`
- supplier: ООО «Л-ПИ Архитектура», INN `7704621582`
- price: `637,000 RUB`
- acceptance in EIS signed: `11.08.2025`
- payment due: `20.08.2025`
- actual payment: `01.12.2025`
- court-awarded penalty: `31,239.83 RUB`.

Court source:

- https://base.garant.ru/66899399/

The public EIS card independently exposes execution/payment primitives and the event journal around the same timeline.

This validates not merely the legal rule but the proposed data path.

### Ground-truth case B

Case:

`A07-34490/2025`

Contract:

- `168-23A`;
- IKZ `232027413693402740100101850017112243`;
- registry discovered publicly through exact EIS search: `2027413693423000176`;
- price `2,209,349.26 RUB`.

Public `process-info` shows acceptance act, customer penalty demand and payment order.

Court confirms customer payment delay and actual payment on `27.06.2024`.

### Ground-truth case C — material value

Case:

`A53-11494/2026`

- municipal road-work contract;
- contract price `263,121,599 RUB`;
- unpaid debt before litigation `86,821,399.99 RUB`;
- debt paid `30.04.2026`;
- late-payment penalty awarded: **`5,684,361.18 RUB`**.

Source:

- https://base.garant.ru/66981111/

### More money evidence

- `A41-40818/2024`: contractor claimed `359,349.79 RUB`; court awarded `342,292.57 RUB` in payment-delay penalties. Source: https://base.garant.ru/66502497/
- `A56-61519/2025`: `1,222,040 RUB` claimed as late-payment penalty. Source: https://base.garant.ru/66931614/

Do not infer average opportunity from litigation cases. They only establish material tail and real enforceability.

### National pain signal

General Prosecutor of Russia reported that during 2025, after prosecutorial intervention, public customers repaid **more than 18 billion RUB** of debts under performed state/municipal contracts to businesses.

Source:

- https://epp.genproc.gov.ru/ru/gprf/mass-media/news/main/e8436513/

This is debt, not penalty revenue and not TAM. Use only as proof that delayed payment is not an isolated edge case.

---

## 3. PP783_PENALTY_WRITEOFF — money class #2

### Why it is structurally attractive

Government Resolution №783 imposes a mandatory writeoff regime for certain accrued-but-unpaid supplier penalties.

Core deterministic family:

- contract obligations fully performed;
- penalty accrued but unpaid;
- penalty amount <= 5% of contract price;
- no exclusion applies;
→ customer must write it off.

For >5% and <=20%, separate 50/50 rules may apply and require additional conditions.

Primary source:

- https://base.garant.ru/71981672/

### Fresh 2026 court confirmations

`A60-4743/2026`:

- contract fully performed;
- supplier penalty `15,381.63 RUB`;
- <5% of contract price `932,220.28 RUB`;
- court held it should have been written off under №783.

Source:

- https://base.garant.ru/66968357/

`A45-10336/2026`:

- court again states <=5% + full performance → mandatory writeoff.

Source:

- https://base.garant.ru/66991549/

`A40-355696/2025`:

- penalty at issue: **`17,712,339.25 RUB`**;
- court states it is below 5% threshold and falls under №783 writeoff logic.

Source:

- https://base.garant.ru/66977976/

### Data fit

Public EIS `process-info` exposes penalty tables with fields such as payer/reason/demand/accrued/paid. Public contract card exposes price and execution status.

That makes a bounded rule plausible:

`completed contract + accrued unpaid penalty + <=5% price + no known exclusion`
→ `PP783_WRITE_OFF_OPPORTUNITY`.

Do not call it legally guaranteed until all exceptions and state of payment/withholding are validated.

---

## 4. Strict V0 classifications

### A. `CUSTOMER_LATE_PAYMENT_PENALTY`

Only classify when public evidence supports all of:

1. 44-FZ contract and exact supplier/customer identified;
2. signed acceptance date / clean completed acceptance is publicly recoverable;
3. no unresolved motivated refusal/correction visible;
4. payment term and applicable exception can be established;
5. public payment document/event supports a later payment date or continuing unpaid balance;
6. unpaid amount/period can be reproduced;
7. calculation is evidence-linked.

Output:

`PUBLIC_EVIDENCE__POTENTIAL_CUSTOMER_LATE_PAYMENT_PENALTY`

Never `MONEY_GUARANTEED`.

### B. `PP783_WRITE_OFF_OPPORTUNITY`

Only classify when public evidence supports:

1. full contract performance;
2. accrued supplier penalty;
3. unpaid/not written off state distinguishable;
4. amount threshold deterministically met;
5. applicable exclusions checked as far as public data allows.

Output:

`PUBLIC_EVIDENCE__PP783_WRITE_OFF_OPPORTUNITY`.

### Abstention conditions

Always abstain / require human review when:

- acceptance was withdrawn, corrected or disputed;
- motivated refusal exists and chronology is ambiguous;
- public event publication date is the only payment signal and actual payment date is not recoverable;
- treasury/special-payment exception is unresolved;
- contract amendments change the relevant payment rule;
- penalty was actually paid/withheld and legal status is disputed;
- dispute depends on quality, fault, Article 333 or contract interpretation.

A known adversarial example showed that withdrawn/reworked acceptance can make naive `acceptance date -> due date` classification wrong.

---

## 5. GENERAL_AI_SUBSTITUTION_GATE — PASS, provisionally

A generic LLM can calculate a penalty if the user manually supplies:

- contract;
- acceptance date;
- payment date;
- amount;
- legal rule.

It does not independently:

- enumerate every supplier contract by INN;
- continuously scrape public execution records;
- identify money opportunities across a portfolio;
- reconcile acceptance/payment chronology;
- surface missed historical claims before customer signup;
- maintain a found-money ledger and evidence URLs.

The product is public-data monitoring/recovery discovery, not legal text generation.

---

## 6. Competitor / incumbent audit

### EIS Filter

Current public documentation:

- monitors available EIS contract events;
- can calculate/display a supported payment deadline;
- explicitly states it does **not** determine payment delay universally and does not confirm bank receipt;
- does not calculate penalties/violations as a legal decision.

Sources:

- https://eisfilter.ru/
- https://eisfilter.ru/faq/
- https://eisfilter.ru/articles/srok-oplaty-po-kontraktu-44-fz/

Adjacent, not exact current product.

### AURA — strongest current adjacent threat

AURA already has:

- public contract/competitor dossiers by INN;
- contract execution module after a win;
- risk alerts for delays/non-payment;
- direct bank integrations;
- claim assistant that calculates penalties and drafts a claim to a customer who delays payment.

Sources:

- https://xn--80aa1cl.xn--p1acf/
- https://xn--80aa1cl.xn--p1acf/reestr-kontraktov
- https://xn--80aa1cl.xn--p1acf/ai-dlya-tenderov

Important distinction currently found:

AURA describes retrospective/public INN data as a dossier/risk tool and its claims/non-payment workflow as part of managing **the customer's own contracts after winning**, with banks/private financial data connected.

No public evidence yet found that AURA performs:

`any supplier INN -> scan historical public EIS -> find already accrued missed penalty/writeoff RUB -> show exact recovery lead before signup`.

However, AURA already owns most adjacent primitives and could add this feature. This is the largest current incumbent-absorption risk.

### Legium.pro

Broad AI accounting/legal/debt-recovery product with extensive procurement/penalty content. No exact public-EIS retro scanner established in bounded search.

Source:

- https://legium.pro/

### Generic calculators / procurement consultants

Many can calculate 1/300 or prepare claims **after** the supplier supplies facts. This is not the same as proactive public found-money discovery.

No exact public Russian product was established in current bounded search with both:

`INN -> public EIS portfolio -> late-payment/PP783 money detection -> exact evidence links -> outreach/recovery workflow`.

Absence claim is bounded, not absolute.

---

## 7. Structural advantage vs killed Retail Deduction thesis

Killed Retail thesis:

`customer must first trust us -> export private EDI + penalties + contract -> only then we can learn whether value exists`.

This candidate:

`public INN -> public contracts -> public execution/payment/penalty records -> show exact candidate money -> then ask customer to engage`.

This satisfies the new rule:

`TECHNICAL_EXISTENCE != OWNER_ACCESSIBILITY`.

Here OWNER_ACCESSIBILITY is currently demonstrated on real records.

---

## 8. Business model hypothesis

Do not lock pricing yet.

Most natural acquisition motion:

1. scan public suppliers;
2. rank only high-confidence/high-RUB opportunities;
3. contact supplier with exact contract, public URLs, dates and bounded calculated opportunity;
4. free verification;
5. monetize as success fee or fixed recovery/workflow fee only after supplier validates facts.

This avoids asking a cold prospect to buy abstract software.

Potential product later:

- continuous portfolio monitor by INN;
- alert after payment-window breach;
- historical missed-money scan;
- PP783 writeoff scan;
- evidence package;
- claim draft / EIS pretension workflow with human confirmation;
- recovery ledger.

No autonomous legal filing in V0.

---

## 9. Hard open gates

### K1 — Public payment-date completeness

KILL/downgrade if public EIS frequently exposes only publication/status dates but not a sufficiently reliable actual payment date/document to compute delay.

Court cross-checks are not a scalable substitute for the core product.

### K2 — Frequency / economics

Need unbiased sample, not court cases.

Scan at least:

- 20–30 suppliers;
- 200+ completed 44-FZ contracts;
- multiple sectors / customer types.

Measure:

- share with reconstructable acceptance/payment timelines;
- share with >7/10/etc. working-day delay after correct exceptions;
- potential penalty RUB distribution;
- PP783 opportunity count/RUB;
- false-positive/abstention rate.

KILL if material opportunities are too rare/small for acquisition economics.

### K3 — Sustainable public collection

Public browser access is proven. Sustainable automated collection is not.

Test:

- pagination by supplier INN;
- hundreds/thousands of process/event pages;
- rate limits / anti-bot;
- change resilience;
- caching and respectful low-rate collection.

No CAPTCHA bypass or prohibited access method.

### K4 — AURA / incumbent absorption

KILL/HOLD if AURA, EIS Filter, Kontur, Saby or another installed product already does exact public retrospective found-money scanning or launches it during validation.

Particularly dangerous: AURA already has INN dossiers + contract execution + non-payment alerts + penalty claim assistant.

### K5 — Legal-rule determinism

KILL/downgrade if too many apparent payment opportunities require hidden facts, non-public contract amendments or legal interpretation.

### K6 — Claim conversion

Even if public signal is correct, supplier may already have claimed/waived/recovered the money privately. We cannot know that from public EIS alone.

Therefore outreach must say `potential missed claim`, not `unclaimed money guaranteed`.

Need measure how many high-confidence public opportunities are actually new to supplier.

---

## 10. Current decision

This candidate is **not GO**.

It is the first post-owner-access-gate idea in this search that has passed all of:

- public source exists;
- we can access the source ourselves without customer credentials;
- supplier-wide enumeration by INN works;
- real court ground truth can be matched to public EIS structure;
- money can be material;
- at least two deterministic recovery classes exist;
- no exact public Russian retrospective scanner established in bounded search.

Current status:

`PROMISING__OWNER_ACCESS_VALIDATED_ON_REAL_PUBLIC_CASES__SUPPLIER_INN_ENUMERATION_PASS__FREQUENCY_AND_INCUMBENT_ABSORPTION_OPEN`

Next mandatory work is **not product implementation**.

Next:

1. unbiased 200+ contract public corpus;
2. public-payment-date completeness test;
3. frequency/RUB distribution;
4. exact AURA/EISFilter/Legium incumbent challenge;
5. only then decide PRE-PILOT / HOLD / KILL.
