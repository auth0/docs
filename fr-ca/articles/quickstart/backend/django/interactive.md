---
title: Add Authorization to a Django API Application
description: This tutorial demonstrates how to add authorization to a Python API built with Django.
interactive: true
files:
  - files/validator
  - files/views
  - files/urls
github:
  - path: 01-Authorization
  - branch: py-vnext
---

<!-- markdownlint-disable MD041 MD002 MD025 -->

# Add Authorization to Your Django API Application

This guide demonstrates how to integrate Auth0 with any new or existing Python API built with [Django](https://www.djangoproject.com/).

If you haven't created an API in your Auth0 Dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.

Alternatively, you can read our [getting started guide](/get-started/auth0-overview/set-up-apis), which will help you set up your first API through the Auth0 Dashboard.

Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the Access Token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

# Configure Django to use Auth0

## Install dependencies

1. Add the following dependencies to your `requirements.txt`:

```python
# /requirements.txt

Authlib~=1.0.0
Django~=4.0.3
python-dotenv~=0.19.2
```

2. Run `pip install -r requirements.txt`

### Create a Django application

```shell
django-admin startproject apiexample
cd apiexample
```

## Create the JWT validator {{{ data-action=code data-code="apiexample/validator.py" }}}

You're going to use a library called [Authlib](https://github.com/lepture/authlib) to create a [ResourceProtector](https://docs.authlib.org/en/latest/flask/1/resource-server.html), which is a type of [Django view decorator](https://docs.djangoproject.com/en/4.0/topics/http/decorators/) that protects your resources (API views) with a given validator.

The validator will verify the Access Token that you pass to the resource by checking that it has a valid signature and claims.

You can use AuthLib's `JWTBearerTokenValidator` validator with a few tweaks to make sure it conforms to our requirements on [validating Access Tokens](https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens).

To create your `Auth0JWTBearerTokenValidator`, you need to pass it your `domain` and `audience` (API Identifier). It will then get the public key required to verify the token's signature and pass it to the `JWTBearerTokenValidator` class.

You'll then override the class's `claims_options` to make sure the token's `expiry`, `audience`, and `issue` claims are validated according to our requirements.

Create the file `apiexample/validator.py` using the code from the interactive panel.

## Create the API views {{{ data-action=code data-code="apiexample/views.py" }}}

Next, you'll create three API views in `apiexample/views.py`:

- `/api/public`: A public endpoint that requires no authentication.
- `/api/private`: A private endpoint that requires a valid Access Token JWT.
- `/api/private-scoped`: A private endpoint that requires a valid Access Token JWT containing the given `scope`.

The protected routes will have a `require_auth` decorator, which is a `ResourceProtector` that uses the `Auth0JWTBearerTokenValidator` you created earlier.

To create the `Auth0JWTBearerTokenValidator`, you'll pass it your tenant's domain and the API Identifier of the API you created earlier.

The `require_auth` decorator on the `private_scoped` route accepts an additional argument `"read:messages"`, which checks the Access Token for the Permission (Scope) you created earlier.

## Add URL mappings {{{ data-action=code data-code="apiexample/urls.py#8:10" }}}

In previous steps, you added methods to the `views.py` file. You need to map those methods to URLs using Django's [URL dispatcher](https://docs.djangoproject.com/en/4.0/topics/http/urls/), which lets you map URL patterns to views.

Add the URL patterns to `apiexample/urls.py`:

<%= include('../_includes/_call_api') %>
