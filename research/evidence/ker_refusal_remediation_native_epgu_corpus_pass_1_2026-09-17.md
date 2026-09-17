# KER Refusal Remediation — Strict Native EPGU Corpus Pass 1

Дата: 2026-09-17

Связанный кандидат:

`research/candidates/R4_KER_REFUSAL_REMEDIATION_LEADS_RU.md`

Предыдущие evidence:

- `research/evidence/ker_refusal_remediation_normalization_pass_1_2026-09-16.md`
- `research/evidence/ker_refusal_remediation_post2026_registry_steady_state_pass_2_2026-09-17.md`
- `research/evidence/ker_refusal_remediation_post2026_pass2_correction_2026-09-17.md`

Статус:

`STRICT_NATIVE_PASS_1__OLD_2026_REFUSAL_CORPUS_HEAVILY_LEGACY_CONTAMINATED__NATIVE_POST_01_03_REFUSAL_FREQUENCY_MATERIALLY_WEAKER_THAN_INITIAL_THESIS__NO_NATIVE_CONFIRMED_REFUSAL_YET_IN_CHECKED_EXACT_DATE_SAMPLE`

## Цель

Перестать использовать календарный год решения как proxy для steady-state после реформы.

Главный вопрос:

> Сколько публичных отказов 2026 действительно относятся к заявкам, поданным через новый ЕПГУ-контур после 01.03.2026, а сколько являются доработкой/рассмотрением старых заявок ГИСП?

Для этого вводится строгая классификация.

## 1. Классы

### `NATIVE_EPGU_CONFIRMED`

Есть точная официальная `submission_date > 2026-03-01` либо прямое официальное указание на подачу через ЕПГУ после реформы.

### `LEGACY_GISP_CARRYOVER`

Точная официальная дата подачи/приема `< 2026-03-01`, а решение принято позднее.

### `POST_REFORM_DECISION__SUBMISSION_UNKNOWN`

Решение после 01.03.2026 опубликовано, но точная дата исходной подачи не восстановлена.

### `POST_REFORM_ACCEPTANCE_NOTICE__SUBMISSION_UNKNOWN`

Уведомление о приеме после 01.03.2026 есть, но сама дата подачи неизвестна.

### `NATIVE_APPLICATION__RESOLVED_ISSUE`

Native application с последующей официальной выдачей КЭР по exact object code.

## 2. Territory A — Республика Коми / НАО: лучший strict control

Official source:

https://rpn.gov.ru/regions/11/gov-services/complex-eco-approval/

Эта страница особенно ценна тем, что публикует точные даты и номера заявлений 2026, а отдельно — выдачи и отказы.

### 2.1 Native post-01.03 applications

После четырех февральских строк в списке 2026 идут строки `5–26` с точными датами от `03.04.2026` до `21.08.2026`.

Это `22` application rows после реформы.

После дедупликации:

- `9` уникальных заявителей;
- `13` уникальных публично кодированных объектов НВОС;
- плюс `1` отдельный project/application (`Лаявожское нефтегазоконденсатное месторождение`) без кода в текущем представлении;
- итого около `14` distinct object/application matters.

Уникальные заявители:

1. АО «НЭМ ОЙЛ»;
2. АО «ВОРКУТАУГОЛЬ»;
3. ООО «Енисей»;
4. ООО «Природа-Пермь»;
5. ООО «Лаявожнефтегаз»;
6. ООО «Нефтегазовая компания «Развитие Регионов»;
7. ЗАО «Тиман-Печора Эксплорэйшн»;
8. ООО «Инвест Трейд»;
9. МКП «Ухтаспецавтодор».

Повторные подачи одного и того же объекта встречаются многократно, поэтому сырые application rows нельзя считать отдельными commercial leads.

### 2.2 Official 2026 refusal table

На той же current page раздел `Отказы в выдаче КЭР в 2026 году` содержит только четыре строки:

1. АО «НЭМ ОЙЛ» — `12.01.2026`;
2. ООО «Тимано-Печорская газовая компания» — `16.01.2026`;
3. АО «Воркутауголь» — `09.02.2026`;
4. ЗАО «Тиман-Печора Эксплорэйшн» — `11.02.2026`.

Все четыре решения — ДО `01.03.2026`.

