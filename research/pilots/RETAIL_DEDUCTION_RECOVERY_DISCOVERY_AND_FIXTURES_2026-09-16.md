# Retail Deduction Recovery — Discovery Script + Synthetic Fixtures

Дата: 2026-09-16

Связанные материалы:

- `research/pilots/RETAIL_DEDUCTION_RECOVERY_PREPILOT_2026-09-16.md`
- `research/pilots/RETAIL_DEDUCTION_RECOVERY_PUBLIC_ICP_CORPUS_2026-09-16.md`

Статус:

`READY_FOR_DISCOVERY__NO_PRODUCT__NO_AUTOMATED_CLAIM_PROMISE`

## 1. Цель discovery

Не продать воображаемый SaaS.

Цель первых разговоров:

1. подтвердить, что supplier действительно получает штрафы/удержания в измеримом объёме;
2. понять текущий процесс разбора;
3. определить, доступны ли bounded EDI exports;
4. получить исторический sample;
5. проверить Tier A rules на реальных данных;
6. только после результата проверить willingness-to-pay.

## 2. Кому писать / звонить

Предпочтительные роли:

- коммерческий директор / директор по работе с федеральными сетями;
- CFO / финансовый директор;
- руководитель key account / KAM по X5/Магнит/Лента;
- руководитель EDI/электронного документооборота;
- руководитель supply-chain/customer service;
- бухгалтерия взаиморасчётов с сетями — как data/process owner;
- legal — только как reviewer, не основной buyer на первом контакте.

Если компания небольшая/средняя, owner/CEO может быть прямым buyer.

## 3. Кого НЕ брать первым контактом

Не начинать через:

- общий customer support;
- маркетинг/PR;
- закупки компании;
- IT helpdesk без process owner;
- юриста без доступа к EDI/коммерческому процессу.

## 4. Первая формулировка — коротко

Не использовать слова:

- `AI-юрист`;
- `автоматически вернём все штрафы`;
- `гарантируем возврат`;
- `найдём незаконные штрафы`.

Рабочая формулировка:

> Мы проверяем отдельную задачу у поставщиков федеральных сетей: можно ли автоматически сверять штраф/удержание сети с исходной EDI-цепочкой ORDERS → ORDRSP → DESADV → RECADV и находить только объективные расхождения — неправильное согласованное количество, отменённую версию заказа, арифметику штрафа, дубли, несоответствие фактической приёмке. Юридические и качественные споры система не решает. Для проверки нам достаточно обезличенной выгрузки за 3 месяца по одной сети, без доступа к вашей 1С.

## 5. First-message variant

> Добрый день. Исследуем автоматизацию проверки штрафов федеральных сетей для поставщиков. Не юридический бот: задача — машинно сопоставить штраф с ORDERS/ORDRSP/DESADV/RECADV и найти только воспроизводимые расхождения в количестве, версии заказа, приёмке, сроке и расчёте. Ищем несколько поставщиков X5/Магнита/Ленты для исторической проверки на обезличенных данных за 3 месяца. Полного доступа к 1С не нужно, претензии от имени компании не отправляем. В результате возвращаем список кейсов с исходными EDI-доказательствами и суммой, которую имеет смысл проверить человеку. Если у вас штрафы действительно занимают время/деньги, хотел бы понять ваш текущий процесс и доступность такой выгрузки.

Не отправлять массово без адаптации к роли/компании.

## 6. Discovery call — первые 10 минут

Нужно получить факты до рассказа о продукте.

### Q1. Масштаб

`С какими федеральными сетями вы сейчас работаете и примерно сколько заказов/поставок проходит в месяц?`

Ищем:

- X5/Magnit/Lenta;
- repeated EDI volume;
- 100s/1000s order lines, not occasional supply.

### Q2. Штрафной поток

`За последние 3 месяца сколько примерно было штрафных актов/удержаний — в штуках и рублях?`

Если человек не знает даже порядок:

- где это видно?
- кто знает?
- можно ли взять отчёт/реестр?

### Q3. Причины

`Какие 3–5 причин дают основную сумму?`

Classify immediately:

Tier A candidates:

