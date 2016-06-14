---
title: Auth0 Falcor SDK API Tutorial
description: This tutorial will show you how to use the Auth0 Falcor SDK to add authentication and authorization to your API.
---

## Falcor API Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.6.0
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'node-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/falcor-api',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

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

${snippet(meta.snippets.frontend)}

### 5. You're done!

Your Falcor app is now secure with Auth0 and `express-jwt`. Congrats, you're awesome!
