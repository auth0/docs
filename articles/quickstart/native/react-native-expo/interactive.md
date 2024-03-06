---
title: Add Login to your React Native App
description: This quickstart demonstrates how to add user login to an React Native application using Auth0.
seo_alias: react-native
interactive: true
files:
  - files/app-json
  - files/app
github:
  path: 00-Login
topics: 
  - quickstarts 
  - native 
  - react-native
---

# Add Login to Your React Native Application

<!-- markdownlint-disable MD002 MD012 MD041 -->

This Quickstart is for the Expo framework. To integrate Auth0 into your React Native application, please refer to the [React Native Quickstart](https://auth0.com/docs/quickstart/native/react-native/interactive)

::: warning
This SDK is not compatible with "Expo Go" app. It is compatible only with Custom Dev Client and EAS builds.
:::

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure authentication in your project.

### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your Application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your Applications in the future.

If you would rather explore a complete configuration, you can view a sample application instead.

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

## Setup Auth0 Config Plugin {{{ data-action=code data-code="app.json#10:15"}}}

The Auth0 package runs custom native code that must be configured at build time. Use [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/) to achieve this.

The `react-native-auth0` plugin will be added in the [Expo config](https://docs.expo.dev/workflow/configuration/)

## Generate Native Source Code {{{ data-action=code data-code="app.json#31:36"}}}

You must generate the native code for the above configuration to be set. To do this, run the following command:

```bash
expo prebuild
```

You will be prompted to provide the [Android package](https://github.com/expo/fyi/blob/main/android-package.md) and [iOS bundle identifier](https://github.com/expo/fyi/blob/main/bundle-identifier.md) if they are not already present in the Expo config. 

```bash
? What would you like your Android package name to be? > com.auth0samples # or your desired package name

? What would you like your iOS bundle identifier to be? > com.auth0samples # or your desired bundle identifier
```

These values are used to set the callback and logout URLs.

## Configure the Auth0Provider component {{{ data-action=code data-code="App.js#41:43"}}}

The `useAuth0` hook relies on a React Context to provide state management. This context is provided by the `Auth0Provider` component.

Import the `useAuth0` hook and `Auth0Provider` component from the `react-native-auth0` package:

```js
import {useAuth0, Auth0Provider} from 'react-native-auth0';
```

For the SDK to function properly, you must wrap your application in the `Auth0Provider` component, and set the following properties:

- `domain`: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), you should set this to the value of your custom domain instead.
- `clientId`: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.

::::checkpoint
:::checkpoint-default
Your `Auth0Provider` component should now be properly configured. Run your application to verify that:
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

## Add login to your application {{{ data-action=code data-code="App.js#8:14" }}}

Authenticate the user by calling the `authorize` method provided by the `useAuth0` hook. This redirects the user to the Auth0 [Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login) page for authentication, then back to your app.

For confirmation that the user was logged in successfully, check that the `user` property provided by the hook is not `null`.

::::checkpoint
:::checkpoint-default
Add a button component that calls `authorize` when clicked. Verify that you are redirected to the login page and then back to your application.
:::
:::checkpoint-failure
If your application did not launch successfully:

- ensure you set the Allowed Callback URLs are correct
- verify you saved your changes after entering your URLs
- make sure the domain and client ID values are imported correctly
- if using Android, ensure that the manifest placeholders have been set up correctly, otherwise the redirect back to your app may not work

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add logout to your application {{{ data-action=code data-code="App.js#16:22" }}}

To log the user out, redirect them to the Auth0 logout endpoint by calling `clearSession`. This will remove their session from the authorization server and log the user out of the application.

::::checkpoint
:::checkpoint-default
Add a logout button that calls `clearSession` and observe that you are redirected to the Auth0 logout endpoint and back again. You should no longer be logged in to your application.
:::
:::checkpoint-failure
If your application did not log out successfully:

- ensure the Allowed Logout URLs are set properly
- verify you saved your changes after entering your URLs

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Show user profile information {{{ data-action=code data-code="App.js#32:34" }}}

The `useAuth0` hook exposes a `user` object that contains information about the authenticated user. You can use this to access user profile information about the authenticated user that has been decoded from the [ID token](https://auth0.com/docs/secure/tokens/id-tokens).

If a user has not been authenticated, this property will be `null`.

::::checkpoint
:::checkpoint-default
Log in and inspect the `user` property on the result. Verify the current user's profile information, such as `email` or `name`.
:::
::::
