---
title: Calling APIs
description: This tutorial will show you how to make authenticated api calls with ReactJS.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-react-sample/tree/master/05-Calling-Api',
}) %>_

The reason for implementing authentication in the first place is to protect information. In this case your information is a resource served from a server of any sort. Auth0 provides a squad of tools to assist you with end-to-end authentication in an application. Auth0 suggests you conform to RFC standard by sending the token through Authorization header.

## 1. Add Authentication Header to Requests

In order to make an authorized request in our example, we need to send an `Authorization` header that will decoded in the server to validate the authencaticated user. A good way to provide this is updating `AuthService` to wrap the [`fetch`](https://fetch.spec.whatwg.org/) and always send the correct headers:

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
  ... // omitting some code

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

  fetch(url, options){
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    // if logged in, includes the authorization header
    if (this.loggedIn()){
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

As you see, there is a new `fetch` method created to send requests to private endpoints. As the native `fetch` always resolves the returned promise even for response status 401, we're adding a method to throw an `Error` in `_checkStatus`, and adding it to the promise stack.

## 2. Create the Server and API

To exemplify how server would handle public and private endpoints, we're introducing a simple `node.js` server based on [`express`](https://expressjs.com/) and [`express-jwt`](https://github.com/auth0/express-jwt). It's a super simple server with only two endpoints: `/api/public` and `/api/private`:


```javascript
/* ===== ./server.js ===== */
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

Both endpoints send a json response with a message attribute, but `/api/private` is using the __authenticate__ callback to validate the token received in `Authentication` header. `express-jwt` is responsible to parse and validate the token (please, check the [documentation for more details](https://github.com/auth0/express-jwt)). Notice we're using `dotenv` package to load `process.env.AUTH0_SECRET` and `process.env.AUTH0_CLIENT_ID` from `.env` file.

<% if (account.userName) { %>
If you don't have that file in your project you can create your own using the following command:

```bash
$ echo "AUTH0_CLIENT_ID='${account.clientId}\nAUTH0_DOMAIN='${account.namespace}'\nAUTH0_SECRET='account.secret'" > .env
```
<% } else { %>
If you don't have that file in you project folder, please copy `.env.example` and add your own credentials from [auth0 dashboard](https://manage.auth0.com).

```bash
$ cp .env.example .env
```
<% } %>

To test the server, just run `node server.js` and it should be listening in port 3001 of localhost.


## 3. Add a Proxy and Start the Server

As we'll be calling the server api from the client code, we need to proxy the calls to prevent have to use [`cors`](https://github.com/expressjs/cors), since client is served in post 3000 and client in 3001. To create the proxy we basically will add a new setting to [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html):

```javascript
/* ===== ./webpack.config.js ===== */
...
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
  devServer: {
    proxy: { //proxying /api calls to 3001 port
      context: "/api",
      options: {
        target: "http://localhost:3001"
      }
    }
  }
});
...
```

With a proxy, let's update our `start` script to start both `webpack-dev-server` and our `server.js`. The updated `scripts` entry in `package.json` seems like:

```javascript
/* ===== ./package.json ===== */
"scripts": {
    "start": "cross-env NODE_ENV=development hjs-dev-server & node server.js",
    ...
}
```

Now when you run `npm start` both server should be up.

## 4. Show Public and Private Responses

Since we have updated `AuthService` to provide a custom `fetch` method for private requests and we also have created our sample server, we're ready to update our ReactJS application to render the server responses. To accomplish that, let's create a new component named `Messages` in the folder `src/components/Messages`:

```javascript
/* ===== ./src/components/Messages/Messages.js ===== */
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

  callApis(){
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

  render(){
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

Checking the above code you'll notice that both server endpoints will receive requests as soon the component is created. `callApis` is responsible to use teh regular `fetch` for the public api, and the `auth.fetch` for the private api, updating the component state for every response. `auth` is an `AuthService` instance that must be sent as a prop. Finally the component renders a `ListGroup` to display the response messages.

But the `Messages` component is still not being rendered anywhere in the application. As our goal here is to show how it works in authenticated and not authenticated situations, we'll include the new component not just in `Home` (where the user is already authenticated) but also in `Login`, to make sure the private api requests fails:

```javascript
/* ===== ./src/views/Main/Home/Home.js ===== */
...
export class Home extends React.Component {
  ...
  render(){
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
/* ===== ./src/views/Main/Login/Login.js ===== */
...
export class Login extends React.Component {
  ...
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

When you run the application you see the server api responses for public and private in Home and Login pages, with the difference that private call in Login returns an authorization error.

## 5. All Done!

You have completed the implementation of calling apis protected by Auth0 user token in your ReactJS project.
