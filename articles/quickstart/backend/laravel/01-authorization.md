---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Laravel API.
github:
   path: 01-Authorization-RS256
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Install dependencies

Protecting your Laravel API requires a middleware which will check for and verify an `access_token` in the `Authorization` header of an incoming HTTP request. You can use the middleware provided in the [laravel-auth0](https://github.com/auth0/laravel-auth0) package.

Install `laravel-auth0` using **Composer**.

::: note
**[Composer](https://getcomposer.org/)** is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you. See Composer's [getting started](https://getcomposer.org/doc/00-intro.md) doc for information on how to use it.
:::

${snippet(meta.snippets.dependencies)}

### Enable the provider

The `laravel-auth0` package comes with a provider called `LoginServiceProvider`. Add this to the list of application `providers`.

${snippet(meta.snippets.setup)}

If you would like to use the `Auth0` [facade](http://laravel.com/docs/facades), add it to the list of `aliases`.

```php
// config/app.php

 'aliases' => [
    // ...
    'Auth0' => \Auth0\Login\Facade\Auth0::class,
],
```

You will now be able to access user info with `Auth0::getUser()`.

Finally, you need to bind a class that provides a user (your app model user) each time the user is logged in or an `access_token` is decoded. You can use the `Auth0UserRepository` provided by this package or you can build your own class.

To use `Auth0UserRepository`, add the following lines to your `AppServiceProvider`:

```php
// app/Providers/AppServiceProvider.php

public function register()
{

    $this->app->bind(
        \Auth0\Login\Contract\Auth0UserRepository::class, 
        \Auth0\Login\Repository\Auth0UserRepository::class
    );

}
```

### Configure the plugin

The **laravel-auth0** plugin comes with a configuration file that can be generated using `artisan`. Generate the file and complete the details found within.

```bash
php artisan vendor:publish
```

After the file is generated, it will be located at `config/laravel-auth0.php`.

### Configure Apache

By default, Apache doesn't parse `Authorization` headers from incoming HTTP requests. To enable this, add a `mod_rewrite` to your `.htaccess` file.

```bash
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```

### Define a User and User Provider

The [Laravel authentication system](https://laravel.com/docs/5.5/authentication) needs a **User Object** given by a **User Provider**. With these two abstractions, the user entity can have any structure you like and can be stored anywhere. You configure the **User Provider** indirectly by selecting a user provider in `app/config/auth.php`. The default provider is Eloquent, which persists the User model in a database using the ORM.

The **laravel-auth0** plugin comes with an authentication driver called `auth0`. This driver defines a user structure that wraps the [normalized user profile](https://auth0.com/docs/user-profile/normalized) defined by Auth0. It doesn't actually persist the object but rather simply stores it in the session for future calls.

This is adequate for basic testing or if you don't have a requirement to persist the user. At any point you can call `Auth::check()` to determine if there is a user logged in and `Auth::user()` to retrieve the wrapper with the user information.

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

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

Define a middleware to check and verify `access_token` in the `Authorization` header of an incoming HTTP request.

To create a middleware use the `make:middleware` Artisan command.

```bash
php artisan make:middleware CheckJWT
```

Implement `handle` method to check for an `access_token`, and if it is valid log the user in Laravel authentication system.

```php
// /app/Http/Middleware/CheckJWT.php

<?php

namespace App\Http\Middleware;

use Auth0\Login\Contract\Auth0UserRepository;
use Auth0\SDK\Exception\CoreException;
use Auth0\SDK\Exception\InvalidTokenException;
use Closure;

class CheckJWT
{
    protected $userRepository;

    /**
     * CheckJWT constructor.
     *
     * @param Auth0UserRepository $userRepository
     */
    public function __construct(Auth0UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $auth0 = \App::make('auth0');

        $accessToken = $request->bearerToken();
        try {
            $tokenInfo = $auth0->decodeJWT($accessToken);
            $user = $this->userRepository->getUserByDecodedJWT($tokenInfo);
            if (!$user) {
                return response()->json(["message" => "Unauthorized user"], 401);
            }

            \Auth::login($user);

        } catch (CoreException $e) {
            return response()->json(["message" => $e->getMessage()], 401);
        } catch (InvalidTokenException $e) {
            return response()->json(["message" => $e->getMessage()], 401);
        }

        return $next($request);
    }
}
```

To Assign the middleware to specific routes, append it to the list and assign a key in `$routeMiddleware` property.

```php
// /app/Http/Kernel.php

protected $routeMiddleware = [
    // ...
    'jwt' => \App\Http\Middleware\CheckJWT::class,
];
```

Protecting individual API endpoints can be done by applying the `jwt` middleware to them.

```php
// routes/api.php

// This endpoint doesn't need authentication
Route::get('/public', function (Request $request) {
    return response()->json(["message" => "Hello from a public endpoint! You don't need to be authenticated to see this."]);
});

Route::get('/private', function (Request $request) {
    return response()->json(["message" => "Hello from a private endpoint! You need to have a valid access token to see this."]);
})->middleware('jwt');
```

This route is now only accessible if an `access_token` is included in the `Authorization` header of the incoming request.

### Configure the Scopes

The middleware defined above that the `access_token` in the incoming HTTP request is valid, however it does not include a mechanism to check if the `access_token` has sufficient **scope** to access the requested resource.

<%= include('../_includes/_api_scopes_access_resources') %>

Define a middleware to look for a particular **scope** claim in the `access_token`.

To create a middleware use the `make:middleware` Artisan command.

```bash
php artisan make:middleware CheckScope
```

Implement `handle` method to check for an `access_token`, and if it is valid and have the appropriate scope log the user in Laravel authentication system.

```php
// /app/Http/Middleware/CheckScope.php

<?php

namespace App\Http\Middleware;

use Auth0\Login\Contract\Auth0UserRepository;
use Auth0\SDK\Exception\CoreException;
use Auth0\SDK\Exception\InvalidTokenException;
use Closure;

class CheckScope
{
    protected $userRepository;

    /**
     * CheckScope constructor.
     *
     * @param Auth0UserRepository $userRepository
     */
    public function __construct(Auth0UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  \string  $scope
     * @return mixed
     */
    public function handle($request, Closure $next, $scope)
    {
        $auth0 = \App::make('auth0');

        $accessToken = $request->bearerToken();
        try {
            $tokenInfo = $auth0->decodeJWT($accessToken);
            $user = $this->userRepository->getUserByDecodedJWT($tokenInfo);
            if (!$user) {
                return response()->json(["message" => "Unauthorized user"], 401);
            }

            if($scope) {
                $hasScope = false;
                if(isset($tokenInfo->scope)) {
                    $scopes = explode(" ", $tokenInfo->scope);
                    foreach ($scopes as $s) {
                        if ($s === $scope)
                            $hasScope = true;
                    }
                }
                if(!$hasScope)
                    return response()->json(["message" => "Insufficient scope"], 403);

                \Auth::login($user);
            }
        } catch (CoreException $e) {
            return response()->json(["message" => $e->getMessage()], 401);
        } catch (InvalidTokenException $e) {
            return response()->json(["message" => $e->getMessage()], 401);
        }

        return $next($request);
    }
}
```

Assign the middleware to specific routes like the previous one.

```php
// /app/Http/Kernel.php

protected $routeMiddleware = [
    // ...
    'check.scope' => \App\Http\Middleware\CheckScope::class,
];
```

Apply the `check.scope` middleware to the route you want to protect.

```php
// routes/api.php

Route::get('/private-scoped', function (Request $request) {
    return response()->json([
        "message" => "Hello from a private endpoint! You need to have a valid access token and a scope of read:messages to see this."
    ]);
})->middleware('check.scope:read:messages');
```

This route is now only accessible if an `access_token` with a scope of `read:messages` is included in the `Authorization` header of the incoming request.

## Optional Steps

### Extend the `Auth0UserRepository` class

There may be situations where you need to customize the `Auth0UserRepository` class. For example, you may want to use the default `User` model and store the user profile in your database. If you need a more advanced custom solution such as this, you can extend the `Auth0UserRepository` class with your own custom class.

::: note
This is an example, the custom class in this scenario will not work unless a database setup has been configured.
:::

```php
// app/Repository/MyCustomUserRepository.php

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

      // Note: Requires configured database access
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
            return $user;
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
        \Auth0\Login\Contract\Auth0UserRepository::class, 
        \App\Repository\MyCustomUserRepository::class 
    );

}
```

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
