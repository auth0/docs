<!--markdownlint-disable MD041 -->

Now that users can log in, you need to configure [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). Users must redirect to the Auth0 logout endpoint in the browser to clear their browser session. Again, Capacitor's Browser plugin should perform this redirect so that the user does not leave your app and receive a suboptimal experience.

To achieve this with Ionic and Capacitor in conjunction with the Auth0 SDK:

* Use the SDK to build the URL to the logout endpoint by calling `buildLogoutUrl`.
* Call the `logout` function on the SDK. Set `localOnly: true`. This clears the internal state of the SDK but does not redirect to Auth0.
* Redirect the user to the logout endpoint using `Browser.open`.