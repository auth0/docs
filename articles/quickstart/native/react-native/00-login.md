---
title: Login
description: This tutorial demonstrates how to add user login to a React Native application using Auth0.
budicon: 448
topics:
  - quickstarts
  - native
  - react-native
github:
  path: 00-Login-Hooks
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD012 MD041 -->

::: note
Exciting news! We have just released React Native Auth0 v3 BETA, packed with powerful features and improvements. [Check out the latest Quickstart for more details](https://auth0.com/docs/quickstart/native/react-native-beta/00-login)
:::

This Quickstart is for the React Native framework. To integrate Auth0 into your Expo application, please refer to the [Expo Quickstart](https://auth0.com/docs/quickstart/native/react-native-expo/interactive)

<%= include('../_includes/_getting_started', { library: 'React Native'}) %>

## Install Dependencies

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

CocoaPods is the iOS package management tool the React Native framework uses to install itself into your project. For the iOS native module to work with your iOS app, first install the library Pod. If you're familiar with older React Native SDK versions, this is similar to the previous _linking a native module_. The process is now simplified:

Change directory into the `ios` folder and run `pod install`.

```bash
cd ios
pod install
```

First, you must provide a way for your users to log in. We recommend using the Auth0 hosted [login page](/hosted-pages/login).

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Universal Login"></div>

## Integrate Auth0 in Your Application

### Configure Android

Open your app's `build.gradle` file (typically at `android/app/build.gradle`) and add the following manifest placeholders. The value for `auth0Domain` should contain your Auth0 application settings [as configured above](#get-your-application-keys).

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
            <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
        </array>
    </dict>
</array>
```

::: note
If your application was generated using the React Native CLI, the default value of `$(PRODUCT_BUNDLE_IDENTIFIER)` dynamically matches `org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)`. For the sample app, this value matches `com.auth0samples`.
:::

Note this value as you'll be using it to define the callback URLs below. If desired, you can change it using XCode in the following way:

- Open the `ios/<YOUR PROJECT>.xcodeproj` file or run `xed ios` on a Terminal from the app root.
- Open your project's or desired target's Build Settings tab and find the section that contains "Bundle Identifier".
- Replace the "Bundle Identifier" value with your desired application's bundle identifier name.

For additional information please read [react native docs](https://facebook.github.io/react-native/docs/linking).

<%= include('../../../_includes/_callback_url') %>

#### iOS callback URL

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

Remember to replace `{PRODUCT_BUNDLE_IDENTIFIER}` with your actual application's bundle identifier name.

#### Android callback URL

```text
{YOUR_APP_PACKAGE_NAME}://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Remember to replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name.

<%= include('../../../_includes/_logout_url') %>

#### iOS logout URL

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

Remember to replace `{PRODUCT_BUNDLE_IDENTIFIER}` with your actual application's bundle identifier name.

#### Android logout URL

```text
{YOUR_APP_PACKAGE_NAME}://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Remember to replace `{YOUR_APP_PACKAGE_NAME}` with your actual application's package name.

## Add login to your app

Import the `useAuth0` hook and the `Auth0Provider` component from the `react-native-auth0` package.

```js
import {useAuth0, Auth0Provider} from 'react-native-auth0';
```

Next, wrap your application in the `Auth0Provider` component, providing your Auth0 domain and Client ID values:

```js
const App = () => {
  return (
    <Auth0Provider domain={"${account.namespace}"} clientId={"${account.clientId}"}>
      {/* your application */}
    </Auth0Provider>
  );
};
```

Finally, present the hosted login screen using the `authorize` method from the `useAuth0` hook. See this usage example showing logging in on a button click:

```js
const LoginButton = () => {
    const {authorize} = useAuth0();

    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log in" />
}
```

:::panel Checkpoint
Add a button component that calls `authorize` when clicked. Verify that you are redirected to the login page and then back to your application.
:::

## Add logout to your app

To log the user out, redirect them to the Auth0 log out endpoint by importing and calling the `clearSession` method from the `useAuth0` hook. This method removes their session from the authorization server.

See this usage example of a button that logs the user out of the app when clicked:

```js
const LogoutButton = () => {
    const {clearSession} = useAuth0();

    const onPress = async () => {
        try {
            await clearSession();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log out" />
}
```

:::panel Checkpoint
Add a button that calls `clearSession` when clicked. Verify that you are logged out of the application when clicked.
:::

## Show user profile information

The `useAuth0` hook exposes a `user` object that contains information about the authenticated user. You can use this to access decoded user profile information about the authenticated user from the [ID token](https://auth0.com/docs/secure/tokens/id-tokens).

If a user has not been authenticated, this property will be `null`.

```js
const Profile = () => {
    const {user} = useAuth0();

    return (
        <>
            {user && <Text>Logged in as {user.name}</Text>}
            {!user && <Text>Not logged in</Text>}
        </>
    )
}
```

:::panel Checkpoint
Add a component to your app that uses the `user` prop to display information about the user on the screen.
:::
