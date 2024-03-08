---
title: Add authorization to an Express.js API application
description: This tutorial demonstrates how to add authorization to an Express.js API.
topics:
- quickstart
- backend
- express
github:
  path: 01-Authorization-RS256
contentType: tutorial
useCase: quickstart
interactive: true
files:
- files/server
---

<!-- markdownlint-disable MD041 MD025 -->

# Add Authorization to Your Express.js API Application
This guide demonstrates how to integrate Auth0 with any new or existing Express.js API application using the `express-oauth2-jwt-bearer` package.

If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing project API.

To set up your first API through the Auth0 dashboard, review [our getting started guide](get-started/auth0-overview/set-up-apis).
Each Auth0 API uses the API Identifier, which your application needs to validate the access token.

<!-- markdownlint-disable MD041 MD002 -->

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Install dependencies

First, install the SDK with `npm`.

```bash
npm install --save express-oauth2-jwt-bearer
```

## Configure the middleware {{{ data-action=code data-code="server.js#1:10" }}}

Configure `express-oauth2-jwt-bearer` with your Domain and API Identifier.

The `checkJwt` middleware shown to the right checks if the user's access token included in the request is valid. If the token is not valid, the user gets a 401 Authorization error when they try to access the endpoints.

The middleware does not check if the token has sufficient scope to access the requested resources.

## Protect API endpoints {{{ data-action=code data-code="server.js#12:32" }}}

To protect an individual route by requiring a valid JWT, configure the route with the `checkJwt` middleware constructed from `express-oauth2-jwt-bearer`.

You can configure individual routes to look for a particular scope. To achieve that, set up another middleware with the `requiresScope` method. Provide the required scopes and apply the middleware to any routes you want to add authorization to.

Pass the `checkJwt` and `requiredScopes` middlewares to the route you want to protect.

In this configuration, only access tokens with the `read:messages` scope can access the endpoint.

<%= include('../_includes/_call_api') %>

::::checkpoint
:::checkpoint-default
Now that you have configured your application, run your application to verify that:
* `GET /api/public` is available for non-authenticated requests.
* `GET /api/private` is available for authenticated requests.
* `GET /api/private-scoped` is available for authenticated requests containing an access token with the `read:messages` scope.
:::

:::checkpoint-failure
If your application did not start successfully:
* Verify you added the token as the `Authorization` header
* Ensure the token has the correct scopes. Verify with [jwt.io](https://jwt.io/).

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
