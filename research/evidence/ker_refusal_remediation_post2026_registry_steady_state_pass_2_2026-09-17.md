# KER Refusal Remediation — Post-2026 Registry / Steady-State Pass 2

Дата: 2026-09-17

Связанный кандидат:

`research/candidates/R4_KER_REFUSAL_REMEDIATION_LEADS_RU.md`

Связанный предыдущий pass:

`research/evidence/ker_refusal_remediation_normalization_pass_1_2026-09-16.md`

Статус:

`PASS_2__POST_DEADLINE_NEED_PERSISTS__POST_2026_PUBLIC_REFUSAL_LAYER_SURVIVES__CENTRAL_CURRENT_STATUS_LOOKUP_BLOCKED_IN_CURRENT_ENVIRONMENT__FRESH_REFUSAL_VOLUME_STILL_OPEN`

## Цель

Закрыть два риска, оставшиеся после Normalization Pass 1:

1. исчез ли публичный refusal-event после перехода КЭР на ЕПГУ с 01.03.2026;
2. не схлопнулась ли сама проблема после дедлайнового пика 2024–2025.

Отдельно проверить, можно ли честно ставить конкретному отказному лиду статус `UNRESOLVED_TODAY`.

## 1. Процесс после 01.03.2026 — подтверждено

Официальные страницы Росприроднадзора подтверждают:

- с 01.03.2026 новые заявки на предоставление КЭР, продление, пересмотр и изменения подаются через ЕПГУ;
- ГИСП больше не используется для новых заявок и оставлен только для доработки материалов по заявкам, поданным до 01.03.2026;
- реестр выданных КЭР перенесен в публичную часть реестра лицензий/разрешений `knd.gov.ru/licenses-registry`;
- ранее выданным КЭР автоматически присвоены новые номера формата `Р068-00113-xx/xxxxxxxx`.

Официальные источники:

- https://rpn.gov.ru/regions/16/news/s-01-03-2026-vstupili-v-silu-izmeneniya-vnesennye-postanovleniem-pravitelstva-ot-28-11-2025-1946-5970121.html
- https://rpn.gov.ru/regions/63/news/ob-izmenenii-poryadka-predostavleniya-kompleksnykh-ekologicheskikh-razresheniy-5967539.html
- https://rpn.gov.ru/regions/16/gov-services/complex-eco-approval/

## 2. Критическая проверка: публичный refusal-layer после реформы НЕ исчез

Это важнее самого переноса реестра.

Актуальные страницы территориальных управлений Росприроднадзора прямо описывают правило:

- отказ в выдаче разрешения размещается в информационной системе и на официальном сайте;
- в день принятия решения о выдаче/продлении/пересмотре/изменении либо об отказе территориальный орган размещает информацию о принятом решении на официальном сайте и в информационной системе.

Приокское управление одновременно указывает новый способ получения услуги через ЕПГУ и сохраняет формулировку о публикации отказа на официальном сайте.

Официальные источники:

- https://rpn.gov.ru/regions/29/gov-services/complex-eco-approval/
- https://rpn.gov.ru/regions/71/gov-services/complex-eco-approval/

Следовательно переход `ГИСП -> ЕПГУ` сам по себе не превращает отказ в private-only event.

## 3. Фактические post-reform публикации 2026

### Забайкальское межрегиональное управление

На текущей официальной странице одновременно видны:

- уведомление от `04.03.2026 №294` о приеме к рассмотрению заявки ООО «КУЛТУМИНСКОЕ» по объекту `76-0275-003539-П`;
- уведомление от `14.04.2026 №295` об отказе в пересмотре КЭР по тому же объекту.

Это прямое доказательство, что после 01.03.2026 территориальная публичная поверхность продолжает публиковать отрицательные КЭР-события.

Source:

https://rpn.gov.ru/regions/75/gov-services/complex-eco-approval/

### Западно-Уральское управление

Текущая таблица решений за 2026 содержит, среди прочего:

- ООО «КАМА» — отказ `20.01.2026`;
- МУП ЖКХ — выдача `10.03.2026`;
- ООО «Чистый город» — пересмотр `17.03.2026`;
- ООО Завод «БУММАШ» — отказ `06.04.2026`.

То есть публичная таблица не остановлена на 28.02.2026 и содержит решение об отказе после перехода на ЕПГУ.

Source:

https://rpn.gov.ru/regions/59/gov-services/complex-eco-approval/