- недопоставка/непоставка;
- ответ на заказ/согласованный объём;
- срок поставки;
- расчёт по формуле;
- order version/cancellation;
- duplicate;
- приёмка quantity mismatch.

Tier B:

- качество;
- повреждение;
- force majeure;
- fault/cause disputes;
- proportionality/legal.

### Q4. Как узнают о штрафе

`Откуда штраф приходит: Ediweb/Saby/Kontur/другой EDI, email, кабинет сети, акт взаимозачёта?`

### Q5. Кто разбирает

`Кто сейчас берёт штраф и восстанавливает историю заказа/отгрузки/приёмки?`

Measure:

- role;
- people count;
- minutes/hours per case;
- handoffs.

### Q6. Что списывают без спора

`Есть ли порог суммы, ниже которого проще не разбираться?`

This is a strong automation-value signal.

### Q7. Recovery today

`Какую долю штрафов вы обычно оспариваете и сколько реально отменяют/возвращают?`

Do not force exact percentage if unavailable; ask for last 10 cases.

### Q8. Missed deadlines

`Бывает, что аргументы были, но не успели собрать/отправить доказательства?`

### Q9. Source data

`Можно ли выгрузить ORDERS/ORDRSP/DESADV/RECADV за 3 месяца из вашего EDI?`

### Q10. Data sharing gate

`Если убрать название компании, покупателей-физлиц и всё нерелевантное, готовы ли вы дать bounded export по одной сети для исторической проверки?`

## 7. Immediate disqualification rules

Do NOT push pilot if:

- штрафов почти нет;
- основной объём — quality/legal Tier B;
- компания уже автоматически связывает every penalty with EDI and почти всё recover'ит;
- supplier cannot export order/response/shipment/acceptance history;
- only full ERP access is possible and company refuses bounded export;
- process owner says annual burden is too small to care about;
- deductions are entirely passed to another party and buyer has no economic ownership.

Record as negative evidence.

## 8. Data ask after qualified discovery

Ask only for one network and 3 months.

Minimum package:

1. ORDERS all versions;
2. ORDRSP;
3. DESADV;
4. RECADV;
5. penalty acts / fine register;
6. historical outcome if already disputed;
7. exact contract/addendum clauses only for selected penalty reason(s).

Preferred transfer format:

- CSV/XLSX export;
- original XML optional;
- PDFs only for penalty/rule proof where needed.

No live credentials initially.

## 9. What we return to participant

One table per penalty:

- penalty id/date/reason/amount;
- linked order/shipment;
- exact source events;
- Tier A / Tier B;
- deterministic finding if any;
- rule used;
- potential disputed amount;
- missing evidence;
- deadline/process note;
- `HUMAN_REVIEW_REQUIRED` where applicable.

Plus aggregate:

- total penalty RUB;
- Tier A RUB;
- deterministic mismatch RUB;
- historical recovered RUB;
- missed/unknown outcome;
- estimated manual time;
- top repeat root causes.

No statement `you will recover X RUB`.

## 10. WTP test only after result

After showing actual audit:

> В выборке было X ₽ штрафов. Y ₽ попали в детерминированные классы, Z ₽ оказались объективными расхождениями, которые можно было обнаружить автоматически. На разбор ушло N часов вместо вашей обычной оценки M. Если бы такой контроль работал постоянно по новым штрафам и заранее собирал доказательства, какой способ оплаты был бы для вас реалистичен?

Then test, without anchoring prematurely:

- annual fixed fee;
- per-network fee;
- paid audit then subscription;
- base fee + success component.

Ask:

`Какую сумму экономии/возврата за год сервис должен доказать, чтобы покупка не требовала долгого внутреннего обоснования?`

This is more useful than `how much would you pay?`.

## 11. Synthetic fixture set

Purpose: prove owner-verifiability before customer data.

All examples use fictional supplier/network/order ids.

### Fixture F1 — 120-FZ consent mismatch

Inputs:

- food supplier;
- order `O-001` requests 100 cases;
- ORDRSP explicitly confirms 60;
- DESADV ships 60;
- RECADV accepts 60;
- retailer penalty charges shortage on 40 unconfirmed cases;
- applicable period/rule configured as active-consent regime.

Expected:

