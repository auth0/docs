<!--markdownlint-disable MD041 -->

In a Capacitor application, the [Capacitor's Browser plugin](https://capacitorjs.com/docs/apis/browser) performs a redirect to the Auth0 [Universal Login Page](https://auth0.com/universal-login). Set the `openUrl` parameter on the `loginWithRedirect` function to use `Browser.open` so that the URL is opened using the device's system browser component ([SFSafariViewController](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller) on iOS, and [Chrome Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs) on Android).

:::note
By default, the SDK's `loginWithRedirect` method uses `window.location.href` to navigate to the login page in the default browser application on the user's device rather than the system browser component appropriate for the platform. The user would leave your application to authenticate and could make for a suboptimal user experience.
:::