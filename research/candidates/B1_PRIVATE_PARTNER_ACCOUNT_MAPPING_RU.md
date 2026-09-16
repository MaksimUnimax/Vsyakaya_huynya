# B1 — Private Partner Account Mapping for Russian B2B

Дата закрытия: 2026-09-16

Статус: `KILL__GLOBAL_SELF_SERVE_PRODUCT_ALREADY_CLOSES_CORE_WORKFLOW`

## Идея

Российский Crossbeam-like layer:

`две компании -> приватно загрузить customer/prospect lists -> раскрыть только overlap -> warm intro / co-sell`.

Локальный wedge предполагался вокруг ИНН, Bitrix24/1С/amoCRM, local hosting and privacy.

## Что подтвердилось

Категория реальна и полезна. Crossbeam имеет большой западный network и высокие enterprise price signals. В российском B2B есть account-planning/co-sell/partner workflows, а ИНН действительно является удобным entity key.

Однако после более глубокого sweep локальный product gap оказался недостаточным.

## Причина KILL — OnlyCommon уже закрывает V0 глобально и дёшево

Текущий OnlyCommon делает почти ровно предполагаемый российский V0:

- каждая сторона загружает Excel/CSV отдельно;
- partner does not need an account;
- raw lists не раскрываются;
- non-overlap rows не показываются другой стороне;
- raw uploads удаляются после processing;
- matching uses company name/domain plus DUNS/VAT/registration IDs;
- no CRM integration required;
- Team Match connects account owners for intros;
- audit/security options exist.

Sources:

- https://onlycommon.com/
- https://onlycommon.com/pricing
- https://onlycommon.com/account-mapping-without-crm

Pricing на 2026-09-16:

- free: 200 lines/month;
- Starter: $49/month for 10k lines;
- Growth: $199/month for 50k;
- Business: $699/month for 250k.

Это значит, что даже customer who cannot/will not connect a CRM already has a low-friction global substitute.

## Почему российская локализация недостаточна

`ИНН + Bitrix24 + российские платежи + хостинг в РФ` улучшает UX, но не создаёт structural moat.

OnlyCommon already supports registration/VAT identifiers and works with plain files. A Russian company can export a focused list and get the overlap without внедрения.

Если идти в on-prem / 152-FZ / cryptographic PSI, product becomes a higher-trust enterprise-security project with much smaller buyer universe and much longer sales cycle. At that point it is no longer the simple network-effect wedge originally considered.

Russian PRM incumbents also remain adjacent and can add account-mapping if local demand becomes visible.

## Gates

OWNER_VERIFIABILITY passed strongly.

GENERAL_AI_SUBSTITUTION also passed.

But DATA_TRUST remained difficult and, more importantly, market-gap/defensibility failed once a global self-serve product emerged that requires no CRM integration or partner account.

## Не возвращаться как

- Crossbeam for Russia;
- private customer-list intersection by INN;
- partner account mapping for Bitrix24/1C;
- privacy-preserving CSV account mapping;

without a genuinely new workflow unavailable in OnlyCommon/Crossbeam and structurally hard for Russian PRM vendors to copy.

## Final status

`KILL__GLOBAL_SELF_SERVE_PRODUCT_ALREADY_CLOSES_CORE_WORKFLOW`