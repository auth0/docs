---
title: Authorization
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
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

## Create a Laravel Application

::: note
If you already have a Laravel 9 application prepared, you can skip this step.
:::

Let's begin by setting up a new Laravel application. Let's open a shell and run the following command — replacing `DIRECTORY_NAME` with a directory name of preference to create and install Laravel within. The directory cannot already exist.

```sh
composer create-project --prefer-dist laravel/laravel DIRECTORY_NAME
```

We'll refer to this new directory as our project's root directory. As we work through this tutorial, we'll run any instructed shell commands from within that directory.

## Install the SDK

Let's install the [Auth0's Laravel SDK](https://github.com/auth0/laravel-auth0) to protect our new Laravel application's routes. The SDK offers a range of middleware types we can use which will check for and verify any bearer tokens in the 'Authorization' header of an incoming HTTP request.

From a shell opened to our project's root directory, let's use Composer to install the SDK in our application:

```sh
composer require auth0/login
```

## Configure the SDK

Next, let's create the SDK's configuration file. Again from a shell opened to our projects root directory, let's use Laravel's the `vendor:publish` command to import the configuration file into our application:

```sh
php artisan vendor:publish --tag auth0-config
```

Now we can begin configuring our Auth0 integration by adding options to the `.env` file in our project's root directory. Let's open that `.env` file and add some essential details for our project:

```sh
# This tells the Auth0 Laravel SDK about your use case to customize its behavior.
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

## Configure the application

Now let's connect our Laravel application with the SDK so we can begin working with our Auth0 integration. For this, we'll be making changes to our `config\auth.php` file. This file contains a lot of settings, but we only need to make a few small changes.

To start, let's find the `defaults` section. We'll set the default `guard` to `auth0`, like this:

```php
// 📂 config/auth.php

'defaults' => [
    'guard' => 'auth0',
    // 📝 Leave any other settings in this section alone.
],
```

Next, find the `guards` section, and add `auth0` there:
```php
// 👆 Continued from above, in config/auth.php

'guards' => [
    // 📝 Any additional guards you use should stay here, too.

    'auth0' => [
        'driver' => 'auth0',
        'provider' => 'auth0',
    ],
],
```

Finally, find the `providers` section, and add `auth0` there as well:
```php
// 👆 Continued from above, in config/auth.php

'providers' => [
    // 📝 Any additional providers you use should stay here, too.

    'auth0' => [
        'driver' => 'auth0',
        'repository' => \Auth0\Laravel\Auth\User\Repository::class
    ],
],
```

## Protecting routes

We'll use the SDK's middleware to automatically protect these using bearer tokens. For this type of application there are types of middleware available for us to use. Let's create three routes to demonstrate each one.

We'll need to edit our `routes/web.php` file, and add the following routes to that file:

```php
// 📂 routes/web.php
// 👆 Keep anything already present in the file, just add the following ...

Route::get('/api/public', function () {
    return response()->json([
        'message' => 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
        'authorized' => Auth::check(),
        'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize.optional']);
```

This route demonstrates the `auth0.authorize.optional` middleware. This middleware will resolve an available bearer token when provided (allowing you to access the token's properties through the `Auth::user()` command) but won't block requests without a token either, allowing you to treat tokenless requests as "guest" requests.

Let's add another to that file:

```php
// 👆 Continued from above, in routes/web.php

Route::get('/api/private', function () {
    return response()->json([
        'message' => 'Hello from a private endpoint! You need to be authenticated to see this.',
        'authorized' => Auth::check(),
        'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize']);
```

Similar to the `optional` middleware above, the `auth0.authorize` middleware will resolve a bearer token for us, but this middleware will reject any requests that don't pass a valid Access Token for our application.

```php
// 👆 Continued from above, in routes/web.php

Route::get('/api/private-scoped', function () {
    return response()->json([
        'message' => 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
        'authorized' => Auth::check(),
        'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize:read:messages']);
```

In this demonstration we're using the `auth0.authorize` middleware with an extra check: the request will be rejected if the Access Token is invalid or doesn't include the required scope (in this case `read:messages`.)

## Run the application

We've installed Laravel and the SDK, configured our application, and set up some routes — all that's left is for us to try out our new application:

```sh
php artisan serve --port=3010
```

We're all set our new application is live and waiting for us. Give it a try by loading [http://localhost:3010/api/public](http://localhost:3010/api/public) in your web browser.

Move on to the next section, "using your API", to learn more about how to interface with these routes.
