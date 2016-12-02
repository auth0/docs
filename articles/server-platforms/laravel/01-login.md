---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 PHP Laravel SDK to add authentication and authorization to your web app.
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-laravel-php-web-app',
  path: '00-Starter-Seed'
}) %>

::: panel-info System Requirements
 This tutorial and seed project have been tested with the following:
* Composer 1.0-dev
* PHP 5.5.12
* Laravel 5.2.15
:::

## Laravel Compatibility

The lastest version (4.x) targets Laravel 5.3 compatibility.

If you are working with an older version (Laravel 4.x) you need to point to composer.json to the version 1.0.*

## Install the Plugin and its Dependencies

${snippet(meta.snippets.dependencies)}

> This sample uses **[Composer](https://getcomposer.org/doc/00-intro.md)**, a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.

## Enable it in Laravel

Add the following in the list of the services providers, located in `config/app.php`

${snippet(meta.snippets.setup)}

Optionally, if you want to use the [facade](http://laravel.com/docs/facades) called `Auth0` you should also add an alias in the same file

```php
'aliases' => array(
    // ...
    'Auth0' => Auth0\Login\Facade\Auth0::class
);
```

Now, you will be able to access to the logged user info with `Auth0::getUser()`.

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

## Configure It

To configure the plugin, you need to publish the plugin configuration and complete the file `config/laravel-auth0.php` using the information of your Auth0 account.

To publish the example configuration file use this command

```bash
php artisan vendor:publish
```

## Setup the Callback Action

The plugin works with the [Laravel authentication system](https://laravel.com/docs/5.3/authentication), but instead of using the `Auth::attempt` in a controller that handles a login form submit, you have to hookup the callback uri.

In other words, you need to select a uri (for example `/auth0/callback`) and configure it in your [Auth0 admin page](${manage_url}/#/applications) and also, add it as a route in Laravel

```php
Route::get('/auth0/callback', '\Auth0\Login\Auth0Controller@callback');
```

## Triggering Login Manually or Integrating the Auth0 Widget

You can trigger the login in different ways, like redirecting to a login link or you can use [Lock](/lock), by adding the following javascript into a Laravel view or layout

<%= include('../../_includes/_lock-sdk') %>

## Defining a User and a User Provider

The [Laravel authentication system](https://laravel.com/docs/5.3/authentication) needs a *User Object* given by a *User Provider*. With these two abstractions, the user entity can have any structure you like and can be stored anywhere. You configure the *User Provider* indirectly, by selecting a user provider in `app/config/auth.php`. The default provider is Eloquent, which persists the User model in a database using the ORM.

The plugin comes with an authentication driver called auth0. This driver defines a user structure that wraps the [Normalized User Profile](/user-profile) defined by Auth0, and it doesn't actually persist the object, it just stores it in the session for future calls.

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

If you need to implement a more advanced custom solution, you can always extend the Auth0UserRepository (or implement your own) in order to get and update the user data on your database and event more advaced validations.

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

        if ($user===null) return null;

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
        \App\Repository\MyCustomUserRepository::class);

}

...
```

## Use It

Now all your web routes will be secured by auth0.

For loging out your users, you can set up a route like this:

```php
Route::get('/logout', function() {
    Auth::logout();
    return Redirect::home();
});
```
