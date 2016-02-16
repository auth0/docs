```js
var Hapi = require('hapi');
var server = new Hapi.Server();

server.register(require('hapi-auth-jwt'), function (err) {

  server.auth.strategy('token', 'jwt', {
    key: new Buffer('<%= account.clientSecret %>', 'base64'),
    verifyOptions: {
      algorithms: [ 'HS256' ],
      audience: '<%= account.clientId %>'
    }
  });

  server.start();
});
```
