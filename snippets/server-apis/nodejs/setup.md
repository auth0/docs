```js
var express = require('express');
var app = express();
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: '<%= account.clientSecret %>',
  audience: '<%= account.clientId %>'
});
```
