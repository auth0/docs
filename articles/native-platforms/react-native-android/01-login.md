---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 React Native Android SDK to add authentication and authorization to your mobile app
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'Mobile-Samples.React',
  path: 'Classic/Lock',
  requirements: [
    'NodeJS 6.5.0',
    'react-native-lock 0.4.0',
    'rnpm 1.9.0'
  ]
}) %>

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
