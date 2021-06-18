---
title: Login
default: true
description: This tutorial demonstrates how to add user login to an Ionic application using Auth0.
budicon: 448
topics:
  - quickstarts
  - native
  - ionic
  - react
  - capacitor
github:
  path: 01-Login
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Ionic' }) %>

### Add a Platform

If you have not already done so, use the CLI and Capacitor to add a supported mobile platform to your app. Use the following commands to add your desired platform(s) (e.g., `ios` or `android`):

```bash
# Add iOS
npx cap add ios

# Add Android
npx cap add android
```

:::note
For more information on adding Capacitor platforms to your app and the development workflow, check out the [getting started docs](https://capacitorjs.com/docs/v2/getting-started) as well as the starter docs for [iOS](https://capacitorjs.com/docs/v2/ios) and [Android](https://capacitorjs.com/docs/v2/android).
:::

<%= include('../../../_includes/_callback_url') %>

The **Callback URL** to be used for your application includes your app's package ID which is found in the `config.xml` file for your app.

Go to the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) section in your Auth0 dashboard and set your **Callback URL** in the **Allowed Callback URLs** box.

You should set the **Allowed Callback URL** to

```bash
# replace YOUR_PACKAGE_ID with your app package ID
YOUR_PACKAGE_ID://${account.namespace}/cordova/YOUR_PACKAGE_ID/callback
```

Replace `YOUR_PACKAGE_ID` with your application's package name.

<%= include('../../../_includes/_logout_url') %>

You should set the **Allowed Logout URLs** to

```bash
# replace YOUR_PACKAGE_ID with your app package ID
YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback
```

Replace `YOUR_PACKAGE_ID` with your application's package name.

To be able to make requests from your application to Auth0, set the following origins in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).

```bash
http://localhost, ionic://localhost, http://localhost:8100, capacitor://localhost
```

the origins `http://localhost` and `ionic://localhost` are needed for Android and iOS respectively, and `http://localhost:8100` is needed you're running your application with `livereaload` option.

Lastly, be sure that the **Application Type** for your application is set to **Native** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).

<%= include('../../_includes/_auth0-react-install.md') %>

### Install Capacitor plugins

This quickstart and sample make use of some of Capacitor's official plugins. Install these into your app using the following command:

```bash
npm i @capacitor/browser @capacitor/app
```

### Configure the `Auth0Provider` component

