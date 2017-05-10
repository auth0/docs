---
section: libraries
toc: true
toc_title: Getting Started with Lock for Android
title: Lock for Android
url: /libraries/lock-android
description: A widget that provides a frictionless login and signup experience for your native Android apps.
mobileimg: media/articles/libraries/lock-android.png
---

# Lock for Android

Lock for Android can integrate into your native Android apps to provide a beautiful way to log your users in and to sign them up in your app. It provides support for social identity providers such as Facebook, Google, or Twitter, as well as enterprise providers such as Active Directory. You can also use Lock for Android to provide Passwordless authentication using email or SMS.

Get started using Lock for Android below, or if you're looking for a specific document, try the listing of [additional documents](#additional-documents) related to Lock for Android.

## Requirements

To use Lock's UI or your own UI via the [Auth0.Android library](https://github.com/auth0/Auth0.Android) the minimum required Android API level is 15+.

## Installation

Lock is available both in [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To start using *Lock* add these lines to your `build.gradle` dependencies file:

```gradle
compile 'com.auth0.android:lock:2.+'
```

_You can check for the latest version on the repository [Readme](https://github.com/auth0/Lock.Android#install), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22lock%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/lock)._

After adding your Gradle dependency, make sure to remember to sync your project with Gradle files.

## Dashboard settings

You need to fill in a few settings in your [Auth0 Dashboard](${manage_url}) before you get started.

### Callback URL

Head over to your Auth0 Dashboard and go to the client's settings. Add the following URL to the client's "Allowed Callback URLs"

```text
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name.

### Keystores and key hashes

You will need a [Keystore](https://developer.android.com/studio/publish/app-signing.html) for signing your Android app. If you already have one, you can continue and skip the instructions about acquiring one.

During development, you can use the default "android debug keystore" to sign your application. For instructions on how to generate the key hashes using this keystore, use our [Android Keystores and Key Hashes Guide](/libraries/lock-android/keystore).

For a release keystore, replace the file, alias, store password and key password with your own values.

## Implementing Lock (Social, Database, Enterprise)

The following instructions discuss implementing Lock for Android. If you specifically are looking to implement Passwordless lock for Android, read the [Passwordless Authentication with Lock for Android](/libraries/lock-android/passwordless) page.

### Configuring AndroidManifest.xml

Add the `android.permission.INTERNET` permission to the Manifest to allow Lock to make requests to the Auth0 API.

```java
<uses-permission android:name="android.permission.INTERNET" />
```

Add `LockActivity` to your Manifest, using `"${account.namespace}"` as the `host` attribute  domain and `"{YOUR_APP_PACKAGE_NAME}"` in the `pathPrefix` attribute with your application's package name. This filter allows Android OS to notify your application when an URL with that format is hit. For Lock, this means receiving the authentication result.

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
        android:host="${account.namespace}"
        android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/callback"
        android:scheme="https" />
    </intent-filter>
</activity>
```

#### Some restrictions

* Make sure the Activity's launchMode is declared as `singleTask` or the result won't come back after the authentication.
* Also note that for the time being, `LockActivity` can't be launched by calling `startActivityForResult`.

### Auth0

Create an `Auth0` instance to hold your account details, which are the `AUTH0_CLIENT_ID` and the `AUTH0_DOMAIN`.

```java
Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
```

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

**Note**: The results of the AuthenticationCallback are in a `credentials` object. This object contains the tokens that you will require for authentication related operations in your app; see the [Tokens documentation](/tokens) for more specifics.

### Lock.Builder

To create a new `Lock` instance and configure it, use the `Lock.Builder` class. Call the static method `Lock.newBuilder(Auth0, LockCallback)`, passing the account details and the callback implementation, and start configuring the Options as you need. After you're done, build the Lock instance and use it to start the `LockActivity`.

This is an example of what your `Activity` should look:

```java
public class MainActivity extends Activity {
  private Lock lock;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Your own Activity code
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    lock = Lock.newBuilder(auth0, callback)
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

Remember to notify the `Lock` when your activity calls the `OnDestroy` method, as it helps to keep the Lock state.

Then, start `Lock` from inside your activity.

```java
startActivity(lock.newIntent(this));
```

That's it! Lock will handle the rest for you.

## Implementing Passwordless authentication with Lock for Android

For instructions on how to implement Passwordless authentication with Lock for Android, please see the [Passwordless Guide](/libraries/lock-android/passwordless).

## Proguard

The proguard rules should be applied automatically if your application is using `minifyEnabled = true`. If you want to include them manually check the [proguard directory](https://github.com/auth0/Lock.Android/tree/master/proguard). By default you should at least use the following files:

By default you should at least use the following files:
* `proguard-gson.pro`
* `proguard-otto.pro`
* `proguard-lock-2.pro`

As this library depends on `Auth0.Android`, you should keep the files up to date with the proguard rules defined in that [repository](https://github.com/auth0/Lock.Android).

## Lock configuration

For a full list of Lock's configuration options, check out the [Lock for Android Configuration Reference](/libraries/lock-android/configuration). Also, for users of v1 migrating to v2, read the [Migration Guide](/libraries/lock-android/migration-guide) to see what options have changed.

## Error messages

For descriptions of common error messages, check out the [Error Messages](/libraries/error-messages) page. Also, if your callback receives an `AuthenticationException` you can check [source](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/authentication/AuthenticationException.java) to learn how to identify each error scenario.

## Additional documents

<ul>
<% cache.find('articles/libraries/lock-android', {sort: 'toc_title'}).forEach(article => { %>
  <% if (article.toc_title) { %>
  <li>
    <span><a href="<%- article.url %>"><%- article.toc_title %></a>
    <% if (article.description) { %>
      - <%- article.description %>
    <% } %>
    </span>
  </li>
  <% } %>
<% }); %>
</ul>
