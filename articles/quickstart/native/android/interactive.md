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

# Add Login to Your Android Application

<!-- markdownlint-disable MD002 MD041 -->

<!-- markdownlint-disable MD002 MD034 MD041 -->

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure authentication in your project.
### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your Application in the <a href="${manage_url}/#/" target="_blank" rel="noreferrer">Dashboard</a>, which is where you can manage your Applications in the future.

If you would rather explore a complete configuration, you can view a sample application instead.

### Configure callback URLs

A callback URL is the application URL that Auth0 will direct your users to once they have authenticated. If you do not set this value, Auth0 will not return users to your application after they log in.

::: note
If you are following along with our sample project, set this to `demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback`.
:::

### Configure logout URLs

A logout URL is the application URL Auth0 will redirect your users to once they log out. If you do not set this value, users will not be able to log out from your application and will receive an error.

::: note
If you are following along with our sample project, set this to `demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback`.
:::

## Install the Auth0 Android SDK {{{ data-action=code data-code="build.gradle#18" }}}

Add the <a href="https://github.com/auth0/Auth0.Android" target="_blank" rel="noreferrer">Auth0 Android</a> SDK into your project. The library will make requests to the Auth0's Authentication and Management APIs.

In your app's `build.gradle` dependencies section, add the following:

```groovy
implementation 'com.auth0.android:auth0:2.+'
```

Ensure you target Java 8+ byte code for Android and Kotlin plugins respectively.

## Add manifest placeholders {{{ data-action=code data-code="build.gradle#10:12" }}}

The SDK requires manifest placeholders. Auth0 uses placeholders internally to define an `intent-filter`, which captures the authentication callback URL. You must set Auth0 tenant domain and the callback URL scheme.

You do not need to declare a specific `intent-filter` for your activity, because you have defined the manifest placeholders with your Auth0 **Domain** and **Scheme** values and the library will handle the redirection for you.

::: note
We've used a value of `demo` for `auth0Scheme` here, so that a custom URL scheme can be used for the URL that Auth0 redirects to after login. The alternative is `https` if you want to use <a href="https://auth0.com/docs/applications/enable-android-app-links" target="_blank" rel="noreferrer">Android App Links</a>. You can read more about setting this value in the <a href="https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking" target="_blank" rel="noreferrer">Auth0.Android SDK README</a>.
:::

## Configure your application {{{ data-action=code data-code="strings.xml#2:3" }}}

For the SDK to function properly, you must set the following properties in `strings.xml`:

- `com_auth0_domain`: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, you should set this to the value of your custom domain instead.
- `com_auth0_client_id`: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.

Ensure that the `AndroidManifest.xml` file specifies the `android.permissions.INTERNET` permission:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Run **Sync Project with Gradle Files** inside Android Studio or execute `./gradlew clean assembleDebug` from the command line.

::: note
For more information about using Gradle, check the <a href="https://gradle.org/getting-started-android-build/" target="_blank" rel="noreferrer">Gradle official documentation</a>.
:::

## Add login to your application {{{ data-action=code data-code="MainActivity.kt#6:38" }}}

<a href="/hosted-pages/login" target="_blank" rel="noreferrer">Universal Login</a> is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

In the `onCreate` method, create a new instance of the `Auth0` class to hold user credentials.

Create a `loginWithBrowser` method and use the `WebAuthProvider` class to authenticate with any connection you enabled on your application in the <a href="${manage_url}/#/" target="_blank" rel="noreferrer">Auth0 dashboard</a>. Here, you can pass the scheme value that was used in the `auth0Scheme` manifest placeholder as part of the initial configuration.

After you call the `WebAuthProvider#start` function, the browser launches and shows the login page. Once the user authenticates, the callback URL is called. The callback URL contains the final result of the authentication process.

::::checkpoint

:::checkpoint-default

Add a button to your application that calls `loginWithBrowser`. When you click it, verify that your Android application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" rel="noreferrer">Auth0 Universal Login</a> page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your app.

:::

:::checkpoint-failure

If your application did not launch successfully:
* Ensure you set the Allowed Callback URLs are correct
* Verify you saved your changes after entering your URLs
* Make sure the domain and cliend ID values imported correctly

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.

:::
::::

## Add logout to your application {{{ data-action=code data-code="MainActivity.kt#40:52" }}}

Use `WebAuthProvider` to remove the cookie set by the browser at authentication time, so that the users are forced to re-enter their credentials the next time they try to authenticate.

Add a `logout` method to your app to remove the user's session and log them out of the app. Here, you can pass the scheme value that was used in the `auth0Scheme` manifest placeholder as part of the initial configuration.

Use the `WebAuthProvider` class to implement logout. This call opens the browser and navigates the user to the logout endpoint. If the user cancels the logout, consider redirected the user to their previous URL.
::::checkpoint

:::checkpoint-default

Add a button to your app that calls `logout` and logs the user out of your application. When you click it, verify that your Android app redirects you logout page and back again, and that you are no longer logged in to your application.

:::

:::checkpoint-failure
If your application did not logout successfully:
* Ensure the Allowed Logout URLs are set properly
* Verify you saved your changes after entering your URLs

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.

:::
::::

## Show user profile information {{{ data-action=code data-code="MainActivity.kt#54:70" }}}

Use the `AuthenticationAPIClient` class to <a href="https://auth0.com/docs/users/user-profiles#user-profile-management-api-access" target="_blank" rel="noreferrer">retrieve the users profile from Auth0</a>. This requires:

- The access token returned from the login phase
- The `WebAuthProvider.login` must contain the `profile` scope

You must specify the `email` scope if you need to retreive the user's email address.

:::note
This quickstart sets the `openid profile email` scopes by default during the login step above.
:::

The following demonstrates a function that can be used to retrieve the user's profile and show it on the screen:

::::checkpoint

:::checkpoint-default
Call the `showUserProfile` function after login. Verify the `onSuccess` callback returns the user's profile information. 

:::

:::checkpoint-failure
If your application did not return user profile information:
* Verify the `accessToken` is valid

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.

:::
::::
