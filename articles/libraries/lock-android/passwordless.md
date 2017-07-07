---
section: libraries
toc_title: Passwordless Authentication with Lock for Android
description: Guide on implementing Passwordless authentication with Lock for Android
---
# Lock Passwordless

::: warning
This feature is disabled by default for new tenants as of 8 June 2017. If you would like this feature enabled, please contact support to discuss your use case and prevent the possibility of introducing security vulnerabilities. Please see [Client Grant Types](/clients/client-grant-types) for more information.
:::

Lock Passwordless authenticates users by sending them an Email or SMS with a one-time password that the user must enter and confirm to be able to log in, similar to how WhatsApp authenticates you. This article will explain how to send a **CODE** using the `Lock.Android` library.

::: note
You can achieve a similar result by sending a **LINK** that the user can click to finish the passwordless authentication automatically, but a few more configuration steps are involved. You can check that article [here](/libraries/lock-android/passwordless-magic-link).
:::

In order to be able to authenticate the user, your application must have the Email/SMS connection enabled and configured in your [Auth0 Dashboard](${manage_url}/#/connections/passwordless).

## Implementing CODE Passwordless

In your `app/build.gradle` file add a [Manifest Placeholder](https://developer.android.com/studio/build/manifest-build-variables.html) for the Auth0 Domain property which is going to be used internally by the library to register an intent-filter.

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

Next, modify the `AndroidManifest.xml` file. Add the `android.permission.INTERNET` permission to allow Lock to make requests to the Auth0 API.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Add the `PasswordlessLockActivity`.

```xml
<activity
    android:name="com.auth0.android.lock.PasswordlessLockActivity"
    android:label="@string/app_name"
    android:launchMode="singleTask"
    android:screenOrientation="portrait"
    android:theme="@style/MyLock.Theme"/>
```

::: note
In versions 2.5.0 or lower of Lock.Android you had to define an **intent-filter** inside the `LockActivity` to make possible to the library to capture the authentication result. This intent-filter declaration is no longer required for versions greater than 2.5.0 unless you need to use a custom scheme, as it's now done internally by the library for you.
:::

In case you are using an older version of Lock or require to use a custom scheme for Social Authentication, the **intent-filter** must be added to the `PasswordlessLockActivity` by you. i.e. with a scheme value of `demo`.

```xml
<activity
  android:name="com.auth0.android.lock.PasswordlessLockActivity"
  android:label="@string/app_name"
  android:launchMode="singleTask"
  android:screenOrientation="portrait"
  android:theme="@style/MyLock.Theme">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data
            android:host="@string/auth0_domain"
            android:pathPrefix="/android/${applicationId}/callback"
            android:scheme="demo" />
    </intent-filter>
</activity>
```

When the Passwordless connection is SMS you must also add the `CountryCodeActivity` to allow the user to change the **Country Code** prefix of the phone number.

```xml
<activity
  android:name="com.auth0.android.lock.CountryCodeActivity"
  android:theme="@style/Lock.Theme.ActionBar" />
```

## Usage

In any of your activities, you need to initialize `PasswordlessLock` and tell it to send a **CODE**. We'll indicate this by calling the `useCode()` method.

```java
public class MainActivity extends Activity {

  private PasswordlessLock lock;

  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Your own Activity code
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    auth0.setOIDCConformant(true);
    lock = PasswordlessLock.newBuilder(auth0, callback)
      .useCode()
      .build(this);
  }

  @Override
  protected void onDestroy() {
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

Finally, just start `PasswordlessLock` from inside your activity and perform the login.

```java
startActivity(lock.newIntent(this));
```

Depending on which passwordless connections are enabled, Lock will send the CODE in an Email or SMS. The 'email' connection is selected first if available. Then the user must input the CODE in the confirmation step. If the value equals to the one the server is expecting, the authentication will be successful.
