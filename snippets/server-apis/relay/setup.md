```js
var express       = require('express');
var graphqlHttp   = require('express-graphql');
var schema        = require('./schema/schema');
var jwt           = require('express-jwt');
var dotenv        = require('dotenv');

var authenticate = jwt({
  secret: new Buffer('<%= account.clientSecret %>', 'base64'),
  audience: '<%= account.clientId %>'
});
```