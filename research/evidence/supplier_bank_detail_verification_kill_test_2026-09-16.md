# Strategy B Kill Test — Supplier Bank-Detail Change Verification / B2B Payment Fraud for Russia

Дата: 2026-09-16

Итог:

`KILL__RUSSIAN_PAYMENT_RAIL_ALREADY_BINDS_ACCOUNT_TO_INN__REMAINING_FULL_IDENTITY_SUBSTITUTION_IS_KYC_APPROVAL_WORKFLOW`

## 1. Исходная гипотеза

Российский product class уровня PaymentWorks / Trustmi / nsKnox:

`новый supplier / поставщик прислал новые банковские реквизиты`
→ не доверять email/invoice автоматически
→ независимо проверить supplier identity / account ownership
→ сравнить с approved vendor master
→ заблокировать изменение master-data / payment до verification
→ audit trail.

Global category is real and commercially mature.

Examples:

- PaymentWorks — vendor onboarding, identity/bank verification, ERP synchronization and payment-fraud risk transfer;
- Trustmi — bank-detail change revalidation and payment security;
- nsKnox — vendor master data change monitoring/validation.

Sources:

- https://www.paymentworks.com/
- https://www.paymentworks.com/what-we-do/
- https://trustmi.ai/products/vendor-onboarding-and-management/
- https://trustmi.ai/products/behavioral-ai-payment-security/
- https://nsknox.net/master-data-guard/

The rejection is not absence of global demand.

## 2. BEC / payment-detail substitution risk exists in Russia

Russian banks continue warning corporate customers about compromised email / fake supplier details.

Sovcombank explicitly warns that attackers may:

- use clone companies with the same/similar name;
- replace payment details;
- exploit compromised/spoofed supplier email;
- send new bank details;
- require the payer to verify INN and confirm changed bank details via a known independent contact channel.

Source:

- https://sovcombank.ru/business/pages/antifraud

Historical Russian court cases also document material losses from replacement of beneficiary payment details.

Therefore fraud risk itself is real.

## 3. Structural difference from many foreign bank-account verification markets

The current Russian payment rail already requires the beneficiary bank to identify a legal-entity / individual-entrepreneur recipient by more than the account number alone.

### Bank of Russia Regulation 762-P

Current Bank of Russia clarification states that under paragraph 4.4 of Regulation 762-P, when crediting a legal entity / individual entrepreneur, the recipient must be identified using:

- account number (or identifier that uniquely establishes it);
- plus other recipient information;
- for a legal entity / IP, that other information must be the recipient's `INN` or `KIO`.

Official Bank of Russia explanation:

- https://cbr.ru/explan/Psystem/

This means the classic attack:

`legitimate supplier identity/INN stays unchanged -> attacker substitutes only bank account`

should not result in normal crediting to an unrelated fraudster legal entity if the fraudster's account does not belong to the INN in the payment order.

### 2026 Treasury clarification

Federal Treasury letter dated 13.03.2026 N 07-04-05/01-7117 explicitly states that absence or mismatch of beneficiary INN with bank details makes crediting impossible; uncredited funds are returned to the payer.

Sources:

- https://www.consultant.ru/document/cons_doc_LAW_533774/
- https://www.garant.ru/products/ipo/prime/doc/413902619/

The Treasury letter is addressed to treasury-payment quality, but it directly relies on the same Bank of Russia account+INN identification rule.

## 4. Supreme Court practice reinforces the account↔recipient identity check

The Supreme Court's banking-law review states that a beneficiary bank receiving a payment order for a legal entity with a specified INN must:

- credit the payment to that legal entity;
- or identify/flag inconsistency;
- and must check correspondence between the recipient details in the payment instruction and the owner of the account being credited.

If the beneficiary bank credits an account belonging to a different legal entity, this can constitute improper execution and create bank liability.

Source:

- https://sudact.ru/law/obzor-sudebnoi-praktiki-verkhovnogo-suda-rossiiskoi-federatsii_51/sudebnaia-kollegiia-po-ekonomicheskim-sporam/praktika-primeneniia-zakonodatelstva-o-bankakh/

Historical cases show why this matters: fraud attacks replaced bank account and other recipient fields; courts focused on mismatch between the INN/recipient intended by payer and account owner.

Examples:

- https://sudact.ru/arbitral/doc/eIYsRw5zlkLX/
- https://sudact.ru/arbitral/doc/ra3FXbhpPXUg/

## 5. What attack remains after the account+INN rule

An attacker can still attempt full beneficiary substitution:

`real supplier name / INN / account`
→ replaced by
`fraudster legal entity INN + fraudster account`, possibly preserving a confusingly similar display name.

