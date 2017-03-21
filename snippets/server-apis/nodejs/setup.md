```js
var express = require('express');
var app = express();
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('<%= account.clientSecret %>', 'base64'),
  audience: '<%= account.clientId %>'
});
```
