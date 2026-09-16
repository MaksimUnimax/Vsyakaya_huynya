# Strategy B Kill Test — Merchant Acquiring Fee Audit / Optimization for Russia

Дата: 2026-09-16

Итог:

`KILL__PAYMENT_ORCHESTRATION_ALREADY_OWNS_THE_COST_OPTIMIZATION_AND_ROUTING_LAYER`

## 1. Исходная гипотеза

Российский product/service class вокруг merchant acquiring optimization:

`acquiring statements + turnover/payment mix + contract rates`
→ calculate actual acquiring cost
→ compare banks/methods
→ identify overpriced channels
→ recommend renegotiation/switching
→ route transactions to cheaper/better acquirer where possible
→ measure RUB savings.

Global multi-acquiring / merchant-cost optimization is a mature category.

## 2. Russian acquiring pricing is comparatively transparent

Russian banks and payment providers publicly publish acquiring rates by payment method/business scenario.

Example: current Raiffeisen business acquiring page publishes card rates and SBP rates and explains that the merchant commission is defined by the contract/tariff, with lower rates possible depending on business conditions.

Source:

- https://www.raiffeisen.ru/business/product/acquiring/

Current Yandex Pay business guidance explicitly recommends merchants negotiate lower acquiring fees using:

- turnover;
- average ticket;
- seasonality;
- refund/dispute rate;
- competitive bank offers;
- bundled banking services.

Source:

- https://pay.yandex.ru/blog/articles/komissii-platezhnyh-sistem-kak-snizit-izderzhki

Therefore the initial `audit statements to discover hidden interchange complexity` thesis is weaker than in markets with more opaque layered card fees.

## 3. Payment orchestration already solves the valuable action layer

### Payture cascading payments

Payture currently offers dynamic/cascading routing:

- one API;
- multiple reserve acquiring banks;
- automatic failover/routing;
- payment-channel control.

Source:

- https://payture.com/solutions/cascading-payments

### Payture Us-on-Us

Payture also explicitly positions direct routing to issuing banks as a way to reduce payment costs.

Public functionality includes:

- direct routing when economically/technically appropriate;
- reduced commission through removal of interbank-cost components;
- consolidated reporting from different banks;
- reserve channels.

Source:

- https://payture.com/solutions/us-on-us

This goes beyond `audit and recommend` and acts directly on the cost driver.

### Plativi

Current Plativi acquiring platform offers:

- one API;
- card/SBP/pay-methods/BNPL;
- cascade across 10+ acquiring banks;
- one reporting layer;
- routing/failover.

Sources:

- https://www.plativi.com/products/acquiring/
- https://www.plativi.com/products/

Again, the platform already owns the transaction path and can optimize payment cost/conversion directly.

## 4. Large merchants can build/commission orchestration directly

Current Russian engineering cases describe multi-provider payment-orchestration platforms that unify providers, optimize commission, balance load and improve conversion.

Example:

- https://www.encomage.com/ru/keysy/payment-orchestration-platform

This is a service/custom substitute for enterprise merchants.

## 5. Why standalone audit does not create moat

A pure auditor can say:

`your current average card rate is X; competitor/SBP/another provider could cost Y`.

But:

- rates are visible in contract/statement;
- banks negotiate commercially;
- merchant can obtain competing offers;
- payment providers already expose alternatives;
- the durable value is in routing/orchestration, not the one-time calculation.

Once routing is added, the product becomes a payment-orchestration platform competing with Payture/Plativi and similar providers that already own:

- payment integrations;
- routing engine;
- contracts/relationships with acquirers;
- transaction monitoring;
- reconciliation/reporting;
- merchant distribution and trust.

Therefore the candidate has no clean independent layer.

## 6. SBP and alternative payment methods increase incumbent advantage

The relevant optimization problem in Russia is not only `which card acquirer is 0.3% cheaper`.

It is increasingly:

- cards vs SBP vs Pay-methods;
- routing by conversion/cost;
- cascading/failover;
- direct/on-us paths;
- fiscalization and settlement.

Payment-orchestration providers are structurally positioned to solve this because they sit in the payment path.

An external auditor does not.

## 7. Gates

`OWNER_VERIFIABILITY_GATE`: would pass — savings are visible in actual fees.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass only if the product continuously acts/routes rather than just analyzes statements.

`DATA_TRUST_GATE`: high/moderate — payment/turnover/provider data.

The rejection is incumbent/source-path ownership.

## 8. Final

`KILL__PAYMENT_ORCHESTRATION_ALREADY_OWNS_THE_COST_OPTIMIZATION_AND_ROUTING_LAYER`

Do not reopen as:

- acquiring fee auditor;
- merchant rate optimizer;
- smart routing for Russian acquiring;
- multi-bank acquiring cost dashboard;
- acquiring renegotiation SaaS;

without a new structural advantage not already controlled by payment-orchestration incumbents.
