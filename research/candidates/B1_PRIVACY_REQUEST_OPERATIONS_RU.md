# B1 — Privacy Request / Consent Operations for Russia

Дата закрытия: 2026-09-16

Статус: `KILL__DIRECT_RUSSIAN_ENTERPRISE_PRODUCT_EXISTS_AND_SMB_LAYER_IS_FILLING`

## Идея

Российский DataGrail/Transcend-like operational layer:

`запрос субъекта ПДн / отзыв согласия -> верификация -> дедлайн -> задачи по системам -> исправление/блокирование/удаление/прекращение обработки -> ответ -> журнал доказательств`.

Не cookie banner и не генератор юридических документов.

## Что подтвердилось

Боль и legal workflow реальны.

Федеральный закон № 152-ФЗ предусматривает права субъекта на доступ, уточнение, блокирование и уничтожение персональных данных. Оператор должен предоставлять сведения по запросу в установленный срок, исправлять/уничтожать подтверждённо неточные или лишние данные и прекращать обработку по требованиям/отзыву в случаях, предусмотренных законом.

Источники:

- https://www.consultant.ru/document/cons_doc_LAW_61801/34585db685164ddd73440bf08348903bff6715aa/
- https://www.consultant.ru/document/cons_doc_LAW_61801/7aeb0acd5aa76dbc888a07e52ca06a92568c6e96/
- https://www.consultant.ru/document/cons_doc_LAW_61801/d3fe43a7c415353b17faab255bc0de92bea127da/

## Причина KILL — direct Russian enterprise product

Security Vision уже продаёт `Security Vision ПДн (Personal Data Protection)` как единый operational contour для 152-ФЗ.

Публично заявлены:

- учёт ИСПДн;
- управление согласиями;
- контроль отзывов;
- журнал запросов и обращений субъектов ПДн;
- фиксация сроков;
- постановка задач исполнителям;
- хранение доказательств уведомлений/отзывов;
- документация/отчётность для регулятора.

Источник:

- https://www.securityvision.ru/products/pdn/

Это exact workflow candidate, а не adjacent DLP/SIEM.

## SMB/CMS layer тоже быстро заполняется

### SenDev: 152-ФЗ для 1С-Битрикс

Текущий модуль уже содержит:

- consent registry/versioning;
- cookie/script consent;
- retention policies + auto cleanup;
- личный кабинет субъекта;
- отзыв согласия;
- запрос на удаление;
- дедлайны/акт удаления;
- REST API;
- журнал инцидентов;
- документы для Роскомнадзора;
- audit/integrity controls.

Источник:

- https://marketplace.1c-bitrix.ru/solutions/sendev.personaldata/

### Согласия24 для Bitrix24

Опубликовано 02.09.2026. Уже даёт:

- реестр согласий по человеку/цели/сроку;
- версии текста и источник;
- отзыв/истечение;
- автоматические проверки перед рассылкой/обзвоном;
- уведомления;
- выгрузку реестра;
- хранение данных внутри Bitrix24 portal.

Источник:

- https://www.bitrix24.ru/apps/app/intelmediasoft.soglasiya24/

## Почему не спасает формулировка «сделаем проще Security Vision»

Стратегия B ищет реальный gap, а не менее функциональную копию существующего enterprise product.

Рынок уже зажат:

- enterprise/compliance operations — Security Vision;
- website/CMS operations — SenDev and similar modules;
- CRM consent layer — new Bitrix24 apps.

Чтобы создать отдельный moat, пришлось бы либо идти глубже в GRC/PIMS, либо строить многочисленные connectors к CRM/ERP/marketing/support systems. Это тяжёлый security/compliance рынок с высоким data-trust burden.

## Gates

Owner-verifiability могла быть хорошей для workflow/deadlines, но legal correctness remains external-expert sensitive.

DATA_TRUST_GATE высокий: полноценный cross-system request product получает доступ к персональным данным во многих systems.

Это дополнительно ухудшает fit для small-team startup.

## Не возвращаться как

- Russian DataGrail / Transcend;
- DSAR automation for 152-FZ;
- consent withdrawal workflow;
- subject access/deletion request tracker;
- privacy request portal;

без принципиально нового buyer/workflow, который не закрывается Security Vision / Bitrix ecosystem.

## Final status

`KILL__DIRECT_RUSSIAN_ENTERPRISE_PRODUCT_EXISTS_AND_SMB_LAYER_IS_FILLING`

Потребность реальна, но Russian market gap уже закрывается одновременно сверху и снизу.