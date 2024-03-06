---
title: Add login to your JavaScript App
description: 'Auth0 allows you to add authentication to your JavaScript application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing JavaScript application using the Auth0 SPA SDK.'
interactive: true
github:
  path: 01-Login
files:
  - files/app
---

# Add Login to Your JavaScript Application

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in a Single-Page Application (SPA) that uses plain JavaScript, using the [Auth0 SPA SDK](https://github.com/auth0/auth0-spa-js).

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

Auth0 provides a SPA SDK (auth0-spa-js) to simplify the process of implementing Auth0 authentication and authorization in JavaScript applications. You can install the Auth0 SPA SDK as an NPM package or from the CDN. For the purpose of this quickstart, we will use the CDN. Include this script tag on your HTML page:

```html
<script src="${auth0spajs_urlv2}"></script>
```

## Create the Auth0 client {{{ data-action=code data-code="app.js#1:7" }}}

Create a new instance of the Auth0 client provided by the Auth0 SPA SDK and provide the Auth0 application details you created earlier in this quickstart.

If a user has previously logged in, the client will refresh the authentication state on page load; the user will still be logged in once the page is refreshed.

## Add login to your application {{{ data-action=code data-code="app.js#8:14" }}}

Now that you have configured your Auth0 Application, added the Auth0 SPA SDK, and created the Auth0 client, you need to set up login for your project. To do this, you will use the SDK’s `loginWithRedirect()` method to redirect users to the Auth0 Universal Login page where Auth0 can authenticate them. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.

Create a login button in your application that calls `loginWithRedirect()` when selected.

::::checkpoint
::: checkpoint-default
You should now be able to log in to your application.

Run your application, and select the login button. Verify that:

- you can log in or sign up using a username and password
- your application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page
- you are redirected to Auth0 for authentication
- Auth0 successfully redirects back to your application after authentication
- you do not receive any errors in the console related to Auth0
:::

:::checkpoint-failure
Sorry about that. Here are a few things to double check:

- make sure that the correct application is selected
- make sure you saved after entering your URLs
- make sure the Auth0 client has been correctly configured with your Auth0 domain and client ID

Still having issues? To get more help, check out our [documentation](/) or visit our [community page](https://community.auth0.com).

:::
::::

## Handle the callback from Auth0 {{{ data-action=code data-code="app.js#16:21" }}}

When the browser is redirected back to your application process, your application should call the `handleRedirectCallback()` function on the Auth0 client only when it detects a callback from Auth0. One way to do this is to only call `handleRedirectCallback()` when `code` and `state` query parameters are detected.

If handling the callback was successful, the parameters should be removed from the URL so the callback handler will not be triggered the next time the page loads.

::::checkpoint
::: checkpoint-default
Your callback from Auth0 should now be properly handled.

Run your application, and select the login button again. Verify that:

- Auth0 successfully redirects back to your application after authentication.
- the query parameters are removed from the URL.
:::

::: checkpoint-failure
Sorry about that. Here are a few things to double check:

- check that the `redirect_uri` option has been configured to your application's URL
- if you have an `error` query parameter, inspect it to learn the cause of the error

Still having issues? To get more help, check out our [documentation](/) or visit our [community page](https://community.auth0.com).
:::
::::

## Add logout to your application {{{ data-action=code data-code="app.js#23:29" }}}

Users who log in to your project will also need [a way to log out](/logout/guides/logout-auth0). The Auth0 client provides a `logout()` method that you can use to log a user out of your app. When users log out, they will be redirected to your [Auth0 logout endpoint](/api/authentication?javascript#logout), which will then immediately redirect them to your application and the logout URL you set up earlier in this quickstart.

Create a logout button in your application that calls `logout()` when selected.

:::note
The SDK exposes an `isAuthenticated()` function that allows you to check whether a user is authenticated or not. You can render the login and logout buttons conditionally based on the value of the `isAuthenticated()` function. Alternatively, you can use a single button to combine both login and logout buttons as well as their conditional rendering.
:::

::::checkpoint
::: checkpoint-default
You should now be able to log out of your application.

Run your application, log in, and select the logout button. Verify that:

- you are redirected to Auth0's logout endpoint.
- Auth0 successfully redirects back to your application and the correct logout URL.
- you are no longer logged in to your application.
- you do not receive any errors in the console related to Auth0.

:::

::: checkpoint-failure
Sorry about that. Here are a few things to double check:

- make sure that you configured the logout URL as one of the **Allowed Logout URLS** in your application's **Settings**
- inspect the [application logs](https://manage.auth0.com/#/logs) for further errors

Still having issues? To get more help, check out our [documentation](/) or visit our [community page](https://community.auth0.com).
:::
::::

## Show user profile information {{{ data-action=code data-code="app.js#31:45" }}}

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to personalize the user interface by displaying a logged-in user’s name or profile picture.

The Auth0 SPA SDK provides user information through the `getUser()` function exposed by the Auth0 client. The Auth0 client also exposes an `isAuthenticated()` function that allows you to check whether a user is authenticated or not, which you can use to determine whether to show or hide UI elements, for example. Review the code in the interactive panel to see examples of how to use these functions.

::::checkpoint
::: checkpoint-default
You should now be able to view user profile information.

Run your application, and verify that:

- user information displays correctly after you have logged in.
- user information does not display after you have logged out.
:::

::: checkpoint-failure
Sorry about that. Here are a few things to double check:

- ensure that all the previous steps work without issue
- check your code that manages the UI in response to the authentication state
- inspect the [application logs](https://manage.auth0.com/#/logs) for further errors relating to silent authentication

Still having issues? To get more help, check out our [documentation](/) or visit our [community page](https://community.auth0.com).
:::
::::
