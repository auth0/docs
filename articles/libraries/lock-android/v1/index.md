---
section: libraries
toc: true
toc_title: Lock for Android v1
title: Lock for Android v1
url: /libraries/lock-android/v1
description: A widget that provides a frictionless login and signup experience for your native Android apps.
mobileimg: media/articles/libraries/lock-android.png
---
# Lock for Android

<%= include('../_includes/_lock-version') %>

## Requirements

Android API level 15+ is required in order to use Lock's UI.
If you'll create your own API and just call Auth0 API via the `com.auth0.android:core:1.13.+`, the minimum required API level is 9.

## Install

Lock is available both in [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To start using *Lock* add these lines to your `build.gradle` dependencies file:

```gradle
compile 'com.auth0.android:lock:1.13.+'
```

Once it's installed, you'll need to configure LockActivity in your`AndroidManifest.xml`, inside the `application` tag:

```xml
<!--Auth0 Lock-->
<activity
  android:name="com.auth0.lock.LockActivity"
  android:theme="@style/Lock.Theme"
  android:screenOrientation="portrait"
  android:launchMode="singleTask">
  <intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data android:scheme="a0INSERT_YOUR_APP_CLIENT_ID" android:host="YOUR_ACCOUNT_NAME.auth0.com"/>
  </intent-filter>
</activity>
<meta-data android:name="com.auth0.lock.client-id" android:value="@string/auth0_client_id"/>
<meta-data android:name="com.auth0.lock.domain-url" android:value="@string/auth0_domain"/>
<!--Auth0 Lock End-->
```

> The value `@string/auth0_client_id` is your application's clientID and `@string/auth0_domain` is your tenant's domain in Auth0, both values can be found in your app's settings.
> The final value of `android:scheme` must be in lowercase

Also, you'll need to add *Internet* permission to your application:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Finally, make your Application class (The one that extends from `android.app.Application`) implement the interface `com.auth0.lock.LockProvider` and add the following code:

```java
public class MyApplication extends Application implements LockProvider {

  private Lock lock;

  public void onCreate() {
    super.onCreate();
    lock = new Lock.Builder()
      .loadFromApplication(this)
      /** Other configuration goes here */
      .closable(true)
      .build();
  }

  @Override
  public Lock getLock() {
    return lock;
  }
}
```

::: note
You can check [here](#lock-builder) for more configuration options
:::

You should also add your Application class to the `AndroidManifest.xml`.

```xml
<application
        android:name=".MyApplication"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name">
        <!-- Other configuration goes here -->

</application>
```

And include the following code in your `build.gradle` file.

```gradle
android {
  //...
  packagingOptions {
      exclude 'META-INF/NOTICE'
      exclude 'META-INF/LICENSE'
  }
}
```

## Usage

### Email/Password, Enterprise & Social authentication

`LockActivity` will handle Email/Password, Enterprise & Social authentication based on your Application's connections enabled in your Auth0's Dashboard.

When a user authenticates successfully, LockActivity will send an Action using LocalBroadcastManager and then finish itself (by calling finish()). The activity that is interested in receiving this Action (In this case the one that will show Lock) needs to register a listener in the LocalBroadcastManager:

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

Then just start `LockActivity`

```java
Intent lockIntent = new Intent(this, LockActivity.class);
startActivity(lockIntent);
```

And you'll see our native login screen

![Lock Screenshot](/media/articles/libraries/lock-android/Lock-Widget-Android-Screenshot.png)

> By default all social authentication will be done using an external browser, if you want native integration please check this [wiki page](/libraries/lock-android/native-social-authentication).

### Passwordless

`LockPasswordlessActivity` authenticates users by sending them an Email or SMS (similar to how WhatsApp authenticates you). In order to be able to authenticate the user, your application must have the SMS/Email connection enabled and configured in your [dashboard](${manage_url}/#/connections/passwordless).

`LockPasswordlessActivity` is not included in `com.auth0:lock:aar` as it's part of the library `lock-passwordless`, but you can add it with this line in your `build.gradle`:

```gradle
compile 'com.auth0.android:lock-passwordless:1.13.+'
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

You can find more information about Magic Links [here](/libraries/lock-android/passwordless-magic-link).

## Proguard

In the [proguard directory](https://github.com/auth0/Lock.Android/tree/master/proguard) you can find the *Proguard* configuration for Lock and its dependencies.
By default you should at least use the following files:

* `proguard-square-okhttp.pro`
* `proguard-jackson-2.pro`
* `proguard-square-otto.pro`
* `proguard-lock.pro`

and if you use Facebook or Google+ native integration, you'll need `proguard-facebook.pro` and `proguard-google-play-services.pro` respectively.

You specify several files in you application's `build.gradle` like this:

```gradle
buildTypes {
  release {
    minifyEnabled true
    proguardFile '../proguard/proguard-facebook.pro' //facebook native auth
    proguardFile '../proguard/proguard-google-play-services.pro' //G+ native auth
    proguardFile '../proguard/proguard-square-okhttp.pro' //Auth0 core
    proguardFile '../proguard/proguard-jackson-2.pro' //Auth0 core
    proguardFile '../proguard/proguard-square-otto.pro' //Lock
    proguardFile '../proguard/proguard-lock.pro' //Lock
    //Add your app's specific proguard rules
  }
}
```

<%= include('../_includes/_next-steps') %>