### Нижне-Волжское управление

На текущей странице опубликован файл:

`Реестр решений о выдаче, отказе КЭР на 01.09.2026`

а также предыдущий snapshot от `17.03.2026`.

Это подтверждает продолжение поддержки регионального реестра решений после реформы. Содержимое XLSX в текущем исследовательском окружении не было извлечено, поэтому из одного имени файла нельзя выводить число отказов после марта.

Source:

https://rpn.gov.ru/regions/34/gov-services/complex-eco-approval/

### Северное межрегиональное управление

Текущая официальная страница продолжает публиковать сами решения и refusal reason class по конкретным компаниям/объектам, включая многочисленные `отказано в выдаче КЭР` и последующие повторные заявки/выдачи.

Source:

https://rpn.gov.ru/regions/29/gov-services/complex-eco-approval/

## 4. Важное ограничение: не смешивать legacy carry-over и native post-01.03 flow

Часть отказов марта–мая 2026 на региональных страницах относится к заявкам, поданным ДО 01.03.2026 и дорабатываемым в старом контуре ГИСП.

Примеры на странице Крым/Краснодар:

- ООО «СТРОЙДИЗАЙН»: заявка 18.12.2025 -> отказ 02.03.2026;
- ООО «Универсал»: заявка 26.12.2025 -> отказ 27.02.2026;
- ООО «НПП ЭКОБИО»: заявка 09.02.2026 -> отказ 14.04.2026;
- ООО «КРЫМГАЗПРОМ»: заявка 28.02.2026 -> повторный отказ 18.05.2026.

Поэтому метрика `отказы с decision_date > 01.03.2026` НЕ равна метрике `native EPGU-era refusals`.

Для steady-state корпуса эти две группы нужно хранить отдельно:

- `LEGACY_GISP_CARRYOVER`;
- `POST_2026_EPGU_NATIVE_OR_CURRENT`.

Source:

https://rpn.gov.ru/regions/23/gov-services/complex-eco-approval/

## 5. Post-deadline need не исчез

Официальная статистика Росприроднадзора на начало 2026:

- объектов I категории в госреестре: `5,074`;
- обязаны иметь КЭР: `5,041`;
- КЭР получены к концу 2025: `3,716`;
- это `74%`.

Следовательно на конец 2025 порядка `1,325` обязанных объектов еще не имели КЭР.

Source:

https://rpn.gov.ru/press/news/74_obektov_poluchili_kompleksnye_ekologicheskie_razresheniya/

Отдельно Росприроднадзор объявил второй этап кампании на 2026:

- `348` предприятий;
- `522` объекта НВОС;
- проверки с февраля по ноябрь 2026.

Source:

https://rpn.gov.ru/press/news/po_porucheniyu_pravitelstva_rosprirodnadzor_proverit_348_predpriyatiy_ne_poluchivshikh_ker/

К 28.04.2026 Росприроднадзор сообщал уже о контрольной работе по `866` объектам / `667` предприятиям, которые не подали заявки в срок.

Source:

https://rpn.gov.ru/press/news/rosprirodnadzor_vyyavil_bolee_1_5_tys_narusheniy_po_itogam_proverok_i_profvizitov_na_predpriyatiya_b/

И даже 27.08.2026 Нижегородское/Мордовское управление сообщало, что КЭР по-прежнему не получили `13` предприятий Нижегородской области и еще `2` в Мордовии.

Source:

https://rpn.gov.ru/regions/52/news/v-deyatelnosti-borskogo-proizvoditelya-udobreniy-vyyavleny-narusheniya-ekologicheskikh-trebovaniy-5994737.html

Вывод:

`POST_DEADLINE_PROBLEM_PERSISTS = PASS`.

Но это НЕ доказывает количество новых отказов в месяц и не является TAM refusal-feed продукта.

## 6. Ground truth: refusal может оставаться unresolved много месяцев

Байкальская официальная страница публикует:

- ООО «Геолог» — отказ `24.01.2025`;
- ООО «Геолог» — повторный отказ `27.05.2025`;
- АО «Спецавтохозяйство» г. Иркутска — отказ `14.08.2025`.

Source:

https://rpn.gov.ru/regions/38/govservices/complex-eco-approval/

25.12.2025 то же управление отдельно сообщило, что среди предприятий, по объектам которых КЭР до настоящего времени не получено, находятся:

