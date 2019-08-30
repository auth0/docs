---
description: How to request child tenants for your Auth0 tenant
topics:
    - child-tenants
    - dev-tools
contentType: how-to
useCase:
    - support
    - development
---

# Child Tenant Request Process

This request process is for self-service customers requesting a development, test, or staging tenant that's linked to their paid production tenant. This tenant is called a **child tenant**.

Free tenants do not include a child tenant.

::: warning
This policy does not apply if you have an Enterprise subscription. If you need to add child tenants to your subscription, contact your designated Technical Account Manager or our [Support](${env.DOMAIN_URL_SUPPORT}).
:::

## Child Tenant Policy

* If you're billed $167 USD/month (or more), you're eligible for one free child tenant with the same plan/features as the production tenant.
* Your child tenant is subject to Auth0’s [Operational Policies](/policies).
* If you cancel your paid subscription plan and Auth0 downgrades your child tenant to the free plan, you'll lose access to features (as outlined in [pricing](https://auth0.com/pricing)) available to paid plans.

::: warning
Child tenants **must not** be used in production environments.
:::

## Request a Child Tenant

Please use the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}) to request that a child tenant be assigned for you. The new child tenant has to be created before the request is submitted. Requests must be made at least five business days in advance of your desired implementation date.

Please include the following information with your request:

* The name of the paid Auth0 tenant to which the child tenant will be linked
* The name of the new Auth0 child tenant

## Alter Your Tenant's Subscription Plan

If you are upgrading the subscription plan associated with your paid tenant, your child tenant will be upgraded as well. If you downgrade, your child tenant will also be affected -- please contact the Auth0 Support team using the [Support Center](${env.DOMAIN_URL_SUPPORT}) for additional details.

## Child Tenant Cloud Region

The child tenant does **not** have to be located in the same cloud environment as your production tenant.

## Additional Child Tenants

Generally speaking, we only permit one child tenant per paid production tenant. However, if you need additional tenants, please contact us via the [Support Center](${env.DOMAIN_URL_SUPPORT}) and include the following information with your request:

* The name of the paid Auth0 tenant to which the additional child tenant will be linked
* The number of new child tenants needed
* A name for each of the new child tenants

In limited circumstances, you may have up to three child tenants associated with a paid tenant. However, we encourage you to use as few child tenants as possible.

## Usage

Activity and usage on child tenants count toward the master's tenant activity and usage limitations.
