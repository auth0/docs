---
title: Custom Login
description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login screen.
seo_alias: android
budicon: 448
---

This quickstart will show you how to add Auth0 login capabilities while using a customized login screen.

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '02-Custom-Login',
  requirements: [
    'Android Studio 2.2',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

Go to the [Client Settings](${manage_url}/#/applications/${account.clientId}/settings) section in the Auth0 dashboard and make sure that **Allowed Callback URLs** contains the value:

```
https://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

## Add The Auth0 Android Dependency

Your first step is to add [Auth0 Android](https://github.com/auth0/Auth0.Android) into your project, which is basically the library that will manage the login process, via [Auth0](https://auth0.com/) Authentication Client.

#### i. Gradle

Add to your app's module Gradle file:

```gradle
compile 'com.auth0.android:auth0:1.0.0'
```

Then, run "Sync project with Gradle files" inside Android Studio or `./gradlew clean assembleDebug` from the command line.

> For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).

### 2. Configure Your Manifest File

You need to add the following permissions inside the `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Implement The Login

At this point, you're all set to implement the login in any activity you want.

First, in your customized login method, instantiate the Authentication API:

```java
private void login(String email, String password) {
    Auth0 auth0 = new Auth0(${account.clientId}, ${account.namespace});
    AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);

    // proper login
}
```

Then, login using the newly created client:

```java
client.login(email, password, "YOUR_DATABASE_CONNECTION_NAME")
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

> There are multiple ways of designing a customized login screen which are not covered in this tutorial. You can take the [Android Studio's login template](https://developer.android.com/studio/projects/templates.html) as an example.
