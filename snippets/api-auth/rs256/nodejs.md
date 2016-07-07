---
title: Node.js
---

```js
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var publicKey = fs.readFileSync('./key.pem');

var jwtCheck = jwt({
  secret: publicKey,
  audience: '${ "<%= api.identifier %>" }',
  issuer: 'https://${ "<%= tenantDomain %>" }/'
});

// All endpoints under /api should validate token
app.use('/api', jwtCheck);

```
