# Strategy B Kill Test — Ocean Container Demurrage / Detention Audit & Recovery for Russia

Дата: 2026-09-16

Итог:

`KILL__RUSSIAN_TMS_ALREADY_OWNS_DEMURRAGE_CALCULATION__NO_STANDARDIZED_NEUTRAL_PORT_DATA_OR_FMC_LIKE_DISPUTE_RAIL`

## 1. Исходная гипотеза

Российский BlueCargo-like layer:

`container / B-L / carrier-line contract / free time / port-gate-empty-return events`
→ independently rebuild demurrage/detention/storage clock
→ compare with invoice
→ detect wrong free time / duplicate days / wrong rate / charge after return
→ assemble evidence
→ dispute/recover money.

Global category is mature. BlueCargo states 10,000+ logistics professionals, 230+ terminal/rail-ramp connections and large D&D savings/recoveries for major customers.

Sources:
- https://www.bluecargo.io/
- https://www.bluecargo.io/home-tests

The rejection is not absence of global demand or Russian monetary pain.

## 2. Russian monetary exposure is real

Recent Russian court materials show material container-use charges.

Example `А56-2486/2024`:

- disputed demurrage around `1,729,782 RUB`;
- separate detention around `19,902 USD`;
- dispute depended on B/L/free-time/tariff/event evidence.

Sources:
- https://base.garant.ru/66458011/
- https://base.garant.ru/41498722/

Other 2025–2026 cases show individual demurrage/storage invoices tied to specific container/free-time periods.

Example:
- https://sudact.ru/arbitral/doc/udghMngO25g8/

So the workflow can involve enough money to matter.

## 3. Fatal incumbent #1 — Logismart already owns the Russian container/TMS primitives

Current Logismart is a mature Russian logistics/forwarding/VED system.

Current public claims/capabilities include:

- 20+ years in market;
- 30,000 containers/month in system;
- container/vessel/voyage/order records;
- contractor/service rate cards;
- planned and actual expenses;
- invoices, acts and supporting documents by shipment/stage/counterparty;
- 1C/EDI/bank integrations;
- **preliminary automatic calculation of container costs including demurrage, storage and detention**;
- **automatic tariffing of local charges, downtime, demurrage, contract rates and currency conditions**;
- explicit positioning that it reduces demurrage/storage/detention costs.

Sources:
- https://www.logismart.ru/
- https://www.logismart.ru/about/

This means the expensive data/model layer already exists inside a direct Russian incumbent:

`container events + counterparty rate cards + contract conditions + expected D&D + actual invoices/documents`.

A new `invoice audit` module is a bounded extension of this existing financial/TMS record, not a new infrastructure category.

## 4. 1C/custom TMS also already treats D&D calculation as a normal logistics primitive

Current Russian 1C/TMS implementation materials explicitly model:

- container owner/line;
- free days;
- daily penalty rate;
- container location events;
- demurrage/detention penalty register;
- automatic calculation/warnings.

Example:
- https://confaster.ru/blog/multimodalnye-perevozki-1s-tms/

Real enterprise 1C:ERP projects also include automatic demurrage and storage-day calculation as part of transport logistics.

Example:
- https://sb-vnedr.ru/upload/presentation/%D0%92%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5-1%D0%A1-ERP-%D1%83-%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0-%D1%81%D1%8B%D1%80%D1%8C%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%BF%D0%B8%D1%89%D0%B5%D0%B2%D0%BE%D0%B9-%D0%BF%D1%80%D0%BE%D0%BC%D1%8B%D1%88%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D0%B8.pdf

Thus deterministic `what should the charge be?` is already commodity inside logistics software/custom implementations.

## 5. BlueCargo's strongest structural moat does not transfer cleanly

BlueCargo does more than parse invoices: it validates charges against neutral terminal/port events and the standardized U.S. FMC/OSRA billing/dispute framework.

Current U.S. rules require D&D invoices to contain specific elements such as:

- container availability date;
- port;
- free days;
- free-time start/end;
- applicable rate;
- total amount;
- compliance statements;
- dispute/mitigation contact/path.

Source:
- https://www.bluecargo.io/osra-faq

BlueCargo states connections to 230+ terminals/rail ramps, giving it an external evidence network that is difficult to reproduce.

No comparable current Russian neutral cross-line/cross-terminal event-data network and standardized dispute rail was established in bounded search.

## 6. Russian rules/data are fragmented by line, agent, terminal and contract

Russian logistics materials explicitly state that:

- free time varies by shipping line/agent and contract;
- start date can differ by terminal/port and operational document;
- demurrage, detention and terminal storage can be separate charges;
- the same calendar period may need to be checked for overlapping line/terminal charges;
- empty-return date and line-system registration date can differ;
- waiver/recalculation can depend on terminal/line fault and correspondence;
- the party that can formally negotiate with the line is often the booking customer/forwarder, not the ultimate importer.

Sources:
- https://tnlgroup.ru/blog/demeredzh-i-detenshen/
- https://mttkplus.ru/blog/demeredzh-detenshen-hranenie-konteynera/
- https://mttrus.ru/informatsiya/termini/

Therefore a national recovery platform would need to maintain many line/terminal/forwarder contract paths without owning their source-of-truth.

## 7. Broader freight-audit rescue is not valid

Broad freight invoice audit has already been rejected separately in Strategy B / related search logic.

A D&D-only niche looked more deterministic, but once normal TMS already computes the expected charge, the remaining value is dispute/recovery.

That remaining layer is precisely where Russian evidence/submission is fragmented and often passes through the forwarder/agent.

A new entrant would need to recreate or integrate:

- container milestone feeds;
- terminal/gate events;
- line tariff versions;
- private negotiated free-time terms;
- forwarder pass-through invoices;
- dispute channels;
- credit/recovery tracking.

Existing TMS/forwarders are structurally closer to those data and relationships.

## 8. Why feature slicing does not rescue it

Do not reopen as:

- BlueCargo for Russia;
- demurrage invoice checker;
- detention free-time calculator;
- duplicate storage/demurrage detector;
- container charge dispute assistant;
- demurrage recovery on success fee;

without a new cross-line/cross-terminal source-of-truth network or standardized dispute path that Russian TMS/forwarding incumbents do not already control.

## 9. Gates

`OWNER_VERIFIABILITY_GATE`: PASS for deterministic date/rate arithmetic.

`GENERAL_AI_SUBSTITUTION_GATE`: PASS only for persistent event/invoice runtime; PDF-only audit would be commodity.

`DATA_TRUST_GATE`: moderate.

The rejection is incumbent ownership of the expected-cost model plus lack of a structural neutral data/dispute rail.

## 10. Final

`KILL__RUSSIAN_TMS_ALREADY_OWNS_DEMURRAGE_CALCULATION__NO_STANDARDIZED_NEUTRAL_PORT_DATA_OR_FMC_LIKE_DISPUTE_RAIL`
