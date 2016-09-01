# Lock Android: The Basics Of Using Lock

This document exposes how to integrate Lock in your Android project, as well as how to accomplish some basic functionalities that you will need the most, such as presenting the login and sign up dialogs, or closing them.

## Requirements

Android API level 15+ is required in order to use Lock's UI.
If you'll create your own API and just call Auth0 API via the `com.auth0.android:core:1.13.+`, the minimum required API level is 9.

## Installation

Lock is available through adding it to your project with the [Gradle](https://gradle.org/) dependency manager.

Just add to your app's module Gradle file:

```xml
compile 'com.auth0.android:lock:2.0.0-beta.3'
```

Then, run `Sync project with Gradle files` inside Android Studio or `./gradlew clean assembleDebug` from the command line.

Otherwise, just clone the [Lock.Android](https://github.com/auth0/Lock.Android/tree/v2) repository and integrate it manually in your project.

## Configuration

Lock requires a little bit of manual configuration before getting started. 

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
> 
> ⚠️ Replace the placeholders that appear between curly braces with your credentials, which you can quickly get from your [Auth0 dashboard](${uiURL}/#/applications).

## Usage

#### 1. Show the Lock widget

The default Lock widget includes dialogs for:

- Login
- Sign Up
- Password Recovery
- Social Connections Authentication


`Lock` will handle email/password, enterprise, and social provider authentication based on the connections enabled on your client in the [Auth0 Dashboard](${uiURL}/#/connections/social).

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
You will see the Lock native widget login screen:

<div class="phone-mockup"><img src="/media/articles/libraries/lock-android/login.png" alt="Mobile example screenshot"/></div>

> If you need in depth configuration, you can find more information on [Lock Builder](/libraries/lock-android#lock-builder)

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](02-custom-login).

#### 2. Close the Lock widget

You can make an `x` button show up on the top right corner of the widget, so that it can be dismissed. All you have to do is set the `closable` property of your `Lock` instance to `true`, as follows:

```java
this.mLock = Lock.newBuilder(mAuth0, mCallback)
                //Add parameters to the build
                .closable(true)
                .build();
```
The default value for this property is `false`.

#### 3. Disable Sign Up

Sign Up is enabled by default. If you want to disable it, set the `allowSignup` property of your `Lock` instance to `false`. That will hide the sign up button that appears at the bottom-left corner of the Lock login widget.

```java
this.mLock = Lock.newBuilder(mAuth0, mCallback)
                //Add parameters to the build
                .allowSignUp(false)
                .build();
```

#### 4. Social Connections Considerations

Social connections authentication dialogs can be presented in two ways: Webview or native. You can find more information about it in the [Authentication Options](authentication-options) document.
````