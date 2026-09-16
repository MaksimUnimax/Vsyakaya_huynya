# B1 — Retail Deduction / Penalty Recovery for Russian Suppliers

Дата: 2026-09-16

Статус: `SURVIVES_DEEP_RESEARCH__PREPILOT_HISTORICAL_DATA_REQUIRED__NO_IMPLEMENTATION`

## Коротко

Российский supplier-side revenue-recovery layer класса SupplyPike / SPS Revenue Recovery для поставщиков федеральных торговых сетей:

`штраф / deduction / недоплата / взаимозачёт`
→ связать с исходной EDI-цепочкой
→ выполнить только детерминированные проверки
→ показать доказательства и расчёт
→ собрать objection/evidence package
→ human-confirmed action
→ track recovered/cancelled RUB
→ root-cause prevention.

Это **не AI-юрист** и не система, которая объявляет любой штраф сети незаконным.

## Что уже доказано

### 1. Global demand/category — PASS

SupplyPike / SPS Revenue Recovery подтверждает зрелую отдельную категорию supplier deduction recovery для крупных ритейлеров.

Публичная механика включает:

- deduction ingestion;
- validity checks;
- proof collection;
- retailer-specific dispute workflows;
- recovery tracking;
- root-cause analysis.

Sources:

- https://www.supplypike.com/
- https://www.spscommerce.com/products/revenue-recovery/

Vendor-reported US recovery figures не переносятся на российский рынок как benchmark.

### 2. Russian money/problem — PASS

Российские судебные и отраслевые материалы подтверждают material штрафы/удержания поставщиков сетей, включая многомиллионные споры X5/Агроторга, Ленты и Тандера.

Это доказывает, что problem class не является мелкой бухгалтерской рутиной.

Основные evidence:

- `research/evidence/retail_deduction_recovery_deep_research_2026-09-16.md`
- `research/evidence/retail_deduction_recovery_adversarial_litigation_corpus_2026-09-16.md`

### 3. Deterministic source trail — PASS

Для ключевых российских сетей используется стандартная EDI-цепочка:

`ORDERS -> ORDRSP -> DESADV -> RECADV`.

Она позволяет независимо восстановить:

- что сеть заказала;
- что supplier активно подтвердил/изменил;
- что фактически отгрузил;
- что сеть фактически приняла;
- какие версии заказа действовали;
- timestamps и quantities.

Эти события уже используются как доказательства в спорах.

### 4. 120-FZ creates a current deterministic acquisition wedge — PASS WITH BOUNDS

Федеральный закон N 120-ФЗ и разъяснение ФАС 2025 усилили requirement active supplier consent для ответственности за непоставленное количество в covered food-supply relationships.

Молчание/бездействие поставщика не должно трактоваться как согласование количества.

Это создаёт machine-checkable family:

`retailer requested Q -> supplier actively confirmed Q2 -> fine calculated on >Q2`.

Но это не постоянный moat: сети/EDI providers будут адаптировать процессы.

Использовать как acquisition/audit wedge, а не как весь продукт.

### 5. Cross-retailer portability — PASS

X5, Magnit and Lenta have sufficiently similar order-response-shipment-acceptance evidence structure for one common evidence engine.

Retailer-specific rulebooks still require versioning.

Evidence:

- `research/evidence/retail_deduction_recovery_incumbent_cross_retailer_addendum_2026-09-16.md`

### 6. Direct Russian SupplyPike analog — NOT FOUND IN BOUNDED ADVERSARIAL SEARCH

Current public Russian products found:

- Ediweb — penalty document delivery/sign/reject workflow;
- Saby — retailer-specific preventive EDI validation;
- Kontur.EDI — EDI transport/evidence/reconciliation primitives;
- 1C/integrators — accounting/order reconciliation;
- lawyers/consultants — manual dispute/recovery.

No public exact product was established with:

`cross-retailer penalties -> objective validity engine -> evidence retrieval -> dispute workflow -> recovered-RUB ledger -> root-cause prevention`.

Absence claim is bounded, not absolute. Hidden/private incumbent functionality remains a hard gate.

## Critical adversarial result — broad AI/legal recovery thesis rejected

Court corpus showed that large recovered amounts often depend on:

- Article 333 proportionality;
- product quality;
- causation/fault;
- force majeure;
- contract interpretation;
- actual damages;
- procedural/legal arguments.

Those are **not** owner-verifiable deterministic decisions.

Therefore product survives only as strict Tier A deterministic recovery audit.

## Tier A — allowed deterministic classes

1. `120FZ_CONSENT_MISMATCH`
2. `PENALTY_CALC_MISMATCH`
3. `ORDER_VERSION_MISMATCH`
4. `SHIPMENT_ACCEPTANCE_MISMATCH`
5. `DUPLICATE_PENALTY`
6. `DEADLINE_OR_PROCESS_RISK`
7. `MISSING_SOURCE_EVIDENCE`

Escalation-only:

