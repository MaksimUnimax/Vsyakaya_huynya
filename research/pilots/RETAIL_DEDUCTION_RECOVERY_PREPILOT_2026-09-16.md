# Retail Deduction Recovery — Pre-Pilot Protocol

Дата: 2026-09-16

Кандидат:

`research/candidates/B1_RETAIL_DEDUCTION_RECOVERY_RU.md`

Связанные evidence:

- `research/evidence/retail_deduction_recovery_deep_research_2026-09-16.md`
- `research/evidence/retail_deduction_recovery_incumbent_cross_retailer_addendum_2026-09-16.md`
- `research/evidence/retail_deduction_recovery_adversarial_litigation_corpus_2026-09-16.md`

Текущий этап:

`PREPILOT__HISTORICAL_DATA_VALIDATION_REQUIRED__NO_PRODUCT_BUILD`

## 0. Цель

Не строить SaaS и не доказывать идею интервью-словами.

Следующий gate должен ответить на один практический вопрос:

> На реальных данных российских поставщиков федеральных сетей существует ли достаточно большой и повторяемый пул **детерминированно проверяемых** штрафов/удержаний, чтобы отдельный revenue-recovery workflow окупался?

Pilot должен измерять RUB и трудозатраты, а не количество красивых findings.

## 1. Что НЕ требуется от первого участника

Не просить:

- полный доступ к 1С;
- VPN в корпоративную сеть;
- бухгалтерскую базу целиком;
- payroll/HR;
- персональные данные покупателей;
- банковские ключи;
- право отправлять претензии от имени поставщика;
- live API credentials в первом шаге.

Первый historical audit должен работать на **ограниченной выгрузке 3–6 месяцев**.

## 2. Минимальный ICP для pilot

Предпочтительный supplier:

- производитель или дистрибьютор продовольствия/FMCG;
- работает минимум с одной из X5 / Магнит / Лента;
- лучше — сразу с 2+ сетями;
- использует EDI и может выгрузить ORDERS/ORDRSP/DESADV/RECADV;
- имеет регулярные штрафы/удержания, а не 1 случай в год;
- способен показать отдельные penalty acts / set-off / reconciliation documents;
- имеет сотрудника, который сегодня вручную разбирает такие штрафы;
- готов дать договорные пункты только по выбранным типам штрафов, а не весь договорный архив.

Не начинать с гиганта с отдельным legal-tech отделом. Не начинать с микропоставщика, где за год 2 штрафа на 5 тыс. RUB.

## 3. Pilot phases

### Phase A — 10 suppliers discovery sample

Цель: быстро проверить наличие денег/данных.

По каждому:

- 3 месяца history;
- одна сеть first;
- все penalty/deduction documents за период;
- соответствующие EDI events;
- только релевантные contract rules.

Если у первых 10 suppliers почти нет material deterministic findings, кандидат KILL до расширения.

### Phase B — 20–30 suppliers validation sample

Запускать только если Phase A проходит economics gate.

Цель:

- распределение penalty volume;
- доля Tier A;
- RUB opportunity;
- разница по сетям/EDI providers;
- повторяемость rule classes;
- staff time;
- willingness-to-pay based on real findings.

## 4. Data contract — Supplier metadata

`SUPPLIER.csv`

Required:

- `supplier_sample_id` — pseudonymous id, no company name required initially;
- `retailer_code` — X5 / MAGNIT / LENTA / other;
- `edi_provider` — Kontur / Saby / Ediweb / Sfera / etc.;
- `period_from`;
- `period_to`;
- `timezone`;
- `food_supplier` boolean;
- `contract_rule_version_ids` list.

Optional:

- approximate annual retailer turnover band;
- number of delivery points;
- order-line volume band.

No INN/company name needed for first technical validation.

## 5. Data contract — ORDERS

`ORDERS.csv` or normalized JSON.

Required per order line/version:

- `retailer_order_id`;
- `order_version`;
- `created_at`;
- `requested_delivery_from`;
- `requested_delivery_to`;
- `delivery_location_id` / GLN if available;
- `sku_id` / GTIN or pseudonymous stable product id;
- `ordered_qty`;
- `unit`;
- `order_status`;
- `cancelled_at` if cancelled;
- `source_message_id`;
- `source_received_at`.

