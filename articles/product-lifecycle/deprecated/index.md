---
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

Here are some key terms about deprecations and end of life:

**Breaking Change**: A change to the Auth0 Platform that, to Auth0's knowledge, will cause failures in the interoperation of the Auth0 Platform and Customer Applications.

**Deprecated**: Tenants using the feature or behavior at the time of deprecation will continue to have access. The behavior will be disabled for newly-created Tenants. While it will continue to be supported and minimally maintained, no additional functionality will be added.

**End Of Life Date**: The date access to a feature or behavior is removed from the platform. End Of Life Dates can vary between different plan types.

**End Of Life**: The feature or behavior is removed from the platform. Continued use of the feature or behavior will likely result in errors. The new behavior will be automatically enabled for Tenants that had not opted in during the migration window.

**Migration**: The process by which a customer moves away from a particular behavior.

In an effort to keep the Auth0 platform stable and secure, we must occasionally modify or remove features and behaviors. These changes will sometimes result in a **Breaking Change**.

When we must introduce a **Breaking Change**, the process starts with the feature or behavior being **Deprecated**. At that time, we will also typically announce an **End Of Life Date**; however, in some cases, a feature will be **Deprecated** to prevent further adoption with an **End Of Life Date** to be determined later.

These are deprecations that have already been enabled for all customers.

| Feature | Severity | Grace Period Start | Mandatory Opt-in | 
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
