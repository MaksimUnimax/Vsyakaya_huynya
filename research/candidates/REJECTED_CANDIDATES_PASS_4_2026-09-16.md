# Strategy B Candidate Registry — Pass 4 — 2026-09-16

Назначение: canonical continuation and override of:

- `REJECTED_CANDIDATES.md`
- `REJECTED_CANDIDATES_PASS_2_2026-09-15.md`
- `REJECTED_CANDIDATES_PASS_3_2026-09-16.md`

## CURRENT ACTIVE SURVIVOR

**None.**

После owner-access audit прежний единственный active survivor `Retail Deduction / Penalty Recovery for Russian Suppliers` закрыт.

## Newly killed

### Retail Deduction / Penalty Recovery for Russian Suppliers

Previous status:

`SURVIVES_DEEP_RESEARCH__PREPILOT_HISTORICAL_DATA_REQUIRED__NO_IMPLEMENTATION`

Final status:

`KILL__CORE_EVIDENCE_NOT_PUBLICLY_ACCESSIBLE__CUSTOMER_DATA_REQUIRED_BEFORE_VALUE_CAN_BE_PROVEN`

Canonical kill evidence:

`research/evidence/retail_deduction_recovery_owner_access_kill_2026-09-16.md`

Reason:

The research proved only that authorized suppliers can export/read their own EDI history through Ediweb/Saby/Kontur and related ERP integrations. It did **not** prove that a new independent product owner can obtain the real operational evidence needed to validate or operate the product before winning a supplier and receiving private data.

Core product evidence requires private customer-side records:

`ORDERS (all versions) -> ORDRSP -> DESADV -> RECADV -> penalty/deduction document -> applicable rule/formula -> historical outcome`.

Without a supplier relationship/account/export we can access only public laws, court cases, format documentation and synthetic fixtures. Those are insufficient to demonstrate a real deduction error or recovered-RUB result.

Cold outreach requesting sensitive historical EDI data is not treated as owner-accessibility. It means the product cannot prove its core value until a customer already grants the data required to prove the product.

Do not reopen merely because EDI APIs/export functions exist.

Reopen only if a reusable structural access path appears (official partner/data program or an already-controlled real supplier dataset).

---

# Existing HOLD candidates retained from Pass 3

## Unified Restaurant POS API — iiko / r_keeper / others

Status remains:

`HOLD_HIGH__EXACT_CIS_COMPETITOR_FOUND__RUSSIAN_IIKO_RKEEPER_WEDGE_STILL_OPEN__WTP_AND_PROVIDER_APPROVAL_REQUIRED`

Do not promote without new evidence on Birga scale, iiko approval, r_keeper economics and downstream WTP.

## Unified ATS API / Kombo-RU

Status remains:

`HOLD__ALBATO_OWNS_CONNECTOR_RUNTIME__PARTNER_AND_DATA_BARRIERS__CANONICAL_MODEL_MOAT_UNPROVEN`

Do not promote without evidence that canonical ATS sync/write-back is demanded and structurally unavailable from embedded-iPaaS incumbents.

---

# Method correction — mandatory for all next candidates

The previous DATA_ACCESS gate was too weak.

From now on distinguish:

### 1. TECHNICAL_EXISTENCE

Do the data exist and are they machine-readable somewhere?

### 2. OWNER_ACCESSIBILITY

Can we, starting with no customer, no privileged account and no private partner relationship, obtain enough **real** data to validate the product's core result?

A candidate does **not** pass DATA_ACCESS merely because an API exists behind customer authorization.

Examples that do not count as owner-accessible:

- supplier EDI history available only after supplier login/consent;
- bank/accounting data available only after company authorization;
- private CRM/ERP histories;
- retailer/platform dispute records available only inside participant accounts;
- closed operational datasets obtainable only after enterprise onboarding.

Synthetic data can validate code, not market value.

Public court cases can validate problem existence, not product economics.

## New hard rule

For owner-fit Strategy B discovery, prefer ideas where the first useful result can be produced from:

- public data;
- customer-supplied single lightweight input that is normal/low-trust (for example a public URL, ordinary document, export the user already has in hand);
- data obtainable through self-serve authorization after the customer decides to try the product;
- or another repeatable access path that does not require bespoke trust negotiation before value is visible.

Penalize or kill ideas where value demonstration requires the prospect to first hand over a sensitive operational corpus, bespoke exports, contracts and historical outcomes.

---

# Current cursor

There is **no active GO/PROMISING survivor** after Pass 4.

Do not continue Retail pre-pilot outreach as the primary path.

Next discovery pass should search for ideas that satisfy the stricter OWNER_ACCESSIBILITY gate from the beginning, while still preserving earlier requirements around measurable value, owner-verifiability, low dependency on expert judgment, defensibility and realistic Russian distribution.
