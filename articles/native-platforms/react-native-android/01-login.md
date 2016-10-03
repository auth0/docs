---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 React Native Android SDK to add authentication and authorization to your mobile app
---

<%= include('../../_includes/_package', {
  pkgRepo: 'Mobile-Samples.React',
  pkgBranch: 'master',
  pkgPath: 'Classic/Lock',
  pkgFilePath: 'Classic/Lock/auth0-credentials.js',
  pkgType: 'replace'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 6.5.0
* react-native-lock 0.4.0
* rnpm 1.9.0
:::

<%= include('../../_includes/_signup') %>

## Install Lock

First you need to run the following command to install **react-native-lock**

```bash
npm install --save react-native-lock
```

Then install [rnpm](https://github.com/rnpm/rnpm)

```bash
npm install rnpm -g
```

After that, link **react-native-lock** with your Android project:

```bash
rnpm link react-native-lock
```

Open the file `android/app/build.gradle` and inside add the following inside the `android {}` section

```gradle
packagingOptions {
    exclude 'META-INF/LICENSE'
    exclude 'META-INF/NOTICE'
}
```

Then check in `AndroidManifest.xml` that the application requests the `android.permission.INTERNET` permission. If not already there, add it inside the `<manifest>` tag:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

And finally, you must add the following entries inside the `<application>` tag of the same file:

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

> If you need Facebook or Google+ native authentication please continue reading to learn how to configure them. Otherwise please go directly to **[Showing User Information](#showing-user-information)**.

## Implement the login

Now we're ready to implement the Login. First we need to require react-native-lock-android:

${snippet(meta.snippets.setup)}

Then we can show **Lock**:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/reactnative-android/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but you can try our passwordless Login Widgets: [SMS](https://github.com/auth0/react-native-lock-android#sms-passwordless) or [Email](https://github.com/auth0/react-native-lock-android#email-passwordless)

On successful authentication, the callback function will yield the user's profile and tokens inside the parameters `profile` and `token` respectively.

## Showing User Information

After the user has logged in, we can use the `profile` object which has all the user information (Let's assume the profile is stored in a component's state object):

```jsx
  <Text>Welcome {this.state.profile.name}</Text>
  <Text>Your email is: {this.state.profile.email}</Text>
```

> You can find all of the available properties for the user's profile [here](/user-profile). Please note that some of these depend on the social provider being used.

### Optional: Facebook & Google Native Login

To allow native logins using other Android apps, e.g: Google+, Facebook, etc, you need to explicitly add them by calling `addIdentityProvider` in your `LockReactPackage` instance before returning in in your `MainActivity` method `getPackages()`.

```java
/**
 * A list of packages used by the app. If the app uses additional views
 * or modules besides the default ones, add more packages here.
 */
@Override
protected List<ReactPackage> getPackages() {
    LockReactPackage lockReactPackage = new LockReactPackage();
    /* If you would like to add native integrations, add them here */
    lockReactPackage.addIdentityProvider(Strategies.Facebook, new FacebookIdentityProvider(this));
    lockReactPackage.addIdentityProvider(Strategies.GooglePlus, new GooglePlusIdentityProvider(this));
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        lockReactPackage
    );
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
