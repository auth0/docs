---
title: Login
description: This tutorial demonstrates how to use the Auth0 Socket.io SDK to add authentication and authorization to your web app
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-socket.io-samples/tree/master/00-Starter-Seed',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-socket.io-samples',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Socket.io 1.4.5
* NodeJS 5.0.0
:::



## 1. Set up the Allowed Origin (CORS) in Auth0

<div class="setup-origin">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure to add your URL as an <b>Allowed Origin (CORS)</b>. If you're testing it locally, it should contain the following value:</p>

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
    secret: Buffer('${account.clientSecret}', 'base64'),
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + JSON.stringify(socket.decoded_token));
  });
```
**Note:** If you are not using a base64-encoded secret, then you don't need to convert it to a Buffer, so you can use: `secret: 'your secret or public key'`.

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
