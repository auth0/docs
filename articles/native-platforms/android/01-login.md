---
title: Login
description: This tutorial will show you how to integrate Lock v2 in your Android project in order to present a login screen.
---

This tutorial will show you how to integrate Lock v2 in your Android project in order to present a login screen.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/01-Login',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-android-sample',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: '01-Login/app/src/main/res/values/strings.xml',
  pkgType: 'replace'
}) %>

### Before Starting

### 1. Add the Lock dependency

Your first step is to add [Lock](https://github.com/auth0/Lock.Android) into your project. Lock is a library for displaying a native UI in your app for logging in and signing up with different platforms via [Auth0](https://auth0.com/).

#### i. Gradle

Add to your app's module Gradle file:

```xml
compile 'com.auth0.android:lock:2.0.0-beta.3'
```

Then, run "Sync project with Gradle files" inside Android Studio or `./gradlew clean assembleDebug` from the command line.

> For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).

### 2. Configure Your Manifest File

Add the following code to your project's `AndroidManifest.xml`:

```xml
<activity
    android:name="com.auth0.android.lock.LockActivity"
    android:label="@string/app_name"
    android:launchMode="singleTask"
    android:screenOrientation="portrait"
    android:theme="@style/Lock.Theme">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data
            android:host="${account.namespace}"
            android:pathPrefix="/android/YOUR_APP_PACKAGE_NAME/callback"
            android:scheme="https" />
    </intent-filter>
</activity>

<activity android:name="com.auth0.android.lock.provider.WebViewActivity"></activity>
```

Also, you need to add the following permissions:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

> Do not add ``<android:noHistory="true">`` to the ``LockActivity`` as this will alter the correct functionality of **Lock**.

### 3. Implement the Login

At this point, you're all set to implement the login in any activity you want.

First, add these lines in the ``onCreate`` method:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    Auth0 auth0 = new Auth0(${account.clientId}, ${account.namespace});
    this.lock = Lock.newBuilder(auth0, callback)
                    // Add parameters to the Lock Builder
                    .build();
    this.lock.onCreate(this);
}
```

Second, add these lines in the ``onDestroy`` method:

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    // Your own Activity code
    this.lock.onDestroy(this);
    this.lock = null;
}
```

Third, add the authentication callback, inside your activity:

```java
private LockCallback callback = new AuthenticationCallback() {
    @Override
    public void onAuthentication(Credentials credentials) {
        // Login Success response
    }

    @Override
    public void onCanceled() {
        // Login Cancelled response
    }

    @Override
    public void onError(LockException error){
        // Login Error response
    }
};
```

Finally, whenever you want to start the login widget, call:

```java
startActivity(this.lock.newIntent(this));
```

<div class="phone-mockup"><img src="/media/articles/libraries/lock-android/login.png" alt="Mobile example screenshot"/></div>

> If you need in depth configuration, you can find more information on [Lock Builder](/libraries/lock-android#lock-builder)

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](02-custom-login).

### Done!

You've already implemented both login and signup with Auth0 in your Android project!

### Optional: Log In with Social Connections

In order to have a simple login mechanism through social connections, all you have to do is enable them in your account's [dashboard](${uiURL}/#/connections/social). Every social connection you switch on there, will appear in the login screen of your app.
