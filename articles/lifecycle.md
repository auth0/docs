---
description: Use multiple Auth0 accounts to manage various environments.
---

# Development Lifecycle in Auth0

__Development__, __Test__, __Q&A__ environments are easy to setup in Auth0. Simply create a new account for each to guarantee the maximum isolation between these environments. You can easily switch between accounts using the account chooser from the top right menu on the dashboard. You can also configure different administrators for each.

![](/media/articles/lifecycle/environments.png)

The example above uses a simple naming convention to distinguish each environment.

## Migration

Through the [Management API v2](https://auth0.com/docs/api/management/v2), you can automate the migration of assets (e.g. rules, database connections, etc.) between accounts.

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
