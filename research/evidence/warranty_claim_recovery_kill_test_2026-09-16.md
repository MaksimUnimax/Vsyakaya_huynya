# Strategy B Kill Test — Dealer / Service Warranty Claim Recovery for Russia

Дата: 2026-09-16

Итог:

`KILL__OEM_SPECIFIC_CLOSED_CLAIM_SYSTEMS_AND_DOMAIN_RULES__NEUTRAL_RECOVERY_LAYER_BECOMES_CUSTOM_INTEGRATION`

## 1. Исходная гипотеза

Российский warranty-recovery layer класса Tavant/Syncron/Infor warranty claims:

`dealer/service center performs warranty work`
→ verify entitlement
→ collect parts/labor/proof
→ submit OEM/manufacturer claim
→ track approval/rejection/underpayment
→ reconcile reimbursement
→ identify unpaid/underpaid warranty work.

Global category is mature and the outcome is monetary.

## 2. Russian reimbursement workflow is real

Russian dealer/manufacturer agreements regularly require the dealer to perform warranty work first and then receive compensation according to manufacturer rules.

Court materials describe reimbursement for:

- labor;
- parts/materials;
- approved third-party costs;
- manufacturer-specific standard labor times and price rules.

Examples:

- https://www.garant.ru/products/ipo/prime/doc/53869350/
- https://www.garant.ru/products/ipo/prime/doc/54535145/

Therefore the underlying money/problem exists.

## 3. Fatal structure — OEM owns the rulebook and submit system

### KAMAZ has its own warranty information system

Current/recent court and implementation evidence shows KAMAZ dealer warranty work is processed through `1С: Гарантийное обслуживание автотехники` / `1С:ГОА`.

The system stores vehicle lifecycle/service/warranty information and is used to:

- check warranty eligibility by time/mileage;
- register technical/service history;
- create warranty/reclamation acts;
- attach registration/service documents and photos;
- submit and review reclamations;
- record defects and their resolution;
- support OEM warranty policy requirements.

Access is granted to authorized service centers and trained/certified warranty specialists.

Sources:

- https://base.garant.ru/64437308/
- https://sudact.ru/arbitral/doc/X03FYl6njTbv/
- https://reportcollection.inion.ru/reports/download/?reportId=4849

A modern Alfa-Auto deployment for a KAMAZ/FOTON dealer explicitly integrates dealer service/order data with KAMAZ manufacturer systems, including `Гарантийное обслуживание автомобилей (ГОА)`.

Source:

- https://eawards.1c.ru/projects/modernizaciya-sistemy-upravleniya-avtocentrom-na-baze-alfa-avto-320919/

This is exactly the source-of-truth/submission path an independent recovery product would need to access.

## 4. OEM rules are deeply manufacturer-specific

Historical and current Russian warranty agreements show reimbursement depends on manufacturer-specific rules such as:

- whether a repair qualifies as warranty;
- pre-authorization before repair;
- exact parts allowed;
- documentation required;
- standard labor time from manufacturer software;
- approved warranty labor rate;
- deadlines for claim submission;
- service-book/maintenance compliance;
- diagnostics and causation;
- whether third-party costs were pre-approved.

Examples:

- https://www.garant.ru/products/ipo/prime/doc/39040082/
- https://www.garant.ru/products/ipo/prime/doc/54535145/

This makes a neutral `underpayment detector` much less deterministic than retail deduction recovery. A claim rejected for unauthorized part/labor/diagnosis may require brand-specific technical/warranty expertise rather than generic arithmetic.

## 5. Existing DMS/ERP/custom systems already own dealer-side primitives

### Alfa-Auto / 1C ecosystem

Russian dealer systems already manage:

- work orders;
- service history;
- warranty order restrictions/history;
- parts consumed in warranty repair;
- reports for manufacturer reclamation;
- integration with OEM systems.

Examples:

- https://adaptasoft.ru/avtoliga/
- https://rarus.ru/clients/solutions/20220315-dilerskiy-tsentr-obsluzhivaet-klientov-v-2-raza-bystree-s-alfa-avto-524245/

### Generic manufacturer/dealer portals are easy to implement in current CRM/ERP

Optitech case:

- dealers can create warranty applications;
- see history/status and correspondence;
- applications go to Bitrix24;
- final reimbursement amount is approved in 1C.

Source:

- https://www.infinitystudio.ru/cases/optitech/

Directum has also been used for customer/warranty reclamation management with web submission and internal approval workflows.

Source:

- https://club.directum.ru/award/255605

Therefore generic submission/status workflow is not a missing software primitive.

## 6. Why a cross-OEM recovery layer is structurally weak

A neutral platform would need per-OEM access and logic for:

- private dealer/OEM portals;
- authorization/partner contracts;
- brand warranty policies;
- technical diagnosis rules;
- standard labor operations;
- parts pricing/reimbursement;
- preauthorization;
- evidence formats;
- appeal procedures;
- payout/reconciliation.

The valuable submit path is controlled by each OEM/manufacturer.

Unlike EDI retail deductions, there is no broadly standardized cross-OEM event chain comparable to `ORDERS -> ORDRSP -> DESADV -> RECADV`.

So the candidate splits badly:

`one OEM -> existing OEM/DMS integration already owns workflow`

`many OEMs -> service-heavy custom integration + domain-policy project`.

## 7. OWNER_VERIFIABILITY_GATE deteriorates at the valuable edge

The owner can verify:

- claim submitted/not submitted;
- documents attached;
- claimed vs paid amount;
- deadline;
- status.

But the highest-value question:

`was this rejection/underpayment wrong according to OEM warranty policy and technical facts?`

may depend on:

- diagnosis;
- cause of failure;
- service compliance;
- permitted parts/procedures;
- manufacturer-specific labor rules.

That requires automotive/industrial warranty expertise and weakens owner fit.

## 8. Why feature slicing does not rescue it

Do not reopen as:

- warranty reimbursement tracker;
- dealer claim underpayment finder;
- warranty claims portal for Russian OEMs;
- automatic dealer claim package;
- multi-brand warranty recovery SaaS;
- warranty claim reconciliation for 1C/Alfa-Auto.

These either sit inside existing OEM/DMS systems or require the same per-OEM integration/policy expertise.

A new thesis would need an open, standardized external data/claim network not controlled by each manufacturer.

## 9. Final

`KILL__OEM_SPECIFIC_CLOSED_CLAIM_SYSTEMS_AND_DOMAIN_RULES__NEUTRAL_RECOVERY_LAYER_BECOMES_CUSTOM_INTEGRATION`
