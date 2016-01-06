---
title: Relay API Tutorial
name: Relay API
thirdParty: false
alias:
  - relay
languages:
  - Javascript
image: /media/platforms/relay.png
tags:
  - quickstart
snippets:
  dependencies: server-apis/relay/dependencies
  setup: server-apis/relay/setup
  use: server-apis/relay/use
  frontend: server-apis/relay/frontend
---

## Relay API Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'node-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/relay-api',
  pkgFilePath: null,
  pkgType: 'server' + account.clientParam
}) %>

**Otherwise, Please follow the steps below to configure your existing Relay app to use it with Auth0.**

### 1. Add express-jwt Dependency

You need to add a few dependencies, including `express-jwt` and `dotenv`. Also, If you haven't already done so, you need to install `express-graphql`.

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
