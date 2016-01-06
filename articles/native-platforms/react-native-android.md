---
title: React Native Android Tutorial
name: React Native - Android
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
  dependencies: native-platforms/reactnative-android/dependencies
  setup: native-platforms/reactnative-android/setup
  use: native-platforms/reactnative-android/use
---

## Android React Native Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'Mobile-Samples.React',
  pkgBranch: 'master',
  pkgPath: 'Classic/Lock',
  pkgFilePath: 'Classic/Lock/auth0_credentials.js' + account.clientParam,
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
</activity>
<!--Auth0 Lock End-->
<!--Auth0 Lock Embedded WebView-->
<activity 
    android:name="com.auth0.identity.web.WebViewActivity" 
    android:theme="@style/Lock.Theme">
</activity>
<!--Auth0 Lock Embedded WebView End-->
<!--Auth0 Lock Passwordless-->
<activity
    android:name="com.auth0.lock.passwordless.LockPasswordlessActivity"
    android:theme="@style/Lock.Theme"
    android:screenOrientation="portrait"
    android:launchMode="singleTask">
</activity>
<activity 
    android:name="com.auth0.lock.passwordless.CountryCodeActivity" 
    android:theme="@style/Lock.Theme">
</activity>
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

> For more information and configuration options you should see the Lock-Facebook.Android [docs](https://github.com/auth0/Lock-Facebook.Android)

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

> For more information and configuration options you should see the Lock-GooglePlus.Android [docs](https://github.com/auth0/Lock-GooglePlus.Android)


### 3. Let's implement the login

Now we're ready to implement the Login. First we need to require react-native-lock-android:

${snippet(meta.snippets.setup)}

Then we can show **Lock**:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/reactnative-android/Lock-Widget-Screenshot.png)](https://auth0.com)

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


### API

#### .show(options, callback)
Show Lock's authentication screen as a modal screen using the connections configured for your applications or the ones specified in the `options` parameter. This is the list of valid options:

* **closable** (`boolean`): If Lock screen can be dismissed. Default is `false`.
* **connections** (`[string]`): List of enabled connections to use for authentication. Must be enabled in your app's dashboard first. If you leave it empty, Lock will use all the enabled connections.
* **useMagicLink** (`boolean`): When using a passwordless connection, activate this option to send a Magic/App link instead of the code. Default is `false`.
* **authParams** (`object`): Object with the parameters to be sent to the Authentication API, e.g. `scope`.

The callback will have the error if anything went wrong or after a successful authentication, it will yield the user's profile info and tokens.

### FAQ

#### Error: duplicate files during packaging of APK

If you observe an error like this when trying to run the project:

```
Error: duplicate files during packaging of APK /<PATH>/android/app/build/outputs/apk/app-debug-unaligned.apk
  Path in archive: META-INF/NOTICE
  Origin 1: /<PATH>/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.core/jackson-databind/2.4.1/f07c773f7b3a03c3801d405cadbdc93f7548e321/jackson-databind-2.4.1.jar
  Origin 2: /<PATH>/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.core/jackson-core/2.4.1/b130bcfb5a9c410c3cbd2e0adec9437e69a39e2c/jackson-core-2.4.1.jar
You can ignore those files in your build.gradle:
  android {
    packagingOptions {
      exclude 'META-INF/NOTICE'
    }
  }
:app:packageDebug FAILED
```

You must follow the advice and ignore the files adding the following to the `build.gradle` of the `app` module, inside the `android` section:

```
packagingOptions {
    exclude 'META-INF/LICENSE'
    exclude 'META-INF/NOTICE'
}
```
