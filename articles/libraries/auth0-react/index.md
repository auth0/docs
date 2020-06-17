---
section: libraries
toc: true
title: Auth0 React SDK
description: Auth0 SDK for React Single Page Applications.
topics:
  - libraries
  - auth0-react
contentType:
  - index
---

<!-- markdownlint-disable MD041 -->

# Auth0 React SDK


The Auth0 React SDK is a JavaScript library for implementing authentication & authorization in React apps with Auth0. It provides a custom React hook and other Higher Order Components so you can secure React apps using best practices while writing less code.

The Auth0 React SDK handles grant and protocol details, token expiration and renewal, as well as token storage and cacheing. Under the hood, it implements [Universal Login](/universal-login) and the [Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce).

The library is [hosted on GitHub](https://github.com/auth0/auth0-react) and you can find the API documentation [here](https://auth0.github.io/auth0-react/).

## Installation

You have a few options for using auth0-react in your project:

From the CDN:

```html
<script src="${auth0react_url}"></script>
```

Using [npm](https://npmjs.org):

```sh
npm install @auth0/auth0-react
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @auth0/auth0-react
```

## Getting Started

First, you'll need to wrap your application in a single `Auth0Provider` component. This will provide the React Context to components that are placed inside your application.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain="${account.namespace}"
    clientId="${account.clientId}"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app')
);
```

Use the `useAuth0` hook in your components to access the React Context's authentication state (`isLoading`, `isAuthenticated` and `user`) and authentication methods (`loginWithRedirect` and `logout`).

```jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  if (!isAuthenticated) {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name} <button onClick={logout}>Log out</button>
      </div>
    );
  }
}

export default App;
```

### Use with a Class Component

Use the `withAuth0` higher order component to add the `auth0` property to Class components instead of using the hook.

```jsx
import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user } = this.props.auth0;
    return <div>Hello {user.name}</div>;
  }
}

export default withAuth0(Profile);
```

### Protect a Route

Protect a route component using the `withAuthenticationRequired` higher order component. Visits to this route when unauthenticated will redirect the user to the login page and back to this page after login.

```jsx
import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = () => (<div>Private</div>);

export default withAuthenticationRequired(PrivateRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});
```

**Note** If you are using a custom router, you will need to supply the `Auth0Provider` with a custom `onRedirectCallback` method to perform the action that returns the user to the protected page. See examples for [react-router](https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#1-protecting-a-route-in-a-react-router-dom-app), [Gatsby](https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#2-protecting-a-route-in-a-gatsby-app) and [Next.js](https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#3-protecting-a-route-in-a-nextjs-app-in-spa-mode).

### Call an API

To call a protected API with an Access Token. Be sure to specify the `audience` and `scope` of your access token, either in `Auth0Provider` or `getAccessTokenSilently`. Then use it to call a protected API by passing it in the `Authorization` header of your request.

```jsx
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Posts = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'https://api.example.com/',
          scope: 'read:posts',
        });
        const response = await fetch('https://api.example.com/posts', {
          headers: {
            Authorization: `Bearer <%= "${token}" %>`,
          },
        });
        setPosts(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {posts.map((post, index) => {
        return <li key={index}>{post}</li>;
      })}
    </ul>
  );
};

export default Posts;
```