Следовательно в current official table:

`NATIVE_POST_REFORM_FORMAL_REFUSALS_LISTED = 0`

при наличии как минимум 22 post-reform application rows.

### 2.3 Native applications with verified issue outcome

По exact object code текущая страница показывает как минимум следующие post-reform applications, закончившиеся выдачей:

- АО «НЭМ ОЙЛ», `87-0111-001280-П`: application `06.04.2026` / repeat `08.05.2026`; КЭР `27.05.2026`;
- ООО «Нефтегазовая компания «Развитие Регионов», `11-0183-001009-П`: application `23.04.2026`; КЭР `13.05.2026`;
- ООО «Енисей», `87-0111-001025-П`: application `04.05.2026` / repeat `26.06.2026`; КЭР `14.07.2026`;
- ЗАО «Тиман-Печора Эксплорэйшн», `87-0111-001026-П`: application `09.06.2026` / repeat `03.07.2026`; КЭР `20.07.2026`;
- ООО «Природа-Пермь», `87-0111-001004-П`: multiple applications May–July; КЭР `28.07.2026`;
- АО «Воркутауголь», `87-0111-001181-П`: applications April/May/June; КЭР `31.07.2026`.

То есть минимум `6` distinct native object matters в этой территории видимо завершились выдачей.

Важно: у строки НЭМ ОЙЛ есть текстовое расхождение в названии месторождения между application/issue rows, но object code совпадает; считать identity следует по object code, а не по display-name.

### 2.4 Interpretation

Это самый сильный negative-control текущего pass:

- native applications после реформы реально есть;
- страница способна публиковать их exact submission dates;
- та же страница способна публиковать refusal table;
- при этом post-reform refusal table остается пустой.

Это НЕ национальная статистика и не доказывает zero native refusals в РФ.

Но тезис `fresh refusal events will be abundant after deadline wave` больше нельзя считать вероятным без дополнительных данных.

## 3. Territory B — Самара / Ульяновск: 2026 refusal section сильно загрязнен legacy

Official source:

https://rpn.gov.ru/regions/63/gov-services/complex-eco-approval/

Current section `Отказы в выдаче КЭР 2026 год` содержит пять имен:

1. ООО «СЭТ»;
2. ООО «СИЛИКАТ», `73-0173-000280-П`;
3. ООО «ЭКОВОЛГА», `73-0173-001169-П`;
4. ООО «Экопром», `18-0173-000774-П`;
5. ООО «КРОНА», `73-0173-000507-П`.

Но на той же официальной странице опубликованы application artifacts до реформы:

- ООО «СЭТ» — application artifact `18.11.2025`;
- ООО «ЭКОПРОМ» — application artifact `10.10.2025` (также более ранняя история заявок);
- ООО «ЭкоВолга» — application artifacts `27.08.2025` и `16.12.2025`;
- ООО «СИЛИКАТ» — application artifact `17.12.2025` (и более ранняя история).

Следовательно минимум `4/5` current refusal-list entities имеют явную pre-01.03 application history и не могут автоматически считаться native EPGU refusal events.

ООО «КРОНА»:

`POST_REFORM_REFUSAL_SECTION__SUBMISSION_DATE_UNKNOWN`

Текущая страница показывает объект и факт отказа в разделе 2026, но exact submission date не восстановлена.

Strict result:

- `NATIVE_EPGU_CONFIRMED_REFUSALS = 0`;
- `LEGACY/PRE_REFORM_HISTORY_CONFIRMED = at least 4`;
- `SUBMISSION_UNKNOWN = 1`.

## 4. Territory C — Забайкалье / Бурятия: correction applied

Official source:

https://rpn.gov.ru/regions/75/gov-services/complex-eco-approval/

### ООО «КУЛТУМИНСКОЕ»

- acceptance notice: `25.02.2026 №292`;
- refusal: `14.04.2026 №295`.

Classification:

`LEGACY_GISP_CARRYOVER`.

### ООО «Рудное», object `81-0175-001990-П`

- acceptance notice: `03.03.2026 №293`;
- exact application submission date not recovered.

Classification:

`POST_REFORM_ACCEPTANCE_NOTICE__SUBMISSION_UNKNOWN`.

### ПАО «ППГХО»

