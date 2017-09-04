---
description: Use multiple Auth0 accounts to manage various environments.
---
# Set Up Multiple Environments

__Development__, __Test__, __Q&A__ environments are easy to setup in Auth0. Simply create a new account for each to guarantee the maximum isolation between these environments. You can easily switch between accounts using the account chooser from the top right menu on the dashboard. You can also configure different administrators for each.

![](/media/articles/lifecycle/environments.png)

The example above uses a simple naming convention to distinguish each environment, you can name your multiple environments anyway you prefer. No need to use this naming convention, though it is the one recommended.

::: note
You can request a [child account](/dev-lifecycle/child-tenants) for use in a development/staging/testing environment. Note that free accounts do not include a child account.
:::

## Migration

Through the [Management API v2](/api/management/v2), you can automate the migration of assets (rules, database connections, and so forth) between accounts.

For easier configuration management, save your configuration values in the [Dashboard](${manage_url}/#/rules), instead of hardcoding them into your __rules__ or __db connections__ scripts.

For example, let's say you want to set a URL for logs. One way to do it is to hardcode it in the rule:

```js
function(user, context, callback){
  var log_url = 'https://someurl/log';
  ...
}
```

This code however is not portable since this URL will likely change from development to production.

The recommended way is to navigate to the [Dashboard > Rules](${manage_url}/#/rules), scroll at the bottom of the page, set your configuration value (we will use `log_url` for the key name, and `https://someurl/log` for value), and click __Create__.

![Rules Configuration Values](/media/articles/lifecycle/rules-conf-values.png)

Now you can write your rule as follows:

```js
function(user, context, callback){
  var log_url = configuration.log_url;
  ...
}
```

This code is portable and when you migrate to production you only need to change this setting, instead of searching your scripts.

## AD/LDAP Connectors

Since an AD/LDAP Connector is tied to a specific Connection within an Auth0 account, if you setup multiple Auth0 accounts, you will need to create an AD/LDAP Connection and setup an AD/LDAP Connector for each account that requires this form of authentication.

Multiple AD/LDAP Connectors can point to the same AD or LDAP directory, but each AD/LDAP connector can only be used by one Connection within one Auth0 account.

If you have multiple AD/LDAP directories against which users will authenticate (for example, to support different departments or customers, each with their own directory) you can setup multiple AD/LDAP Connectors within each Auth0 account.
