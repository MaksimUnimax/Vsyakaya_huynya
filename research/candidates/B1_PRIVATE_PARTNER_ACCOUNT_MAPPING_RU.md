# B1 — Private Partner Account Mapping for Russian B2B

Дата: 2026-09-15

Статус: `HOLD__LOCALIZATION_MOAT_NOT_YET_PROVEN`

## Коротко

Российский слой класса Crossbeam:

`Компания A: клиенты / prospects / opportunities`
+
`Компания B: клиенты / prospects / opportunities`
→ `privacy-preserving matching`
→ показать только разрешённые пересечения
→ `warm intro / co-sell / joint case / integration opportunity`
→ измерить partner-influenced pipeline/revenue.

Ключевая ценность категории не в VLOOKUP, а в безопасном поиске overlap между независимыми коммерчески чувствительными базами и последующем co-sell workflow.

## Demand proved abroad

### Crossbeam

https://www.crossbeam.com/lp/account-mapping-software
https://www.crossbeam.com/pricing

Crossbeam заявляет 30,000+ компаний, автоматический CRM account mapping, secure/no-raw-data sharing и платный Connector от `$4,800/year`; full-access seats стоят дополнительно, enterprise tiers продаются по custom pricing.

Публичные vendor case studies связывают overlaps с warm intros, partner-sourced/influenced pipeline и revenue. Это доказывает production workflow и willingness-to-pay, но конкретные проценты из vendor stories нельзя считать независимым evidence величины эффекта.

## Российский процесс существует

Отдельный kill-test показал, что российские B2B-компании действительно делают совместные продажи и в ряде случаев обмениваются/сопоставляют клиентские базы.

Найдены текущие российские примеры:

- партнёрские предложения с прямым «обменяемся клиентскими базами»;
- B2B cross-marketing materials, где описаны API-обмен, хешированные совпадения и совместные лид-формы;
- предупреждения о privacy/consent рисках простой передачи клиентской базы;
- Platform V/SberTech в партнёрском процессе запрашивает по целевым клиентам название, ИНН, продукт, вероятность и размер сделки;
- Cloud.ru и Контур ориентируют партнёрские программы на совместные продажи и компании с собственной B2B client base.

Это существенно лучше первоначальной ситуации: сама операция не является американской экзотикой.

## Российский рынок PRM

В РФ уже есть большой adjacent рынок PRM:

- PRM Online — https://prmonline.ru/
- PRM SaaS — https://prmsaas.ru/
- PARTNETIX — https://partnetix.ru/
- RevRoute — https://revroute.ru/

Каталог platforms.su показывает около 18 российских PRM-продуктов. Они умеют партнёрские кабинеты, deal registration, совместные сделки, комиссии, CRM/API, обучение и материалы.

В bounded exact-search на 2026-09-15 не найден публично заявленный direct workflow:

`две независимые компании -> каждая подключает свою CRM/список -> non-overlap records не раскрываются -> виден только overlap -> warm intro/co-sell`.

Но отсутствие публичного описания не доказывает отсутствия скрытой функции.

## Критическое новое evidence — глобальный V0 уже коммодитизируется

После первоначальной оценки найден `OnlyCommon`:

- https://onlycommon.com/
- https://onlycommon.com/pricing

Он уже делает почти наш первоначальный V0:

- каждая сторона загружает CSV/XLSX;
- приглашённому партнёру не нужен отдельный аккаунт;
- non-matching rows другой стороне не показываются;
- raw uploads удаляются после обработки;
- matching идёт по company name/domain/DUNS/VAT/registration IDs;
- seller owners можно автоматически познакомить;
- тарифы начинаются примерно с `$49/month`, далее `$199/$699`, есть line packs и enterprise.

Crossbeam также умеет не только CRM, но Google Sheet/CSV upload.

Следствие:

> `локальный CSV matcher по ИНН` не является продуктовым moat.

Если глобальные продукты могут обслуживать российские компании напрямую или через простой CSV workflow, локальный клон не имеет достаточной защиты.

## Что ещё может сохранить российский gap

Кандидат остаётся HOLD только из-за возможного локального барьера, который ещё надо доказать:

1. **Российский data-residency / legal procurement:** крупные компании могут не хотеть передавать коммерческую/персональную CRM-информацию в зарубежный SaaS.
2. **Bitrix24 / amoCRM / BPMSoft / 1С native sync:** Crossbeam ориентирован прежде всего на Salesforce/HubSpot и western GTM stack.
3. **ИНН / КПП / ОГРН entity model:** точный local company graph и ownership/group relationships.
4. **On-prem/private matching:** настоящий privacy-preserving PSI/OPRF или другой проверенный protocol, а не обычный upload в SaaS.
5. **Russian network effect:** локальная сеть vendors/integrators/distributors, если она действительно создаёт invite loop и не может быть быстро импортирована global incumbent.
6. **Local co-sell workflow:** deal registration, тёплое intro, joint КП и partner attribution в российских CRM/PRM.

Без доказательства минимум двух-трёх из этих преимуществ кандидат должен быть KILL как localization clone.

## Важное security правило

Нельзя выдавать простой `hash(INN)` за приватное пересечение.

ИНН имеет ограниченное публично перебираемое пространство; обычные хеши/наивные shared-secret схемы могут позволять dictionary/probing attacks. Если privacy становится moat, использовать только проверенный PSI/OPRF/TEE-подход после отдельного security review, не изобретая собственную криптографию.

## OWNER_VERIFIABILITY_GATE

Проходит.

На двух тестовых базах со строго известным overlap можно проверить:

- точность совпадений;
- отсутствие раскрытия non-overlap;
- permission model;
- повторную синхронизацию;
- audit trail;
- intro/deal workflow.

Коммерческий pilot измеряется `overlaps -> intro requests -> meetings -> pipeline -> closed-won`.

## GENERAL_AI_SUBSTITUTION_GATE

Проходит только у privacy/network версии.

LLM способен сравнить два файла, если оба файла уже раскрыты ему. Он не заменяет независимую приватную синхронизацию двух компаний, permissions и network effect.

## DATA_TRUST_GATE

Главный риск. Обычный централизованный upload полной CRM без доказуемой privacy/local-hosting модели — KILL.

## Следующий kill test

До разработки:

1. Проверить доступность Crossbeam/OnlyCommon для российских юридических лиц фактически: registration, payment, terms, sanctions/compliance, support.
2. Проверить legal/security policy минимум 10 российских B2B/IT vendors: допустим ли зарубежный SaaS для customer/prospect data.
3. Exact capability audit 10 ведущих российских PRM/CRM.
4. Проверить willingness-to-pay именно за local/private/on-prem layer, а не за сам CSV overlap.
5. Технический architecture proof PSI/OPRF без custom crypto.

Если global tools доступны и российские компании готовы использовать CSV export, локальный кандидат KILL.

## Предварительная оценка

`6.5/10`, снижена с первоначальных `7.5/10` после обнаружения OnlyCommon и CSV support у Crossbeam.

Категория и российский процесс доказаны, но **локальный moat пока не доказан**.

Статус: `HOLD__LOCALIZATION_MOAT_NOT_YET_PROVEN`.