---
description: Use multiple Auth0 tenants to manage various environments.
tags:
    - dev-tools
    - local-env
---
# Set Up Multiple Environments

__Development__, __Test__, __Q&A__ environments are easy to setup in Auth0. Simply create a new tenant for each to guarantee the maximum isolation between these environments. You can easily switch between tenants using the tenant chooser from the top right menu on the dashboard. You can also configure different administrators for each.

::: warning
Moving your tenant to a Development environment will impact [rate limits](https://auth0.com/docs/policies/rate-limits) for calls to the Authentication and Management API.
:::

![](/media/articles/lifecycle/environments.png)

The example above uses a simple naming convention to distinguish each environment, you can name your multiple environments anyway you prefer. No need to use this naming convention, though it is the one recommended.

::: note
If you have a subscription plan costing at least **$167 (USD) per month**, you can request a [child account](/dev-lifecycle/child-tenants) that is identical to your Production account for use in a development/staging/testing environment. This includes paid/upgraded features, as well as individual configuration options, such as Rules. Free accounts do *not* include a child account.
:::

## Set the Environment

For each new tenant created, you should specify its environment. You can assign environment tags to your tenants to differentiate between development, staging, and production environments.

To assign an environment tag to a tenant, go to the [Auth0 Support Center > Tenants](${env.DOMAIN_URL_SUPPORT}/tenants/public). Locate your tenant and click the gear icon to bring up the **Settings** section.

![Support Center Tenants](/media/articles/clients/support-tenants.png)

Next, select the **Assign Environment Tag** option. Use the form to identify your tenant's environment as either `Development`, `Staging`, or `Production`.

If your tenant is mixed use, choose the higher environment. For example, a tenant used for both development and production should be set to `Production`.

After selecting the environment, click on **Save Changes**.

![Support Center Tenants Settings](/media/articles/clients/support-tenants-settings.png)

## Migration

Through the [Management API v2](/api/management/v2), you can automate the migration of assets (rules, database connections, and so forth) between tenants.

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

Since an AD/LDAP Connector is tied to a specific Connection within an Auth0 tenant, if you setup multiple Auth0 tenants, you will need to create an AD/LDAP Connection and setup an AD/LDAP Connector for each tenant that requires this form of authentication.

Multiple AD/LDAP Connectors can point to the same AD or LDAP directory, but each AD/LDAP connector can only be used by one Connection within one Auth0 tenant.

If you have multiple AD/LDAP directories against which users will authenticate (for example, to support different departments or customers, each with their own directory) you can setup multiple AD/LDAP Connectors within each Auth0 tenant.
