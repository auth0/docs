---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Node.js Express SDK to add authentication and authorization to your API.
---

## NodeJS API Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3
* Express 4.11
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'node-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/nodejs-api',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

**If you have an existing application, please follow the steps below.**

### 1. Add express-jwt dependency

You need to add the express-jwt dependency.

Just run the following code to install the dependency and add it to your `package.json`

${snippet(meta.snippets.dependencies)}

### 2. Configure express-jwt with your Auth0 account

You need to set the ClientID and ClientSecret in `express-jwt`'s configuration so that it can validate and sign [JWT](/jwt)s for you.

${snippet(meta.snippets.setup)}

### 3. Secure your API

Now, you need to specify one or more routes or paths that you want to protect, so that only users with the correct JWT will be able to do the request.

${snippet(meta.snippets.use)}

### 4. Call Your API

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.

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

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
