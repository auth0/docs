---
lodash: true
---

## Socket.io Tutorial

When using Realtime frameworks like Socket.io, Authentication is something extremely important. If you don't handle it correctly, a malicious user could hijack the stream and use it to get and send any information he'd want.

In order to avoid that, you can configure Socket.io to work with JWT and particularly with Auth0.

### Instructions

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="https://github.com/auth0/socketio-jwt/tree/master/example" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a working sample</span>
    </a> 
  </blockquote>
</div>

Let's look at a simple sample that uses [express](http://expressjs.com/), [socket.io](http://socket.io) and handles authentication using Json Web Tokens (JWT).

### Server Side

Code speaks by itself. Focus on the `/login` and the usage of `socketioJwt.authorize`.

    var jwt = require('jsonwebtoken');
    // other requires

    app.post('/login', function (req, res) {

      // TODO: validate the actual user user
      var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
      };

      // we are sending the profile in the token
      var token = jwt.sign(profile, jwtSecret, { expiresInMinutes: 60*5 });

      res.json({token: token});
    });

    var server = http.createServer(app);

Then the socket.io server

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

The JWT is signed with the `jwtSecret` which is stored only on the server.

Here we are using the [global authorization callback](https://github.com/LearnBoost/socket.io/wiki/Authorizing) on socket.io. We are also using a simple module we wrote ([socketio-jwt](https://github.com/auth0/socketio-jwt)) to help us with the details of handling the JWT. This module expects the JWT in the querystring during the handshake.

If the client sends a valid JWT, the handshake completes successfully and the `connection` event is triggered.


### Client Side

A simple js client side code that uses this server is shown bellow:

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

As stated before, this is much simpler than using cookies and sessions, and it is much easier to implement across different technologies.
