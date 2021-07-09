<!--markdownlint-disable MD041 -->

Once a user has logged in using the Universal Login Page, they will be redirected back to your app using a URL with a custom URL scheme. The `appUrlOpen` event must be handled within your app, where `handleRedirectCallback` can be called to initialize the authentication state within the SDK.