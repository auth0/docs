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

* [Deprecated Features](/product-lifecycle/deprecated)
* [Migration Guides](/product-lifecycle/migration)
* [Upgrade Notices](/product-lifecycle/upgrades)
