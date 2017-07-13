## Start the Authentication

In our login method we create a new `Auth0` instance to hold the credentials. Then by using the `WebAuthProvider` class we can authenticate with any connection enabled for our client in the Auth0 dashboard. We also tell the provider to use the custom scheme `demo` to construct the expected **Callback URL**.

To ensure an Open ID Connect compliant responses you must either request an `audience` or enable the **OIDC Conformant** switch in your Auth0 dashboard under `Client / Settings / Advanced OAuth`. You can read more about this [here](https://auth0.com/docs/api-auth/intro#how-to-use-the-new-flows).


After calling `WebAuthProvider#start` the browser will launch and show Lock, and the final result will be received in the callback we pass.

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

private void login() {
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    auth0.setOIDCConformant(true);
    WebAuthProvider.init(auth0)
                  .withScheme("demo")
                  .withAudience("https://${account.namespace}/userinfo")
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

## Capture the Result

The browser will redirect to our application with the authentication result and we need to send it back to the `WebAuthProvider` in order to parse it and get the actual tokens. To do so, we need to register in our Activity an **Intent-Filter** that will capture the call to the **Callback URL** specified by the provider. This URL is built using our Domain and application's Package Name and it must be whitelisted in the "Allowed Callback URLs" section of the [Client settings](${manage_url}/#/clients). The URL should look similar to this:

```text
demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```


Edit the `AndroidManifest.xml` file to add the INTERNET permission and an Intent-Filter like the one below. Remember to replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name, in order to match the Callback URL registered in the dashboard.

```xml
<application android:theme="@style/AppTheme">

        <uses-permission android:name="android.permission.INTERNET" />

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
                    android:pathPrefix="/android/<%= "${applicationId}" %>/callback"
                    android:scheme="demo" />
            </intent-filter>

        </activity>

        <!-- ... -->

    </application>
```

It's very important to specify the `android:launchMode="singleTask"` in your activity to ensure the authentication state it's not lost along redirects and that the result arrives back in the same activity instance that first requested it.


Next, override the `onNewIntent` method in your activity. Here is where the result arrives. Redirect the received intent to the `WebAuthProvider#resume` method, which will return true if the data could be parsed correctly, and will call the `AuthCallback` given in the start call.

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

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


There are many options to customize the authentication using `WebAuthProvider`. Make sure to check them [here](/libraries/auth0-android#implementing-web-based-auth).
<div class="phone-mockup">
  <img src="/media/articles/native-platforms/android/login-android.png" alt="Mobile example screenshot" />
</div>


## Centralized vs Embedded Login

Auth0's centralized login page provides the fastest, most secure, and most feature-rich way to implement authentication in your app. If required, the Lock widget can also be embedded directly into your application, but certain features such as single sign-on won't be accessible. It is highly recommended that you use centralized login (as covered in this tutorial), but if you wish to embed the Lock widget directly in your application, you can follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-android-sample/tree/embedded-login/01-Embedded-Login).
