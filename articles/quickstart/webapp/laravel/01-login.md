---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Laravel application.
budicon: 448
github:
    path: 00-Starter-Seed
---
<%= include('../_includes/_getting_started', { library: 'Laravel', callback: 'http://localhost:3000/callback' }) %>

## Install and Configure Laravel 5.5

If you are installing Auth0 to an existing app, you can skip this section. Otherwise, walk through the Laravel guides below to get started with a sample project.

1. **[Installation](https://laravel.com/docs/5.5/installation)**
    * Use any of the install methods listed to start a new project
    * PHP can be served any way that works for your development process (we use Homebrew-installed Apache and PHP)
    * Walk through the "Configuration" section completely
2. **[Configuration](https://laravel.com/docs/5.5/configuration)**
    * Create a .env file, used later for critical and sensitive Auth0 connection values
    * Make sure `APP_DEBUG` is set to `true`
    
By the end of those 2 sections, you should have a Laravel application up and running locally or on a test server.

## Integrate Auth0 in your application

### Install the Auth0 plugin and its dependencies

${snippet(meta.snippets.dependencies)}

::: note
**[Composer](https://getcomposer.org/)** is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you. See Composer's [getting started](https://getcomposer.org/doc/00-intro.md) doc for information on how to use it.
:::

This will install:

* The [Auth0 PHP SDK](https://github.com/auth0/auth0-PHP) in `vendor\auth0\auth0-php`
* The [Auth0 Laravel plugin](https://github.com/auth0/laravel-auth0) in `vendor\auth0\login`

### Enable Auth0 Login in Laravel

First, we need to add the Auth0 Services to the list of Providers in `config/app.php`:

${snippet(meta.snippets.setup)}

If you want to use an `Auth0` facade, add an alias in the same file (not required, [more information on facades here](http://laravel.com/docs/5.5/facades)):

```php
// config/app.php

'aliases' => array(
    // ...
    'Auth0' => Auth0\Login\Facade\Auth0::class
);
```

Finally, you will need to bind a class that provides the app's User model each time a user is logged in or a JWT is decoded. You can use the `Auth0UserRepository` provided by this package or build your own (see the "Custom User Handling" section below).

Add the following to your `AppServiceProvider::register()` method:

```php
// app/Providers/AppServiceProvider.php

// ...
use Auth0\Login\Contract\Auth0UserRepository as Auth0Contract;
use Auth0\Login\Repository\Auth0UserRepository as UserRepo;

class AppServiceProvider extends ServiceProvider
{
    // ...
    public function register()
    {
        $this->app->bind(
            Auth0Contract::class,
            UserRepo::class
        );
    }
}
```

### Configure It

To configure the plugin, you must publish the plugin configuration and complete the file `config/laravel-auth0.php` using  information from your Auth0 account and details of your implementation.

Publish the default configuration file with the following command:

```bash
php artisan vendor:publish
```

Select the option for `Auth0\Login\LoginServiceProvider` and look for `Publishing complete.` This creates the file `config/laravel-auth0.php` with the following settings:

* `domain` - Your Auth0 tenant domain, found in your Application settings (required)
* `client_id` - Your Auth0 Client ID, found in your Application settings (required)
* `client_secret` - Your Auth0 Client Secret, found in your Application settings (required)
* `redirect_uri` - The callback URI for your Laravel application to handle the login response from Auth0; by default this is `APP_URL/auth0/callback` (required)
* `persist_user` - Should the user information persist in a PHP session? Default is `true`
* `persist_access_token` - Should the Access Token persist in a PHP session? Default is `false`
* `persist_id_token` - Should the ID Token persist in a PHP session? Default is `false`
* `authorized_issuers` - An array of authorized token issuers, should include at least your tenant domain
* `api_identifier` - The authorized token audience
* `secret_base64_encoded` - Is the Client Secret Base64 encoded? Look below the Client Secret field in the Auth0 dashboard to see how to set this; default is `false`
* `supported_algs` - JWT decoding algorithms supported by your application; default is `RS256`
* `guzzle_options` - Specify additional [request options for Guzzle](http://docs.guzzlephp.org/en/stable/request-options.html)

To keep sensitive data out of version control and allow for different testing and production instances, we recommend using the `.env` file Laravel uses to load other environment-specific variables:

```
// .env
// ...
AUTH0_DOMAIN=${account.namespace}
AUTH0_CLIENT_ID=${account.clientId}
AUTH0_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

Call `env()` in `laravel-auth0.php` to get the correct setting:

```php
// config/laravel-auth0.php

return array(
    // ...
    'domain'        => env( 'AUTH0_DOMAIN' ),
    // ...
    'client_id'     => env( 'AUTH0_CLIENT_ID' ),
    // ...
    'client_secret' => env( 'AUTH0_CLIENT_SECRET' ),
    // ...
);
```

### Set Up Routes

The plugin works with the [Laravel authentication system](https://laravel.com/docs/5.5/authentication) by creating a callback route to handle the authentication data from the Auth0 server.

First, we'll add our route and controller to `routes/web.php`. The route used here must match the `redirect_uri` configuration option set previously:

```php
// routes/web.php
// ...
Route::get( '/auth0/callback', '\Auth0\Login\Auth0Controller@callback' )->name( 'auth0-callback' );
```

If you load this callback URL now, you should be immediately redirected back to the homepage rather than getting a 404 error. This tells us that the route is setup and being handled. 

Now we need to add this URL to the **Allowed Callback URLs** field in the Application settings screen for the Application used with this app. Add the complete URL, like `https://myapp.com/auth0/callback`.

Lastly, we need to set up how users log in and out of our app. This is handled by redirecting users to Auth0 for the former and clearing out session data for the latter. Let's start by creating a generic route handling controller. In the console:

```bash
php artisan make:controller Auth/Auth0IndexController
```

This creates a controller file to handle the routes used to log in and out. Let's create a function for each of these in the controller we just made:

```php
// app/Http/Controllers/Auth/Auth0IndexController.php
// ...
class Auth0IndexController extends Controller
{
    /**
     * Redirect to the Auth0 hosted login page
     * 
     * @return mixed
     */
    public function login()
    {
        return \App::make('auth0')->login(null, null, ['scope' => 'openid email email_verified'], 'code');
    }

    /**
     * Log out of Auth0
     * 
     * @return mixed
     */
    public function logout()
    {
        \Auth::logout();
        return  \Redirect::intended('/');
    }
}
```

Now, add the routes tied to the correct handler method along with names we can use and `auth` middleware where needed:

```php
// routes/web.php
// ...
Route::get('/login', 'Auth\Auth0IndexController@login' )->name( 'login' );
Route::get('/logout', 'Auth\Auth0IndexController@logout' )->name( 'logout' )->middleware('auth');
```

### Integrate with Laravel authentication system

The [Laravel authentication system](https://laravel.com/docs/5.5/authentication) needs a *User Object* given by a *User Provider*. With these two abstractions, the user entity can have any structure you like and can be stored anywhere. You configure the *User Provider* indirectly, by selecting a user provider in `app/config/auth.php`. The default provider is Eloquent, which persists the User model in a database using the ORM.

The plugin comes with an authentication driver called `auth0` which defines a user structure that wraps the [Normalized User Profile](/user-profile) defined by Auth0. This driver does not actually persist the User, it just stores it in session for future calls. This works fine for basic testing or if you don't really need to persist the user. For persistence in the database, see the "Custom User Handling" section below.

At any point you can call `Auth::check()` to see if there is a user logged in and `Auth::user()` to get the wrapper with the user information.

Configure the User driver in `config/auth.php` to use `auth0` like this:

```php
// config/auth.php
// ...
'providers' => [
    'users' => [
        'driver' => 'auth0'
    ],
],
```

## Add Login and Logout Links

To test all this out, let's add links to our site to access these routes. If you're using the default project, open up `resources/views/welcome.blade.php` and look for the `@if (Route::has('login'))` block. Change that block to the following:

```blade
@if (Route::has('login'))
    <div class="top-right links">
        @auth
            <a href="{{ route('logout') }}">Logout</a>
        @else
            <a href="{{ route('login') }}">Login/Signup</a>
        @endauth
    </div>
@endif
```

Load the homepage of your app and you should see a **Login** link at the top right. If you click on that, you should be redirected to an Auth0 login page for your application. If this does not happen then you should see one of two things:

1. A Laravel debug screen (is `APP_DEBUG` is set to `true`) which, along with the steps above, should help diagnose the issues
1. An Auth0 error page with more information under the "Technical Details" heading (click **See details for this error**)

Once you're able to successfully log in, you will be redirected to your homepage with a **Logout** link at the top right. This tells us that the login process was successful and the Auth0 user provider is functioning properly. Click **Logout** and you should be back where you started. 

At this point you should have a fully-functioning authentication process using Auth0! 

## Optional: Custom User Handling

What if you need to customize how users are handled beyond what Auth0 provides? You may want to, for example, store the user profile in a database. These kind of customizations can be done by extending the `Auth0UserRepository` class with your own custom class.

::: note
The database information below is an example and is based on a new, default Laravel project. Your database connection information will be different and the table, column names may need to be adjusted, and migrations should be reviewed.
:::

Let's walk through how to add user database persistence using this a custom Repository class called `CustomUserRepository`. You'll need to have a database configured and a `users` table created. If you're starting with the default project, update your MySQL information in your `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=db_user
DB_PASSWORD=db_password
```

In the `database/migrations` folder for the default Laravel project there will be two files, one for creating a users table and one for creating a password reset table. We can delete the password reset one since that's handled by Auth0 but we want to change the users one to remove unnecessary columns and add a new one. 

Edit the migration file with a name similar to `create_users_table` and change the `CreateUsersTable::up()` method to remove the `password` field and add one for `sub` (the Auth0 user ID):

```php
// database/migrations/x_x_x_create_users_table.php
// ...
class CreateUsersTable extends Migration
{
    // ...
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('sub')->unique();
            $table->string('email')->unique();
            $table->rememberToken();
            $table->timestamps();
        });
    }
    // ...
}
```

Save this file and run the artisan command to create this table:

```bash
php artisan migrate
``` 

Next, make a `CustomUserRepository.php` class we can modify:

```bash
# From the Laravel root
mkdir app/Repositories;
touch app/Repositories/CustomUserRepository.php
```

We're going to implement a method called `upsertUser()` to retrieve or add users to the database. We'll also re-implement the `getUserByDecodedJWT()` and `getUserByUserInfo()` methods to use `upsertUser()` when getting users:

```php
// app/Repositories/CustomUserRepository.php
namespace App\Repositories;

use App\User;

use Auth0\Login\Auth0User;
use Auth0\Login\Auth0JWTUser;
use Auth0\Login\Repository\Auth0UserRepository;

class CustomUserRepository extends Auth0UserRepository
{

    /**
     * Get an existing user or create a new one
     *
     * @param array $profile - Auth0 profile
     *
     * @return User
     */
    protected function upsertUser( $profile ) {

        // See if we have a user that matches the Auth0 user_id
        $user = User::where( 'sub', $profile['sub'] )->first();

        // In not, add them to the database
        if ( ! $user ) {
            $user = new User();

            // All are required, no default set
            $user->setAttribute( 'email', $profile['email'] );
            $user->setAttribute( 'sub', $profile['sub'] );
            $user->setAttribute( 'name', isset( $profile['name'] ) ? $profile['name'] : '' );

            $user->save();
        }
        return $user;
    }

    /**
     * Authenticate a user with a decoded ID Token
     *
     * @param object $jwt
     *
     * @return Auth0JWTUser
     */
    public function getUserByDecodedJWT( $jwt ) {
        $user = $this->upsertUser( (array) $jwt );
        return new Auth0JWTUser( $user->getAttributes() );
    }

    /**
     * Get a User from the database using Auth0 profile information
     *
     * @param array $userinfo
     *
     * @return Auth0User
     */
    public function getUserByUserInfo( $userinfo ) {
        $user = $this->upsertUser( $userinfo['profile'] );
        return new Auth0User( $user->getAttributes(), $userinfo['accessToken'] );
    }
}
```

::: note
If you get an error message stating "Can't initialize a new session while there is one active session already" while testing changes to the Repository file, clear all cookies for the testing site and try again. This can happen when a session is set but an error occurs after or the process does not complete.
:::

Finally, we'll change the binding in the `AppServiceProvider` to point to this new custom Repository class:

```php
// app/Providers/AppServiceProvider.php

// ...
use \Auth0\Login\Contract\Auth0UserRepository as Auth0Contract;
use \App\Repositories\CustomUserRepository as UserRepo;

class AppServiceProvider extends ServiceProvider
{
    // ...
    public function register()
    {
        $this->app->bind(
            Auth0Contract::class,
            UserRepo::class
        );
    }
}
```

Logging in for the first time should create a new entry in the database with the Auth0 `sub` ID and email address used. Subsequent logins should simply access that same user and not create any new records. 
