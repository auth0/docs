---
title: Login
description: Build a Laravel application that authenticates users with Auth0 using the Auth0 Laravel SDK.
topics:
  - quickstarts
  - webapp
  - laravel
  - authentication
  - login
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
  --name "My Laravel Application" \
  --type "regular" \
  --auth-method "post" \
  --callbacks "http://localhost:8000/callback" \
  --logout-urls "http://localhost:8000" \
  --reveal-secrets \
  --no-input
```

Make a note of your tenant domain, client ID and client secret. These are necessary for SDK configuration later.

Next, run the following command to create a new API with Auth0:

```shell
./auth0 apis create \
  --name "My Laravel Application's API" \
  --identifier "https://github.com/auth0-samples/auth0-laravel-php-web-app" \
  --offline-access \
  --no-input
```

## Create a Laravel Application

Open a shell to a preferred directory for your new project, and run the following command:

```shell
composer create-project --prefer-dist laravel/laravel auth0-laravel-app
```

Then `cd` into your new project directory:

```shell
cd auth0-laravel-app
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
# Your Auth0 account's tenant domain.
AUTH0_DOMAIN=${account.namespace}

# Your Auth0 application's client ID.
AUTH0_CLIENT_ID=${account.clientId}

# Your Auth0 application's client secret.
AUTH0_CLIENT_SECRET=${account.clientSecret}

# Your Auth0 API's identifier/audience.
AUTH0_AUDIENCE=${apiIdentifier}

# Used for encrypting session cookies. This should be a long, secret value.
# You can generate a suitable string using `openssl rand -hex 32`.
AUTH0_COOKIE_SECRET=
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

## Add Login and Logout

Replace the contents of your application's `routes/web.php` file with the following:

```php
<?php

use Auth0\Laravel\Http\Controller\Stateful\{Callback, Login, Logout};

Route::get('/login', Login::class)->name('login');
Route::get('/logout', Logout::class)->name('logout');
Route::get('/callback', Callback::class)->name('callback');
```

Users can now log in to your application by visiting the `/login` route. The process is handled by the SDK's route controllers. Users are redirected at login to the Auth0 Universal Login Page, where they are authenticated. After successfully authenticating, Auth0 returns the users back to your application.

## Protect Routes

Routes are rotected by the SDK using Middleware. For this demonstration, we will have three routes available, each using a distinct middleware configuration:

- `GET /` is a public route. It uses the `auth0.authenticate.optional` middleware. Anyone can access this route.
- `GET /protected` is a protected route. It uses the `auth0.authenticate` middleware. Visitors must already be logged in.
- `GET /scoped` is another protected route. It requires the user have a specific scope granted. Visitors need the `read:messages` scope for this example.

Open your application's `routes/web` file and, after the authentication routes we added in the previous step, append the following:

```php
Route::middleware('guard:my-example-guard')->group(function () {

    Route::get('/', function () {
      if (Auth::check()) {
					return response(<<<'HTML'
						<h1>Welcome! You\'re logged in.</h1>
						<div><pre>${Auth::user()?->getAttribues()}</pre></div>
						<p>Would you like to <a href="/logout">logout</a>?</p>
					HTML);
      }

      return response(<<<'HTML'
        <h1>Hello, Guest!</h1>
        <p>Would you like to <a href="/login">login</a>?</p>
      HTML);
    })->middleware('auth0.authenticate.optional');

    Route::get('/protected', function () {
        return response(<<<'HTML'
          <h1>Hello! This is a protected route.</h1>
          <p>Any logged in users can see this.</p>

          <p>Would you like to <a href="/">go home</a>?</p>
        HTML);
    })->middleware('auth0.authenticate');

    Route::get('/scoped', function () {
        return response(<<<'HTML'
          <h1>This is a protected route with a scope requirement.</h1>
          <p>Only logged in users granted with the `read:messages` scope can see this.</p>

          <p>Would you like to <a href="/">go home</a>?</p>
        HTML);
    })->middleware('auth0.authenticate:read:messages');

});
```

## Run the Application

You are now ready to start your new application, so it can accept requests:

```shell
php artisan serve
```

## Test the Application

- Open a browser to http://localhost:8000 to see the public route.
- Visit http://localhost:8000/protected to be redirected to login.
- You'll be redirected back to http://localhost:8000, which now identifies you as being logged in.
- Visit http://localhost:8000/protected again, which now works.
- Visit http://localhost:8000/scoped. Depending on whether the user has the `read:messages` scoped granted, you'll either see a web page or run into a "forbidden" error page.
- Visit http://localhost:8000/logout to log out.
