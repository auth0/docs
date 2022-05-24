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

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with an Ionic (React) & Capacitor application using the [Auth0 SPA SDK](https://github.com/auth0/auth0-spa-js).

<%= include('../_includes/ionic/_article_intro') %>

<%= include('../_includes/ionic/_configure_urls_interactive') %>

<%= include('../../_includes/_auth0-react-install.md') %>

<%= include('../_includes/ionic/_install_plugins') %>

## Configure the `Auth0Provider` component {{{ data-action=code data-code="index.tsx" }}}

Under the hood, the Auth0 React SDK uses [React Context](https://reactjs.org/docs/context.html) to manage the authentication state of your users. One way to integrate Auth0 with your React app is to wrap your root component with an `Auth0Provider` that you can import from the SDK.

The `Auth0Provider` component takes the following props:

- `domain`: The "domain" value present under the "Settings" of the application you created in your Auth0 dashboard, or your custom domain if using Auth0's [Custom Domains feature](http://localhost:3000/docs/custom-domains)
- `clientId`: The Client ID value present under the "Settings" of the application you created in your Auth0 dashboard
- `redirectUri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

:::: checkpoint
:::checkpoint-default
Add the `Auth0Provider` component in a way that wraps your `App` component, then run your application to verify that the SDK is initializing correctly, and your application is not throwing any errors related to Auth0.
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
Provide a way for your user to log in to your app by utilising the `buildAuthorizeUrl` function to construct the login URL, and the `Browser.open` function to open it using the platform's system browser component. Observe that you are redirected to the login page at Auth0 and do not receive any errors.
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
Add the `appUrlOpen` to your application's `App` component, and log in. Observe that the user is logged in to your app and that the browser window has closed.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- check that the custom URL scheme has been registered for your chosen platform. On iOS, this means [defining a custom URL scheme on iOS](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app), or adding an [intent filter with your custom scheme on Android](https://developer.android.com/training/app-links/deep-linking)
- if the event fires but you're receiving an error, check the [logs in your Auth0 dashboard](https://manage.auth0.com/#/logs) for the reason for the error
  :::
  ::::

## Add logout to your application {{{ data-action=code data-code="logout-button.tsx" }}}

<%= include('../_includes/ionic/_add_logout_intro.md') %>

::::checkpoint
:::checkpoint-default
Provide a way for your users to log out of your application. Verify that you are redirected to Auth0 and then to the address you specified in the `returnTo` parameter and that you are no longer logged in to your application.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- check that the URL you provided to in the `returnTo` parameter is registered as an allowed callback URL in your Auth0 dashboard
  :::
  ::::

## Show the user profile {{{ data-action=code data-code="user-profile.tsx" }}}

The Auth0 React SDK helps you retrieve the [user's profile](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user` property exposed by the `useAuth0()` hook.

As the initialization of the SDK is asynchronous, guard the reading of the user profile by checking the `isLoading` and `user` properties. Once `isLoading` is `false` and `user` has a value, the user profile can be used.

::::checkpoint
:::checkpoint-default
Provide a way for your users to see their user profile details within the app, and verify that you are able to retrieve and see your profile information on screen once you have logged in.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- check that you are only reading the user's profile when `isLoading` is `false`
- check that `user` resolves to an object and is not `undefined`
  :::
  ::::
