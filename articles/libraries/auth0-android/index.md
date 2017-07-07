---
section: libraries
toc: true
description: How to install, initialize and use Auth0.Android
url: /libraries/auth0-android
---

# Auth0.Android

Auth0.Android is a client-side library for [Auth0](http://auth0.com). Using it with your Android native app development should simplify your interactions with Auth0.

## Requirements

Android API version 15 or newer is required.

## Installation

Auth0.Android is available through [Gradle](https://gradle.org/). To install it, simply add the following line to your `build.gradle` file:

```gradle
dependencies {
    compile "com.auth0.android:auth0:1.+"
}
```

::: note
You can check for the latest version on the repository [Readme](https://github.com/auth0/auth0.android#installation), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22auth0%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/auth0).
:::

After adding your Gradle dependency, make sure to remember to sync your project with Gradle files.

## Permissions

Open your app's `AndroidManifest.xml` file and add the following permission.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Initializing Auth0

You can set up your Auth0 credentials and initiate Auth0 in one of two ways:

### 1) Client information in-line

Method one is to simply create an instance of `Auth0` with your client information.

```java
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
account.setOIDCConformant(true);
```

### 2) Client information read from XML

Method two is to save your client information in the `strings.xml` file using the following names:

```xml
<resources>
    <string name="auth0_client_id">${account.clientId}</string>
    <string name="auth0_domain">${account.namespace}</string>
</resources>

```

And then create your new Auth0 instance by passing an Android Context:

```java
Auth0 account = new Auth0(context);
account.setOIDCConformant(true);
```


## Authentication with Auth0 Hosted Login Page

First go to [Auth0 Dashboard](${manage_url}/#/clients) and go to your client's settings. Make sure you have in *Allowed Callback URLs* a URL with the following format:

```
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

::: note
Replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name, available in your `app/build.gradle` file as the `applicationId` value.
:::

Then in your `app/build.gradle` file add a [Manifest Placeholder](https://developer.android.com/studio/build/manifest-build-variables.html) for the Auth0 Domain property which is going to be used internally by the library to register an intent-filter.

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
        manifestPlaceholders = [auth0Domain: "@string/auth0_domain"]
        //<---
    }
    //...
}
```

It's a good practice to define reusable resources like `@string/auth0_domain` but you can also hard code the value to `${account.namespace}` in the file.

Alternatively, you can declare the `RedirectActivity` in the `AndroidManifest.xml` file with your own **intent-filter** so it overrides the library's default. If you do this then the Manifest Placeholder don't need to be set as long as the activity contains the tools:node="replace" like in the snippet below.

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
                    android:host="@string/auth0_domain"
                    android:pathPrefix="/android/${applicationId}/callback"
                    android:scheme="https" />
            </intent-filter>
        </activity>

        <!-- ... -->

    </application>
</manifest>
```

If you choose to use a [custom scheme](#use-a-custom-scheme-for-the-redirect-uri) you **must** define your own intent-filter as explained above and replace the `android:scheme` value with the new one.

Finally, don't forget to add the internet permission:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

::: note
In versions 1.8.0 or lower of Auth0.Android you had to define the **intent-filter** inside your activity to capture the authentication result in the `onNewIntent` method and then call `WebAuthProvider.resume()` with the received data. The intent-filter declaration and resume call are no longer required for versions greater than 1.8.0 unless you need to use a custom scheme, as it's now done internally by the library for you.
:::

Now, let's authenticate a user by presenting the Auth0 [Hosted Login Page](hosted-pages/login):

```java
WebAuthProvider.init(account)
                .withAudience("https://${account.namespace}/userinfo")
                .start(this, authCallback);
```

The authentication result will be delivered to the callback.


### Authenticate with a specific Auth0 connection

The `withConnection` option allows you to specify a connection that you wish to authenticate with.

```java
WebAuthProvider.init(account)
                .withConnection("twitter")
                .start(this, authCallback);
```

### Authenticate using a code grant with PKCE

Code grant is the default mode, and will always be used unless calling `useCodeGrant` with `false`, or unless the device doesn't support the signing/hashing algorithms.

Before you can use `Code Grant` in Android, make sure to go to your [client's section](${manage_url}/#/applications) in dashboard and check in the Settings that `Client Type` is `Native`.

```java
WebAuthProvider.init(account)
                .useCodeGrant(true)
                .start(this, authCallback);
```

### Authenticate using a specific scope

Using scopes can allow you to return specific claims for specific fields in your request. Adding parameters to `withScope` will allow you to add more scopes. You should read our [documentation on scopes](/scopes) for further details about them.

```java
WebAuthProvider.init(account)
                .withScope("openid email profile")
                .start(this, authCallback);
```

::: panel Scope
Note that the default scope used is `openid`
:::

### Authenticate using specific connection scopes

There may be times when you need to authenticate with particular connection scopes, or permissions, from the Authentication Provider in question. Auth0 has [documentation on setting up connection scopes for external Authentication Providers](/tutorials/adding-scopes-for-an-external-idp), but if you need specific access for a particular situation in your app, you can do so by passing parameters to `withConnectionScope`. A full listing of available parameters can be found in that connection's settings in your dashboard, or from the Authentication Providers's documentation. The scope requested here is added on top of the ones specified in the Dashboard's Connection settings.

```java
WebAuthProvider.init(account)
                .withConnectionScope("email", "profile", "calendar:read")
                .start(this, authCallback);
```

### Authenticate using custom authentication parameters

To send additional parameters on the authentication, use `withParameters`:

```java
Map<String, Object> parameters = new HashMap<>();
//Add entries
WebAuthProvider.init(account)
                .withParameters(parameters)
                .start(this, authCallback);
```

### Use a custom scheme for the Redirect URI

If you're not using Android "App Links" or you just want to use a different scheme for the _redirect uri_ then use `withScheme`. Note that you'll need to add or update the `intent-filter` on the application's manifest as explained above:

```java
WebAuthProvider.init(account)
                .withScheme("myapp")
                .start(this, authCallback);
```

**Scheme must be lowercase**

### Specify Audience

```java
WebAuthProvider.init(account)
                .withScope("openid")
                .withAudience("https://${account.namespace}/userinfo")
                .start(this, authCallback);
```

### Specify state

By default a random state is always sent. If you need to use a custom one, use `withState`:

```java
WebAuthProvider.init(account)
                .withState("my-custom-state")
                .start(this, authCallback);
```

### Specify nonce

By default a random nonce is sent when the response type includes `id_token`. If you need to use a custom one, use `withNonce`:

```java
WebAuthProvider.init(account)
                .withNonce("my-custom-nonce")
                .start(this, authCallback);
```

## Using the Authentication API

The Authentication Client provides methods to authenticate the user against Auth0 server. Create a new instance by passing in the Auth0 object created in the previous step.

```java
AuthenticationAPIClient authentication = new AuthenticationAPIClient(account);
```

To ensure an Open ID Connect compliant responses you must either request an `audience` or enable the **OIDC Conformant** switch in your Auth0 dashboard under `Client / Settings / Advanced OAuth`. You can read more about this [here](https://auth0.com/docs/api-auth/intro#how-to-use-the-new-flows).

### Login with database connection

Logging in with a database connection requires calling `login` with the user's *email*, *password*, and the *connection* you wish to authenticate with. The response will be a Credentials object. By specifying the *audience* an Open ID Connect compliant response will be yielded during authentication.

```java
authentication
    .login("info@auth0.com", "a secret password", "my-database-connection")
    .setAudience("https://${account.namespace}/userinfo")
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

::: panel Scope
Note that the default scope used is `openid`
:::

### Passwordless login

Logging in with a Passwordless is slightly different. Passwordless can be done via email or via SMS, and either by sending the user a code, or sending them a link which contains a code. All of these methods of Passwordless authentication will require two steps - requesting the code, and then inputting the code for verification.

**Step 1:** Request the code

In this example, requesting the code is done by calling `passwordlessWithEmail` with the user's email, `PasswordlessType.CODE`, and the name of the connection as parameters. On success, you'll probably display a notice to the user that their code is on the way, and perhaps route them to a view to input that code.

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

**Step 2:** Input the code

Once the user has a code, they can input it. Call the `loginWithEmail` method, and pass in the user's email, the code they received, and the name of the connection in question. Upon success, you will receive a Credentials object in the response.

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

::: note
Note that the default scope used is `openid`.
:::

### Sign up with database connection

Signing up with a database connection is similarly easy. Call the `signUp` method passing the user's given email, chosen password, and the connection name to initiate the signup process.

```java
authentication
    .signUp("info@auth0.com", "a secret password", "my-database-connection")
    .setAudience("https://${account.namespace}/userinfo")
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

To get the information associated with a given user's `access_token`, you can call the `userInfo` endpoint, passing the token.

```java
authentication
  .userInfo("access token")
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

## Using the Management API

The Management API provides functionality that allows you to link and unlink separate user accounts from different providers, tying them to a single profile (Read more about [Linking Accounts](/link-accounts) with Auth0). It also allows you to update user metadata.

To get started, create a new `UsersAPIClient` instance by passing it the `account` and the token for the primary identity. In the case of linking users, this primary identity is the user profile that you want to "keep" the data for, and which you plan to link other identities to.

```java
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
UsersAPIClient users = new UsersAPIClient(account, "token");
```

### Linking users

Linking user accounts will allow a user to authenticate from any of their accounts and no matter which one they use, still pull up the same profile upon login. Auth0 treats all of these accounts as separate profiles by default, so if you wish a user's accounts to be linked, this is the way to go.

The `link` method accepts two parameters, the primary user id and the secondary user token (the token obtained after login with this identity). The user id in question is the unique identifier for this user account. If the id is in the format `facebook|1234567890`, the id required is the portion after the delimiting pipe.

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

### Unlinking users

Unlinking users is a similar process to the linking of users. The `unlink` method takes three parameters, though: the primary user id, the secondary user id, and the secondary provider (of the secondary user).

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

::: note
When accounts are linked, the secondary account's metadata is **not** merged with the primary account's metadata. Similarly, when unlinking two accounts, the secondary account does not retain the primary account's metadata when it becomes separate again.
:::

### Updating user metadata

When updating user metadata, you will create a `metadata` object, and then call the `updateMetadata` method, passing it the user id and the `metadata` object. The values in this object will overwrite existing values with the same key, or add new ones for those that don't yet exist in the user metadata.

```java
Map<String, Object> metadata = new HashMap<>();
metadata.put("name", Arrays.asList("My", "Name", "Is"));
metadata.put("phoneNumber", "1234567890");

users
    .updateMetadata("user id", metadata)
    .start(new BaseCallback<UserProfile, ManagementException>() {
        @Override
        public void onSuccess(UserProfile payload) {
            //Metadata updated
        }

        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```
