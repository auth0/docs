---
section: libraries
toc: true
title: Lock for Android v2
description: A widget that provides a frictionless login and signup experience for your native Android apps.
mobileimg: media/articles/libraries/lock-android.png
topics:
  - libraries
  - lock
  - android
contentType:
  - index
  - how-to
  - reference
useCase:
  - add-login
  - enable-mobile-auth
---
# Lock Android: Getting Started

::: warning
Username/Email & Password authentication from native applications is disabled by default for new tenants as of 8 June 2017. Users are encouraged to use <dfn data-key="universal-login">Universal Login</dfn> and perform Web Authentication instead. If you still want to proceed you'll need to enable the Password Grant Type on your dashboard first. See [Application Grant Types](/applications/concepts/application-grant-types) for more information.
:::

<dfn data-key="lock">Lock</dfn> for Android can integrate into your native Android apps to provide a beautiful way to log your users in and to sign them up in your app. It provides support for social identity providers such as Facebook, Google, or Twitter, as well as enterprise providers such as Active Directory.

Get started using Lock for Android below, or if you're looking for a specific document beyond basic setup of Lock, try the listing of [next steps](#next-steps) for working with Lock for Android.

::: note
Check out the [Lock.Android repository](https://github.com/auth0/Lock.Android) on GitHub.
:::

## Requirements

To use Lock's UI or your own UI via the [Auth0.Android library](https://github.com/auth0/Auth0.Android) the minimum required Android API level is 15+.

## Installation

Lock is available both in [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To start using *Lock* add these lines to your `build.gradle` dependencies file:

```gradle
compile 'com.auth0.android:lock:2.+'
```

::: note
You can check for the latest version on the repository [Readme](https://github.com/auth0/Lock.Android#install), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22lock%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/lock).
:::

After adding your Gradle dependency, make sure to remember to sync your project with Gradle files.

## Dashboard settings

You need to fill in a few settings in your [Auth0 Dashboard](${manage_url}) before you get started.

### Callback URL

Head over to your Auth0 Dashboard and go to the application's settings. Add the following URL to the application's "Allowed <dfn data-key="callback">Callback URLs</dfn>"

```text
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

::: note
Replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name, available in your `app/build.gradle` file as the `applicationId` value.
:::

### Keystores and key hashes

You will need a [Keystore](https://developer.android.com/studio/publish/app-signing.html) for signing your Android app. If you already have one, you can continue and skip the instructions about acquiring one.

During development, you can use the default "android debug keystore" to sign your application. For instructions on how to generate the key hashes using this keystore, use our [Android Keystores and Key Hashes Guide](/libraries/lock-android/v2/keystore).

For a release keystore, replace the file, alias, store password and key password with your own values.

## Implementing Lock (Social, Database, Enterprise)

The following instructions discuss implementing Lock for Android. If you specifically are looking to implement <dfn data-key="passwordless">Passwordless</dfn> Lock for Android, read the [Passwordless Authentication with Lock for Android](/libraries/lock-android/v2/passwordless) page.

### Configuring the SDK

In your `app/build.gradle` file add the [Manifest Placeholders](https://developer.android.com/studio/build/manifest-build-variables.html) for the Auth0 Domain and the Auth0 Scheme properties which are going to be used internally by the library to register an intent-filter that captures the callback URI.

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

It's a good practice to define reusable resources like `@string/com_auth0_domain` but you can also hard code the value to `${account.namespace}` in the file.

Next, modify the `AndroidManifest.xml` file. Add the `android.permission.INTERNET` permission to allow Lock to make requests to the Auth0 API.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Add the `LockActivity`.

```xml
<activity
  android:name="com.auth0.android.lock.LockActivity"
  android:label="@string/app_name"
  android:launchMode="singleTask"
  android:screenOrientation="portrait"
  android:theme="@style/MyLock.Theme"/>
```

::: note
In versions 2.5.0 or lower of Lock.Android you had to define an **intent-filter** inside the `LockActivity` to make possible to the library to capture the authentication result. This intent-filter declaration is no longer required for versions greater than 2.5.0, as it's now done internally by the library for you.
:::

In case you are using an older version of Lock the **intent-filter** must be added to the `LockActivity` by you:

```xml
<activity
  android:name="com.auth0.android.lock.LockActivity"
  android:label="@string/app_name"
  android:launchMode="singleTask"
  android:screenOrientation="portrait"
  android:theme="@style/MyLock.Theme">
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
```

#### Some restrictions

* Make sure the `LockActivity` launchMode is declared as `singleTask` or the result won't come back after the authentication.
* Also note that for the time being, `LockActivity` can't be launched by calling `startActivityForResult`.

### Auth0

Create an `Auth0` instance to hold your account details, which are the `AUTH0_CLIENT_ID` and the `AUTH0_DOMAIN`.

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
```

### OIDC Conformant Mode

It is strongly encouraged that Lock be used in OIDC Conformant mode. When this mode is enabled, it will force Lock to use Auth0's current authentication pipeline and will prevent it from reaching legacy endpoints. By default is `false`.

```java
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
//Configure the account in OIDC conformant mode
account.setOIDCConformant(true);
//Use the account to launch Lock
```

For more information, please see the [OIDC adoption guide](/api-auth/tutorials/adoption).

### Authentication callback

You'll also need a `LockCallback` implementation. Here is an example which will notify you about Authentication events (logins).

```java
private LockCallback callback = new AuthenticationCallback() {
     @Override
     public void onAuthentication(Credentials credentials) {
        //Authenticated
     }

     @Override
     public void onCanceled() {
        //User pressed back
     }

     @Override
     public void onError(LockException error)
        //Exception occurred
     }
 };
```

::: note
The results of the AuthenticationCallback are in a `credentials` object. This object contains the tokens that you will require for authentication related operations in your app; see [Tokens](/tokens) for more specifics.
:::

### Lock.Builder

To create a new `Lock` instance and configure it, use the `Lock.Builder` class. Call the static method `Lock.newBuilder(Auth0, LockCallback)`, passing the account details and the callback implementation, and start configuring the Options as you need. After you're done, build the Lock instance and use it to start the `LockActivity`.

To ensure a response that complies with <dfn data-key="openid">OpenID Connect (OIDC)</dfn>, you must either request an <dfn data-key="audience">`audience`</dfn> or enable the **OIDC Conformant** switch in your Auth0 dashboard under `Application / Settings / Advanced OAuth`. You can read more about this [here](/api-auth/intro#how-to-use-the-new-flows).

This is an example of what your `Activity` should look:

```java
public class MainActivity extends Activity {
  private Lock lock;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Your own Activity code
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    auth0.setOIDCConformant(true);
    lock = Lock.newBuilder(auth0, callback)
      .withAudience("https://${account.namespace}/userinfo")
      // ... Options
      .build(this);
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    // Your own Activity code
    lock.onDestroy(this);
    lock = null;
  }

  private LockCallback callback = new AuthenticationCallback() {
       @Override
       public void onAuthentication(Credentials credentials) {
          //Authenticated
       }

       @Override
       public void onCanceled() {
          //User pressed back
       }

       @Override
       public void onError(LockException error) {
          //Exception occurred
       }
   };
}
```

Remember to notify Lock's instance when your activity calls the `OnDestroy` method, as it helps to keep the state.

Then, start `Lock` from inside your activity.

```java
startActivity(lock.newIntent(this));
```

That's it! Lock will handle the rest for you.

### Android App Links - Custom Scheme

The callback URI scheme used in this article is `https`. This works best for Android Marshmallow (API 23) or newer if you're using [Android App Links](https://developer.android.com/training/app-links/index.html), but in previous Android versions this may show the intent chooser dialog prompting the user to chose either your application or the browser to resolve the intent. You can change this behavior by using a custom unique scheme so that the OS opens the link directly with your app.
Do so by updating the `app/build.gradle` file and changing the `auth0Scheme` value. Then go to your application's dashboard and update the "Allowed callback URL" value to match the new scheme. Now call `withScheme()` in the Lock.Builder and pass the custom value so that Lock requests the correct redirect URI.

## Implementing Passwordless authentication with Lock for Android

For instructions on how to implement Passwordless authentication with Lock for Android, please see the [Passwordless Guide](/libraries/lock-android/v2/passwordless).

## Proguard

The proguard rules should be applied automatically if your application is using `minifyEnabled = true`. If you want to include them manually check the [proguard directory](https://github.com/auth0/Lock.Android/tree/master/proguard). By default you should at least use the following files:

By default you should at least use the following files:

* `proguard-gson.pro`
* `proguard-otto.pro`
* `proguard-lock-2.pro`

As this library depends on `Auth0.Android`, you should keep the files up to date with the proguard rules defined in that [repository](https://github.com/auth0/Lock.Android).

## Lock configuration

For a full list of Lock's configuration options, check out the [Lock for Android Configuration Reference](/libraries/lock-android/v2/configuration). Also, for users of v1 migrating to v2, read the [Migration Guide](/libraries/lock-android/v2/migration-guide) to see what options have changed.

## Error messages

For descriptions of common error messages, check out the [Error Messages](/libraries/error-messages) page. Also, if your callback receives an `AuthenticationException` you can check [source](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/authentication/AuthenticationException.java) to learn how to identify each error scenario.

## Next Steps

::: next-steps
* [Customizing the Style of Lock](/libraries/lock-android/custom-theming)
* [Customizing the Behavior of Lock](/libraries/lock-android/configuration)
* [Adding Custom Signup Fields to Lock](/libraries/lock-android/custom-fields)
* [Lock Internationalization](/libraries/lock-android/internationalization)
* [Logging out Users](/logout)
:::
