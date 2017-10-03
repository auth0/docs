---
description: How to request child domains for your Auth0 domain
---

# Child Domain Request Process

This request process is for self-service customers requesting a development, test, or staging domain that's linked to their paid production domain. This domain is called a **child domain**.

::: note
Free domains do not include a child domain.
:::

## Child Domain Policy

* If you're billed $167 USD/month (or more), you're eligible for one free child domain with the same plan/features as the production domain.
* Your child domain is subject to Auth0’s [Operational Policies](/policies).
* If you cancel your paid subscription plan and Auth0 downgrades your child domain to the free plan, you'll lose access to features (as outlined in [pricing](https://auth0.com/pricing)) available to paid plans.

::: warning
Child domains **must not** be used in production environments.
:::

## Request a Child Domain

Please use the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}) to request that a child domain be created for you. Requests must be made at least five business days in advance of your desired implementation date.

Please include the following information with your request:

* The name of the paid Auth0 domain to which the child domain will be linked
* The name of the new Auth0 child domain

## Alter Your Domain's Subscription Plan

If you are upgrading the subscription plan associated with your paid domain, your child domain will be upgraded as well. If you downgrade, your child domain will also be affected -- please contact the Auth0 Support team using the [Support Center](${env.DOMAIN_URL_SUPPORT}) for additional details.

## Child Domain Cloud Region

The child domain does **not** have to be located in the same cloud environment as your production domain.

## Additional Child Domains

Generally speaking, we only permit one child domain per paid production domain. However, if you need additional domains, please contact us via the [Support Center](${env.DOMAIN_URL_SUPPORT}) and include the following information with your request:

* The name of the paid Auth0 domain to which the additional child domain will be linked
* The number of new child domains needed
* A name for each of the new child domains

In limited circumstances, you may have up to three child domains associated with a paid domain. However, we encourage you to use as few child domains as possible.

## Usage

Activity and usage on child domains count toward the master's domain activity and usage limitations.
