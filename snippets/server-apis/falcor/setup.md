```js
var express       = require('express');
var app           = express();
var jwt           = require('express-jwt');
var falcorExpress = require('falcor-express');
var Router        = require('falcor-router');

var authenticate = jwt({
  secret: '<%= account.clientSecret %>',
  audience: '<%= account.clientId %>'
});
```
