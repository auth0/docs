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
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

## Before Starting

Go to the [Client Settings](${manage_url}/#/applications/${account.clientId}/settings) section in the Auth0 dashboard and make sure that **Allowed Callback URLs** contains the value:

```
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name.

## Add The Auth0 Android Dependency

Your first step is to add [Auth0 Android](https://github.com/auth0/Auth0.Android) into your project, which is basically the library that will manage the login process, via [Auth0](https://auth0.com/) Authentication Client.

#### i. Gradle

Add to your app's module Gradle file:

```gradle
compile 'com.auth0.android:auth0:1.+'
```

_You can check for the latest version on the repository [Readme](https://github.com/auth0/auth0.android#installation), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22auth0%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/auth0)._

Then, run "Sync project with Gradle files" inside Android Studio or `./gradlew clean assembleDebug` from the command line.

> For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).

### 2. Configure Your Manifest File

You need to add the following permissions inside the `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Implement The Login
At this point, you're all set to implement the login in any activity you want.

### Using a Database connection

First, you'll need to instantiate the Authentication API:

```java
private void login(String email, String password) {
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);

    // proper login
}
```

Then, login using the username and password.

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

> There are multiple ways of designing a customized login screen which are not covered in this tutorial. You can take the [Android Studio's login template](https://developer.android.com/studio/projects/templates.html) as an example.


### Using a Social connection

This requires an extra configuration step, as we need to capture the result that comes back from the browser once the user authenticates correctly.

First, edit the `AndroidManifest.xml` file and include an Intent-Filter. This will capture any fired intent matching the **callback url** we've defined at the beginning of the article, and redirect the result to our activity. Without this, even if the authentication in the browser succeed, we won't receive any data.

```xml
<application android:theme="@style/AppTheme">

        <!-- ... -->

        <activity
            android:name="com.mycompany.MainActivity"
            android:theme="@style/MyAppTheme"
            android:launchMode="singleTask">

            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="${account.namespace}"
                    android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/callback"
                    android:scheme="https" />
            </intent-filter>

        </activity>

        <!-- ... -->

    </application>
```

Replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name.

It's super important to specify the `android:launchMode="singleTask"` in your activity to ensure the authentication state it's not lost along redirects and that the result arrives back in the same activity instance that first requested it.

Second, override the `onNewIntent` method in your activity. Here is where the result arrives. Redirect the received intent to the `WebAuthProvider#resume` method.

```java
public class MyActivity extends Activity {

    @Override
    protected void onNewIntent(Intent intent) {
        if (WebAuthProvider.resume(intent)) {
            return;
        }
        super.onNewIntent(intent);
    }
}
```


Now perform the login by calling `WebAuthProvider#init`. If no connection name is given, the hosted Lock widget will be shown and the user may choose any of the connections enabled for your client. You can change this by calling `withConnection`. Let's do that for `Twitter`. Make sure to use a connection enabled in your client!

```java
private void login() {
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    WebAuthProvider.init(auth0)
                  .withConnection("twitter")
                  .start(MainActivity.this, new AuthCallback() {
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


There are many options to customize the authentication using WebAuthProvider. Make sure to check them [here](/articles/libraries/auth0-android#implementing-web-based-auth).
