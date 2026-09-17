# KER Refusal Remediation — Strict Native EPGU Corpus Pass 2

Дата: 2026-09-17

Связанный кандидат:

`research/candidates/R4_KER_REFUSAL_REMEDIATION_LEADS_RU.md`

Предыдущие evidence:

- `research/evidence/ker_refusal_remediation_normalization_pass_1_2026-09-16.md`
- `research/evidence/ker_refusal_remediation_post2026_registry_steady_state_pass_2_2026-09-17.md`
- `research/evidence/ker_refusal_remediation_post2026_pass2_correction_2026-09-17.md`
- `research/evidence/ker_refusal_remediation_native_epgu_corpus_pass_1_2026-09-17.md`

Статус:

`STRICT_NATIVE_PASS_2__NATIVE_EPGU_APPLICATION_FLOW_CONFIRMED__NO_EXPLICIT_NATIVE_EPGU_REFUSAL_NORMALIZED_IN_CURRENT_EXACT_CHANNEL_SAMPLE__SOURCE_COMPLETENESS_FRAGMENTED__CANDIDATE_DOWNGRADE_TO_HOLD_HIGH`

## 1. Цель

Pass 1 показал сильное загрязнение календарного `2026 refusal corpus` старыми заявками ГИСП.

Pass 2 проверяет три оставшихся пути, которые могли спасти тезис о достаточном steady-state refusal flow:

1. территорию, которая явно печатает канал подачи `ГИСП` vs новая федеральная система;
2. свежие региональные decision registries после реформы;
3. еще одну крупную территорию с отдельными application/result surfaces.

Критерий остается строгим:

`NATIVE_EPGU_CONFIRMED_REFUSAL`

требует официального доказательства, что исходная заявка подана после `01.03.2026` через новый контур, а затем по ней опубликован именно отказ.

## 2. Сибирское межрегиональное управление — самый сильный channel-labelled control

Официальный источник:

https://rpn.gov.ru/regions/54/gov-services/complex-eco-approval/

Эта страница особенно ценна тем, что текстом различает:

- старые заявки, `поступившие посредством государственной информационной системы промышленности`;
- новые заявки, `поступившие посредством Федеральной государственной информационной системы «Единая система предоставления государственных и муниципальных услуг (сервисов)»`.

### 2.1 Объект `50-0154-001294-П`, ПАО «ОАК», Производственная площадка №1

Наблюдаемая официальная последовательность:

- старая заявка до реформы — через ГИСП;
- `20.03.2026` — опубликован отказ в выдаче КЭР; сам текст отказа прямо говорит, что заявка поступила через ГИСП;
- `17.04.2026` — новая заявка на получение КЭР, № `КПред-000115-1`, поступила через новую федеральную систему;
- `20.04.2026` — публичное уведомление о принятии этой заявки;
- `18.06.2026` — еще одна заявка на тот же объект, № `КПред-000361-1`, также прямо помечена как поступившая через новую федеральную систему.

Это дает сильный контроль:

`LEGACY_GISP_REFUSAL -> NATIVE_EPGU_REAPPLICATION -> NATIVE_EPGU_REAPPLICATION`

Но на текущей публичной странице не найден последующий опубликованный refusal outcome для этих native-заявок.

Следовательно старый мартовский отказ нельзя использовать как native refusal.

### 2.2 Объект `50-0154-001693-П`, Северный участок Колыванского угольного разреза

- `05.05.2026` — заявка на пересмотр КЭР № `КПрсм-000094-1`;
- публичное уведомление `07.05.2026`;
- текст прямо указывает поступление через новую федеральную систему.

Последующий native refusal по этой заявке в текущей публичной хронологии не нормализован.

### 2.3 Контрольный legacy refusal на той же странице

`13.05.2026` опубликован отказ в пересмотре КЭР по объекту `52-0155-000461-П`.

Сам официальный текст прямо говорит, что соответствующая заявка поступила посредством ГИСП.

То есть даже майский decision date может быть legacy.

### 2.4 Вывод по Сибири

`NATIVE_EPGU_APPLICATION_FLOW = CONFIRMED`.

`NATIVE_EPGU_REFUSAL_FLOW = NOT CONFIRMED IN CURRENT CHANNEL-LABELLED SAMPLE`.

