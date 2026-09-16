# Retail Deduction Recovery — Incumbent / Cross-Retailer Addendum

Дата: 2026-09-16

Основной deep research:

`research/evidence/retail_deduction_recovery_deep_research_2026-09-16.md`

Текущий статус после addendum:

`SURVIVES_DEEP_PASS__DIRECT_RECOVERY_GAP_STILL_OPEN__CROSS_RETAILER_EVIDENCE_MODEL_CONFIRMED__SUPPLIER_DATA_WTP_AND_WRITE_PATH_REMAIN_HARD_GATES`

Это **не GO**.

## 1. Цель второго pass

Проверить два риска:

1. не скрывается ли SupplyPike-like recovery functionality внутри российских EDI incumbents под словами «штрафы / автоматизация штрафов»;
2. является ли кандидат X5-only workflow или evidence model переносится на другие федеральные сети.

## 2. Ediweb «Автоматизация штрафов» — не recovery engine

Ediweb действительно имеет проект X5 с названием:

`Автоматизация штрафов по упрощенной приёмке для категории ФРОВ`.

Источник:

- https://ediweb.com/ru-ru/support/kb/1439

Но фактический публичный workflow следующий:

- X5 формирует и присылает поставщику PDF `Акт о выявленных недостатках` / `Акт о штрафе`;
- Ediweb показывает документ в CorePlat;
- поставщик вручную открывает акт;
- поставщик выбирает `Подписать` или `Отклонить`;
- при отклонении поставщик сам вводит причину;
- status документа меняется и отправляется в X5;
- отдельно приходят акты взаимозачёта / счета.

Это автоматизация **доставки и обработки retailer-generated penalty documents**.

В публичном workflow не заявлены:

- automatic validity test against ORDERS/ORDRSP/DESADV/RECADV;
- matching penalty lines to supplier consent/actual shipment/acceptance evidence;
- automatic search for recoverable RUB;
- proof-package generation from multiple source events;
- dispute prioritization by expected recovery;
- recovered-money ledger;
- cross-retailer rule engine;
- root-cause analysis based on won/lost dispute outcomes.

Следовательно, термин `Автоматизация штрафов` не является direct SupplyPike competitor by itself.

## 3. Ediweb X5 penalty transport is still valuable infrastructure

Current X5 knowledge base confirms Ediweb handles a rich document contour:

- ORDERS;
- ORDRSP;
- DESADV;
- RECADV;
- bonus/fine acts and invoices;
- quality fines;
- reconciliation acts;
- mutual set-off acts;
- contract documents;
- transport request/confirmation;
- ETRN.

Source:

- https://ediweb.com/ru-ru/support/kb/536

This increases incumbent-copy risk because Ediweb already owns the source data and write UI.

But it also proves that the evidence needed by the candidate exists in one machine-readable/document platform.

## 4. Saby EDI — prevention, not post-deduction recovery

Current Saby materials show a strong preventive feature:

- every outbound document can be checked against rules of a specific retail network;
- Saby calls this format-logical / special checking;
- the purpose is to prevent document mistakes, supply disruption and penalties.

Current case with supplier «Наше дело»:

- works with X5, Magnit, Lenta and other retailers;
- 250k+ EDI documents/year;
- Saby automatically validates documents against retailer-specific requirements before sending.

Source:

- https://saby.ru/articles/edi/client/nashe_delo

This is a strong adjacent incumbent, but the KPI is:

`prevent invalid EDI / supply error before penalty`.

The proposed recovery product KPI is:

`penalty already charged/withheld -> determine objective invalidity -> assemble proof -> object -> measure RUB returned`.

No current public Saby material was established that closes that full recovery workflow.

## 5. Kontur.EDI — standard evidence chain is portable across networks

Kontur documents the standard retail EDI chain:

`ORDERS -> ORDRSP -> DESADV -> RECADV -> financial/closing documents`.

Source:

- https://kontur.ru/edi/spravka/38078-cepochka_soobshhenij_edi

Important semantics:

- ORDERS records requested quantity/date;
- ORDRSP lets supplier confirm full/partial quantity or refuse/change;
- DESADV records actual shipment;
- RECADV records actually accepted quantity and reasons for nonacceptance;
- provider records event time/status and can supply evidence in disputes.

