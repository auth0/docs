---
title: Custom Login Form
description: This tutorial will show you how to use the Auth0 authentication API in your Android project to create a custom login form.
seo_alias: android
budicon: 448
---

This quickstart will show you how to add Auth0 login capabilities while using a customized login form.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  branch: 'embedded-login',
  path: '02-Custom-Login-Form',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>__

## Before Starting

Go to the [Client Settings](${manage_url}/#/applications/${account.clientId}/settings) section in the Auth0 dashboard and make sure that **Allowed Callback URLs** contains the value:

```text
demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

Replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name.

<%= include('_includes/_auth0') %>__

### Configure Your Manifest File

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
    auth0.setOIDCConformant(true);
    AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);

    // proper login
}
```

Then, login using the username and password.

```java
String connectionName = "Username-Password-Authentication";
client.login(email, password, connectionName)
    .setAudience("https://${account.namespace}/userinfo")
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

In this example we're logging in using an Auth0 Database Connection called "Username-Password-Authentication". You can also [create your own](${manage_url}/#/connections/database/new).

::: note
There are multiple ways of designing a customized login screen which are not covered in this tutorial. You can take the [Android Studio's login template](https://developer.android.com/studio/projects/templates.html) as an example.
:::

### Using a Social connection

This requires an extra configuration step, as we need to capture the result that comes back from the browser once the user authenticates correctly.

First, edit the `AndroidManifest.xml` file and include an Intent-Filter. This will capture any fired intent matching the **Callback URL** we've defined at the beginning of the article, and redirect the result to our activity. Without this, even if the authentication in the browser succeed, we won't receive any data.

```xml
<application android:theme="@style/AppTheme">

        <!-- ... -->

        <activity
            android:name="com.mycompany.MainActivity"
            android:theme="@style/MyAppTheme"
            android:launchMode="singleTask">

            <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="${account.namespace}"
                    android:pathPrefix="/android/YOUR_APP_PACKAGE_NAME/callback"
                    android:scheme="demo" />
            </intent-filter>

        </activity>

        <!-- ... -->

    </application>
```

Replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name.

It's very important to specify the `android:launchMode="singleTask"` in your activity to ensure the authentication state it's not lost along redirects and that the result arrives back in the same activity instance that first requested it.

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

Note that we customize the scheme to `demo` as required by the Callback URL declared in the Intent-Filter.

```java
private void login() {
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    auth0.setOIDCConformant(true);
    WebAuthProvider.init(auth0)
                  .withScheme("demo")
                  .withAudience("https://${account.namespace}/userinfo")
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

There are many options to customize the authentication using WebAuthProvider. Make sure to check them [here](/libraries/auth0-android#implementing-web-based-auth).
