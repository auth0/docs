---
title: Introduction
description: An introduction to integrating Auth0 with your React applications
budicon: 448
topics:
  - quickstarts
  - spa
  - react
  - login
github:
  path: 00-intro
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'React', callback: 'http://localhost:3000/callback', returnTo: 'http://localhost:3000', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true }) %>

<%= include('../_includes/_login_preamble', { library: 'React' }) %>

## Using the SDK

For a detailed overview of the SDK, the methods available, and usage examples, please review the [Auth0 JS SDK docs](/libraries/auth0-spa-js).

## Integrating with React

We have provided a wrapper library for the SDK that provides for a more familiar experience when writing React applications. Using this wrapper is designed to make integration even easier and get you up-and-running with Auth0 faster.

Install [the wrapper library](https://github.com/auth0/auth0-spa-js-react) using your terminal:

```bash
# Installation using NPM
npm install @auth0/auth0-spa-js-react

# Installation using Yarn
yarn add @auth0/auth0-spa-js-react
```

::: note
This is a prototype document to illustrate potential usage. The `@auth0/auth0-spa-js-react` package does not actually exist yet
:::

To integrate Auth0 into your application, use the `Auth0Provider` component to wrap your application and provide Auth0 details:

```jsx
// Import the component
import { Auth0Provider } from '@auth0/auth0-spa-js-react'

// Wrap your application
ReactDOM.render(
  <Auth0Provider
    domain="${account.namespace}"
    client_id="${account.client_id}"
    redirect_uri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
```

To interact with the SDK using the wrapper, a custom [React Hook](https://reactjs.org/docs/hooks-intro.html) is available that provides access to the underlying SDK methods. The following sections demonstrate the most common use cases.

### Log in

To log into the application using a redirect, use the `login` method:

```jsx
import { useAuth0 } from '@auth0/auth0-spa-js-react';

const MyComponent = () => {

  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect({})}>Log in</button>
  )
}
```

### Get login status and user information

To retrieve information about the logged-in user, use the `user` property. You can also use the `isAuthenticated` property to check whether or not a user is logged in:

```jsx
const MyComponent = () => {

  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    return <p>Not logged in</p>;
  }

  return (
    <>{isAuthenticated && <h1>{user.name}</h1>}</>
  )
}
```

### Retrieving the access token

If you're calling an API, the access token can be retrieved by using the `getTokenSilently()` method:

```jsx
const MyComponent = () => {

  const { getTokenSilently } = useAuth0();

  const callApi = async () => {
    const token = await getTokenSilently();
    
    fetch('/api', {
      headers: {
        Authorization: `Bearer <%= "${token}" %>`
      }
    })
  }

  return <button onClick={() => callApi()}>Call API</button>
}
```

### Log out

Finally, log out of the application using the `logout` method:

```jsx
const MyComponent = () => {

  const { logout } = useAuth0();

  return <button onClick={() => logout({ return_to: window.location.origin })}>Log out</button>
}
```

For more details on all of these methods and more, please see the [React wrapper documentation](https://github.com/auth0/auth0-spa-js-react).

## Build an Application

Progess to [the next section](/quickstart/spa/react/01-login) for a more in-depth tutorial where you build a complete application using `auth0-spa-js`.