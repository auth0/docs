---
title: Add Authorization to a Laravel Application
description: Auth0's Laravel SDK allows you to quickly add token-based authorization and route access control to your Laravel application. This guide demonstrates how to integrate Auth0 with a new or existing Laravel 9 or 10 application.
topics:
  - quickstart
  - backend
  - laravel
  - authorization
  - php
  - laravel
contentType: tutorial
useCase: quickstart
default: true
github:
  path: app
interactive: true
files:
  - files/api
---

# Add Authorization to Your Laravel Application

[Auth0's Laravel SDK](https://github.com/auth0/laravel-auth0) allows you to quickly add token-based authorization and route access control to your Laravel application. This guide demonstrates how to integrate Auth0 with a new (or existing) [Laravel 9 or 10](https://github.com/auth0/laravel-auth0#support-policy) application.

---

**Backend applications differ from traditional web applications in that they do not handle user authentication or have a user interface. They provide an API that other applications can interact with. They accept [access tokens](https://auth0.com/docs/secure/tokens/access-tokens) from `Authorization` headers in requests to control access to routes.**

Separate front-end applications are usually built to interact with these types of backends. These can be anything from [single-page applications](https://auth0.com/docs/quickstart/spa) or [native or mobile apps](https://auth0.com/docs/quickstart/native) (all of which Auth0 also provides SDKs for!)

When users need to interact with your backend application, they first authenticate with Auth0 using the frontend application. The frontend application then retrieves an access token from Auth0, which it can use to make requests to your backend application on behalf of the user.

As their name implies, [access tokens](https://auth0.com/docs/secure/tokens/access-tokens) are designed to address matters of access control (authorization), and do not contain information about the user. **Backend applications work exclusively with access tokens.** You can retrieve information about the user who created the token using the [Management API](https://auth0.com/docs/api/management/v2), which we will demonstrate later.

## Laravel Installation

**If you do not already have a Laravel application set up**, open a shell to a suitable directory for a new project and run the following command:

```shell
composer create-project --prefer-dist laravel/laravel auth0-laravel-api ^9.0
```

All the commands in this guide assume you are running them from the root of your Laravel project, directory so you should `cd` into the new project directory:

```shell
cd auth0-laravel-api
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
  --name "My Laravel Backend" \
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
  --name "My Laravel Backend API" \
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

## Access Control {{{ data-action=code data-code="routes/api.php#6:16" }}}

The SDK automatically registers its authorization guard with your Laravel application for use with the `api` middleware, which by default Laravel applies to all routes in your application's `routes/api.php` file.

::: warning
For the SDK to work as expected without additional configuration, **you should define your routes in the `routes/api.php` file.**
:::

You can use the Auth0 SDK's authorization guard to restrict access to your application's routes.

To reject requests that do not contain a valid access token in the `Authorization` header, you can use Laravel's `auth` middleware:

```php
Route::get('/private', function () {
  return response()->json([
    'message' => 'Your token is valid; you are authorized.',
  ]);
})->middleware('auth');
```

You can also require the provided token to have specific [permissions](https://auth0.com/docs/manage-users/access-control/rbac) by combining this with Laravel's `can` middleware:

```php
Route::get('/scope', function () {
    return response()->json([
      'message' => 'Your token is valid and has the `read:messages` permission; you are authorized.',
    ]);
})->middleware('auth')->can('read:messages');
```

## Token Information {{{ data-action=code data-code="routes/api.php#18:30" }}}

Information about the provided access token is available through Laravel's `Auth` Facade, or the `auth()` helper function.

For example, to retrieve the user's identifier and email address:

```php
Route::get('/', function () {
  if (! auth()->check()) {
    return response()->json([
      'message' => 'You did not provide a valid token.',
    ]);
  }

  return response()->json([
    'message' => 'Your token is valid; you are authorized.',
    'id' => auth()->id(),
    'token' => auth()?->user()?->getAttributes(),
  ]);
});
```

## Retrieve User Information {{{ data-action=code data-code="routes/api.php#32:51" }}}

You can retrieve information about the user who created the access token from Auth0 using the [Auth0 Management API](https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md). The SDK provides a convenient wrapper for this API, accessible through the SDK's `management()` method.

**Before making Management API calls you must enable your application to communicate with the Management API.** This can be done from the [Auth0 Dashboard's API page](https://manage.auth0.com/#/apis/), choosing `Auth0 Management API`, and selecting the 'Machine to Machine Applications' tab. Authorize your Laravel application, and then click the down arrow to choose the scopes you wish to grant.

For the following example, you should grant the `read:users` scope. A list of API endpoints and the required scopes can be found in [the Management API documentation](https://auth0.com/docs/api/management/v2).

```php
use Auth0\Laravel\Facade\Auth0;

Route::get('/me', function () {
  $user = auth()->id();
  $profile = cache()->get($user);

  if (null === $profile) {
    $endpoint = Auth0::management()->users();
    $profile = $endpoint->get($user);
    $profile = Auth0::json($profile);

    cache()->put($user, $profile, 120);
  }

  $name = $profile['name'] ?? 'Unknown';
  $email = $profile['email'] ?? 'Unknown';

  return response()->json([
    'name' => $name,
    'email' => $email,
  ]);
})->middleware('auth');
```

::: note
**You should cache user information in your application for brief periods.** This reduces the number of requests your application makes to Auth0, and improves performance. You should avoid storing user information in your application for long periods as this can lead to stale data. You should also avoid storing user information beyond the user's identifier in persistent databases.
:::

## Run the Application

You are now ready to start your Laravel application, so it can accept requests:

```shell
php artisan serve
```

## Retrieve a Test Token

You can learn more about [retrieving access tokens here](https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens). For this quickstart, however, you can simply use an access token from [your API settings' "test" view](https://manage.auth0.com/#/apis).

::: note
The `/me` route we created above will not work with a test token as there is no actual user associated with it.
:::

::::checkpoint
:::checkpoint-default
Open a shell and try issuing requests to your application.

Begin by requesting the public route:

```shell
curl --request GET \
  --url http://localhost:8000/api \
  --header 'Accept: application/json'
```

Next, use your access token in an `Authorization` header to request a protected route:

```shell
curl --request GET \
  --url http://localhost:8000/api/private \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

Finally, try requesting the scope-protected route, which will only succeed if the access token has the `read:messages` scope granted:

```shell
curl --request GET \
  --url http://localhost:8000/api/scope \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

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