Preferred:

- `unit_price` / order-line value if penalty formula needs it;
- raw XML/EDI document or hash/reference.

Critical requirement: **all order versions**, not only the final ERP state. Otherwise `ORDER_VERSION_MISMATCH` cannot be tested.

## 6. Data contract — ORDRSP

`ORDRSP.csv`.

Required:

- `response_id`;
- `retailer_order_id`;
- `order_version` if source supports;
- `sent_at`;
- `retailer_received_at` if available;
- `response_status` — accepted / changed / rejected / partial;
- `sku_id`;
- `confirmed_qty`;
- `reason_code` / reason text if available;
- `source_message_id`.

Critical for 120-FZ/active-consent checks.

Do not infer positive consent from missing response.

## 7. Data contract — DESADV

`DESADV.csv`.

Required:

- `desadv_id`;
- `retailer_order_id`;
- `shipment_id`;
- `sent_at`;
- `dispatch_at` if available;
- `expected_arrival_at` if present;
- `sku_id`;
- `shipped_qty`;
- `unit`;
- `source_message_id`.

Optional:

- vehicle / delivery note id;
- warehouse/loading evidence references.

## 8. Data contract — RECADV

`RECADV.csv`.

Required:

- `recadv_id`;
- `retailer_order_id` and/or `shipment_id`;
- `received_at`;
- `sku_id`;
- `accepted_qty`;
- `rejected_qty` if available;
- `reason_code` / reason text if available;
- `source_message_id`.

Optional:

- receiving warehouse;
- acceptance act id;
- discrepancy act reference.

## 9. Data contract — Penalties / deductions

`PENALTIES.csv`.

Required:

- `penalty_id`;
- `penalty_doc_type`;
- `issued_at`;
- `retailer_reason_code` / title;
- `penalty_amount_rub`;
- `related_order_ids` if present;
- `related_shipment_ids` if present;
- `related_sku_ids` if present;
- `calculation_text_or_formula` if present;
- `appeal_deadline` if defined;
- `current_status`;
- `source_document_file` or stable reference/hash.

If the retailer document does not contain order ids, keep it anyway. One important test is whether deterministic linking is possible from dates/amounts/SKU/location.

## 10. Data contract — settlements / recovery outcomes

`OUTCOMES.csv`.

Required where known:

- `penalty_id`;
- `supplier_action` — accepted / rejected / appealed / ignored / legal;
- `action_at`;
- `final_status`;
- `original_amount_rub`;
- `recovered_or_cancelled_rub`;
- `recovery_date`;
- `manual_hours_estimate`;
- `external_legal_cost_rub` if known.

This table is essential. Without outcomes the pilot can find inconsistencies but cannot estimate historical precision/recovery value.

## 11. Data contract — Contract/rule register

Do NOT upload full contracts by default.

`RULES.yaml` should contain only rules needed for the chosen penalty classes.

Example shape:

```yaml
- rule_id: X5_SHORTAGE_2026_V3
  retailer: X5
  effective_from: 2026-03-01
  effective_to: null
  applies_to: food_supplier
  penalty_reason_family: shortage_non_delivery
  consent_basis: active_supplier_confirmation
  formula_type: percent_of_value
  percent: 10
  calculation_base: confirmed_but_not_accepted_value
  response_deadline_minutes: null
  legal_authority_refs:
    - 120-FZ
    - FAS_TN_65638_25
  human_review_before_external_action: true
```

Every rule must have:

- `rule_id`;
- effective dates;
- source (contract/addendum/law/network rule);
- deterministic formula/condition;
- exact data fields needed;
- whether external action always requires human/legal approval.

No LLM-created rule may become authoritative without human validation against source text.

## 12. Tier A deterministic checks — allowed

### A1. `120FZ_CONSENT_MISMATCH`

Only for covered food-supplier / retail-chain context and correct effective period.

Signal when:

