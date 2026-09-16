# Strategy B Kill Test — Production-Like Test Data / Data Masking for Russia

Дата: 2026-09-16

Итог:

`KILL__MULTIPLE_DIRECT_RUSSIAN_DEV_TEST_DATA_MASKING_PRODUCTS_EXIST`

## 1. Исходная гипотеза

Российский product class уровня Tonic.ai / Delphix Test Data Management:

`production DB`
→ detect sensitive fields
→ mask/depersonalize with referential consistency and realistic format/distribution
→ optionally subset/synthesize data
→ deliver safe copy to dev/test/staging
→ repeat automatically in CI/CD.

The workflow is technically verifiable and generic AI does not replace production masking/runtime.

## 2. Direct Russian product — DataSan

Current product:

- https://datasan.ru/

DataSan directly positions itself for safe use of production-like client data in development/testing.

Current public functionality includes:

- database depersonalization for dev/test;
- preservation of relationships/logic inside DB;
- consistent replacement across CRM/ERP/billing and geographically separated systems;
- preservation of statistical distributions;
- Oracle/PostgreSQL/MS SQL/MySQL;
- claimed high-throughput processing up to 1 TB/hour;
- automated extraction -> masking -> safe test dataset delivery;
- incremental profiling / detection of newly appeared PII fields;
- direct CI/CD integration.

This is already very close to the intended product thesis.

## 3. Direct Russian product — DataMask / DataProtect

Current products:

- https://d-mask.ru/
- https://dataprotect.ru/products/datamask

DataMask explicitly targets non-production environments used by developers/testers.

Public features include:

- automatic discovery of confidential data;
- masking/depersonalization;
- realistic format-preserving replacements;
- consistency across databases;
- Postgres/Oracle/MS SQL/MariaDB and other DBMS;
- API integration;
- GitLab/CI/CD integration;
- transfer/delivery of masked database into test environment.

The product is already in the Russian software registry.

## 4. Broader incumbent market exists

Current Russian product catalogs list multiple data-masking vendors.

Examples:

- Garda Data Masking / GardaTech Prisma;
- Plus7 FormIT Masking;
- DataMask;
- dynamic masking products.

Sources:

- https://cisoclub.ru/product-class/data-masking/
- https://gt-sg.ru/products/jay-data/
- https://dis-group.ru/products/plus7-formit-masking/

Plus7 FormIT publicly includes:

- data profiling;
- sensitive-data detection;
- masking;
- process control;
- synthetic-data generation for test environments.

Therefore even a rescue via `synthetic data + masking` is not greenfield.

## 5. Service-level substitutes lower the entry barrier further

Russian providers also sell bounded test-database depersonalization projects with reusable masking rules/scripts at relatively low fixed prices.

Example:

- https://5factor.ru/uslugi/bezopasnost/obezlichivanie-personalnyh-dannyh-testovaya-baza/

This provider offers a fixed-price test-database masking/depersonalization engagement including sensitive-field map, repeatable rules, referential checks and safe masked dump delivery.

This means a startup must compete both with product incumbents and low-cost service implementation.

## 6. Why feature slicing does not rescue it

Do not reopen as:

- Tonic.ai for Russia;
- Delphix test-data masking replacement;
- CI/CD masking button;
- referentially consistent test data;
- production DB subsetting + masking;
- synthetic test datasets;
- PII discovery before test copy;
- 152-FZ compliant dev/test data pipeline.

Russian products already explicitly occupy these features and are being pushed by current 152-FZ/security demand.

A new thesis would require a materially different workflow or proprietary distribution/data advantage, not just better DX.

## 7. Gates

`OWNER_VERIFIABILITY_GATE`: would pass.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass.

`DATA_TRUST_GATE`: high, because product touches production data, but local/on-prem deployment could mitigate it.

These are not the rejection reason.

## 8. Final

`KILL__MULTIPLE_DIRECT_RUSSIAN_DEV_TEST_DATA_MASKING_PRODUCTS_EXIST`