- ООО «Геолог»;
- ООО «Техноконсалт»;
- АО «Спецавтохозяйство» города Иркутска.

Source:

https://rpn.gov.ru/regions/38/news/rukovoditel-upravleniya-oksana-kurek-provodit-soveshchaniya-s-yuridicheskimi-litsami-po-voprosam-pol-5960479.html

Это дает как минимум два прямых refusal -> still-no-KER ground-truth примера и подтверждает, что у части отказов remediation window измеряется месяцами, а не днями.

## 7. Central current-status crosscheck — пока технически BLOCKED в нашем окружении

Официальный публичный реестр выданных КЭР после 01.03.2026 находится по адресу:

https://knd.gov.ru/licenses-registry

В текущем исследовательском окружении:

- прямое открытие route завершилось timeout;
- Opera Browser Connector не смог перейти на route;
- старая вкладка GISP возвращает `Forbidden`;
- поисковая индексация не дала надежного per-object substitute для текущего реестра.

Это НЕ означает, что официальный реестр закрыт юридически или недоступен обычному пользователю.

Это означает только:

`CURRENT_RESEARCH_ENVIRONMENT_CANNOT_RELIABLY_CROSSCHECK_CURRENT_ISSUED_STATUS`.

## 8. Исправление classifier policy

После 01.03.2026 нельзя использовать:

`refusal visible + no later issue on the same territorial page = unresolved today`.

Без рабочего current-status crosscheck default должен быть:

`REFUSAL_CONFIRMED__CURRENT_KER_STATUS_CROSSCHECK_REQUIRED`

Допустимые более сильные состояния:

- `REFUSAL_CONFIRMED__REAPPLICATION_FOUND` — есть официальная повторная заявка;
- `REFUSAL_CONFIRMED__REPEAT_REFUSAL` — есть официальный повторный отказ;
- `RESOLVED__KER_ISSUED` — есть официальная последующая выдача;
- `CURRENTLY_UNRESOLVED__OFFICIAL_CURRENT_SOURCE` — только если свежий официальный источник прямо говорит, что КЭР у объекта/предприятия сейчас отсутствует.

Нельзя писать prospect-facing фразу:

`mandatory process remains unresolved`

только из-за отсутствия выдачи на старой территориальной странице.

## 9. Gate update

### K1 — steady-state volume

`PARTIAL_PASS__PROBLEM_BASE_PERSISTS__FRESH_REFUSAL_RATE_OPEN`

Доказано:

- большая residual population без КЭР сохранялась после deadline wave;
- контрольная кампания активно продолжается в 2026;
- отдельные свежие отказные решения продолжают публиковаться.

Не доказано:

- национальное число свежих уникальных refusal companies в месяц после стабилизации;
- доля именно native EPGU-era отказов, а не legacy carry-over.

### K2 — publication coverage / freshness

`PARTIAL_PASS__PUBLICATION_DUTY_AND_POST_REFORM_SURFACES_CONFIRMED__COVERAGE_AND_CENTRAL_STATUS_ACCESS_OPEN`

Доказано:

- официальный отказ должен публиковаться на сайте;
- несколько региональных поверхностей живут после 01.03.2026;
- есть post-reform публичные refusal events;
- региональные форматы по-прежнему фрагментированы.

Открыто:

- фактическая completeness всех территорий;
- publication delay на native EPGU-era corpus;
- стабильный автоматизированный доступ к текущему KND register для lifecycle close-out.

## 10. Текущий decision

Кандидат НЕ повышать до GO/pre-pilot buyer outreach.

Текущий общий статус оставить:

`PROMISING_R4__PUBLIC_FAILED_MANDATORY_KER_EVENTS__HIGH_TICKET_REMEDIATION_LEADS__STEADY_STATE_VOLUME_AND_CONVERSION_OPEN`

Но теперь два тезиса стали сильнее:

1. public refusal layer пережил реформу 01.03.2026;
2. post-deadline problem population в 2026 остается существенной.

Следующий bounded pass:

1. собрать отдельный `POST_2026_NATIVE` corpus, не смешивая legacy carry-over;
2. минимум 20 exact current-status lifecycle crosschecks через работающий официальный KND/public source;
3. посчитать уникальные fresh refusal companies/month на post-reform периоде;
4. измерить долю `resolved <=7/30/60 days`;
5. только после этого переходить к owner-authorized buyer test.

Никакого product implementation и никакого outreach на этом этапе.