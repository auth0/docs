---
title: Add authorization to a Ruby on Rails API
description: This tutorial demonstrates how to add authorization to a Ruby on Rails API.
topics:
    - quickstart
    - backend
    - rails
github:
  path: 01-Authentication-RS256
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/json_web_token
  - files/public
  - files/private
  - files/secured
---
<!-- markdownlint-disable MD041 MD025 -->

# Add authorization to a Ruby on Rails API
This tutorial performs Access Token validation using the  [jwt](https://github.com/jwt/ruby-jwt) Gem. A Concern called `Secured` is used to mark endpoints which require authentication through an incoming Access Token.

If you haven't created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.

Alternatively, you can read [our getting started guide](get-started/auth0-overview/set-up-apis) that helps you set up your first API through the Auth0 dashboard.

Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the access token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Install dependencies
Install the **jwt** Gem.

```bash
gem 'jwt'
bundle install
```

## Create a JsonWebToken class {{{ data-action=code data-code="lib/json_web_token.rb" }}}

Create a class called `JsonWebToken` which decodes and verifies the incoming Access Token taken from the `Authorization` header of the request.

This will fetch the public key for your Auth0 tenant then use it to verify the signature of the Access Token.

## Define a Secured concern {{{ data-action=code data-code="app/controllers/concerns/secured.rb" }}}

Create a Concern called `Secured` which looks for the Access Token in the `Authorization` header of an incoming request.

If the token is present, it will be passed to `JsonWebToken.verify` which will use the `jwt` Gem to verify the token's signature and validate the token's claims.

In addition to verifiying that the Access Token included in the request is valid, the Concern also includes a mechanism for checking that the token has the sufficient **scope** to access the requested resources.

To look for a particular `scope` in an Access Token, provide an array of required scopes and check if they are present in the payload of the token.

In this example we define a `SCOPES` array for all protected routes, specifying the required scopes for each one.

For the `/private-scoped` route, the scopes defined will be intersected with the scopes coming in the payload, to determine if it contains one or more items from the other array.

## Create the public endpoint {{{ data-action=code data-code="app/controllers/concerns/public_controller.rb" }}}

Create a controller to handle the public endpoint `/api/public`.

The `/public` endpoint does not require to use the `Secured` concern as it is accessible to non-authenticated requests.

## Create the private endpoints {{{ data-action=code data-code="app/controllers/concerns/private_controller.rb" }}}

Create a controller to handle the private endpoints: `/api/private` and `/api/private-scoped`.

`/api/private` is available for authenticated requests containing an Access Token with no additional scopes.

`/api/private-scoped` is available for authenticated requests containing an Access Token with the `read:messages` scope granted 

The protected endpoints need to include the `Secured` concern. The scopes required for each one are defined in the code of the `Secured` concern.

<%= include('../_includes/_call_api') %>

::::checkpoint
:::checkpoint-default
Now that you have configured your application, run your application to verify that:
* `GET /api/public` is available for non-authenticated requests.
* `GET /api/private` is available for authenticated requests.
* `GET /api/private-scoped` is available for authenticated requests containing an Access Token with the `read:messages` scope.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the token is added as the `Authorization` header
* does the token have the correct scopes? You can use [jwt.io](https://jwt.io/) to verify.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
