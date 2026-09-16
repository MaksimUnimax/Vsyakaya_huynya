# Retail Deduction Recovery — Outreach-Ready Cohort A

Дата: 2026-09-16

Связанные материалы:

- `research/pilots/RETAIL_DEDUCTION_RECOVERY_PUBLIC_ICP_CORPUS_2026-09-16.md`
- `research/pilots/RETAIL_DEDUCTION_RECOVERY_DISCOVERY_AND_FIXTURES_2026-09-16.md`
- `research/pilots/RETAIL_DEDUCTION_RECOVERY_SAMPLE_REQUEST_2026-09-16.md`

Статус:

`READY_FOR_OWNER_AUTHORIZED_OUTREACH__PUBLIC_CORPORATE_CHANNELS_ONLY`

Назначение: первая экспериментальная волна контактов для historical-data discovery. Это не рейтинг компаний и не утверждение, что у них есть recoverable fines.

## Rules

- Использовать только публичные corporate/function contacts.
- Не собирать/хранить личные email/телефоны сотрудников без необходимости.
- Не обещать возврат денег.
- Не продавать продукт, которого ещё нет.
- Цель первого контакта — process discovery + bounded historical sample.
- До explicit owner authorization фактические письма/звонки не отправлять.

## 1. ООО «Витек» — preferred first contact

Why selected:

- food/snacks;
- public evidence of sales through `Пятёрочка`, `Перекрёсток`, `Магнит`, `Лента` and other national chains;
- official site publishes a separate logistics functional contact;
- likely repeated shipment/EDI process.

Source:

- https://www.witek.ru/company/

Public corporate/function channels:

- logistics: `logist@witek.ru`
- commercial/general: `urfo@witek.ru`, `info@witek.ru`
- office phone: `+7 (343) 380-20-02`

Preferred initial channel:

`logist@witek.ru`

Tailored angle:

> Проверяем не юридическое оспаривание, а техническую сверку штрафа сети с ORDERS/ORDRSP/DESADV/RECADV: подтверждённое количество, версия заказа, отгрузка, приёмка, арифметика. Для первого теста нужен обезличенный export за 3 месяца по одной сети, без доступа к 1С.

Why logistics first:

- process owner likely understands order/EDI/acceptance evidence;
- if money ownership sits elsewhere, ask to route to KAM/finance person handling network deductions.

## 2. ООО «Семилукский пищекомбинат» / «Семилукская Трапеза»

Why selected:

- official site says supplies to `Лента`, `Перекрёсток`, `Пятёрочка`, `Магнит` and other chains;
- own delivery service;
- food production, 150+ SKUs, supplies across many regions.

Sources:

- https://s-trapeza.ru/about-company
- https://s-trapeza.ru/contacts/

Public corporate channels:

- email: `trapeza.ooo@mail.ru`
- office: `+7 (47372) 2-16-73`
- sales-region phones published on contacts page.

Preferred initial channel:

`trapeza.ooo@mail.ru`

Tailored angle:

> У вас одновременно несколько федеральных сетей и собственная доставка. Хотим проверить на одном retailer 3 месяца штрафных актов и EDI history, чтобы измерить, какая доля расхождений восстанавливается технически по заказу/подтверждению/отгрузке/приёмке без юридической интерпретации.

## 3. ООО «ТМК-Сервис» / TMK Food

Why selected:

- snack manufacturer;
- current public site describes broad modern-trade distribution and FMCG scale;
- useful packaged-food profile with repeated chain orders.

Sources:

- https://tmk-food.ru/
- https://tmk-food.ru/o-kompanii

Public corporate channel:

- `info@tmk-food.ru`

Preferred initial channel:

`info@tmk-food.ru`

Tailored angle:

> Исследуем автоматизацию сверки штрафов федеральных сетей с EDI source events. Не просим ERP access: один retailer, 20–50 исторических штрафов + связанные ORDERS/ORDRSP/DESADV/RECADV. Возвращаем evidence table и отдельно помечаем все юридические/quality cases как human-only.

Routing ask:

> Если этим занимается отдельный KAM/финансы/EDI, пожалуйста, перешлите коллегам, которые разбирают удержания торговых сетей.

## 4. ООО «Любимый город»

Why selected:

- dairy/perishable food;
- current official site lists `Магнит`, `Лента`, `Пятёрочка`, `Перекрёсток`;
- useful high-frequency / acceptance-sensitive profile.

Source:

