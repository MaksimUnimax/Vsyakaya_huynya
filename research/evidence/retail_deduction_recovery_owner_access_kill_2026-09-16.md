# Retail Deduction Recovery — Owner-Access Kill Test

Дата: 2026-09-16

Итог:

`KILL__CORE_EVIDENCE_NOT_PUBLICLY_ACCESSIBLE__PRODUCT_CANNOT_BE_VALIDATED_OR_OPERATED_FROM_OWNER_SIDE_WITHOUT_SUPPLIER_DATA`

## Причина пересмотра

Предыдущий research корректно установил, что EDI providers технически хранят/передают нужную цепочку `ORDERS -> ORDRSP -> DESADV -> RECADV` и что supplier с соответствующими правами может выгрузить историю через UI/API/ERP integration.

Но это было ошибочно интерпретировано как достаточный DATA_ACCESS signal для нашей product thesis.

Ключевой вопрос владельца продукта должен быть строже:

> Если у нас сейчас нет клиента, нет договора с сетью, нет кабинета EDI и нет данных поставщика, можем ли мы сами получить достаточные реальные данные, чтобы проверить, запустить и демонстрировать core workflow?

Ответ: **нет**.

## Что доступно нам публично

Без supplier participation доступны только вторичные/справочные данные:

- законодательство и разъяснения;
- публичные правила/инструкции сетей, если опубликованы;
- судебные решения и отдельные dispute examples;
- документация EDI providers;
- описание форматов ORDERS/ORDRSP/DESADV/RECADV;
- публичные product/API docs.

Этого достаточно, чтобы доказать существование problem class и техническую реализуемость в принципе.

Этого **недостаточно**, чтобы выполнить core product job для конкретного штрафа.

## Что требуется для core workflow и недоступно нам без клиента

Для одного реального штрафа нужны минимум:

1. фактический retailer `ORDERS`, включая версии/изменения;
2. supplier `ORDRSP`;
3. `DESADV` фактической отгрузки;
4. `RECADV` фактической приемки;
5. сам penalty/deduction document;
6. retailer/order/shipment/SKU linking identifiers;
7. применимая договорная/сетевая формула штрафа;
8. для ground truth — исторический исход оспаривания/удержания.

Эти данные находятся в закрытом контуре supplier / retailer / EDI provider / ERP и не являются общедоступным market dataset.

## Почему API Ediweb/Saby/Kontur не спасает thesis

Наличие API означает только:

`авторизованный клиент может читать свои документы`.

Оно не означает:

`мы как независимый новый SaaS можем получить документы любого поставщика`.

Для доступа нам всё равно нужен существующий supplier, его согласие, его account/license/exports и организационный onboarding.

То есть первый useful result нельзя получить owner-side до продажи/партнерства/передачи закрытых данных.

## "Два человека с ноутбуком" test

Исходное состояние:

- нет supplier-клиента;
- нет retailer account;
- нет EDI account;
- нет 1C/ERP доступа;
- нет исторического penalty corpus.

Мы можем:

- изучить правила;
- написать parser;
- создать synthetic fixtures;
- показать demo на выдуманных данных.

Мы **не можем**:

- обнаружить реальный штраф;
- проверить его по реальной цепочке заказа;
- доказать ошибку;
- посчитать фактический recoverable RUB;
- показать independent real-world value до передачи данных поставщиком.

Это нарушает owner-accessibility/product-validation requirement текущего Strategy B поиска.

## Почему outreach не является достаточным ответом

Теоретически можно cold-outreach поставщиков и просить historical exports.

Но тогда сама возможность проверить product thesis зависит от того, что незнакомая компания:

- ответит;
- имеет material штрафы;
- согласится передать коммерчески чувствительную EDI history;
- даст договорные правила;
- позволит связать штрафы с заказами;
- предоставит outcomes.

Это не просто обычный sales friction. Без такого cooperation у продукта отсутствует исходный рабочий материал.

В текущем поиске владелец явно требует идеи, которую можно начать/проверить с доступными нам данным и инструментами, а не идеи, где сначала нужно убедить поставщика открыть закрытую operational history.

## Final decision

Retail Deduction Recovery больше не active survivor.

Статус:

`KILL__CORE_EVIDENCE_NOT_PUBLICLY_ACCESSIBLE__CUSTOMER_DATA_REQUIRED_BEFORE_VALUE_CAN_BE_PROVEN`

Не возобновлять как active candidate только на основании того, что EDI provider имеет API/export.

Reopen допускается лишь при появлении структурного источника данных, доступного новому продукту без индивидуального предварительного supplier trust/onboarding (например, официального partner/data program с reusable access), либо если у владельца уже есть реальный supplier data source.

## Method correction for future candidates

DATA_ACCESS gate теперь разделять на два разных вопроса:

1. `TECHNICAL_EXISTENCE`: данные вообще существуют и machine-readable?
2. `OWNER_ACCESSIBILITY`: можем ли **мы** получить необходимые реальные данные на старте без уже приобретенного клиента/закрытого кабинета/ручной передачи sensitive history?

PASS по первому не означает PASS по второму.

Кандидат, чей core value нельзя доказать без private customer data, должен получать сильный downgrade/KILL, если у нас нет реалистичного pre-existing access path.
