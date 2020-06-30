Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the `messages` resource if users have the manager access level, and a write access to that resource if they have the administrator access level.

You can define allowed permissions in the **Permissions** tab of the Auth0 Dashboard's [APIs](${manage_url}/#/apis) section.

![Configure Permissions](/media/articles/server-apis/configure-permissions.png)

::: note
This example uses the `read:messages` scope.
:::
