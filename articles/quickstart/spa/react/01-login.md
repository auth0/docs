---
title: Login
description: "Auth0 allows you to add authentication to your React application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing React application using the Auth0 React SDK."
budicon: 448
topics:
  - quickstarts
  - spa
  - react
  - login
github:
  path: Sample-01
contentType: tutorial
useCase: quickstart
---
<!-- markdownlint-disable MD002 MD034 MD041 -->

:::note
Visit the [React Authentication By Example](https://developer.auth0.com/resources/guides/spa/react/basic-authentication) guide for a deep dive into implementing user authentication in React. This guide provides additional details on how to create a sign-up button and add route guards using React Router.
:::

<%= include('../_includes/_getting_started', { library: 'React', callback: 'http://localhost:3000', returnTo: 'http://localhost:3000', webOriginUrl: 'http://localhost:3000', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true, show_install_info: false }) %>

<%= include('../../_includes/_auth0-react-install.md') %>

### Configure the `Auth0Provider` component

Under the hood, the Auth0 React SDK uses [React Context](https://reactjs.org/docs/context.html) to manage the authentication state of your users. One way to integrate Auth0 with your React app is to wrap your root component with an `Auth0Provider` that you can import from the SDK.

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
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
```

The `Auth0Provider` component takes the following props:

- `domain` and `clientId`: The values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.

<%= include('../_includes/_auth_note_custom_domains') %>

- `authorizationParams.redirect_uri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

`Auth0Provider` stores the authentication state of your users and the state of the SDK &mdash; whether Auth0 is ready to use or not. It also exposes helper methods to log in and log out your users, which you can access using the `useAuth0()` hook.

:::panel Checkpoint
Now that you have configured `Auth0Provider`, run your application to verify that the SDK is initializing correctly, and your application is not throwing any errors related to Auth0.
:::

## Add Login to Your Application

The Auth0 React SDK gives you tools to quickly implement user authentication in your React application, such as creating a [login](https://auth0.com/docs/login) button using the `loginWithRedirect()` method from the `useAuth0()` hook. Executing `loginWithRedirect()` redirects your users to the Auth0 Universal Login Page, where Auth0 can authenticate them. Upon successful authentication, Auth0 will redirect your users back to your application.

```javascript
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
```

<%= include('../../_includes/_auth0-react-classes-info.md') %>

:::panel Checkpoint
Add the `LoginButton` component to your application. When you click it, verify that your React application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects you to your application using the value of the `authorizationParams.redirect_uri` that you used to configure the `Auth0Provider`.
:::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

<%= include('../_includes/_auth_note_dev_keys') %>

## Add Logout to Your Application

Now that you can log in to your React application, you need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). You can create a logout button using the `logout()` method from the `useAuth0()` hook. Executing `logout()` redirects your users to your [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (`https://YOUR_DOMAIN/v2/logout`) and then immediately redirects them to your application.

```javascript
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;
```

:::panel Checkpoint
Add the `LogoutButton` component to your application. When you click it, verify that your React application redirects you the address you specified as one of the "Allowed Logout URLs" in the "Settings" and that you are no longer logged in to your application.
:::

## Show User Profile Information

The Auth0 React SDK helps you retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user` property exposed by the `useAuth0()` hook. Take this `Profile` component as an example of how to use it:

```javascript
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
```

The `user` property contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. To prevent any render errors, use the `isAuthenticated` property from `useAuth0()` to check if Auth0 has authenticated the user before React renders any component that consumes the `user` property. Ensure that the SDK has completed loading before accessing the `isAuthenticated` property, by checking that `isLoading` is `false`.

:::panel Checkpoint
Verify that you can display the `user.name` or [any other `user` property](https://auth0.com/docs/users/references/user-profile-structure#user-profile-attributes) within a component correctly after you have logged in.
:::                                              

