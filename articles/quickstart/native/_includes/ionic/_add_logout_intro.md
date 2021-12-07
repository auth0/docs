<!--markdownlint-disable MD041 -->

Now that you can log in, you need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). To do this, the user must be redirected to the Auth0 logout endpoint in the browser in order to clear their browser session. Again, Capacitor's Browser plugin should be used to perform this redirect so that the user does not leave your app and otherwise receive a suboptimal experience.

To achieve this with Ionic and Capacitor in conjunction with the Auth0 SDK, the steps are:

* Use the SDK to build the URL to the logout endpoint by calling `buildLogoutUrl`
* Call the `logout` function on the SDK, setting `localOnly: true`. This will clear the internal state of the SDK but not perform the redirect to Auth0
* Redirect the user to the logout endpoint using `Browser.open`