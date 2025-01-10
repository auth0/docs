---
title: Add Login to a Laravel Application
description: Auth0's Laravel SDK allows you to quickly add authentication, user profile management, and routing access control to your Laravel application. This guide demonstrates how to integrate Auth0 with a new or existing Laravel 9 or 10 application.
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
  - files/web
---

# Add Login to Your Laravel Application

[Auth0's Laravel SDK](https://github.com/auth0/laravel-auth0) allows you to quickly add authentication, user profile management, and routing access control to your Laravel application. This guide demonstrates how to integrate Auth0 with a new (or existing) [Laravel 9 or 10](https://github.com/auth0/laravel-auth0#support-policy) application.

## Laravel Installation

**If you do not already have a Laravel application set up**, open a shell to a suitable directory for a new project and run the following command:

```shell
composer create-project --prefer-dist laravel/laravel auth0-laravel-app ^9.0
```

All the commands in this guide assume you are running them from the root of your Laravel project, directory so you should `cd` into the new project directory:

```shell
cd auth0-laravel-app
```

## SDK Installation

Run the following command within your project directory to install the [Auth0 Laravel SDK](https://github.com/auth0/laravel-auth0):

```shell
composer require auth0/login:^7.8 --update-with-all-dependencies
```

Then generate an SDK configuration file for your application:

```shell
php artisan vendor:publish --tag auth0
```

## SDK Configuration

Run the following command from your project directory to download the [Auth0 CLI](https://github.com/auth0/auth0-cli):

```shell
curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .
```

Then authenticate the CLI with your Auth0 account, choosing "as a user" when prompted:

```shell
./auth0 login
```

Next, create a new application with Auth0:

```shell
./auth0 apps create \
  --name "My Laravel Application" \
  --type "regular" \
  --auth-method "post" \
  --callbacks "http://localhost:8000/callback" \
  --logout-urls "http://localhost:8000" \
  --reveal-secrets \
  --no-input \
  --json > .auth0.app.json
```

You should also create a new API:

```shell
./auth0 apis create \
  --name "My Laravel Application's API" \
  --identifier "https://github.com/auth0/laravel-auth0" \
  --offline-access \
  --no-input \
  --json > .auth0.api.json
```

This produces two files in your project directory that configure the SDK.

As these files contain credentials it's important to treat these as sensitive. You should ensure you do not commit these to version control. If you're using Git, you should add them to your `.gitignore` file:

```bash
echo ".auth0.*.json" >> .gitignore
```

## Login Routes

The SDK automatically registers all the necessary routes for your application's users to authenticate.

| Route       | Purpose                            |
| ----------- | ---------------------------------- |
| `/login`    | Initiates the authentication flow. |
| `/logout`   | Logs the user out.                 |
| `/callback` | Handles the callback from Auth0.   |

If you require more control over these, or if they conflict with existing routes in your application, you can manually register the SDK's controllers instead. Please see [the SDK's README](https://github.com/auth0/laravel-auth0) for advanced integrations.

## Access Control {{{ data-action=code data-code="routes/web.php#6:12" }}}

Laravel's authentication facilities use "guards" to define how users are authenticated for each request. You can use the Auth0 SDK's authentication guard to restrict access to your application's routes.

To require users to authenticate before accessing a route, you can use Laravel's `auth` middleware:

```php
Route::get('/private', function () {
  return response('Welcome! You are logged in.');
})->middleware('auth');
```

You can also require authenticated users to have specific [permissions](https://auth0.com/docs/manage-users/access-control/rbac) by combining this with Laravel's `can` middleware:

```php
Route::get('/scope', function () {
    return response('You have `read:messages` permission, and can therefore access this resource.');
})->middleware('auth')->can('read:messages');
```

## User Information {{{ data-action=code data-code="routes/web.php#14:24" }}}

Information about the authenticated user is available through Laravel's `Auth` Facade, or the `auth()` helper function.

For example, to retrieve the user's identifier and email address:

```php
Route::get('/', function () {
  if (! auth()->check()) {
    return response('You are not logged in.');
  }

  $user = auth()->user();
  $name = $user->name ?? 'User';
  $email = $user->email ?? '';

  return response("Hello {$name}! Your email address is {$email}.");
});;
```

## User Management{{{ data-action=code data-code="routes/web.php#26:43" }}}

You can update user information using the [Auth0 Management API](https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md). All Management endpoints are accessible through the SDK's `management()` method.

**Before making Management API calls you must enable your application to communicate with the Management API.** This can be done from the [Auth0 Dashboard's API page](https://manage.auth0.com/#/apis/), choosing `Auth0 Management API`, and selecting the 'Machine to Machine Applications' tab. Authorize your Laravel application, and then click the down arrow to choose the scopes you wish to grant.

For the following example, in which we will update a user's metadata and assign a random favorite color, you should grant the `read:users` and `update:users` scopes. A list of API endpoints and the required scopes can be found in [the Management API documentation](https://auth0.com/docs/api/management/v2).

```php
use Auth0\Laravel\Facade\Auth0;

Route::get('/colors', function () {
  $endpoint = Auth0::management()->users();

  $colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'orange', 'pink', 'brown'];

  $endpoint->update(
    id: auth()->id(),
    body: [
        'user_metadata' => [
            'color' => $colors[random_int(0, count($colors) - 1)]
        ]
    ]
  );

  $metadata = $endpoint->get(auth()->id());
  $metadata = Auth0::json($metadata);

  $color = $metadata['user_metadata']['color'] ?? 'unknown';
  $name = auth()->user()->name;

  return response("Hello {$name}! Your favorite color is {$color}.");
})->middleware('auth');
```

A quick reference guide of all the SDK's Management API methods is [available here](https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md).

## Run the Application

You are now ready to start your Laravel application, so it can accept requests:

```shell
php artisan serve
```

::::checkpoint
:::checkpoint-default
Open your web browser and try accessing the following routes:

- [http://localhost:8000](http://localhost:8000) to see the public route.
- [http://localhost:8000/private](http://localhost:8000/private) to be prompted to authenticate.
- [http://localhost:8000](http://localhost:8000) to see the public route, now authenticated.
- [http://localhost:8000/scope](http://localhost:8000/scope) to check if you have the `read:messages` [permission](https://auth0.com/docs/manage-users/access-control/rbac).
- [http://localhost:8000/update](http://localhost:8000/update) to update the user's profile.
- [http://localhost:8000/logout](http://localhost:8000/logout) to log out.

:::

:::checkpoint-failure
Here are a couple of things to try:

- Try running `php artisan optimize:clear` to clear Laravel's cache.
- Ensure your `.auth0.app.json` and `.auth0.api.json` files are at the root of your project.
- Ensure you have enabled your Laravel application as a Machine-to-Machine application and granted it all the necessary scopes for the `Auth0 Management API` from the [Auth0 Dashboard](https://manage.auth0.com/#/apis/).

Encountering problems? Check the SDK's [documentation](https://github.com/auth0/laravel-auth0) or our [documentation hub](https://auth0.com/docs). You should also consider visiting [the community](https://community.auth0.com) where our team and other community members can help answer your questions.

:::
::::

### Additional Reading

- [User Repositories and Models](https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md) extends the Auth0 Laravel SDK to use custom user models, and how to store and retrieve users from a database.
- [Hooking Events](https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md) covers how to listen for events raised by the Auth0 Laravel SDK, to fully customize the behavior of your integration.
- [Management API](https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md) support is built into the Auth0 Laravel SDK, allowing you to interact with the Management API from your Laravel application.
