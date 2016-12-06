---
title: Calling APIs
description: This tutorial will show you how to make authenticated api calls with ReactJS.
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '08-Calling-Api',
  requirements: [
    'React 15.3'
  ]
}) %>

Auth0 exposes an assortment of API endpoints to assist you with authentication in your application. Auth0 suggests you conform to the RFC standard by sending the token through Authorization header when calling an API.

## Add the Authorization Header to Requests

In order to make an authorized request, you need to send the `Authorization` header containing the JWT Token. (For more information, see the [JSON Web Tokens](https://jwt.io/introduction/) documentation.) The token will be extracted from the request header and decoded by the server, validating the authenticated user.

To send requests with the correct headers, update `AuthService` by adding a new helper method to wrap the native [fetch](https://fetch.spec.whatwg.org/) and add the authorization value:

```javascript
// src/utils/AuthService.js

import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  // ...
  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    // if logged in, includes the authorization header
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus) // to raise errors for wrong status
    .then(response => response.json()) // to parse the response as json
  }
}
```

The new `fetch` method constructs requests to send to private endpoints. As the native `fetch` always resolves the returned promise, even for the 401 (unauthorized) response status, this code also adds a method to the promise stack that throws an `Error` for the `_checkStatus` case.

## Create a Simple Server

To demonstrate how a server would handle public and private endpoints, you can create a simple `node.js` server based on [express](https://expressjs.com/) and [express-jwt](https://github.com/auth0/express-jwt) with only two endpoints: `/api/public` and `/api/private`:

```javascript
// server.js

var express = require('express');
var app = express();
var jwt = require('express-jwt');
require('dotenv').config();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authenticate, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');
```

Both endpoints send a JSON response with a message attribute, but `/api/private` uses the __authenticate__ callback to validate the token received in the `Authorization` header. `express-jwt` is responsible for parsing and validating the token. (For more details, see the [express-jwt](https://github.com/auth0/express-jwt) documentation).

> **Note:** The **client ID** and **secret** for your application are passed to the `jwt` middleware in the above snippet. These values should be provided to a `.env` file in your project.

To test the server, run `node server.js`. It should be listening on port 3001 of `localhost`.

## Add a Proxy and Start the Server

Since you will be calling the server API from the client code and to prevent having to use [cors](https://github.com/expressjs/cors), you will need to proxy the calls from the client on port 3000 to the server API on 3001.

To create the proxy, add a new setting to [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) in the `webpack.config.js` file:

```javascript
// webpack.config.js

var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        title: 'auth0 React Sample',
        publicPath: isDev ? 'http://localhost:3000/' : '',
        meta: {
          'name': 'auth0 React Sample',
          'description': 'A minimal reactJS sample application showing auth0 integration'
        }
      })
    }
  },
  devServer: { // settings for webpack-dev-server
    proxy: { //proxying /api calls to 3001 port
      context: "/api",
      options: {
        target: "http://localhost:3001"
      }
    }
  }
});
```

With the proxy ready, update the `start` script to start both `webpack-dev-server` and `server.js` at the same time. As both servers will stay running in development mode, you will need to introduce the [npm-run-all](https://github.com/mysticatea/npm-run-all) tool in order to run them in parallel.

The updated `scripts` entry in `package.json` looks like:

```javascript
"scripts": {
    "start": "npm-run-all --parallel dev-server server-api",
    "dev-server": "NODE_ENV=development cross-env hjs-dev-server",
    "server-api": "node server.js",
    // ...
}
```

Now, when you run `npm start`, both servers should be up and the proxy active.

## Show Public and Private Responses

Now that you have updated `AuthService` to provide a custom `fetch` method for private requests and created a sample server, you are ready to update your ReactJS application to render the server responses.

Create a new component named `Messages` in the folder `src/components/Messages`:

```javascript
// src/components/Messages/Messages.js

import React, { PropTypes as T } from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Messages extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      publicMsg: "",
      privateMsg: ""
    }
    this.callApis()
  }

  callApis() {
    const { auth } = this.props
    // public http request
    fetch('/api/public')
      .then(response => response.json())
      .then(response => this.setState({publicMsg: response.message}))
    // using auth to send an http request with authorization header
    auth.fetch('/api/private')
      .then(response => this.setState({privateMsg: response.message}))
      .catch(error => this.setState({privateMsg: "" + error}))
  }

  render() {
    return (
      <ListGroup className={styles.root}>
        <ListGroupItem header="/api/public response">
          {this.state.publicMsg}
        </ListGroupItem>
        <ListGroupItem header="/api/private response">
          {this.state.privateMsg}
        </ListGroupItem>
      </ListGroup>
    )
  }
}

export default Messages;
```

Note that both server endpoints will receive requests as soon as the component is created. `callApis` uses the regular `fetch` for the public API, and the `auth.fetch` for the private API, and updates the component internal state after receiving the responses.

Also note that `auth` is an `AuthService` instance expected as a prop, and that the component renders a `ListGroup` with two `ListGroupItem` to display the server messages.

Lastly, include the `Messages` component in an application view.

To show how this component works in both authenticated and not authenticated situations, do not only include it in `Home` (where the user is already authenticated) but also in `Login`, to demonstrate that the private API requests fails:

```javascript
// src/views/Main/Home/Home.js

export class Home extends React.Component {
  // ...
  render() {
    const { profile } = this.state
    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <p>Welcome {profile.name}!</p>
        <Messages auth={this.props.auth}></Messages>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;
```

```javascript
// src/views/Main/Login/Login.js

export class Login extends React.Component {
  // ...
  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <Messages auth={this.props.auth}></Messages>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
```

When you run the application, you will see the server API responses for both the public and private calls on the Home and Login pages. However, the private calls from the Login page will return an authorization error.

