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

# Add login to your Ionic Angular with Capacitor app

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with an Ionic (Angular) & Capacitor application using the [Auth0 SPA SDK](https://github.com/auth0/auth0-spa-js).

<%= include('../_includes/ionic/_article_intro') %>

<%= include('../_includes/ionic/_configure_urls') %>

<%= include('../../_includes/_auth0-angular-install.md') %>

<%= include('../_includes/ionic/_install_plugins') %>

## Register and configure the authentication module {{{ data-action=code data-code="app.module.ts" }}}

The SDK exports `AuthModule`, a module that contains all the services required for the SDK to function. This module should be registered with your application and be configured with your Auth0 domain and Client ID.

The `AuthModule.forRoot` function takes the following configuration:

- `domain`: The "domain" value present under the "Settings" of the application you created in your Auth0 dashboard, or your custom domain if using Auth0's [Custom Domains feature](http://localhost:3000/docs/custom-domains)
- `clientId`: The Client ID value present under the "Settings" of the application you created in your Auth0 dashboard
- `redirectUri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

::::checkpoint
:::checkpoint-default
Now that you have configured your app with the Auth0 Angular SDK, run your application to verify that the SDK is initializing without error and that your application runs as it did before.
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
Provide a way for your user to log in to your app by utilising the `buildAuthorizeUrl` function to construct the login URL, and the `Browser.open` function to open it using the platform's system browser component. Observe that you are redirected to the login page at Auth0 and do not receive any errors.
:::

::: checkpoint-failure
Sorry about that. Here's a couple things to double check:

* ensure that there are no errors in the browser's console window at the point of login
* ensure the domain and Client ID are correct according to your Auth0 application in the dashboard
* if you are redirected to Auth0 and receive an error page, check the "technical details" section at the bottom for the reason for the failure
:::
::::

## Handling the login callback {{{ data-action=code data-code="app.component.ts" }}}

<%= include('../_includes/ionic/_handle_callback_intro') %>

Note that the `appUrlOpen` event callback is wrapped in `ngZone.run`, which means that the changes to observables that occur when `handleRedirectCallback` runs are picked up by the Angular app. Please read [Using Angular with Capacitor](https://capacitorjs.com/docs/guides/angular) for more details. Otherwise, the screen will not update to show the authenticated state after you log in.

<%= include('../_includes/ionic/_note_custom_schemes') %>

::::checkpoint
:::checkpoint-default
Add the `appUrlOpen` to your application's `App` component, and log in. Observe that the user is logged in to your app and that the browser window has closed.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

* check that the custom URL scheme has been registered for your chosen platform. On iOS, this means [defining a custom URL scheme on iOS](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app), or adding an [intent filter with your custom scheme on Android](https://developer.android.com/training/app-links/deep-linking)
* if the event fires but you're receiving an error, check the [logs in your Auth0 dashboard](https://manage.auth0.com/#/logs) for the reason for the error
:::
::::

## Add logout to your application {{{ data-action=code data-code="logout-button.ts" }}}

<%= include('../_includes/ionic/_add_logout_intro.md') %>

::::checkpoint
:::checkpoint-default
Provide a way for your users to log out of your application. Verify that you are redirected to Auth0 and then to the address you specified in the `returnTo` parameter and that you are no longer logged in to your application.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

* check that the URL you provided to in the `returnTo` parameter is registered as an allowed callback URL in your Auth0 dashboard
:::
::::

## Show the user profile {{{ data-action=code data-code="user-profile.ts" }}}

The Auth0 SDK helps you retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user$` property exposed by `AuthService`.

::::checkpoint
:::checkpoint-default
Provide a way for your users to see their user profile details within the app, and verify that you are able to retrieve and see your profile information on screen once you have logged in.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

* check that you are only reading the user's profile when `isLoading` is `false`
* check that `user` resolves to an object and is not `undefined`
:::
::::