- https://www.lubgorod.ru/

Public corporate channels:

- `info@lubgorod.ru`
- office phone: `(84457) 9-50-90`

Do not use `marketing@` for first outreach unless general channel fails; process is finance/logistics/EDI, not marketing.

Tailored angle:

> Для молочной категории quality disputes оставляем человеку. Проверяем только quantities/order versions/acceptance/timestamps/formula. Это важно: мы не предлагаем автоматически спорить о качестве продукции.

## 5. ООО «СПЕЦРЕЗЕРВ»

Why selected:

- current official site states supply contracts with `X5 Retail Group`, `Лента`, `Магнит`;
- fresh produce/import/logistics;
- likely rich ORDERS/ORDRSP/DESADV/RECADV flow.

Source:

- https://spets21.ru/

Public corporate channels:

- `spets_21@list.ru`
- `8 (8352) 36-30-57`

Tailored angle:

> Свежая продукция даёт много сложных quality reasons, их мы исключаем. Нужны только штрафы, где можно независимо проверить согласованный объём, версию заказа, факт отгрузки/приёмки и расчёт. Если таких кейсов мало — это тоже полезный negative result.

## 6. ООО «Карельское лето»

Why selected:

- manufacturer with current public corporate site;
- 5M+ units/year stated in public company materials;
- good mid-size profile for a bounded pilot.

Sources:

- https://kareliansummer.com/o-nas/
- https://kareliansummer.com/contacts/

Public corporate channels:

- `info@kareliansummer.com`
- `+7 (921) 701-26-96`
- public web inquiry form.

Preferred initial channel:

`info@kareliansummer.com`

Tailored angle:

> Ищем производителей, у которых есть регулярный EDI поток с федеральными сетями. Проверка полностью historical/read-only: если за период нет material deterministic mismatches, мы так и зафиксируем — цель исследования не доказать идею любой ценой.

## Suggested contact order

Order is based on experimental convenience, not company quality:

1. `Витек` — explicit logistics contact.
2. `Семилукский пищекомбинат` — clear multi-network food profile + public corporate contact.
3. `ТМК-Сервис` — packaged FMCG/current site/general corporate contact.
4. `СПЕЦРЕЗЕРВ` — stress-test high-frequency fresh produce.
5. `Любимый город` — perishable dairy, with strict Tier-B exclusion.
6. `Карельское лето` — mid-size manufacturer/control on data availability.

## First-message template

Subject:

`Проверка штрафов сетей по EDI — исторический тест без доступа к 1С`

Body:

> Добрый день. Исследуем узкую задачу у поставщиков федеральных сетей: можно ли автоматически сверять штраф/удержание сети с исходной EDI-цепочкой ORDERS → ORDRSP → DESADV → RECADV и находить только объективные расхождения — подтверждённое количество, версия заказа, фактическая отгрузка/приёмка, арифметика штрафа и дубли.
>
> Это не юридический бот: quality, ст.333, спорную трактовку договора и другие экспертные вопросы система обязана отдавать человеку.
>
> Для проверки ищем несколько поставщиков X5/Магнита/Ленты. Достаточно обезличенного historical sample за 3 месяца по одной сети: штрафные документы + связанные EDI-сообщения. Полного доступа к 1С, EDI-логина или банковским данным не нужно. Претензии от имени компании не отправляем.
>
> В ответ возвращаем evidence-only аудит: какие кейсы вообще детерминируемы, где есть объективное расхождение, какая сумма требует проверки человеком и сколько ручной работы можно убрать.
>
> Если у вас штрафы/удержания сетей действительно занимают время, подскажите, пожалуйста, кто внутри компании отвечает за их разбор — KAM, финансы, EDI или логистика?

## Qualification follow-up

If interested, do not send a long pitch. Ask five facts first:

1. Which network is easiest for a 3-month sample?
2. Approximate number/RUB of fines in that period?
3. Main reason families?
4. EDI provider?
5. Can they export ORDERS/ORDRSP/DESADV/RECADV plus 20–50 penalty docs without a custom IT project?

Then send:

`RETAIL_DEDUCTION_RECOVERY_SAMPLE_REQUEST_2026-09-16.md`

## Success definition for outreach wave

Do not count messages sent.

Count:

- process-owner conversations;
- qualified suppliers with material penalty flow;
- bounded sample agreements;
- actual data received.

Target next evidence point:

`10 qualified supplier samples`, not `100 cold emails`.
