---
title: Authentication
description: This tutorial will show you how to add authorization to a Falcor API.
github:
  path: 01-Authorization-RS256
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Add dependencies

Add **express-jwt**, **express-jwt-authz**, **falcor-express**, **falcor-router**, and **falcor-http-datasource** to your project.

${snippet(meta.snippets.dependencies)}

### Configuration

Configure the **express-jwt** middleware to use the remote JWKS for your Auth0 account.

${snippet(meta.snippets.setup)}

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

To protect an individual route that requires a valid JWT, configure the route with the `checkJwt` express-jwt middleware.

```js
// server.js

// This endpoints doesn't need authentication
app.use('/api/public/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new Router([
    {
      route: 'public.message',
      get: function(pathSet) {
        return { path:['public', 'message'], value: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.' };
      }
    }
  ]);
}));

app.use('/api/private/model.json', checkJwt, falcorExpress.dataSourceRoute(function(req, res) {
  return new Router([
    {
      route: "private.message",
      get: function(pathSet) {
        return { path:['private', 'message'], value: 'Hello from a private endpoint! You need to be authenticated to see this.' };
      }
    }
  ]);
}));
```

```js
// api.js

// This endpoints doesn't need authentication
app.get('/api/public', async function(req, res) {
  const model = new falcor.Model(
    {
      source: new HttpDataSource('http://localhost:3000/api/public/model.json')
    });

  const message = await model.getValue(['public', 'message']);

  res.json({ message: message });
});

app.get('/api/private', checkJwt, async function(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const model = new falcor.Model(
    {
      source: new HttpDataSource(
        'http://localhost:3000/api/private/model.json',
        {
          headers: { 'Authorization': 'Bearer ' + token }
        })
    });

  const message = await model.getValue(['private', 'message']);

  res.json({ message: message });
});
```

::: note
If you are following along with the sample project you downloaded from the top of this page, base URL for Falcor's model should be set to http://localhost:3000.
:::

Individual routes can be configured to look for a particular `scope` by setting up another middleware with the **express-jwt-authz** package. To do so, provide an array of required scopes and apply the middleware to any routes you wish to add authorization to.

${snippet(meta.snippets.use)}

## Optional Steps

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
