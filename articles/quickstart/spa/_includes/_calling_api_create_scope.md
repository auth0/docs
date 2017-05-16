## Add a Scope

When an `access_token` is received after a user authenticates in your app, it is simply an indication that they have proven their identity. By default, however, the `access_token` does not contain any **authorization** information. To properly limit access to your resources based on authorization, you must use [scopes](https://auth0.com/docs/api-auth/tutorials/adoption/api-tokens).

In the settings area for your API within the Auth0 dashboard, navigate to the **Scopes** tab. Add any scopes necessary to limit access to your API resources. While the naming of the scopes is at your discretion, a common pattern is to use `<action>:<resource>`. The example here will use a `read:messages` scope.

![create scope](/media/articles/api-auth/create-scope.png)