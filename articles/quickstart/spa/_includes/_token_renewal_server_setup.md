## Server Setup

Renewing the user's `access_token` requires that a static HTML file to be served. The server setup you choose for this is at your discretion, but an example using **Node.js** and **express** is given here.

Create a simple server with **express** and add a file called `silent.html`.

```js
// server.js

const express = require('express');
const app = express();
const cors = require('cors');
const staticFile = require('connect-static-file');

app.use(cors());
app.use('/silent', staticFile(`<%= "${__dirname}/silent.html" %>`));

app.listen(3001);
console.log('Listening on http://localhost:${serverPort}');
```

```html
<!-- silent.html -->

<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="${auth0js_urlv8}"></script>
  <script>
    var webAuth = new auth0.WebAuth({
      domain: '${account.namespace}',
      clientID: '${account.clientId}',
      scope: 'openid profile',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:${clientPort}'
    });
  </script>
  <script>
    webAuth.parseHash(window.location.hash, function (err, response) {
      parent.postMessage(err || response, 'http://localhost:${clientPort}');
    });
  </script>
</head>
<body></body>
</html>
```

The `silent.html` file exists to receive and parse the result of a token renewal. An instance of `WebAuth` from auth0.js is created and its `parseHash` method is used to produce a usable object out of the authentication result hash. This is then posted back to the parent window where the client side session can be set again.

::: note
Be sure to add `http://localhost:${serverPort}/silent` to the **Callback URLs** section in your application's client settings.
:::