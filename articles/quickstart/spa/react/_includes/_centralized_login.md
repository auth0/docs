<%= include('../../_includes/_login_preamble', { library: 'React' }) %>

## Create an Authentication Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. The name for it is at your discretion, but in these examples it will be called `Auth` and the filename will be `Auth.js`. An instance of the `WebAuth` object from **auth0.js** can be created in the service.

```js
// src/Auth/Auth.js

import { EventEmitter } from 'events';
import history from '../history';
import auth0 from 'auth0-js';

export default class Auth extends EventEmitter {
  auth0 = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: 'http://localhost:3000',
    audience: 'https://${account.namespace}/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

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

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      history.replace('/home');
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
```

The service includes several methods for handling authentication.

* `login` - calls `authorize` from auth0.js which redirects users to the hosted login page
* `handleAuthentication` - looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
* `setSession` - sets the user's `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed

<%= include('../../_includes/_auth_service_method_description_auth0js') %>

## Provide a Login Control

Provide a component with controls for the user to log in and log out.

```js
// src/App.js

import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`<%= "/${route}" %>`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
```

> This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.

The `onClick` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `Auth` service to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the **Log In** button is clicked, the user will be redirected to Auth0's hosted login page.

![hosted login](/media/articles/web/hosted-login.png)

<%= include('../../_includes/_hosted_login_customization' }) %>

## Add a Callback Component

Using Auth0's hosted login page means that users are taken away from your application to a page hosted by Auth0. After they successfully authenticate, they are returned to your application where a client-side session is set for them.

<%= include('../../_includes/_callback_component') %>

Create a component named `CallbackComponent` and populate it with a loading indicator.

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

> This example assumes some kind of loading spinner is available in the same directory as the component. See the downloadable sample for a demonstration.

After authentication, users will be taken to the `/callback` route for a brief time where they will be shown a loading indicator. During this time, their client-side session will be set, after which they will be redirected to the `/home` route.

## Process the Authentication Result

When a user authenticates at Auth0's hosted login page and is then redirected back to your application, their authentication information will be contained in a URL hash fragment. The `handleAuthentication` method in the `Auth` service is responsbile for processing the hash.

Call `handleAuthentication` when the `Callback` route is rendered so that the authentication hash fragment can be processed when the `Callback` component is initialzed.

```js
// src/routes.js

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication(nextState.location.hash);
  }
}

export const makeMainRoutes = () => {
  return (
      <BrowserRouter history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </BrowserRouter>
  );
}
```

## Embedded Login

Auth0's hosted login page provides the fastest, most secure, and most feature-rich way to implement authentication in your app. If required, the Lock widget can also be embedded directly into your application, but certain features such as single sign-on won't be accessible. It is highly recommended that you use the hosted login page (as covered in this tutorial), but if you wish to embed the Lock widget directly in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-react-samples/tree/embedded-login/01-Embedded-Login).