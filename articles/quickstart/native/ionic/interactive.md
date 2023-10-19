---
title: Add login to your Ionic with Capacitor app
default: true
description: This tutorial demonstrates how to add user login with Auth0 to an Ionic & Capacitor application.
budicon: 448
topics:
  - quickstarts
  - native
  - ionic
  - angular
  - react
  - vue
  - capacitor
github:
  path: angular
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/angular/app-module
  - files/angular/app-component
  - files/angular/login-button
  - files/angular/logout-button
  - files/angular/user-profile
  - files/react/app
  - files/react/index
  - files/react/login-button
  - files/react/logout-button
  - files/react/user-profile
  - files/vue/app
  - files/vue/main
  - files/vue/login-button
  - files/vue/logout-button
  - files/vue/user-profile
defaultVariant: angular
variants:
  - angular
  - react
  - vue
---

# Add login to your Ionic with Capacitor app

Auth0 allows you to quickly add authentication and access user profile information in your application. This guide demonstrates how to integrate Auth0 with an Ionic & Capacitor application.

<%= include('../_includes/ionic/_article_intro') %>

<%= include('../_includes/ionic/_configure_urls_interactive') %>

## Install the Auth0 Angular SDK {{{ data-variant="angular" }}}

Run the following command within your project directory to install the Auth0 Angular SDK:

```bash
npm install @auth0/auth0-angular
```

The SDK exposes several types that help you integrate Auth0 with your Angular application idiomatically, including a module and an authentication service.

## Install the Auth0 React SDK {{{ data-variant="react" }}}

Run the following command within your project directory to install the Auth0 React SDK:

```bash
npm install @auth0/auth0-react
```

The SDK exposes methods and variables that help you integrate Auth0 with your React application idiomatically using [React Hooks](https://reactjs.org/docs/hooks-overview.html) or [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html).

## Install the Auth0 Vue SDK {{{ data-variant="vue" }}}

Run the following command within your project directory to install the Auth0 Vue SDK:

```bash
npm install @auth0/auth0-vue
```

The SDK exposes several types that help you integrate Auth0 with your Vue application idiomatically, including a module and an authentication service.

<%= include('../_includes/ionic/_install_plugins') %>

## Register and configure the authentication module {{{ data-action=code data-code="app.module.ts" data-variant="angular" }}}

The SDK exports `AuthModule`, a module that contains all the services required for the SDK to function. This module should be registered with your application and be configured with your Auth0 domain and Client ID.

The `AuthModule.forRoot` function takes the following configuration:

- `domain`: The `domain` value present under the **Settings** of the application you created in the Auth0 Dashboard, or your custom domain if you are using Auth0's [custom domains feature](http://localhost:3000/docs/custom-domains).
- `clientId`: The Client ID value present under the **Settings** of the application you created in the Auth0 Dashboard.
- `useRefreshTokens`: To use auth0-angular with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-angular with Ionic on Android and iOS, it's required to disable the iframe fallback.
- `authorizationParams.redirect_uri`: The URL to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

## Configure the `Auth0Provider` component {{{ data-action=code data-code="index.tsx" data-variant="react" }}}

Under the hood, the Auth0 React SDK uses [React Context](https://reactjs.org/docs/context.html) to manage the authentication state of your users. One way to integrate Auth0 with your React app is to wrap your root component with an `Auth0Provider` you can import from the SDK.

The `Auth0Provider` component takes the following props:

- `domain`: The `domain` value present under the **Settings** of the application you created in the Auth0 Dashboard, or your custom domain if you are using Auth0's [custom domains feature](http://localhost:3000/docs/custom-domains).
- `clientId`: The Client ID value present under the **Settings** of the application you created in the Auth0 Dashboard.
- `useRefreshTokens`: To use auth0-angular with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-angular with Ionic on Android and iOS, it's required to disable the iframe fallback.
- `authorizationParams.redirect_uri`: The URL to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

## Configure the `createAuth0` plugin {{{ data-action=code data-code="main.ts" data-variant="vue" }}}

The SDK exports `createAuth0`, a composable that contains all the services required for the SDK to function. This composable should be registered with your application and be configured with your Auth0 domain and Client ID.

The `createAuth0` composable takes the following configuration:

- `domain`: The `domain` value present under the **Settings** of the application you created in the Auth0 Dashboard, or your custom domain if you are using Auth0's [custom domains feature](http://localhost:3000/docs/custom-domains).
- `clientId`: The Client ID value present under the **Settings** of the application you created in the Auth0 Dashboard.
- `useRefreshTokens`: To use auth0-vue with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-vue with Ionic on Android and iOS, it's required to disable the iframe fallback.
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

## Add login to your application {{{ data-action=code data-code="login-button.ts" data-variant="angular" }}}

<%= include('../_includes/ionic/_add_login_intro') %>

## Add login to your application {{{ data-action=code data-code="login-button.tsx" data-variant="react" }}}

<%= include('../_includes/ionic/_add_login_intro') %>

## Add login to your application {{{ data-action=code data-code="LoginButton.vue" data-variant="vue" }}}

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

## Handling the login callback {{{ data-action=code data-code="app.component.ts" data-variant="angular" }}}

<%= include('../_includes/ionic/_handle_callback_intro') %>

Note that the `appUrlOpen` event callback is wrapped in `ngZone.run`. Changes to observables that occur when `handleRedirectCallback` runs are picked up by the Angular app. To learn more, read [Using Angular with Capacitor](https://capacitorjs.com/docs/guides/angular). Otherwise, the screen doesn't update to show the authenticated state after log in.

<%= include('../_includes/ionic/_note_custom_schemes') %>

## Handle the login callback {{{ data-action=code data-code="app.tsx" data-variant="react" }}}

<%= include('../_includes/ionic/_handle_callback_intro') %>

<%= include('../_includes/ionic/_note_custom_schemes') %>


## Handle the login callback {{{ data-action=code data-code="App.vue" data-variant="vue" }}}

<%= include('../_includes/ionic/_handle_callback_intro') %>

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

## Add logout to your application {{{ data-action=code data-code="logout-button.ts" data-variant="angular" }}}

<%= include('../_includes/ionic/_add_logout_intro.md') %>

## Add logout to your application {{{ data-action=code data-code="logout-button.tsx" data-variant="react" }}}

<%= include('../_includes/ionic/_add_logout_intro.md') %>

## Add logout to your application {{{ data-action=code data-code="LogoutButton.vue" data-variant="vue" }}}

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

## Show the user profile {{{ data-action=code data-code="user-profile.ts" data-variant="angular" }}}

The Auth0 SDK retrieves the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user$` property exposed by `AuthService`.

## Show the user profile {{{ data-action=code data-code="user-profile.tsx" data-variant="react" }}}

The Auth0 React SDK retrieves the [user's profile](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user` property exposed by the `useAuth0()` hook.

Initializing the SDK is asynchronous, and you should guard the user profile by checking the `isLoading` and `user` properties. Once `isLoading` is `false` and `user` has a value, the user profile can be used.

## Show the user profile {{{ data-action=code data-code="UserProfile.vue" data-variant="vue" }}}

The Auth0 Vue SDK retrieves the [user's profile](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user` property exposed by the `useAuth0()` composable.

Initializing the SDK is asynchronous, and you should guard the user profile by checking the `isLoading` and `user` properties. Once `isLoading` is `false` and `user` has a value, the user profile can be used.

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