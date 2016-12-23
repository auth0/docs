---
section: libraries
toc_title: Passwordless Authentication with Lock for Android
description: Guide on implementing Passwordless authentication with Lock for Android
---

# Implementing Lock Passwordless

`PasswordlessLockActivity` authenticates users by sending them an email or SMS (similar to how WhatsApp authenticates you). In order to be able to authenticate the user, your application must have the email/SMS connection enabled and configured in your [Auth0 dashboard](https://manage.auth0.com/#/connections/passwordless).

You'll need to add the `PasswordlessLockActivity` to your Manifest, inside the `application` tag:

```xml
<activity
  android:name="com.auth0.android.lock.PasswordlessLockActivity"
  android:label="@string/app_name"
  android:launchMode="singleTask"
  android:screenOrientation="portrait"
  android:theme="@style/Lock.Theme">
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />

      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />

      <data
        android:host="{YOUR_AUTH0_DOMAIN}"
        android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/callback"
        android:scheme="https" />
    </intent-filter>
</activity>
```

Make sure the Activity's `launchMode` is declared as `"singleTask"` or the result won't come back after the authentication.

Also, you'll need to add *Internet* permission to your application:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Then in any of your Activities, you need to initialize **PasswordlessLock**

```java
public class MainActivity extends Activity {

  private PasswordlessLock lock;

  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Your own Activity code
    Auth0 auth0 = new Auth0('${account.clientId}','${account.namespace}');
    lock = PasswordlessLock.newBuilder(auth0, callback)
      //Customize Lock
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

Then, just start `PasswordlessLockActivity` from inside your `Activity`

```java
startActivity(lock.newIntent(this));
```