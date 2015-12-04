---
title: Socket.io Tutorial
name: Socket.io
alias:
  - socket.io
language: 
  - Javascript
framework:
  - socket.io
image: /media/platforms/socketio.svg
tags:
  - quickstart
snippets:
  dependencies: client-platforms/socket-io/dependencies
  setup: client-platforms/socket-io/setup
  use: client-platforms/socket-io/use
---

## Socket.io Tutorial


<%= include('../_includes/package', {
  pkgRepo: 'socketio-jwt',
  pkgBranch: 'master',
  pkgPath: 'example/socketsio-auth0-sample',
  pkgFilePath: null,
  pkgType: 'server' + account.clientParam
}) %>

**If you have an existing application, follow the steps below.**

### 1. Set up the Allowed Origin (CORS) in Auth0

<div class="setup-origin">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure to add your URL as an <b>Allowed Origin (CORS)</b>. If you're testing it locally, it should contain the following value:</p>

<pre><code>https://localhost:3001</pre></code>

</div>

### 2. Installation

Install [socketio-jwt](https://github.com/auth0/socketio-jwt) from npm and save it to your `package.json` using

```
npm install --save socketio-jwt
``` 

### 3. Add the Auth0 script and set the viewport

Add the code below to the `index.html` file to include the Auth0 `lock` script and set the viewport:

```html
<!-- Auth0Lock script -->
<script src="${widget_url_no_scheme}"></script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

### 4. Configure Auth0Lock

Configure Auth0Lock with your `clientId` and `domain`:

```js
var lock = null;
$(document).ready(function() {
   lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
});
```

### 5. Implement the login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button, and save the JWT token to `localStorage` for later use in calling a server or an API:

```js
var userProfile;
var userToken;
$('#login button').click(function(e){
	e.preventDefault();
	lock.show(function(err, profile, token) {
		if (err) {
			//Error callback
			alert('There was an error');
			alert(err);
		} else {
			//Success callback
			userToken = token;

			//Save the JWT token
			localStorage.setItem('userToken', token);

			//Save the profile
			userProfile = profile;

						
		}
	})
});
```

To discover all the available arguments for `lock.show`, see [.show\(\[options, callback\]\)](/libraries/lock#-show-options-callback-).

### 6. Set Authorization for Socket.io

Add the following to your `index.js` file.

```javascript

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketioJwt = require('socketio-jwt');

io.
  .on('connection', socketioJwt.authorize({
    secret: Buffer('${account.clientSecret}', 'base64'),
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + JSON.stringify(socket.decoded_token));
  });
```
**Note:** If you are not using a base64-encoded secret, then you don't need to convert it to a Buffer, so you can use: `secret: 'your secret or public key'`.

### 7. Load the socket.io-client

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

### 8. All done!

You have completed the implementation of Login and Signup with Auth0 and Socket.io.
