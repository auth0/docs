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

Check out the [Auth0.Android repository](https://github.com/auth0/Auth0.Android) on GitHub.

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

## Authentication with Universal Login

First, go to the [Dashboard](${manage_url}/#/applications) and go to your application's settings. Make sure you have in **Allowed <dfn data-key="callback">Callback URLs</dfn>** a URL with the following format:

```
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Remember to replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name, available in your `app/build.gradle` file as the `applicationId` value.

Next, define the [Manifest Placeholders](https://developer.android.com/studio/build/manifest-build-variables.html) for the Auth0 Domain and Scheme which are going to be used internally by the library to register an **intent-filter**. Go to your application's `build.gradle` file and add the `manifestPlaceholders` line as shown below:

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

It's a good practice to define reusable resources like `@string/com_auth0_domain` but you can also hard code the value in the file. The scheme value can be either `https` or a custom one. Read [this section](#a-note-about-app-deep-linking) to learn more.

Alternatively, you can declare the `RedirectActivity` in the `AndroidManifest.xml` file with your own **intent-filter** so it overrides the library's default. If you do this then the `manifestPlaceholders` don't need to be set as long as the activity contains the `tools:node="replace"` like in the example below.

In your manifest inside your application's tag add the `RedirectActivity` declaration:

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
                    android:pathPrefix="/android/${applicationId}/callback"
                    android:scheme="https" />
            </intent-filter>
        </activity>

        <!-- ... -->

    </application>
</manifest>
```

If you request a different scheme you must replace the above `android:scheme` property value and initialize the provider with the new scheme. Read [this section](#about-app-deep-linking) to learn more. 

Finally, don't forget to add the internet permission.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

::: note
In versions 1.8.0 or lower of Auth0.Android you had to define the **intent-filter** inside your activity to capture the authentication result in the `onNewIntent` method and then call `WebAuthProvider.resume()` with the received data. The intent-filter declaration and resume call are no longer required for versions greater than 1.8.0, as it's now done internally by the library for you.
:::

Now, let's authenticate a user through the [Universal Login](/universal-login) page:

```java
//Configure and launch the authentication
WebAuthProvider.login(account)
    .start(MainActivity.this, authCallback);

//Declare the callback that will receive the result
AuthCallback authCallback = new AuthCallback() {
    @Override
    public void onFailure(@NonNull Dialog dialog) {
        //failed with a dialog
    }

    @Override
    public void onFailure(AuthenticationException exception) {
        //failed with an exception
    }

    @Override
    public void onSuccess(@NonNull Credentials credentials) {
        //succeeded!
    }
};
```

If you've followed the configuration steps, the authentication result will be redirected from the browser to your application and you'll receive it in the Callback.

### If you don't need web authentication in your app

If you don't plan to use the _Web Authentication_ feature you will still be prompted to provide the `manifestPlaceholders` values since the `AuthenticationActivity` included in this library will require them and the Gradle tasks won't be able to run. Declare the activity manually with `tools:node="remove"` in your app's Android Manifest in order to make the manifest merger remove it from the final manifest file. Additionally, 2 more unused activities can be removed from the final APK by using the same process. A complete snippet to achieve this is:

```xml
<activity
    android:name="com.auth0.android.provider.AuthenticationActivity"
    tools:node="remove"/>
<!--Optional: Remove RedirectActivity and WebAuthActivity -->
<activity
    android:name="com.auth0.android.provider.RedirectActivity"
    tools:node="remove"/>
<activity
    android:name="com.auth0.android.provider.WebAuthActivity"
    tools:node="remove"/>
```

### About app deep linking

If you've followed this documents' configuration steps you've noticed that the default scheme used in the Callback URI is `https`. This works best for Android API 23 or newer if you're using [Android App Links](/applications/enable-android-app-links), but in previous Android versions this may show the intent chooser dialog prompting the user to choose either your application or the browser. You can change this behaviour by using a custom unique scheme so that the OS opens directly the link with your app.

1. Update the `auth0Scheme` Manifest Placeholder on the `app/build.gradle` file or update the intent-filter declaration in the `AndroidManifest.xml` to use the new scheme.
2. Update the **Allowed Callback URLs** in your [Auth0 Dashboard](${manage_url}/#/applications) application's settings.
3. Call `withScheme()` passing the custom scheme you want to use.


```java
WebAuthProvider.login(account)
    .withScheme("myapp")
    .start(MainActivity.this, authCallback);
```

### Authenticate with any Auth0 connection

```java
WebAuthProvider.login(account)
    .withConnection("twitter")
    .start(MainActivity.this, authCallback);
```

### Use code grant with PKCE

To use the `Code Grant` in Android, go to your [Application Settings](${manage_url}/#/applications) in the dashboard and set **Application Type** to `Native` and **Token Endpoint Authentication Method** to `None`.

```java
WebAuthProvider.login(account)
    .useCodeGrant(true)
    .start(MainActivity.this, authCallback);
```

### Specify audience

The snippet below requests the `userinfo` audience to guarantee OIDC compliant responses from the server. This can also be achieved by enabling the **OIDC Conformant** switch in the OAuth Advanced Settings of your application. For more information check out the [OIDC-Conformant Authentication Overview](/docs/api-auth/intro#how-to-use-the-new-flows).

```java
WebAuthProvider.login(account)
    .withAudience("https://${account.namespace}/userinfo")
    .start(MainActivity.this, authCallback);
```

### Specify scope

```java
WebAuthProvider.login(account)
    .withScope("openid profile email")
    .start(MainActivity.this, authCallback);
```

The default scope used is `openid`

### Specify Connection scope

```java
WebAuthProvider.login(account)
    .withConnectionScope("email", "profile", "calendar:read")
    .start(MainActivity.this, authCallback);
```

### Clearing the session

To log the user out and clear the SSO cookies that the Auth0 Server keeps attached to your browser app, you need to call the [logout endpoint](/api/authentication?#logout). This can be done is a similar fashion to how you authenticated before: using the `WebAuthProvider` class.

Make sure to [revisit that section](#authentication-with-universal-login) to configure the Manifest Placeholders if you still cannot authenticate successfully. The values set there are used to generate the URL that the server will redirect the user back to after a successful log out.

In order for this redirection to happen, you must copy the **Allowed Callback URLs** value you added for authentication into the **Allowed Logout URLs** field in your [application settings](${manage_url}/#/applications). Both fields should have an URL with the following format:

```
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Remember to replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name, available in your `app/build.gradle` file as the `applicationId` value.

Initialize the provider, this time calling the static method `logout`.

```java
//Configure and launch the log out
WebAuthProvider.logout(account)
    .start(MainActivity.this, logoutCallback);

//Declare the callback that will receive the result
BaseCallback logoutCallback = new BaseCallback<Void, Auth0Exception>() {
    @Override
    public void onFailure(Auth0Exception exception) {
        //failed with an exception
    }

    @Override
    public void onSuccess(@NonNull Void payload) {
        //succeeded!
    }
};
```

The callback is invoked when the user returns to your application. If this is the result of being redirected back by the server, that would be considered a success.

There are some scenarios in which this can fail:
* When there is no browser application that can open a URL. The cause of the exception will be an instance of `ActivityNotFoundException`.
* When the user closes the browser manually, e.g. by pressing the back key on their device.
* When the `returnTo` URL is not found in the **Allowed Logout URLs** in your Auth0 application settings.

### Customize the Custom Tabs UI

If the device where the app is running has a Custom Tabs compatible Browser, a Custom Tab will be preferred for the logout flow. You can customize the Page Title visibility and the Toolbar color by using the `CustomTabsOptions` class.

```java
CustomTabsOptions options = CustomTabsOptions.newBuilder()
    .withToolbarColor(R.color.ct_toolbar_color)
    .showTitle(true)
    .build();

WebAuthProvider.logout(account)
    .withCustomTabsOptions(options)
    .start(MainActivity.this, logoutCallback);
```

### Changing the Return To URL scheme

This configuration will probably match what you've done for the [authentication setup](#a-note-about-app-deep-linking).

```java
WebAuthProvider.logout(account)
    .withScheme("myapp")
    .start(MainActivity.this, logoutCallback);
```

## Using the Authentication API

The client provides methods to authenticate the user against Auth0 server.

Create a new instance by passing the account:

```java
AuthenticationAPIClient authentication = new AuthenticationAPIClient(account);
```

### Login with database connection

If the `Auth0` instance wasn't configured as "OIDC conformant", this call requires the Application to have the [Resource Owner Client Grant Type enabled](/clients/client-grant-types).

```java
authentication
    .login("info@auth0.com", "a secret password", "my-database-connection")
    .start(new BaseCallback<Credentials, AuthenticationException>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Logged in!
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

The default scope used is `openid`.

### Login using MFA with one time password code

This call requires the client to have the [MFA Client Grant Type](/clients/client-grant-types) enabled.

When you sign in to a multifactor authentication enabled connection using the `login` method, you receive an error standing that MFA is required for that user along with an `mfa_token` value. Use this value to call `loginWithOTP` and complete the MFA flow passing the One Time Password from the enrolled MFA code generator app.

```java
authentication
    .loginWithOTP("the mfa token", "123456")
    .start(new BaseCallback<Credentials, AuthenticationException>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Logged in!
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

### Passwordless Login

This feature requires your Application to have [a specific Grant Type enabled](/clients/client-grant-types). If the [OIDC Conformant flag](#OIDC-Conformant-Mode) is enabled, the required Grant Type is `Passwordless OTP`. If the flag is disabled, the required Grant Type is `Resource Owner`.

Passwordless is a 2 step flow.

1. Request the code:

```java
authentication
    .passwordlessWithEmail("info@auth0.com", PasswordlessType.CODE, "my-passwordless-connection")
    .start(new BaseCallback<Void, AuthenticationException>() {
        @Override
        public void onSuccess(Void payload) {
            //Code sent!
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

The default scope used is `openid`

2. Input the code:

```java
authentication
    .loginWithEmail("info@auth0.com", "123456", "my-passwordless-connection")
    .start(new BaseCallback<Credentials, AuthenticationException>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Logged in!
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

### Sign Up with database connection

```java
authentication
    .signUp("info@auth0.com", "a secret password", "my-database-connection")
    .start(new BaseCallback<Credentials, AuthenticationException>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Signed Up & Logged in!
        }

        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

### Get user information

```java
authentication
   .userInfo("user access_token")
   .start(new BaseCallback<UserProfile, AuthenticationException>() {
       @Override
       public void onSuccess(UserProfile payload) {
           //Got the profile!
       }

       @Override
       public void onFailure(AuthenticationException error) {
           //Error!
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

Password reset requests will fail on network related errors, but will not fail if the designated email does not exist in the database (for security reasons).

### Management API (Users)

The client provides methods to link and unlink users account.

Create a new instance by passing the account and the primary user token:

```java
Auth0 account = new Auth0("client id", "domain");
UsersAPIClient users = new UsersAPIClient(account, "api token");
```

### Link users

```java
users
    .link("primary user id", "secondary user token")
    .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
        @Override
        public void onSuccess(List<UserIdentity> payload) {
            //Got the updated identities! Accounts linked.
        }

        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```

### Unlink users

```java
users
    .unlink("primary user id", "secondary user id", "secondary provider")
    .start(new BaseCallback<List<UserIdentity>, ManagementException>() {
        @Override
        public void onSuccess(List<UserIdentity> payload) {
            //Got the updated identities! Accounts linked.
        }

        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```

### Get User Profile

```java
users
    .getProfile("user id")
    .start(new BaseCallback<UserProfile, ManagementException>() {
        @Override
        public void onSuccess(UserProfile payload) {
            //Profile received
        }

        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```

### Update User Metadata

```java
Map<String, Object> metadata = new HashMap<>();
metadata.put("name", Arrays.asList("My", "Name", "Is"));
metadata.put("phoneNumber", "1234567890");

users
    .updateMetadata("user id", metadata)
    .start(new BaseCallback<UserProfile, ManagementException>() {
        @Override
        public void onSuccess(UserProfile payload) {
            //User Metadata updated
        }

        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```

::: note
The `user id` parameter is the unique identifier of the Auth0 account instance. For example in `google-oauth2|123456789081523216417`, the `user id` is the part after the pipe (`|`), `123456789081523216417`.
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
