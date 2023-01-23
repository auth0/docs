<!--markdownlint-disable MD041 -->

Once users logs in with the Universal Login Page, they redirect back to your app via a URL with a custom URL scheme. The `appUrlOpen` event must be handled within your app. You can call the `handleRedirectCallback` method from the Auth0 SDK to initialize the authentication state.

You can only use this method on a redirect from Auth0. To verify success, check for the presence of the `code` and `state` parameters in the URL.

The `Browser.close()` method should close the browser when this event is raised.
