---
name: node.js
language: javascript
---

```javascript
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  }
};

// Middleware that supports session_transfer_token via query parameter
app.use((req, res, next) => {
  const { session_transfer_token } = req.query;

  if (session_transfer_token) {
    config.authorizationParams.session_transfer_token = session_transfer_token;
  }

  auth(config)(req, res, next);
});
```
