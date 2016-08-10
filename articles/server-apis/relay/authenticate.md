---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Relay SDK to add authentication and authorization to your API.
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3
* React 0.14.0-rc1
* Express 4
* React Relay 0.3.2
* Graphql 0.4.4
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'node-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/relay-api',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

**If you have an existing application, please follow the steps below.**

### 1. Add express-jwt Dependency

You need to add  `express-jwt` as a dependency. Also, If you haven't already done so, you need to install `express-graphql`.

Just run the following code to install the dependencies and add them to your `package.json`.

${snippet(meta.snippets.dependencies)}

### 2. Configure express-jwt With your Auth0 Account

You need to set the ClientID and ClientSecret in `express-jwt`'s configuration so that it can validate and sign [JWT](/jwt)s for you.

${snippet(meta.snippets.setup)}

### 3. Secure your API

In your Relay app, you serve a GraphQL object from a single endpoint, which is typically at `/graphql`. You can protect this endpoint globally with the `express-jwt` middleware.

${snippet(meta.snippets.use)}

### 4. Send Authorization Header from the Front End

When you send a request to the GraphQL endpoint, you need to include the JWT as an `Authorization` header. This can be done by tapping into Relay's network layer and extending requests to include a header.

${snippet(meta.snippets.frontend)}

### 5. You're done!

Your Relay app is now secure with Auth0 and `express-jwt`. Congrats, you're awesome!
