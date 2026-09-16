# B1 — Customer Security Trust Center for Russian B2B SaaS

Дата закрытия: 2026-09-16

Статус: `KILL__LOW_TECHNICAL_MOAT_AND_FREE_OSS_SUBSTITUTES`

## Идея

Customer-facing security/compliance portal для российских B2B SaaS/IT-вендоров:

`public security page -> certificates/policies/subprocessors -> sensitive pentest/security docs behind NDA/access request -> approval/expiry/audit -> prospect self-service during enterprise security review`.

Это отдельный workflow от AI security-questionnaire automation.

## Что подтвердилось

Российский procurement/security workflow реален.

Yandex Cloud имеет собственный портал соответствия, где публичные сертификаты доступны открыто, а конфиденциальные документы выдаются после запроса и проверки NDA.

Российские SaaS/AI-вендоры также публично указывают, что pentest reports, SoA, DPA и другие security artifacts доступны корпоративным клиентам по запросу/под NDA.

ГОСТ Р ИСО/МЭК 27036-2-2020 прямо описывает обмен требованиями и доказательствами ИБ между заказчиком и поставщиком, NDA и предоставление документации в процессе отбора поставщика.

То есть проблема не выдумана.

## Western demand proved

Категория зрелая:

- Vanta/Drata Trust Center;
- SafeBase;
- Conveyor;
- Whistic;
- другие trust-management/GRC vendors.

Vanta публично заявляет тысячи hosted trust-center pages и крупную installed base. Vendor case studies связывают self-service trust portals с сокращением security-review workload.

## Причина KILL

После deeper sweep технический/product moat standalone Trust Center оказался слишком слабым.

### 1. SafeBase уже имеет бесплатный базовый продукт

По текущему G2 pricing Foundation tier SafeBase стоит $0/year и включает:

- branded Trust Center;
- clickwrap NDA;
- единый hub security reports/documents/policies;
- knowledge base;
- automated access approvals.

Это закрывает значительную часть V0 без платы.

### 2. Уже есть готовые open-source trust centers

Примеры:

- https://github.com/Fimil-dev/trust-center — MIT, config-driven static trust center, deploy <30 min;
- https://github.com/kodustech/trust-center — self-hosted YAML-driven portal with document requests, admin dashboard, Supabase, GitHub SSO;
- https://github.com/theopenlane/core — open-source compliance/GRC platform with branded Trust Center, questionnaires, workflows, vendor registry and evidence management.

Следовательно, российская локализация, local hosting, Russian compliance labels и шаблоны не создают достаточного technical barrier.

### 3. Adjacent Russian GRC can add the external sharing layer

Российские GRC уже управляют policies, controls, evidence, third-party risk и compliance. Например Quadrium ActiveGRC имеет modules third-party risk, regulatory compliance and evidence-oriented processes.

Customer-facing share portal является естественным adjacent feature для таких систем.

### 4. Если расширить scope для moat — мы превращаемся в GRC

Чтобы защищаться, пришлось бы добавлять:

- compliance evidence collection;
- vendor risk;
- questionnaire automation;
- policy/control mapping;
- continuous compliance;
- audit workflows.

Это уже другой, тяжёлый и занятый рынок, а не небольшой Trust Center product.

## Owner fit

Owner-verifiability была хорошей: document access, NDA, expiry, audit and analytics можно тестировать объективно.

GENERAL_AI_SUBSTITUTION_GATE также проходил, поскольку core value — persistent access workflow, not generated text.

Но хорошего owner fit недостаточно без defensibility.

## Не возвращаться как

- SafeBase/Vanta Trust Center for Russia;
- security document portal for SaaS;
- NDA-gated pentest/certificate portal;
- Russian compliance trust page;

без нового structural wedge, который нельзя закрыть free/open-source trust center + local configuration.

## Final status

`KILL__LOW_TECHNICAL_MOAT_AND_FREE_OSS_SUBSTITUTES`

Боль реальна, но standalone product слишком легко воспроизводим и уже имеет free/open-source substitutes.