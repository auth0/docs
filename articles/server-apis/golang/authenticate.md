---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Go SDK to add authentication and authorization to your API.
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-golang-web-api',
  path: '00-Starter-Seed'
}) %>

### 1. Install the `go-jwt-middleware` dependency

Install `go-jwt-middleware` to check for JWTs on HTTP requests.

Just run the following code to install the dependency

${snippet(meta.snippets.dependencies)}

### 2. Configure `go-jwt-middleware` to use your Auth0 Account

You need to set the ClientSecret in `go-jwt-middleware`'s configuration so that it can validate [JWTs](/jwt) for you.

${snippet(meta.snippets.setup)}

### 3. Secure your API

Now, you can use the `go-jwt-middleware` to secure your API. You can do so using either `net/http` handlers or `negroni` middlewares.
${snippet(meta.snippets.use)}


### 4. Call Your API

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.

```har
{
  "method": "GET",
  "url": "http://localhost:3001/path_to_your_api",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```

### 5. You're done!

Now you have both your frontend and backend configured to use Auth0. Congrats, you're awesome!
