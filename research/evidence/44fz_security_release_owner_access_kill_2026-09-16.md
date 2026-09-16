# 44-FZ Performance-Security Release — Owner-Access Kill

Date: 2026-09-16

Final status:

`KILL__SECURITY_AMOUNT_PUBLIC_BUT_ACTUAL_SECURITY_METHOD_NOT_RELIABLY_OWNER_ACCESSIBLE`

## Thesis tested

Potential supplier-side found-money workflow:

`public contract -> performance security amount -> accepted/paid stages -> proportional security reduction -> if security was cash, alert supplier to request return of released cash`.

The economic intuition was attractive because this could release working capital rather than recover very small payment-delay penalties.

## Legal mechanism exists

Article 96 of 44-FZ provides that performance security for staged contracts is reduced proportionally to accepted and paid obligations. If the security was cash, the released part is returned to the supplier upon the supplier's application; if the security was an independent guarantee, the customer instead loses rights under the guarantee proportionally.

Thus the actual security METHOD is a core decision field, not a cosmetic detail.

## Live public EIS test

Control contract:

`3521900167826000004`

Public EIS without login exposes:

- contract/execution data;
- accepted and paid stages;
- performance-security amount: `334,556.70 RUB`.

However, neither the public `common-info` page nor the public contract print form exposed the actual method used by the supplier (`cash` vs `independent guarantee`).

Public control URL:

`https://zakupki.gov.ru/epz/contract/contractCard/common-info.html?reestrNumber=3521900167826000004`

## Registry rules vs actual anonymous accessibility

Current rules for the contract registry require the registry to contain:

- security method;
- security amount;
- independent-guarantee registry number when a guarantee is used.

This proves `TECHNICAL_EXISTENCE` inside the EIS data model.

It does NOT prove anonymous `OWNER_ACCESSIBILITY`.

The live public interface exposed the amount but not the method on the tested modern contract.

## Independent-guarantee public route does not rescue the thesis

The old public EIS bank-guarantee register is searchable, but the live page itself states that public information there is available only through `30.06.2018` and that, from `01.07.2018`, information about guarantees provided as bid/performance security is not placed on the public EIS site.

Control search:

`https://zakupki.gov.ru/epz/bankguarantee/search/results.html?searchString=3521900167826000004`

Result: no current record; page displays the 2018 public-availability limitation.

Therefore absence from that public register cannot be used to infer `cash` for a modern contract.

## Third-party API check

MultiTender's documented supplier-contract endpoint exposes:

- `purchaseContractGuarantee`;
- `contractGuarantee`;
- execution/payment/penalty summary fields.

The public endpoint documentation reviewed does not expose the actual modern security method or a current independent-guarantee registry identifier that would let an unauthenticated product distinguish cash from guarantee reliably.

Do not infer cash from `contractGuarantee > 0`.

## Why this is a hard kill under the revised Strategy-B methodology

To produce the valuable claim:

`you can request return of Z RUB of your cash right now`

we must know that the supplier actually used cash security.

Without that fact:

- a guarantee-backed contract becomes a false positive;
- the calculated `released cash` may not exist;
- asking the supplier to tell us the method turns the product back into customer-dependent validation;
- the product cannot demonstrate its core value independently before trust/onboarding.

This repeats the project lesson:

`TECHNICAL_EXISTENCE != OWNER_ACCESSIBILITY`.

## Reopen condition

Reopen only if a repeatable self-serve source is demonstrated that, for current contracts and without supplier cooperation, reliably exposes the actual performance-security method (cash vs independent guarantee), or if a low-friction public/self-serve data provider exposes that field with sustainable terms.

Until then do not present `44-FZ security release` as a live candidate.
