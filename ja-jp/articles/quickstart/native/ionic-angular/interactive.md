---
title: Add login to your Ionic Angular with Capacitor app
default: true
description: This tutorial demonstrates how to add user login with Auth0 to an Ionic Angular & Capacitor application.
budicon: 448
topics:
  - quickstarts
  - native
  - ionic
  - angular
  - capacitor
github:
  path: angular
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/app-module
  - files/app-component
  - files/login-button
  - files/logout-button
  - files/user-profile
---

# Add Login to Your Ionic Angular with Capacitor Application

Auth0 allows you to quickly add authentication and access user profile information in your application. This guide demonstrates how to integrate Auth0 with an Ionic (Angular) & Capacitor application using the [Auth0 Angular SDK](https://github.com/auth0/auth0-angular).

<%= include('../_includes/ionic/_article_intro') %>

<%= include('../_includes/ionic/_configure_urls_interactive') %>

<%= include('../../_includes/_auth0-angular-install.md') %>

<%= include('../_includes/ionic/_install_plugins') %>

## Register and configure the authentication module {{{ data-action=code data-code="app.module.ts" }}}

The SDK exports `AuthModule`, a module that contains all the services required for the SDK to function. This module should be registered with your application and be configured with your Auth0 domain and Client ID.

The `AuthModule.forRoot` function takes the following configuration:

- `domain`: The `domain` value present under the **Settings** of the application you created in the Auth0 Dashboard, or your custom domain if you are using Auth0's [custom domains feature](http://localhost:3000/docs/custom-domains).
- `clientId`: The Client ID value present under the **Settings** of the application you created in the Auth0 Dashboard.
- `useRefreshTokens`: To use auth0-angular with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-angular with Ionic on Android and iOS, it's required to disable the iframe fallback.
- `authorizationParams.redirect_uri`: The URL to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

::::checkpoint
:::checkpoint-default
Now that you have configured your app with the Auth0 Angular SDK, run your application to verify that the SDK is initializing without error, and that your application runs as it did before.
:::
:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* ensure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and Client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add login to your application {{{ data-action=code data-code="login-button.ts" }}}

<%= include('../_includes/ionic/_add_login_intro') %>

::::checkpoint
::: checkpoint-default
The `loginWithRedirect` function tells the SDK to initiate the login flow, using the `Browser.open` function to open the login URL with the platform's system browser component by setting the `openUrl` parameter. This provides a way for your user to log in to your application. Users redirect to the login page at Auth0 and do not receive any errors.
:::

::: checkpoint-failure
Sorry about that. Here's a couple things to double check:

* ensure that there are no errors in the browser's console window at the point of login
* ensure the domain and Client ID are correct according to your Auth0 application in the Dashboard
* if you are redirected to Auth0 and receive an error page, check the "technical details" section at the bottom for the reason for the failure
:::
::::

## Handling the login callback {{{ data-action=code data-code="app.component.ts" }}}

<%= include('../_includes/ionic/_handle_callback_intro') %>

Note that the `appUrlOpen` event callback is wrapped in `ngZone.run`. Changes to observables that occur when `handleRedirectCallback` runs are picked up by the Angular app. To learn more, read [Using Angular with Capacitor](https://capacitorjs.com/docs/guides/angular). Otherwise, the screen doesn't update to show the authenticated state after log in.

<%= include('../_includes/ionic/_note_custom_schemes') %>

::::checkpoint
:::checkpoint-default
Add the `appUrlOpen` to your application's `App` component and log in. The browser window should close once the user authenticates and logs in to your app.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

* check that the custom URL scheme is registered for your chosen platform. On iOS, [define a custom URL scheme](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app), or add an [intent filter with your custom scheme](https://developer.android.com/training/app-links/deep-linking) for Android
* if the event fires but you receive an error, check the [logs in your Auth0 Dashboard](https://manage.auth0.com/#/logs) for the error code
:::
::::

## Add logout to your application {{{ data-action=code data-code="logout-button.ts" }}}

<%= include('../_includes/ionic/_add_logout_intro.md') %>

::::checkpoint
:::checkpoint-default
Provide a way for your users to log out of your application. Verify the redirect to Auth0 and then to the address you specified in the `returnTo` parameter. Make sure users are no longer logged in to your application.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

* check that the URL you provided to in the `returnTo` parameter is registered as an allowed callback URL in your Auth0 Dashboard
:::
::::

## Show the user profile {{{ data-action=code data-code="user-profile.ts" }}}

The Auth0 SDK retrieves the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user$` property exposed by `AuthService`.

::::checkpoint
:::checkpoint-default
Provide a way for your users to see their user profile details within the app and verify you are able to retrieve and see your profile information on screen once you have logged in.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

* check that you are only reading the user's profile when `isLoading` is `false`
* check that `user` resolves to an object and is not `undefined`
:::
::::
