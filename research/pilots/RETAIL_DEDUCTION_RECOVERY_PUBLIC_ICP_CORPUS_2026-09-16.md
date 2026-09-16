# Retail Deduction Recovery — Public ICP / Prospect Corpus

Дата: 2026-09-16

Связанный protocol:

`research/pilots/RETAIL_DEDUCTION_RECOVERY_PREPILOT_2026-09-16.md`

Назначение: не sales-list и не утверждение, что перечисленные компании имеют проблемные штрафы. Это **публично подтверждённый buyer-universe corpus** для проверки того, какие supplier profiles реально работают одновременно с крупными федеральными сетями и потенциально имеют EDI/order/penalty workflow.

Статус:

`PUBLIC_EVIDENCE_ONLY__NO_CONTACT_OR_PRIVATE_DATA_VALIDATION_YET`

## 0. Правила отбора

Включать компанию, если публичный источник подтверждает хотя бы одно:

- поставки в X5 / Пятёрочку / Перекрёсток;
- поставки в Магнит;
- поставки в Ленту;
- регулярную работу сразу с несколькими федеральными сетями;
- масштаб, при котором repeated EDI volume правдоподобен.

Приоритет для pilot:

- food/FMCG;
- 2+ федеральные сети;
- частые поставки;
- не микробизнес;
- не сверхкрупный холдинг, где вероятен тяжёлый procurement/infosec cycle;
- доступен публичный коммерческий/общий контакт.

Публичное присутствие в сети **не означает** наличие штрафов, recoverable deductions или willingness-to-pay.

## 1. ООО «Семилукский пищекомбинат» / «Сытная трапеза»

Public evidence:

- производитель пищевой продукции с 1997 года;
- заявляет поставки в `Лента`, `Перекрёсток`, `Пятёрочка`, `Магнит`, O'КЕЙ, Ашан и другие сети.

Source:

- https://www.s-trapeza.ru/about-company

Pilot fit: `HIGH`.

Почему:

- food supplier;
- сразу X5 + Magnit + Lenta;
- многолетний производитель;
- достаточно широкий retail footprint;
- вероятно много повторяющихся поставок.

Что проверить первым контактом:

- EDI provider(s);
- число delivery orders/month;
- какие penalty document types реально приходят;
- кто внутри компании разбирает штрафы.

## 2. «Карельское лето»

Public evidence:

- производит более 5 млн единиц продукции в год;
- с 2021 года поставляет в `Магнит`, `Пятёрочка`, `Перекрёсток`, `Лента` и другие федеральные сети;
- FSSC 22000;
- 4 производственные линии.

Source:

- https://kareliansummer.com/o-nas/

Pilot fit: `HIGH`.

Почему:

- food/FMCG;
- публично подтверждён объём производства;
- 3 target retailer groups;
- не выглядит микропоставщиком.

## 3. ООО «Витек»

Public evidence:

- производитель кукурузных палочек/снеков;
- работает с `Пятёрочка`, `Перекрёсток`, `Магнит`, `Лента`, Ашан, ОКЕЙ, Metro и другими;
- на официальном сайте опубликованы коммерческий/логистический контакты.

Source:

- https://witek.ru/company/

Pilot fit: `HIGH`.

Почему:

- packaged food;
- несколько target networks;
- явный logistics function/contact;
- потенциально хорош для first outreach because supplier-side logistics ownership visible publicly.

Public contacts on source page include general/commercial/logistics email/phone. Do not scrape personal data; use only company-published functional contacts if outreach is later authorized.

## 4. ГК «ТМК-Сервис» / TMK Food

Public evidence:

- производитель снеков полного цикла;
- продукция продаётся в X5 (`Пятёрочка`, `Перекрёсток`, `Чижик`), `Магнит`, `Лента`, O'КЕЙ, Дикси, METRO, Fix Price and regional networks.

Source:

- https://tmk-food.ru/o-kompanii

Pilot fit: `HIGH`.

Почему:

- частый FMCG order flow;
- 3 target network groups;
- nationwide retail footprint;
- likely repeated EDI order/acceptance events.

## 5. Sweetline

Public evidence:

- крупный поставщик продуктов питания с 2005 года;
- делает private-label products;
- поставляет в `Пятёрочка`, `Перекрёсток`, `Магнит`, `Лента`, Ашан, O'КЕЙ and others.

Source:

- https://www.sweetline.ru/who_we_are

Pilot fit: `HIGH`.

Почему:

- multi-network food supplier;
- private-label relationships can create large, regular contract/order volume;
- likely useful cross-retailer test.

Risk:

- private-label and multiple customer-specific contracts may increase rule complexity.

## 6. «Любимый город»

Public evidence:

