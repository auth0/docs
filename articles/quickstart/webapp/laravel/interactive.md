---
title: Add Login to your Laravel application
description: This guide demonstrates how to integrate Auth0 with a Laravel application using the Auth0 Laravel SDK.
budicon: 448
topics:
  - quickstart
  - webapp
  - laravel
  - authentication
  - login
  - user profile
  - logout
  - php
  - laravel
github:
  path: app
contentType: tutorial
useCase: quickstart
interactive: true
files:
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

If you don't already have a Laravel 9 or 10 application, you'll need to create one. Open a shell to a preferred directory for your new project, and run the following command:

```shell
composer create-project --prefer-dist laravel/laravel auth0-laravel-app && cd auth0-laravel-app
```

### Install the SDK

Run the following command within your project directory to install the [Auth0 Laravel SDK](https://github.com/auth0/laravel-auth0):

```shell
composer require auth0/login:^7.0 --with-all-dependencies
```

## Configure the SDK

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

# Used for encrypting session cookies. This should be a long, secret value.
# You can generate a suitable string using `openssl rand -hex 32`.
AUTH0_COOKIE_SECRET=
```

Be sure to assign a value to `AUTH0_COOKIE_SECRET`.

## Configure the Guard {{{ data-action=code data-code="config/auth.php" }}}

Your `config/auth.php` file defines Laravel's authentication configuration. You need to update this file to add a new Guard and Provider for the Auth0 SDK.

- The `guards` array defines the authentication guards for your application. A guard defines how your users are authenticated, and the driver defines how the guard functions. The SDK provides an `auth0.guard` driver that you will use to authenticate users with Auth0.

- The `providers` array defines the user providers for your application. A user provider defines how users are stored or retrieved from your application. You will need to create a provider with a `auth0.provider` driver.

## Protecting Routes {{{ data-action=code data-code="routes/web.php#11:44" }}}

Middleware is provided by the SDK to protect your application's routes. The middleware filters incoming requests entering your application, determines if the user is authenticated, and sets up the user state for your application.

- The `auth0.authenticate` middleware requires a user to be authenticated. If a user is not authenticated, the middleware will redirect the user to the login route.

- The `auth0.authenticate.optional` middleware will not redirect the user to the login route if a user is not authenticated. Instead, the middleware will allow the request to continue, and the user will be considered a guest.

Both of these middleware types can also be configured to restrict access to routes for users granted specific scopes.

These middleware are responsible for setting up the user's authenticated state for your application, so you must apply one with each of your routes for the SDK to function.

## Authenticating Users {{{ data-action=code data-code="routes/web.php#7:9" }}}

Routing controllers are also provided by the SDK to handle authentication. These controllers are responsible for preparing the user's session, redirecting them to the Auth0 Universal Login Page, and completing the authentication process.

- `Auth0\Laravel\Http\Controller\Stateful\Login` is responsible for preparing the user's session and redirecting them to the Auth0 Universal Login Page.

- `Auth0\Laravel\Http\Controller\Stateful\Callback` is responsible for completing the authentication process, and redirecting the user to the appropriate route.

- `Auth0\Laravel\Http\Controller\Stateful\Logout` is responsible for logging the user out of your application.

::::checkpoint
:::checkpoint-default

**Try visiting the `/login` route and authenticating.** You should now be able to log in and out of your application using Auth0.

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

You can use the standard Laravel authentication API to work with users, including `id()`, `user()`, and `check()`.

For making changes to users, you can use the [Auth0 Management API](https://github.com/auth0/laravel-auth0/blob/main//docs/User%20Models%20and%20Repositories.md). Every Management API endpoint is accessible through the SDK `management()` shortcut method.

In this example, the `/update` route will issue a Management API call to update the user's favorite color to a random color each time they visit.

::::checkpoint
:::checkpoint-default

**Try visiting the `/update` route to randomize your "favorite color" value.** These changes are saved to the user's profile metadata with Auth0.

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
