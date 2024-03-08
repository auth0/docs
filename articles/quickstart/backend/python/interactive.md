---
title: Add Authorization to a Flask API application
description: This tutorial demonstrates how to add authorization to a Python API built with Flask.
interactive: true
files:
  - files/validator
  - files/server
github:
  - path: 00-Starter-Seed
  - branch: pyvnext-rewrite
---

<!-- markdownlint-disable MD041 MD002 MD025 -->

# Add Authorization to Your Flask API Application

This guide demonstrates how to integrate Auth0 with any new or existing Python API built with [Flask](https://flask.palletsprojects.com/).

If you haven't created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.

Alternatively, you can read [our getting started guide](get-started/auth0-overview/set-up-apis) that helps you set up your first API through the Auth0 dashboard.

Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the Access Token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

# Configure Flask to Use Auth0

## Install dependencies

Add the following dependencies to your `requirements.txt`:

```python
# /requirements.txt

flask
Authlib
```

## Create the JWT validator {{{ data-action=code data-code="validator.py" }}}

We're going to use a library called [Authlib](https://github.com/lepture/authlib) to create a [ResourceProtector](https://docs.authlib.org/en/latest/flask/1/resource-server.html), which is a type of [Flask decorator](https://flask.palletsprojects.com/patterns/viewdecorators/) that protects our resources (API routes) with a given validator.

The validator will validate the Access Token that we pass to the resource by checking that it has a valid signature and claims.

We can use AuthLib's `JWTBearerTokenValidator` validator with a few tweaks to make sure it conforms to our requirements on [validating Access Tokens](https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens).

To create our `Auth0JWTBearerTokenValidator` we need to pass it our `domain` and `audience` (API Identifier). It will then get the public key required to verify the token's signature and pass it to the `JWTBearerTokenValidator` class.

We'll then override the class's `claims_options` to make sure the token's expiry, audience and issue claims are validated according to our requirements.

## Create a Flask application {{{ data-action=code data-code="server.py" }}}

Next we'll create a Flask application with 3 API routes:

- `/api/public` A public endpoint that requires no authentication.
- `/api/private` A private endpoint that requires a valid Access Token JWT.
- `/api/private-scoped` A private endpoint that requires a valid Access Token JWT that contains the given `scope`.

The protected routes will have a `require_auth` decorator which is a `ResourceProtector` that uses the `Auth0JWTBearerTokenValidator` we created earlier.

To create the `Auth0JWTBearerTokenValidator` we'll pass it our tenant's domain and the API Identifier of the API we created earlier.

The `require_auth` decorator on the `private_scoped` route accepts an additional argument `"read:messages"`, which checks the Access Token for the Permission (Scope) we created earlier.

<%= include('../_includes/_call_api') %>