- dairy/food producer;
- official site lists `Магнит`, `Лента`, `Пятёрочка`, `Перекрёсток`, Ашан plus online channels under `Где купить`;
- own production and quality-control infrastructure.

Source:

- https://lubgorod.ru/

Pilot fit: `HIGH`.

Почему:

- perishable food;
- frequent delivery/acceptance cycle likely;
- all three target retail groups present.

Potentially useful rule families:

- confirmed vs accepted quantity;
- timing;
- RECADV discrepancy;
- order version/cancellation.

Do not include quality disputes in deterministic V0.

## 7. ООО «СПЕЦРЕЗЕРВ»

Public evidence:

- importer/wholesaler of vegetables, fruits, dry fruits/nuts and packaging;
- official site states contracts with `X5 Retail Group`, `Лента`, `Магнит` and other networks.

Source:

- https://spets21.ru/

Pilot fit: `VERY_HIGH_FOR_DATA_STRESS_TEST`.

Почему:

- fresh produce has high cadence and receiving variability;
- X5 + Magnit + Lenta;
- import/logistics complexity creates rich event history.

Caution:

- quality/rejection disputes are expert-heavy and must be Tier B;
- pilot should isolate quantity/order/timestamp/calculation rules.

## 8. Green World Agro Holding

Public evidence:

- public 2026 site positions company as an Uzbekistan→Russia produce supply corridor;
- states `900 tons/week` planned capacity;
- states supplies to `X5`, `Магнит`, `Лента` and lists multiple distribution centers/cities;
- 13 SKU in matrix.

Source:

- https://gwah.ru/

Pilot fit: `HIGH_BUT_COMPLEX`.

Почему:

- current public evidence;
- large physical flow;
- cross-retailer;
- exact logistics/acceptance evidence likely material.

Caution:

- cross-border/customs/temperature/quality causes add Tier B complexity;
- use only deterministic order/acceptance mismatch in first pilot.

## 9. «Экстра Фиш»

Public evidence:

- official partner page lists `Перекрёсток` and `Пятёрочка` since 2020, `Лента` since 2021, O'КЕЙ, Ашан and others;
- fish/food supplier.

Source:

- https://extra-fish.ru/partners/

Pilot fit: `MEDIUM_HIGH`.

Почему:

- X5 + Lenta;
- perishable category;
- repeated deliveries plausible.

Почему ниже first tier:

- Magnit not shown in current public source;
- quality/cold-chain issues may dominate some deductions.

## 10. «Кухмастер»

Public evidence:

- current official site says 26 years in market;
- `7+ billion RUB` annual revenue;
- 150+ product names;
- 100+ regions;
- works with `Пятёрочка`, `Магнит`, `Лента`, `Перекрёсток`, `Чижик`, Ашан, Metro, O'КЕЙ and 130+ networks.

Source:

- https://kuhmaster.com/

Pilot fit: `HIGH_VALUE_BUT_ENTERPRISE_RISK`.

Почему:

- very large recurring network volume;
- ideal for proving economic ceiling of deduction recovery.

Почему не first contact necessarily:

- larger company likely has established finance/KAM/legal/EDI processes;
- procurement/security cycle may be harder;
- could be a Phase B validation target after smaller pilot works.

## 11. «ОЛМО Логистик»

Public evidence:

- distributor/logistics company for food/FMCG;
- public site shows X5/Pyatyorochka, Magnit/Tander, Lenta, Auchan, Metro, Diksi, O'Key and others;
- offers pallet delivery into federal retail networks with documentation, pickup, labeling and inventory/logistics services.

Source:

- https://www.olmologistic.com/

Pilot fit: `HIGH_AS_DISTRIBUTOR_PROFILE`.

Почему:

- distributor can aggregate many SKU/principals;
- operationally close to EDI/order/warehouse acceptance;
- potentially sees network deductions across multiple principals/networks.

Critical question:

- are fines economically borne by OLМО itself or passed through to principals? If pass-through only, buyer/budget owner may be elsewhere.

## 12. «Мострейдгрупп»

Public evidence:

- Russian-Asian Union of Industrialists and Entrepreneurs profile states direct contracts with `Магнит`, X5 (`Пятёрочка`, `Перекрёсток`), `Лента`, METRO, O'КЕЙ, Ашан and others;
- oral-care / FMCG products;
- public corporate contact listed.

Source:

- https://raspp.ru/company/partnery-i-chleny/gruppa-kompaniy-mostreydgrupp/

Pilot fit: `IMPORTANT_NONFOOD_CONTROL`.

Почему:

