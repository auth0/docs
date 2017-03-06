---
title: Custom Login
description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login screen.
seo_alias: android
budicon: 448
---

This quickstart will show you how to add Auth0 login capabilities while using a customized login screen.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '02-Custom-Login',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

Go to the [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) section in the Auth0 dashboard and make sure that **Allowed Callback URLs** contains the next value, replacing the `YOUR_APP_PACKAGE_NAME` with your application's package name.

```
https://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

<%= include('_includes/_auth0') %>


### Configure Your Manifest File

You need to add the following permission inside the `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Implement The Login

At this point, you're all set to implement the login in any activity you want.

First, in your customized login method, instantiate the Authentication API Client:

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
auth0.setOIDCConformant(true);
AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
```

Then, login using the newly created client:

```java
String connectionName = "Username-Password-Authentication";
client.login(email, password, connectionName)
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
```

In this example we're logging in using an Auth0 Database Connection called "Username-Password-Authentication". You can also [create your own](https://manage.auth0.com/#/connections/database/new).

> There are multiple ways of designing a customized login screen which are not covered in this tutorial. You can take the [Android Studio's Login template](https://developer.android.com/studio/projects/templates.html#LoginActivity) as an example.
