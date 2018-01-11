---
title: Callback URL
description: This tutorial demonstrates how to handle the authentication result from Auth0
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '01-Login',
  requirements: [
    'React 15.5'
  ]
}) %>

When using the Auth0 hosted login page, users are taken away from your application. After
authenticating, they are returned to your application via the `callback` URL that you provided.

Now that you have the basic login working, it's time to set up the callback endpoint and a component to create a client-side session. 

## Add a Callback Component

::: note
This example assumes you are using path-based routing with `<BrowserRouter>`. If you are using hash-based routing, you will not be able to specify a dedicated callback route. The URL hash will be used to hold the user's authentication information.
:::

<%= include('../_includes/_callback_component') %>

Create a component named `CallbackComponent` and add a loading indicator.

::: note
To display a loading indicator, you need a loading spinner or another indicator in the `assests` directory. See the downloadable sample for demonstration. 
:::

```js
// src/Callback/Callback.js

import React, { Component } from 'react';
import loading from './loading.svg';

class Callback extends Component {
  render() {
    const style = //...

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;
```

After authentication, your users are taken to the `/callback` route. They see the loading indicator while the application sets up a client-side session for them. After the session is set up, the users are redirected to the `/home` route.

## Process the Authentication Result

When a user authenticates at the Auth0 hosted login page, they are redirected to your application. Their URL contains a hash fragment with their authentication information. The `handleAuthentication` method in the `Auth` service processes the hash. 

Call the `handleAuthentication` method after you render the `Callback` route. The method processes the authentication hash fragment when the `Callback` component initializes.

```js
// src/routes.js

import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
      </div>
    </Router>
  );
}
```

For the callback component to do it's job, you'll need to add a `handleAuthentication` method to the `auth`
service. 
### Handle Authentication

In the `Auth` class, add a `handleAuthentication` method. This is where you'll do the work of 
processing the authentication result and setting a session token for the user.

```js
// src/Auth/Auth.js

import history from '../history';

// ...
export default class Auth {
  // ...

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

}
```

For this example, the session token will be store in the browser's localstorage. Add a `setSession`
method to the `Auth` class to manage this.

```js
// src/Auth/Auth.js
// ...

export default class Auth {
  // ...

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

}
```

Now when you run your application with the hard-coded call to the `auth.login()` method, you should
be able to authenticate with Auth0 and then be redirected back to your application's `/callback`
method. Once here, you'll have a session token set and then be redirected back to the home page
of the application.

But having a redirect back to the home page of the application isn't terribly useful when the
home page just pops up another login form.

Up next, then, you'll build a login component to use in your site. This component will use the
`auth` service to determine whether or not you are logged in, and provide a login or logout link
as needed.
