---
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

When Auth0 introduces a **Breaking Change**, the process starts with the feature or behavior being **Deprecated**. At that time, we will also typically announce an **End Of Life Date**; however, in some cases, a feature will be **Deprecated** to prevent further adoption with an **End Of Life Date** to be determined later.

Here are some key terms about product lifecycle:

**Deprecated**: Tenants using the feature or behavior at the time of deprecation will continue to have access. The behavior will be disabled for newly-created Tenants. While it will continue to be supported and minimally maintained, no additional functionality will be added.

**End Of Life**: The feature or behavior is removed from the platform. Continued use of the feature or behavior will likely result in errors. The new behavior will be automatically enabled for Tenants that had not opted in during the migration window. The **End Of Life Date** is the date access to a feature or behavior is removed from the platform. End Of Life Dates can vary between different plan types.

**Migration**: The process by which a customer moves away from a particular behavior.

**Breaking Change**: A change to the Auth0 Platform that, to Auth0's knowledge, will cause failures in the interoperation of the Auth0 platform and customer applications. 

Here is a list of the Auth0 product features that have been deprecated and/or upgraded and migration guides available. 

## Deprecated features and migration guides

| Feature | EOL Date | Migration Guide |
| -- | -- | -- | 
| [Management API v1](/product-lifecycle/deprecated/management-api-v1) | Public Cloud: 2020-07-13 </br> Private Cloud: 2020-11-01 | [Management API v1 to v2](/product-lifecycle/migration/management-api-v1-v2) |
| [User Search v2](/product-lifecycle/deprecated/search-v2) | 2019-06-30 | [User Search v2 to v3](/product-lifecycle/migration/migrate-search-v2-v3) |
| [Tenant Logs Search v2](/product-lifecycle/deprecated/logs-search-v2) |  | [Tenant Logs Search v2 to v3](/product-lifecycle/migration/migrate-logs-v2-v3) |
| [Use of /passwordless/start from Confidential Applications](/product-lifecycle/deprecated/passwordless-start) | | [Use of /passwordless/start from Confidential Applications](/product-lifecycle/migration/passwordless-start) | 
| [Legacy Lock API](/product-lifecycle/deprecated/legacy-lock-api) | 2017-12-21 | 2018-08-06 | 
| [Account Linking ID Tokens](/product-lifecycle/deprecated/account-linking-id-tokens) |   | 2018-10-19 |
| [Account Linking for Authorization Callback](/product-lifecycle/deprecated/account-linking-auth-callback) |  2017-01-03 |  2017-03-01 |
| [Vulnerable Password Reset Flow](/product-lifecycle/deprecated/vulnerable-password-reset-flow) | | | |
| [Identity Provider Access Tokens Removed](/product-lifecycle/deprecated/idp-access-tokens-removed) | Medium | 2016-07-11 | 2016-08-18 |
| [Email Template Customization](/product-lifecycle/deprecated/email-template-customizations) (Cloud Only) |   2016-07-21 | 2016-08-29 |
| [Patch and Post Endpoints No Longer Accept secret_encoded Flag](/product-lifecycle/deprecated/patch-post-endpoints) |   | 2016-12-06 |

## Keep reading

* [Upgrade Notices](/product-lifecycle/upgrades)
* [Deprecated Features](/product-lifecycle/deprecated)
* [Migration Guides](/product-lifecycle/migration)