Дополнительный риск: текущая публичная хронология на странице в 2026 видимо заканчивается уведомлением `18.06.2026`, поэтому отсутствие позднего outcome нельзя интерпретировать как отсутствие решения в реальности.

Это одновременно отрицательный сигнал и по K1, и по K2:

- native applications существуют;
- refusal frequency не показана;
- lifecycle closure по региональной странице неполон.

## 3. Уральское межрегиональное управление — current registry survives, row-level visibility poor

Официальный источник:

https://rpn.gov.ru/regions/66/gov-services/complex-eco-approval/

На current page опубликован:

`Реестр принятых решений по комплексным экологическим разрешениям`

- формат: XLSX;
- размер: `52.94 Kb`;
- timestamp: `17.08.2026 13:25`.

Opera Browser Connector раскрыл прямой официальный attachment URL:

`https://rpn.gov.ru/upload/iblock/eea/4zbt3sk60agt5p5fqyglqeqvkjoteoic/Reestr_prinyatykh_reshenii_po_KER_2.xlsx`

В текущем research environment row-level bytes этого attachment получить не удалось.

Значит:

- current decision registry после реформы существует;
- из одного metadata нельзя честно выводить refusal count;
- для продукта такой territory требует отдельного binary ingestion path, а не HTML parser.

Classification:

`CURRENT_DECISION_REGISTRY_EXISTS__ROW_LEVEL_NATIVE_REFUSAL_COUNT_NOT_OBSERVED`.

## 4. Нижне-Волжское управление — registry жив и обновляется до сентября

Официальный источник:

https://rpn.gov.ru/regions/34/gov-services/complex-eco-approval/

Web index показывал snapshot:

`Реестр решений о выдаче, отказе КЭР на 01.09.2026`.

Live Opera Browser Connector показал еще более свежий attachment:

`Реестр решений о выдаче, отказе КЭР на 14.09.2026`

- формат: XLSX;
- размер: `24.67 Kb`;
- timestamp: `14.09.2026 13:42`;
- официальный URL:

`https://rpn.gov.ru/upload/iblock/118/vo5697hccjm96mv6y4idl2i6gqm2dkn0/Reestr-resheniy-KER-na-14.09.2026.xlsx`

Rows в текущем research environment не извлечены.

Вывод:

`POST_REFORM_REGISTRY_MAINTENANCE = PASS`.

Но:

`NATIVE_REFUSAL_RATE = UNKNOWN`.

И снова источник требует XLSX ingestion.

## 5. Москва / Калуга — publication surface практически обрывается на migration boundary

Официальный источник:

https://rpn.gov.ru/regions/77/gov-services/complex-eco-approval/

Раздел `Поступившие (принятые к рассмотрению) заявки на получение комплексного экологического разрешения` публикует длинную историю заявок до 2026.

Последние видимые публикации:

- ООО «Калужский областной водоканал» — `23.01.2026`;
- АО «Институт пластмасс им. Г.С. Петрова» — `13.02.2026`;
- ООО «Первый завод» — `13.02.2026`;
- ОАО «Стройполимеркерамика» — `24.02.2026`;
- АО РИР — `27.02.2026`;
- ГУП Мосводосток — publication `03.03.2026`.

Для последней строки exact original submission date в текущем evidence не доказана.

После этого current indexed application surface не показывает продолжающийся поток, сопоставимый с 2024–2025.

Отдельный раздел `Информация о принятых решениях по заявкам на КЭР` существует, но current indexed/Opera representation не дало row-level decision chronology, пригодной для расчета native refusal rate.

Это не доказательство отсутствия заявок/решений.

Это доказательство:

`REGIONAL_PUBLIC_SURFACE_NOT_RELIABLE_AS_COMPLETE_POST_REFORM_DENOMINATOR`.

## 6. Broad exact-phrase control

Был выполнен bounded search по официальному домену Росприроднадзора по комбинациям:

- `отказ в выдаче КЭР`;
- explicit new-system wording `Единая система предоставления государственных и муниципальных услуг (сервисов)`;
- identifiers family `КПред-*`;
- 2026.

Результат:

