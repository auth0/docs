---
title: Add Login to your React Native App
description: This quickstart demonstrates how to add user login to an React Native application using Auth0.
seo_alias: react-native
interactive: true
files:
  - files/app
github:
  path: 00-Login
topics: 
  - quickstarts 
  - native 
  - react-native
---

# Add Login to your React Native App

<!-- markdownlint-disable MD002 MD012 MD041 -->

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure authentication in your project.

### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your Application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your Applications in the future.

If you would rather explore a complete configuration, you can view a sample application instead.

### Configure Callback URLs

A callback URL is the application URL that Auth0 will direct your users to once they have authenticated. If you do not set this value, Auth0 will not return users to your application after they log in.

::: note
If you are following along with our sample project, set this
- for iOS - `{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback`
- for Android - `{YOUR_APP_PACKAGE_NAME}://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback`
:::

### Configure Logout URLs

A logout URL is the application URL Auth0 will redirect your users to once they log out. If you do not set this value, users will not be able to log out from your application and will receive an error.

::: note
If you are following along with our sample project, set this
- for iOS - `{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback`
- for Android - `{YOUR_APP_PACKAGE_NAME}://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback`
:::

## Install dependencies 

In this section, you will learn how to install the React Native Auth0 module.
::: note
Please refer to the [official documentation](https://facebook.github.io/react-native/) for additional details on React Native.
:::

### Yarn

```bash
yarn add react-native-auth0
```

::: note
For further reference on yarn, check [their official documentation](https://yarnpkg.com/en/docs).
:::

### npm

```bash
npm install react-native-auth0 --save
```

### Additional iOS step: install the module Pod

[CocoaPods](https://cocoapods.org/) is the package management tool for iOS. The React Native framework uses CocoaPods to install itself into your project. For the iOS native module to work with your iOS app you must first install the library Pod. If you are familiar with older React Native SDK versions, this is similar to _linking a native module_. The process is now simplified:

Change directory into the `ios` folder and run `pod install`.

```bash
cd ios
pod install
```

## Integrate Auth0 in your application

First, you must provide a way for your users to log in. We recommend useing the Auth0 hosted [login page](/hosted-pages/login).
<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Universal Login"></div>

### Configure Android

Open your app's `build.gradle` file (typically at `android/app/build.gradle`) and add the following manifest placeholders. The value for `auth0Domain` should be populated from your Auth0 application settings [as configured above](#get-your-application-keys).

```groovy
android {
    defaultConfig {
        // Add the next line
        manifestPlaceholders = [auth0Domain: "${account.namespace}", auth0Scheme: "<%= "${applicationId}" %>"]
    }
    ...
}
```

::: note
The `applicationId` value will be auto-replaced at runtime with the package name or ID of your application (e.g. `com.example.app`). You can change this value from the `build.gradle` file. You can also check it at the top of your `AndroidManifest.xml` file.
:::

### Configure iOS

In the file `ios/<YOUR PROJECT>/AppDelegate.m` add the following:

```objc
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return [RCTLinkingManager application:app openURL:url options:options];
}
```

Next, add a URLScheme using your App's bundle identifier.

Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`

```xml
<key>CFBundleIdentifier</key>
<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
```

Update the value for the `CFBundleURLSchemes` with the value `CFBundleIdentifier` to register a URL type entry.

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
            <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
        </array>
    </dict>
</array>
```

::: note
If your application was generated using the React Native CLI, the default value of `$(PRODUCT_BUNDLE_IDENTIFIER)` dynamically matches `org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)`. For the sample app, this value matches `com.auth0samples`.
:::

In a later step, you will use this value to define the callback URLs below. You can change it using XCode with the following steps:

- Open the `ios/<YOUR PROJECT>.xcodeproj` file or run `xed ios` on a Terminal from the app root.
- Open your project's or desired target's Build Settings tab and find the section that contains "Bundle Identifier".
- Replace the "Bundle Identifier" value with your desired application's bundle identifier name.

For additional information please read [react native docs](https://facebook.github.io/react-native/docs/linking).

## Add authentication with Auth0 {{{ data-action=code data-code="app.js#12:22" }}}

[Universal login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed login functionality directly in your application. If you use this method, some features, such as single sign-on, will not be accessible. 
To learn how to embed functionality using a custom login form in your application, follow the [Custom Login Form Sample](https://github.com/auth0-samples/auth0-react-native-sample/tree/Embedded/01-Custom-Form). Make sure you read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

Upon successful authentication, Auth0 returns the user's `credentials`, containing an `access_token`, an `id_token` and an `expires_in` value.

::: note
For more information on the `accessToken`, refer to our [access token documentation](/tokens/concepts/access-tokens).
:::

## Log the user out {{{ data-action=code data-code="app.js#24:34" }}}

To log the user out, redirect them to the Auth0 log out endpoint by calling `clearSession`. This will remove their session from the authorization server. After this happens, remove the access token from the state. 