- penalty is based on non-supply/shortage above agreed quantity;
- retailer ordered quantity `Q_ordered`;
- active supplier confirmation supports only `Q_confirmed`;
- penalty base uses quantity > `Q_confirmed`;
- or no active confirmation exists and retailer relies on silence/automatic acceptance.

Output: `HIGH_CONFIDENCE_COMPLIANCE_MISMATCH`, never `LEGAL_WIN_GUARANTEED`.

External objection remains human-approved.

### A2. `PENALTY_CALC_MISMATCH`

Configured formula is unambiguous but retailer arithmetic differs.

Examples:

- wrong percentage;
- wrong base quantity;
- wrong base value;
- wrong number of days;
- penalty exceeds configured cap.

### A3. `ORDER_VERSION_MISMATCH`

Penalty references:

- cancelled order;
- superseded version;
- original quantity after retailer reduced/cancelled it;
- wrong delivery date/version.

### A4. `SHIPMENT_ACCEPTANCE_MISMATCH`

Penalty allegation conflicts with source events.

Examples:

- penalty says shortage 20 but RECADV accepted full confirmed quantity;
- penalty says no delivery but DESADV + RECADV show shipment/acceptance;
- penalty quantity differs from accepted discrepancy.

### A5. `DUPLICATE_PENALTY`

Same deterministic breach/order/SKU/amount or overlapping period appears charged more than once when rules do not allow duplicate sanction.

Must be evidence-based, not fuzzy-text-only.

### A6. `DEADLINE_OR_PROCESS_RISK`

Not an invalidity verdict.

Signals:

- appeal/rejection deadline approaching;
- no evidence pack attached;
- response sent via wrong/non-authoritative channel where network rule is explicit;
- required order ids/documents absent.

### A7. `MISSING_SOURCE_EVIDENCE`

Retailer charge cannot be reconciled to the required order/shipment/acceptance trail.

Output:

`MISSING_EVIDENCE__HUMAN_CHECK_REQUIRED`.

Never auto-declare invalid solely because local export is incomplete.

## 13. Tier A.5 / escalation-only checks

### `KDP_RULE_MISMATCH`

Code of Good Practices / industry commission signals may identify unusual penalty levels or situations.

These are **not equivalent to statutory invalidity**.

Output only:

`ESCALATION_OPPORTUNITY__NON_BINDING_INDUSTRY_RULE`.

Never include in guaranteed recoverable RUB.

## 14. Tier B — prohibited automatic decisions

Always `NEEDS_HUMAN_LEGAL_REVIEW`:

- Article 333 Civil Code proportionality;
- quality/organoleptic claims;
- product damage causation;
- force majeure;
- carrier fault allocation;
- retailer/supplier good faith;
- ambiguous contract interpretation;
- actual damages;
- oral/side agreements;
- whether court will reduce a penalty;
- expert technical/food-quality disputes.

System may organize evidence, but not adjudicate.

## 15. Required output per penalty

Every result must be reproducible.

Example record:

```json
{
  "penalty_id": "P-18431",
  "classification": "ORDER_VERSION_MISMATCH",
  "confidence": "HIGH",
  "penalty_amount_rub": 183400,
  "potentially_disputed_rub": 183400,
  "automatic_recoverable_rub": null,
  "source_events": [
    "ORDERS:O123:v1",
    "ORDERS:O123:v2:CANCELLED",
    "PENALTY:P-18431"
  ],
  "rule_id": "X5_SHORTAGE_2026_V3",
  "explanation": "Penalty references superseded order quantity from v1 after v2 reduced/cancelled it.",
  "next_action": "HUMAN_REVIEW_AND_OBJECTION_DRAFT"
}
```

Critical distinction:

- `potentially_disputed_rub` may be quantified;
- `automatic_recoverable_rub` stays null in V0.

## 16. Historical ground-truth review

For each historical penalty, compare system result against:

- what supplier actually did;
- whether dispute was filed;
- final outcome;
- amount recovered/cancelled;
- legal/human explanation if the system disagrees.

Create confusion matrix only for Tier A decisions:

- true deterministic inconsistency;
- false positive;
- missed inconsistency;
- human-only case correctly abstained.