- найдены native applications, особенно на Сибирской странице;
- найдены многочисленные отказные решения 2026;
- найденные отказные решения с явным channel label в проверенной выборке продолжали указывать ГИСП / legacy;
- явный `native EPGU application -> refusal` exact pair в bounded indexed search не установлен.

Это не universal absence claim.

Search-index completeness недостаточна, особенно для XLS/XLSX/DOCX surfaces.

Но отсутствие даже одного легко находимого strict native pair после нормализации нескольких территорий является отрицательным сигналом для продукта, которому нужен регулярный fresh feed.

## 7. Что теперь доказано и что нет

### Доказано

1. Residual population предприятий без КЭР в 2026 существенна.
2. Native post-01.03 EPGU applications реально существуют.
3. Refusal publication as a legal/public event не исчезла.
4. Post-reform territorial decision registries продолжают обновляться.
5. Исторические/legacy refusals могут быть ценными high-ticket remediation leads.
6. Региональные источники существенно фрагментированы: HTML, RTF, DOC/DOCX, XLS/XLSX, long chronology.
7. Calendar `decision_date` нельзя использовать как migration classifier.

### НЕ доказано

1. Economically sufficient number fresh unique `NATIVE_EPGU_CONFIRMED_REFUSAL` companies per month.
2. Национальный post-reform refusal rate.
3. Complete territorial publication coverage.
4. Reliable lifecycle close-out from regional pages without central KND registry access.
5. That native refusals occur often enough to support a standalone nationwide refusal-lead subscription.

## 8. Updated K1 / K2

### K1 — steady-state volume

Current:

`FAIL_FOR_PROMOTION__NATIVE_APPLICATIONS_CONFIRMED__NATIVE_REFUSAL_VOLUME_NOT_DEMONSTRATED`

This is not yet `KILL_FOR_ZERO_VOLUME` because row-level fresh XLSX registries remain unaudited.

But it is enough to stop calling volume merely `OPEN` while keeping the candidate PROMISING.

### K2 — publication coverage / freshness

Current:

`FAIL_FOR_PROMOTION__PUBLICATION_SURVIVES__BUT_COMPLETE_NORMALIZED_POST_REFORM_FEED_NOT_OBSERVED`

Source fragmentation can be an implementation moat only after the market signal is sufficiently dense. It cannot compensate for a potentially sparse event class.

## 9. Candidate decision

Downgrade canonical research status from:

`PROMISING_R4__PUBLIC_FAILED_MANDATORY_KER_EVENTS__HIGH_TICKET_REMEDIATION_LEADS__STEADY_STATE_VOLUME_AND_CONVERSION_OPEN`

to:

`HOLD_HIGH__HIGH_VALUE_FAILURE_SIGNAL_EXISTS__NATIVE_POST_REFORM_REFUSAL_VOLUME_NOT_DEMONSTRATED__SOURCE_COMPLETENESS_FRAGMENTED`

Why HOLD_HIGH rather than immediate KILL:

- one normalized refusal can still represent a high-ticket service opportunity;
- fresh decision registries clearly exist in 2026;
- two important current XLSX registries remain row-unread in the current environment;
- central current KND register is technically inaccessible in this research environment;
- nationwide volume cannot be inferred from a few territories.

Why no longer PROMISING:

- the initial apparent 2026 refusal abundance was materially contaminated by pre-reform applications;
- strongest exact-date territory (Komi) shows many native applications but no listed native formal refusal;
- strongest explicit-channel territory (Siberia) shows native applications but normalized visible refusal examples are legacy GISP;
- source completeness after migration is inconsistent enough that a reliable denominator itself becomes nontrivial.

## 10. Next action

Do NOT build product and do NOT run buyer outreach.

KER research is parked at `HOLD_HIGH` until one of two reopen conditions appears:

1. legitimate row-level access to current territorial decision registries / central KND allows a broader native refusal count and proves useful monthly volume; or
2. official 2026+ national statistics explicitly report post-reform application/refusal counts sufficient to validate K1.

Without one of those, additional manual hunting through legacy regional pages has diminishing value.

Next broad product-search pass, when resumed, should preserve the owner-access methodology and should not treat a deadline-wave historical corpus as steady-state demand.