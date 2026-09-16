# B1 — Continuous Security Posture / SSPM for Yandex 360 Partners

Дата: 2026-09-16.

Статус: `PROMISING__DEEP_RESEARCH_REQUIRED__NATIVE_PLATFORM_AND_TRUST_RISK`.

## Коротко

Не универсальный «кибербезопасность-AI» и не очередной SIEM.

Первый узкий продукт:

`партнёр / MSP подключает организации Яндекс 360 -> продукт регулярно проверяет конфигурацию по официальному стандарту Y360-* -> хранит историю drift -> показывает PASS/FAIL + raw evidence + инструкцию -> формирует отчёт клиенту -> при необходимости безопасно помогает исправить настройку`.

Ключевой initial buyer — не обязательно конечный SMB. Сильнейший distribution wedge — авторизованный партнёр Яндекс 360, который уже оказывает десяткам клиентов платные услуги внедрения, администрирования, миграции и техподдержки.

## Почему это не выдуманный security score

18 июня 2026 Yandex Cloud опубликовал стандарт «по защите и безопасному использованию Яндекс 360», версия 1.0.0:

https://yandex.cloud/ru/docs/security/standard-360/all

Яндекс прямо пишет, что аудит выполнения рекомендаций можно автоматизировать скриптами через API Яндекс 360.

В текущем стандарте 14 именованных контролей:

- Y360-1 — минимальное количество администраторов;
- Y360-2 — ограничено время жизни cookie-сессии;
- Y360-3 — 2FA;
- Y360-4 — secure phone у доменных пользователей;
- Y360-5 — блокировка неактивных пользователей;
- Y360-6 — парольная политика;
- Y360-7 — отсутствие портальных @yandex.ru аккаунтов;
- Y360-8 — использование SSO;
- Y360-9 — восстановление аккаунта владельца;
- Y360-10 — ревизия OAuth-токенов/scopes;
- Y360-11 — мониторинг аудит-лога;
- Y360-12 — запрет аутентификации во внешних OAuth-сервисах;
- Y360-13 — запрет/allowlist сервисных приложений;
- Y360-14 — подключение существующей DLP к Яндекс 360.

У 12 из 14 контролей стандарт содержит явную API-проверку полностью или для основной части контроля. Y360-8 и Y360-11 в текущем тексте в большей степени описаны через конфигурацию/UI. Это означает, что полезный V0 можно построить без собственного «экспертного AI-решения»: rule -> официальный Y360 control -> API field -> PASS/FAIL.

Примеры:

- Y360-1: `UserService_List`, `isAdmin`;
- Y360-3: `Domain2FAService_Get`, `UserService_Get2fa`;
- Y360-6: `DomainPasswordsService_Get`, `enabled=true`, `changeFrequency<=180`;
- Y360-2: `DomainSessionsService_Get`, `authTTL`;
- Y360-5: audit log / `occurred_at`;
- Y360-7: `UserService_List`, email must not end with `@yandex.ru`;
- Y360-10 / Y360-13: `ServiceApplicationsService_Get`, applications + scopes;
- Y360-12: `OauthAccessRestrictionsService_Get`, `restricted=true`;
- Y360-14: `RoutingService_GetRules`.

## Market size — not micro-SaaS

Official Yandex 2026 evidence:

https://www.yandex.ru/company/news/12-08-2026-01
https://360.yandex.ru/blog/news/bolee-185-tis-organizatsii-yandeks-360-obyavlyaet-finansovie-rezultati-za-pervoe-polugodie/

By H1 2026:

- >185,000 organizations use Yandex 360;
- 8.9M paid accounts;
- 2.4M paid accounts belong to large companies;
- H1 revenue of Yandex 360 = 11.6B RUB, +42% YoY;
- partner network = 390 partners;
- partner-channel revenue +57% YoY.

Yandex explicitly says partners earn not only resale commission but also consulting, administration, migration, technical support and other services:

https://360.yandex.ru/business/partners-program/

This creates a plausible distribution model: sell a multi-tenant security/audit console to MSP/integration partners and let them package recurring security administration for existing customers.

## Western category is proven

This is a localized narrow wedge into the mature SSPM category (SaaS Security Posture Management).

Western products such as AppOmni / Palo Alto SSPM continuously connect to SaaS admin APIs, detect configuration drift, risky identities/OAuth integrations and compliance gaps, and support remediation.

Examples:

https://www.appomni.com/
https://www.paloaltonetworks.com/sase/saas-security-posture-management

AppOmni publicly states >100M SaaS user accounts protected. Public AWS Marketplace offers have listed pricing on the order of thousands of dollars/year for relatively small user/application blocks. Category willingness-to-pay is therefore materially stronger than micro-SaaS categories rejected earlier.

## Russian direct competitor sweep — current result

A bounded search on 2026-09-16 did NOT find a Russian product publicly positioning itself as:

`continuous posture / configuration audit for Yandex 360 against Y360-* controls + drift history + remediation + multi-tenant MSP console`.

Adjacent products exist and are important:

- Kaspersky KUMA can ingest/normalize Yandex 360 audit events; this is SIEM/event analysis, not a current-configuration posture engine.
- Solar Dozor can control information exchange through Yandex 360; this is DLP.
- Yandex Security Deck is the most dangerous adjacent incumbent.

Absence in search is not proof of absence. Major vendors and partner apps still require deeper demo/docs/API audit.

## Native-platform risk — highest strategic risk

Yandex itself is moving rapidly into security-posture products.

Yandex Security Deck already includes:

- CSPM for Yandex Cloud infrastructure;
- DSPM;
- KSPM;
- CIEM;
- Threat Detection.

In 2026 DSPM gained direct scanning of data stored on Yandex 360 Disks:

