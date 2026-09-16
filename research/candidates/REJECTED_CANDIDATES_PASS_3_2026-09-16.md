# Strategy B Candidate Registry — Pass 3 — 2026-09-16

Назначение: canonical continuation of:

- `REJECTED_CANDIDATES.md`
- `REJECTED_CANDIDATES_PASS_2_2026-09-15.md`

Категории ниже уже были исследованы/kill-tested в текущем Strategy-B discovery. Не подавать их снова как новые идеи без **нового конкретного evidence**, которое устраняет указанную причину KILL/HOLD.

## CURRENT ACTIVE SURVIVOR

### Retail Deduction / Penalty Recovery for Russian Suppliers

Canonical card:

`B1_RETAIL_DEDUCTION_RECOVERY_RU.md`

Status:

`SURVIVES_DEEP_RESEARCH__PREPILOT_HISTORICAL_DATA_REQUIRED__NO_IMPLEMENTATION`

Идея:

`X5 / Magnit / Lenta fine/deduction`
→ reconcile `ORDERS -> ORDRSP -> DESADV -> RECADV`
→ deterministic mismatch checks
→ evidence pack
→ human-confirmed objection
→ recovered-RUB ledger.

Why it survives:

- mature global SupplyPike/SPS category;
- material Russian ruble disputes directly evidenced;
- 120-FZ/FAS creates a current active-consent deterministic rule family;
- cross-retailer EDI evidence model is real;
- no exact public Russian SupplyPike analog established after adversarial sweep;
- Ediweb/Saby/Kontur own EDI transport/prevention primitives but public evidence did not show the full independent recovery loop;
- core Tier-A result is owner-verifiable;
- bounded historical export is technically feasible through major EDI providers.

Strict limitation:

No AI legal adjudication. Article 333, quality, causation, force majeure and ambiguous contract interpretation remain human/legal only.

Next gate:

**10 real supplier historical samples**, not more web research.

Pre-pilot package:

- `research/pilots/RETAIL_DEDUCTION_RECOVERY_PREPILOT_2026-09-16.md`
- `research/pilots/RETAIL_DEDUCTION_RECOVERY_PUBLIC_ICP_CORPUS_2026-09-16.md`
- `research/pilots/RETAIL_DEDUCTION_RECOVERY_DISCOVERY_AND_FIXTURES_2026-09-16.md`
- `research/pilots/RETAIL_DEDUCTION_RECOVERY_SAMPLE_REQUEST_2026-09-16.md`
- `research/pilots/retail_deduction_recovery_synthetic_fixture_v1.json`
- `research/pilots/RETAIL_DEDUCTION_RECOVERY_OUTREACH_READY_COHORT_A_2026-09-16.md`

No implementation before historical-data/WTP gate.

---

# HOLD CANDIDATES

## Unified Restaurant POS API — iiko / r_keeper / others

Card:

`B1_UNIFIED_RESTAURANT_POS_API_RU.md`

Status:

`HOLD_HIGH__EXACT_CIS_COMPETITOR_FOUND__RUSSIAN_IIKO_RKEEPER_WEDGE_STILL_OPEN__WTP_AND_PROVIDER_APPROVAL_REQUIRED`

Why not active top:

- exact CIS product-form competitor `Birga Gateway` exists;
- Smartomato/RESTOCRM/Albato already own adjacent adapter/runtime primitives;
- iiko commercial/partner model may prohibit/economically break neutral middleware;
- r_keeper integration licensing may be service-heavy;
- downstream developer WTP not proven.

Reopen/advance only with:

- Birga scale/production iiko reality check;
- written iiko approval of exact neutral middleware business model;
- r_keeper aggregator economics;
- 15+ downstream vendor build-vs-buy/WTP evidence.

## Unified ATS API / Kombo-RU

Card:

`B1_UNIFIED_ATS_API_RU.md`

Status:

`HOLD__ALBATO_OWNS_CONNECTOR_RUNTIME__PARTNER_AND_DATA_BARRIERS__CANONICAL_MODEL_MOAT_UNPROVEN`

Why HOLD:

- Albato Embedded already owns headless/multi-tenant connector runtime;
- several Russian ATS connectors already exist there;
- provider terms/data restrictions create additional friction;
- remaining canonical `Job/Candidate/Application` model is useful but not proven as hard-to-copy moat.

