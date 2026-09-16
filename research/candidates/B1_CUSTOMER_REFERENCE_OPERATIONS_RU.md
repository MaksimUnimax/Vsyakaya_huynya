# B1 — Customer Reference Operations for Russian B2B

Дата закрытия: 2026-09-16

Статус: `KILL__CORE_WORKFLOW_ALREADY_NATIVE_OR_LOW_CODE_IN_RUSSIAN_B2B_CRM`

## Идея

Российский customer reference management / reference operations layer:

`референсные клиенты -> permissions/consent -> industry/product/use-case matching -> request from sales/tender -> owner approval -> cooldown/usage -> call/visit/case/tender reference list -> outcome -> opportunity influence`.

Это не referral program и не обычные отзывы.

## Что подтвердилось — боль реальна

### Референс-визиты реально используются в российских B2B/enterprise продажах

Публичные примеры:

- 1С-Рарус прямо предлагает корпоративным заказчикам организовать референс-визит и отдельно предлагает визиты к клиентам, где внедрены 1С:ERP/1С:ЗУП;
- TopLog WMS организует потенциальным заказчикам референс-визит на склад со схожей отраслевой спецификой;
- HFLabs предлагает референс-визит к своему клиенту, чтобы prospect мог получить обратную связь из первых уст;
- АТП продаёт автоматизированные тендерные платформы и прямо предлагает `Заказать референс-визит`;
- российские интеграторы и поставщики оборудования публикуют референс-листы и дают контакты клиентов для обратной связи.

Источники:

- https://rarus.ru/1c-corp/
- https://rarus.ru/erp/
- https://www.toplogwms.ru/
- https://hflabs.ru/clients
- https://atp.trade/

### Референс-лист — реальный procurement artifact

Свежие закупки 2026 продолжают требовать референс-лист как подтверждение аналогичного опыта.

Особенно важны software/IT examples:

- Медси, закупка Kaspersky — обязательный `референс-лист с указанием аналогичных поставок за предыдущие 3 года`;
- Медси, закупка SCA/SAST software — тот же квалификационный критерий;
- Медси, сопровождение 1С — тот же критерий;
- Bidzaar содержит множество текущих закупок с отдельными шаблонами `Референс-лист`.

Примеры:

- https://bidzaar.com/app/process/light/019f931e-c9f8-7d76-ac51-1834fad1806d
- https://bidzaar.com/app/process/light/01a06678-d303-70aa-9f57-1cca4df88641
- https://bidzaar.com/app/process/light/01a05702-e1b7-75e2-a50a-ee4fa7f78d1b

То есть demand-side thesis не была выдуманной.

## Western category также реальна

ReferenceEdge / Point of Reference, Influitive и другие продукты подтверждают отдельную зрелую категорию customer reference / advocacy management.

ReferenceEdge закрывает registry, matching, request/approval, usage tracking, burnout protection and opportunity/revenue linkage.

Источники:

- https://www.point-of-reference.com/
- https://www.softwareadvice.com/customer-reference-management/

Проблема кандидата не в отсутствии зарубежного спроса.

## Причина KILL №1 — SimpleOne B2B CRM уже вошёл прямо в reference workflow

После более глубокого competitor sweep обнаружен критический факт, отсутствовавший в первоначальном pass.

В первом публичном релизе SimpleOne B2B CRM прямо заявлено:

- управление контентом;
- автоматическое создание `референсов` на основе успешно завершённых потенциальных сделок;
- привязка sales/content entities внутри одной B2B CRM.

Источник:

- https://community.simpleone.ru/t/reliz-simpleone-b2b-crm-1-0-0/519
- https://docs.simpleone.ru/pages/viewpage.action?pageId=91537049

Ещё сильнее production evidence: в кейсе ITGLOBAL.COM среди реализованной CRM-функциональности прямо указано:

`управление клиентским опытом -> база знаний -> типовые кейсы и сценарии -> управление референсами и кейсами`.

Источник:

- https://simpleone.ru/cases/itglobalcom-corporate-sales-automation-with-simpleone-b2b-crm

Это уже не просто generic CRM, в которой теоретически можно добавить поле. Российский enterprise B2B CRM в том же ICP уже имеет reference entity/workflow в продукте/внедрениях.

## Причина KILL №2 — оставшийся governance layer является low-code configuration

Даже если считать, что текущий SimpleOne reference layer не содержит всех функций ReferenceEdge, оставшиеся части нашего V0 не требуют отдельного технического фундамента.

