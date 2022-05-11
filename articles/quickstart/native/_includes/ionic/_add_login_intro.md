<!--markdownlint-disable MD041 -->

In a Capacitor application, the [Capacitor's Browser plugin](https://capacitorjs.com/docs/apis/browser) should be used to perform a redirect to the Auth0 [Universal Login Page](https://auth0.com/universal-login). Use the `buildAuthorizeUrl` function to get the URL to redirect the user, then pass it to `Browser.open` so that the URL is opened using the device's system browser component ([SFSafariViewController](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller) on iOS, and [Chrome Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs) on Android).

:::note
Using the `loginWithRedirect` method provided by the SDK uses `window.location.href` to navigate to the login page using the default browser application on the user's device, which provides a suboptimal user experience.
:::