- multi-network FMCG but non-food;
- 120-FZ food-consent wedge does not apply;
- useful to test whether long-term product value exists in generic `calc/order-version/shipment-acceptance/duplicate` rules beyond the temporary 120-FZ acquisition wedge.

If non-food control sample shows no meaningful deterministic recovery, long-term moat is weaker than first impression.

## 13. «РУЗКОМ»

Public evidence:

Secondary current catalog source describes company as a large meat/meat-canned-goods supplier and states sales to `Магнит`, `Пятёрочка`, `Лента`, Ашан, Атак, Fix Price and other networks.

Source:

- https://pitanie.ru/brands/ruzkom/

Pilot fit: `MEDIUM_PENDING_PRIMARY_SOURCE_CONFIRMATION`.

Почему:

- food + three target groups;
- likely substantial supplier volume.

Why not first-tier evidence:

- current accessible proof is secondary rather than official corporate page;
- verify relationship freshness before any outreach.

## 14. «Устюгмолоко»

Public evidence:

Older public manufacturer presentation lists partners including `Магнит`, `Пятёрочка`, `Лента`, `Перекрёсток`, O'КЕЙ and others.

Source:

- https://productcenter.ru/uploads/580183/%D0%9E%D0%9E%D0%9E%2B%D0%9C%D0%97%2B%D0%A3%D1%81%D1%82%D1%8E%D0%B3%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.pdf

Pilot fit: `LOWER_PRIORITY__FRESHNESS_CHECK_REQUIRED`.

Reason:

- relevant dairy profile;
- source is several years old, so current network relationships must be revalidated.

## 15. First outreach cohort recommendation

Not a ranking of business quality. This is an experimental cohort intended to maximize diversity and speed of learning.

### Cohort A — 6 likely first-wave profiles

1. Семилукский пищекомбинат — packaged food, X5/Magnit/Lenta.
2. Витек — snacks, public logistics/commercial functions.
3. TMK Food — snacks, X5/Magnit/Lenta.
4. Любимый город — dairy/perishable, X5/Magnit/Lenta.
5. СПЕЦРЕЗЕРВ — fresh produce/importer, X5/Magnit/Lenta.
6. Карельское лето — 5M units/year, X5/Magnit/Lenta.

Rationale:

- enough scale for EDI volume;
- different perishability/logistics profiles;
- not obviously the largest national conglomerates;
- current official/public evidence available.

### Cohort B — validation / larger or different model

- Sweetline — private label + multiple networks;
- Кухмастер — larger enterprise/high ceiling;
- ОЛМО Логистик — distributor model;
- Green World Agro — high-volume fresh cross-border;
- Экстра Фиш — perishable X5/Lenta;
- Мострейдгрупп — non-food control.

## 16. Public signals that strengthen buyer pain, but must NOT be treated as market statistics

A current 2026 consulting article for manufacturers working with federal retail describes a recurring management problem:

- turnover exists but net cash/margin is much lower after penalties/logistics/promo;
- penalties for delivery delays/marking/GTIN errors;
- example diagnostic claims penalties can be 2–3% of turnover/month in some client situations.

Source:

- https://retail-details.ru/2026-proizvoditeli-kotorye-upravlyayut-ritejlom-zabirayut-rynok/

This is **consulting/vendor evidence**, not representative statistics. Do not use 2–3% as TAM assumption.

Its value is qualitative: supplier management already buys help to understand true network economics including penalties.

## 17. EDI prerequisite is realistic for target chains

Current industry materials describe EDI as standard/mandatory for major federal networks and the common event chain around order/response/shipment/acceptance.

Secondary overview:

- https://toolfox.ru/blog/edi-dlya-torgovykh-setei

Primary retailer/provider docs remain the authority for exact fields and rules.

The public ICP corpus deliberately prioritizes suppliers to networks where ORDERS/ORDRSP/DESADV/RECADV workflows are already established.

## 18. What we still do NOT know about any named company

For every prospect above, unknown until direct validation:

- current EDI provider;
- annual penalty RUB;
- exact penalty reason mix;
- whether deductions are already handled efficiently;
- whether the supplier wins disputes;
- staff hours spent;
- whether legal team or KAM owns process;
- willingness to share bounded exports;
- willingness-to-pay.

Do not infer these from public network logos.

## 19. Next action from this corpus

Prepare a bounded discovery/outreach script and sample-data package for Cohort A.

The first ask should NOT be `give us API access`.

It should be:

> Give us an anonymized 3-month export of penalty documents + linked EDI messages for one network. We will return an evidence-only audit showing which cases are deterministic, which are human/legal, and the potentially disputable RUB amount. No claim is submitted automatically.

If companies refuse bounded exports or the first 10 audits show trivial Tier A value, treat that as negative market evidence and KILL/downgrade the candidate.
