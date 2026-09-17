# KER Refusal Remediation — Pass 2 Correction: Native EPGU Classification

Дата: 2026-09-17

Исправляет:

`research/evidence/ker_refusal_remediation_post2026_registry_steady_state_pass_2_2026-09-17.md`

Статус:

`CORRECTION__POST_REFORM_DECISION_DATE_DOES_NOT_PROVE_NATIVE_EPGU_APPLICATION__KULTUMINSKOE_RECLASSIFIED_LEGACY_CARRYOVER`

## Причина исправления

В Pass 2 была сделана слишком сильная интерпретация двух уведомлений Забайкальского межрегионального управления:

- `04.03.2026 №294` было ошибочно приписано ООО «КУЛТУМИНСКОЕ»;
- `14.04.2026 №295` затем было использовано как будто это отказ по заявке, принятой уже после реформы 01.03.2026.

Более точная официальная индексация страницы показывает другое.

## Корректная последовательность

На официальной странице Забайкальского межрегионального управления:

- `25.02.2026 №292` — уведомление о приеме к рассмотрению заявки ООО «КУЛТУМИНСКОЕ» на пересмотр КЭР по объекту `76-0275-003539-П`;
- `03.03.2026 №293` — уведомление о приеме заявки ООО «Рудное», объект `81-0175-001990-П`;
- `04.03.2026 №294` — уведомление о приеме заявки ПАО «ППГХО»;
- `14.04.2026 №295` — отказ ООО «КУЛТУМИНСКОЕ» в пересмотре КЭР по объекту `76-0275-003539-П`;
- `06.05.2026 №296` — отказ по доработанной заявке для объекта `76-0175-001238-П` «Очистные сооружения (ОС)»; исходная дата подачи в текущем evidence не установлена.

Официальный источник:

https://rpn.gov.ru/regions/75/gov-services/complex-eco-approval/

## Исправленная классификация

### ООО «КУЛТУМИНСКОЕ»

`LEGACY_GISP_CARRYOVER`

Почему:

- принятие заявки на пересмотр произошло `25.02.2026`, до перехода новых заявок на ЕПГУ;
- отказ `14.04.2026` является post-reform decision date, но не native post-reform application.

### ООО «Рудное»

`POST_REFORM_ACCEPTANCE_NOTICE__SUBMISSION_DATE_UNKNOWN`

Почему:

- уведомление о приеме датировано `03.03.2026`;
- exact submission/registration date пока не восстановлена;
- acceptance date alone нельзя использовать как доказательство, что заявка впервые подана после 01.03.2026.

### ПАО «ППГХО»

`POST_REFORM_ACCEPTANCE_NOTICE__SUBMISSION_DATE_UNKNOWN`

По той же причине.

### Object `76-0175-001238-П`

`POST_REFORM_REFUSAL__SUBMISSION_DATE_UNKNOWN__DORABOTANNAYA_APPLICATION`

Формулировка `доработанной заявки` дополнительно делает legacy carry-over/rework вероятным; считать этот refusal native EPGU нельзя без исходной даты подачи.

## Методологическое правило

С этого момента запрещена классификация:

`decision_date > 2026-03-01 => NATIVE_EPGU`

и также запрещена классификация:

`acceptance_notice_date > 2026-03-01 => NATIVE_EPGU`

Для `NATIVE_EPGU_CONFIRMED` нужен хотя бы один официальный факт:

1. exact application/submission/registration date > `2026-03-01`; либо
2. официальный источник прямо указывает, что заявление подано через ЕПГУ после перехода; либо
3. иной однозначный current-source evidence, исключающий pre-01.03 legacy carry-over.

Все остальные случаи должны храниться как:

- `LEGACY_GISP_CARRYOVER`;
- `POST_REFORM_DECISION__SUBMISSION_UNKNOWN`;
- `POST_REFORM_ACCEPTANCE_NOTICE__SUBMISSION_DATE_UNKNOWN`.

## Влияние на Pass 2

Сильный вывод Pass 2 корректируется.

Остается доказанным:

- территориальные публичные поверхности продолжают обновляться после 01.03.2026;
- отказные решения продолжают публиковаться после даты реформы;
- residual population без КЭР в 2026 остается большой;
- publication layer как таковой не исчез.

Больше НЕ считается доказанным на основании КУЛТУМИНСКОГО:

- наличие native EPGU refusal-flow.

K1 следует трактовать строже:

`PARTIAL_PASS__RESIDUAL_NEED_HIGH__NATIVE_POST_REFORM_REFUSAL_RATE_OPEN_AND_POSSIBLY_LOW`

K2:

`PARTIAL_PASS__PUBLICATION_SURFACES_PERSIST__NATIVE_CLASSIFICATION_REQUIRES_SUBMISSION_DATE__CENTRAL_STATUS_ACCESS_OPEN`

## Следующий обязательный шаг

Собрать отдельный strict corpus, где каждая строка имеет явное поле:

- `submission_date`;
- `decision_date`;
- `migration_class`;
- `outcome`;
- `current_status_evidence`.

Не смешивать legacy carry-over с native post-01.03 applications при расчете steady-state refusal frequency.