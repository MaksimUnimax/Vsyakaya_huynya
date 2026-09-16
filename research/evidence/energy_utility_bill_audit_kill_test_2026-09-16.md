# Strategy B Kill Test — Energy / Utility Bill Audit & Recovery for Russian Businesses

Дата: 2026-09-16

Итог:

`KILL__DIRECT_RUSSIAN_ENERGY_BILL_AUDIT_AND_TARIFF_OPTIMIZATION_SOFTWARE_EXISTS`

## 1. Исходная гипотеза

Российский EnergyCAP-like layer для предприятий и multi-site бизнеса:

`счета за электроэнергию + договор + почасовое потребление/АСКУЭ`
→ независимо пересчитать объем/мощность/передачу/ценовую категорию/коэффициенты
→ найти ошибочное начисление или невыгодную схему
→ рассчитать альтернативу
→ сформировать evidence / претензию / переход на более выгодную категорию
→ измерить refund/savings.

Global category is mature; utility bill audit and energy-management products have a long commercial history.

The workflow is attractive for Strategy B because the result is measurable in RUB and much of the arithmetic is reproducible.

## 2. Direct Russian software — яЭнергетик

Current product:

- https://yaenergetik.ru/
- https://yaenergetik.ru/priceranges/
- https://yaenergetik.ru/price/
- https://yaenergetik.ru/blog/proverka-schetov-ot-energosbyta/
- https://yaenergetik.ru/blog/tarifnaya-analitika-po-elektroenergii-na-sajte-yaenergetikrf/

`яЭнергетик` is not merely meter-reading/ASKUE software.

Current public functionality includes:

- collection of interval/hourly meter data;
- monthly tariff data for guarantee suppliers across Russia;
- electricity-cost calculation by current contract/tariff parameters;
- comparison across allowed price categories;
- identification of the cheapest price category;
- calculation of savings/overpayment versus alternatives;
- purchase/transmission power calculations;
- reports for reconciliation with energy-supplier invoices;
- peak-hour cost analysis;
- enterprise API;
- historical monitoring of obtained savings.

The product explicitly documents `Проверка счетов-фактур от энергокомпаний`:

1. compare billed energy/power/tariff components against independently calculated values;
2. if material mismatch exists, run detailed object-level calculation;
3. export detailed report;
4. use the report to prepare disagreement/claim to the energy-supply company.

This is already the core bill-audit/recovery workflow.

## 3. Current pricing and market maturity are real

Current enterprise tariffs are public and include tariff-analysis functionality.

The product states:

- 600+ clients in 34 Russian regions;
- 35,000+ three-phase meters polled daily;
- 530M RUB saved for customers over three years.

These are vendor-reported figures, not an independent savings benchmark, but they demonstrate that the category is already productized and distributed.

Source:

- https://yaenergetik.ru/

## 4. Direct recovery proof already exists locally

A current 2026 `яЭнергетик` case describes a business that received an electricity bill far above normal consumption.

The company installed duplicate/control metering and used system reports to prove that the commercial meter used for settlement was faulty.

Result reported by the vendor:

- network company acknowledged meter fault;
- meter was replaced;
- supplier recalculated previous billing periods;
- company recovered approximately `5 million RUB` difference;
- tariff analytics was then kept for continuous invoice control.

Source:

- https://yaenergetik.ru/blog/realnyi_keis_vozvrat_5_mln_rub/

This proves the exact `independent measurement/calculation -> dispute -> recalculation -> recovered money` mechanic is already executed by an incumbent.

## 5. Second direct Russian software — РЭП-ЭНЕРГОУЧЁТ

Current product:

- https://www.ntp-rep.ru/rep-energo
- https://ntp-rep.ru/article-price-reduction

`РЭП-ЭНЕРГОУЧЁТ` explicitly provides:

- comparative calculation of electricity price/cost for alternative purchase methods;
- checking correctness of electricity prices and amounts billed by the supplier;
- optimal price-category selection;
- efficiency analysis of current supply terms versus optimal alternatives;
- calculation of economic loss/reserve for savings;
- monthly monitoring of purchase prices and economic-loss reserve;
- interval/hourly energy accounting;
- Excel/80020 import/export;
- multi-energy-resource accounting (electricity, heat, gas, water, wastewater).

Its own methodology explicitly says the software is used to:

- verify supplier price/cost calculations to exclude provider errors;
- recalculate all available price categories monthly;
- determine realized savings/losses;
- repeat the optimization/control cycle every regulatory period.

This is another exact product-level incumbent, not consulting-only evidence.

## 6. Service substitutes further reduce the gap

Even outside software vendors, current Russian energy-service companies explicitly sell:

- bill verification;
- tariff-category modeling;
- interval-load analysis;
- dispute/recalculation support;
- transition to lower-cost supply models.

Examples:

- https://energo365.ru/services/proverka-schetov-za-elektroenergiyu/
- https://time2save.ru/vnedrenie-askue-na-predpriyatii
- https://allmonitoring.ru/realizuyemyye-proyekty/vse-zatraty-na-askue-okupilis-teboil-za-polgoda-za-schyot-snizheniya

This shows the buyer pain is real, but also that software + service distribution already exists.

## 7. Native supplier calculators do not rescue the idea either

Guarantee suppliers themselves publish business electricity calculators comparing price categories and cost components.

Example:

- https://tatenergosbyt.ru/b2b/payment/calculate/

These are not neutral audit platforms, but they further commoditize simple tariff comparison.

## 8. Why narrowing does not rescue it

Do not reopen as:

- EnergyCAP for Russia;
- automatic electricity invoice checker;
- price-category optimizer;
- tariff analyzer for legal entities;
- independent power-component recalculation;
- ASKUE + bill verification;
- energy bill dispute evidence generator;
- multi-site electricity-cost optimization.

The intended core features are already directly offered by `яЭнергетик` and `РЭП-ЭНЕРГОУЧЁТ`.

Do not rescue by saying `only heat/water/gas`: РЭП already handles multiple energy resources, while multi-resource energy-management/utility allocation products also exist.

A new candidate would require a structurally different transaction/data advantage rather than prettier invoice parsing or AI explanation.

## 9. Gates

`OWNER_VERIFIABILITY_GATE`: would pass for arithmetic/meter discrepancies.

`GENERAL_AI_SUBSTITUTION_GATE`: would pass for continuous independent calculation.

`DATA_TRUST_GATE`: acceptable/moderate.

The rejection is direct mature local competition, not technical fit.

## 10. Final

`KILL__DIRECT_RUSSIAN_ENERGY_BILL_AUDIT_AND_TARIFF_OPTIMIZATION_SOFTWARE_EXISTS`