Do not present as new without evidence that canonical ATS sync/write-back is both demanded and structurally unavailable from embedded-iPaaS incumbents.

---

# KILL — PASS 3

## Unified Telephony / Call Center API for Russian SaaS

Status:

`KILL__DIRECT_RUSSIAN_UNIVERSAL_PBX_CONNECTOR_EXISTS__ALBATO_OWNS_HEADLESS_RUNTIME`

Evidence:

- `Простые звонки` already sells one integration to 60+ PBXs for CRM/Helpdesk developers and normalizes call events/recording link/click-to-call/transfer;
- Albato owns modern headless connector/auth/runtime and several Russian telephony connectors.

Do not reopen as `Unified.to for Russian telephony`, normalized call API or speech-analytics PBX gateway.

## Rebate / Trade Promotion / Retro-Bonus Management

Status:

`KILL__NATIVE_1C_REBATE_WORKFLOW_AND_MULTIPLE_RUSSIAN_TPM_INCUMBENTS`

Why:

- 1C:ERP natively handles client/supplier retro-bonuses, sell-in/sell-out/price-protect, formulas, accruals and acts;
- ProSpace.Promo, GTM TPM, Rubbles, ST Chicago and others already cover broader promo/trade-spend/ROI lifecycle.

Do not reopen as Enable/UpClear for Russia.

## Parcel Carrier Refund / Claim Recovery

Status:

`KILL__US_MONEY_BACK_GUARANTEE_ECONOMICS_DO_NOT_TRANSFER__BROADER_CLAIMS_LAYER_ALREADY_OCCUPIED`

Why:

- US 71lbs-like economics rely on broad carrier money-back guarantees;
- Russian CDEK/Post delay compensation is generally much weaker;
- DPD strongest guarantee pays automatically;
- larger claims become legal/contract-heavy;
- Loginet/TMS systems already own broader logistics claims workflow.

Do not reopen as 71lbs for CDEK/DPD/Post.

## Telecom Expense Management

Status:

`KILL__DIRECT_RUSSIAN_TEM_PRODUCT_ALREADY_EXISTS`

Why:

- Tarifer Corporate already aggregates multi-operator bills/detail, finds unused lines, optimizes tariffs and reports savings;
- operator portals also own SIM/limit/usage controls.

Do not reopen as Tangoe for Russia.

## Supplier Bank-Detail Change / Payment Fraud Verification

Status:

`KILL__RUSSIAN_PAYMENT_RAIL_ALREADY_BINDS_ACCOUNT_TO_INN__REMAINING_FULL_IDENTITY_SUBSTITUTION_IS_KYC_APPROVAL_WORKFLOW`

Why:

- domestic RUB payment rail requires beneficiary account + INN/KIO correspondence;
- account-only substitution is structurally mitigated;
- remaining full identity substitution is vendor-master/KYC/approval territory already close to ERP/banks/Saby/Kontur.

Do not reopen as PaymentWorks/nsKnox for domestic Russian payments.

## AP Vendor Statement / Reconciliation Automation

Status:

`KILL__EXACT_RUSSIAN_AUTORECONCILIATION_PRODUCTS_ALREADY_EXIST`

Why:

- Saby Autoreconciliation already ingests PDF/Excel/scan/XML, matches with 1C/Saby, finds discrepancies, creates discrepancy protocol, signs/sends;
- Kontur Mutual Settlements and native 1C reconciliation also exist.

Do not reopen as supplier statement AI/reconciliation portal.

## Warehouse Dock Appointment / Time-Slot Management

Status:

`KILL__DIRECT_MATURE_RUSSIAN_TSM_YMS_PRODUCT_EXISTS`

Why:

- ant Time Slot Management is a standalone mature Russian dock/time-slot/YMS product with carrier self-booking, resource scheduling, queue/status, API and enterprise deployments;
- Cargoclix is also available.

Do not reopen as Opendock for Russia.

## Production-Like Test Data / Data Masking

Status:

`KILL__MULTIPLE_DIRECT_RUSSIAN_DEV_TEST_DATA_MASKING_PRODUCTS_EXIST`

Why:

- DataSan, DataMask/DataProtect, Garda, Plus7 and others already do dev/test PII discovery/masking with referential consistency, API/CI/CD and synthetic data.

Do not reopen as Tonic.ai/Delphix for Russia.

## Contractor Compliance / Insurance / Permit Management

