---
title: Login
description: This guide demonstrates how to integrate Auth0 with a Laravel application using the Auth0 Laravel SDK.
topics:
    - quickstart
    - backend
    - laravel
contentType: tutorial
useCase: quickstart
default: true
github:
   path: app
---

<%= include('../_includes/_getting_started', { library: 'Laravel', callback: 'http://localhost:3000/auth0/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Create a Laravel Application

::: note
If you already have a Laravel 9 application prepared, you can skip this step.
:::

Let's begin by setting up a new Laravel application. Let's open a shell and run the following command — replacing `DIRECTORY_NAME` with a directory name of preference to create and install Laravel within. The directory cannot already exist.

```sh
composer create-project --prefer-dist laravel/laravel DIRECTORY_NAME
```

We'll refer to this new directory as our project's root directory. As we work through this tutorial, we'll run any instructed shell commands from within that directory.

## Install the SDK

Let's install the [Auth0's Laravel SDK](https://github.com/auth0/laravel-auth0) to protect our new Laravel application's routes. The SDK offers a range of middleware types and router controllers that will help us integrate authentication and protect our application's routes.

From a shell opened to our project's root directory, let's use Composer to install the SDK in our application:

```sh
composer require auth0/login
```

## Configure the SDK

Next, let's create the SDK's configuration file. Again from a shell opened to our projects root directory, let's use Laravel's the `vendor:publish` command to import the configuration file into our application:

```sh
php artisan vendor:publish --tag auth0-config
```

Now we can begin configuring our Auth0 integration by adding options to the `.env` file in our project's root directory. Let's open that `.env` file and add some essential details for our project:

```sh
# The URL of your Auth0 tenant domain
# You'll find this in your Auth0 Application's settings page.
AUTH0_DOMAIN=${account.namespace}

# Your Auth0 application's Client ID
# You'll find this in your Auth0 Application's settings page.
AUTH0_CLIENT_ID=${account.clientId}

# Your Auth0 application's Client ID
# You'll find this in your Auth0 Application's settings page.
AUTH0_CLIENT_SECRET=${account.clientSecret}

# Your Auth0 Custom API identifier/audience.
# You'll find this in your Custom API's settings page.
AUTH0_AUDIENCE=${apiIdentifier}

# Authentication callback URI, as defined in your Auth0 Application settings.
# (You must configure this in your AUth0 Application's settings page as well!)
AUTH0_REDIRECT_URI=http://localhost:3000/auth0/callback
```

## Configure the application

Now let's connect our Laravel application with the SDK so we can begin working with our Auth0 integration. For this, we'll be making changes to our `config\auth.php` file. This file contains a lot of settings, but we only need to make a few small changes.

To start, let's find the `defaults` section. We'll set the default `guard` to `auth0`, like this:

```php
// 📂 config/auth.php

'defaults' => [
    'guard' => 'auth0',
    // 📝 Leave any other settings in this section alone.
],
```

Next, find the `guards` section, and add `auth0` there:
```php
// 👆 Continued from above, in config/auth.php

'guards' => [
    // 📝 Any additional guards you use should stay here, too.

    'auth0' => [
        'driver' => 'auth0',
        'provider' => 'auth0',
    ],
],
```

Finally, find the `providers` section, and add `auth0` there as well:
```php
// 👆 Continued from above, in config/auth.php

'providers' => [
    // 📝 Any additional providers you use should stay here, too.

    'auth0' => [
        'driver' => 'auth0',
        'repository' => \Auth0\Laravel\Auth\User\Repository::class
    ],
],
```

## Authentication routes

To make setting up authentication a cinch, the SDK includes some plug-and-play router controllers we can setup some routes with. Let's edit our `routes/web.php` file to add those now:

```php
// 📂 routes/web.php
// 👆 Keep anything already present in the file, just add the following ...

Route::get('/login', \Auth0\Laravel\Http\Controller\Stateful\Login::class)->name('login');
Route::get('/logout', \Auth0\Laravel\Http\Controller\Stateful\Logout::class)->name('logout');
Route::get('/auth0/callback', \Auth0\Laravel\Http\Controller\Stateful\Callback::class)->name('auth0.callback');
```

- We'll direct our end users to the `/login` route when they want to login, where they'll use Auth0's Universal Login Page to authenticate with our app.
- The `/logout` route will redirect them to Auth0's logout endpoint and sign them out of our application.
- The `/auth0/callback` route handles some important final authentication matters for us after the user logs in, and sets up the user's local session with our application.

## Protecting routes

Now we can setup our routes using the SDK's middleware to automatically protect parts of our application. For this type of application there are two types of middleware available — so let's create a few routes to demonstrate them!

We'll need to again edit our `routes/web.php` file, and add the following routes to that file:

```php
// 📂 routes/web.php
// 👆 Keep anything already present in the file, just add the following ...

Route::get('/', function () {
    if (Auth::check()) {
        return view('auth0.user');
    }

    return view('auth0/guest');
})->middleware(['auth0.authenticate.optional']);
```

This route demonstrates the `auth0.authenticate.optional` middleware. This middleware will resolve an available user session (allowing you to access the user's profile through the `Auth::user()` method) but won't block requests without a session, allowing you to treat those as "guest" requests.

Let's add another to that file:

```php
// 👆 Continued from above, in routes/web.php

// Require an authenticated session to access this route.
Route::get('/required', function () {
    return view('auth0.user');
})->middleware(['auth0.authenticate']);
```

This middleware will reject requests from end users that aren't authenticated, limiting that route to requests from users with accounts.

## Adding views

Last but not least, let's create a couple small Blade views that we defined in those routes; nothing fancy here, just for demonstration purposes.

Let's create our `resources/views/auth0/guest.blade.php` file:

```php
// 📂 resources/views/auth0/guest.blade.php

<!DOCTYPE html>
<html>
    <body>
        <p>You're a guest. <a href="{{ route('login') }}">Log in</a></p>
    </body>
</html>
```

And finally, let's create our `resources/views/auth0/user.blade.php` file:

```php
// 📂 resources/views/auth0/user.blade.php

<!DOCTYPE html>
<html>
    <body>
        <p>Welcome! You are authenticated. <a href="{{ route('logout') }}">Log out</a></p>
        <div>
            <pre><?php print_r(Auth::user()) ?></pre>
        </div>
    </body>
</html>
```

In a real world application you'll probably want to do something a bit more elaborate, but this will serve our needs here!

## Run the application

We've installed Laravel and the SDK, configured our application, and set up some routes — all that's left is for us to try out our new application:

```sh
php artisan serve --port=3000
```

We're all set our new application is live and waiting for us. Give it a try by loading [http://localhost:3000](http://localhost:3000) in your web browser.
