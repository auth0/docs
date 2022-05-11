<!--markdownlint-disable MD041 -->

Once a user has logged in using the Universal Login Page, they will be redirected back to your app using a URL with a custom URL scheme. The `appUrlOpen` event must be handled within your app, where the `handleRedirectCallback` method from the Auth0 SDK can be called to initialize the authentication state.

This should only be done on a redirect from Auth0 - one way to check this is by checking for the presence of the `code` and `state` parameters in the URL.

The browser can be closed when this event is raised, using `Browser.close()`.