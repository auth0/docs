---
title: Node.js
---

```js
var express = require('express');
var app = express();
var jwt = require('express-jwt');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
  secret: '${ "<%= api.signing_secret %>" }',
  audience: '${ "<%= api.identifier %>" }',
  issuer: "${'https://<%= tenantDomain %>'}/"
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);
```
