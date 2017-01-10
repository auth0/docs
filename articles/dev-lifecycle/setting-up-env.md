---
description: Use multiple Auth0 accounts to manage various environments.
---

# Setting Up Multiple Environments

__Development__, __Test__, __Q&A__ environments are easy to setup in Auth0. Simply create a new account for each to guarantee the maximum isolation between these environments. You can easily switch between accounts using the account chooser from the top right menu on the dashboard. You can also configure different administrators for each.

![](/media/articles/lifecycle/environments.png)

The example above uses a simple naming convention to distinguish each environment, you can name your multiple environments anyway you prefer. No need to use this naming convention, though it is the one recommended.

## Child account request process

This process is for self service customers that request a test/dev/staging account to be linked to their paid production account. It is not applicable for accounts that have a free plan.

The test/dev/staging accounts are called child accounts.

### Child account policy

* Accounts that pay 167 US$ per month or more are eligible for one free test account, with the same plan/features.
* The child account will be subject to Auth0’s [Operational Policies](/policies).
* The child account must not be used in a production environment.
* If the child account is downgraded to a free plan and a paid plan subscription is terminated, all the additional features that it had will be removed or restricted as outlined in [pricing](https://auth0.com/pricing).

### How to request a child account?

Requests for a child account must be made via the [Auth0 Support Center](https://support.auth0.com/), at least 5 business days in advance of the desired implementation date.

You must include the following information in your request:
* The name of the Auth0 paying account for which the child account will be linked to.
* The name of the new Auth0 child account.

### How to alter the plan of my account?

If you are upgrading your account, your child accounts will be upgraded too. Please note that before downgrading your plan, you have to contact us via the [Auth0 Support Center](https://support.auth0.com/), otherwise there might be collateral effects on both of your accounts.

### Does the child account need to belong to the same region as the master account?

No, there is no limitation regarding this.

### Can I have more than one child account for my master account?

The default answer is no. However, this will be decided for each case. Please contact us via the [Auth0 Support Center](https://support.auth0.com/) and inform us the following:
* The name of the Auth0 paying account for which the child account will be linked to.
* The number of child accounts that you need.
* The name of each of the new Auth0 child accounts.

Note that you can ask up to 3 child accounts. So you can have one for development, one for staging and one for testing. We encourage you to keep things simple and have only one child account.

### Usage considerations

Please notice that usage on child accounts counts towards the master's account usage. 

## Migration

Through the [Management API v2](/api/management/v2), you can automate the migration of assets (e.g. rules, database connections, etc.) between accounts.

For easier configuration management, save settings in the dashboard instead of hardcoded into your __rules__ or __db connections__ scripts.

For example, in this __rule__ it is always better to write:

```
function(user, context, callback){
  var log_url = configuration.log_url;
...
}
```

than:

```
function(user, context, callback){
  var log_url = ‘https://someurl/log’;
...
}
```

Since this URL will likely change from development to production, this method will make your code more portable.

## AD/LDAP Connectors

Since an AD/LDAP Connector is tied to a specific Connection within an Auth0 account, if you setup multiple Auth0 accounts, you will need to create an AD/LDAP Connection and setup an AD/LDAP Connector for each account that requires this form of authentication.

Multiple AD/LDAP Connectors can point to the same AD or LDAP directory, but each AD/LDAP connector can only be used by one Connection within one Auth0 account.

If you have multiple AD/LDAP directories against which users will authenticate, (to support different departments or customers, each with their own directory, for example), you can setup multiple AD/LDAP Connectors within each Auth0 account.


