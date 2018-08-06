Scopes let you define which resources can be accessed by the user with a given Access Token. For example, you might choose to grant read access to the `messages` resource if users have the manager access level, and a write access to that resource if they have the administrator access level. 

You can add the required scopes in the **Scopes** tab of the Auth0 Dashboard's [APIs](${manage_url}/#/apis) section.

![Configure Scopes](/media/articles/server-apis/configure-scopes.png)

::: note
This example uses the `read:messages` scope.
:::
