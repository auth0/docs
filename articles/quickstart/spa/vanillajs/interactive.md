---
title: Add Login to your JavaScript App
description: 'Auth0 allows you to add authentication to your JavaScript application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing JavaScript application using the Auth0 SPA SDK.'
interactive: true
github:
  path: 01-Login
files:
  - files/app
---

# Add Login to your JavaScript App

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in a Single Page Application that uses plain JavaScript, using the [Auth0 SPA SDK](https://github.com/auth0/auth0-spa-js).

To use this quickstart, you’ll need to:

- Sign up for a free Auth0 account or log in to Auth0.
- Have a working project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.

:::note
This quickstart assumes you are adding Auth0 to a plain JavaScript application, as opposed to using a framework such as React or Angular.
:::

<%= include('../../_includes/_configure_auth0_interactive', {
callback: 'http://localhost:3000',
returnTo: 'http://localhost:3000',
webOriginUrl: 'http://localhost:3000',
showWebOriginInfo: true
}) %>

## Add the Auth0 SPA SDK

The Auth0 SPA SDK can be installed as an NPM package, or from the CDN. For the purposes of this quickstart, we will use the CDN.

Include this script tag on your HTML page:

```html
<script src="${auth0spajs_url}"></script>
```

## Create the Auth0 Client {{{ data-action=code data-code="app.js#1:5" }}}

To access the functions of the SDK so that the user can log in and log out of your application, create a new instance of the Auth0 client provided by the Auth0 SPA SDK, providing your Auth0 application details from when your Auth0 app was created earlier in this quickstart.

The client will also take care of refreshing the authentication state on page load, so if a user has previously logged in, they should still be logged in once the page is refreshed.

## Add Login to Your Application {{{ data-action=code data-code="app.js#6:12" }}}

The Auth0 SPA SDK gives you tools to quickly implement user authentication in your JavaScript application. Executing `loginWithRedirect()` redirects your users to the Auth0 Universal Login Page, where Auth0 can authenticate them. Upon successful authentication, Auth0 will redirect your users back to your application.

Create a button in your application that calls `loginWithRedirect()` when clicked.

::::checkpoint
::: checkpoint-default
Once you have added a login button that calls `loginWithRedirect()`, verify that you can click the button and are redirected to Auth0 for authentication, and that you do not receive any errors in the console relating to Auth0.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- make sure the correct application is selected
- did you save after entering your URLs?
- make sure the Auth0 client has been correctly configured with your Auth0 domain and client ID

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Handle the Callback from Auth0 {{{ data-action=code data-code="app.js#14:19" }}}

To process the result from Auth0 when the browser is redirected back to your application, call the `handleRedirectCallback()` function on the Auth0 client.

This should be called somewhere on page load when a callback from Auth0 is detected. One way to do this is to only call `handleRedirectCallback()` when there are `code` and `state` query parameters detected.

If handling the callback was successful, the parameters should be removed from the URL so as to not trigger the callback handler the next time the page loads.

::::checkpoint
::: checkpoint-default
Add the logic to handle the callback from Auth0 and click the login button again. Verify that Auth0 successfully redirects back to your application after authentication, and that the query parameters are removed from the URL.
:::

::: checkpoint-failure
Sorry about that. Here's a couple things to double check:

- check that the `redirect_uri` option has been configured to your application's URL
- if you have an `error` query parameter, inspect it to learn the cause of the error

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add Logout to Your Application {{{ data-action=code data-code="app.js#21:27" }}}

Now that you can log in to your application, you need [a way to log out](/logout/guides/logout-auth0). The Auth0 client provides a `logout()` method that you can use to log a user out of your app. Executing `logout()` redirects your users to your [Auth0 logout endpoint](/api/authentication?javascript#logout) and then immediately redirects them back to your application.

::::checkpoint
::: checkpoint-default
Add a logout button to your app and call the `logout()` function when it is clicked. Verify that the application redirects to Auth0's logout endpoint, and then immediately back to your application.
:::

::: checkpoint-failure
Sorry about that. Here's a couple things to double check:

- verify that the correct logout URL has been added to the "Allowed Logout URLs" configuration box for your Auth0 app
- inspect the [application logs](https://manage.auth0.com/#/logs) for further errors

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Show User Profile Information {{{ data-action=code data-code="app.js#29:43" }}}

The Auth0 SPA SDK helps you retrieve the [profile information](/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `getUser()` function exposed by the Auth0 client.

The client also exposes an `isAuthenticated()` function that allows you to check whether a user is authenticated or not. This can be used to show or hide UI elements, for example.

Review the code in the sidebar for an example of how to retrieve and use it.

::::checkpoint
::: checkpoint-default
Use the `isAuthenticated()` and `getUser()` functions to show some UI in your application when the user is logged in, and show a different interface when the user is logged out. Verify that your UI displays correctly depending on the user's authentication state.
:::

::: checkpoint-failure
Sorry about that. Here's a couple things to double check:

- ensure that all the previous steps work without issue
- double-check your code that manages the UI in response to the authentication state
- inspect the [application logs](https://manage.auth0.com/#/logs) for further errors relating to silent authentication

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::