#### Add a Scope

By default, the Access Token does not contain any authorization information. To limit access to your resources based on authorization, you must use scopes. Read more about scopes in the  [scopes documentation](/scopes).

In the Auth0 dashboard, in the [APIs section](${manage_url}/#/apis), click **Scopes**. Add any scopes you need to limit access to your API resources.

::: note
You can give any names to your scopes. A common pattern is `<action>:<resource>`. The example below uses the name `read:messages` for a scope.
:::

![create scope](/media/articles/api-auth/create-scope.png)