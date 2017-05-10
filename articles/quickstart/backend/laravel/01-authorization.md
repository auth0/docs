---
title: Authorization
description: This tutorial demonatrates how to add authorization to your Laravel API using Auth0
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-laravel-api-samples',
  path: '01-Authorization-RS256',
  requirements: [
    'Composer 1.0-dev',
    'PHP 5.6.18',
    'Laravel 5.3',
    'laravel-auth0 5.0'
  ]
}) %>

<%= include('../_includes/_api_auth_preamble') %>

## Install the Dependencies

Protecting your Laravel API requires a middleware which will check for and verify an `access_token` in the `Authorization` header of an incoming HTTP request. You can use the middleware provided in the **[laravel-auth0](https://github.com/auth0/laravel-auth0)** package.

Install **laravel-auth0** using **Composer**.

> **[Composer](https://getcomposer.org/)** is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you. See Composer's [getting started](https://getcomposer.org/doc/00-intro.md) doc for information on how to use it.

${snippet(meta.snippets.dependencies)}

## Enable the Provider

The **laravel-auth0** package comes with a provder called `LoginServiceProvider`. Add this to the list of application `providers`.

${snippet(meta.snippets.setup)}

If you would like to use the `Auth0` [facade](http://laravel.com/docs/facades), add it to the list of `aliases`.

```php
// config/app.php

'aliases' => array(
    // ...
    'Auth0' => \Auth0\Login\Facade\Auth0::class,
);
```

You will now be able to access user info with `Auth0::getUser()`.

Finally, you need to bind a class that provides a user (your app model user) each time the user is logged in or an `access_token` is decoded. You can use the `Auth0UserRepository` provided by this package or you can build your own class.

To use `Auth0UserRepository`, add the following lines to your `AppServiceProvider`:

```php
// app/Providers/AppServiceProvider.php

// ...
public function register()
{

    $this->app->bind(
        '\Auth0\Login\Contract\Auth0UserRepository',
        '\Auth0\Login\Repository\Auth0UserRepository');

}
```

## Configure the Plugin

The **laravel-auth0** plugin comes with a configuration file that can be generated using `artisan`. Generate the file and complete the details found within.

```bash
php artisan vendor:publish
```

After the file is generated, it will be located at `config/laravel-auth0.php`.

## Configure Apache

By default, Apache doesn't parse `Authorization` headers from incoming HTTP requests. To enable this, add a `mod_rewrite` to your `.htaccess` file.

```bash
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```

## Define a User and User Provider

The [Laravel authentication system](https://laravel.com/docs/5.3/authentication) needs a **User Object** given by a **User Provider**. With these two abstractions, the user entity can have any structure you like and can be stored anywhere. You configure the **User Provider** indirectly by selecting a user provider in `app/config/auth.php`. The default provider is Eloquent, which persists the User model in a database using the ORM.

The **laravel-auth0** plugin comes with an authentication driver called `auth0`. This driver defines a user structure that wraps the [normalized user profile](https://auth0.com/docs/user-profile/normalized) defined by Auth0. It doesn't actually persist the object but rather simply stores it in the session for future calls.

This is adequate for basic testing or if you don't have a requirement to persist the user. At any point you can call `Auth::check()` to determine if there is a user logged in and `Auth::user()` to retreive the wrapper with the user information.

Configure the `driver` in `/config/auth.php` to use `auth0`.

```php
// app/config/auth.php

// ...
'providers' => [
    'users' => [
        'driver' => 'auth0'
    ],
],
```

## Protect Routes with the Auth0 Middleware

Protecting individual API endpoints can be done by applying the `auth0.jwt` middleware to them.

Add the middleware to the `$routeMiddleware` array in `app/Http/Kernel.php`.

```php
// app/Http/Kernel.php

// ...
protected $routeMiddleware = [
    // ...
    'auth0.jwt' => \Auth0\Login\Middleware\Auth0JWTMiddleware::class,
];
```

This middleware can now be applied to individual routes.

```php
// routes/api.php

Route::get('/private', function (Request $request) {
    return response()->json(["message" => "Hello from a private endpoint! You need to have a valid access token to see this."]);
})->middleware('auth0.jwt');
```

This route is now only accessible if an `access_token` is included in the `Authorization` header of the incoming request.

## Make Calls to the API

With the **laravel-auth0** plugin configured and the `auth0.jwt` middleware applied to a route, you can now run the application and make calls to it.

Use `artisan` to serve the application.

```bash
php artisan serve
```

Send a request to your protected endpoint which includes an `access_token`.

```har
{
"method": "GET",
"url": "http://localhost:8000/api/private",
"headers": [
{ "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN_HERE" }
]
}
```

## Extend the `Auth0UserRepository` Class

There may be situations where you need to customize the `Auth0UserRepository` class. For example, you may want to use the default `User` model and store the user profile in your database. If you need a more advanced custom solution such as this, you can extend the `Auth0UserRepository` class with your own custom class.

```php
namespace App\Repository;

use Auth0\Login\Contract\Auth0UserRepository;

class MyCustomUserRepository implements Auth0UserRepository {

    /* This class is used on api authN to fetch the user based on the jwt.*/
    public function getUserByDecodedJWT($jwt) {
      /*
       * The `sub` claim in the token represents the subject of the token
       * and it is always the `user_id`
       */
      $jwt->user_id = $jwt->sub;

      return $this->upsertUser($jwt);
    }

    public function getUserByUserInfo($userInfo) {
      return $this->upsertUser($userInfo['profile']);
    }

    protected function upsertUser($profile) {

      $user = User::where("auth0id", $profile->user_id)->first();

      if ($user === null) {
          // If not, create one
          $user = new User();
          $user->email = $profile->email; // you should ask for the email scope
          $user->auth0id = $profile->user_id;
          $user->name = $profile->name; // you should ask for the name scope
          $user->save();
      }

      return $user;
    }

    public function getUserByIdentifier($identifier) {
        //Get the user info of the user logged in (probably in session)
        $user = \App::make('auth0')->getUser();

        if ($user === null) return null;

        // build the user
        $user = $this->getUserByUserInfo($user);

        // it is not the same user as logged in, it is not valid
        if ($user && $user->auth0id == $identifier) {
            return $auth0User;
        }
    }

}
```

With your custom class in place, change the binding in the `AppServiceProvider`.

```php
// app/Providers/AppServiceProvider.php

// ...
public function register()
{

    $this->app->bind(
        '\Auth0\Login\Contract\Auth0UserRepository',
        '\App\Repository\MyCustomUserRepository');

}
```

## Optional Steps

### Configure CORS

To configure CORS, you should add the `laravel-cors` dependency. You can [check it out here](https://github.com/barryvdh/laravel-cors).

After installation, add the following to the configuration file for `CORS`:

```php
'defaults' => array(
    'supportsCredentials' => false,
    'allowedOrigins' => array(),
    'allowedHeaders' => array(),
    'allowedMethods' => array(),
    'exposedHeaders' => array(),
    'maxAge' => 0,
    'hosts' => array(),
),

'paths' => array(
    '*' => array(
        'allowedOrigins' => array('*'),
        'allowedHeaders' => array('Content-Type', 'Authorization', 'Accept'),
        'allowedMethods' => array('POST', 'PUT', 'GET', 'DELETE')
    ),
),
```

### Authenticate your Requests Without Laravel Passport

If you don't want to use Laravel Passport, you can use the middlewares provided by this package.

To register the middlewares, go to `app/Http/Kernel.php` and add these lines to the `routeMiddleware` collection:

```php
protected $routeMiddleware = [
  ...
  'auth0.jwt' => '\Auth0\Login\Middleware\Auth0JWTMiddleware',
  'auth0.jwt_verification' => '\Auth0\Login\Middleware\Auth0OptionalJWTMiddleware',
  'auth0.jwt_force' => '\Auth0\Login\Middleware\ForceAuthMiddleware',
  ...
];
```

### Auth0JWTMiddleware

This middleware will extract, decode, and verify the `access_token` from the `Authorization` header. If the token is not present, it will reject the login with a `401 Unauthorized` response.

### Auth0OptionalJWTMiddleware & ForceAuthMiddleware

`Auth0OptionalJWTMiddleware` with extract, decode, and verify the `access_token` from the `Authorization` header. If the token is not present it will not set the user.

`ForceAuthMiddleware` will check if there is a user set up. If there is not, it will reject the login with a `401 Unauthorized` response.