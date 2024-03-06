---
title: Add login to your Flutter app
default: true
description: This tutorial demonstrates how to add user login with Auth0 to a Flutter Web application using the Auth0 Flutter SDK
budicon: 448
topics:
  - quickstarts
  - flutter
  - dart
  - spa
  - web
  - browser
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/main
  - files/profile
github:
  path: sample
---

<!-- markdownlint-disable MD025 MD034 -->

# Add Login to Your Flutter Application

Auth0 allows you to quickly add authentication and access user profile information in your application. This guide demonstrates how to integrate Auth0 with a Flutter application using the [Auth0 Flutter SDK](https://github.com/auth0/auth0-flutter).

:::note
The Flutter SDK currently only supports Flutter applications running on Android, iOS, or Web platforms.
:::

This quickstart assumes you already have a [Flutter](https://flutter.dev/) application up and running. If not, check out the [Flutter "getting started" guides](https://docs.flutter.dev/get-started/install) to get started with a simple app.

You should also be familiar with the [Flutter command line tool](https://docs.flutter.dev/reference/flutter-cli).

<%= include('../_includes/_getting_started', { library: 'Flutter', callback: 'http://localhost:3000', returnTo: 'http://localhost:3000', webOriginUrl: 'http://localhost:3000', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true, show_install_info: false }) %>

<%= include('_install_sdk') %>

## Add login to your application {{{ data-action="code" data-code="main_view.dart#34" }}}

[Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security, and the fullest array of features.

Integrate Auth0 Universal Login in your Flutter Web app by using the `Auth0Web` class. Redirect your users to the Auth0 Universal Login page using `loginWithRedirect()`.

:::note
You will normally need to specify the `redirectUrl` parameter to `loginWithRedirect`. Omitting this will cause Auth0 to use the [default login route](https://auth0.com/docs/authenticate/login/auth0-universal-login/configure-default-login-routes), which is not configured by default.
:::

When a user logs in, they are redirected back to your application. You are then able to access the ID and access tokens for this user by calling `onLoad` during startup and handling the credentials that are given to you:

```dart
auth0.onLoad().then((final credentials) => setState(() {
    // Handle or store credentials here
    _credentials = credentials;
  }));
```

::::checkpoint
:::checkpoint-default
Add a button to your app that calls `loginWithRedirect()` and logs the user into your app. Verify that you are redirected to Auth0 for authentication and then back to your application.

Verify that you can access `credentials` as a result of calling `onLoad` and that you're able to access the ID and access tokens.
:::

:::checkpoint-failure
If your application did not launch successfully:

- Ensure the Allowed Callback URLs are set properly
- Verify you saved your changes after entering your URLs
- Make sure the domain and client ID values are imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add logout to your application {{{ data-action=code data-code="main_view.dart#46"}}}

To log users out, redirect them to the Auth0 logout endpoint to clear their login session by calling the Auth0 Flutter SDK `logout()`. [Read more about logging out of Auth0](https://auth0.com/docs/authenticate/login/logout).

:::note
You will normally want to specify `returnToUrl` when calling `logout`, otherwise Auth0 [will default to the first URL in the Allowed Logout URLs list](https://auth0.com/docs/authenticate/login/logout/redirect-users-after-logout).
:::

::::checkpoint
:::checkpoint-default
Add a button to your app that calls `logout()` and logs the user out of your application. When you select it, verify that your Flutter app redirects you to the logout endpoint and back again. You should not be logged in to your application.
:::

:::checkpoint-failure
If your application did not log out successfully:

- Ensure the Allowed Logout URLs are set properly
- Verify you saved your changes after entering your URLs

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Show user profile information {{{ data-action="code" data-code="profile_view.dart" }}}

The user profile automatically retrieves user profile properties for you when the page loads, and can be accessed and stored by calling `onLoad` during application startup. The returned object from `onLoad` contains a `user` property with all the user profile properties. This is internally populated by decoding the ID token.

::::checkpoint
:::checkpoint-default
Log in and inspect the `user` property on the result. Verify the current user's profile information, such as `email` or `name`.
:::
:::checkpoint-failure
If your application did not return user profile information:

- Verify the ID token is valid

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::
