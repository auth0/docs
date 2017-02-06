---
title: Login
description: This tutorial demonstrates how to use the Auth0 Socket.io SDK to add authentication and authorization to your web app
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-socket.io-samples',
  path: '00-Starter-Seed',
  requirements: [
    'Socket.io 1.4.5',
    'NodeJS 5.0.0'
  ]
}) %>


## 1. Set up the Allowed Origin (CORS) in Auth0

<div class="setup-origin">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Client Settings</a> section in the Auth0 dashboard and make sure to add your URL as an <b>Allowed Origin (CORS)</b>. If you're testing it locally, it should contain the following value:</p>

<pre><code>http://localhost:3001</pre></code>

</div>

## 2. Installation

Install [socketio-jwt](https://github.com/auth0/socketio-jwt) from npm and save it to your `package.json` using

```
npm install --save socketio-jwt
```

## 3. Add the Auth0 Script and Set the Viewport

Add the code below to the `index.html` file to include the Auth0 `lock` script and set the viewport:

${snippet(meta.snippets.dependencies)}

## 4. Configure Auth0Lock

Configure Auth0Lock with your `clientId` and `domain`:

${snippet(meta.snippets.setup)}

To discover all the available options, see [User configurable options](/libraries/lock/v10/customization).

## 5. Implement the Login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button, and save the JWT token to `localStorage` for later use in calling a server or an API:

${snippet(meta.snippets.use)}

## 6. Set Authorization for Socket.io

Add the following to your `index.js` file.

```javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketioJwt = require('socketio-jwt');

io
  .on('connection', socketioJwt.authorize({
    secret: '${account.clientSecret}',
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + JSON.stringify(socket.decoded_token));
  });
```

## 7. Load the socket.io-client

Add the following snippet before the `</body>` on `index.html`

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
  socket.on('connect', function () {
  socket.on('authenticated', function () {
  //Do

  })
  .emit('authenticate', {token: userToken}); // send the jwt
  });
</script>
```

No URL is specified when doing `var socket = io();`, because the default behaviour is to connect to the host that serves the page.

<%= include('../_includes/_persisting_state') %>
