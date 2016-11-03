---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Node.js Hapi SDK to add authentication and authorization to your API.
---

In this tutorial you will learn how to use Auth0 to secure your [Hapi](http://hapijs.com/) API.

<%= include('../../_includes/_package2', {
  org: 'auth0',
  repo: 'node-auth0',
  path: 'examples/hapi-api',
  requirements: [
    'Node.js 4.6.0',
    'Hapi.js 13.5.3',
    'hapi-auth-jwt 4.0.0'
  ]
}) %>

### 1. Add hapi-auth-jwt dependency

You need to add the hapi-auth-jwt dependency.

Just run the following code to install the dependency and add it to your `package.json`

${snippet(meta.snippets.dependencies)}

### 2. Configure hapi-auth-jwt with your Auth0 account

You need to set the ClientID and ClientSecret in `hapi-auth-jwt`'s configuration so that it can validate and sign [JWT](/jwt)s for you.

${snippet(meta.snippets.setup)}

### 3. Secure your API

Now, you need to specify one or more routes or paths that you want to protect so that only users with a valid JWT will be able to do the request.

${snippet(meta.snippets.use)}

### 4. Call Your API

You can now make requests against your secure API by providing the `Authorization` header in your requests with a valid JWT id_token.

```har
{
  "method": "GET",
  "url": "http://localhost:8000/path_to_your_api",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```

### 5. You're done!

Now you have both your Hapi API secured with Auth0. Congrats, you're awesome!
