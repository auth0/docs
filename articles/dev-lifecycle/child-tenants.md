---
description: How to request to have a child tenant
---

# Child account request process

This process is for self service customers that request a test/dev/staging account to be linked to their paid production account. It is not applicable for accounts that have a free plan.

The test/dev/staging accounts are called child accounts.

## Child account policy

* Accounts that pay 167 US$ per month or more are eligible for one free test account, with the same plan/features.
* The child account will be subject to Auth0’s [Operational Policies](/policies).
* If the child account is downgraded to a free plan and a paid plan subscription is terminated, all the additional features that it had will be removed or restricted as outlined in [pricing](https://auth0.com/pricing).
* **The child account must not be used in a production environment.**


## How to request a child account?

Requests for a child account must be made via the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}), at least 5 business days in advance of the desired implementation date.

You must include the following information in your request:
* The name of the Auth0 paying account for which the child account will be linked to.
* The name of the new Auth0 child account.

## How to alter the plan of my account?

If you are upgrading your account, your child accounts will be upgraded too. Please note that before downgrading your plan, you have to contact us via the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}), otherwise there might be collateral effects on both of your accounts.

## Does the child account need to belong to the same region as the master account?

No, there is no limitation regarding this.

## Can I have more than one child account for my master account?

The default answer is no. However, this will be decided for each case. Please contact us via the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}) and inform us the following:
* The name of the Auth0 paying account for which the child account will be linked to.
* The number of child accounts that you need.
* The name of each of the new Auth0 child accounts.

Note that you can ask up to 3 child accounts. So you can have one for development, one for staging and one for testing. We encourage you to keep things simple and have only one child account.

## Usage considerations

Please notice that usage on child accounts counts towards the master's account usage.