Status:

`KILL__DIRECT_RUSSIAN_CONTRACTOR_HSE_COMPLIANCE_PRODUCTS_EXIST__DOMAIN_RULES_ARE_EXPERT_HEAVY`

Why:

- Digital Purchasing HSE, BREALIT, VISITECH, ASK Legarus, HubEx etc. already manage contractor qualification/docs/permits/access;
- Russian requirements depend on work/object/SRO/license/staff/contract specifics, weakening OWNER_VERIFIABILITY at the valuable edge.

Do not reopen as myCOI/ComplyFlow for Russia.

## Dealer / Service Warranty Claim Recovery

Status:

`KILL__OEM_SPECIFIC_CLOSED_CLAIM_SYSTEMS_AND_DOMAIN_RULES__NEUTRAL_RECOVERY_LAYER_BECOMES_CUSTOM_INTEGRATION`

Why:

- OEMs such as KAMAZ already own private warranty systems/claim rules;
- Alfa-Auto/1C and dealer systems integrate into OEM workflow;
- valuable underpayment disputes depend on manufacturer-specific technical/warranty expertise.

Do not reopen as generic warranty reimbursement recovery SaaS.

## Energy / Utility Bill Audit & Recovery

Status:

`KILL__DIRECT_RUSSIAN_ENERGY_BILL_AUDIT_AND_TARIFF_OPTIMIZATION_SOFTWARE_EXISTS`

Why:

- `яЭнергетик` and `РЭП-ЭНЕРГОУЧЁТ` already independently calculate supplier bills/tariffs, optimize price categories, identify overpayment and generate dispute/reconciliation reports;
- current local case evidence includes material refund/recalculation.

Do not reopen as EnergyCAP for Russia.

## Merchant Chargeback / Dispute Recovery

Status:

`KILL__ACQUIRERS_OWN_THE_DISPUTE_SUBMISSION_PATH__RUSSIAN_PAYMENT_PROVIDERS_ALREADY_HANDLE_CHARGEBACK_WORKFLOW`

Why:

- merchant dispute rail goes through acquirer/payment system;
- YooKassa/T-Business already expose dispute/evidence workflow;
- Payture sells managed chargeback handling through representment/resolution.

Do not reopen as Chargeflow-RU.

## Merchant Acquiring Fee Audit / Optimization

Status:

`KILL__PAYMENT_ORCHESTRATION_ALREADY_OWNS_THE_COST_OPTIMIZATION_AND_ROUTING_LAYER`

Why:

- Payture/Plativi already route/cascade across banks/payment methods and optimize commission/conversion;
- standalone auditor lacks transaction-path moat; adding routing means entering occupied orchestration market.

Do not reopen as acquiring-rate auditor/smart routing.

## Franchise Royalty / Revenue Reporting Audit

Status:

`KILL__FRANCHISE_MANAGEMENT_AND_POS_PLATFORMS_ALREADY_OWN_SALES_TO_ROYALTY_WORKFLOW`

Why:

- Saby Net receives franchisee POS sales after shift closure and uses them for royalty calculation;
- Poster/Saby Presto/Go-CRM/Aspro.Cloud already centralize franchise revenue/royalty tracking.

Do not reopen as FranConnect royalty auditor.

## Commercial Lease / OPEX / CAM Audit

Status:

`KILL__OWNER_DOMAIN_FIT_AND_AI_DOCUMENT_ANALYSIS_COMMODITIZATION__WEAK_RUNTIME_MOAT`

Why:

- exact Russian tenant-side SaaS gap may exist, but valuable decisions depend on legal/CRE interpretation of lease/OPEX categories;
- lightweight product becomes document-upload LLM + math + professional review;
- no strong recurring data-network moat.

Do not reopen as lease/CAM overcharge AI.

## Hotel OTA Commission / Settlement Reconciliation

Status:

`KILL__RUSSIAN_PMS_CHANNEL_MANAGERS_ALREADY_OWN_OTA_RECONCILIATION_PRIMITIVES_AND_HOTEL_DISTRIBUTION`

Why:

- TravelLine, Bnovo, Kontur.Hotel, Saby Hotel already reconcile channels/agents/commissions and own PMS/channel source data;
- bank-payout mismatch/dispute queue is a bounded incumbent feature.

Do not reopen as reconcileOTA for Russia.

