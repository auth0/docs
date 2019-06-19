---
toc: true
title: Product Lifecycle
description: Product Lifecycle at Auth0
topics:
  - deprecations
  - migrations
contentType:
  - concept
  - reference
useCase:
  - migrate
---

::: note
<h4>Definitions</h4>
<b>Breaking Change</b> A change to the Auth0 Platform that, to Auth0's knowledge, will cause failures in the interoperation of the Auth0 Platform and Customer Applications.<br>
<b>Deprecated</b> The feature or behavior is no longer supported or maintained, no additional functionality will be added. Bug fixes will be made only in extreme circumstances. Tenants using the functionality at the time of deprecation will continue to have access. The functionality will be disabled for newly created Tenants.<br>
<b>End Of Life Date</b> The date the feature or behavior is removed from the platform. End Of Life Dates can vary between different plan types.<br>
<b>End Of Life</b> The feature or behavior is removed from the platform. Continued use of the feature or behaviour will likely result in errors. The new behavior will be automatically enabled for Tenants that had not opted in during the migraiton window. <br>
<b>Migration</b> The process by which a customer moves out from a particular behavior.
:::

## Deprecation and End Of Life

In an effort to keep the Auth0 platform stable and secure some features and functionality must occasionally be modified or removed. These changes will sometimes result in a **Breaking Change**.

This proccess starts with the feature or behavior being **Deprecated**. At the time of deprecation we will also typically announce an **End Of Life Date**. In some cases a feature will be **Deprecated** to prevent further adoption with an **End Of Life Date** to be determined.

## Migration Process

An End Of Life announcement will also initiate a **Migration** to allow customers to prepare for the **End Of Life Date**. The **Migration** will typically involve modifying your applications code in order for it to contiue working with the new behavior. We will publish a migration guide which includes instruction on determining the impact on your tenants and any action required. To ensure a smooth transition and avoid any service disruption we will also provide instructions on how to opt in to the new behavior prior to the **End Of Life Date**.

Note that **Migrations** will usually involve a replacement with substantially comparable functionality to the **Deprecated** behavior, however Auth0 may at times elect to discontinue support for some functionality entirely. In these cases Auth0 will provide at least 6 months' prior notice before the **End Of Life Date**. The exception to this would be for changes required to comply with applicable law, third party certification standards, or to address security vulterabilities.

Whenever possible we will provide at least a six month migration window between the End Of Life announcement and the **End Of Life Date**. This time frame may be accelerated in cases of emergency, such as critical vulnerability remediation, in which case Auth0 will provide as much prior notice as is reasonable in the circumstances. See our [Self Service Terms of Service](https://auth0.com/legal/ss-tos) or your Enterprise Subscription Agreement for more information.

#### Active Migrations

A list of all active **Migrations** can be found [here](/product-lifecycle/migrations).

