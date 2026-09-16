# B1 — Unified 1C/HRIS API for Russian SaaS

Дата закрытия: 2026-09-16.

Статус: `KILL__STANDARD_LAYER_COMMODITIZED__HIGH_VALUE_LAYER_BECOMES_CUSTOM_INTEGRATION`

## Идея

Российский Finch/Codat-like developer API:

`один canonical API -> 1С:ЗУП / Saby / другие российские HR/accounting systems -> normalized Employee / Organization / Payroll / related data`.

## Почему идея закрыта

Прямой российский Finch в bounded search не найден, но market structure плох для нового standalone SaaS.

### 1. 1С сама уже двигается в canonical-integration layer

`1С:Интеграция КОРП` прямо использует:

- каноническую модель данных;
- правила конвертации в каноническую модель;
- универсальный коннектор 1С;
- транспортный слой;
- интеграцию с внешними системами.

Sources:
- https://solutions.1c.ru/catalog/integracorp/features

Это фундамент normalized integration, причём у самого владельца экосистемы.

### 2. DATAREON уже закрывает reusable connectivity layer

DATAREON Platform имеет сертифицированную 1С-подсистему, встраиваемую без снятия с поддержки, REST/TCP, очереди, обработчики, внешние типы данных и настраиваемые API.

Sources:
- https://datareon.ru/solution/datareon-platform/functionality/
- https://docs-platform.datareon.ru/administrator/external/1c_system.html

### 3. Saby уже публикует object-level mapping и API

Saby документирует соответствие собственных employee/organization объектов объектам и полям 1С:ЗУП и расширяет массовые API для сотрудников, подразделений и должностей.

Sources:
- https://saby.ru/help/staff_management/integration/1C/match
- https://link.saby.ru/page/kbase_entity/bab81fe7-c522-461b-ae43-8b0a8413507d

### 4. Главный structural problem: standard case is easy, valuable case is custom

HRBP publicly states:

- for standard 1С:ЗУП 3.1 it uses a ready endpoint set;
- Enterprise integration is individually configured taking customer 1C specifics into account.

Source:
- https://hrbp.ru/blog/integratsiya-hr-platformy-s-1c-zachem-i-kak

Large Russian implementations also show custom projects with several systems/teams/processes rather than plug-and-play normalization.

Therefore the market splits badly:

`standard configuration -> ready modules/APIs already exist and are cheap`

`large valuable enterprise -> custom objects/processes/configurations -> implementation project`.

A new unified API would either compete with native/established integration infrastructure on commodity cases or inherit project-heavy customization on high-ACV cases.

## Albato distinction

Albato Embedded is not exact Finch: it embeds an iPaaS/automation layer, not a canonical employee/payroll model. This initially left a possible gap.

However the deeper 1C/Saby/Datareon/1C:Integration Corp evidence is sufficient to reject the generic opportunity despite that distinction.

## DATA_TRUST_GATE

HR/payroll/accounting data is highly sensitive. A centralized normalized API would need strong local/VPC/on-prem architecture. This raises implementation and trust cost precisely in the enterprise segment where custom 1C configurations are most common.

## Reopen condition

Do not reopen generic `Finch/Codat for Russian 1C` unless a narrower domain shows all of:

- highly standardized source objects across customers;
- repeated integrations by many independent SaaS vendors;
- no native/canonical platform covering the objects;
- low customization per customer;
- clear willingness to pay for API abstraction instead of an integration project.

Final: `KILL__STANDARD_LAYER_COMMODITIZED__HIGH_VALUE_LAYER_BECOMES_CUSTOM_INTEGRATION`.