---
title: Authorization
description: Build a Laravel backend API that authorizes requests for protected routes using access tokens with the Auth0 Laravel SDK.
topics:
  - quickstarts
  - backend
  - laravel
  - authorization
contentType: tutorial
useCase: quickstart
default: true
github:
  path: app
---

## Create an Application and API

Download the [Auth0 CLI](https://github.com/auth0/auth0-cli) to your working directory:

```shell
curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .
```

Run the following command to authenticate with your Auth0 account:

```shell
./auth0 login
```

Next, run the following command to create a new application with Auth0:

```shell
./auth0 apps create \
  --name "My Laravel Backend Application" \
  --type "regular" \
  --auth-method "post" \
  --callbacks "http://localhost:8000/callback" \
  --logout-urls "http://localhost:8000" \
  --reveal-secrets \
  --no-input
```

Make a note of your tenant domain and client ID. These are necessary for SDK configuration later.

Next, run the following command to create a new API with Auth0:

```shell
./auth0 apis create \
  --name "My Laravel Backend Application's API" \
  --identifier "https://github.com/auth0-samples/auth0-laravel-api-samples" \
  --offline-access \
  --no-input
```

## Create a Laravel Application

Open a shell to a preferred directory for your new project, and run the following command:

```shell
composer create-project --prefer-dist laravel/laravel auth0-laravel-api
```

Then `cd` into your new project directory:

```shell
cd auth0-laravel-api
```

## Install the Auth0 Laravel SDK

Run the following command within your project directory to install the [Auth0 Laravel SDK](https://github.com/auth0/laravel-auth0):

```shell
composer require auth0/login
```

## Configure the SDK

Run the following command to generate an SDK configuration file for your application:

```shell
php artisan vendor:publish --tag auth0-config
```

Open the `.env` file in your project directory. Append the following to the end of the file:

```sh
# This informs the SDK of the application type and tailors it's behavior.
AUTH0_STRATEGY=api

# Your Auth0 account's tenant domain.
AUTH0_DOMAIN=${account.namespace}

# Your Auth0 application's client ID.
AUTH0_CLIENT_ID=${account.clientId}

# Your Auth0 API's identifier/audience.
AUTH0_AUDIENCE=${apiIdentifier}
```

## Configure the Guard

Open the `config/auth0.php` file. We will update this to add a new Guard and Provider that uses the SDK.

Find the `guards` array, and add an entry to it:

```php
/**
 * Register the SDK's Guard with your application.
 * You should not remove any other entries from this array.
 */
'guards' => [
  'my-example-guard' => [
    'driver' => 'auth0.driver',
    'provider' => 'my-example-provider',
  ],
],
```

Next, find the `providers` array, and add an entry to it:

```php
/**
 * Register the SDK's User Provider with your application.
 * You should not remove any other entries from this array.
 */
'providers' => [
  'my-example-provider' => [
    'driver' => 'auth0.provider',
    'repository' => \Auth0\Laravel\Auth\User\Repository::class
  ],
],
```

## Protect Routes

Routes are rotected by the SDK using Middleware. For this demonstration, we will have three routes available, each using a distinct middleware configuration:

- `GET /api` is a public route. It uses the `auth0.authorize.optional` middleware. Anyone can access this route.
- `GET /api/protected` is a protected route. It uses the `auth0.authorize` middleware. You need an access token to access this route.
- `GET /api/scoped` is another protected route using the `auth0.authorize` middleware; it requires the access token have a specific scope granted. You need an access token with the `read:messages` scope to access this route.

Replace the contents of your application's `routes/api.php` file with the following:

```php
<?php

Route::middleware('guard:my-example-guard')->group(function () {

    Route::get('/api', function () {
        return response()->json([
            'message' => 'This is a public route. Anyone can access this.',
            'authorized' => Auth::check(),
            'details' => auth()?->user()?->getAttributes(),
        ], 200, [], JSON_PRETTY_PRINT);
    })->middleware('auth0.authorize.optional');

    Route::get('/api/protected', function () {
        return response()->json([
            'message' => 'This is a protected route. You need an access token to see this.',
            'authorized' => Auth::check(),
            'details' => auth()?->user()?->getAttributes(),
        ], 200, [], JSON_PRETTY_PRINT);
    })->middleware('auth0.authorize');

    Route::get('/api/scoped', function () {
        return response()->json([
            'message' => 'This is a protected route. You need an access token with the `read:messages` scope granted to see this.',
            'authorized' => Auth::check(),
            'details' => auth()?->user()?->getAttributes(),
        ], 200, [], JSON_PRETTY_PRINT);
    })->middleware('auth0.authorize:read:messages');

});
```

## Run the Application

You are now ready to start your new application, so it can accept requests:

```shell
php artisan serve
```

## Prepare an Access Token

This demonstration backend API authorizes requests using access tokens provided as a header with each request. The requesting client (such a single page application or native client) handles the retrieval and storage of access tokens, and the backend API doesn't need to maintain any state information for clients. You can learn more about [retrieving access tokens here.](https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens)

For the purposes of testing this application, you can use an access token from the "test" view of your [API settings](https://manage.auth0.com/#/apis).

## Send a Network Request

Run the following command to request the public route:

```shell
curl --request GET \
  --url http://localhost:8000/api
```

Next, use your access token in an `Authorization` header to request a protected route:

```shell
curl --request GET \
  --url http://localhost:8000/api/protected \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

Finally, try requesting the scope-protected route, which will only succeed if your access token has the  `read:messages` scope granted:

```shell
curl --request GET \
  --url http://localhost:8000/api/scoped \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```
