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

# Add Login to Your React Native Application

<!-- markdownlint-disable MD002 MD012 MD025 MD041 -->

This Quickstart is for the React Native framework. To integrate Auth0 into your Expo application, please refer to the [Expo Quickstart](https://auth0.com/docs/quickstart/native/react-native-expo/interactive)

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you must have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure authentication in your project.

### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your Application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your Applications in the future.

To explore a complete configuration, review the sample application in your Dashboard.

### Configure callback and logout URLs

Auth0 invokes the callback and logout URLs to redirect users back to your application. Auth0 invokes the callback URL after authenticating the user and the logout URL after removing the session cookie. If you do not set the callback and logout URLs, users will not be able to log in and out of the app, and your application will produce an error.

Add the corresponding URL to **Callback URLs** and **Logout URLs**, according to your app's platform. If you are using a [custom domain](/customize/custom-domains), use the value of your custom domain instead of your Auth0 tenant’s domain.

#### iOS
```text
BUNDLE_IDENTIFIER.auth0://${account.namespace}/ios/BUNDLE_IDENTIFIER/callback
```

#### Android
```text
PACKAGE_NAME.auth0://${account.namespace}/android/PACKAGE_NAME/callback
```

::: note
If you are following along with our sample project, set this
- for iOS - `com.auth0samples.auth0://${account.namespace}/ios/com.auth0samples/callback`
- for Android - `com.auth0samples.auth0://${account.namespace}/android/com.auth0samples/callback`
:::

## Install dependencies 

In this section, you will install the React Native Auth0 module.

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

Our SDK requires a minimum iOS deployment target of 13.0. In your project's `ios/Podfile``, ensure your platform target is set to 13.0.

```
platform :ios '13.0'
```

CocoaPods is the iOS package management tool the React Native framework uses to install itself into your project. For the iOS native module to work with your iOS app, first install the library Pod. If you're familiar with older React Native SDK versions, this is similar to the previous _linking a native module_. The process is now simplified:

Change directory into the `ios` folder and run `pod install`.

```bash
cd ios
pod install
```

## Integrate Auth0 in your application

First, you must provide a way for your users to log in. We recommend using the Auth0 hosted [login page](/hosted-pages/login).
<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Universal Login"></div>

### Configure Android

Open the `build.gradle` file in your application directory (typically at `android/app/build.gradle`) and add the following manifest placeholders. The value for `auth0Domain` should contain your Auth0 application settings [as configured above](#get-your-application-keys).

```groovy
android {
    defaultConfig {
        // Add the next line
        manifestPlaceholders = [auth0Domain: "${account.namespace}", auth0Scheme: "<%= "${applicationId}.auth0" %>"]
    }
    ...
}
```

::: note
At runtime, the `applicationId` value will automatically update with your application's package name or ID (e.g. `com.example.app`). You can change this value from the `build.gradle` file. You can also check it at the top of your `AndroidManifest.xml` file.
:::

### Configure iOS

In the file `ios/<YOUR PROJECT>/AppDelegate.mm` add the following:

```objc
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return [RCTLinkingManager application:app openURL:url options:options];
}
```

::: note
This file will be `ios/<YOUR PROJECT>/AppDelegate.m` on applications using the [old architecture](https://reactnative.dev/docs/next/new-architecture-app-intro#ios---use-objective-c-mm-extension).
:::

Next, add a URLScheme using your App's bundle identifier.

In the `ios` folder, open the `Info.plist` and locate the value for `CFBundleIdentifier`

```xml
<key>CFBundleIdentifier</key>
<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
```

Below this value, register a URL type entry using the value of `CFBundleIdentifier` as the value for the `CFBundleURLSchemes`.

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
            <string>$(PRODUCT_BUNDLE_IDENTIFIER).auth0</string>
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

## Configure the Auth0Provider component {{{ data-action=code data-code="app.js#41:43"}}}

The `useAuth0` hook relies on a React Context to provide state management. The `Auth0Provider` component provides this context.

Import the `useAuth0` hook and `Auth0Provider` component from the `react-native-auth0` package:

```js
import {useAuth0, Auth0Provider} from 'react-native-auth0';
```

For the SDK to function correctly, wrap your application in the `Auth0Provider` component and set the following properties:

- `domain`: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), you should set this to the value of your custom domain instead.
- `clientId`: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.

::::checkpoint
:::checkpoint-default
You just configured the `Auth0Provider` component. Run your application to verify that:
- the SDK is initializing correctly
- your application is not throwing any errors related to Auth0
:::
:::checkpoint-failure
If your application did not launch successfully:
- make sure the correct application is selected
- did you save after entering your URLs?
- ensure your domain and client ID values are correct
Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::
## Add login to your application {{{ data-action=code data-code="app.js#8:14" }}}

Authenticate the user by calling the `authorize` method provided by the `useAuth0` hook. This method redirects the user to the Auth0 [Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login) page for authentication, then back to your app.

To confirm the user successfully logged in, check that the `user` property provided by the hook is not `null`.

::::checkpoint
:::checkpoint-default
Add a button component that calls `authorize` when clicked. Verify that you are redirected to the login page and then back to your application.
:::
:::checkpoint-failure
If your application did not launch successfully:

- Ensure you set the Allowed Callback URLs are correct
- Verify you saved your changes after entering your URLs
- Make sure the domain and client ID values are imported correctly
- If using Android, ensure you set up the manifest placeholders correctly, otherwise the redirect back to your app may not work

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add logout to your application {{{ data-action=code data-code="app.js#16:22" }}}

To log the user out, redirect them to the Auth0 log out endpoint by calling `clearSession`. This will remove their session from the authorization server and log the user out of the application.

::::checkpoint
:::checkpoint-default
Add a button that calls `clearSession` and observe that you are redirected to the Auth0 logout endpoint and back again. You should no longer be logged in to your application.
:::
:::checkpoint-failure
If your application did not log out successfully:

- Ensure the Allowed Logout URLs are set properly
- Verify you saved your changes after entering your URLs

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Show user profile information {{{ data-action=code data-code="app.js#32:34" }}}

The `useAuth0` hook exposes a `user` object that contains information about the authenticated user. You can use this to access decoded user profile information about the authenticated user from the [ID token](https://auth0.com/docs/secure/tokens/id-tokens).

If a user has not been authenticated, this property will be `null`.

::::checkpoint
:::checkpoint-default
Log in and inspect the `user` property on the result. Verify the current user's profile information, such as `email` or `name`.
:::
::::