https://yandex.cloud/ru/docs/security-deck/concepts/dspm

Security Deck starter pricing is currently from about 25,960 RUB/month for cloud-security bundles:

https://yandex.cloud/ru/services/security-deck

Therefore **a Yandex-only single-tenant posture dashboard is NOT defensible**. Yandex can add it natively.

The surviving wedge must be stronger:

1. multi-tenant MSP view across many client organizations;
2. independent historical drift/evidence;
3. white-label reports and recurring service workflow;
4. later cross-platform coverage (VK WorkSpace and possibly other Russian SaaS);
5. lower-complexity/lower-price offer for customers for whom full Security Deck/CNAPP is excessive;
6. optionally local/on-prem agent or minimized read-only permissions.

If these wedges do not create willingness to pay beyond a quarterly script, candidate becomes KILL.

## VK WorkSpace expansion evidence

VK WorkSpace already has useful posture surfaces:

- organization/user 2FA;
- user status and security fields;
- SSO;
- audit logs, including administrator actions;
- API availability on business/enterprise tiers.

Sources:

https://biz.mail.ru/docs/saas/settings/2fa
https://biz.mail.ru/docs/saas/settings/accounts/users
https://www.workspacevk.com/blog/vk-workspace-saas-update-q2-2026/

However current bounded research has NOT yet proved an admin API as rich as Yandex 360 for a full automated SSPM implementation. Do not promise VK support until API feasibility is confirmed.

## V0

No AI required.

1. Connect one Yandex 360 organization.
2. Fetch read-only configuration/evidence with minimum permissions possible.
3. Evaluate official Y360-* controls.
4. Show for every result:
   - control ID;
   - expected value;
   - actual value / evidence;
   - PASS / FAIL / MANUAL / NOT_APPLICABLE;
   - official Yandex source;
   - exact remediation instruction.
5. Store snapshots and show configuration drift.
6. Email/Telegram alert on newly failing control.
7. Generate PDF/HTML evidence report.
8. MSP account can switch between client organizations and see aggregate posture/drift.

Do NOT start with auto-remediation. Write access materially increases trust and blast-radius risk. First product should be read-only where technically possible.

## OWNER_VERIFIABILITY_GATE

Passes unusually well for a security product because acceptance is deterministic.

Example:

- official Y360-6 says `enabled=true` and `changeFrequency<=180`;
- test organization intentionally has `enabled=false`;
- product must show FAIL with raw returned value;
- setting is corrected;
- next scan must show PASS.

The user does not need to trust an AI security opinion. Correctness can be checked against official Yandex documentation and reproducible API responses.

## GENERAL_AI_SUBSTITUTION_GATE

Passes.

LLM can explain a configuration snapshot but cannot replace authenticated continuous scans, drift history, multi-tenant partner administration, alerts and evidence generation.

## DATA_TRUST_GATE

Mixed / important risk.

Admin APIs and security scopes are sensitive. Product should minimize permissions, separate tenants, encrypt secrets, maintain strong audit logs and support short-lived/rotatable credentials. A local agent/private deployment option may be necessary for larger customers.

Important API caveat: some Yandex security GET operations currently use scopes whose names include `write`. This must be audited method-by-method before claiming true read-only onboarding.

## Distribution hypothesis

Primary ICP to test first:

- Yandex 360 authorized partners/MSPs;
- IT outsourcers administering many small/medium organizations;
- security-oriented integrators serving Yandex 360 customers.

Reason: one sale can expose the product to many tenants, partner already has customer trust, and Yandex officially encourages partners to sell administration/support services.

Secondary ICP:

- mid-market organizations with no dedicated security engineer but meaningful Yandex 360 footprint.

## Next kill tests

### 1. Exact automatable-control matrix

For all 14 Y360 controls classify:

- full read-only API check;
- partial API check;
- manual only;
- plan/tariff limitations;
- required scopes;
- remediation API available or not.

KILL or narrow drastically if too few high-value checks can be read safely.

### 2. Direct competitor audit

Explicitly audit current offerings/docs of:

- Security Vision;
- Kaspersky;
- Solar;
- BI.ZONE;
- Garda;
- UDV;
- InfoWatch/SearchInform where relevant;
- Yandex 360 partner marketplace/catalog.

Need distinguish SIEM/DLP/CASB/CSPM from actual Yandex-360 configuration posture.

### 3. Native Yandex roadmap risk

Check Security Deck/Yandex 360 release notes continuously enough to see whether Y360-* posture dashboard is already planned/previewed.

If Yandex releases native cross-organization continuous posture with partner/MSP view, KILL or pivot cross-platform.

### 4. Partner willingness-to-pay

Interview 10–15 Yandex 360 partners:

- how many tenants they administer;
- whether they currently check 2FA/OAuth/admins/session TTL manually;
- whether customers pay recurring administration/security fee;
- whether an automated white-label report helps sell/retain that service;
- acceptable price per tenant / partner account.

### 5. Quarterly-script substitution

Strong kill gate.

If partners say a free quarterly script against the 14 controls is enough and they do not need drift/history/reporting/multi-tenancy, do not build SaaS.

## Preliminary assessment

`8/10` as a research candidate, NOT GO.

Stronger than many recent candidates because:

- official machine-verifiable control source exists;
- market is large and growing;
- partner distribution already exists;
- output is independently verifiable;
- continuous workflow cannot be replaced by generic AI;
- Western SSPM category has real enterprise willingness-to-pay.

Main weaknesses:

- Yandex itself is the strongest possible incumbent;
- sensitive admin/security access creates trust barrier;
- a 14-control script may be sufficient for many customers;
- cross-platform moat is not yet proven.

Do not implement before competitor + scope + partner willingness-to-pay kill tests.