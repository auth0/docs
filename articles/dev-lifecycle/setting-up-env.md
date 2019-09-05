---
description: Use multiple Auth0 tenants to manage various environments.
topics:
    - dev-tools
    - local-env
contentType: how-to
useCase: development
---
# Set Up Multiple Environments

__Development__, __Test__, __QA__ environments are easy to setup in Auth0. Simply create a new tenant for each to guarantee the maximum isolation between these environments. You can easily switch between tenants using the tenant chooser from the top right menu on the dashboard. You can also configure different administrators for each.

::: warning
Production [rate limits](/policies/rate-limits) only apply to tenants tagged as `Production`. Ensure your tenant's environment tag is set to `Production` before going live.
:::

![](/media/articles/lifecycle/environments.png)

The example above uses a simple naming convention to distinguish each environment, though you can name your multiple environments any way you prefer. **For production environments, we strongly recommend using [custom domains](/custom-domains).**

::: note
If you have a subscription plan costing at least **$167 (USD) per month**, you can request a [child account](/dev-lifecycle/child-tenants) that is identical to your Production account in terms of paid/upgraded features for use in a development/staging/testing environment. Free accounts do *not* include a child account.
:::

## Set the Environment

For each new tenant created, you should specify its environment. You can assign environment tags to your tenants to differentiate between development, staging, and production environments.

::: note
If your tenant is mixed use, choose the higher environment. For example, a tenant used for both development and production should be set to `Production`.
:::

To assign an environment tag to a tenant, go to the [Auth0 Support Center > Tenants](${env.DOMAIN_URL_SUPPORT}/tenants/public). Locate your tenant and click the gear icon to bring up the **Settings** section.

![Support Center Tenants](/media/articles/clients/support-tenants.png)

Next, select the **Assign Environment Tag** option. Use the form to identify your tenant's environment as either `Development`, `Staging`, or `Production`.

After selecting the environment, click on **Save Changes**.

![Support Center Tenants Settings](/media/articles/clients/support-tenants-settings.png)

## Migration

Through the [Management API v2](/api/management/v2), you can automate the migration of assets ([rules](/rules/current), database [connections](/connections), and so forth) between tenants.

For easier configuration management, save your configuration values in the [Dashboard](${manage_url}/#/rules), instead of hardcoding them into your __rules__ or __db connections__ scripts.

For example, let's say you want to set a URL for logs. One way to do it is to hardcode it in the rule:

```js
function(user, context, callback){
  var log_url = 'https://someurl/log';
  ...
}
```

This code, however, is not portable since this URL will likely change from development to production.

The recommended way of working with code that you need to use/move from development to product is via [Rules](${manage_url}/#/rules) section. If you have not yet created a rule, you'll need to do so. (Otherwise, jump to step 4.)

1. Click __Create Your First Rule__.

![Create Your First Rule](/media/articles/lifecycle/rules-create-first.png)

2. Choose the __empty rule__ template.

![Rules Templates](/media/articles/lifecycle/rules-template-empty.png)

3. Enter a name for your new rule, and click __Save__.

![Enter Rule Name](/media/articles/lifecycle/rules-enter-name.png)

4. Navigate back to [Auth0 Dashboard Rules](${manage_url}/#/rules), and scroll to the bottom of the page to set your configuration values (we will use `log_url` for the key name, and `https://someurl/log` for value), then click __Create__.

![Rules Configuration Values](/media/articles/lifecycle/rules-conf-values.png)

5. Now, you can write your rule. Edit the rule you created, enter the following code in the code area, and click __Save__.

```js
function(user, context, callback){
  var log_url = configuration.log_url;
  ...
}
```

![Write Rule Code](/media/articles/lifecycle/rules-rule-code.png)

This code is portable, and when you migrate to production, you only need to change this setting instead of searching your scripts.

## AD/LDAP Connectors

If you use multiple Auth0 tenants with AD/LDAP, you will need to create an AD/LDAP Connection and set up an AD/LDAP Connector for each tenant. This is because each AD/LDAP Connector is tied to a specific Connection within an Auth0 tenant.

Multiple AD/LDAP Connectors can point to the same AD or LDAP directory, but each AD/LDAP Connector can only be used by one Connection within one Auth0 tenant.

If you have multiple AD/LDAP directories against which users will authenticate (for example, to support different departments or customers, each with their own directory), you can set up multiple AD/LDAP Connectors within each Auth0 tenant.
