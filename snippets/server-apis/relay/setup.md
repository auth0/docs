```js
var express       = require('express');
var graphqlHttp   = require('express-graphql');
var schema        = require('./schema/schema');
var jwt           = require('express-jwt');

var authenticate = jwt({
  secret: '<%= account.clientSecret %>',
  audience: '<%= account.clientId %>'
});
```
