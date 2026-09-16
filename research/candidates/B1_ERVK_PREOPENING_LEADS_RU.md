# B1 — ERVK Pre-Opening Physical-Business Leads RU

Дата: 2026-09-16

Статус: `HOLD__REAL_PREOPENING_SIGNAL__OWNER_ACCESS_PASS__INCUMBENT_ABSORPTION_TOO_EASY__MOAT_UNPROVEN`

## Коротко

Идея: использовать публичный Единый реестр уведомлений о начале осуществления отдельных видов предпринимательской деятельности (ЕРВК) как ранний sales-signal для поставщиков B2B-услуг и оборудования.

Потенциальная цепочка:

`новое уведомление ЕРВК`
→ `конкретный вид деятельности / ОКВЭД`
→ `конкретный фактический адрес точки`
→ `дата начала деятельности`
→ `ЮЛ/ИП + ИНН/ОГРН + контакты`
→ `вертикальная квалификация`
→ outreach поставщикам касс / эквайринга / связи / оборудования / продуктов / охраны / IT / расходников до или около момента открытия.

Это не обычный `новая компания зарегистрирована` lead. ЮЛ/ИП может существовать месяцы или годы, а уведомление подается по каждому месту фактического осуществления деятельности до начала работы.

## 1. OWNER_ACCESSIBILITY — PASS

Публичный портал:

`https://ervk.gov.ru/public/notices`

Live Opera probe без логина подтвердил:

- публичный список доступен;
- на карточках списка видны вид деятельности;
- ОКВЭД;
- субъект РФ;
- фактический адрес места деятельности;
- контрольный орган;
- дата;
- номер уведомления;
- наименование объекта/точки;
- поток обновляется свежими последовательными уведомлениями.

На момент live probe публичный интерфейс показывал более `1.329 млн` совпадений.

Пример свежего сигнала:

- `У002/001408455`;
- услуги общественного питания;
- ОКВЭД `56.29`;
- Московская область, Дмитров, деревня Никульское, д. 90 стр. 1;
- ИП Беликова Лариса Анатольевна;
- отображенная дата `21.09.2026` при текущей дате исследования 16.09.2026.

Это показывает, что реестр способен содержать сигнал до фактического старта точки.

Дополнительные live записи включали новые продуктовые магазины, аптечные пункты, косметическую розницу, оптовую торговлю и производство.

## 2. Нормативная структура данных — PASS

Постановление Правительства РФ №725 требует включать в реестр, среди прочего:

- номер уведомления;
- дату и время подачи;
- дату начала деятельности;
- дату изменения;
- дату прекращения;
- актуальный статус;
- ОКВЭД;
- название и адрес места деятельности;
- полное/сокращенное наименование ЮЛ или ФИО ИП;
- ИНН;
- ОГРН/ОГРНИП;
- контактный телефон;
- email.

Сведения реестра общедоступны, а публичные сведения должны бесплатно быть доступны на публичном портале ЕРВК.

Sources:

- https://government.ru/docs/all/159159/
- https://www.consultant.ru/document/cons_doc_LAW_506214/997749d7c60943ef2ae2620aa787b0978f09a8ed/
- https://www.consultant.ru/document/cons_doc_LAW_83079/bee4fe4ca4e76ef8f2352c1ee26a65200dc4f2ed/

## 3. Timing advantage — PASS

Роспотребнадзор прямо указывает: уведомление подается до начала фактического выполнения работ/оказания услуг.

Для нескольких мест деятельности уведомление подается отдельно по каждому месту.

Therefore:

`ЕРВК event`

может быть более ранним и более операционно точным сигналом, чем:

- дата регистрации ЮЛ/ИП;
- основной ОКВЭД в ЕГРЮЛ/ЕГРИП;
- появление карточки на картах уже после открытия.

Example:

ИП может быть зарегистрирован заранее, а ERVK позже раскрывает конкретную будущую точку, адрес и заявленный вид деятельности.

Sources:

