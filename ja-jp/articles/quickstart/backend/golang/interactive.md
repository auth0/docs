---
title: Add authorization to a Go API
description: This tutorial demonstrates how to add authorization to a Go API.
topics:
  - quickstart
  - backend
  - golang
interactive: true
github:
  path: 01-Authorization-RS256
contentType: tutorial
useCase: quickstart
files:
  - files/jwt
  - files/main
---

<!-- markdownlint-disable MD041 MD025 -->

# Add Authorization to Your Go Application
This guide demonstrates how to integrate Auth0 with any new or existing Go API application using the [go-jwt-middleware](https://github.com/auth0/go-jwt-middleware) package.

If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing API for your project.

To set up your first API through the Auth0 dashboard, review [our getting started guide](get-started/auth0-overview/set-up-apis).

Each Auth0 API uses the API Identifier, which your application needs to validate the access token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Install dependencies

Add a `go.mod` file to list all the necessary dependencies.

```text
// go.mod

module 01-Authorization-RS256

go 1.21

require (
	github.com/auth0/go-jwt-middleware/v2 v2.2.0
	github.com/joho/godotenv v1.5.1
)
```

Download dependencies by running the following shell command:

```shell
go mod download
```

## Configure your application

Create a `.env` file within the root of your project directory to store the app configuration, and fill in the
environment variables:

```sh
# The URL of our Auth0 Tenant Domain.
# If you're using a Custom Domain, be sure to set this to that value instead.
AUTH0_DOMAIN='${account.namespace}'

# Our Auth0 API's Identifier.
AUTH0_AUDIENCE='${apiIdentifier}'
```

## Create a middleware to validate access tokens {{{ data-action=code data-code="middleware/jwt.go" }}}

The `EnsureValidToken` middleware function validates the access token. You can apply this function to any endpoints you wish to protect.
If the token is valid, the endpoint releases the resources. If the token is not valid, the API returns a `401 Authorization` error.

Setup the **go-jwt-middleware** middleware to verify access tokens from incoming requests.

<%= include('../_includes/_api_jwks_description_no_link') %>

Include a mechanism to check that the token has sufficient **scope** to access the requested resources.


Create a function `HasScope` to check and ensure the access token has the correct scope before returning a successful response.

## Protect API endpoints {{{ data-action=code data-code="main.go" }}}

In this example, create an `/api/public` endpoint that does not use the `EnsureToken` middleware as it is accessible to non-authenticated requests.

Create an `/api/private` endpoint that requires the `EnsureToken` middleware as it is only available to authenticated requests containing an access token with no additional scope.

Create an `/api/private-scoped` endpoint that requires the `EnsureToken` middleware and `HasScope` as it is only available for authenticated requests containing an access token with the `read:messages` scope granted.

::: note
Only the `read:messages` scope is checked by the `HasScope` function, you may want to extend it or make it a standalone middleware that accepts multiple scopes to fit your use case.
:::

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
::::
