---
section: libraries
toc: true
description: How to install, initialize and use Auth0.Android
url: /libraries/auth0-android
topics:
  - libraries
  - android
contentType:
    - how-to
    - index
useCase: enable-mobile-auth
---
# Auth0.Android

Auth0.Android is a client-side library you can use with your Android app to authenticate users and access [Auth0 APIs](/api/info).

::: note
Check out the [Auth0.Android repository](https://github.com/auth0/Auth0.Android) on GitHub.
:::

## Requirements

Android API version 15 or newer is required.

## Installation

<%= include('../../quickstart/native/android/_includes/_gradle.md') %>

## Permissions

Open your app's `AndroidManifest.xml` file and add the following permission.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Initialize Auth0

Save your application information in the `strings.xml` file using the following names:

```xml
<resources>
    <string name="com_auth0_client_id">${account.clientId}</string>
    <string name="com_auth0_domain">${account.namespace}</string>
</resources>

```

And then create your new Auth0 instance by passing an Android Context:

```java
Auth0 account = new Auth0(context);
```

## OIDC Conformant Mode

It is strongly encouraged that this SDK be used in [OIDC Conformant mode](/api-auth/intro). When this mode is enabled, it will force the SDK to use Auth0's current authentication methods and will prevent it from reaching legacy endpoints. By default is `false`.

```java
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
//Configure the account in OIDC conformant mode
account.setOIDCConformant(true);
//Use the account in the API applications
```

<dfn data-key="passwordless">Passwordless authentication</dfn> **cannot be used** with this flag set to `true`. For more information, please see the [OIDC adoption guide](/api-auth/tutorials/adoption).

## Authentication via Universal Login

First, go to the [Dashboard](${manage_url}/#/applications) and go to your application's settings. Make sure you have in **Allowed <dfn data-key="callback">Callback URLs</dfn>** a URL with the following format:

```
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

::: note
Replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name, available in your `app/build.gradle` file as the `applicationId` value.
:::

Then in your `app/build.gradle` file add the [Manifest Placeholders](https://developer.android.com/studio/build/manifest-build-variables.html) for the Auth0 Domain and the Auth0 Scheme properties which are going to be used internally by the library to register an intent-filter that captures the callback URI.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 25
    defaultConfig {
        applicationId "com.auth0.samples"
        minSdkVersion 15
        targetSdkVersion 25
        //...

        //---> Add the next line
        manifestPlaceholders = [auth0Domain: "@string/com_auth0_domain", auth0Scheme: "https"]
        //<---
    }
    //...
}
```

::: note
It's a good practice to define reusable resources like `@string/com_auth0_domain` (as done in a previous step with `strings.xml`) rather than just hard-coding them.
:::

Alternatively, you can declare the `RedirectActivity` in the `AndroidManifest.xml` file with your own **intent-filter** so it overrides the library's default. If you do this then the Manifest Placeholders don't need to be set as long as the activity declaration contains the `tools:node="replace"` attribute:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="your.app.package">
    <application android:theme="@style/AppTheme">

        <!-- ... -->

        <activity
            android:name="com.auth0.android.provider.RedirectActivity"
            tools:node="replace">
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data
                    android:host="@string/com_auth0_domain"
                    android:pathPrefix="/android/<%= "${applicationId}" %>/callback"
                    android:scheme="https" />
            </intent-filter>
        </activity>

        <!-- ... -->

    </application>
</manifest>
```

Finally, don't forget to add the internet permission:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

::: note
In versions 1.8.0 or lower of Auth0.Android you had to define the **intent-filter** inside your activity to capture the authentication result in the `onNewIntent` method and then call `WebAuthProvider.resume()` with the received data. The intent-filter declaration and resume call are no longer required for versions greater than 1.8.0, as it's now done internally by the library for you.
:::

Now, let's authenticate a user by presenting the universal [login page](hosted-pages/login):

```java
WebAuthProvider.login(account)
                .withAudience("https://${account.namespace}/userinfo")
                .start(this, authCallback);
```

The authentication result will be delivered to the callback.

To ensure a response that complies with <dfn data-key="openid">OpenID Connect (OIDC)</dfn>, you must either set an <dfn data-key="audience">`audience`</dfn> using [withAudience](/libraries/auth0-android/configuration#withAudience) or enable the **OIDC Conformant** switch in your Auth0 dashboard under **Dashboard > Settings > Advanced > OAuth**. You can read more about this in the documentation page on [how to use new flows](/api-auth/intro#how-to-use-the-new-flows).

## Using the Authentication API

The Authentication Application provides methods to accomplish authentication and related tasks. Create a new instance by passing in the Auth0 object created in the previous step.

```java
AuthenticationAPIClient authentication = new AuthenticationAPIClient(account);
```

### Get user information

To get the information associated with a given user's <dfn data-key="access-token">Access Token</dfn>, you can call the `userInfo` endpoint, passing the token.

```java
authentication
  .userInfo("Access Token")
  .start(new BaseCallback<UserProfile, AuthenticationException>() {
      @Override
      public void onSuccess(UserProfile information) {
          //user information received
      }

      @Override
      public void onFailure(AuthenticationException error) {
          //user information request failed
      }
  });
```

### Password Resets

To initiate a password reset for a user, call `resetPassword` with the user's email address and the database connection name as parameters.

```java
String connectionName = "Username-Password-Authentication";
authentication
  .resetPassword("foo@bar.com", connectionName)
  .start(new AuthenticationCallback<Void>() {
    @Override
    public void onSuccess(Void payload) {
      //Password Reset requested
    }

    @Override
    public void onFailure(AuthenticationException error) {
      //Request failed
    }
  });
```

::: note
Password reset requests will fail on network related errors, but will not fail if the designated email does not exist in the database (for security reasons).
:::

## Next Steps

Take a look at the following resources to see how the Auth0.Android SDK can be customized for your needs:

::: next-steps
* [Auth0.Android Configuration Options](/libraries/auth0-android/configuration)
* [Auth0.Android Database Authentication](/libraries/auth0-android/database-authentication)
* [Auth0.Android Passwordless Authentication](/libraries/auth0-android/passwordless)
* [Auth0.Android Refresh Tokens](/libraries/auth0-android/save-and-refresh-tokens)
* [Auth0.Android User Management](/libraries/auth0-android/user-management)
:::
