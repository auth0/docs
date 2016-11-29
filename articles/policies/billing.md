---
description: Describes the Billing policy which governs requests for billing mechanisms within the Auth0 dashboard
---

# Billing Policy

The following policy governs requests for billing mechanisms within the Auth0 dashboard.

## Change of billing email address

It is possible to change the billing email address, but for security reasons the request should be performed by a Dashboard administrator by filing a new ticket through our [Support Center](https://support.auth0.com). A member of our support team will then contact you in that same ticket with steps on how the request will proceed.
Please note that if you are not a Dashboard administrator, we will not process this request.

### Special case

Please note that the customers who created tenants via the Heroku hosting platform have to change the billing email address (or any other billing details) in those platforms. We cannot edit any billing information if you have used one of those services.

## Why is my credit card failing?
The only way to determine the reason for the failure is for the customer to contact their credit card company by calling the number on the back. This can be triggered by a credit card reaching the limit or simply being rejected by the bank, for example.

### My credit card is failing and some features are not available anymore
If your credit card fails to be charged, we automatically retry to charge it up to 4 times. If you fix the issue before the fourth failure (by entering new card information or by solving the issue with the bank), then the charge will go through and everything will work as expected.

However, if the problem is not fixed prior to the fourth failure, all past due invoices will be manually initiated by Auth0. This means that you may be charged in an unexpected date. 

*Please note the following:* If you are having issues with the service, it is not due to the credit card failing.

## How can I cancel my subscription?
Please proceed by downgrading your subscription to free or by cancelling your subscription via the Auth0 Dashboard. 

1. Login to the Dashboard.
2. Click on your account name in the top right corner to bring up the associated dropdown box.
3. Select `Account Settings`.
4. On the `Account Settings` page, click on the `Subscription` tab.
5. On the `Subscription` tab, scroll down to the box associated with the `Free plan` and click `Checkout`.
6. To confirm your subscription change, click `Subscribe` Now.

## I signed up for a paid plan but haven't used my account since then, can I get a refund?

We understand that sometimes developers create accounts for demo or testing purposes. So if you have a subscription plan, but you have not been using our service in a while and you would like to get a refund, you should [downgrade](/tutorials/cancel-paid-subscriptions#downgrade-a-paid-subscription-to-a-free-subscription) your account to use a Free Plan. Notice that we do not provide refunds for when a plan is downgraded to another paid one that has less features. 

If you have already downgraded, please explain the situation by filing a ticket trough our [Support Center](https://support.auth0.com), and provide information about why the account has not been used and for how long. Please note that this request must come from a Dashboard Administrator. 

We will evaluate the case and verify that the account has not been used in the aforementioned period in order to process the refund. Please note that if we consider the usage of the account not to be minimal, we reserve the right to not refund your card. 

## Where can I get a copy of an invoice?

Invoices can be seen directly in the Dashboard by going to the account settings and clicking on the Payments Tab. There, you will be able to see all your Payment History, and you can get the invoices by clicking on the corresponding month. Please note that only Dashboard administrators can see the invoices. 

## How can I get a receipt from my payment?

The way to do this is by filing a ticket trough our [Support Center](https://support.auth0.com). 

Please note that you have to be a Dashboard admin to do this request. 

Also, more than often the email which receives the receipt is the one that created the Auth0 account. Please make sure that you are in touch with the owner of that email. That person can also forward you the receipt of the payment. If you want to change this setting, please let us know through our [Support Center](https://support.auth0.com).

## In our pricing, what’s the difference between internal and external users? Are they different technically?

An active user is a user that has authenticated with username/password, passwordless connection or any social provider in the last 30 days, counted per application (client in the dashboard). 
For example, if a person logs in to Client 1 through Facebook, then logs in to Client 2 through Google and then logs in to Client 2 using username/password, that would count as 3 active users, even if it's just one individual.

You will find that for certain plans, you have the ability to select between being charged for external users or for internal users. There are no technical differences between these types of users, they simply refer to whether someone is external to your company, or an internal employee. 

External users are most likely not going to be using Auth0 on a daily basis, and therefore this plan uses the active users criteria to calculate the price. On the other hand, internal users have to login everyday to their different tools and platforms in order to get the work done, so for this case you would pay a flat rate per user, rather than per active user/per app. 



