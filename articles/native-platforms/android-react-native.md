---
title: Android React Native Tutorial
name: Android - React Native
alias:
  - reactnative
  - react native
language:
  - Javascript
framework:
  - React Native
hybrid: true
image: /media/platforms/react.png
tags:
  - quickstart
snippets:
  dependencies: native-platforms/android-reactnative/dependencies
  setup: native-platforms/android-reactnative/setup
  use: native-platforms/android-reactnative/use
---

## Android React Native Tutorial

<%= include('../_includes/package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'Android/basic-sample-reactnative',
  pkgFilePath: 'iOS/basic-sample-reactnative/iOS/Info.plist' + account.clientParam,
  pkgType: 'replace'
}) %>

**Otherwise, if you already have an existing React Native application, please follow the steps below.**

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

### 1. Adding the Lock to your project

Add the following dependency to the `build.gradle` of the android project:

${snippet(meta.snippets.dependencies)}

Then check in `AndroidManifest.xml` that the application requests the `android.permission.INTERNET` permission. If not already there, add it inside the `<manifest>` tag:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Next you must add the following entries inside the `<application>` tag of the same file:

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
<!--Auth0 Lock Passwordless-->
<activity
  android:name="com.auth0.lock.passwordless.LockPasswordlessActivity"
  android:theme="@style/Lock.Theme"
  android:screenOrientation="portrait"
  android:launchMode="singleTask"/>
<activity 
  android:name="com.auth0.lock.passwordless.CountryCodeActivity" 
  android:theme="@style/Lock.Theme"/>
<!--Auth0 Lock Passwordless End-->
```

Finally you must add the `LockReactPackage` to the `ReactInstanceManager`. This is done in the `onCreate` method of the `MainActivity`.

```java
public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
    ...
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ...
        mReactInstanceManager = ReactInstanceManager.builder()
                /* ... */
                .addPackage(new LockReactPackage())
                /* ... */
                .build();
        ...
    }
    ...
}
```

If you need Facebook or Google+ native authentication please continue reading to learn how to configure them. Otherwise please go directly to the __step #3__


### 2. Register Native Authentication Handlers

To allow native logins using other Android apps, e.g: Google+, Facebook, etc, you need to explicitly add them by calling `addIdentityProvider` in your `LockReactPackage` instance before adding it to the `ReactInstanceManager`.

```java
public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
    ...
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ...
        LockReactPackage lockReactPackage = new LockReactPackage();

        /* If you would like to add native integrations, add them here */
        lockReactPackage.addIdentityProvider(Strategies.Facebook, new FacebookIdentityProvider(this));
        lockReactPackage.addIdentityProvider(Strategies.GooglePlus, new GooglePlusIdentityProvider(this));

        mReactInstanceManager = ReactInstanceManager.builder()
                /* ... */
                .addPackage(lockReactPackage)
                /* ... */
                .build();
        ...
    }
    ...
}
```

Each native integration requires it's own configuration. If you added some of them please follow the corresponding instructions.


#### Facebook

Lock uses the native Facebook SDK to obtain the user's access token so you'll need to configure it using your Facebook App info. If you don't have one, please create a Facebook Application in [Facebook Dev Site](https://developers.facebook.com/apps). Remember to register the package name and hash of your android application. 

Once you have your Facebook App, you need to enable and configure the connection in Facebook's Connection settings on your Auth0 account. You need to set up your FB app id and secret.

Then add Lock Facebook's dependency to your `build.gradle`

```gradle
compile 'com.auth0.android:lock-facebook:2.3.+'
```

Finally in your project's `AndroidManifest.xml` add the following entries inside the `<application>` tag:

```xml
<activity android:name="com.facebook.FacebookActivity"
          android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
          android:theme="@android:style/Theme.Translucent.NoTitleBar"
          android:label="@string/app_name" />
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
```

The value `@string/facebook_app_id` is your Facebook Application ID that you can get from [Facebook Dev Site](https://developers.facebook.com/apps) after you create your Facebook Application. You could just add this value to your `strings.xml` like this:

```xml
<string name="facebook_app_id">YOUR_FB_APP_ID_GOES_HERE</string>
```

> For more information on how to configure this, please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/android/getting-started).


#### Google+

First you'll need to register your application in Google+, to do it follow the instructions in Step 1 of this [guide](https://developers.google.com/+/mobile/android/getting-started). 

You also need to enable the connection in your Auth0 dashboard.

Then add Lock GooglePlus' dependency to your `build.gradle`

```gradle
compile 'com.auth0.android:lock-googleplus:2.3.+'
```

Finally in your project's `AndroidManifest.xml` add the following entries:

```xml
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="android.permission.USE_CREDENTIALS" />
<meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version" />
```


### 3. Let's implement the login

Now we're ready to implement the Login. First we need to require react-native-lock-android:

${snippet(meta.snippets.setup)}

Then we can show **Lock**:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/android-reactnative/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but you can try our passwordless Login Widgets: [SMS](https://github.com/auth0/react-native-lock-android#sms-passwordless) or [Email](https://github.com/auth0/react-native-lock-android#email-passwordless)

On successful authentication, the callback function will yield the user's profile and tokens inside the parameters `profile` and `token` respectively.

### 4. Showing user information

After the user has logged in, we can use the `profile` object which has all the user information (Let's assume the profile is stored in a component's state object):

```jsx
  <Text>Welcome {this.state.profile.name}</Text>
  <Text>Your email is: {this.state.profile.email}</Text>
```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 5. We're done

You've implemented Authentication with Auth0 in Android & React Native. You're awesome!