- `KDP_RULE_MISMATCH` / non-binding industry-practice signal.

System output must be evidence-first and reproducible from source events/rules.

## Tier B — human/legal only

Never auto-adjudicate:

- Article 333 proportionality;
- quality/organoleptic disputes;
- damage causation;
- force majeure;
- carrier fault allocation;
- ambiguous contract clauses;
- good-faith/fairness arguments;
- actual damages;
- oral/side agreements.

Allowed output:

`NEEDS_HUMAN_LEGAL_REVIEW` or `LEGAL_REVIEW_OPPORTUNITY`.

## OWNER_VERIFIABILITY_GATE — PASS FOR TIER A

Owner can inspect:

- original order versions;
- ORDRSP;
- DESADV;
- RECADV;
- penalty document;
- timestamps;
- configured formula/rule;
- system calculation.

Ambiguous data must cause abstention, not confident classification.

## GENERAL_AI_SUBSTITUTION_GATE — PASS

Generic LLM can draft one objection after documents are manually supplied.

It does not replace:

- continuous penalty ingestion;
- EDI event reconciliation;
- versioned retailer rules;
- deadlines;
- evidence retrieval;
- recovered-money ledger;
- recurring root-cause analytics.

AI-generated legal opinion is explicitly not the product.

## DATA_TRUST_GATE — PASS WITH BOUNDS

Historical pilot requires only bounded exports:

- selected EDI messages;
- penalty documents;
- selected contract rules;
- historical outcomes.

No full 1C database, payroll, consumer PII or bank access required.

Preferred first stage is export-based, pseudonymous and read-only.

## Write/submission path — PARTIAL / OPEN

Electronic reject of X5 penalty documents exists in EDI provider UI.

But current public API evidence does not prove a supported external API action for every fine-reject/appeal workflow.

Therefore V0 architecture is:

`detect -> validate -> evidence -> draft reason -> human confirmation -> supported UI/deep-link/action`.

Do not assume autonomous submission in economics or architecture until EDI providers confirm it.

## Current public buyer universe

Thousands of suppliers work with X5/Magnit/Lenta; this is only an underlying buyer pool, not TAM.

A public ICP corpus with current supplier examples is saved in:

`research/pilots/RETAIL_DEDUCTION_RECOVERY_PUBLIC_ICP_CORPUS_2026-09-16.md`

First experimental profiles include mid-sized food/FMCG suppliers working with multiple federal chains plus one non-food control group.

## Current pre-pilot protocol

Canonical historical-data gate:

`research/pilots/RETAIL_DEDUCTION_RECOVERY_PREPILOT_2026-09-16.md`

Discovery script + synthetic acceptance fixtures:

`research/pilots/RETAIL_DEDUCTION_RECOVERY_DISCOVERY_AND_FIXTURES_2026-09-16.md`

No product build before this gate.

## Next mandatory evidence

### Phase A — first 10 qualified suppliers

For one network each:

- 3 months;
- all penalty/deduction docs;
- ORDERS all versions;
- ORDRSP;
- DESADV;
- RECADV;
- historical outcome where known;
- only the relevant contract/rule clauses.

Measure:

- total penalty RUB;
- Tier A share of penalty RUB;
- objectively inconsistent RUB;
- false-positive RUB;
- staff hours;
- missed deadlines;
- historical recovered RUB;
- sample access friction.

### Expand to 20–30 only if Phase A passes

Do not infer TAM/recovery rate from court cases.

## Hard kill gates still open

### K1 — Real recoverable economics

KILL/downgrade if real supplier data shows:

- trivial annual penalty burden;
- very small Tier A share;
- almost all money is legal/quality/Article-333 Tier B;
- objectively inconsistent RUB is too small to support software/support costs.

### K2 — Access friction

KILL/HOLD if ordinary suppliers cannot provide bounded EDI exports without full custom integration or refuse even pseudonymous historical samples.

### K3 — WTP

KILL/HOLD if measured deterministic value exists but customers will not pay enough for persistent workflow.

WTP must be tested **after** showing actual historical findings.

### K4 — Hidden incumbent functionality

KILL/downgrade if Kontur/Ediweb/Saby or another installed provider already offers comparable invalid-penalty detection + evidence + recovery privately at scale.

### K5 — Rule maintenance economics

KILL if every customer/network requires bespoke legal/integration project and reusable deterministic rule coverage remains low.

## Current decision

The candidate has survived:

- global-category test;
- Russian pain/money test;
- direct-competitor sweep;
- incumbent deep sweep;
- cross-retailer evidence check;
- adversarial litigation corpus;
- owner-verifiability/AI/data-trust gates for bounded Tier A.

It has **not** passed real customer economics/access/WTP.

Therefore current status is:

`SURVIVES_DEEP_RESEARCH__PREPILOT_HISTORICAL_DATA_REQUIRED__NO_IMPLEMENTATION`

Do not write product code, build integrations or claim GO before historical pre-pilot evidence.
