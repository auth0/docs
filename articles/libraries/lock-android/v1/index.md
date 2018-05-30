---
section: libraries
toc: true
title: Lock for Android v1
description: A widget that provides a frictionless login and signup experience for your native Android apps.
mobileimg: media/articles/libraries/lock-android.png
tags:
  - libraries
  - lock
  - android
---
# Lock Android: Getting Started

<%= include('../_includes/_lock-version') %>

::: note
Check out the [Lock.Android repository](https://github.com/auth0/Lock.Android/tree/v1) on GitHub.
:::

## Requirements

Android API level 15+ is required in order to use Lock's UI.
If you'll create your own API and just call Auth0 API via the `com.auth0.android:core:1.+`, the minimum required API level is 9.

## Install

Lock is available both in [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To start using *Lock* add these lines to your `build.gradle` dependencies file:

```gradle
compile 'com.auth0.android:lock:1.+'
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

::: note
The value `@string/auth0_client_id` is your application's clientID and `@string/auth0_domain` is your tenant's domain in Auth0, both values can be found in your app's settings.
:::

::: note
The final value of `android:scheme` must be in lowercase.
:::

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

## Authentication with Lock

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

::: note
By default all social authentication will be done using an external browser, if you want native integration please check this [wiki page](/libraries/lock-android/native-social-authentication).
:::

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
