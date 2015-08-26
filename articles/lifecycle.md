# Development Lifecycle in Auth0

__Development__, __Test__, __Q&A__ environments are easy to create in Auth0. You simply create a new account for each. This guarantees maximum isolation between them. You can easily switch between accounts using the account chooser on the top right menu on the dashboard. You can also have different administrative accounts in each.

![](https://docs.google.com/drawings/d/1ceFEtCtIvZz_0J7ugDgxAMAv4YPIIYKOmfa4lzFbQDo/pub?w=607&h=298)

The example above uses a simple naming convention to distinguish one environment from the other.

Through the API you can automate migrating assets between one account and the other (e.g. rules, database connections, etc.).

If you set up multiple Auth0 accounts, one caveat to keep in mind is that if you are using the AD/LDAP Connector for authentication against AD or an LDAP directory, you will need to create an AD/LDAP connection and set up an AD/LDAP connector for each Auth0 account that needs this form of authentication.  An AD/LDAP Connector is tied to a specific Connection within an Auth0 account.  It is possible to have multiple AD/LDAP Connectors within one Auth0 account.  This is needed if you have multiple AD/LDAP directories against which users will authenticate, for example to support different departments or customers, each with their own directory. In addition, multiple AD/LDAP connectors can point to the same AD or LDAP directory, but an AD/LDAP connector can only be used by one connection within one Auth0 account.

For easier configuration management we recommend you use settings kept in the dashboard as opposed to hardcoded in your __rules__ or __db connections__ scripts.

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

Very likely this URL will change from development to production. This will make your code more portable.

You can also maintain the source code of the rules in a GitHub repository. If you choose the GitHub integration route, the rules in your Auth0 account will be automatically updated whenever a change is submitted to the GitHub repository. To configure this integration see [here](/source-control).
