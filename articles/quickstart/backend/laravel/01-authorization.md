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
github:
  path: sample
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

---

**Backend applications differ from traditional web applications in that they do not handle user authentication or have a user interface. They provide an API that other applications can interact with. They accept <a href="https://auth0.com/docs/secure/tokens/access-tokens" target="_blank" rel="noreferrer">access tokens</a> from `Authorization` headers in requests to control access to routes.**

Separate front-end applications are usually built to interact with these types of backends. These can be anything from <a href="https://auth0.com/docs/quickstart/spa" target="_blank" rel="noreferrer">single-page applications</a> or <a href="https://auth0.com/docs/quickstart/native" target="_blank" rel="noreferrer">native or mobile apps</a> (all of which Auth0 also provides SDKs for!)

When users need to interact with your backend application, they first authenticate with Auth0 using the frontend application. The frontend application then retrieves an access token from Auth0, which it can use to make requests to your backend application on behalf of the user.

As their name implies, <a href="https://auth0.com/docs/secure/tokens/access-tokens" target="_blank" rel="noreferrer">access tokens</a> are designed to address matters of access control (authorization), and do not contain information about the user. **Backend applications work exclusively with access tokens.** You can retrieve information about the user who created the token using the <a href="https://auth0.com/docs/api/management/v2" target="_blank" rel="noreferrer">Management API</a>, which we will demonstrate later.

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

Run the following command within your project directory to install the <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer">Auth0 Laravel SDK</a>:

```shell
composer require auth0/login:^7.8 --update-with-all-dependencies
```

Then generate an SDK configuration file for your application:

```shell
php artisan vendor:publish --tag auth0
```

## SDK Configuration

Run the following command from your project directory to download the <a href="https://github.com/auth0/auth0-cli" target="_blank" rel="noreferrer">Auth0 CLI</a>:

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

## Access Control

You can use the Auth0 SDK's authorization guard to restrict access to your application's routes.

To reject requests that do not contain a valid access token in the `Authorization` header, you can use Laravel's `auth` middleware:

```php
Route::get('/private', function () {
  return response()->json([
    'message' => 'Your token is valid; you are authorized.',
  ]);
})->middleware('auth');
```

You can also require the provided token to have specific <a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" rel="noreferrer">permissions</a> by combining this with Laravel's `can` middleware:

```php
Route::get('/scope', function () {
    return response()->json([
      'message' => 'Your token is valid and has the `read:messages` permission; you are authorized.',
    ]);
})->middleware('auth')->can('read:messages');
```

## Token Information

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

## Retrieve User Information

You can retrieve information about the user who created the access token from Auth0 using the <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer">Auth0 Management API</a>. The SDK provides a convenient wrapper for this API, accessible through the SDK's `management()` method.

**Before making Management API calls you must enable your application to communicate with the Management API.** This can be done from the <a href="https://manage.auth0.com/#/apis/" target="_blank" rel="noreferrer">Auth0 Dashboards API page</a>, choosing `Auth0 Management API`, and selecting the 'Machine to Machine Applications' tab. Authorize your Laravel application, and then click the down arrow to choose the scopes you wish to grant.

For the following example, you should grant the `read:users` scope. A list of API endpoints and the required scopes can be found in <a href="https://auth0.com/docs/api/management/v2" target="_blank" rel="noreferrer">the Management API documentation</a>.

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

You can learn more about <a href="https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens" target="_blank" rel="noreferrer">retrieving access tokens here</a>. For this quickstart, however, you can simply use an access token from <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer">your API settings "test" view</a>.

::: note
The `/me` route we created above will not work with a test token as there is no actual user associated with it.
:::

## Checkpoint

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

If you have any issues, here are a couple of things to try:

- Try running `php artisan optimize:clear` to clear Laravel's cache.
- Ensure your `.auth0.app.json` and `.auth0.api.json` files are at the root of your project.
- Ensure you have enabled your Laravel application as a Machine-to-Machine application and granted it all the necessary scopes for the `Auth0 Management API` from the <a href="https://manage.auth0.com/#/apis/" target="_blank" rel="noreferrer">Auth0 Dashboard</a>.

Encountering problems? Check the SDK's <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer">documentation</a> or our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation hub</a>. You should also consider visiting <a href="https://community.auth0.com" target="_blank" rel="noreferrer">the community</a> where our team and other community members can help answer your questions.

### Additional Reading

- <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md" target="_blank" rel="noreferrer">User Repositories and Models</a> extends the Auth0 Laravel SDK to use custom user models, and how to store and retrieve users from a database.
- <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md" target="_blank" rel="noreferrer">Hooking Events</a> covers how to listen for events raised by the Auth0 Laravel SDK, to fully customize the behavior of your integration.
- <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer">Management API</a> support is built into the Auth0 Laravel SDK, allowing you to interact with the Management API from your Laravel application.
