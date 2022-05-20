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
This guide demonstrates how to integrate Auth0 with any new or existing Laravel API application using the [Auth0 Laravel SDK](https://github.com/auth0/laravel-auth0).

If you haven't created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.

Alternatively, you can read [our getting started guide](get-started/auth0-overview/set-up-apis) that helps you set up your first API through the Auth0 dashboard.

Every API in Auth0 is configured using an API identifier that your application code will use as the audience to validate the access token.

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Create a Laravel application

::: note
If you already have a Laravel 9 application prepared, you can skip this step.
:::

Let's begin by setting up a new Laravel application. Open a shell and run the following command — replacing `DIRECTORY_NAME` with a directory name of preference to create and install Laravel within. The directory cannot already exist.

```sh
composer create-project --prefer-dist laravel/laravel DIRECTORY_NAME dev-master
```

We'll refer to this new directory as our project's root directory. As we work through this tutorial, we'll run any instructed shell commands from within that directory.

Alternatively, you can download a sample project using the **Download Sample** button.

## Install the SDK

Let's install the [Auth0's Laravel SDK](https://github.com/auth0/laravel-auth0) to protect our new Laravel application's routes. The SDK offers a range of middleware types, which will check for and verify any bearer tokens in the 'Authorization' header of an incoming HTTP request.

From a shell opened to our project's root directory, let's use Composer to install the SDK in our application:

```sh
composer require auth0/login
```

## Configure the SDK {{{ data-action=code data-code=".env" }}}

Create the SDK's configuration file by opening a shell to the project's root directory,  and use Laravel's the `vendor:publish` command to import the configuration file into the application:

```sh
php artisan vendor:publish --tag=auth0-config
```

Now we can begin configuring our Auth0 integration by adding options to the `.env` file in our project's root directory. Open that `.env` file and add some essential details for our project.

## Configure the application {{{ data-action=code data-code="config/auth.php" }}}

Now let's connect our Laravel application with the SDK so we can begin working with our Auth0 integration. For this, we will be making changes to our `config\auth.php` file. This file contains a lot of settings, but we only need to make a few small changes.

- In the `defaults` section, set the default `guard` to `auth0`.
- In the `guards` section, add a guard for `auth0`.
- In the `providers` section, add a provider for `auth0`.

## Protecting routes {{{ data-action=code data-code="routes/web.php" }}}

We'll use the SDK's middleware to automatically protect routes using bearer tokens. For this type of application there are different types of middleware available: 

- `auth0.authenticate.optional`: This middleware will resolve an available bearer token when provided (allowing you to access the token's properties through the `Auth::user()` command) but won't block requests without a token, allowing you to treat tokenless requests as "guest" requests.
- `auth0.authenticate`: This middleware will reject requests that do not contain a valid access token.
- `auth0.authenticate:{scope}`: This middleware will reject requests that don't contain a valid access token, or those that contain an access token that does not contain the configured scope, `read:messages` in our example.

Edit the `routes/web.php` file, and add the corresponding routes to that file.

## Run the application

We've installed Laravel and the SDK, configured our application, and set up some routes — all that's left is for us to try out our new application:

```sh
php artisan serve --port=3010
```

::::checkpoint
:::checkpoint-default
Now that you have your application running, verify that:
* `GET /api/public` is available for non-authenticated requests.
* `GET /api/private` is available for authenticated requests.
* `GET /api/private-scoped` is available for authenticated requests containing an access token with the `read:messages` scope.
  :::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the token is added as the `Authorization` header
* does the token have the correct scopes? You can use [jwt.io](https://jwt.io/) to verify.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Call the API

You can call the API from your application by passing an access token in the `Authorization` header of your HTTP request as a Bearer token.

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

### Obtain an access token

If you are calling the API from a single-page application or a mobile/native application, after the authorization flow is completed, you will get an access token. How you get the token and how you make the call to the API will be dependent on the type of application you are developing and the framework you are using. For more information refer to the relevant application quickstarts which contain detailed instructions:

* [Single-page applications](/quickstart/spa)
* [Mobile / native application](/quickstart/native)

If you are calling the API from a command-line tool or another service, where there isn't a user entering their credentials, you need to use the [OAuth Client Credentials flow](/api/authentication#client-credentials). To do that, register a [Machine to Machine Application](${manage_url}/#/applications), and then subsequently use the **Client ID** and **Client Secret** of this application when making the request below and pass those along in the `client_id` and `client_secret` parameters respectively. Also include the Audience for the API you want to call.

:::note
Read [Application Settings](https://auth0.com/docs/get-started/dashboard/application-settings) for more information on getting the Client ID and Client Secret for your machine-to-machine app.
:::

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
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
Auth0 customers are billed based on the number of machine-to-machine access tokens issued by Auth0. Once your application gets an access token it should keep using it until it expires, to minimize the number of tokens requested.
:::

For testing purposes, you can also get an access token from the **Test** tab in your [API settings](${manage_url}/#/apis).