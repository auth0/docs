## Make Calls to Your API with Access Control

Introducing access control for your API requires the use of a `scope` claim in the user's Access Token. These claims can be registered and controlled in the **APIs** section of your Auth0 dashboard. The implementation pattern for `scope` is at your discretion, but a common pattern that allows for fine-grained access control is `<action>:<resource>`. If you want a user to have write access to a `friends` resource, your `scope` can be `write:friends`.

Navigate to **APIs** and choose the **Scopes** tab. Register a `scope` name and give it a description.

With a `scope` registered, it can be requested when the user authenticates. Modify the `scope` parameter of your `Auth0Lock` instance to include the claim. This example uses a `scope` of `read:messages`.
