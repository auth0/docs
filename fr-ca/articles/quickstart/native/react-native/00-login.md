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

First, you must provide a way for your users to log in. We recommend using the Auth0 hosted [login page](/hosted-pages/login).

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Universal Login"></div>

## Integrate Auth0 in Your Application

### Configure Android

Open your app's `build.gradle` file (typically at `android/app/build.gradle`) and add the following manifest placeholders. The value for `auth0Domain` should contain your Auth0 application settings [as configured above](#get-your-application-keys).

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

Note this value as you'll be using it to define the callback URLs below. If desired, you can change it using XCode in the following way:

- Open the `ios/<YOUR PROJECT>.xcodeproj` file or run `xed ios` on a Terminal from the app root.
- Open your project's or desired target's Build Settings tab and find the section that contains "Bundle Identifier".
- Replace the "Bundle Identifier" value with your desired application's bundle identifier name.

For additional information please read [react native docs](https://facebook.github.io/react-native/docs/linking).


### Configure Callback and Logout URLs

The callback and logout URLs are the URLs that Auth0 invokes to redirect back to your application. Auth0 invokes the callback URL after authenticating the user, and the logout URL after removing the session cookie.

If the callback and logout URLs are not set, users will be unable to log in and out of the application and will get an error.

Go to the settings page of your [Auth0 application](${manage_url}/#/applications/${account.clientId}/settings) and add the corresponding URL to **Allowed Callback URLs** and **Allowed Logout URLs**, according to the platform of your application. If you are using a [custom domain](/customize/custom-domains), use the value of your custom domain instead of the Auth0 domain from the settings page.

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
