---
title: Login
description: This quickstart demonstrates how to add user login to an Android application using Auth0.
seo_alias: android
budicon: 448
topics:
  - quickstarts
  - native
  - android
github:
  path: 00-Login-Kt
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Android' }) %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URL** to `demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback`.
:::

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.

<%= include('../../../_includes/_logout_url', { returnTo: 'demo://' + account.namespace + '/android/YOUR_APP_PACKAGE_NAME/callback' }) %>

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.

## Install the Auth0 Android SDK

Add the [Auth0 Android](https://github.com/auth0/Auth0.Android) SDK into your project. The library will make requests to the Auth0's Authentication and Management APIs.

### Add Auth0 to Gradle

In your app's `build.gradle` dependencies section, add the following:

```groovy
dependencies {
  // Add the Auth0 Android SDK
  implementation 'com.auth0.android:auth0:2.+'
}
```

In the android section, target Java 8 byte code for Android and Kotlin plugins respectively.

```groovy
android {
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
  kotlinOptions {
    jvmTarget = '1.8'
  }
}
```

::: panel Sync Project with Gradle Files
Remember to synchronize using the Android Studio prompt or run `./gradlew clean build` from the command line. For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).
:::

Add manifest placeholders required by the SDK. The placeholders are used internally to define an `intent-filter` that captures the authentication callback URL. For this, the Auth0 tenant domain and the scheme that take part in the callback URL must be set.

::: note
We've used a value of `demo` for `auth0Scheme` here, so that a custom URL scheme can be used for the URL that Auth0 redirects to after login. The alternative is `https` if you want to use [Android App Links](https://auth0.com/docs/applications/enable-android-app-links). You can read more about setting this value in the [Auth0.Android SDK readme](https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking).
:::

To add the manifest placeholders, add the next line:

```groovy
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

Finally, ensure that the `android.permissions.INTERNET` permission is specified in the `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Run **Sync Project with Gradle Files** inside Android Studio or execute `./gradlew clean assembleDebug` from the command line.

::: note
For more information about using Gradle, check the [Gradle official documentation](https://gradle.org/getting-started-android-build/).
:::

## Add Login to your App

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

In the `onCreate` method, create a new instance of the `Auth0` class to hold user credentials:

```kotlin
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
We suggest you do not hardcode the values for `clientId` and `domain` as you may need to change them in the future. Instead, use [String Resources](https://developer.android.com/guide/topics/resources/string-resource.html), such as `@string/com_auth0_domain`, to define the values.
:::

Finally, create a `loginWithBrowser` method and use the `WebAuthProvider` class to authenticate with any connection you enabled on your application in the [Auth0 dashboard](${manage_url}/#/). Here, you can pass the scheme value that was used in the `auth0Scheme` manifest placeholder as part of the initial configuration:

```kotlin
private fun loginWithBrowser() {
    // Setup the WebAuthProvider, using the custom scheme and scope.

    WebAuthProvider.login(account)
        .withScheme("demo")
        .withScope("openid profile email")
        // Launch the authentication passing the callback where the results will be received
        .start(this, object : Callback<Credentials, AuthenticationException> {
            // Called when there is an authentication failure
            override fun onFailure(exception: AuthenticationException) {
                // Something went wrong!
            }

            // Called when authentication completed successfully
            override fun onSuccess(credentials: Credentials) {
              // Get the access token from the credentials object.
              // This can be used to call APIs
              val accessToken = credentials.accessToken
            }
        })
}
```

After you call the `WebAuthProvider#start` function, the browser launches and shows the login page. Once the user authenticates, the callback URL is called. The callback URL contains the final result of the authentication process.

:::note
There are many options to customize the authentication with the `WebAuthProvider` builder. You can read about them in the [Auth0 SDK for Android documentation](/libraries/auth0-android).

<div class="phone-mockup">
  <img src="/media/articles/native-platforms/android/login-android.png" alt="Universal Login" />
</div>
:::

:::panel Checkpoint
Add a button to your application that calls `loginWithBrowser`. When you click it, verify that your Android application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your app.
:::

## Add Logout to your App

Use `WebAuthProvider` to remove the cookie set by the Browser at authentication time, so that the users are forced to re-enter their credentials the next time they try to authenticate.

Add a `logout` method to your app to remove the user's session and log them out of the app. Here, you can pass the scheme value that was used in the `auth0Scheme` manifest placeholder as part of the initial configuration:

```kotlin
private fun logout() {
  WebAuthProvider.logout(account)
    .withScheme("demo")
    .start(this, object: Callback<Void?, AuthenticationException> {
      override fun onSuccess(payload: Void?) {
        // The user has been logged out!
      }

      override fun onFailure(error: AuthenticationException) {
        // Something went wrong!
      }
    })
}
```

The logout is achieved by using the `WebAuthProvider` class. This call will open the Browser and navigate the user to the logout endpoint. If the log out is cancelled, you might want to take the user back to where they were before attempting to log out.

:::panel Checkpoint
Add a button to your app that calls `logout` and logs the user out of your application. When you click it, verify that your Android app redirects you logout page and back again, and that you are no longer logged in to your application.
:::

## Show User Profile Information

Use the `AuthenticationAPIClient` class to [retrieve the user's profile from Auth0](https://auth0.com/docs/users/user-profiles#user-profile-management-api-access). This requires:

- The access token as received during the login phase
- The `profile` scope to be included when `WebAuthProvider.login` is called

The `email` scope must also be specified if the user's email address is to be retrieved.

:::note
This quickstart sets the `openid profile email` scopes by default during the login step above.
:::

The following demonstrates a function that can be used to retrieve the user's profile and show it on the screen:

```kotlin
private fun showUserProfile(accessToken: String) {
  var client = AuthenticationAPIClient(account)

  // With the access token, call `userInfo` and get the profile from Auth0.
  client.userInfo(accessToken)
    .start(object : Callback<UserProfile, AuthenticationException> {
        override fun onFailure(exception: AuthenticationException) {
            // Something went wrong!
        }

        override fun onSuccess(profile: UserProfile) {
          // We have the user's profile!
          val email = profile.email
          val name = profile.name
        }
  })
}
```

:::panel Checkpoint
Call the `showUserProfile` function after login and verify that the user's profile information has been returned in the `onSuccess` callback.
:::
