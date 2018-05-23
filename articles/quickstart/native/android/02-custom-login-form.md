---
title: Custom Login Form
description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login form.
seo_alias: android
budicon: 448
github:
    path: 02-Custom-Login-Form
    branch: embedded-login
---

## Before Starting

You'll first need to whitelist the **Callback URL** in the "Allowed Callback URLs" section of the [Application settings](${manage_url}/#/applications) by adding the URL below. Remember to replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name, available in the `app/build.gradle` file as the `applicationId` attribute:

```text
demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

<%= include('_includes/_auth0') %>__

### Configure Your Manifest File

You need to add the INTERNET permission inside the `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Implement The Login

At this point, you're all set to implement the login in any activity you want.

### Using a Database connection

First, you'll need to instantiate the Authentication API:

```java
Auth0 auth0 = new Auth0(this);
auth0.setOIDCConformant(true);
AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
```

Then, login using the username and password.

```java
private void login(String email, String password) {
    //...
    String connectionName = "Username-Password-Authentication";
    client.login(email, password, connectionName)
        .setAudience(String.format("https://%s/userinfo", getString(R.string.com_auth0_domain)))
        .start(new BaseCallback<Credentials, AuthenticationException>() {
            @Override
            public void onSuccess(Credentials payload) {
                // Store credentials
                // Navigate to your main activity
            }

            @Override
            public void onFailure(AuthenticationException error) {
                // Show error to user
            }
        });
}
```

This example uses an Auth0 Database Connection called "Username-Password-Authentication" for logging in. You can also [create your own](${manage_url}/#/connections/database/new) connection.

::: note
There are multiple ways of designing a customized login screen which are not covered in this tutorial. You can take the [Android Studio's login template](https://developer.android.com/studio/projects/templates.html) as an example.
:::

### Using a Social connection

You'll use the `WebAuthProvider#init` method. If no connection name is given, the login page will be shown and the user may choose any of the connections enabled for your application. By calling `withConnection` you can force the user to use a specific connection. Let's do that for `Twitter`. Make sure to use a connection that is enabled in your application!

```java
private void login() {
    Auth0 auth0 = new Auth0(this);
    auth0.setOIDCConformant(true);
    WebAuthProvider.init(auth0)
        .withScheme("demo")
        .withAudience(String.format("https://%s/userinfo", getString(R.string.com_auth0_domain)))
        .withConnection("twitter")
        .start(this, new AuthCallback() {
            @Override
            public void onFailure(@NonNull Dialog dialog) {
                // Show error Dialog to user
            }

            @Override
            public void onFailure(AuthenticationException exception) {
                // Show error to user
            }

            @Override
            public void onSuccess(@NonNull Credentials credentials) {
                // Store credentials
                // Navigate to your main activity
            }
    });
}
```

There are many options to customize the authentication using `WebAuthProvider`. Make sure to check them [here](/libraries/auth0-android#implementing-web-based-auth).