`120FZ_CONSENT_MISMATCH`

Evidence:

- ORDERS 100;
- ORDRSP 60;
- DESADV 60;
- RECADV 60;
- penalty base 40.

No auto-claim; human legal review before external action.

### Fixture F2 — valid shortage, no finding

- order 100;
- ORDRSP confirms 100;
- DESADV 80;
- RECADV accepts 80;
- configured shortage formula = 10% of confirmed-but-not-delivered value;
- retailer applies exactly that formula.

Expected:

`NO_TIER_A_INCONSISTENCY`

System must not invent dispute because a fine exists.

### Fixture F3 — order version mismatch

- O-003 v1 = 120 units;
- retailer sends v2 = 80 units before deadline;
- supplier confirms 80;
- ships/retailer accepts 80;
- penalty calculated against v1 shortage 40.

Expected:

`ORDER_VERSION_MISMATCH`

### Fixture F4 — acceptance contradiction

- confirmed 100;
- DESADV 100;
- RECADV accepted 100;
- penalty says 10 units shortage.

Expected:

`SHIPMENT_ACCEPTANCE_MISMATCH`

### Fixture F5 — arithmetic error

- confirmed shortfall value = 200,000 RUB;
- configured rate = 10%;
- expected fine = 20,000 RUB;
- retailer fine = 40,000 RUB.

Expected:

`PENALTY_CALC_MISMATCH`

Potentially disputed RUB should be the excess attributable to formula mismatch, not blindly the entire penalty.

### Fixture F6 — duplicate

- same order/SKU/breach period;
- penalty P6A = 50k;
- penalty P6B = 50k;
- rule does not permit two independent sanctions;
- same evidence keys.

Expected:

`DUPLICATE_PENALTY`

Only high confidence if duplicate identity is deterministic.

### Fixture F7 — missing export

- penalty references O-007;
- ORDERS exists;
- no ORDRSP in supplied dataset;
- no provider log proving whether ORDRSP was absent or export incomplete.

Expected:

`MISSING_SOURCE_EVIDENCE`

NOT `120FZ_CONSENT_MISMATCH`.

This fixture is critical against false positives.

### Fixture F8 — quality complaint

- retailer rejects 20 units for quality;
- photos/act exist;
- supplier disagrees.

Expected:

`NEEDS_HUMAN_LEGAL_OR_QUALITY_REVIEW`

No automatic conclusion regardless of LLM confidence.

### Fixture F9 — Article 333 opportunity

- contract penalty arithmetic is correct;
- penalty is 20% of value;
- supplier believes disproportionate.

Expected:

`LEGAL_REVIEW_OPPORTUNITY`

Do not count as Tier A recoverable mismatch.

### Fixture F10 — deadline risk

- penalty received at T0;
- network rule gives explicit objection deadline;
- 24h remains;
- source proof is available.

Expected:

`DEADLINE_OR_PROCESS_RISK`

This can be valuable even if penalty validity is unknown.

## 12. Acceptance tests for future prototype, if pilot later authorizes implementation

A future implementation is not accepted unless all fixtures are deterministic and reproducible:

- F1 high-confidence signal;
- F2 abstains/no false dispute;
- F3/F4/F5/F6 exact reason codes;
- F7 abstains due missing evidence;
- F8/F9 remain human-only;
- F10 alerts without declaring invalidity.

Any model that converts F7/F8/F9 into confident `invalid fine` is unsafe and fails architecture.

## 13. Discovery evidence ledger

For each contacted company, record only:

- company/source;
- role contacted;
- networks;
- rough order volume band;
- penalty RUB band;
- top reason families;
- EDI provider;
- export availability;
- current manual process;
- sample offered yes/no;
- reason for refusal;
- next step.

Do not store unnecessary personal details.

## 14. Decision boundary

After 10 qualified discovery calls / samples (not 10 generic messages), stop and reassess.

Possible results:

- `KILL__LOW_MONEY_OR_TIER_A_SHARE`
- `HOLD__ACCESS_FRICTION`
- `HOLD__WTP_UNPROVEN`
- `SURVIVES__EXPAND_TO_20_30`

No implementation based only on positive conversations without historical data.
