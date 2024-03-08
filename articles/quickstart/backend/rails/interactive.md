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
  - files/application_controller
  - files/auth0_client
  - files/secured
  - files/public
  - files/private
---
<!-- markdownlint-disable MD041 MD025 -->

# Add Authorization to Your Ruby on Rails API
This tutorial performs access token validation using the  **[jwt](https://github.com/jwt/ruby-jwt)** Gem within a custom `Auth0Client` class. A Concern called `Secured` is used to authorize endpoints which require authentication through an incoming access token.

If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing API for your project.

To set up your first API through the Auth0 dashboard, review [our getting started guide](get-started/auth0-overview/set-up-apis).

Each Auth0 API uses the API Identifier, which your application needs to validate the access token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Install dependencies
Install the **jwt** Gem.

```bash
gem 'jwt'
bundle install
```

## Create an Auth0Client class {{{ data-action=code data-code="app/lib/auth0_client.rb" }}}

Create a class called `Auth0Client`. This class decodes and verifies the incoming access token taken from the `Authorization` header of the request.

The `Auth0Client` class retrieves the public key for your Auth0 tenant and then uses it to verify the signature of the access token. The `Token` struct defines a `validate_permissions` method to look for a particular `scope` in an access token by providing an array of required scopes and check if they are present in the payload of the token.

## Define a Secured concern {{{ data-action=code data-code="app/controllers/concerns/secured.rb" }}}

Create a Concern called `Secured` which looks for the access token in the `Authorization` header of an incoming request.

If the token is present, the `Auth0Client.validate_token` will use the `jwt` Gem to verify the token's signature and validate the token's claims.

In addition to verifying that the access token is valid, the Concern also includes a mechanism for confirming the token has the sufficient **scope** to access the requested resources. In this example we define a `validate_permissions` method that receives a block and checks the permissions by calling the `Token.validate_permissions` method from the `Auth0Client` class.

For the `/private-scoped` route, the scopes defined will be intersected with the scopes coming in the payload, to determine if it contains one or more items from the other array.

## Include the Secure concern in your ApplicationController {{{ data-action=code data-code="app/controllers/application_controller.rb" }}}

By adding the `Secure` concern to your application controller, you'll only need to use a `before_action` filter in the controller that requires authorization. 

## Create the public endpoint {{{ data-action=code data-code="app/controllers/public_controller.rb" }}}

Create a controller to handle the public endpoint `/api/public`.

The `/public` endpoint does not require any authorization so no `before_action` is needed.

## Create the private endpoints {{{ data-action=code data-code="app/controllers/private_controller.rb" }}}

Create a controller to handle the private endpoints: `/api/private` and `/api/private-scoped`. 

`/api/private` is available for authenticated requests containing an access token with no additional scopes.

`/api/private-scoped` is available for authenticated requests containing an access token with the `read:messages` scope granted

The protected endpoints need to call the `authorize` method from the `Secured` concern, for that you use `before_action :authorize`, this ensure the `Secured.authorize` method is called before every action in the `PrivateController`. 

<%= include('../_includes/_call_api') %>

::::checkpoint
:::checkpoint-default
Now that you have configured your application, run your application to verify that:
* `GET /api/public` is available for non-authenticated requests.
* `GET /api/private` is available for authenticated requests.
* `GET /api/private-scoped` is available for authenticated requests containing an Access Token with the `read:messages` scope.
:::

:::checkpoint-failure
If your application did not start successfully:
* Verify you added the token as the `Authorization` header
* Ensure the token has the correct scopes. Verify with [jwt.io](https://jwt.io/).

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