## Yandex Eats Penalty / Deduction Appeal Recovery

Status:

`KILL__LOW_RECOVERY_POOL__POS_VIDEO_AND_CHANNEL_MANAGER_INCUMBENTS_OWN_CORE_PRIMITIVES__DEDICATED_GLOBAL_RECOVERY_CATEGORY_UNPROVEN`

Why:

- Yandex states restaurant-side violations occur in less than 1% of orders;
- public API does not expose full fine/appeal control plane;
- Jupiter/Surf/Saby already own reconciliation/order data;
- iiko/Ivideon/TRASSIR/r_keeper already own order-to-video evidence primitives;
- exact global restaurant appeal-recovery category remains early rather than mature.

Do not reopen as Yandex Eats anti-fines/appeal bot.

## Returnable Asset / Reusable Packaging Tracking

Status:

`KILL__NATIVE_1C_RETURNABLE_PACKAGING_CORE__VERTICAL_SOFTWARE_AND_RFID_PROJECTS_OWN_ITEM_LEVEL_LAYER`

Why:

- 1C:ERP already tracks returnable packaging, deposits, counterparties, deadlines and return/buyout;
- item-level visibility moves into RFID/QR implementation and vertical products such as gas-cylinder/keg tracking;
- better visibility becomes service-heavy hardware/ERP integration.

Do not reopen as TrackAbout for Russia.

## Ocean Container Demurrage / Detention Audit

Status:

`KILL__RUSSIAN_TMS_ALREADY_OWNS_DEMURRAGE_CALCULATION__NO_STANDARDIZED_NEUTRAL_PORT_DATA_OR_FMC_LIKE_DISPUTE_RAIL`

Why:

- Logismart/1C TMS already calculate expected demurrage/storage/detention from contract/rates/events;
- Russian evidence/dispute path is fragmented by line/agent/terminal/forwarder;
- no BlueCargo-like neutral port-data/FMC-standardized rail established.

Do not reopen as BlueCargo for Russia.

## Rail Freight Claim / Article 97 UZhT Recovery

Status:

`KILL__RZD_DIGITAL_CLAIM_RAIL_AND_DIRECT_MC_SLEZHENIE_RECOVERY_AUTOMATION_ALREADY_EXIST`

Why:

- `МЦ-Слежение` already calculates delivery delays/penalties, retrieves ETRAN documents and forms Article-97 claim packages;
- RZD itself owns digital claim intake/processing through EASAPR SFFTO + ETRAN and downstream correction/refund path.

Do not reopen as ETRAN penalty recovery / Article-97 claim bot.

---

# STRATEGIC LESSON FROM PASS 3

Repeated failure pattern:

### Horizontal accounting/operations software

Usually already inside:

- 1C;
- Saby;
- Kontur;
- established vertical vendors.

### Unified connector infrastructure

Usually incumbent owns:

- adapters;
- auth;
- runtime;
- distribution;

through Albato or vertical platforms.

### Platform/payment disputes

Official source-of-truth/submission rail is usually owned by:

- acquirer;
- marketplace;
- OTA;
- carrier;
- railway/operator.

### Physical asset workflows

Better-than-ERP visibility often requires:

- RFID/QR hardware;
- site integration;
- service-heavy deployment.

### Document/legal audits

Lightweight product is increasingly substituted by general LLM + expert review and often fails OWNER_VERIFIABILITY.

## Why Retail Deduction Recovery remains unusual

In the surviving thesis:

- EDI incumbents store the **facts**;
- retailer controls the deduction;
- but no public installed product was established that independently decides, from the supplier side, whether the deterministic retailer deduction matches those facts and then tracks recovered RUB across retailers/providers.

That separation between:

`fact transport`

and

`independent money-validity/recovery workflow`

is the structural gap worth testing with real data.

## Rule for next discovery passes

Do NOT resume broad category roulette until Retail pre-pilot is attempted.

If Retail fails real-data economics/access/WTP, next Strategy-B search should focus only on workflows with the same structural pattern:

1. external counterparty/platform withholds/charges money;
2. buyer owns independent machine-readable source facts;
3. current incumbent transports records but does not own independent validity decision;
4. claim/recovery result is measurable;
5. rules have a meaningful deterministic subset;
6. no strong source-platform incumbent can trivially absorb the function.

Anything else should face a very high burden before a new candidate card is created.
