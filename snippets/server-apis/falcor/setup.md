```js
var express       = require('express');
var app           = express();
var jwt           = require('express-jwt');
var falcorExpress = require('falcor-express');
var Router        = require('falcor-router');

var authenticate = jwt({
  secret: new Buffer('<%= account.clientSecret %>', 'base64'),
  audience: '<%= account.clientId %>'
});
```
