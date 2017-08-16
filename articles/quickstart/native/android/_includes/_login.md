## Start the Authentication

In the login method create a new `Auth0` instance to hold the credentials. If you've added the `R.string.com_auth0_client_id` and `R.string.com_auth0_domain` String resources, you'll be able to use the constructor that receives an android Context. If you prefer to hardcode them, use the constructor that receives both strings. Then by using the `WebAuthProvider` class authenticate with any connection enabled on your client in the Auth0 dashboard.

To ensure Open ID Connect compliant responses you must either request an `audience` or enable the **OIDC Conformant** switch in your Auth0 dashboard under `Client / Settings / Advanced OAuth`. You can read more about this [here](https://auth0.com/docs/api-auth/intro#how-to-use-the-new-flows).


After calling `WebAuthProvider#start` the browser will launch and show **Lock**, and the final result will be received in the callback that you pass.

```java
// app/src/main/java/com/auth0/samples/MainActivity.java

private void login() {
    Auth0 auth0 = new Auth0(this);
    auth0.setOIDCConformant(true);
    WebAuthProvider.init(auth0)
                  .withScheme("demo")
                  .withAudience(String.format("https://%s/userinfo", getString(R.string.com_auth0_domain)))
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

You'll first need to whitelist the **Callback URL** in the "Allowed Callback URLs" section of the [Client settings](${manage_url}/#/clients) by adding the URL below. Remember to replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name, available in the `app/build.gradle` file as the `applicationId` attribute:

```text
demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

The browser will redirect to your application with the authentication result. Because you've defined the _Manifest Placeholders_ with your Auth0 Domain and Scheme values, the SDK will be able to capture the result and parse it automatically without you needing to declare a specific **intent-filter** for your activity. The `AndroidManifest.xml` file should look like this:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.auth0.samples">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

        <activity android:name="com.auth0.samples.MainActivity">
          <intent-filter>
              <action android:name="android.intent.action.MAIN" />
              <category android:name="android.intent.category.LAUNCHER" />
          </intent-filter>
        </activity>

    </application>

</manifest>
```

There are many options to customize the authentication using the `WebAuthProvider` builder. Make sure to check them [here](/libraries/auth0-android#implementing-web-based-auth).
<div class="phone-mockup">
  <img src="/media/articles/native-platforms/android/login-android.png" alt="Mobile example screenshot" />
</div>


## Hosted Login Page vs Embedded Login

Auth0's Hosted Login Page provides the fastest, most secure, and most feature-rich way to implement authentication in your app. If required, the Lock widget can also be embedded directly into your application, but certain features such as single sign-on won't be accessible. It is highly recommended that you use Hosted Login Page (as covered in this tutorial), but if you wish to embed the Lock widget directly in your application, you can follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-android-sample/tree/embedded-login/01-Embedded-Login).
