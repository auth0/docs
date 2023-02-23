---
title: Add login to your Ionic React with Capacitor app
default: true
description: This tutorial demonstrates how to add user login with Auth0 to an Ionic React & Capacitor application.
budicon: 448
topics:
  - quickstarts
  - native
  - ionic
  - react
  - capacitor
github:
  path: react
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/index
  - files/login-button
  - files/logout-button
  - files/app
  - files/user-profile
---

# Add login to your Ionic React with Capacitor app

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with an Ionic (React) & Capacitor application using the [Auth0 React SDK](https://github.com/auth0/auth0-react).

<%= include('../_includes/ionic/_article_intro') %>

<%= include('../_includes/ionic/_configure_urls_interactive') %>

<%= include('../../_includes/_auth0-react-install.md') %>

<%= include('../_includes/ionic/_install_plugins') %>

## Configure the `Auth0Provider` component {{{ data-action=code data-code="index.tsx" }}}

Under the hood, the Auth0 React SDK uses [React Context](https://reactjs.org/docs/context.html) to manage the authentication state of your users. One way to integrate Auth0 with your React app is to wrap your root component with an `Auth0Provider` you can import from the SDK.

The `Auth0Provider` component takes the following props:

- `domain`: The `domain` value present under the **Settings** of the application you created in your Auth0 Dashboard, or your custom domain if using Auth0's [Custom Domains feature](http://localhost:3000/docs/custom-domains).
- `clientId`: The Client ID value present under the **Settings** of the application you created in your Auth0 Dashboard.
- `useRefreshTokens`: To use auth0-react with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-react with Ionic on Android and iOS, it's required to disable the iframe fallback.
- `authorizationParams.redirect_uri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

:::: checkpoint
:::checkpoint-default
Add the `Auth0Provider` component in a way that wraps your `App` component, then run your application to verify that the SDK is initializing correctly and your application is not throwing any errors related to Auth0.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- ensure the correct application is selected
- did you save after entering your URLs?
- make sure the domain and Client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add login to your application {{{ data-action=code data-code="login-button.tsx" }}}

<%= include('../_includes/ionic/_add_login_intro') %>

::::checkpoint
::: checkpoint-default
The `loginWithRedirect` function tells the SDK to initiate the login flow, using the `Browser.open` function to open the login URL with the platform's system browser component by setting the `openUrl` parameter. This provides a way for your user to log in to your application. Users redirect to the login page at Auth0 and do not receive any errors.
:::

::: checkpoint-failure
Sorry about that. Here's a couple things to double check:

- ensure that there are no errors in the browser's console window at the point of login
- ensure the domain and Client ID are correct according to your Auth0 application in the dashboard
- if you are redirected to Auth0 and receive an error page, check the "technical details" section at the bottom for the reason for the failure
  :::
  ::::

## Handle the login callback {{{ data-action=code data-code="app.tsx" }}}

<%= include('../_includes/ionic/_handle_callback_intro') %>

<%= include('../_includes/ionic/_note_custom_schemes') %>

::::checkpoint
:::checkpoint-default
Add the `appUrlOpen` to your application's `App` component and log in. The browser window should close once the user authenticates and logs in to your app.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- check that the custom URL scheme is registered for your chosen platform. On iOS, [define a custom URL scheme](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app), or add an [intent filter with your custom scheme](https://developer.android.com/training/app-links/deep-linking) on Android
- if the event fires but you receive an error, check the [logs in your Auth0 Dashboard](https://manage.auth0.com/#/logs) for the reason for the error
  :::
  ::::

## Add logout to your application {{{ data-action=code data-code="logout-button.tsx" }}}

<%= include('../_includes/ionic/_add_logout_intro.md') %>

::::checkpoint
:::checkpoint-default
Provide a way for your users to log out of your application. Verify that you redirect to Auth0 and then to the address you specified in the `returnTo` parameter. Check that you are no longer logged in to your application.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- check that the URL you provided to in the `returnTo` parameter is registered as an allowed callback URL in your Auth0 Dashboard
  :::
  ::::

## Show the user profile {{{ data-action=code data-code="user-profile.tsx" }}}

The Auth0 React SDK retrieves the [user's profile](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user` property exposed by the `useAuth0()` hook.

Initializing the SDK is asynchronous, and you should guard the user profile by checking the `isLoading` and `user` properties. Once `isLoading` is `false` and `user` has a value, the user profile can be used.

::::checkpoint
:::checkpoint-default
Provide a way for your users to see their user profile details within the app and verify you are able to retrieve and see your profile information on screen once you have logged in.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- check that you are only reading the user's profile when `isLoading` is `false`
- check that `user` resolves to an object and is not `undefined`
  :::
  ::::
