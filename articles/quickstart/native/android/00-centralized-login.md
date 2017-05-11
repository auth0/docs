---
title: Centralized Login
description: This tutorial will show you how to integrate the Auth0 Centralized Login in your Android project in order to present the login box.
budicon: 448
---

This tutorial will show you how to integrate the Auth0 Centralized Login in your Android project in order to present the login box.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '00-centralized-login',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

<%= include('_includes/_auth0') %>
__


### Start the authentication

In our login method we create a new `Auth0` instance to hold the credentials. Then by using the `WebAuthProvider` class we can authenticate with any connection enabled for our client in the Auth0 dashboard. After calling `WebAuthProvider#start` the browser will launch and show Lock, and the final result will be received in the callback we pass.


```java
private void login() {
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    WebAuthProvider.init(auth0)
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


### Capture the result

The browser will redirect to our application with the authentication result and we need to send it back to the `WebAuthProvider` in order to parse it and get the actual tokens. To do so, we need to register in our Activity an **Intent-Filter** that will capture the call to the **Callback URL** specified by the provider. This URL is built using our Domain and application's Package Name and it must be whitelisted in the "Allowed Callback URLs" section of the [Client settings](https://manage.auth0.com/#/clients). The URL should look similar to this:

```
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```


Edit the `AndroidManifest.xml` file to add the INTERNET permission and an Intent-Filter like the one below. Remember to replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name, in order to match the Callback URL registered in the dashboard.

```xml
<application android:theme="@style/AppTheme">

        <uses-permission android:name="android.permission.INTERNET" />

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

It's super important to specify the `android:launchMode="singleTask"` in your activity to ensure the authentication state it's not lost along redirects and that the result arrives back in the same activity instance that first requested it.


Next, override the `onNewIntent` method in your activity. Here is where the result arrives. Redirect the received intent to the `WebAuthProvider#resume` method, which will return true if the data could be parsed correctly, and will call the `AuthCallback` given in the start call.

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


There are many options to customize the authentication using WebAuthProvider. Make sure to check them [here](/articles/libraries/auth0-android#implementing-web-based-auth).

<div class="phone-mockup">
  <img src="/media/articles/native-platforms/android/centralized-login-android.png" alt="Mobile example screenshot" />
</div>
