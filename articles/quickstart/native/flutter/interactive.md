---
title: Add login to your Flutter app
default: true
description: This tutorial demonstrates how to add user login with Auth0 to an Android or iOS Flutter application using the Auth0 Flutter SDK
budicon: 448
topics:
  - quickstarts
  - native
  - flutter
  - dart
  - ios
  - android
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/build
  - files/main
  - files/profile
github:
  path: sample
---

# Add login to your Flutter app

Auth0 allows you to quickly add authentication and access user profile information in your application. This guide demonstrates how to integrate Auth0 with a Flutter application using the [Auth0 Flutter SDK](https://github.com/auth0/auth0-flutter).

:::note
The Flutter SDK currently only supports Flutter applications running on Android or iOS platforms.
:::

## Getting started

This quickstart assumes you already have a [Flutter](https://flutter.dev/) application up and running. If not, check out the [Flutter "getting started" guides](https://docs.flutter.dev/get-started/install) to get started with a simple app.

You should also be familiar with the [Flutter command line tool](https://docs.flutter.dev/reference/flutter-cli).

<%= include('_configure_urls_interactive') %>

## Install the Auth0 Flutter SDK

Add the Auth0 Flutter SDK into the project:

```shell
flutter pub add auth0_flutter
```

## Configure Android {{{ data-action=code data-code="build.gradle#11" }}}

If you are not developing for the Android platform, skip this step.

The SDK requires manifest placeholders. Auth0 uses placeholders internally to define an `intent-filter`, which captures the authentication callback URL. You must set the Auth0 tenant domain and the callback URL scheme.

You do not need to declare a specific `intent-filter` for your activity because you defined the manifest placeholders with your Auth0 **Domain** and **Scheme** values. The library handles the redirection for you.

The sample uses values from `strings.xml`:

- `com_auth0_domain`: The domain of your Auth0 tenant. Generally, you find this in the Auth0 Dashboard under your Application's **Settings** in the Domain field. If you are using a custom domain, you should set this to the value of your custom domain instead.
- `com_auth0_scheme`: The scheme to use. Can be a custom scheme, or `https` if you want to use [Android App Links](https://auth0.com/docs/applications/enable-android-app-links). You can read more about setting this value in the [Auth0.Android SDK README](https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking).

Run **Sync Project with Gradle Files** inside Android Studio to apply your changes.

## Configure iOS

If you are not developing for the iOS platform, skip this step.

You need to register your bundle identifier as a custom URL scheme so the callback and logout URLs can reach your app.

In Xcode, go to the **Info** tab of your app target settings. In the **URL Types** section, select the **＋** button to add a new entry. Then enter `auth0` into the **Identifier** field and `$(PRODUCT_BUNDLE_IDENTIFIER)` into the **URL Schemes** field.

<p><img src="/media/articles/native-platforms/ios-swift/url-scheme.png" alt="Custom URL Scheme"></p>

## Add login to your app {{{ data-action="code" data-code="main_view.dart#29:38" }}}

[Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security, and the fullest array of features.

Integrate Auth0 Universal Login in your Flutter app by using the `Auth0` class. Redirect your users to the Auth0 Universal Login page using `webAuthentication().login()`. This is a `Future` and must be awaited for you to retrieve the user's tokens.

**Android**: if you are using a custom scheme, pass this scheme to the login method so that the SDK can route to the login page and back again correctly:

```dart
await auth0.webAuthentication(scheme: 'YOUR CUSTOM SCHEME').login();
```

When a user logs in, they are redirected back to your application. Then, you are able to access the ID and access tokens for this user.

::::checkpoint
:::checkpoint-default
Add a button to your app that calls `webAuthentication().login()` and logs the user into your app. Verify that you are redirected to Auth0 for authentication and then back to your application.

Verify that you can get access to the tokens on the result of calling `login`.
:::

:::checkpoint-failure
If your application did not launch successfully:

- Ensure you set the Allowed Callback URLs are correct
- Verify you saved your changes after entering your URLs
- Make sure the domain and client ID values are imported correctly
- If using Android, ensure that the manifest placeholders have been set up correctly, otherwise the redirect back to your app may not work

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add logout to your app {{{ data-action=code data-code="main_view.dart#43:51"}}}

To log users out, redirect them to the Auth0 logout endpoint to clear their login session by calling the Auth0 Flutter SDK `webAuthentication().logout()`. [Read more about logging out of Auth0](https://auth0.com/docs/authenticate/login/logout).

**Android**: if you are using a custom scheme, pass this scheme to the logout method so that the SDK can route back to your app correctly:

```
await auth0.webAuthentication(scheme: 'YOUR CUSTOM SCHEME').logout();
```

::::checkpoint
:::checkpoint-default
Add a button to your app that calls `webAuthentication().logout()` and logs the user out of your application. When you select it, verify that your Flutter app redirects you to the logout endpoint and back again. You should not be logged in to your application.
:::

:::checkpoint-failure
If your application did not log out successfully:

- Ensure the Allowed Logout URLs are set properly
- Verify you saved your changes after entering your URLs

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Show user profile information {{{ data-action="code" data-code="profile_view.dart" }}}

The user profile automatically retrieves user profile properties for you when you call `webAuthentication().login()`. The returned object from the login step contains a `user` property with all the user profile properties, which populates by decoding the ID token.

::::checkpoint
:::checkpoint-default
Log in and inspect the `user` property on the result. Verify the current user's profile information, such as `email` or `name`.
:::
:::checkpoint-failure
If your application did not return user profile information:

- Verify the access token is valid

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::
