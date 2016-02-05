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

<%= include('../_includes/_package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'Android/basic-sample',
  pkgFilePath: 'Android/basic-sample/app/src/main/res/values/auth0.xml' + account.clientParam,
  pkgType: 'replace'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### Prepare your App

<div class="setup-callback">
  <p>Navigate to the <a href="${uiAppSettingsURL}">Settings</a> section for your Application in the Auth0 dashboard and make sure that the <b>Allowed Callback URLs</b> field contains the following value (using your Client ID):</p>
  <pre><code>a0${account.clientId}://\*.auth0.com/authorize</code></pre>
</div>

### 1. Add Auth0 Lock to your Project

Add the following to your `build.gradle` file:

${snippet(meta.snippets.dependencies)}

### 2. Configure Auth0 Credentials & Callbacks

Add the `android.permission.INTERNET` permission to your `AndroidManifest.xml` file, inside the `<manifest>` element:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Next add the following elements, inside the `<application>` element in the same file:

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

Your Android application will need to implement the Application class. If you do not have an existing implementation in your project, create a new class, extending `android.app.Application`. Your Application class name should match the name attribute for the `<application>` element in your `AndroidManifest.xml` file, for example:

```xml
<application android:name=".MyApplication">
```

Make your Application class implement the interface `com.auth0.lock.LockProvider` and add the following content:

${snippet(meta.snippets.setup)}

### 4. Register Native Authentication Handlers

You can configure Lock to use other native Android apps to log the user in (Facebook, Google+, etc.). In order to do so, you'll need to register them with Lock after it's initialized.

*If you don't want to use Facebook nor Google+ native authentication you can skip to the [next step](#5-implement-the-login).*

#### Facebook

Lock uses the native Facebook SDK to obtain the user's access token, so you need to configure it for your app.

First add the following to your `AndroidManifest.xml` file:

```xml
<activity android:name="com.facebook.FacebookActivity"
          android:configChanges=
              "keyboard|keyboardHidden|screenLayout|screenSize|orientation"
          android:theme="@android:style/Theme.Translucent.NoTitleBar"
          android:label="@string/app_name" />
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
```

Where `@string/facebook_app_id` is your Facebook Application ID from the [Facebook Developers App Dashboard](https://developers.facebook.com/apps). 

*For more information on how to configure this, check out the [Facebook Getting Started Guide](https://developers.facebook.com/docs/android/getting-started).*

**Note**: The Facebook app should match the one set in Facebook's Connection settings in your Auth0 account.

Finally, you can register the Auth0 Facebook Identity Provider with Lock. You can do this in your application code when building `Lock`, using `Lock.Builder`:

```java
lock = new Lock.Builder()
        /** Other configuration goes here */
        .withIdentityProvider(Strategies.Facebook, new FacebookIdentityProvider(this))
        .build();
```

#### Google

For Google login we use the Google Play Services library.

You'll need to register your application in the Google Developers console and create an OAuth 2.0 client. The [wizard](https://developers.google.com/mobile/add?platform=android) will guide you through the process.

The next step is to configure your Google connection in the Auth0 Dashboard with the information for your newly created OAuth 2.0 client. Navigate to [Social Connections](${uiURL}/#/connections/social), select **Google** and in the `Allowed Mobile Client IDs` field, add the ID of the OAuth 2.0 client.

Next, add the permissions and meta-data for Google Play Services to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="android.permission.USE_CREDENTIALS" />
<meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version" />
```

Finally, register Google Identity Provider with Lock in your application code as follows:

```java
lock = new LockBuilder()
          .loadFromApplication(this)
          .withIdentityProvider(Strategies.GooglePlus, new GooglePlusIdentityProvider(this))
          .build();
}
```

### 5. Implement the Login

We can show the Login Dialog in the app by starting `LockActivity`:

${snippet(meta.snippets.use)}

**Note**: Your class will need to import `com.auth0.lock.LockActivity`.

[![Lock.png](/media/articles/native-platforms/android/Lock-Widget-Android-Screenshot.png)](https://auth0.com)

**Note**: There are multiple ways to implement the login box. What you see above is the Login Widget, but you can use your own UI if you prefer.

*You can optionally try our Passwordless Login via [SMS](/connections/passwordless/android-sms) or [email](/connections/passwordless/android-email).*

When the user logs in, we need to register the app to receive the `Lock.AUTHENTICATION_ACTION` from a `LocalBroadcastManager`, so that we can retrieve the user profile and tokens:

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

**Note**: Your class will need to import `com.auth0.lock.Lock.AUTHENTICATION_ACTION`.

### 6. Show User Information

After the user is logged in, we can use the `UserProfile` object to display their information:

```java
  TextView usernameTextView = //find your TextView
  TextView emailTextView = //find your TextView
  usernameTextView.setText(profile.getName());
  emailTextView.setText(profile.getEmail());
```

For the available properties see the User Profile [documentation](/user-profile) and [source code](https://github.com/auth0/Lock.Android/blob/master/core/src/main/java/com/auth0/core/UserProfile.java). Please note that some of these depend on the social provider being used.

### 7. Build your App

You've implemented Login and Signup with Auth0 in Android so now you can get on with building your awesome app!