Or malware can alter multiple payment-order fields simultaneously.

Bank of Russia materials describe attacks where malware replaced:

- bank BIK;
- account number;
- beneficiary INN;

while leaving a familiar-looking beneficiary name.

Source:

- https://cbr.ru/Collection/Collection/File/32086/gubzi_17.pdf

But this is no longer a narrow `verify whether this bank account belongs to the existing supplier INN` problem.

It becomes:

- did supplier identity itself change?;
- did INN change?;
- is this an entirely new counterparty?;
- is the master-data change approved?;
- was the change independently confirmed?;
- does the payment still point at the vendor already approved in ERP?

That is standard counterparty KYC + vendor-master change control + payment approval.

## 6. Russian incumbents already own the remaining workflow primitives

### 1C / ERP

Russian ERP products already maintain counterparty master data/history and payment processes. 1C configurations support counterparty identity/history primitives; changes to legal data can be retained by effective date.

Examples:

- https://torg.1c.ru/news/novaya-versiya-1s-unf-istoriya-izmeneniy-rekvizitov-kontragentov-i-organizatsiy-novye-edinitsy-izmer/
- https://its.1c.ru/db/content/updinfoarch/src/smallbusiness/1.6.26/index.htm

This is not exact fraud prevention by itself, but it means the vendor-master object and change history already live inside the incumbent system.

### Saby

Saby currently supports configurable payment approval where:

- manager creates payment request;
- manager/head approves business purpose;
- finance checks correctness of document **and payment details**;
- discrepancies are sent back for correction;
- after finance approval Saby automatically forms payment orders.

Source:

- https://saby.ru/help/regulations/example/account/application_for_payment

Saby also owns supplier/EDI identity and counterparty-document workflows.

### Counterparty/KYC products

The remaining full-identity-substitution problem overlaps the already mature Russian counterparty-verification market:

- 1C:Контрагент;
- Kontur.Focus / similar registry products;
- bank business-client antifraud/KYC;
- ERP approval and role controls.

A new standalone product would need to insert itself into the most sensitive AP/payment path while competing with systems that already own vendor master, approvals and bank integration.

## 7. Why the foreign bank-account-ownership wedge does not transfer cleanly

A strong PaymentWorks/nsKnox-style value proposition abroad can be:

`supplier says account changed -> independently prove the new account belongs to the legitimate supplier before money moves`.

In Russia, for ordinary legal-entity/IP payment orders, the bank rail already binds the account to recipient INN/KIO at crediting.

Therefore:

### Account-only substitution

Already materially mitigated by the banking rule.

### Full INN + account substitution

Can pass account-owner matching, but is detectable as a **supplier identity change**, not a mere bank-detail change.

The needed controls are then:

- block unexpected INN/vendor changes;
- independent callback / trusted channel confirmation;
- counterparty KYC;
- dual approval;
- ERP master-data audit.

Those are comparatively straightforward workflows for existing ERP/SRM/bank/security incumbents to add and do not require a unique external bank-account ownership network.

## 8. Important limitation — this does NOT mean fraud is impossible

Do not overstate the conclusion.

Fraud can still occur via:

- full beneficiary substitution;
- compromised ERP/DBO devices;
- social engineering that convinces staff to onboard a new fake entity;
- malicious insiders;
- fraudulent new vendors;
- international payments / foreign accounts, where Russian domestic account+INN mechanics do not apply the same way;
- errors or control failures at banks.

The conclusion is narrower:

> the proposed standalone Russian SaaS whose moat is independent verification of supplier bank-account ownership after a bank-detail change does not have the same structural gap, because the domestic payment rail already performs the core account↔INN identity check and the remaining attack shifts into mature KYC/approval territory.

## 9. Gates

`OWNER_VERIFIABILITY_GATE`: would pass — injected fake supplier-detail changes and payment blocks are testable.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass for a persistent payment control plane.

`DATA_TRUST_GATE`: severe — the product must sit in ERP/vendor-master/payment workflow and handle highly sensitive commercial/payment data.

That high trust burden makes the weak market-gap evidence even worse.

## 10. Final

`KILL__RUSSIAN_PAYMENT_RAIL_ALREADY_BINDS_ACCOUNT_TO_INN__REMAINING_FULL_IDENTITY_SUBSTITUTION_IS_KYC_APPROVAL_WORKFLOW`

Do not reopen as:

- PaymentWorks for Russia;
- nsKnox for Russian suppliers;
- bank-account ownership verification for 1C;
- supplier bank-change verification SaaS;
- BEC bank-detail validation for domestic RUB B2B payments;

without a genuinely different workflow such as cross-border supplier verification where the Russian domestic account+INN rail does not solve the ownership problem.
