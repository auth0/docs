::: note
After creating your first application, you should [set the environment for your tenant](/dev-lifecycle/setting-up-env#set-the-environment). Options include development, staging, or production.
:::

## Next Steps

Once you have registered and configured your Application, some common next steps are:

- Configure a [Connection](/connections) and enable it for your Application

- Modify your app code to use your Auth0-registered Application. See our [quickstarts](/quickstarts), where you'll find detailed instructions and samples for a variety of technologies. You'll also learn how to implement login and logout, handle your user sessions, retrieve and display user profile information, add [Rules](/rules) to customize your [authentication flow](/application-auth), and more.

- Call an API using our [API Authorization](/api-auth) feature set.

- Use [Auth0 APIs](/api/info).

  - The [Authentication API](/api/authentication) handles all primary identity-related functions (for example: login, logout, get user profile). Most users consume this API through our [Quickstarts](/quickstarts), the [Auth0.js library](/libraries/auth0js), or the [Lock widget](/libraries/lock). However, if you are building all of your authentication UI manually, you will have to interact with this API directly.

  - The [Management API](/api/management/v2) allows you to automate various tasks that can also be accessed via the Dashboard in Auth0 (for example: creating users, setting application grant types).