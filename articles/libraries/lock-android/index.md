---
toc_title: Getting Started with Lock for Android
url: /libraries/lock-android
description: Installation, usage, and configuration options guide for Lock for Android
---

# Lock for Android

Lock for Android can integrate into your native Android apps to provide a beautiful way to log your users in and to sign them up in your app. It provides support for social identity providers such as Facebook, Google, or Twitter, as well as enterprise providers such as Active Directory. You can also use Lock for Android to provide Passwordless authentication using email or SMS. 

Get started using Lock for Android below, or if you're looking for a specific document, try the listing of [additional documents](#additional-documents) related to Lock for Android!!

## Requirements

Android API level 15+ is required in order to use Lock's UI.
If you intend to create your own API and just call Auth0 API via the `com.auth0.android:auth0:1.1.0`, the minimum required API level is also 15+.

## Installation

Lock is available both in [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To start using *Lock* add these lines to your `build.gradle` dependencies file:

```gradle
compile 'com.auth0.android:lock:2.0.0'
```

_You can check for the latest version on the repository [Releases](https://github.com/auth0/Lock.Android/releases) tab or in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22lock%22%20g%3A%22com.auth0.android%22)_

After adding your Gradle dependency, make sure to remember to sync your project with Gradle files.

## Dashboard Settings

There are a few settings in your [Auth0 Dashboard](https://manage.auth0.com) that will need to be filled out before we get started. 

### Callback URL

Head over to your Auth0 Dashboard and go to the client's settings. Add the following URL to the client's "Allowed Callback URLs"

```text
https://{YOUR_AUTH0_DOMAIN}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Be sure to modify the URL to add your Auth0 domain and your app package name, of course!

### Keystores

You will need a keystore for signing your Android app. If you already have one, you can continue and skip the instructions about acquiring one. During development, you can use the default "debug keystore" to sign your application, and that requires specific values.

The following examples will explain how to generate a keystore using debug values. For a release keystore, replace the name, password, alias, and key password with your own values.

**On Windows:**

```bash
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

**On Linux / macOS:**

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**Sample output:**

```text
Alias name: androiddebugkey
Creation date: Jan 01, 2013
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Android Debug, O=Android, C=US
Issuer: CN=Android Debug, O=Android, C=US
Serial number: 4aa9b300
Valid from: Mon Jan 01 08:04:04 UTC 2013 until: Mon Jan 01 18:04:04 PST 2033
Certificate fingerprints:
     MD5:  AE:9F:95:D0:A6:86:89:BC:A8:70:BA:34:FF:6A:AC:F9
     SHA1: BB:0D:AC:74:D3:21:E1:43:07:71:9B:62:90:AF:A1:66:6E:44:5D:75
     SHA256: 15:B9:F9:33:9F:E4:E3:68:C2:10:49:17:5D:A8:77:12:7C:8E:57:E9:FF:B7:23:EA:CC:DD:56:08:06:C9:5E:33
     Signature algorithm name: SHA256withRSA
     Version: 3
```

Once you have your keystore file output, copy the resulting SHA256 value and go to your client's settings in the Auth0 Dashboard. Click "Show Advanced Settings", and in the "Mobile Settings" tab, under "Android", fill the "App Package Name" with your application's package name, and the "Key Hashes" field with the value you copied from your keystore. Don't forget to save the changes.

::: panel-warning Required Actions
If you don't add the callback URL to the client settings nor the key hash to the client's mobile settings, the Auth0 server won't return the call result to your application.
:::

## Implementing Lock (Social, Database, Enterprise)

The following instructions discuss implementing Lock for Android. If you specifically are looking to implement Passwordless lock for Android, take a look now at the [Passwordless Authentication with Lock for Android](/libraries/lock-android/passwordless) page.

### Configuring AndroidManifest.xml

Add the `android.permission.INTERNET` permission to the Manifest to allow Lock to make requests to the Auth0 API.

```java
<uses-permission android:name="android.permission.INTERNET" />
```

Add LockActivity to your Manifest, replacing the `host` attribute with your `tenant.auth0.com` domain and the `{YOUR_APP_PACKAGE_NAME}` in the `pathPrefix` attribute with your application's package name. This filter allows Android OS to notify your application when an URL with that format is hit. For Lock, this means receiving the authentication result.

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

#### Some Restrictions

* Make sure the Activity's launchMode is declared as `singleTask` or the result won't come back after the authentication. 
* Also note that for the time being, `LockActivity` can't be launched calling `startActivityForResult`.

### Lock Instance 

In the previous version of Lock for Android, you were asked to create a custom `Application` class and initialize the `Lock.Context` there. **Now this is no longer needed**.

To create a new `Lock` instance and configure it, you will just use the `Lock.Builder` class.

### Auth0

Create an `Auth0` instance to hold your account details, which are the `AUTH0_CLIENT_ID` and the `AUTH0_DOMAIN`.

```java
Auth0 auth0 = new Auth0('${account.clientId}','${account.namespace}');
```

### Authentication Callback

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

Note that the results of the AuthenticationCallback are in a `credentials` object. The Credentials class contains the following:

```java
@SerializedName("access_token")
private String accessToken;

@SerializedName("token_type")
private String type;

@SerializedName("id_token")
private String idToken;

@SerializedName("refresh_token")
private String refreshToken;
```

So that your returned object `credentials` will contain whichever credentials are required for your operations.

### Lock.Builder

Call the static method `Lock.newBuilder(Auth0, LockCallback)`, passing the account details and the callback implementation, and start configuring the Options. After you're done, build the Lock instance and use it to start the LockActivity.

This is an example of what your Activity should look like:

```java
public class MainActivity extends Activity {
  private Lock lock;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    Auth0 auth0 = new Auth0('${account.clientId}','${account.namespace}');
    lock = Lock.newBuilder(auth0, callback)
      // ... Options
      .build(this);
  }

  @Override
  public void onDestroy() {
    lock.onDestroy(this);
    lock = null;
    super.onDestroy();
  }

  private void performLogin() {
    startActivity(lock.newIntent(this));
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

Remember to notify the LockActivity when the `OnDestroy` method is called on your Activity, as it helps to keep the Lock state.

That's it! Lock will handle the rest for you.

## Implementing Passwordless authentication with Lock for Android

For instructions on how to implement Passwordless authentication with Lock for Android, please see the [Passwordless Guide](/libraries/lock-android/passwordless).

## Proguard

In the [proguard directory](https://github.com/auth0/Lock.Android/tree/master/proguard) you can find the *Proguard* configuration for Lock for Android and its dependencies. This can be used in your release builds to avoid some issues when compiling.
By default you should at least use the following files:
* `proguard-okio.pro`
* `proguard-gson.pro`
* `proguard-otto.pro`
* `proguard-lock-2.pro`

As this library depends on `Auth0.Android`, you should keep the files up to date with the proguard rules defined in the [repository](https://github.com/auth0/Lock.Android).

## Lock Configuration

For a full list of Lock's configuration options, check out the [Lock for Android Configuration Reference](/libraries/lock-android/configuration). Also, for users of v1 migrating to v2, check out the [Migration Guide](/libraries/lock-android/migration-guide) to see what options have changed.

## Additional Documents

<ul>
<% _.forEach(_.sortBy(articles.findByHash('libraries/lock-android').items, 'toc_title'), function(article) { %>
  <% if (article.toc_title) { %>
  <li>
    <span><a href="<%- '/docs' + article.url %>"><%- article.toc_title %></a>
    <% if (article.description) { %>
      - <%- article.description %>
    <% } %>
    </span>
  </li>
  <% } %>
<% }); %>
</ul>
