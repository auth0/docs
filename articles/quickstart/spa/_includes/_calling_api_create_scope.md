## Add a Scope

By default, the access token does not contain any authorization information. To limit access to your resources based on authorization, you must use  [scopes](https://auth0.com/docs/api-auth/tutorials/adoption/api-tokens).

In the Auth0 dashboard, in the **APIs** section, click on the **Scopes** tab. Add any scopes you need to limit access to your API resources. [](Should there be more information about how to add those scopes?)
You can give any names to your scopes. `<action>:<resource>` is a common pattern. The example below uses the `read:messages` name for a scope.

![create scope](/media/articles/api-auth/create-scope.png)