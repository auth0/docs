---
title: Login
default: true
description: This tutorial demonstrates how to add user login with Auth0 to an Ionic React & Capacitor application.
budicon: 448
topics:
  - quickstarts
  - native
  - ionic
  - react
  - capacitor
github:
  path: react
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

<%= include('../_includes/ionic/_article_intro') %>

<%= include('../_includes/_getting_started', { library: 'Ionic' }) %>

<%= include('../_includes/ionic/_configure_urls') %>

<%= include('../../_includes/_auth0-react-install.md') %>

<%= include('../_includes/ionic/_install_plugins') %>

### Configure the `Auth0Provider` component

Under the hood, the Auth0 React SDK uses [React Context](https://reactjs.org/docs/context.html) to manage the authentication state of your users. One way to integrate Auth0 with your React app is to wrap your root component with an `Auth0Provider` that you can import from the SDK.

Open `src/index.tsx` and wrap the `App` component in the `Auth0Provider` component.

```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="${account.namespace}"
    clientId="${account.clientId}"
    useRefreshTokens={true}
    useRefreshTokensFallback={false}
    authorizationParams={{
      redirect_uri: "YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback"
    }}
  >
    <App />
  </Auth0Provider>
);
```

The `Auth0Provider` component takes the following props:

- `domain`: The "domain" value present under the "Settings" of the application you created in your Auth0 dashboard, or your custom domain if using Auth0's [Custom Domains feature](http://localhost:3000/docs/custom-domains)
- `clientId`: The "client ID" value present under the "Settings" of the application you created in your Auth0 dashboard
- `useRefreshTokens`: To use auth0-react with Ionic on Android and iOS, it's required to enable refresh tokens.
- `useRefreshTokensFallback`: To use auth0-react with Ionic on Android and iOS, it's required to disable the iframe fallback.
- `authorizationParams.redirect_uri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

<%= include('../_includes/ionic/_note_storage') %>

:::panel Checkpoint
Now that you have configured `Auth0Provider`, run your application to verify that the SDK is initializing correctly, and your application is not throwing any errors related to Auth0.
:::

## Add Login to Your Application

<%= include('../_includes/ionic/_add_login_intro') %>

Add a new file `LoginButton.tsx` with the following code:

```js
import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton } from '@ionic/react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
         // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self"
        });
      }
    });
  };

  return <IonButton onClick={login}>Log in</IonButton>;
};

export default LoginButton;
```

This component:

- defines a template with a simple button that logs the user in when clicked
- uses `loginWithRedirect` to login using Auth0's Universal Login page
- uses the `openUrl` callback to use Capacitor's Browser plugin to open the URL and show the login page to the user

<%= include('../../_includes/_auth0-react-classes-info.md') %>

### Handling the callback

<%= include('../_includes/ionic/_handle_callback_intro') %>

Add the following `useEffect` hook to your main `App` component:

```js
// Import Capacitor's app and browser plugins, giving us access to `addListener` and `appUrlOpen`,
// as well as the bits needed for Auth0 and React
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// ...

const App: React.FC = () => {
  // Get the callback handler from the Auth0 React hook
  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  }, [handleRedirectCallback]);

  // ..
};
```

<%= include('../_includes/ionic/_note_custom_schemes') %>

:::panel Checkpoint
Add the `LoginButton` component to your application, as well as the handler for the "appUrlOpen" event to your `App` component. When you click the login button, verify that your application redirects you to the Auth0 Universal Login Page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects you back to your application.
:::

## Add Logout to Your Application

<%= include('../_includes/ionic/_add_logout_intro.md') %>

Create a new file `LogoutButton.tsx` and add the following code to the file. Then, add the `LogoutButton` component to your app.

```js
import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton } from '@ionic/react';

// This should reflect the URL added earlier to your "Allowed Logout URLs" setting
// in the Auth0 dashboard.
const logoutUri = 'YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const doLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: logoutUri,
      },
      async openUrl(url) {
         // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self"
        });
      }
    });
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
import { useAuth0 } from '@auth0/auth0-react';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth0();

  // If the SDK is not ready, or a user is not authenticated, exit.
  if (isLoading || !user) return null;

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
