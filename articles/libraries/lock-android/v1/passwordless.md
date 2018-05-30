---
section: libraries
title: Lock Android v1 Passwordless
description: Guide on implementing Passwordless authentication with Lock for Android
tags:
  - libraries
  - lock
  - android
  - passwordless
  - tokens
---
# Lock Android: Passwordless

<%= include('../_includes/_lock-version') %>

Lock Passwordless authenticates users by sending them an Email or SMS with a one-time password that the user must enter and confirm to be able to log in, similar to how WhatsApp authenticates you. This article will explain how to send a **CODE** using the `Lock.Android` library.

::: note
You can achieve a similar result by sending a **LINK** that the user can click to finish the passwordless authentication automatically, but a few more configuration steps are involved. You can check that article [here](/libraries/lock-android/v1/passwordless-magic-link).
:::

In order to be able to authenticate the user, your application must have the Email/SMS connection enabled and configured in your [Auth0 Dashboard](${manage_url}/#/connections/passwordless).

Note that Passwordless Lock *cannot be used* with the [OIDC Conformant Mode](/libraries/lock-android/index#oidc-conformant-mode) set to `true`. For more information, please see the [OIDC adoption guide](https://auth0.com/docs/api-auth/tutorials/adoption).

## Passwordless Authentication

`LockPasswordlessActivity` authenticates users by sending them an Email or SMS (similar to how WhatsApp authenticates you). In order to be able to authenticate the user, your application must have the SMS/Email connection enabled and configured in your [dashboard](${manage_url}/#/connections/passwordless).

`LockPasswordlessActivity` is not included in `com.auth0:lock:aar` as it's part of the library `lock-passwordless`, but you can add it with this line in your `build.gradle`:

```gradle
compile 'com.auth0.android:lock-passwordless:1.+'
```

Then in your `AndroidManifest.xml` register the following activities:

```xml
    <!--Auth0 Lock Passwordless-->
    <activity
      android:name="com.auth0.lock.passwordless.LockPasswordlessActivity"
      android:theme="@style/Lock.Theme"
      android:label="@string/app_name"
      android:screenOrientation="portrait"
      android:launchMode="singleTask"/>

    <activity android:name="com.auth0.lock.passwordless.CountryCodeActivity"
      android:theme="@style/Lock.Theme"/>
<!--Auth0 Lock Passwordless End-->
```

Just like `LockActivity`, when a user authenticates successfully, `LockPasswordlessActivity` will send an `Action` using `LocalBroadcastManager` and then finish itself (by calling `finish()`). The activity that is interested in receiving this `Action` (in this case the one that will show Lock) needs to register a listener in the `LocalBroadcastManager`:

```java
// This activity will show Lock
public class HomeActivity extends Activity {
  private LocalBroadcastManager broadcastManager;

  private BroadcastReceiver authenticationReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      UserProfile profile = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_PROFILE_PARAMETER);
      Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
      Log.i(TAG, "User " + profile.getName() + " logged in");
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    //Customize your activity

    broadcastManager = LocalBroadcastManager.getInstance(this);
    broadcastManager.registerReceiver(authenticationReceiver, new IntentFilter(Lock.AUTHENTICATION_ACTION));
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    broadcastManager.unregisterReceiver(authenticationReceiver);
  }
}
```

Then just start `LockPasswordlessActivity` specifying the Passwordless type you want to use, so for **Email**

```java
LockPasswordlessActivity.showFrom(MyActivity.this, LockPasswordlessActivity.MODE_EMAIL_CODE);
```

or just for **SMS**

```java
LockPasswordlessActivity.showFrom(MyActivity.this, LockPasswordlessActivity.MODE_SMS_CODE);
```

and you'll see the **SMS** login screen

![Lock Screenshot](/media/articles/libraries/lock-android/Lock-SMS-Android-Screenshot.png)

Passworless scenarios and types:

| Channel \ Mode  | Code  | Magic Link      |
| :-----: |:---------------:| :--------------: |
| SMS   | `LockPasswordlessActivity.MODE_SMS_CODE`   | `LockPasswordlessActivity.MODE_SMS_LINK`   |
| Email | `LockPasswordlessActivity.MODE_EMAIL_CODE` | `LockPasswordlessActivity.MODE_EMAIL_LINK` |

You can find more information about Magic Links [here](/libraries/lock-android/v1/passwordless-magic-link).
