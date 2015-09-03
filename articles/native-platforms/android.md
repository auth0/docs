---
title: Android Tutorial
name: Android
alias:
  - Android
language:
  - Java
  - C
hybrid: false
image: /media/platforms/android.png
tags:
  - quickstart
snippets:
  dependencies: native-platforms/android/dependencies
  setup: native-platforms/android/setup
  use: native-platforms/android/use
---

## Android Tutorial

<%= include('../_includes/package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'Android/basic-sample',
  pkgFilePath: 'Android/basic-sample/app/src/main/res/values/auth0.xml' + account.clientParam,
  pkgType: 'replace'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### Before Starting

<div class="setup-callback">
  <p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>
  <pre><code>a0${account.clientId}://\*.auth0.com/authorize</code></pre>
</div>

### 1. Adding Auth0 Lock to your project

Add the following to the `build.gradle`:

${snippet(meta.snippets.dependencies)}

### 2. Configuring Auth0 Credentials & Callbacks

Add the `android.permission.INTERNET` permission:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Then add the following entries to `AndroidManifest.xml` inside the `<application>` tag:

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
    <data android:scheme="a0${account.clientId}" android:host="${account.namespace}"/>
  </intent-filter>
</activity>
<meta-data android:name="com.auth0.lock.client-id" android:value="${account.clientId}"/>
<meta-data android:name="com.auth0.lock.domain-url" android:value="${account.namespace}"/>
<!--Auth0 Lock End-->
```


### 3. Initialize Lock

First make your Application class (The one that extends from `android.app.Application`) implement the interface `com.auth0.lock.LockProvider` and add these lines of code:

${snippet(meta.snippets.setup)}

### 3. Register Native Authentication Handlers

You can configure Lock to use other native Android apps to log the user in (e.g: Facebook, Google+, etc.). In order to do so, you'll need to register them with Lock after it's initialized.

> If you don't want to use Facebook nor Google+ native authentication, please go directly to the [next step](#4-let-s-implement-the-login)

#### Facebook

Lock uses the native Facebook SDK to obtain the user's access token. This means that you'll need to configure it for your app.

To get started, in your AndroidManifest.xml you need to add the following:

```xml
<activity android:name="com.facebook.FacebookActivity"
          android:configChanges=
              "keyboard|keyboardHidden|screenLayout|screenSize|orientation"
          android:theme="@android:style/Theme.Translucent.NoTitleBar"
          android:label="@string/app_name" />
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
```

Where `@string/facebook_app_id` is your Facebook Application ID that you can get from [Facebook Dev Site](https://developers.facebook.com/apps).

> For more information on how to configure this, please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/android/getting-started).

> **Note:** The Facebook app should be the same as the one set in Facebook's Connection settings on your Auth0 account

Finally, you need to register the Auth0 Facebook Identity Provider with Lock. This can be done when building `Lock` with `Lock.Builder`:

```java
lock = new Lock.Builder()
        /** Other configuration goes here */
        .withIdentityProvider(Strategies.Facebook, new FacebookIdentityProvider(this))
        .build();
```

#### Google+

To support Google+ native authentication you need to add the following permissions and meta-data to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="android.permission.USE_CREDENTIALS" />
<meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version" />
```

Finally, you need to register the Auth0 Google+ Identity Provider with Lock. This can be done when building `Lock` with `Lock.Builder`:

```java
lock = new Lock.Builder()
        /** Other configuration goes here */
        .withIdentityProvider(Strategies.GooglePlus, new GooglePlusIdentityProvider(this))
        .build();
```

### 4. Let's implement the login

Now we're ready to implement the Login.

We can show the Login Dialog by starting the activity `LockActivity`.

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/android/Lock-Widget-Android-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but if you want, you can use your own UI.
> Or you can also try our passwordless Login Widget [SMS](https://github.com/auth0/Lock.Android#sms)

Once the user logs in, we have to register to the `Lock.AUTHENTICATION_ACTION` from a `LocalBroadcastManager` to receive the user profile and tokens.

```java
broadcastManager = LocalBroadcastManager.getInstance(this);
broadcastManager.registerReceiver(new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            UserProfile profile = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_PROFILE_PARAMETER);
            Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
            //Your code to handle login information.
        }
    }, new IntentFilter(Lock.AUTHENTICATION_ACTION));
```

### 5. Showing user information

After the user has logged in, we can use the `UserProfile` object to display the user's information.

```java
  TextView usernameTextView = //find your TextView
  TextView emailTextView = //find your TextView
  usernameTextView.setText(profile.getName());
  emailTextView.setText(profile.getEmail());
```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile or you can check [UserProfile](https://github.com/auth0/Lock.Android/blob/master/android-core/src/main/java/com/auth0/core/UserProfile.java). Please note that some of these depend on the social provider being used.

### 6. We're done

You've implemented Login and Signup with Auth0 in Android. You're awesome!
