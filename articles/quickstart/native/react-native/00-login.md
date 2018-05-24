---
title: Login
description: This tutorial demonstrates how to add user login to a React Native application using Auth0.
budicon: 448
github:
  path: 00-Login
---
<%= include('../_includes/_getting_started', { library: 'React Native') %>

<%= include('../../../_includes/_callback_url') %>

#### iOS Callback

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

Remember to replace `PRODUCT_BUNDLE_IDENTIFIER` with your actual application's bundle identifier name.

Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`. In the sample project the value is:

```xml
<key>CFBundleIdentifier</key>
<string>auth0.samples.Auth0Sample</string>
```

#### Android Callback

```text
{YOUR_APP_PACKAGE_NAME}://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Remember to replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name.

You can find this at the top of your `AndroidManifest.xml` file located in the `android/app/src/main/` folder. In the sample project the value is:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.auth0sample"
```

## Install Dependencies 

How to install the React Native Auth0 module.

### npm

```bash
npm install react-native-auth0 --save
```

::: note
For more information about npm usage, check [their official documentation](https://docs.npmjs.com/).
:::

### yarn

```bash
yarn add --dev react-native-auth0
```

::: note
For further reference on yarn, check [their official documentation](https://yarnpkg.com/en/package/jest).
:::

### Link the native module

To add the functionality of the React Native Auth0 module to your project you need to link it.

```bash
react-native link react-native-auth0
```

::: note
For further reference on linking libraries, check [the official documentation](https://facebook.github.io/react-native/docs/linking-libraries-ios.html).
:::

The first step in adding authentication to your application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the hosted [login page](/hosted-pages/login).

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_centralized_login.png" alt="Login Page"></div>

## Integrate Auth0 in your Application 

### Configure Android

In the file `android/app/src/main/AndroidManifest.xml` you must make sure the **MainActivity** of the app has a **launchMode** value of `singleTask` and that it has the following intent filter:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:host="${account.namespace}"
        android:pathPrefix="/android/<%= "${applicationId}" %>/callback"
        android:scheme="<%= "${applicationId}" %>" />
</intent-filter>
```

So your **MainActivity** should look like this:

```xml
<activity
android:name=".MainActivity"
android:label="@string/app_name"
android:launchMode="singleTask"
android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
android:windowSoftInputMode="adjustResize">
<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:host="${account.namespace}"
        android:pathPrefix="/android/<%= "${applicationId}" %>/callback"
        android:scheme="<%= "${applicationId}" %>" />
</intent-filter>
</activity>
```

### Configure iOS

In the file `ios/<YOUR PROJECT>/AppDelegate.m` add the following:

```objc
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
```

Next you will need to add a URLScheme using your App's bundle identifier.

Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`

```xml
<key>CFBundleIdentifier</key>
<string>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</string>
```

and then register a URL type entry using the value of `CFBundleIdentifier` as the value for the `CFBundleURLSchemes`

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</string>
        </array>
    </dict>
</array>
```

::: note
The value org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier) is the default for apps created with React Native CLI, you may have a different value.
:::

## Add Authentication with Auth0

[Universal login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed login functionality directly in your application. If you use this method, some features, such as single sign-on, will not be accessible. 
To learn how to embed functionality using a custom login form in your application, follow the [Custom Login Form Sample](https://github.com/auth0-samples/auth0-react-native-sample/tree/Embedded/01-Custom-Form). Make sure you read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

First, import the `Auth0` module and create a new `Auth0` instance.

${snippet(meta.snippets.setup)}

Then present the hosted login screen, like this:

${snippet(meta.snippets.use)}

Upon successful authentication the user's `credentials` will be returned, containing an `access_token`, an `id_token` and an `expires_in` value.

::: note
For more information on the `accessToken`, refer to [Access Token](/tokens/access-token).
:::
