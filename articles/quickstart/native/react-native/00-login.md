---
title: Login
description: This tutorial demonstrates how to add user login to a React Native application using Auth0.
budicon: 448
topics:
  - quickstarts
  - native
  - react-native
github:
  path: 00-Login
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD012 MD041 -->

<%= include('../_includes/_getting_started', { library: 'React Native'}) %>

## Install Dependencies 

How to install the React Native Auth0 module.

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

CocoaPods is the package management tool for iOS that the React Native framework uses to install itself into your project. For the iOS native module to work with your iOS app you must first install the library Pod. If you're familiar with older React Native SDK versions, this is similar to what was called _linking a native module_. The process is now simplified:

Change directory into the `ios` folder and run `pod install`.

```bash
cd ios
pod install
```

The first step in adding authentication to your application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the hosted [login page](/hosted-pages/login).

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Universal Login"></div>

## Integrate Auth0 in Your Application

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

Next you will need to add a URLScheme using your App's bundle identifier.

Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`

```xml
<key>CFBundleIdentifier</key>
<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
```

then below register a URL type entry using the value of `CFBundleIdentifier` as the value for the `CFBundleURLSchemes`

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

Take note of this value as you'll be using it to define the callback URLs below. If desired, you can change it using XCode in the following way:

- Open the `ios/<YOUR PROJECT>.xcodeproj` file or run `xed ios` on a Terminal from the app root.
- Open your project's or desired target's Build Settings tab and find the section that contains "Bundle Identifier".
- Replace the "Bundle Identifier" value with your desired application's bundle identifier name.

For additional information please read [react native docs](https://facebook.github.io/react-native/docs/linking.html).


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


### Add authentication with Auth0

[Universal login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed login functionality directly in your application. If you use this method, some features, such as single sign-on, will not be accessible. 
To learn how to embed functionality using a custom login form in your application, follow the [Custom Login Form Sample](https://github.com/auth0-samples/auth0-react-native-sample/tree/Embedded/01-Custom-Form). Make sure you read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

First, import the `Auth0` module and create a new `Auth0` instance.

```js
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: '${account.namespace}', clientId: '${account.clientId}' });
```

Then present the hosted login screen, like this:

```js
auth0
    .webAuth
    .authorize({scope: 'openid profile email'})
    .then(credentials =>
      // Successfully authenticated
      // Store the accessToken
      this.setState({ accessToken: credentials.accessToken })
    )
    .catch(error => console.log(error));
```

Upon successful authentication the user's `credentials` will be returned, containing an `access_token`, an `id_token` and an `expires_in` value.

::: note
For more information on the `accessToken`, refer to [Access Token](/tokens/concepts/access-tokens).
:::

### Log the user out

To log the user out, redirect them to the Auth0 log out endpoint by calling `clearSession`. This will remove their session from the authorization server. After this happens, remove the Access Token from the state. 

```js
 auth0.webAuth
    .clearSession({})
    .then(success => {
        Alert.alert(
            'Logged out!'
        );
        this.setState({ accessToken: null });
    })
    .catch(error => {
        console.log('Log out cancelled');
    });
```
