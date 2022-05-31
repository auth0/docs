<!--markdownlint-disable MD041 -->

In a Capacitor application, the [Capacitor's Browser plugin](https://capacitorjs.com/docs/apis/browser) performs a redirect to the Auth0 [Universal Login Page](https://auth0.com/universal-login). Use the `buildAuthorizeUrl` function to get the URL to redirect the user.

:::note
If you have used the Auth0 Angular SDK before, you might be familiar with the `loginWithRedirect` method that redirects your SPA to the Auth0 Universal Login Page so that your users can authenticate before returning to your app.

This is done internally when you set `window.location.href` to the correct URL. This isn't desireable behavior for a Capacitor application since the default browser application on the user's device is used rather than the system browser component appropriate for the platform. The user would leave your application to authenticate and could make for a suboptimal user experience.
:::