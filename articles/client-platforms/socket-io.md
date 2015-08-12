---
title: Socket.io Tutorial
name: Socket.io
alias:
  - socketio
  - socket.io
language:
  - Javascript
framework:
  - Socket.io
image: //auth0.com/lib/platforms-collection/img/socketio.svg
tags:
  - quickstart
snippets:
  dependencies: client-platforms/socket-io/dependencies
  setup: client-platforms/socket-io/setup
  use: client-platforms/socket-io/use
---

## Socket.io Tutorial

When using Realtime frameworks like Socket.io, authentication is very important. If handled incorrectly, improper authentication could allow a malicious user to hijack the stream and obtain all user information.

For best security, configure Socket.io to work with JWT and particularly with Auth0.

Here is sample project that uses [Express](http://expressjs.com/), and [Socket.io](http://socket.io) and handles authentication using Json Web Tokens (JWT).

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="https://github.com/auth0/socketio-jwt/tree/master/example" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a working sample</span>
    </a>
  </blockquote>
</div>

### Server-side code

Create a `token` containing the user's profile information:

    var jwt = require('jsonwebtoken');
    // other requires

    app.post('/login', function (req, res) {

      // TODO: validate the user
      var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
      };

      // send the profile in the token
      var token = jwt.sign(profile, jwtSecret, { expiresInMinutes: 60*5 });

      res.json({token: token});
    });

    var server = http.createServer(app);

For authentication, use the [global authorization callback](https://github.com/LearnBoost/socket.io/wiki/Authorizing) on Socket.io:

    var socketioJwt = require('socketio-jwt');

    var sio = socketIo.listen(server);

    sio.set('authorization', socketioJwt.authorize({
      secret: jwtSecret,
      handshake: true
    }));

    sio.sockets
      .on('connection', function (socket) {
         console.log(socket.handshake.decoded_token.email, 'connected');
         //socket.on('event');
      });

    server.listen(9000, function () {
      console.log('listening on http://localhost:9000');
    });

This example uses a simple module ([socketio-jwt](https://github.com/auth0/socketio-jwt)) for handling JWT. This module expects the JWT in the querystring during the handshake. The JWT is signed with the `jwtSecret` which is stored only on the server.

If the client sends a valid JWT, the handshake completes successfully and the `connection` event is triggered.


### Client-side code

Here is js client-side code that uses the Socket.io server:

    function connect_socket (token) {
      var socket = io.connect('', {
        query: 'token=' + token
      });

      socket.on('connect', function () {
        console.log('authenticated');
      }).on('disconnect', function () {
        console.log('disconnected');
      });
    }

    $('#login').submit(function (e) {
      e.preventDefault();
      $.post('/login', {
        username: $('username').val(),
        password: $('password').val()
      }).done(function (result) {
        connect_socket(result.token);
      });
    });

This method is much simpler than using cookies and sessions, and it is much easier to implement across different technologies.
