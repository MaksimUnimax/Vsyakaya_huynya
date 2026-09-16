# Strategy B Kill Test — Franchise Royalty / Revenue Reporting Audit for Russia

Дата: 2026-09-16

Итог:

`KILL__FRANCHISE_MANAGEMENT_AND_POS_PLATFORMS_ALREADY_OWN_SALES_TO_ROYALTY_WORKFLOW`

## 1. Исходная гипотеза

Российский product class уровня FranConnect/Naranga:

`franchisee sales data`
→ independently collect/sync POS/revenue data
→ calculate royalty/marketing fees by agreement
→ detect underreporting / overdue payments
→ invoice/collect
→ audit trail.

The value is objective and monetary: royalty owed vs royalty paid.

## 2. Saby already closes the exact data-to-royalty loop

Current Saby franchise-management product (`Saby Net`) explicitly provides:

- franchise portal;
- common catalog/standards;
- loyalty;
- electronic document exchange;
- automatic partner sales reporting;
- sales statistics used to calculate royalties.

The current help page states that the franchisor receives the franchisee sales report every time the partner closes a cash-register shift.

Sources:

- https://saby.ru/help/franchise/
- https://saby.ru/help/franchise/report

This is the exact source-of-truth path needed by a royalty auditor.

## 3. Restaurant/retail POS platforms already expose franchisee turnover centrally

### Poster

Current franchise product gives the franchisor:

- sales and purchase volume data;
- revenue/profit statistics;
- central CRM/POS;
- data explicitly useful for royalty calculation.

Source:

- https://joinposter.com/business/franchise

### Saby Presto

Current franchise product provides a single network view with sales/profit analytics by franchisee/location.

Source:

- https://saby.ru/presto/franchise

Once the franchisor owns the POS/accounting data path, the underreporting problem becomes much smaller than in a manual self-report model.

## 4. Russian franchise CRM products already calculate/control royalties

### Go-CRM

Current franchise solution supports:

- fixed royalties;
- percentage-of-turnover royalties;
- additional recurring payments;
- royalty payment tracking/reporting.

Source:

- https://go-crm.ru/kak-kontrolirovat-franshizu-s-go-crm.html

### Aspro.Cloud

Current franchise CRM explicitly positions `Прозрачное роялти`, turnover control and royalty payment monitoring as built-in franchise finance functionality.

Source:

- https://aspro.cloud/projects/crm-dlya-franshizy/

### Other local systems

Russian market also contains:

- FranchiseControl — financial control + franchise CRM;
- FРUK/franch.baze.pro — large franchise-management platform;
- WireCRM and custom franchise portals;
- 1C-based franchise accounting implementations.

Sources:

- https://franchisecontrol.ru/
- https://franch.baze.pro/
- https://wirecrm.com/crm/crm-dlya-franshizy

This is an established software category, not a missing workflow.

## 5. Why a standalone audit layer does not create moat

A pure auditor outside POS/CRM would need franchisees to provide sales data or credentials.

But incumbent franchise/POS products solve the problem structurally by centralizing the operational source-of-truth:

`franchisee closes POS shift -> franchisor receives actual sales -> royalty calculated/tracked`.

An independent product without POS control has weaker data trust.

If it adds POS/ERP integrations to gain reliable turnover, it becomes a franchise-management / multi-location POS integration product competing with Saby/Poster and existing franchise platforms.

## 6. Agreement-specific formulas are not enough to rescue it

Franchise networks can have:

- fixed fees;
- percentage of turnover;
- minimum royalty;
- marketing fees;
- different rates by location/agreement/version.

A configurable formula engine is useful but not structural moat. Existing CRM/franchise platforms can add versioned formulas more cheaply than a new entrant can recreate POS/franchise distribution.

## 7. Gates

`OWNER_VERIFIABILITY_GATE`: would pass.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass for continuous source-data reconciliation.

`DATA_TRUST_GATE`: moderate/high unless franchisee POS is centrally managed.

The rejection is direct local product ownership of the source-data and royalty workflow.

## 8. Final

`KILL__FRANCHISE_MANAGEMENT_AND_POS_PLATFORMS_ALREADY_OWN_SALES_TO_ROYALTY_WORKFLOW`

Do not reopen as:

- FranConnect royalty module for Russia;
- franchise sales underreporting detector;
- royalty calculator from POS;
- franchise royalty reconciliation SaaS;
- royalty collection dashboard;

without a genuinely new data/control advantage not already owned by Russian franchise/POS platforms.
