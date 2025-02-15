#### Add a Scope

By default, the Access Token does not contain any authorization information. To limit access to your resources based on authorization, you must use scopes. Read more about scopes in the  <a href="/scopes" target="_blank">scopes documentation</a>.

In the Auth0 dashboard, in the <a href="$manage_url/#/apis" target="_blank">APIs section</a>, click **Scopes**. Add any scopes you need to limit access to your API resources.

::: note
You can give any names to your scopes. A common pattern is `<action>:<resource>`. The example below uses the name `read:messages` for a scope.
:::

![create scope](/media/articles/api-auth/create-scope.png)