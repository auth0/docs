---
section: libraries
toc_title: Passwordless Authentication with Lock for Android
description: Guide on implementing Passwordless authentication with Lock for Android
---

# Lock Passwordless

Lock Passwordless authenticates users by sending them an Email or SMS with a one-time password that the user must enter and confirm to be able to log in, similar to how WhatsApp authenticates you. This article will explain how to send a **CODE** using the `Lock.Android` library.

::: note
You can achieve a similar result by sending a **LINK** that the user can click to finish the passwordless authentication automatically, but a few more configuration steps are involved. You can check that article [here](/libraries/lock-android/passwordless-magic-link).
:::

In order to be able to authenticate the user, your application must have the Email/SMS connection enabled and configured in your [Auth0 Dashboard](${manage_url}/#/connections/passwordless).


## Implementing CODE Passwordless

The first step is to add the `PasswordlessLockActivity` to your `AndroidManifest.xml` inside the `application` tag.

```xml
<activity
    android:name="com.auth0.android.lock.PasswordlessLockActivity"
    android:theme="@style/Lock.Theme"
    android:label="@string/app_name"
    android:screenOrientation="portrait"
    android:launchMode="singleTask"/>
```

::: note
If your client has Social connections enabled you must add the corresponding Intent-Filter in the `PasswordlessLockActivity` to capture the call to the expected callback URL.
:::

When the Passwordless connection is SMS you must also add the `CountryCodeActivity` to allow the user to change the **Country Code** prefix of the phone number.

```xml
<activity
  android:name="com.auth0.android.lock.CountryCodeActivity"
  android:theme="@style/Lock.Theme.ActionBar" />
```

Next, add the **Internet** permission to your application:

```xml
<uses-permission android:name="android.permission.INTERNET" />
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
