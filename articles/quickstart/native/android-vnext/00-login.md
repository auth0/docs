---
title: Login
description: This tutorial demonstrates how to add user login to an Android application using Auth0.
seo_alias: android
budicon: 448
topics:
  - quickstarts
  - native
  - android
github:
  path: 00-Login
contentType: tutorial
useCase: quickstart
---
<!-- markdownlint-disable MD002 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Android' }) %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URL** to  `demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback`.
:::

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.

<%= include('../../../_includes/_logout_url', { returnTo: 'demo://' + account.namespace + '/android/YOUR_APP_PACKAGE_NAME/callback' }) %>
Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.

## Install the Auth0 Android SDK

<%= include('./_includes/_gradle.md') %>

Add manifest placeholders required by the SDK. The placeholders are used internally to define an `intent-filter` that captures the authentication callback URL.

To add the manifest placeholders, add the next line:

```xml
// app/build.gradle

apply plugin: 'com.android.application'
compileSdkVersion 30
android {
    defaultConfig {
        applicationId "com.auth0.samples"
        minSdkVersion 21
        targetSdkVersion 30
        // ...

        // ---> Add the next line
        manifestPlaceholders = [auth0Domain: "@string/com_auth0_domain", auth0Scheme: "demo"]
        // <---
    }
}
```

::: note
You do not need to declare a specific `intent-filter` for your activity, because you have defined the manifest placeholders with your Auth0 **Domain** and **Scheme** values and the library will handle the redirection for you.
:::

The `AndroidManifest.xml` file should look like this:

```xml
<!-- app/src/main/AndroidManifest.xml -->

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

Run **Sync Project with Gradle Files** inside Android Studio or execute `./gradlew clean assembleDebug` from the command line.

::: note
For more information about using Gradle, check the [Gradle official documentation](https://gradle.org/getting-started-android-build/).
:::

<!-- markdownlint-disable MD002 MD041 -->

## Add Login to your App

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed the login dialog directly in your application using the [Lock widget](/lock). If you use this method, some features, such as single sign-on, will not be accessible.
To learn how to embed the Lock widget in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-android-sample/tree/embedded-login/01-Embedded-Login). Make sure you read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

In the `onCreate` method, create a new instance of the `Auth0` class to hold user credentials:

```kotlin
// app/src/main/java/com/auth0/samples/MainActivity.kt

// Import the parts needed by the SDK
import com.auth0.android.Auth0
import com.auth0.android.provider.WebAuthProvider

class MainActivity : AppCompatActivity() {

  private lateinit var account: Auth0

  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)

      // Set up the account object with the Auth0 application details
      account = Auth0(
          "${account.clientId}",
          "${account.namespace}"
      )
  }
}
```

:::note
We suggest you do not hardcode these values as you may need to change them in the future. Instead, use [String Resources](https://developer.android.com/guide/topics/resources/string-resource.html), such as `@string/com_auth0_domain`, to define the values. 
:::

Finally, create a `loginWithBrowser` method and use the `WebAuthProvider` class to authenticate with any connection you enabled on your application in the [Auth0 dashboard](${manage_url}/#/).

```kotlin
private fun loginWithBrowser() {
    // Setup the WebAuthProvider, using the custom scheme and scope.

    WebAuthProvider.login(account)
        .withScheme("demo")
        .withScope("openid profile email")
        // Launch the authentication passing the callback where the results will be received
        .start(this, object : AuthCallback {
            override fun onFailure(dialog: Dialog) {
                runOnUiThread {
                    dialog.show()
                }
            }

            // Called when there is an authentication failure
            override fun onFailure(exception: AuthenticationException) {
                runOnUiThread {
                    Snackbar.make(
                        binding.root,
                        "Failure: <%= "${exception.code}" %>",
                        Snackbar.LENGTH_LONG
                    ).show()
                }
            }

            // Called when authentication completed successfully
            override fun onSuccess(credentials: Credentials) {
                runOnUiThread {
                    Snackbar.make(
                        binding.root,
                        "Success: <%= "${credentials.idToken}" %>",
                        Snackbar.LENGTH_LONG
                    ).show()
                }
            }
        })
}
```

After you call the `WebAuthProvider#start` function, the browser launches and shows the login page. Once the user authenticates, the callback URL is called. The callback URL contains the final result of the authentication process.

:::note
There are many options to customize the authentication with the `WebAuthProvider` builder. You can read about them in the [Auth0 SDK for Android documentation](/libraries/auth0-android).

<div class="phone-mockup">
  <img src="/media/articles/native-platforms/android/login-android.png" alt="Mobile example screenshot" />
</div>
:::

:::panel Checkpoint
Add a button to your application that calls `loginWithBrowser`. When you click it, verify that your Android application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your app.
:::

## Add Logout to your App

Use WebAuthProvider to remove the cookie set by the Browser at authentication time, so that the users are forced to re-enter their credentials the next time they try to authenticate.

Add a `logout` method to your app to remove the user's session and log them out of the app:

```kotlin
private fun logout() {
  WebAuthProvider.logout(account)
    .withScheme("demo")
    .start(this, object: VoidCallback {
      override fun onSuccess(payload: Void?) {
      }

      override fun onFailure(error: Auth0Exception) {
        runOnUiThread {
          Snackbar.make(
                  binding.root,
                  "Failure: <%= "${error.message}" %>",
                  Snackbar.LENGTH_LONG
          ).show()
        }
      }
    })
}
```

The logout is achieved by using the WebAuthProvider class. This call will open the Browser and navigate the user to the logout endpoint. If the log out is cancelled, you might want to take the user back to where they were before attempting to log out.

:::panel Checkpoint
Add a button to your app that calls `logout` and logs the user out of your application. When you click it, verify that your Android app redirects you logout page and back again, and that you are no longer logged in to your application.
:::
