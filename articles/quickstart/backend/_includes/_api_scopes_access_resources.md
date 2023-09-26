Scopes let you define what resources the client can access on behalf of the user when requesting an access token.

::: note
For the remainder of the quickstart we will use the scope `read:messages`
:::

To Auh0 `read:messages` doesn't imply any meaning, the meaning is given when the application validates
the scope.
For example, `read:messages` implies the use to have read access over messages. Similarly, if we want to give write
permissions we would do `write:messages`.

### Define API Supported Permissions
You can define the supported permissions of the API the **Permissions** view of the Auth0 Dashboard's
[APIs](${manage_url}/#/apis) section.

![Configure Permissions](/media/articles/server-apis/configure-permissions.png)

### Define Client Scopes
By default, when creating an API Auth0 also creates a Machine To Machine Application and authorizes the API to it, but
without any scope.

On the [Applications](${manage_url}/#/applications) section, look for the `Quickstarts API` Application, then
the APIs section.
On the authorized API list, you should see the Quickstarts API and you can allow `read:messages` scope as shown in the
picture below.

![Define Client Scope](/media/articles/server-apis/client-scopes.png)
