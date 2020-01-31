---
toc: true
classes: topic-page
title: Product Lifecycle
description: Learn about the Auth0 product lifecycle, including deprecations, end-of-life, and the migration process.
topics:
  - deprecations
  - migrations
  - product-lifecycle
contentType:
  - index
  - reference
useCase:
  - migrate
---

# Product Lifecycle

## Terminology 

When we must introduce a **Breaking Change**, the process starts with the feature or behavior being **Deprecated**. At that time, we will also typically announce an **End Of Life Date**; however, in some cases, a feature will be **Deprecated** to prevent further adoption with an **End Of Life Date** to be determined later.

Here are some key terms about product lifecycle:

**Deprecated**: Tenants using the feature or behavior at the time of deprecation will continue to have access. The behavior will be disabled for newly-created Tenants. While it will continue to be supported and minimally maintained, no additional functionality will be added.

**End Of Life**: The feature or behavior is removed from the platform. Continued use of the feature or behavior will likely result in errors. The new behavior will be automatically enabled for Tenants that had not opted in during the migration window. The **End Of Life Date** is the date access to a feature or behavior is removed from the platform. End Of Life Dates can vary between different plan types.

**Migration**: The process by which a customer moves away from a particular behavior.

**Breaking Change**: A change to the Auth0 Platform that, to Auth0's knowledge, will cause failures in the interoperation of the Auth0 platform and customer applications. 

## Change log

Here is a list of the Auth0 product features that have been deprecated and/or upgraded and migration guides available. 

| Feature | Severity | Deprecation Notice | End of Life Date | Upgrade Notice | Migration Guide | Grace Period Start | Mandatory Opt-in |
| -- | -- | -- | -- | -- | -- | -- | -- |
| Management API | Medium | [Management API v1](/product-lifecycle/deprecated/references/management-api-v1) | [Management API v2](/product-lifecycle/upgrades/management-api-v2) | [Management API v1 to v2](/product-lifecycle/migration/guides/management-api-v1-v2) | 2016-10-01 | 2020-07-16 | 
| User Search | Medium | [User Search v2](/product-lifecycle/deprecated/references/search-v2) | [User Search v3](/product-lifecycle/upgrades/user-search-v3) | [User Search v2 to v3](/product-lifecycle/migration/migrate-search-v2-v3) | | 2019-06-30 |






## Deprecations

| Deprecated Feature | Severity | Grace Period Start | Mandatory Opt-in | 
| -- | -- | -- | -- | 
| [Management API v1](/product-lifecycle/deprecated/references/management-api-v1) | Medium | 2016-10-01 | 2020-07-16 |
| [User Search v2](/product-lifecycle/deprecated/references/search-v2) | Medium |  | 2019-06-30 |
| [Tenant Logs Search v2](/product-lifecycle/deprecated/references/logs-search-v2) | Medium |  |  |
| [Use of /passwordless/start from Confidential Applications](/product-lifecycle/deprecated/references/passwordless-start) | Medium | | | 
| [Legacy Lock API](/product-lifecycle/deprecated/references/legacy-lock-api) | Medium | 2017-12-21 | 2018-08-06 | 
| [Account Linking ID Tokens](/product-lifecycle/deprecated/references/account-linking-id-tokens) | Medium |  | 2018-10-19 |
| [Account Linking for Authorization Callback](/product-lifecycle/deprecated/references/account-linking-auth-callback) | Medium | 2017-01-03 |  2017-03-01 |
| [Vulnerable Password Reset Flow](/product-lifecycle/deprecated/references/vulnerable-password-reset-flow) | 
| [Identity Provider Access Tokens Removed](/product-lifecycle/deprecated/references/idp-access-tokens-removed) | Medium | 2016-07-11 | 2016-08-18 |
| [Email Template Customization](/product-lifecycle/deprecated/references/email-template-customizations) (Cloud Only) | Medium |  2016-07-21 | 2016-08-29 |
| [Patch and Post Endpoints No Longer Accept secret_encoded Flag](/product-lifecycle/deprecated/references/patch-post-endpoints) | High |  | 2016-12-06 |

## Upgrades

| Upgrade Feature | Severity | Grace Period Start | Mandatory Opt-in | 
| -- | -- | -- | -- | 
| [Password and Refresh Token Exchange Rules](/product-lifecycle/upgrades/references/password-refresh-token-exchange-rules) | Medium | 2017-02-23 |  2017-05-31 |
| [Whitelisting](/product-lifecycle/upgrades/references/whitelisting-australia-europe) | Low | 2017-08-22 |  2017-09-30 |
| [Email Delivery Changes "From" Address](/product-lifecycle/upgrades/references/email-delivery) (Cloud only) | Medium | 2016-04-20 | 2016-04-27 |
| [TokenInfo Endpoint Validation](/product-lifecycle/upgrades/references/token-endpoint-validation) |  Low | - | 2016-06-01 |
| [Delete All Users Endpoint Change](/product-lifecycle/upgrades/references/delete-all-users) | Low | - | 2016-09-13 |
| [State Parameter Required on Redirects from Rules](/product-lifecycle/upgrades/references/state-parameter-required-redirect) | High | - | 2016-11-01 |

## Migration guides

| Deprecated Feature/Behavior | Deprecation Date | End of Life Date | Migration Guide |
| -- | -- | -- | -- |
| [Management API v1](/product-lifecycle/deprecated/references/management-api-v1) | 2016-10-01 | Public Cloud: 2020-07-13 </br> Private Cloud: 2020-11-01| [Management API v1 to v2](/product-lifecycle/migration/guides/management-api-v1-v2)</br> [Breaking changes](/api/management/v2/changes) |
| [Passwordless/start authentication](/product-lifecycle/migration/guides/passwordless-start) | 2020-01-06 | TBD | [Use of /passwordless/start from Confidential Applications](/product-lifecycle/migration/guides/passwordless-start) |
| 
