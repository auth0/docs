---
title: Login
description: This tutorial demonstrates how to add user login to an Expo application using Auth0.
budicon: 448
topics:
  - quickstarts
  - native
  - react-native
  - expo
github:
  path: 00-Login-Expo
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD012 MD041 -->
This Quickstart is for the Expo framework. To integrate Auth0 into your React Native application, please refer to the [React Native Quickstart](https://auth0.com/docs/quickstart/native/react-native/interactive)

::: warning
This SDK is not compatible with "Expo Go" app. It is compatible only with Custom Dev Client and EAS builds
:::

<%= include('../_includes/_getting_started', { library: 'Expo'}) %>

## Install Dependencies

How to install the React Native Auth0 module.

::: note
Please refer to the [official documentation](https://docs.expo.dev/) for additional details on Expo.
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

The first step in adding authentication to your application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the hosted [login page](/hosted-pages/login).

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Universal Login"></div>

## Integrate Auth0 in Your Application

### Setup Auth0 Config Plugin

The Auth0 package runs custom native code that needs to be configured at build time. We will use [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/) to achieve this.

Add the `react-native-auth0` plugin to the [Expo config](https://docs.expo.dev/workflow/configuration/) file at `app.json` or `app.config.js`.

```json
{
  "expo": {
    ...
    "plugins": [
      [
        "react-native-auth0",
        {
          "domain": "${account.namespace}"
        }
      ]
    ]
  }
}
```

### Generate native source code

You must generate the native code for the above configuration to be set. To do this, run the following command:

```bash
expo prebuild
```

You will be prompted to provide the [Android package](https://github.com/expo/fyi/blob/main/android-package.md) and [iOS bundle identifier](https://github.com/expo/fyi/blob/main/bundle-identifier.md) if they are not already present in the Expo config:

```bash
? What would you like your Android package name to be? > com.auth0samples # or your desired package name

? What would you like your iOS bundle identifier to be? > com.auth0samples # or your desired bundle identifier
```

These values are found in the Expo config file at `app.json` or `app.config.js`. It will be used in the callback and logout URLs:

```json
{
    ...
    "android": {
      "package": "YOUR_ANDROID_PACKAGE_NAME_IS_FOUND_HERE"
    },
    "ios": {
      "bundleIdentifier": "YOUR_IOS_BUNDLE_IDENTIFIER_IS_FOUND_HERE"
    }
  }
}
```

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

First, import the `useAuth0` hook and the `Auth0Provider` component from the `react-native-auth0` package.

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

To log the user out, redirect them to the Auth0 log out endpoint by importing and calling the `clearSession` method from the `useAuth0` hook. This will remove their session from the authorization server.

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

The `useAuth0` hook exposes a `user` object that contains information about the authenticated user. You can use this to access user profile information about the authenticated user that has been decoded from the [ID token](https://auth0.com/docs/secure/tokens/id-tokens).

If a user has not been authenticated, this property will be `null`.

```js
const Profile = () => {
    const {user, error} = useAuth0();

    return (
        <>
            {user && <Text>Logged in as {user.name}</Text>}
            {!user && <Text>Not logged in</Text>}
            {error && <Text>{error.message}</Text>}
        </>
    )
}
```

:::panel Checkpoint
Add a component to your app that uses the `user` prop to display information about the user on the screen.
:::