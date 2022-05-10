---
title: Add Login to your Android App
description: This quickstart demonstrates how to add user login to an Android application using Auth0.
seo_alias: android
interactive: true
files:
  - files/build
  - files/strings
  - files/main
github:
  path: 00-Login-Kt
---

# Add Login to your Android App

<!-- markdownlint-disable MD002 MD041 -->

<!-- markdownlint-disable MD002 MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Android', callback: 'http://localhost:4200', returnTo: 'http://localhost:4200', webOriginUrl: 'http://localhost:4200', showLogoutInfo: true, showWebOriginInfo: false, new_js_sdk: false, show_install_info: false }) %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URL** to `demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback`.
:::

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.

<%= include('../../../_includes/_logout_url', { returnTo: 'demo://' + account.namespace + '/android/YOUR_APP_PACKAGE_NAME/callback' }) %>

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.

## Install the Auth0 Android SDK {{{ data-action=code data-code="build.gradle#18" }}}

Add the [Auth0 Android](https://github.com/auth0/Auth0.Android) SDK into your project. The library will make requests to the Auth0's Authentication and Management APIs.

In your app's `build.gradle` dependencies section, add the following:

```groovy
implementation 'com.auth0.android:auth0:2.+'
```

Ensure you target Java 8+ byte code for Android and Kotlin plugins respectively.

## Add Manifest Placeholders {{{ data-action=code data-code="build.gradle#10:12" }}}

Add manifest placeholders required by the SDK. The placeholders are used internally to define an `intent-filter` that captures the authentication callback URL. For this, the Auth0 tenant domain and the scheme that take part in the callback URL must be set.

You do not need to declare a specific `intent-filter` for your activity, because you have defined the manifest placeholders with your Auth0 **Domain** and **Scheme** values and the library will handle the redirection for you.

::: note
We've used a value of `demo` for `auth0Scheme` here, so that a custom URL scheme can be used for the URL that Auth0 redirects to after login. The alternative is `https` if you want to use [Android App Links](https://auth0.com/docs/applications/enable-android-app-links). You can read more about setting this value in the [Auth0.Android SDK README](https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking).
:::

## Configure your Application {{{ data-action=code data-code="strings.xml#2:3" }}}

For the SDK to function properly, you must set the following properties in strings.xml:

- `com_auth0_domain`: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), you should set this to the value of your custom domain instead.
- `com_auth0_client_id`: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.

Ensure that the `android.permissions.INTERNET` permission is specified in the `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Run **Sync Project with Gradle Files** inside Android Studio or execute `./gradlew clean assembleDebug` from the command line.

::: note
For more information about using Gradle, check the [Gradle official documentation](https://gradle.org/getting-started-android-build/).
:::

## Add Login to your App {{{ data-action=code data-code="MainActivity.kt#6:38" }}}

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

In the `onCreate` method, create a new instance of the `Auth0` class to hold user credentials:

Create a `loginWithBrowser` method and use the `WebAuthProvider` class to authenticate with any connection you enabled on your application in the [Auth0 dashboard](${manage_url}/#/). Here, you can pass the scheme value that was used in the `auth0Scheme` manifest placeholder as part of the initial configuration:

After you call the `WebAuthProvider#start` function, the browser launches and shows the login page. Once the user authenticates, the callback URL is called. The callback URL contains the final result of the authentication process.

::::checkpoint

:::checkpoint-default

Add a button to your application that calls `loginWithBrowser`. When you click it, verify that your Android application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your app.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the Allowed Callback URLs is set properly
* did you save after entering your URLs?
* make sure the domain and client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add Logout to your App {{{ data-action=code data-code="MainActivity.kt#40:52" }}}

Use `WebAuthProvider` to remove the cookie set by the Browser at authentication time, so that the users are forced to re-enter their credentials the next time they try to authenticate.

Add a `logout` method to your app to remove the user's session and log them out of the app. Here, you can pass the scheme value that was used in the `auth0Scheme` manifest placeholder as part of the initial configuration:

The logout is achieved by using the `WebAuthProvider` class. This call will open the Browser and navigate the user to the logout endpoint. If the log out is cancelled, you might want to take the user back to where they were before attempting to log out.

::::checkpoint

:::checkpoint-default

Add a button to your app that calls `logout` and logs the user out of your application. When you click it, verify that your Android app redirects you logout page and back again, and that you are no longer logged in to your application.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the Allowed Logout URLs is set properly
* did you save after entering your URLs?

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Show User Profile Information {{{ data-action=code data-code="MainActivity.kt#54:70" }}}

Use the `AuthenticationAPIClient` class to [retrieve the user's profile from Auth0](https://auth0.com/docs/users/user-profiles#user-profile-management-api-access). This requires:

- The access token as received during the login phase
- The `profile` scope to be included when `WebAuthProvider.login` is called

The `email` scope must also be specified if the user's email address is to be retrieved.

:::note
This quickstart sets the `openid profile email` scopes by default during the login step above.
:::

The following demonstrates a function that can be used to retrieve the user's profile and show it on the screen:

::::checkpoint

:::checkpoint-default
Call the `showUserProfile` function after login and verify that the user's profile information has been returned in the `onSuccess` callback.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* Ensure a valid `accessToken` is used

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::