---
title: Authenticate
description: This tutorial will show you how to use the Auth0 PHP Laravel SDK to add authentication and authorization to your API.
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-laravel-php-web-api',
  path: '00-Starter-Seed',
  requirements: [
    'Composer 1.0-dev',
    'PHP 5.6.18',
    'Laravel 5.1.31'
  ]
}) %>

## Laravel Compatibility

The latest version (4.x) targets Laravel 5.3 compatibility.

If you are working with an older version (Laravel 4.x) you need to point to composer.json to the version 1.0.*

### 1. Install the plugin and its dependencies

${snippet(meta.snippets.dependencies)}

> This sample uses **[Composer](https://getcomposer.org/doc/00-intro.md)**, a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.

### 2. Enable it in Laravel
Add the following to the list of service providers, located in `config/app.php`

${snippet(meta.snippets.setup)}

Optionally, if you want to use the [facade](http://laravel.com/docs/facades) called `Auth0` you should also add an alias in the same file

```php
'aliases' => array(
    // ...
    'Auth0' => 'Auth0\Login\Facade\Auth0'
);
```

You will now be able to access to the logged user info with `Auth0::getUser()`.

Finally, you will need to bind a class that provides the users (your app model user) each time a user is logged in or a JWT is decoded. You can use the `Auth0UserRepository` provided by this package or build your own (which should implement the `\Auth0\Login\Contract\Auth0UserRepository` interface, this is covered later).
For this you need to add to your AppServiceProvider the following line:

```php
...

public function register()
{

    $this->app->bind(
        '\Auth0\Login\Contract\Auth0UserRepository',
        '\Auth0\Login\Repository\Auth0UserRepository');

}

...
```

### 3. Configure it

To configure the plugin, you need to publish the plugin configuration and complete the file `config/laravel-auth0.php` using the information of your Auth0 account.

To publish the example configuration file use this command

```bash
php artisan vendor:publish
```

### 4. Configure APACHE

By default, Apache doesn't provide the `Authorization header` to the request, we can solve that by enabling `mod_rewrite` and adding the following rule to your `.htaccess`:

```bash
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```

### 5. Defining a user and a user provider

The [Laravel authentication system](https://laravel.com/docs/5.3/authentication) needs a *User Object* given by a *User Provider*. With these two abstractions, the user entity can have any structure you like and can be stored anywhere. You configure the *User Provider* indirectly, by selecting a user provider in `app/config/auth.php`. The default provider is Eloquent, which persists the User model in a database using the ORM.

The plugin comes with an authentication driver called `auth0`. This driver defines a user structure that wraps the [Normalized User Profile](https://auth0.com/docs/user-profile/normalized) defined by Auth0, and it doesn't actually persist the object, it just stores it in the session for future calls.

This works fine for basic testing or if you don't really need to persist the user. At any point you can call `Auth::check()` to see if there is a user logged in and `Auth::user()` to get the wrapper with the user information.

To enable this driver, you need to change the following line in `/config/auth.php`:

```php
...
    'providers' => [
        'users' => [
            'driver' => 'auth0'
        ],
    ],
...
```

If you need a more advanced custom solution, you can always extend the `Auth0UserRepository` class.

For example, if you want to use the default `User` model and store the user profile in your database, you can use the following Repository:

```php
<?php
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

And change the binding in the second step:

```php
...

public function register()
{

    $this->app->bind(
        '\Auth0\Login\Contract\Auth0UserRepository',
        '\App\Repository\MyCustomUserRepository');

}

...
```

### 6. Authenticate your requests without Laravel Passport

If you don't want to use Laravel Passport, you can use the Middlewares provided by this package.

To register the middlewares, you need to go to `app/Http/Kernel.php` and add these lines to the `routeMiddleware` collection:

```php
protected $routeMiddleware = [
  ...
  'auth0.jwt' => '\Auth0\Login\Middleware\Auth0JWTMiddleware',
  'auth0.jwt_verification' => '\Auth0\Login\Middleware\Auth0OptionalJWTMiddleware',
  'auth0.jwt_force' => '\Auth0\Login\Middleware\ForceAuthMiddleware',
  ...
];
```

#### Auth0JWTMiddleware

This middleware with extract the token from the request headers, decode and verify it. If the token is not present it will reject the login with an HTTP 401 code.

#### Auth0OptionalJWTMiddleware & ForceAuthMiddleware

`Auth0OptionalJWTMiddleware` with extract the token from the request headers, decode and verify it. If the token is not present it will not set the user.

`ForceAuthMiddleware` will check if there is a user set up, if there is not it will reject the login with an HTTP 401 code.

The idea of using these middlewares is to be able to set `Auth0OptionalJWTMiddleware` to all your API routes and for those that should be secured, you can add `ForceAuthMiddleware`.

### 5. Use it & Run it

Now you can secure your REST calls like this:

${snippet(meta.snippets.use)}

You can run the server by doing `php artisan serve --port=3001` to try all this out.

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.
```har
{
"method": "GET",
"url": "http://localhost:8000/path_to_your_api",
"headers": [
{ "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
]
}
```

### 6. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Options Steps
#### Configure CORS

To configure CORS, you should add the `laravel-cors` dependency. You can [check it out here](https://github.com/barryvdh/laravel-cors).

After you've installed it, just set the following in the configuration file for `CORS`:

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
