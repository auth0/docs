<!--markdownlint-disable MD041 -->

Once users log in using the Universal Login Page, they redirect back to your application using a URL with a custom URL scheme. The `appUrlOpen` event must be handled within your app, where `handleRedirectCallback` is called to initialize the authentication state within the SDK.