Under the hood, the Auth0 React SDK uses [React Context](https://reactjs.org/docs/context.html) to manage the authentication state of your users. One way to integrate Auth0 with your React app is to wrap your root component with an `Auth0Provider` that you can import from the SDK.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="${account.namespace}"
    clientId="${account.clientId}"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
    useRefreshTokens={true}
    skipRedirectCallback={true}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
```

The `Auth0Provider` component takes the following props:

- `domain` and `clientId`: The values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.

<%= include('../../spa/_includes/_auth_note_custom_domains') %>

- `redirectUri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.
- `skipRedirectCallback`: Prevents the SDK from trying to handle callback URLs on app start, as they need to be handled differently in the context of a Capacitor app, by supplying the URL that comes from the `appUrlOpen` event
- `useRefreshTokens`: The React SDK will use refresh tokens over relying on session cookies, which can be blocked in many modern browsers. Please read [Refresh Token Rotation](https://auth0.com/docs/tokens/refresh-tokens/refresh-token-rotation) for more information on using refresh tokens with public clients.
- `cacheLocation`: The location at which to store tokens. We use `localstorage` here so that tokens are persisted across app refreshes.

:::note
Local Storage should be considered **transient** in a Capacitor app, as the operating system may recover disk space from local storage if it is running low.

[some blurb here about the SPA SDK extensible cache, when it's ready]
:::

`Auth0Provider` stores the authentication state of your users and the state of the SDK &mdash; whether Auth0 is ready to use or not. It also exposes helper methods to log in and log out your users, which you can access using the `useAuth0()` hook.

## Add Login to Your Application

The Auth0 React SDK gives you tools to quickly implement user authentication in your React application. If you have used this SDK before, you might be familiar with the `loginWithRedirect` function that redirects your SPA to the Auth0 Universal Login Page so that your users can authenticate, before returning to your app.

This is done internally by setting `window.location.href` to the correct URL. In a Capacitor application, we would instead prefer to use Capacitor's Browser plugin to perform this redirect. Thus we can use the `buildAuthorizeUrl` function to get the URL to redirect the user.

```js
import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/react";

const LoginButton: React.FC = () => {
  const { buildAuthorizeUrl } = useAuth0();

  const login = async () => {
    // Ask auth0-react to build the login URL
    const url = await buildAuthorizeUrl();

    // Redirect using Capacitor's Browser plugin
    await Browser.open({ url });
  };

  return <IonButton onClick={login}>Log in</IonButton>;
};

export default LoginButton;
```

<%= include('../../_includes/_auth0-react-classes-info.md') %>

### Handling the callback

Once a user has logged in using the Universal Login Page, they will be redirected back to your app using a URL with a custom URL scheme. The `appUrlOpen` event must be handled within your app, where `handleRedirectCallback` can be called to initialize the authentication state within the SDK.

Add a handler to your `App` component that looks like the following:

```js
const { handleRedirectCallback } = useAuth0();

useEffect(() => {
  CapApp.addListener("appUrlOpen", async ({ url }) => {
      if (
        url.includes("state") &&
        (url.includes("code") || url.includes("error"))
      ) {
        await handleRedirectCallback(url);
      }

      await Browser.close();
  });
}, [handleRedirectCallback]);
```

:::panel Checkpoint
Add the `LoginButton` component to your application. When you click it, verify that your Ionic application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects you back to your application.
:::

## Add Logout to Your Application

Now that you can log in to your React application, you need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). You can create a logout button using the `logout()` method from the `useAuth0()` hook. Executing `logout()` redirects your users to your [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (`https://YOUR_DOMAIN/v2/logout`) and then immediately redirects them to your application.

Similar to `buildAuthorizeUrl`, there is an equivalent method `buildLogouturl` that you can use to plug into Capacitor's `Browser.open` method, ensuring that the correct system browser is used.

To clear your login session locally, you can pass a parameter to `logout` that will clear the SDK's state but not perform the redirect to the logout endpoint, leaving you to handle that with Capacitor's Browser plugin.

Create a new file `LogoutButton.tsx` and add the following code to the file. Then, add the `LogoutButton` component to your app.

```js
import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/react";

// This should reflect the URL added earlier to your "Allowed Logout URLs" setting
// in the Auth0 dashboard.
const callbackUri = "YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback";

const LogoutButton: React.FC = () => {
  const { buildLogoutUrl, logout } = useAuth0();

  const doLogout = async () => {
    // Open the browser to perform a logout
    await Browser.open({ url: buildLogoutUrl({ returnTo: callbackUri }) });

    // Ask the SDK to log out locally, but not do the redirect
    logout({ localOnly: true });
  };

  return <IonButton onClick={doLogout}>Log out</IonButton>;
};

export default LogoutButton;
```

:::panel Checkpoint
Add the `LogoutButton` component to your application. When you click it, verify that your Ionic application redirects you the address you specified as one of the "Allowed Logout URLs" in the "Settings" and that you are no longer logged in to your application.
:::

## Show User Profile Information

The Auth0 React SDK helps you retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user` property exposed by the `useAuth0()` hook. Take this `Profile` component as an example of how to use it:

```js
import { useAuth0 } from "@auth0/auth0-react";

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // If the SDK is not ready, or a user is not authenticated, exit.
  if (isLoading || !isAuthenticated) return null;

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
```

The `user` property contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. To prevent any render errors, use the `isAuthenticated` property from `useAuth0()` to check if Auth0 has authenticated the user before React renders any component that consumes the `user` property. Ensure that the SDK has completed loading before accessing the `isAuthenticated` property, by checking that `isLoading` is `false`.

:::panel Checkpoint
Add the `Profile` component to your application, and verify that you can display the `user.name` or [any other `user` property](https://auth0.com/docs/users/references/user-profile-structure#user-profile-attributes) within a component correctly after you have logged in.
::: 