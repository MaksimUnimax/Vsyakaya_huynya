# Yandex 360 SSPM — API Scope + Native Platform Kill Test

Date: 2026-09-16

Related candidate: `research/candidates/B1_YANDEX360_SSPM_MSP.md`

## Result

The technical read-access kill gate did **not** kill the candidate.

Most useful controls in the official Yandex 360 security standard can be evaluated with read-only OAuth permissions. The main anomaly is the organization-wide 2FA status endpoint, whose GET method currently requires a permission named `ya360_security:domain_2fa_write`. Per-user 2FA/security-phone state can still be read through `directory:read_users`.

The native-platform risk increased materially because Yandex already has both:

- a growing Security Deck product family;
- a Partner Portal that manages customer/subaccount and Yandex 360 organization commercial lifecycle, including a public API added in Q1 2026.

A generic multi-tenant Yandex 360 admin dashboard is therefore dead as a differentiated product. Only the security-baseline / drift / evidence / MSP-service layer remains plausible.

## Official source basis

Security standard, version 1.0.0, updated 2026-06-18:

https://yandex.cloud/ru/docs/security/standard-360/all

Yandex 360 API permissions:

https://yandex.ru/dev/api360/doc/ru/access

Partner Portal release notes:

https://yandex.cloud/ru/docs/partner/release-notes/

Security Deck:

https://yandex.cloud/ru/docs/security-deck/

## Control matrix

| Control | What is checked | Automation status | Minimum practical read access / caveat |
|---|---|---|---|
| Y360-1 | Minimum admins | FULL | `directory:read_users`; inspect `is_admin` |
| Y360-2 | Cookie/session TTL | FULL | `ya360_security:domain_sessions_read`; `DomainSessionsService_Get` |
| Y360-3 | 2FA | PARTIAL/FULL for domain users | Per-user state via `directory:read_users`; organization-wide `Domain2FAService_Get` currently requires `ya360_security:domain_2fa_write`; Yandex-ID users remain a caveat |
| Y360-4 | Secure phone | FULL for domain users | `directory:read_users`; `UserService_Get2fa` / `hasSecurityPhone`; Yandex-ID caveat |
| Y360-5 | Inactive users >30d | FULL where audit logs are available | `ya360_security:read_auditlog`; compare last activity, plus directory user state |
| Y360-6 | Password policy | FULL | `ya360_security:domain_passwords_read`; check `enabled=true`, `changeFrequency<=180` |
| Y360-7 | No portal `@yandex.ru` accounts | FULL | `directory:read_users`; inspect email domain |
| Y360-8 | SSO via SAML IdP | MANUAL / NOT PROVED VIA API | Current standard gives configuration guidance but no direct check API |
| Y360-9 | Owner recovery | FULL for domain owner / partial for Yandex ID | `directory:read_users`; security phone + 2FA. Global 2FA check inherits write-scope anomaly |
| Y360-10 | OAuth/service-app review | FULL inventory, policy comparison requires customer allowlist | `ya360_security:service_applications_read`; compare apps/scopes to trusted registry |
| Y360-11 | Audit-log monitoring enabled | PARTIAL | Audit events are readable via `ya360_security:read_auditlog`; current standard verifies “connected” state in UI, no separate config-status API proved |
| Y360-12 | External OAuth authentication restricted | FULL | `ya360_security:domain_settings_read`; `OauthAccessRestrictionsService_Get` |
| Y360-13 | Service applications denied/allowlisted | FULL | `ya360_security:service_applications_read`; inspect list/scopes against customer allowlist |
| Y360-14 | Existing DLP routed through Y360 | FULL for mail-routing evidence | `ya360_admin:mail_read_routing_rules`; inspect active forwarding rule to DLP destination |

## Read-only permission set for a useful V0

Likely core set:

- `directory:read_users`
- `ya360_security:domain_sessions_read`
- `ya360_security:domain_passwords_read`
- `ya360_security:domain_settings_read`
- `ya360_security:service_applications_read`
- `ya360_security:read_auditlog`
- `ya360_admin:mail_read_routing_rules`

Possible additional audit-log scopes if separate Disk/Mail raw logs are required:

- `ya360_security:audit_log_disk`
- `ya360_security:audit_log_mail`

Avoid write permissions in V0 where possible.

### 2FA anomaly

Official Yandex documentation currently states that organization-level `Domain2FAService_Get` requires:

`ya360_security:domain_2fa_write`

Even though it is a GET request.

This should not be hidden. For a trust-minimized MVP, prefer checking domain users through read-only directory data / `UserService_Get2fa`, and mark the organization-wide global-setting check as partial unless the customer explicitly grants the broader scope.

## Native platform risk update

### Partner Portal

Yandex Cloud Partner Portal is already the main partner customer-management surface. Q1 2026 added public API support for:

- accounts;
- subaccounts;
- Yandex 360 organization data;
- Yandex 360 tariffs and add-ons;
- plan/add-on lifecycle operations.

Partners can track linked Yandex 360 organizations and manage plan state.

This means the differentiation **cannot** be:

`one dashboard for all customer Yandex 360 organizations`.

Yandex already owns that surface.

### Security Deck

Security Deck already includes CSPM, DSPM, KSPM, CIEM, Threat Detection and other modules. DSPM can scan Yandex 360 Disk data. Yandex therefore has both the security product organization and the Yandex 360 data plane needed to extend native posture functionality later.

## Western exact-model validation

Microsoft 365 has a comparable native MSP layer (Microsoft 365 Lighthouse), yet a commercial ecosystem still exists above it. Augmentt sells MSPs:

- cross-tenant baselines;
- drift detection;
- framework audits;
- repeatable policy deployment;
- onboarding/offboarding;
- license management;
- white-label/client reporting;
- evidence that lets the MSP package a billable managed-security service.

This supports the business model **despite** native-vendor tooling, but only if the independent product creates meaningful operational/service value beyond the vendor portal.

## Updated survival condition

The candidate survives only as something closer to:

`Augmentt for Russian workspaces/MSPs`

with Yandex 360 as the first adapter, not as a generic Yandex-only dashboard.

Minimum differentiation to test:

1. cross-client security baseline in one screen;
2. configuration drift history;
3. customer-readable/white-label evidence reports;
4. partner workflow to turn findings into recurring managed service;
5. read-mostly onboarding;
6. eventually at least one additional Russian workspace / SaaS platform so the product is not completely hostage to Yandex.

## Strong next kill tests

1. Partner interviews: is this recurring billable work or a quarterly script?
2. Native roadmap: does Yandex announce posture/baselines in Partner Portal or Security Deck?
3. Cross-platform feasibility: can VK WorkSpace expose enough admin/security state by API?
4. Exact multi-tenant auth model: can partners obtain lawful/secure per-customer delegated access without sharing administrator passwords?
5. Pricing: can partner monetize the output enough that tool cost is a small fraction of service margin?

If partners say `a free script quarterly is enough`, or if Yandex ships cross-tenant Y360 posture in the Partner Portal, the Yandex-only wedge should be killed.