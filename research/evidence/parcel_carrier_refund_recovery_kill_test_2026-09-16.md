# Strategy B Kill Test — Parcel Carrier Refund / Claim Recovery for Russia

Дата: 2026-09-16

Итог:

`KILL__US_MONEY_BACK_GUARANTEE_ECONOMICS_DO_NOT_TRANSFER__BROADER_CLAIMS_LAYER_ALREADY_OCCUPIED`

## 1. Исходная гипотеза

Российский аналог `71lbs / LateShipment / Refund Retriever`:

`CDEK / DPD / Почта / ПЭК / Деловые Линии / другие перевозчики`
→ автоматически отслеживать сроки/события
→ выявлять service failures
→ собирать proof
→ подавать claim
→ отслеживать решение
→ получать компенсацию
→ брать fee с реально возвращённых денег.

В отличие от уже отвергнутого generic freight invoice audit, эта гипотеза была сфокусирована именно на carrier SLA / late-delivery / lost-damaged claim recovery.

## 2. Global category is real

71lbs, LateShipment.com and Refund Retriever demonstrate a mature US parcel-refund workflow.

71lbs currently states:

- 5,000+ companies;
- $80M+ recovered/saved;
- automatic shipment monitoring;
- automatic late-delivery claim filing;
- contingency pricing only after customer receives refund.

A core economic driver is the FedEx/UPS money-back guarantee: eligible late express/ground shipments can receive a refund of the shipping charge.

Sources:

- https://www.71lbs.com/
- https://71lbs.com/late-delivery/
- https://www.refundretriever.com/how-it-works
- https://www.lateshipment.com/faq/

Global demand is therefore not the rejection reason.

## 3. Fatal transfer problem — Russian late-delivery refund economics are much weaker and inconsistent

### CDEK

Current public FAQ says that when delivery terms are violated, payer may submit a claim and compensation is `3% of delivery cost for each working day of delay`.

Source:

- https://mobile.cdek.ru/faq

This is materially different from a broad `100% shipping charge back for one eligible late parcel` model.

For a modest parcel charge, one or a few late days often create a very small recoverable amount, making success-fee automation economics much weaker.

### Russian Post

For legal entities / individual entrepreneurs under many parcel/business services, current public rules provide `0.1% of the shipping-service charge per day of delay`, capped by the service charge.

Some specific express service classes can provide a 100% service-charge payment, but that is product-specific rather than a universal carrier guarantee.

Sources:

- https://info.pochta.ru/support/claims/damages-return
- https://base.garant.ru/408754345/

### DPD — the strongest late-delivery guarantee is already automatic

DPD currently sells an optional `Гарантия сроков доставки`.

Public terms state:

- option from 85 RUB/order;
- compensation of shipping tariff when delay exceeds one business day under covered conditions;
- **compensation is paid automatically**.

Source:

- https://ecom.dpd.ru/garanty

This removes the exact unclaimed-refund recovery wedge for customers who buy the strongest guarantee.

### General road freight

Russian road-transport law can provide a penalty for late cargo delivery (for example 9% of freight charge per day in relevant carrier relationships, capped by freight charge), but applicability depends on contract/legal structure and whether the counterparty is legally acting as carrier versus freight forwarder.

Current court material involving Delovye Linii demonstrates this distinction can become substantive litigation rather than a simple tracking-timestamp claim.

Sources:

- https://sudact.ru/arbitral/doc/jdCm8LlAGsZZ/
- https://sudact.ru/arbitral/doc/s4nShqbRP0Yn/

That is not the low-friction automated parcel-refund model of 71lbs.

## 4. Lost/damaged shipment rescue also weakens the original thesis

Lost/damaged claims can contain more money than late-delivery claims, but they introduce:

- declared value / insurance;
- packaging evidence;
- damage causation;
- proof of contents/value;
- acceptance records;
- carrier-specific exclusions;
- legal/claims judgment.

Therefore broadening from deterministic lateness into loss/damage changes the product into a general logistics claims-management system rather than a simple automated refund engine.

## 5. Broader Russian claims-management layer is already occupied

### Loginet

Loginet already has a `Претензии` module inside a logistics network that connects 550+ cargo owners and 6,500+ carriers.

The module allows parties to:

- record claims;
- attach documents;
- send claims for counterparty approval;
- record additional expenses;
- manage claim work inside the transport lifecycle.

Source:

- https://logistics.ru/avtomatizaciya-logistiki-transportirovka/loginet-uprostil-pretenzionnye-raboty-dlya-gruzovladelcev

### TMS / logistics software

AXELOT TMS and vertical logistics CRM products already include incident/claim-management primitives and claim workflows with customers/carriers.

Sources:

- https://www.rg-solutions.ru/product/gotovye-resheniya/dlya-avtomatizatsii-transportnoy-logistiki/axelot-tms-x4/
- https://crmlogistic.bitrix24.site/

### Rail freight has an even more exact automation layer

For Article 97 UZhT late-delivery penalties, `МЦ-Сервис Инжиниринг` already publicly describes automation that:

- receives documents from ETRAN;
- calculates/handles late-delivery claim work;
- assembles the PDF claim package;
- prevents duplicate claims;
- records submission state;
- minimizes human participation.

Source:

- https://www.rzd-partner.ru/logistics/news/avtomatizatsiya-pretenzionnoy-raboty-po-st-97-uzht-novyy-uroven-transformatsii-protsessov-ot-mts-ser/

This is strong evidence that deterministic carrier-claim automation in Russia is already naturally absorbed by transport-management / industry-specific systems.

## 6. Why narrowing does not rescue the candidate

Do not reopen as:

- `71lbs for CDEK`;
- automatic CDEK late-delivery refund service;
- DPD delay compensation recovery;
- parcel SLA refund recovery;
- multi-carrier claim tracker;
- lost/damaged parcel refund SaaS;

without new evidence of a large standardized refund pool that customers currently fail to collect and that incumbent carriers/TMS cannot automate.

The strongest US feature — high-value, standardized money-back guarantees combined with short claim windows — does not broadly reproduce in Russia.

Where Russian compensation is highly standardized, providers may pay automatically (DPD guarantee) or recovery amounts are relatively small (CDEK/Post late-delay formulas).

Where money becomes larger, workflow becomes contract/legal/evidence-heavy and existing TMS/claim systems already sit close to the data and users.

## 7. Gates

`OWNER_VERIFIABILITY_GATE`: would pass for simple timestamp-based late-delivery claims.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass if monitoring/submission were automatic.

`DATA_TRUST_GATE`: manageable.

These are not enough to overcome weak transferable economics and occupied claims infrastructure.

## 8. Final

`KILL__US_MONEY_BACK_GUARANTEE_ECONOMICS_DO_NOT_TRANSFER__BROADER_CLAIMS_LAYER_ALREADY_OCCUPIED`

The global mechanic is proven, but its most attractive economics are carrier-policy-specific and do not create the same Russian opportunity.
