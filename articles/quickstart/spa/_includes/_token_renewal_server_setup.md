## Server Setup

To renew the user's access token, you need to serve a static HTML file. You can choose any server setup to do this. 

::: note
This example shows how to create a simple Express server that serves a file called `silent.html`.
:::

The `silent.html` file receives and parses the result of a token renewal. An instance of the `WebAuth` object from auth0.js is created. The `parseHash` method creates a usable object from the hash with the authentication result. The object is then posted back to the parent window and the client-side session sets again. 

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
::: note
Add `http://localhost:${serverPort}/silent` to the **Allowed Callback URLs** section in your [client's settings](${manage_url}/#/clients/${account.clientId}/settings).
:::
