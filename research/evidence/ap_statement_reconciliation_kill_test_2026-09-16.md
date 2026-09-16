# Strategy B Kill Test — AP Vendor Statement / Reconciliation Automation for Russia

Дата: 2026-09-16

Итог:

`KILL__EXACT_RUSSIAN_AUTORECONCILIATION_PRODUCTS_ALREADY_EXIST`

## 1. Исходная гипотеза

Регулярный operational layer класса vendor-statement/AP reconciliation:

`supplier statement / акт сверки`
→ распознать PDF/Excel/scan/EDI
→ сопоставить с ERP invoices/payments/credits
→ найти missing documents / mismatches / overpayment / debt
→ показать причины
→ сформировать reconciliation response/protocol
→ подписать/отправить
→ track closure.

Это отличалось от ранее убитого AP Recovery Audit: не поиск старых аномалий общим AI, а постоянный period-close/reconciliation workflow.

## 2. Direct Russian exact competitor — Saby Autoreconciliation

Current product:

- https://saby.ru/edo/sverka
- https://saby.ru/help/edo/revise

Saby уже закрывает практически весь intended workflow.

Публично заявлены:

- распознавание актов сверки из PDF, Excel, скана, фото и XML/EDI;
- автоматическое определение контрагента/сумм/документов;
- подтягивание данных из Saby или 1С;
- автоматическое сопоставление операций по датам, суммам и номерам;
- выявление расхождений;
- объяснение, где и почему данные не сходятся;
- переход к исходным документам;
- автоформирование протокола расхождений;
- автоматическая подпись ЭП и отправка при отсутствии расхождений;
- лимиты для автоматического approval;
- массовые запросы/рассылки актов сверки;
- статусы и tracking ответов.

Current product page states 4.5M clients and 60M electronic documents/month across the Saby ecosystem.

This is not a generic OCR/accounting tool. It is the exact operational reconciliation workflow.

## 3. Kontur already owns another reconciliation layer

Current `Контур.Взаиморасчёты` module:

- reconciles mutual settlements;
- forms reconciliation act and discrepancy protocol;
- supports legally significant signing in Diadoc;
- works with 1C via integration module;
- provides web version for SAP / MS Dynamics / Oracle and other accounting systems.

Source:

- https://kontur.ru/akt-sverki?from=edi

Therefore the exact category is occupied by more than one major Russian accounting/EDI incumbent.

## 4. 1C already owns the native accounting primitive

1C:ERP / 1C:KA provide reconciliation documents and an electronic reconciliation assistant.

Current docs show:

- creation from Sales / Procurement / Treasury;
- automatic fill from accounting data;
- electronic reconciliation acts;
- EDI state tracking;
- result state such as reconciled / reconciled with discrepancies.

Sources:

- https://its.1c.ru/db/content/answers1c/src/%D0%BA%D0%B020/%D0%B1%D0%B0%D0%BD%D0%BA%20%D0%B8%20%D0%BA%D0%B0%D1%81%D1%81%D0%B0/%D0%BA%D0%B0_erp_20170605_%D0%BF%D0%B0%D1%80%D0%B0%D0%BA%D1%82%D1%81%D0%B2%D0%B5%D1%80.htm
- https://its.1c.ru/db/content/updinfo/src/arautomation20/2.5.11.79/index.htm

Saby/Kontur add the cross-party automation layer on top of that native ERP primitive.

## 5. Why feature slicing does not rescue it

Do not reopen as:

- AI reconciliation of supplier statements;
- PDF/Excel act matching;
- automatic discrepancy detection;
- supplier statement inbox;
- 1C reconciliation copilot;
- reconciliation protocol generator;
- mass supplier statement request workflow.

These functions are already explicitly productized by Russian incumbents with EDI distribution and installed accounting-base access.

A new entrant would need a structural workflow outside the current Saby/Kontur/1C data path, not merely better matching or AI explanations.

## 6. Gates

`OWNER_VERIFIABILITY_GATE`: would pass.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass for a persistent reconciliation workflow.

`DATA_TRUST_GATE`: moderate.

These do not matter after exact incumbent discovery.

## 7. Final

`KILL__EXACT_RUSSIAN_AUTORECONCILIATION_PRODUCTS_ALREADY_EXIST`
