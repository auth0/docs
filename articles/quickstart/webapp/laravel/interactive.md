---
title: Add Login to your Laravel application
description: This guide demonstrates how to integrate Auth0 with a Laravel application using the Auth0 Laravel SDK.
budicon: 448
topics:
  - quickstart
  - backend
  - laravel
github:
  path: app
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/env
  - files/auth
  - files/web
---

# Add login to your Laravel application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Laravel web application using the Auth0 Laravel SDK.

## Create an Application and API

Download the [Auth0 CLI](https://github.com/auth0/auth0-cli) to your working directory:

```shell
curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .
```

Run the following command and authenticate with your Auth0 account:

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

**Note your tenant domain, client ID, and client secret.** These will be necessary during SDK configuration later.

Next, run the following command to create a new API with Auth0:

```shell
./auth0 apis create \
  --name "My Laravel Application's API" \
  --identifier "https://github.com/auth0-samples/auth0-laravel-php-web-app" \
  --offline-access \
  --no-input
```

## Create a Laravel application

Open a shell to a preferred directory for your new project, and run the following command:

```shell
composer create-project --prefer-dist laravel/laravel auth0-laravel-app
```

Then `cd` into your new project directory:

```shell
cd auth0-laravel-app
```

### Install the SDK

Run the following command within your project directory to install the [Auth0 Laravel SDK](https://github.com/auth0/laravel-auth0):

```shell
composer require auth0/login:^7.0 --with-all-dependencies
```

## Configure the SDK {{{ data-action=code data-code="env.php" }}}

Run the following command to generate an SDK configuration file for your application:

```shell
php artisan vendor:publish --tag auth0-config
```

Open the `.env` file in your project directory. Append the following to the end of the file:

```ini
APP_URL=http://localhost:8000

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

Be sure to assign a value to `AUTH0_COOKIE_SECRET`.

## Configure the Guard {{{ data-action=code data-code="config/auth.php" }}}

Open the `config/auth0.php` file. We will update this to add a new Guard and Provider that uses the SDK.

Find the `guards` array, and add an entry to it:

```php
/**
 * Register the SDK's Guard with your application.
 * You should not remove any other entries from this array.
 */
'guards' => [
  'my-example-guard' => [
    'driver' => 'auth0.guard',
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

::::checkpoint
:::checkpoint-default

Your Laravel application is now set up with the Auth0 SDK, and you're ready to begin integrating functionality.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- Try running `php artisan optimize:clear` to clear Laravel's cache.
- Ensure you have the correct `.env` file changes in place.
- Make sure the Domain, Client ID, and Client Secret are configured correctly.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Protecting Routes {{{ data-action=code data-code="routes/web.php#11:44" }}}

Middleware is provided by the SDK to protect your application's routes. The middleware filters incoming requests entering your application, determines if the user is authenticated, and sets up the user state for your application.

Replace the contents of your application's `routes/web.php` file with the following:

```php
<?php

use Illuminate\Support\Facades\Route;
use Auth0\Laravel\Http\Controller\Stateful\{Login, Logout, Callback};

Route::middleware('guard:my-example-guard')->group(function () {
    Route::get('/', function () {
        if (auth()?->check()) {
            $user = json_encode(auth()?->user()?->getAttributes(), JSON_PRETTY_PRINT);

            return response(<<<"HTML"
                <h1>Welcome! You are logged in.</h1>
                <div><pre>{$user}</pre></div>
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

::::checkpoint
:::checkpoint-default

Your application now has protected routes, but users need to be able to log in before they can use them. We'll add support for that next.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- Try running `php artisan optimize:clear` to clear Laravel's cache.
- Ensure you have the correct `.env` file changes in place.
- Make sure the Domain, Client ID, and Client Secret are configured correctly.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Authenticating Users {{{ data-action=code data-code="routes/web.php#7:9" }}}

Routing controllers are also provided by the SDK to handle authentication. These controllers are responsible for preparing the user's session, redirecting them to the Auth0 Universal Login Page, and completing the authentication process.

Prefix your application's `routes/web.php` file with the following:

```php
<?php

use Auth0\Laravel\Http\Controller\Stateful\{Login, Logout, Callback};

Route::middleware('guard:my-example-guard')->group(function () {
    Route::get('/login', Login::class)->name('login');
    Route::get('/logout', Logout::class)->name('logout');
    Route::get('/callback', Callback::class)->name('callback');
});
```

::::checkpoint
:::checkpoint-default

Users should now be able to log in and out of your application using Auth0. Try visiting the `/login` route and authenticate.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- Try running `php artisan optimize:clear` to clear Laravel's cache.
- Ensure you have the correct `.env` file changes in place.
- Make sure the Domain, Client ID, and Client Secret are configured correctly.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Working with Users {{{ data-action=code data-code="routes/web.php#46:70" }}}

You can use the standard Laravel authentication API to work with users, including `id()`, `user()`, and `check()`. For making changes to users, you should use the [Auth0 Management API](https://github.com/auth0/laravel-auth0/blob/main//docs/User%20Models%20and%20Repositories.md).

Update your application's `routes/web.php` file, and add the following route to the group:

```php
Route::get('/update', function () {
    $colors = ['black', 'white', 'red', 'blue', 'yellow', 'green'];

    app('auth0')
    ->management()
    ->users()
    ->update(
        id: auth()->id(),
        body: [
            'user_metadata' => [
                'favorite_color' => $colors[rand(0, count($colors))],
            ],
        ]
    );

    auth()->refreshUser();

    $user = json_encode(auth()?->user()?->getAttributes(), JSON_PRETTY_PRINT);

    return response(<<<"HTML"
        <h1>Welcome! Your favorite color has been updated.</h1>
        <div><pre>{$user}</pre></div>
        <p>Would you like to <a href="/logout">logout</a>?</p>
    HTML);
})->middleware('auth0.authenticate');
```

::::checkpoint
:::checkpoint-default

Try visiting the `/update` route to randomize the user's "favorite color" value, stored in their metadata.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- Try running `php artisan optimize:clear` to clear Laravel's cache.
- Ensure you have the correct `.env` file changes in place.
- Make sure the Domain, Client ID, and Client Secret are configured correctly.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Run the Application

You are now ready to start your new Laravel application, so it can accept requests:

```shell
php artisan serve
```

::::checkpoint
:::checkpoint-default
You can test your new Laravel application by visiting the following URLs:

- Open a browser to [http://localhost:8000](http://localhost:8000) to see the public route.
- Visit [/protected](http://localhost:8000/protected) to be redirected to login.
- Visit [/scoped](http://localhost:8000/scoped). (If you don't have the `read:messages` scope, you'll be denied access.)
- Visit [/logout](http://localhost:8000/logout) to log out.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:

- Try running `php artisan optimize:clear` to clear Laravel's cache.
- Ensure you have the correct `.env` file changes in place.
- Make sure the Domain, Client ID, and Client Secret are configured correctly.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

### Additional Reading

- [User Repositories and Models](https://github.com/auth0/laravel-auth0/blob/main/docs/User%20Models%20and%20Repositories.md) extends the Auth0 Laravel SDK to use your own user models, and how to store and retrieve users from a database.
- [Hooking Events](https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md) covers how to listen for events raised by the Auth0 Laravel SDK, to fully customize the behavior of your integration.
- [Management API](https://github.com/auth0/laravel-auth0/blob/main/docs/Management%20API.md) support is built into the Auth0 Laravel SDK, allowing you to interact with the Management API from your Laravel application.