- acceptance notice: `04.03.2026 №294`;
- exact application submission date not recovered.

Classification:

`POST_REFORM_ACCEPTANCE_NOTICE__SUBMISSION_UNKNOWN`.

### Object `76-0175-001238-П`, «Очистные сооружения (ОС)`

- refusal: `06.05.2026 №296`;
- official text describes a `доработанная заявка`;
- original submission date not recovered.

Classification:

`POST_REFORM_REFUSAL__SUBMISSION_UNKNOWN__DORABOTANNAYA`.

Strict result:

`NATIVE_EPGU_CONFIRMED_REFUSALS = 0`.

## 5. Territory D — Западный Урал / Пермь-Удмуртия

Official source:

https://rpn.gov.ru/regions/59/gov-services/complex-eco-approval/

2026 decisions:

- ООО «КАМА» — отказ `20.01.2026`;
- МУП ЖКХ — выдача `10.03.2026`;
- ООО «Чистый город» — пересмотр `17.03.2026`;
- ООО Завод «БУММАШ» — отказ `06.04.2026`.

Для БУММАШ exact original submission date из текущей публичной страницы не восстановлена.

Classification:

`POST_REFORM_DECISION__SUBMISSION_UNKNOWN`.

Strict result:

`NATIVE_EPGU_CONFIRMED_REFUSALS = 0`.

## 6. Territory E — Байкальское управление: post-reform application-publication completeness weak

Official source:

https://rpn.gov.ru/regions/38/govservices/complex-eco-approval/

Current page has structured 2026 sections.

Initial KER-application acceptance section currently exposes:

- ПАО «Яковлев» — acceptance `26.02.2026`.

The page later exposes 2026 result events, including:

- ООО «Геолог» — issuance `02.04.2026`;
- several March partial/full revision decisions;
- refusal PАО «Яковлев» in January section / refusal material;
- refusal in revision for Байкальская энергетическая компания.

But current initial-application acceptance section does not provide a continuous post-01.03 application list comparable to Komi.

Interpretation:

`SOURCE_COMPLETENESS_FOR_NATIVE_APPLICATION_DENOMINATOR = FAIL/UNKNOWN`.

Do not infer low application volume from this page.

## 7. Territory F — Северо-Запад / Карелия-Мурманск

Official source:

https://rpn.gov.ru/regions/51/gov-services/complex-eco-approval/

Current decision table:

- 2026 refusal: АО «Завод ТО ТБО» — `12.01.2026`;
- issue: ООО «РК-Гранд» — `16.03.2026` after long prior refusal/reapplication cycle.

No post-01.03 formal refusal is listed in current 2026 decision table.

The page is useful for lifecycle history but does not expose a comparable current native application denominator after the EPGU migration.

Strict result:

`NATIVE_EPGU_CONFIRMED_REFUSALS = 0` from current indexed decision table.

## 8. Territory G — Татарстан / Чувашия / Марий Эл

Official source:

https://rpn.gov.ru/regions/16/gov-services/complex-eco-approval/

2026 table currently shows:

- Тетюши Жилсервис refusal `13.01.2026`;
- Казанькомпрессормаш refusal `15.01.2026`;
- АО «СЗ ТУС» refusal `03.03.2026`;
- Нижнекамскнефтехим review/issue `19.03.2026`;
- ООО «ТРАКС ВОСТОК РУС» refusal `20.03.2026`.

Both `СЗ ТУС` and `ТРАКС ВОСТОК РУС` had repeated refusal history already in 2025.

Exact submission dates for the applications that produced the March 2026 decisions were not recovered in this pass.

Therefore neither can be labeled native merely because decision date is after 01.03.

Strict classification:

`POST_REFORM_DECISION__SUBMISSION_UNKNOWN__REPEAT_FAILURE_HISTORY`.

The current indexed table also appears to stop at March 2026, so it cannot be used as complete Apr–Sep steady-state denominator without further source work.

## 9. Territory H — Нижняя Волга

Official source:

https://rpn.gov.ru/regions/34/gov-services/complex-eco-approval/

Current page publishes an XLSX:

`Реестр решений о выдаче, отказе КЭР на 01.09.2026`

This proves the regional decision register continues after reform.

However current research environment did not expose XLSX row contents through the indexed page, so no native/legacy count is made here.

