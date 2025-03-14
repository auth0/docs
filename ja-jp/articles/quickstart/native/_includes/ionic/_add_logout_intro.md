<!--markdownlint-disable MD041 -->

Now that users can log in, you need to configure [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). Users must redirect to the Auth0 logout endpoint in the browser to clear their browser session. Again, Capacitor's Browser plugin should perform this redirect so that the user does not leave your app and receive a suboptimal experience.

To achieve this with Ionic and Capacitor in conjunction with the Auth0 SDK:

* Construct the URL for your app Auth0 should use to redirect to after logout. This is a URL that uses your registered custom scheme and Auth0 domain. Add it to your **Allowed Logout URLs** configuration in the Auth0 Dashboard
* Logout from the SDK by calling `logout`, and pass your redirect URL back as the `logoutParams.returnTo` parameter.
* Set the `openUrl` parameter to a callback that uses the Capacitor browser plugin to open the URL using `Browser.open`. 

:::note
Similar to the login step, if you do not set `openUrl` when calling `logout`, the SDK redirects the user to the logout URL using the default browser application on the device, which provides a suboptimal user experience.
:::