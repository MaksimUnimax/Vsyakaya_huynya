# R1 — Expanded ERVK card field evidence

Execution date: 2026-09-15.
Environment: owner's local Opera browser via Opera Browser Connector; ordinary anonymous public browsing.

## Expanded-card result

The first visible ERVK record (`У003/001407077`, display name `Магазин "SNAX"`) was expanded manually in the public UI.

The expanded state publicly exposed additional controlled-person fields that were not visible in the collapsed list card:

- entity/person class (`Индивидуальные предприниматели`);
- full name / controlled person name;
- OGRNIP (for this record);
- INN.

The already-visible list-card fields remained available:

- notification number;
- displayed date (`От 15.09.2026`);
- display/business/location name;
- activity class;
- works/services;
- OKVED codes;
- subject of the Russian Federation;
- physical activity address;
- control authority.

## Fields NOT observed in the expanded state

The following were not visible in the expanded accessibility tree for this record:

- declared future activity-start date;
- exact submission timestamp;
- phone;
- email;
- status/history of changes;
- termination date;
- revision history.

Absence from this one expanded UI state is not proof those fields do not exist elsewhere in the application or underlying public responses. Their public availability remains `UNKNOWN` pending further evidence.

## Commercial implication

Positive:
- public ERVK records can be joined to external business data using INN and OGRN/OGRNIP;
- the same record also carries the physical activity address, enabling point-level enrichment and deduplication.

Critical unresolved gate:
- `declared_start_date` is still not available from the observed UI, so declared lead-time cannot yet be computed from the public interface alone.

## Exact observed sample values

For privacy-minimization in the research journal, exact personal identifiers are not repeated here beyond proving the field exists. The live UI exposed a full individual-entrepreneur name plus OGRNIP and INN for record `У003/001407077`.
