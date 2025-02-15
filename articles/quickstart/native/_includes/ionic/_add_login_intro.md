<!--markdownlint-disable MD041 -->

In a Capacitor application, the <a href="https://capacitorjs.com/docs/apis/browser" target="_blank">Capacitors Browser plugin</a> performs a redirect to the Auth0 <a href="https://auth0.com/universal-login" target="_blank">Universal Login Page</a>. Set the `openUrl` parameter on the `loginWithRedirect` function to use `Browser.open` so that the URL is opened using the device's system browser component (<a href="https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller" target="_blank">SFSafariViewController</a> on iOS, and <a href="https://developer.chrome.com/docs/android/custom-tabs" target="_blank">Chrome Custom Tabs</a> on Android).

:::note
By default, the SDK's `loginWithRedirect` method uses `window.location.href` to navigate to the login page in the default browser application on the user's device rather than the system browser component appropriate for the platform. The user would leave your application to authenticate and could make for a suboptimal user experience.
:::