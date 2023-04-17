---
title: Add authorization to a Laravel application
description: This tutorial demonstrates how to add authorization to a Laravel API application using the Auth0 Laravel SDK.
topics:
  - quickstart
  - backend
  - laravel
contentType: tutorial
useCase: quickstart
default: true
github:
  path: app
interactive: true
files:
  - files/auth
  - files/env
  - files/web
---

# Add authorization to a Laravel application

Auth0 allows you to add authorization to almost any application type quickly. This guide demonstrates how to integrate Auth0 with any new or existing Laravel API application using the [Auth0 Laravel SDK](https://github.com/auth0/laravel-auth0).

If you haven't created an API in your Auth0 Dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project with which you want to integrate.

Alternatively, you can read [our getting started guide](get-started/auth0-overview/set-up-apis) that helps you set up your first API through the Auth0 Dashboard.

Every API in Auth0 is configured using an API identifier that your application code will use as the audience to validate the access token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions

<%= include('../_includes/_api_scopes_access_resources') %>

## Create a Laravel application

::: note
If you already have a Laravel 9 application prepared, you can skip this step.
:::

Begin by setting up a new Laravel application. Open a shell and run the command below. Replace `DIRECTORY_NAME` with a preferred directory name to create and install in Laravel. The directory cannot already exist.

```sh
composer create-project --prefer-dist laravel/laravel DIRECTORY_NAME
```

This new directory is the project's root directory. As you work through this tutorial, run any instructed shell commands from within that directory.

Alternatively, you can download a sample project using the **Download Sample** button.

## Install the SDK

Install the [Auth0's Laravel SDK](https://github.com/auth0/laravel-auth0) to protect your new Laravel application's routes. The SDK offers a range of middleware types, which check for and verify any bearer tokens in the 'Authorization' header of an incoming HTTP request.

In your project's root directory, use Composer to install the SDK in your application:

```sh
composer require auth0/login
```

## Configure the SDK {{{ data-action=code data-code=".env" }}}

Create the SDK's configuration file from the project's root directory. Use Laravel's the `vendor:publish` command to import the configuration file into the application:

```sh
php artisan vendor:publish --tag auth0-config
```

Now, configure your Auth0 integration by adding options to the `.env` file in the project's root directory. Open the `.env` file to add essential details for your project.

## Configure the application {{{ data-action=code data-code="config/auth.php" }}}

Now, connect your Laravel application with the SDK so you can work with your Auth0 integration. For this, make changes to your `config\auth.php` file. This file contains different settings, but you only need to make a few changes.

- In the `defaults` array, set the default value for `guard` to `myAuth0Guard`.
- In the `guards` array, add a new guard named `myAuth0Guard`.
  - Set the `driver` set to `auth0.guard`.
  - Configure the `provider` to be `myAuth0Provider`.
- In the `providers` array, add a new provider named `myAuth0Provider`.
  - Set the `driver` set to `auth0.provider`.
  - Configure the `repository` to be `\Auth0\Laravel\Auth\User\Repository::class`.

## Configure routes {{{ data-action=code data-code="routes/web.php" }}}

Use the SDK's middleware to automatically protect routes that use bearer tokens. For this type of application, there are different types of middleware available:

- `auth0.authenticate.optional`: This middleware resolves an available bearer token when provided and allows you to access the token's properties through the `Auth::user()` command. Requests won't be blocked without a token, but treat tokenless requests as "guest" requests.
- `auth0.authenticate`: This middleware rejects requests that do not contain a valid access token.
- `auth0.authenticate:{scope}`: This middleware rejects requests that don't contain a valid access token, or that contain an access token that does not contain the configured scope, something similar to `read:messages` scope in our example.

Edit the `routes/web.php` file, and add the corresponding routes to that file.

## Run the application

So far you have installed Laravel and the Auth0 SDK, configured our application, and set up some routes — all that's left is to try out your new application:

```sh
php artisan serve --port=3010
```

::::checkpoint
:::checkpoint-default
Now that you have your application running, verify that:

- `GET /api/public` is available for non-authenticated requests.
- `GET /api/private` is available for authenticated requests.
- `GET /api/private-scoped` is available for authenticated requests containing an access token with the `read:messages` scope.
  :::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- make sure the token is added as the `Authorization` header
- does the token have the correct scopes? You can use [jwt.io](https://jwt.io/) to verify.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Call the API

Call the API from your application by passing an access token in the `Authorization` header of your HTTP request as a Bearer token.

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private",
  "headers": [{ "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }]
}
```

### Obtain an access token

If you call the API from a single-page application or a mobile/native application, you receive an access token after the authorization flow is complete. The type of application and framework determine how you get the token and how you make the call to the API. For more information, refer to the relevant application quickstarts which contain detailed instructions:

- [Single-page applications](/quickstart/spa)
- [Mobile / native application](/quickstart/native)

If you call the API from a command-line tool or another service in which a user doesn't supply their credentials, use the [OAuth Client Credentials flow](/api/authentication#client-credentials). To do that, register a [Machine to Machine Application](${manage_url}/#/applications), and use the **Client ID** and **Client Secret** of this application when you make the request below and pass those along in the `client_id` and `client_secret` parameters. Also include the `aud` parameter for the API you want to call.

:::note
Read [Application Settings](https://auth0.com/docs/get-started/dashboard/application-settings) for more information on getting the Client ID and Client Secret for your machine-to-machine app.
:::

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [{ "name": "Content-Type", "value": "application/x-www-form-urlencoded" }],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "client_credentials"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "audience",
        "value": "YOUR_API_IDENTIFIER"
      }
    ]
  }
}
```

:::note
Auth0 customers are billed based on the number of machine-to-machine access tokens issued by Auth0. Once your application gets an access token, it should keep using that access token until it expires to minimize the number of tokens requested.
:::

For testing purposes, you can also get an access token from the **Test** tab in your [API settings](${manage_url}/#/apis).
