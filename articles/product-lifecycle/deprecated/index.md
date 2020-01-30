---
title: Deprecation and End Of Life
description: Learn about the Deprecation, End of Life, and Migration process at Auth0.
topics:
  - breaking-changes
  - deprecations
  - end-of-life
  - migrations
  - product-lifecycle
contentType:
  - reference
useCase:
  - migrate
---

# Deprecations and End Of Life

These are deprecations that have already been enabled for all customers.

| Feature | Severity | Grace Period Start | Mandatory Opt-in | 
| -- | -- | -- | -- | 
| [Management API v1](/product-lifecycle/deprecated/references/management-api-v1) | Medium | 2016-10-01 | 2020-07-16 |
| [User Search v2](/product-lifecycle/deprecated/references/search-v2) | Medium | -- | 2019-06-30 |
| [Tenant Logs Search v2](/product-lifecycle/deprecated/references/logs-search-v2) | Medium | -- | -- |
| [Legacy Lock API](/product-lifecycle/deprecated/references/legacy-lock-api) | Medium | 2017-12-21 | 2018-08-06 | 
| [Account Linking ID Tokens](/product-lifecycle/deprecated/references/account-linking-id-tokens) | Medium | -- | 2018-10-19 |
| [Account Linking for Authorization Callback](/product-lifecycle/deprecated/references/account-linking-auth-callback) | Medium | 2017-01-03 |  2017-03-01 |
| [Vulnerable Password Reset Flow](/product-lifecycle/deprecated/references/vulnerable-password-reset-flow) | 
| [Identity Provider Access Tokens Removed](/product-lifecycle/deprecated/references/idp-access-tokens-removed) | Medium | 2016-07-11 | 2016-08-18 |
| [Email Template Customization](/product-lifecycle/deprecated/references/email-template-customizations) (Cloud Only) | Medium |  2016-07-21 | 2016-08-29 |
| [Patch and Post Endpoints No Longer Accept secret_encoded Flag](/product-lifecycle/deprecated/references/patch-post-endpoints) | High | - | 2016-12-06 |

## Definitions
**Breaking Change**: A change to the Auth0 Platform that, to Auth0's knowledge, will cause failures in the interoperation of the Auth0 Platform and Customer Applications.<br />
**Deprecated**: Tenants using the feature or behavior at the time of deprecation will continue to have access. The behavior will be disabled for newly-created Tenants. While it will continue to be supported and minimally maintained, no additional functionality will be added.<br />
**End Of Life Date**: The date access to a feature or behavior is removed from the platform. End Of Life Dates can vary between different plan types.<br />
**End Of Life**: The feature or behavior is removed from the platform. Continued use of the feature or behavior will likely result in errors. The new behavior will be automatically enabled for Tenants that had not opted in during the migration window.<br />
**Migration**: The process by which a customer moves away from a particular behavior.
:::

In an effort to keep the Auth0 platform stable and secure, we must occasionally modify or remove features and behaviors. These changes will sometimes result in a **Breaking Change**.

When we must introduce a **Breaking Change**, the process starts with the feature or behavior being **Deprecated**. At that time, we will also typically announce an **End Of Life Date**; however, in some cases, a feature will be **Deprecated** to prevent further adoption with an **End Of Life Date** to be determined later.

## Migration process

When we make an **End Of Life** announcement, we will also initiate a **Migration** to allow customers to prepare for the **End Of Life Date**. 

**Migrations** will _usually_ involve replacing the **Deprecated** behavior with substantially comparable functionality (although at times, we may elect to discontinue support for some functionality entirely) and modifying your application's code so that it can continue working with the new behavior. We will publish a migration guide, which will detail any action required and will help you determine the impact on your tenants. To ensure a smooth transition and avoid service disruption, we will also provide instructions on how to opt in to the new behavior prior to the **End Of Life Date**. 

Whenever possible, we will provide at least a six-month migration window between the **End Of Life** announcement and the **End Of Life Date**. This time frame may be accelerated in cases of emergency, such as critical vulnerability remediation, or changes required to comply with applicable law or third-party certification standards. In these cases, Auth0 will provide as much prior notice as is reasonable under the circumstances. See our [Self Service Terms of Service](https://auth0.com/legal/ss-tos) or your Enterprise Subscription Agreement for more information. See [Migrations](/product-lifecycle/migrations) for a list of all **Deprecations** with active **Migrations**.
