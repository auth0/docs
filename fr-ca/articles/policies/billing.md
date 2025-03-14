---
description: Describes the Billing policy which governs requests for billing mechanisms within the Auth0 dashboard
crews: crew-2
topics:
    - auth0-policies
    - billing
contentType:
  - reference
useCase:
  - support
---

# Billing Policy

The following policy governs requests for billing mechanisms within the Auth0 dashboard.

## Change of billing email address

It is possible to change the billing email address, but for security reasons the request should be performed by a Tenant Administrator by filing a new ticket through our [Support Center](${env.DOMAIN_URL_SUPPORT}). A member of our support team will then contact you in that same ticket with steps on how the request will proceed.
Please note that if you are not a Tenant Administrator, we will not process this request.

### Special case

Please note that the customers who created tenants via the Heroku hosting platform have to change the billing email address (or any other billing details) in those platforms. We cannot edit any billing information if you have used one of those services.

## Why is my credit card failing?

The only way to determine the reason for the failure is for the customer to contact their credit card company by calling the number on the back. This can be triggered by a credit card reaching the limit or simply being rejected by the bank, for example.

### My credit card is failing and some features are not available anymore

If your credit card fails to be charged, we automatically retry to charge it up to 4 times. If you fix the issue before the fourth failure (by entering new card information or by solving the issue with the bank), then the charge will go through and everything will work as expected.

However, if the problem is not fixed prior to the fourth failure, all past due invoices will be manually initiated by Auth0. This means that you may be charged on an unexpected date.

::: note
If you are having issues with the service, it is not due to the credit card failing.
:::

## How can I cancel my subscription?

Please proceed by downgrading your subscription to free or by cancelling your subscription via the Auth0 Dashboard.

1. Login to the [Dashboard](${manage_url}).
2. Click on your tenant name in the top right corner to bring up the associated dropdown box.
3. Select **Settings**.
4. On the [Tenant Settings](${manage_url}/#/tenant/) page, click on the **Subscription** tab.
5. On the **Subscription** tab, scroll down to the box associated with the Free plan and click **Checkout**.
6. To confirm your subscription change, click **Subscribe Now**.

## Refunds

### I signed up for a paid plan but haven't used my tenant since then, can I get a refund?

We understand that sometimes developers create tenants for demo or testing purposes. So if you have a subscription plan, but you have not been using our service in a while and you would like to get a refund, you should [downgrade](/tutorials/cancel-paid-subscriptions#downgrade-a-paid-subscription-to-a-free-subscription) your tenant to use a Free Plan. Notice that we do not provide refunds for when a plan is downgraded to another paid one that has less features.

If you have already downgraded, please explain the situation by filing a ticket trough our [Support Center](${env.DOMAIN_URL_SUPPORT}), and provide information about why the tenant has not been used and for how long. Please note that this request must come from a Tenant Administrator.

We will evaluate the case and verify that the tenant has not been used in the aforementioned period in order to process the refund. Please note that if we consider the usage of the tenant not to be minimal, we reserve the right to not refund your card.

### I purchased more tenant subscriptions than desired/needed, can I get a refund?

If you bought unneeded subscriptions, you are eligible for a refund. 

Please explain the situation by filing a ticket trough our [Support Center](${env.DOMAIN_URL_SUPPORT}), and provide all the information possible. Please note that this request must come from a Tenant Administrator.

### I purchased a wrong plan in self service or trial and would like to downgrade, can I get a refund?

You can get a refund only for an unused portion of subscription of 3 months or less, when there has been no logins. 

Please explain the situation by filing a ticket trough our [Support Center](${env.DOMAIN_URL_SUPPORT}), and provide all the information possible. Please note that this request must come from a Tenant Administrator.

### Any other scenario not mentioned above

Please explain the situation by filing a ticket trough our [Support Center](${env.DOMAIN_URL_SUPPORT}), and provide all the information possible. Please note that this request must come from a Tenant Administrator.

## Where can I get a copy of an invoice?

Invoices can be seen directly in the Dashboard by going to the [Tenant Settings](${manage_url}/#/tenant/) and clicking on the **Payments** tab. There you view all your Payment History, and you can get the invoices by clicking on the corresponding month. Please note that only Tenant Administrators can see the invoices.

## How can I get a receipt for my payment?

The way to do this is by filing a ticket trough our [Support Center](${env.DOMAIN_URL_SUPPORT}).

Please note that you have to be a Tenant admin to do this request.

Also, more than often the email which receives the receipt is the one that created the Auth0 tenant. Please make sure that you are in touch with the owner of that email. That person can also forward you the receipt of the payment. If you want to change this setting, please let us know through our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Do you charge sales tax?

For US-based customers, we will charge sales tax where applicable. This is dependent on your state's sales tax laws and requirements. For non-US customers, we will not charge sales tax.

You can determine if you will be responsible for sales tax during the checkout process after you provide your billing address. If the billing address provided is tax-eligible, you'll see the sales tax added to your total. You will also see the sales tax amount on all of your Auth0 invoices and receipts.

## In our pricing, what is the difference between internal and external users? Are they different technically?

An active user is a user that has authenticated with a username/password combination, a <dfn data-key="passwordless">Passwordless</dfn> connection, or any social provider in a given calendar month.

Auth0 counts users on a per-tenant basis. That means that somebody who logs in to multiple applications still counts as one user as long as you've created all of the applications using a single tenant.

You will find that for certain plans, you have the ability to select between being charged for external users or for internal users. There are no technical differences between these types of users, they simply refer to whether someone is external to your company, or an internal employee.

External users are most likely not going to be using Auth0 on a daily basis, and therefore this plan uses the active users criteria to calculate the price.

On the other hand, internal users have to login everyday to their different tools and platforms in order to get the work done, so for this case you would pay a flat rate per user.

## Can we scale the number of users as needed each month?

Definitely. In the Dashboard, you can do this by going to the upper right corner, and selecting **Settings** from the drop down menu. Then in the **Subscriptions** tab you can select them depending on your needs. More information about it can be found there or in our [Pricing page](https://auth0.com/pricing/).

## Can we combine billing for multiple tenants?

Unfortunately combined billing is not supported for regular self-service tenants. The only two cases where we support combined billing are:

1. For enterprise customers
2. For customers whose master tenant is billed at $167 per month (or more). In this case, we mark the testing tenant as [a child tenant](https://auth0.com/docs/dev-lifecycle/child-tenants) and bill only the master tenant.

## How can I convert my tenant from a free trial to any other version?

You can do this by heading to the upper right corner of the Dashboard, clicking your tenant name and selecting **Settings**. Then in the **Subscriptions** tab you can select the plan that best suits your needs. More information about this can be found there or in our [Pricing page](https://auth0.com/pricing/).
