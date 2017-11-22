---
title: Authentication
description: This tutorial will show you how to use the Auth0 to add authentication to your Falcor API.
---

<%= include('../../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-falcor-sample',
  path: '01-Authorization-RS256',
  requirements: [
    'Falcor 0.1.17',
    'Express 4.15.2'
  ]
}) %>

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Add the Dependencies

Add **express-jwt**, **express-jwt-authz**, **falcor-express**, and **falcor-router** to your project. 

${snippet(meta.snippets.dependencies)}

## Configuration

<%= include('../_includes/_api_jwks_description_no_link') %>

Configure the **express-jwt** middleware to use the remote JWKS for your Auth0 account.

${snippet(meta.snippets.setup)}

## Secure your API

Individual routes can be configured to look for a particular `scope` by setting up another middleware with the **express-jwt-authz** package. To do so, provide an array of required scopes and apply the middleware to any routes you wish to add authorization to.

${snippet(meta.snippets.use)}

## Send Authorization Header from the Front End

When you send a request to the Falcor model, you need to include the user's `access_token` as an `Authorization` header.

```js
const token = localStorage.getItem('access_token');

const model = new falcor.Model({
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

## Optional steps

### Configuring CORS

If you want to configure CORS, add this code to your Falcor app (assuming your Falcor app is hosted on `http://localhost:3010`):

```js
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3010");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
```
