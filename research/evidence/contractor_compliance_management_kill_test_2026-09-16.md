# Strategy B Kill Test — Contractor Compliance / Insurance / Permit Management for Russia

Дата: 2026-09-16

Итог:

`KILL__DIRECT_RUSSIAN_CONTRACTOR_HSE_COMPLIANCE_PRODUCTS_EXIST__DOMAIN_RULES_ARE_EXPERT_HEAVY`

## 1. Исходная гипотеза

Российский product class уровня myCOI / TrustLayer / Certificial / ComplyFlow:

`contractor/vendor onboarding`
→ required insurance / SRO / licenses / permits / certificates
→ validate completeness and expiry
→ automatic renewal requests
→ contractor status / approval
→ block access/work when non-compliant
→ audit trail.

Global category is mature. ComplyFlow and similar platforms manage contractor onboarding, insurance, safety documentation, qualifications and access for enterprise customers.

The Russian version was intentionally broader than US COI because contractor eligibility depends on more than one insurance certificate.

## 2. Direct Russian product — Digital Purchasing HSE

Current product:

- https://digitalpurchasing.ru/hse

Digital Purchasing explicitly offers contractor HSE management on a procurement platform.

Public functionality includes:

- contractor prequalification;
- centralized collection and verification of HSE documents;
- checking licenses and permits before work;
- automatic checking against configured criteria;
- scoring/classification;
- transparent approval/admission decision;
- contractor digital profile;
- history, documents and current status;
- contractor rating/performance;
- digital work permit.

This is already the core `collect -> verify -> qualify -> admit -> audit` workflow.

## 3. Multiple Russian HSE/contractor incumbents reinforce the KILL

### BREALIT ISU PB&OT

Current system includes separate modules for:

- contractor management;
- permit-to-work / hazardous-work admission;
- qualification/certification control;
- occupational/industrial safety;
- risk management;
- briefings/training.

The vendor states the system is deployed in 27 Russian regions.

Source:

- https://asupb.ru/

### VISITECH

Current product suite contains dedicated `Управление персоналом и подрядчиками` plus electronic work permits and EHS modules.

Public functionality includes:

- employee/contractor access control;
- integration with medical exams, alcohol testing and predictive video analytics;
- attendance/presence control;
- electronic permit-to-work;
- industrial HSE workflows.

Sources:

- https://visitech.ru/personnel-management/
- https://visitech.ru/ehs/

VISITECH publicly shows enterprise industrial customers including Gazprom, Rosneft, MMK and others, confirming distribution into the intended ICP.

### ASK Legarus

Current product manages typed required documents and validity for employees, legal entities and contractor scenarios.

Public features include:

- document type and obligation rules;
- files and expiry dates;
- states `valid / expiring / expired / missing`;
- matrices by employee/organization;
- safety-document filtering;
- audit and role access;
- on-prem/private-cloud deployment;
- 1C:ZUP integration;
- contractor/external-personnel scenario as a supported business task.

Sources:

- https://legarus.ru/solutions/workforce-compliance/
- https://legarus.ru/industries/hr-compliance/
- https://legarus.ru/product/documents/

### Other adjacent systems

Russian market also has:

- HubEx contractor management and hazardous-work permit control;
- contractor portals integrated into 1C/ERP/project systems;
- custom contractor cabinets at large industrial companies;
- procurement/SRM platforms with contractor HSE prequalification.

Examples:

- https://hubex.ru/avtomatizatsiya-kontrolya-podryadchikov
- https://rusteh.info/projects/case-3/
- https://www.intervolga.ru/blog/projects/lichnyy-kabinet-podryadchika-uskorenie-protsessa-sbora-dokumentov-rabotnikov/

Therefore this is not a greenfield category.

## 4. US-style COI simplification does not transfer cleanly

In the US, a large part of contractor compliance can revolve around standardized Certificates of Insurance and coverage requirements.

Russian contractor readiness is materially more multidimensional.

ERSRO's current rule system illustrates that the answer can depend on:

- exact type of work;
- object/building type;
- result/subject of contract;
- contract price;
- contracting party;
- contractor/subcontractor role;
- procurement method;
- SRO membership;
- responsibility level;
- licenses;
- named specialists/qualification;
- staff permits and other regulated requirements.

Sources:

- https://ersro.ru/
- https://ersro.ru/methodology/
- https://ersro.ru/services/contractor-audit/

Insurance itself may require checking:

- insured party;
- object/risk scope;
- limit;
- term;
- exclusions;
- whether insurance is actually mandatory under law/SRO/contract.

Source:

- https://ersro.ru/documents/insurance-policy/

Therefore a simple universal `COI present + expires on date X` abstraction is not enough for the Russian market.

## 5. NСIS does not create a simple universal verification moat

Russia has the National Insurance Information System (AIS insurance), but public consumer verification is strongest/most visible for standardized lines such as OSAGO and related personal insurance history.

The current statutory AIS is a broad insurance-data infrastructure used by insurers and persons whose data is stored, but this does not by itself expose a clean public universal API for verifying every contractor commercial-liability policy against project-specific requirements.

Sources:

- https://nsis.ru/about/
- https://www.consultant.ru/document/cons_doc_LAW_1307/61891c43f33d72df3c59a90fa91df0097f4af72f/
- https://www.consultant.ru/document/cons_doc_LAW_1307/350fd8f247a9cddd9dfb085107bd70bb98216dc4/

So there is no easy data-source advantage that would let a new entrant leapfrog the existing HSE/SRM products.

## 6. OWNER_VERIFIABILITY_GATE becomes weak for the valuable part

The owner can objectively verify:

- whether a file exists;
- expiry date;
- whether configured rules were applied;
- whether access was blocked.

But the high-value question:

`is this contractor legally/safely qualified for this exact work on this exact object under this contract?`

requires domain knowledge about construction/industrial safety/SRO/licenses/insurance and project-specific rules.

ERSRO explicitly states these requirements change with work/object/contract/price/role.

That moves the product toward expert-heavy HSE/legal implementation, exactly the kind of owner-fit risk Strategy B is meant to avoid.

## 7. Global products do not create a localization gap

SDS Manager currently exposes a Russian-language contractor-management product that already tracks:

- contractor companies and personnel;
- approval workflow;
- insurance policies;
- permits;
- RAMS/process documents;
- qualifications;
- expiration;
- compliance status and history.

Source:

- https://sdsmanager.com/ru/ehs-software/contractor-management-software/

Even if local procurement/data-residency can limit some global tools, the direct Russian products above already remove the localization thesis.

## 8. Why feature slicing does not rescue it

Do not reopen as:

- myCOI for Russia;
- insurance-certificate expiration tracker;
- SRO/license/permit tracker;
- contractor onboarding portal;
- contractor document matrix;
- automatic HSE prequalification;
- access block on expired contractor docs;
- contractor compliance dashboard.

These are already available across Digital Purchasing, BREALIT, VISITECH, ASK Legarus, HubEx and enterprise contractor portals.

A new product would need a genuinely new data/network advantage rather than a narrower UI.

## 9. Final

`KILL__DIRECT_RUSSIAN_CONTRACTOR_HSE_COMPLIANCE_PRODUCTS_EXIST__DOMAIN_RULES_ARE_EXPERT_HEAVY`
