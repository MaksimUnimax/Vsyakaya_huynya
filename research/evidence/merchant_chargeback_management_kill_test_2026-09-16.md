# Strategy B Kill Test — Merchant Chargeback / Dispute Recovery for Russia

Дата: 2026-09-16

Итог:

`KILL__ACQUIRERS_OWN_THE_DISPUTE_SUBMISSION_PATH__RUSSIAN_PAYMENT_PROVIDERS_ALREADY_HANDLE_CHARGEBACK_WORKFLOW`

## 1. Исходная гипотеза

Российский product class уровня Chargeflow / Justt / Midigator:

`эквайер/PSP сообщил о chargeback/dispute`
→ автоматически подтянуть order/payment/delivery/usage evidence
→ определить reason code
→ собрать representment package
→ ответить в deadline
→ track result
→ measure recovered RUB.

Global category is mature and measurable in recovered revenue.

## 2. Structural problem — merchant does not own direct dispute rail

For Russian card acquiring, merchant normally does not submit a dispute directly into the payment-system arbitration layer.

Current merchant workflow is:

`cardholder -> issuer -> payment system -> acquirer -> merchant`

and back:

`merchant evidence -> acquirer -> issuer/payment system`.

For MIR transactions, current court materials explicitly describe disputes being resolved through the payment-system procedure/platform (`Диспут Плюс`) between participants, with the acquiring bank interacting with the merchant and payment system.

Examples:

- https://sudact.ru/arbitral/doc/3eIE1gbErC1w/
- https://www.tbank.ru/business/help/business-payments/internet-acquiring/how-use/accept-payment/

Therefore an independent SaaS does not naturally own the official submission path. It must integrate with each acquirer/PSP or rely on merchant-side manual forwarding.

## 3. Russian acquiring incumbents already own the merchant workflow

### YooKassa

Current merchant cabinet has a dedicated `Спорные` payments workflow.

When a dispute arrives:

- merchant receives notification;
- disputed transaction appears in a dedicated list;
- merchant can agree with refund or dispute it;
- merchant submits documents/evidence through the provider workflow.

Source:

- https://yookassa.ru/docs/support/merchant/payments/disputes

### T-Business

Current internet-acquiring workflow explicitly manages merchant chargeback response:

- acquirer receives dispute;
- asks merchant whether it agrees;
- merchant supplies evidence;
- bank forwards the evidence to issuer;
- if dispute continues, banks/payment system handle next round.

Source:

- https://www.tbank.ru/business/help/business-payments/internet-acquiring/how-use/accept-payment/

### Payture — direct full-service competitor

Current Payture product explicitly sells `Сопровождение процедуры Chargeback`.

Public workflow includes:

- receive payment-system notification;
- classify reason code / assess validity and win probability;
- collect evidence;
- prepare representment;
- interact with issuing bank/payment systems;
- track case through resolution;
- provide prevention recommendations.

Source:

- https://payture.com/solutions/chargeback

This is already very close to the entire proposed recovery workflow.

### CloudPayments / MAGUS

CloudPayments provides chargeback analytics/support through payment-account management, and MAGUS publicly states it takes over evidence preparation and interaction with the issuing bank to dispute chargebacks and return money.

Sources:

- https://cloudpayments.ru/subscriptions
- https://magus.group/

Thus the category is not absent locally even at the managed-service layer.

## 4. Why multi-PSP aggregation does not rescue the thesis

A merchant using multiple acquirers could benefit from one normalized dispute dashboard.

However:

- exact submission still remains acquirer-specific;
- acquirers/PSPs already own transaction data and official dispute channel;
- each acquirer can automate evidence collection from its own payments more cheaply than an outsider;
- largest multi-PSP merchants are a narrower enterprise ICP and often have dedicated risk/payments teams;
- an external platform would require highly sensitive payment/order/customer data from multiple systems;
- major acquiring incumbents have much stronger distribution and trust.

This is feature aggregation, not a demonstrated structural gap.

## 5. Russian payment mix further weakens a card-only standalone wedge

Current Russian merchants increasingly use payment methods outside classic card chargeback rails, including SBP, which has its own dispute process rather than ordinary card chargeback.

Current payment-industry materials distinguish:

- card/token transactions -> chargeback rules;
- SBP -> separate `Диспут` / request mechanisms.

Source:

- https://pay.yandex.ru/blog/articles/chardzhbek-chto-eto-takoe

A broad dispute-management platform would therefore need to become a multi-rail payment-operations product, moving even closer to the payment providers themselves.

## 6. Global category does not create Russian gap

Global products such as Chargeflow automate:

- dispute ingestion from connected PSPs;
- evidence enrichment;
- automatic representment;
- recovered-revenue tracking.

Source:

- https://docs.chargeflow.io/docs/merchants/overview

But the fact that the model is mature abroad is insufficient when Russian acquirers/PSPs already control the core transaction/dispute surface and directly offer merchant support/managed chargeback resolution.

## 7. Gates

`OWNER_VERIFIABILITY_GATE`: would pass — dispute won/lost and recovered amount are objective.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass for persistent multi-system evidence automation.

`DATA_TRUST_GATE`: high — transaction, card-related, customer, order and delivery data.

The rejection is market structure/source-of-truth ownership, not product mechanics.

## 8. Final

`KILL__ACQUIRERS_OWN_THE_DISPUTE_SUBMISSION_PATH__RUSSIAN_PAYMENT_PROVIDERS_ALREADY_HANDLE_CHARGEBACK_WORKFLOW`

Do not reopen as:

- Chargeflow for Russia;
- chargeback evidence generator;
- merchant dispute dashboard;
- multi-acquirer chargeback management;
- automated representment for MIR;

without a genuinely new payment-rail/data advantage that current acquirers/PSPs cannot provide themselves.
