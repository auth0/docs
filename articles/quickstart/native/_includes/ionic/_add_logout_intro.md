<!--markdownlint-disable MD041 -->

Now that you can log in, you need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). To do this, the user must be redirected to the Auth0 logout endpoint in the browser in order to clear their browser session. Again, Capacitor's Browser plugin should be used to perform this redirect so that the user does not leave your app and otherwise receive a suboptimal experience.

To achieve this with Ionic and Capacitor in conjunction with the Auth0 SDK, the steps are:

* Construct the URL for your app that Auth0 should use to redirect to after logout. This is a URL that uses your registered custom scheme and Auth0 domain, and must be added to your **Allowed Logout URLs** configuration in the Auth0 dashboard
* Use the SDK to build the URL to the logout endpoint by calling `buildLogoutUrl`, and passing your redirect URL back as the `returnTo` parameter
* Call the `logout` function on the SDK, setting `localOnly: true`. This will clear the internal state of the SDK but not automatically perform the redirect to Auth0
* Redirect the user to the logout endpoint using `Browser.open`

:::note
Similar to the login step, if you do not set `localOnly: true` when calling `logout`, the SDK will redirect the user to the logout URL using the default browser application on the device, which will provide a suboptimal user experience.
:::
