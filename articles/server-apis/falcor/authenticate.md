---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Falcor SDK to add authentication and authorization to your API.
---

<%= include('../../_includes/_package', {
  pkgRepo: 'node-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/falcor-api',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.6.0
:::



**Otherwise, Please follow the steps below to configure your existing Falcor app to use it with Auth0.**

### 1. Add express-jwt dependency

You need to add a few dependencies, including `express-jwt`. Also, If you haven't already done so, you need to install `falcor-express` and `falcor-router`.

Just run the following code to install the dependencies and add them to your `package.json`.

${snippet(meta.snippets.dependencies)}

### 2. Configure express-jwt with your Auth0 account

You need to set the ClientID and ClientSecret in `express-jwt`'s configuration so that it can validate and sign [JWT](/jwt)s for you.

${snippet(meta.snippets.setup)}

### 3. Secure your API

In your Falcor app, you serve a virtual JSON resource from a single endpoint. You can protect this endpoint globally with the `express-jwt` middleware.

${snippet(meta.snippets.use)}

### 4. Send Authorization header from the front end

When you send a request to the Falcor model, you need to include the JWT as an `Authorization` header.

```js
var token = localStorage.getItem('id_token');

var model = new falcor.Model({
  source: new falcor.HttpDataSource('/api/model.json', {
    // Send the token as an Authorization header
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
});

```

Don't forget to include [falcor.browser](https://github.com/Netflix/falcor#retrieving-data-from-the-virtual-json-resource) to your front end:

```html
<!-- Do _not_  rely on this URL in production. Use only during development.  -->
<script src="https://netflix.github.io/falcor/build/falcor.browser.js"></script>
<!-- For production use. -->
<!-- <script src="https://cdn.jsdelivr.net/falcor/{VERSION}/falcor.browser.min.js"></script> -->
```

### 5. You're done!

Your Falcor app is now secure with Auth0 and `express-jwt`. Congrats, you're awesome!

### Optional steps

#### Configuring CORS

If you want to configure CORS, just add this code to your Falcor app (assuming your Falcor app is hosted on `http://localhost:3000`):

```js
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
```