Abstention on ambiguous cases is a **success**, not a failure.

## 17. Core pilot metrics

Per supplier and overall:

- total penalty RUB;
- penalty RUB / retailer sales RUB;
- number of penalty documents;
- percentage of penalty RUB classifiable Tier A;
- Tier A potentially disputed RUB;
- historically recovered RUB;
- new previously-unnoticed deterministic mismatch RUB;
- false-positive RUB;
- manual hours/month today;
- manual hours required after assisted workflow;
- penalties missed because deadline expired;
- evidence retrieval time per case;
- proportion requiring Tier B legal review.

Do not optimize for number of findings.

## 18. Kill thresholds — Phase A

These are owner decision thresholds for whether to spend further effort. They are intentionally strict and should be revised only with evidence, not enthusiasm.

After first 10 suppliers:

### KILL if all/most of the following hold

- annualized penalty burden is economically trivial for the ICP;
- Tier A covers less than ~10% of penalty RUB **and** no single repeatable Tier A family creates material value;
- objectively inconsistent Tier A amount is less than ~0.05% of retailer turnover for almost every supplier;
- >70% of value depends on Article 333 / quality / causation / legal interpretation;
- necessary source events cannot be exported reliably from common EDI providers;
- linking penalties to orders requires bespoke manual investigation for most cases;
- suppliers already recover nearly all Tier A discrepancies with negligible effort;
- customers would only pay a tiny success fee insufficient to support integrations/support.

Thresholds are hypotheses, not market facts. Record actual distribution and revisit once, transparently.

## 19. Continue thresholds — Phase A

Proceed to 20–30 suppliers only if multiple independent suppliers show at least one of:

- recurring Tier A deterministic mismatch with material RUB value;
- meaningful staff time spent manually assembling EDI proof;
- repeated missed deadlines/ignored small deductions whose aggregate is material;
- 120-FZ/order-consent mismatch appearing in current 2026 workflow;
- clear cross-retailer reuse of the same evidence engine;
- willingness to pay tied to measured recovered/avoided RUB rather than vague feature interest.

No single giant court-like case is enough.

## 20. Pre-pilot commercial test

Do not ask:

`Купили бы вы такой сервис?`

Ask after showing historical audit results:

1. `Из этих X RUB сколько вы бы реально оспаривали?`
2. `Сколько часов/людей сегодня стоит такой разбор?`
3. `Какие суммы вы сейчас списываете, потому что невыгодно разбираться?`
4. `Кто владеет бюджетом/решением: коммерция, finance, EDI, legal, KAM?`
5. `Что для вас приемлемее: fixed annual fee, per-network fee, pilot fee, base+success?`
6. `Разрешили бы read-only EDI integration после успешного export-based pilot?`

Do not set final pricing before at least 10 evidence-backed conversations.

## 21. Security / trust model for pilot

Default:

- pseudonymous supplier id;
- no consumer PII;
- no full 1C database;
- only selected EDI messages/penalty docs;
- local preprocessing option;
- encrypted files;
- explicit deletion after agreed pilot window;
- raw documents separate from derived normalized tables;
- deterministic audit log for every transformation.

If participant cannot share even bounded historical exports, note access friction as negative market evidence rather than trying to bypass it.

## 22. Definition of a successful pre-pilot

Pre-pilot succeeds only if we can produce, from bounded exports:

1. deterministic normalized timeline for each penalty;
2. auditable Tier A classification with source references;
3. measurable potentially disputed RUB;
4. low false-positive rate on historical outcomes;
5. clear manual-time reduction;
6. at least several independent suppliers with recurring value;
7. evidence that a customer would pay for the operational workflow.

Anything less remains research, not GO.

## 23. Current action after this protocol

Next evidence work:

1. build public ICP/prospect corpus;
2. identify 10 first-pilot profiles, not necessarily named outreach yet;
3. map likely EDI provider/network combinations;
4. prepare sample CSV/YAML fixtures and deterministic expected outputs;
5. only then seek real supplier exports/interviews.

No product implementation before historical-data gate.