Classification:

`CURRENT_REGISTRY_EXISTS__ROW_LEVEL_AUDIT_REQUIRED`.

## 10. Territory I — Центрально-Черноземное управление

Official source:

https://rpn.gov.ru/regions/36/gov-services/complex-eco-approval/

Current refusal artifact is explicitly named:

`Перечень_заявок_с_отказом_в_выдаче_и_пересмотре_комплексных_экологических_разрешений_до_01.03.2026.xlsx`

This is itself evidence that the authority separates the pre-reform refusal corpus from the post-reform regime.

No current indexed post-01.03 refusal table was recovered in this pass.

## 11. Strict cross-territory result

In the checked exact-date sample, a large share of apparent `2026 refusals` are actually:

`application before 01.03 -> decision after 01.03`.

This invalidates any 2026 steady-state estimate built from decision year alone.

Current strict sample:

- Komi: many native applications, `0` listed native formal refusals;
- Samara/Ulyanovsk: `5` refusal-section entries, at least `4` have pre-reform application artifacts, `1` unknown;
- Zabaykal: April refusal proven legacy; May refusal submission unknown;
- West Ural: April refusal submission unknown;
- North-West: only Jan refusal listed for 2026;
- Tatarstan: March repeat-failure decisions, submission date unknown;
- Baikal: application-denominator publication incomplete after reform;
- Lower Volga: current XLSX exists but row audit not completed;
- Central Black Earth: current public artifact explicitly scopes refusal list `до 01.03.2026`.

### Critical observation

As of this pass:

`NATIVE_EPGU_CONFIRMED_REFUSAL_EVENTS_WITH_EXACT_POST_01_03_SUBMISSION_DATE = 0`

within the exact-date refusal rows we managed to normalize.

This is NOT proof that Russia has zero native EPGU refusals.

It IS a material negative update to the candidate economics because:

1. historical refusal abundance was inflated by deadline-wave / legacy carry-over;
2. repeat submissions create multiple rows per one company/object;
3. some territories stop exposing complete application feeds after migration;
4. in the strongest strict-control territory, native applications are visible but native formal refusals are not.

## 12. Current K1 / K2 update

### K1 — steady-state volume

Downgrade from:

`PARTIAL_PASS__PROBLEM_BASE_PERSISTS__FRESH_REFUSAL_RATE_OPEN`

to:

`MATERIAL_RISK__RESIDUAL_NEED_HIGH__NATIVE_REFUSAL_RATE_CURRENTLY_WEAK_AND_UNPROVEN`

The population without KER remains large, but that is not the same as a recurring refusal-lead flow.

### K2 — publication coverage/freshness

Downgrade to:

`MATERIAL_RISK__REFUSAL_PUBLICATION_EXISTS__POST_REFORM_SOURCE_COMPLETENESS_FRAGMENTED`

The legal/publication layer survives, but practical source completeness varies sharply by territorial authority.

## 13. Candidate status — provisional, not final kill

Do NOT promote to buyer test yet.

The previous status `PROMISING_R4` is now under active downgrade review.

Recommended provisional status after this pass:

`HOLD_HIGH__HIGH_VALUE_FAILURE_SIGNAL_EXISTS__BUT_NATIVE_POST_REFORM_REFUSAL_VOLUME_NOT_YET_DEMONSTRATED`

Do not KILL yet because:

- exact refusals remain high-ticket potential leads;
- residual no-KER population remains large;
- some regional current registers (especially Lower Volga XLSX) have not been row-audited;
- current central KND route is inaccessible in this environment;
- one or a few territories cannot establish national rate.

But do not continue presenting KER as the active #1 without solving the native-volume denominator.

## 14. Next bounded pass

1. Obtain row-level content of Lower Volga `01.09.2026` XLSX through a legitimate accessible route.
2. Audit at least 3 more territorial sources that expose exact post-01.03 submission dates + outcomes.
3. Search official/national 2026 statistics specifically for number of KER applications and refusals after 01.03.
4. Compute unique-company and unique-object native refusal rate, not raw decision rows.
5. If a broader strict sample still yields near-zero native refusals, downgrade KER to `HOLD` or `KILL_FOR_VOLUME` and resume structured idea search.

No implementation. No outreach.