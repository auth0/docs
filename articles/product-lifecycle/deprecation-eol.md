---
toc: true
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

# Deprecation and End Of Life

::: note
#### Definitions
**Breaking Change**: Change to the Auth0 platform that, to Auth0's knowledge, will cause failures in the interoperation of the Auth0 platform and customer applications.<br />
**Deprecated**: Product release stage indicating that features or behaviors are not supported for use by new subscribers, are not actively being enhanced, and are being only minimally maintained. Tenants using the feature or behavior at the time of deprecation will continue to have access.<br />
**End Of Life Date**: Date that access to a feature or behavior is removed from the platform. End Of Life Dates can vary between different plan types.<br />
**End Of Life**: Product release stage indicating the feature or behavior is removed from the platform. Continued use of the feature or behavior will likely result in errors. The new behavior will automatically be enabled for Tenants that did not opt in during the migration window.<br />
**Migration**: Process by which a customer moves away from a particular behavior.
:::

To keep our platform stable and secure, we must occasionally modify or remove features and behaviors. These changes will sometimes result in a **Breaking Change**.

When we must introduce a **Breaking Change**, we first **Deprecate** the feature or behavior and typically announce an **End Of Life Date**. In some cases, we will **Deprecate** a feature to prevent further adoption and will determine the **End Of Life Date** later.

## Migration Process

When we make an **End Of Life** announcement, we will also initiate a **Migration** to allow customers to prepare for the **End Of Life Date**. 

**Migrations** usually involve replacing **Deprecated** behavior with substantially comparable functionality (although at times, we may elect to discontinue support for some functionality entirely) and modifying your application's code so that it can continue working with the new behavior. We will publish a migration guide, which will detail any action required and help you determine the impact on your tenants. To ensure a smooth transition and avoid service disruption, we will also provide instructions on how to opt in to the new behavior prior to the **End Of Life Date**. 

Whenever possible, we provide at least a six-month migration window between the **End Of Life** announcement and the **End Of Life Date**. We may accelerate this time frame in case of emergency, such as to remediate a critical vulnerability or to make changes required by applicable law or third-party certification standards. In such cases, we will provide as much prior notice as is reasonable under the circumstances. For more information, see our [Self Service Terms of Service](https://auth0.com/legal/ss-tos) or your Enterprise Subscription Agreement. For a list of all **Deprecations** with active **Migrations**, see [Migrations](/product-lifecycle/migrations).

