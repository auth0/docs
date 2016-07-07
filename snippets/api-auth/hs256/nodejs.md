---
title: Node.js
---

```js
var express = require('express');
var app = express();
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: '${ "<%= api.signing_secret %>" }',
  audience: '${ "<%= api.identifier %>" }'
});
```