- https://25.rospotrebnadzor.ru/gosudarstvennye-uslugi/uvedomlenie-o-nachale-osushchestvleniya-otdelnykh-vidov-predprinimatelskoy-deyatelnosti/16595/
- https://neruadmin.ru/press-tsentr/informatsionnye-soobshcheniya/podacha_uvedomleniy_o_nachale_osushchestvleniya_otdelnykh_vidov_predprinimatelskoy_deyatelnosti_/

## 4. Data-quality risk — MATERIAL

Live list is not a clean `new opening only` feed.

Observed noisy example:

- recent sequential ERVK record;
- address text itself contained `прекратил деятельность с 24.05.2020`.

Therefore naive ingestion of newest IDs would mix:

- new starts;
- migrated/legacy notices;
- amendments;
- address changes;
- terminations;
- other registry maintenance.

A production feed must use at least:

- `date_submitted`;
- `date_activity_start`;
- `date_changed`;
- `date_terminated`;
- `current_status`;
- prior notification number / lineage;
- object address;
- legal entity identity.

Do not treat sequential ERVK id alone as a new business opening.

## 5. Exact competitor search — no exact ERVK lead feed established, BUT incumbent absorption risk is high

No public exact product was established in bounded search whose stated core is:

`new ERVK notice -> future/new physical point -> exact opening address/date -> contact enrichment -> supplier lead alert`.

However, the surrounding sales-intelligence market is already mature.

### BINDX — strongest threat

BINDX already sells:

- `отслеживание появления новых организаций`;
- daily/recurring B2B lead funnels;
- subscription to sales signals;
- factual addresses;
- phone/email/site data;
- license signals;
- company changes;
- API/CRM workflows.

BINDX also publishes a case where a telecom provider used `только что открывшиеся компании` for first-contact sales and customer testimony about companies opening new branches.

Sources:

- https://www.bindx.ai/
- https://bindx.ai/landing/bindx

Current public BINDX materials do not establish that it specifically ingests ERVK or exposes future activity-start dates per physical location.

But structurally this is only an additional public data source + event type for an incumbent that already owns:

`collection -> enrichment -> contacts -> signal subscription -> CRM/export -> sales workflow`.

### Kontur / Rusprofile

Kontur `Поиск клиентов` already provides B2B company search and contacts.

Rusprofile provides company search, monitoring, source aggregation and saved searches/events.

No exact ERVK pre-opening feed was established in their public materials, but they are also plausible fast absorbers.

## 6. Strategic problem

The new ERVK regime creates a genuine information edge:

`actual physical business start` can be visible before maps and later than generic company registration.

But the edge currently belongs to the **source**, not to a defensible product architecture.

If our product is only:

`we parse ERVK faster than others`,

then BINDX / Kontur / other data vendors can reproduce the source integration quickly.

This repeats the known failure mode:

`new government reporting / new public dataset != durable moat`.

## 7. What would be required to reopen/promote

Do not promote as a generic lead database.

Reopen only if one of these becomes true:

1. a vertical workflow produces much higher buyer value than generic sales intelligence, e.g. a concrete supplier can automatically qualify and monetize openings with an evidence-backed conversion advantage;
2. ERVK can be joined with another hard-to-reproduce public/operational source into a proprietary high-precision `pre-opening readiness` signal;
3. we can prove BINDX/Kontur do not and cannot economically replicate the required location-level history / normalization / entity lineage;
4. customer WTP for this exact pre-opening event stream is high enough to support a specialist vertical despite generic incumbents.

## 8. Current decision

`OWNER_ACCESSIBILITY = PASS`

`TIMING_SIGNAL = PASS`

`PUBLIC_DATA_VOLUME = PASS`

`NOISE_FILTER = OPEN / likely solvable because registry schema contains status/date lineage`

`EXACT_ER VK_COMPETITOR = NOT FOUND IN BOUNDED SEARCH`

`INCUMBENT_ABSORPTION = FAIL / HIGH RISK`

`MOAT = UNPROVEN`

Final current status:

`HOLD__REAL_PREOPENING_SIGNAL__OWNER_ACCESS_PASS__INCUMBENT_ABSORPTION_TOO_EASY__MOAT_UNPROVEN`

Do not spend implementation effort on a generic ERVK lead scraper unless a stronger vertical moat appears.