Нужны:

- поля eligibility / industry / product / activity type;
- owner / approver;
- consent/status;
- last-used / usage count / cooldown;
- request stages;
- approve/reject;
- tasks/reminders;
- link to opportunity;
- generation of a tender reference list;
- audit/history/reporting.

### Bitrix24 уже даёт необходимые primitives

Текущая документация Bitrix24 подтверждает:

- произвольные пользовательские поля в смарт-процессах;
- запуск бизнес-процессов из CRM и смарт-процессов;
- multi-step approvals;
- tasks/notifications/history in CRM timeline;
- document generation using fields of CRM/smart processes;
- BI datasets over smart/business-process data;
- Marketplace apps для внешнего согласования смарт-процессов клиентом/контрагентом.

Источники:

- https://helpdesk.bitrix24.ru/open/22088566/
- https://helpdesk.bitrix24.ru/open/23509402/
- https://helpdesk.bitrix24.ru/open/21290220/
- https://helpdesk.bitrix24.ru/open/26286424/
- https://helpdesk.bitrix24.ru/open/23962608/
- https://www.bitrix24.ru/apps/app/atwebsite.soglasovanie_zakaza_s_klientom/

Это означает, что значительную часть первоначального V0 можно реализовать как CRM configuration/template/app, не создавая отдельный standalone data/workflow platform.

### BPMSoft создаёт тот же pressure

BPMSoft позволяет low-code настраивать собственные разделы, кейсы, стадии, BPM-процессы, роли, маршруты, проверки, сроки и эскалации.

Источники:

- https://bpmsoft.ru/uslugi-avtomatizacii/konstruktor/
- https://edu.bpmsoft.ru/treningi/praktika-primeneniya-notacii-bpmn-v-postroenii-biznes-processov-i-ispolzovanie-kejsov-v-bpmsoft/

Это ещё один incumbent, для которого reference-governance является bounded configuration/add-on, а не новой платформой.

## Почему западный ReferenceEdge не спасает российский standalone thesis

Факт существования Salesforce-native ReferenceEdge доказывает, что при большом enterprise market specialised add-on может жить поверх CRM.

Но Strategy B ищет российский gap с достаточной защитой.

В России одновременно:

1. ICP уже существенно уже глобального Salesforce enterprise market;
2. SimpleOne прямо называет reference management частью B2B CRM use case;
3. Bitrix24/BPMSoft позволяют быстро собрать specialised workflow;
4. CRM integrator уже имеет distribution, customer data, permissions, opportunity links and workflow engine;
5. наш продукт не получает network/data moat — в лучшем случае более красивый reference-specific UX.

Следовательно, отличие `мы сделали reference UX лучше` недостаточно как structural moat.

## Gates

### OWNER_VERIFIABILITY_GATE

Проходил хорошо. Workflow детерминированно проверяем.

Это не причина KILL.

### GENERAL_AI_SUBSTITUTION_GATE

Также проходил. Generic LLM не поддерживает persistent consent/usage/approval state.

Это не причина KILL.

### DATA_TRUST_GATE

Умеренный. Reference/customer data уже живёт в CRM.

Это тоже не причина KILL.

### MARKET GAP / DEFENSIBILITY GATE

Не проходит.

Критическая проблема — core workflow уже находится внутри российского B2B CRM и легко расширяется low-code средствами incumbents.

## Возможная форма, которая остаётся, но не является нашим Strategy-B кандидатом

Можно построить:

- готовый Bitrix24 smart-process/template;
- Marketplace app;
- SimpleOne/BPMSoft implementation package;
- consulting + reference-program setup.

Это может быть полезным небольшим продуктом/услугой, но не показана достаточная защита и отдельный TAM для приоритетного standalone SaaS бизнеса.

## Не возвращаться как

- `ReferenceEdge for Russia`;
- customer-reference registry for Bitrix24;
- reference visit approval workflow;
- tender reference-list generator;
- advocate cooldown / overuse tracker;

без нового structural wedge, который российские CRM/incumbents не могут закрыть configuration/add-on и за который доказана отдельная высокая willingness-to-pay.

## Final status

`KILL__CORE_WORKFLOW_ALREADY_NATIVE_OR_LOW_CODE_IN_RUSSIAN_B2B_CRM`

Боль и зарубежная категория доказаны. Российский standalone market gap/defensibility — нет.