This is the canonical evidence model needed for deterministic deduction checks.

## 6. Magnit — the same core event model exists

Current Kontur page for Magnit documents:

- PRICAT;
- ORDERS;
- ORDRSP;
- DESADV;
- downstream accounting documents.

Source:

- https://kontur.ru/edi/clients/magnit

Current Saby page for Magnit suppliers explicitly lists:

- ORDERS;
- ORDRSP;
- DESADV;
- RECADV;
- PRICAT;
- RETORD;
- UПД/УКД/ИУПД;
- act for calculating premiums.

Source:

- https://saby.ru/help/edi/clients/network/tander

Official Magnit EDI FAQ also describes ORDRSP as supplier information about how fully the received order can be executed.

Source:

- https://edi.magnit-info.ru/question/

Therefore `retailer order -> supplier consent -> shipment -> acceptance` is not X5-specific.

## 7. Lenta — same evidence path plus current material disputes

### EDI chain

Lenta works through EDI providers and documents ORDERS/DESADV/RECADV/UПД workflows.

Current supplier page:

- https://lenta.com/i/postavshchikam/edo-edi/commerce/edi/

Ediweb documentation states Lenta ORDERS can be:

- original;
- modified by retailer;
- deleted/cancelled by retailer.

Source:

- https://ediweb.com/ru-ru/support/kb/114

That creates exactly the kind of versioned order evidence required for a recovery engine.

### Current 2026 money evidence

Appeal case dated 31.07.2026 `A56-99122/2025`:

- Lenta set off penalties totaling `59,259,430.57 RUB`;
- supplier accepted only `5,728,141.50 RUB`;
- supplier disputed `48,930,526.17 RUB` of execution-level penalties and demanded refund of excessive withholding.

Source:

- https://base.garant.ru/66961853/

This is strong evidence that post-deduction recovery is not unique to X5 and can involve material RUB amounts.

Another 2026 Lenta case confirms contract-defined penalty notifications and premium/penalty calculations are formal recurring documents.

Source:

- https://base.garant.ru/66845824/

## 8. 120-FZ deterministic wedge is retailer-general for covered food supply relationships

The 2025-2026 legal change restricting penalties for quantities above genuinely agreed quantity is not an X5-specific policy.

It applies through the federal retail-trade legal framework to covered food-supplier / retail-chain relationships.

Therefore the initial deterministic rule family can potentially audit analogous order-consent penalties across multiple chains, subject to exact contract/process validation.

This materially improves the initial wedge:

`2026 audit of shortage/non-delivery penalties for supplier active-consent mismatch`

can be cross-retailer rather than tied to one retailer UI.

## 9. Incumbent conclusion

After this pass:

### Direct exact recovery competitor

Still **not established** in bounded public search.

### Strong adjacent incumbents

Very real:

- Ediweb — penalty documents + reject UI + source events;
- Saby — retailer-specific preventive validation + broad supplier distribution;
- Kontur — EDI evidence chain + integrations + huge retail footprint.

They can potentially add recovery functionality.

### Structural independent wedge that still survives

`cross-retailer + cross-EDI + retailer rule/version history + proof mapping + dispute outcome history + recovered-money ledger`.

An EDI provider naturally sees only the traffic/data available through its own customer connection and optimizes EDI transport/prevention.

A neutral supplier-side recovery layer could aggregate:

- multiple retailers;
- multiple EDI providers;
- ERP exports;
- contract rule versions;
- actual won/lost recovery outcomes.

This is not proven moat yet, but it is more structural than a simple UI feature.

## 10. Revised status

The candidate remains stronger after the incumbent/cross-retailer pass:

`SURVIVES_DEEP_PASS__DIRECT_RECOVERY_GAP_STILL_OPEN__CROSS_RETAILER_EVIDENCE_MODEL_CONFIRMED__SUPPLIER_DATA_WTP_AND_WRITE_PATH_REMAIN_HARD_GATES`

No implementation.

Remaining mandatory gates:

1. real anonymized supplier datasets;
2. objective-invalid RUB rate;
3. current EDI write/reject API support;
4. private/unindexed recovery functionality of EDI incumbents;
5. willingness-to-pay from actual recovered RUB;
6. proof that cross-retailer rule maintenance is economically manageable.
