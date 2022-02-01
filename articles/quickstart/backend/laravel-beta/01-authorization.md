---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Laravel API.
topics:
    - quickstart
    - backend
    - laravel
contentType: tutorial
useCase: quickstart
default: true
github:
   path: app
---

This quickstart covers building an API protected by an Auth0-issued Access Token. This type of API is typically consumed by:

- Mobile, desktop, and other native applications using the [Native login flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce)
- CLIs, daemons, or services running on your backend using the [Client Credentials Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow)

Suppose this API is only consumed by a web application on the same domain (in the case of AJAX actions or lazy loading content for an authenticated user). In that case, the API protection should be handled by the application itself and the [login flow secured by Auth0](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow).

<%= include('../_includes/_api_auth_preamble') %>

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

## Create a Laravel Application

If you already have a Laravel 9 application, you can skip to the next step!

Let's begin by setting up a new project directory for Laravel. Open your terminal/shell and run the following command — replacing `FOLDER_NAME` with a folder name of your choice to create and install Laravel within.

```sh
composer create-project --prefer-dist laravel/laravel FOLDER_NAME dev-master
```

Navigate into this new project folder before continuing. You'll want to run any instructed terminal/shell commands from this new directory from now on. We'll refer to this your project root directory.

## Install the Auth0 Laravel SDK

For this project, we'll be using [Auth0's Laravel SDK](ttps://github.com/auth0/laravel-auth0) to protect our Laravel routes. The SDK offers middleware you can apply to your routes, checking for and verifying bearer tokens in the 'Authorization' header of an incoming HTTP request.

From your project's root directory, use Composer to require the SDK in your application:

```sh
composer require auth0/login:dev-main
```

## Configure the SDK

Next, we'll want to install the Auth0 Laravel SDK's configuration file. From your project's root directory, run the following command:

```sh
php artisan vendor:publish --tag=auth0-config
```

You'll find a new file in your application's `config` folder called `auth0.php`. Although it's available to you to edit by hand, we strongly recommend keeping your Auth0 configuration details in your `.env` file as a best practice instead.

Open up the `.env` file in your favorite editor from your project's root directory. We'll need to provide the Laravel SDK with some essential details about our Auth0 integration:

```sh
# This tells the Laravel SDK about your use case to customize its behavior.
# The 'api' strategy is used for backend API applications like we're building here.
AUTH0_STRATEGY=api

# The URL of your Auth0 tenant domain
# You'll find this in your Auth0 Application's settings page.
AUTH0_DOMAIN=${account.namespace}

# Your Auth0 application's Client ID
# You'll find this in your Auth0 Application's settings page.
AUTH0_CLIENT_ID=${account.clientId}

# Your Auth0 Custom API identifier/audience.
# You'll find this in your Custom API's settings page.
AUTH0_AUDIENCE=${apiIdentifier}
```

## Configure Laravel

Next, we need to tell Laravel to use the guards and middleware provided by the Auth0 Laravel SDK in your application. Laravel defines these relationships inside the `config\auth.php` file. Let's open that file and begin wiring the SDK:

First, locate the `defaults` section. We'll set the default `guard` to `auth0`, like this:

```php
'defaults' => [
    'guard' => 'auth0',
    'passwords' => 'users',
],
```

Next, locate the `guards` section, and we'll define Auth0 there:
```php
'guards' => [
    // 📝 Any additional guards you use should stay here, too.

    'auth0' => [
        'driver' => 'auth0',
        'provider' => 'auth0',
    ],
],
```

Finally, locate the `providers` section, and add Auth0 there as well:
```php
'providers' => [
    // 📝 Any additional providers you use should stay here, too.

    'auth0' => [
        'driver' => 'auth0',
        'repository' => \Auth0\Laravel\Auth\User\Repository::class
    ],
],
```

## Add Middleware

Finally, we need to apply the Auth0 Laravel SDK middleware to protect our routes. Let's define three routes to demonstrate them. Open up your `routes/web.php` file and replace the contents with the following:

```php
// 📂 routes/web.php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (Auth::check()) {
        return response()->json([
            'authorized' => true,
            'user' => json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true),
        ], 200, [], JSON_PRETTY_PRINT);
    }

    return response()->json([
        'authorized' => false,
        'user' => null,
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize.optional']);
```

This route demonstrates the `auth0.authorize.optional` middleware. This middleware will resolve an available bearer token when provided (allowing you to access the token's properties through the `Auth::user()` command) but won't block requests without a token either, allowing you to treat such requests as "guest" requests.

Let's add another to that file:

```php
// 👆 Continued from above, in routes/web.php

Route::get('/required', function () {
    return response()->json([
        'authorized' => true,
        'user' => json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true),
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize']);
```

The `auth0.authorize` middleware will resolve a bearer token as above, but this middleware will completely block any requests that don't pass a valid Access Token to your application.

Finally, let's demonstrate that same middleware with scopes:

```php
// 👆 Continued from above, in routes/web.php

Route::get('/scoped', function () {
    return response()->json([
        'authorized' => true,
        'user' => json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true),
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize:read:messages']);
```

In passing the `read:messages` argument to the same `auth0.authorize` middleware example as above, we further restrict access to only requests passing a valid Access Token with that scope.

## Run your application

You've installed Laravel, the SDK, configured your application, and set up some routes — all that's left is to run your new application!

```sh
php artisan serve --port=3000
```

You can now access your application from your web browser by visiting https://127.0.0.1:3000.

We can test these new routes by manually generating an Access Token for the API. In the Auth0 Dashboard, go to the **Test** tab for the API you created and click the **COPY TOKEN** link.

:::note
If you see a button to **Create & Authorize Test Application**, you'll need to click that before the **COPY TOKEN** button appears. After creating the test Application, click the **Machine to Machine Applications** tab, scroll down to the Application that was created, click the down icon, remove the `read:messages` permissions allowed for that Application, and click **Update**. Now click the **Test** tab, then **COPY TOKEN** to proceed.
:::

- Try sending a `GET` request using to the public route `http://127.0.0.1:3000/` and you should receive back a successful response.
- Try sending a `GET` request to the private route `http://127.0.0.1:3000/required` and you'll receive an error response.
- Add an `Authorization` header set to `Bearer API_TOKEN_HERE` using the Access Token you generated above, and send the `GET` request to the private route again and you should receive a successful response.
- Try sending a `GET` request to the scoped route `http://127.0.0.1:3000/scoped` using Access Tokens with and without the `read:messages` permission to see how the route is protected under those circumstances.
