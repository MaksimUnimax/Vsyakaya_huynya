# Strategy B Kill Test — Commercial Lease / OPEX / CAM Audit for Russian Tenants

Дата: 2026-09-16

Итог:

`KILL__OWNER_DOMAIN_FIT_AND_AI_DOCUMENT_ANALYSIS_COMMODITIZATION__WEAK_RUNTIME_MOAT`

## 1. Исходная гипотеза

Tenant-side commercial lease audit layer:

`lease + landlord OPEX/CAM/utility reconciliation`
→ extract lease rules
→ independently recalculate rent/indexation/operating-expense allocation
→ identify excluded/overcharged expenses or wrong coefficients
→ create evidence-backed discrepancy report
→ dispute/recover money.

Global commercial-lease/CAM audit services are mature; 2026 software products such as LeaseGuard/CAMAudit/SeeThrou automate parts of the process.

Examples:

- https://www.leaseguard.io/
- https://www.camaudit.io/cam-reconciliation-software
- https://seethrou.com/

## 2. Direct Russian tenant-side SaaS gap was not established as occupied

Bounded Russian search found many landlord/property-management products, but not a strong exact tenant-side CAM-audit SaaS.

For example, `Арендапп` is landlord/management-company software:

- lease contracts;
- indexation;
- rent accruals;
- utilities/meter allocation;
- bank reconciliation;
- turnover rent;
- tenant cabinet.

Source:

- https://arendapp.ru/

This is an adjacent source-side system, not an independent tenant auditor.

Therefore the candidate is **not rejected because an exact local product was found**.

## 3. Fatal problem #1 — valuable conclusions depend on lease interpretation

Russian commercial lease OPEX is not a single standardized CAM protocol.

Market/legal materials show that:

- utilities/operating expenses can be included in rent or charged separately;
- allocation can be by meter, area, contract formula or separate agreements;
- composition of operating costs depends on the specific lease;
- professional class-A office landlords may use `Open Book` reporting precisely because sophisticated tenants require auditability of operating expenses.

Examples:

- https://officenavigator.ru/blog/sistema-otchetnosti-otkrytaya-kniga/
- https://xn----7sbf0aahnq1aem.xn--80aswg/interesnoe/azbuka-arendatora-opex
- https://www.garant.ru/products/ipo/prime/doc/71731260/

The high-value question is not merely arithmetic:

`is this landlord expense contractually recoverable from this tenant under this exact lease wording?`

That can require legal/CRE/accounting interpretation of:

- excluded expense categories;
- repairs/capital expenses;
- management fees;
- utility compensation;
- gross vs net rent structure;
- area/allocation denominator;
- indexation clauses;
- audit rights/deadlines.

This weakens OWNER_VERIFIABILITY for the core recovery conclusion.

## 4. Fatal problem #2 — the first-pass product is heavily commoditized by general AI

Current western software shows the basic workflow very clearly:

`upload lease PDF + reconciliation statement -> extract clauses -> compare bill -> flag potential overcharges -> cite source clause`.

LeaseGuard explicitly calls its output AI-powered and says results depend on document clarity and should be reviewed by a qualified professional.

CAMAudit uses fixed math checks but still relies on document/lease extraction and a professional-review workflow.

Sources:

- https://www.leaseguard.io/
- https://www.camaudit.io/cam-reconciliation-software

A competent user with a current general-purpose LLM can already perform much of the first pass:

- extract rent/indexation/OPEX clauses;
- read landlord statement;
- compare arithmetic;
- produce a list of possible mismatches with citations.

To escape the GENERAL_AI_SUBSTITUTION gate, the product would need persistent integration into landlord/AP/property systems, recurring structured lease abstraction, books-and-records ingestion and dispute workflow.

But that moves it toward enterprise lease-administration/legal/audit software with a much heavier data/access/sales model.

## 5. Runtime/data moat is weak

Unlike Retail Deduction Recovery, there is no standard cross-counterparty event chain comparable to:

`ORDERS -> ORDRSP -> DESADV -> RECADV`.

For a tenant-side lease audit, the decisive underlying information may remain in:

- one negotiated lease PDF;
- landlord annual reconciliation;
- landlord books/invoices, often available only through audit rights;
- facility-specific expense categories.

The product does not naturally accumulate a reusable transaction network or provider API advantage.

## 6. Russian market may be narrower than the US CAM software archetype

Russian commercial leases do have material OPEX and open-book/audit practices, especially in professional office/retail property.

But bounded evidence did not establish a broad standardized annual CAM-reconciliation regime across enough Russian commercial tenants to justify assuming the same software TAM as US NNN/CAM products.

This is a market-risk factor, not the main KILL.

## 7. What remains objectively automatable

Some deterministic checks are feasible:

- arithmetic;
- indexation date/rate;
- area/pro-rata calculation;
- meter/tariff multiplication;
- duplicate charges;
- obvious cap violation when clause is explicit;
- payment/statement reconciliation.

But the more valuable classifications (`capital expense excluded`, `landlord overhead not recoverable`, `repair category disallowed`) move into contract interpretation.

That split is too similar to the rejected owner-domain/legal-analysis pattern.

## 8. Gates

`OWNER_VERIFIABILITY_GATE`: weak/partial at the valuable edge.

`GENERAL_AI_SUBSTITUTION_GATE`: fails for the lightweight V0; document-upload audit is increasingly commodity.

`DATA_TRUST_GATE`: moderate; lease/landlord books are commercially sensitive but manageable.

`DIRECT_RUSSIAN_COMPETITION`: no fatal exact competitor established; this does not save the candidate.

## 9. Final

`KILL__OWNER_DOMAIN_FIT_AND_AI_DOCUMENT_ANALYSIS_COMMODITIZATION__WEAK_RUNTIME_MOAT`

Do not reopen as:

- CAM audit for Russian tenants;
- OPEX invoice checker;
- lease clause overcharge detector;
- commercial-rent audit AI;
- landlord reconciliation checker;

without a structurally different recurring data/action workflow that makes the product more than document analysis plus expert review.
