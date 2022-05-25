---
title: Add Login to your Laravel application
description: This guide demonstrates how to integrate Auth0 with a Laravel application using the Auth0 Laravel SDK.
budicon: 448
topics:
    - quickstart
    - backend
    - laravel
github:
   path: app
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/env
  - files/auth
  - files/web
---

# Add login to your Laravel application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Laravel web application using the Auth0 Laravel SDK.

<%= include('../../_includes/_configure_auth0_interactive', {
  callback: 'http://localhost:3000/auth0/callback',
  returnTo: 'http://localhost:3000/'
}) %>

## Create a Laravel application

::: note
If you already have a Laravel 9 application prepared, you can skip this step.
:::

Begin by setting up a new Laravel application. Open a shell and run the command below. Replace `DIRECTORY_NAME` with your preferred directory name to create and install in Laravel. The directory cannot already exist.

```sh
composer create-project --prefer-dist laravel/laravel DIRECTORY_NAME dev-master
```

This new directory is your project's root directory. As you work through this tutorial, run any instructed shell commands from within that directory.

Alternatively, you can download a sample project using the **Download Sample** button.

## Install the SDK

Install the [Auth0's Laravel SDK](https://github.com/auth0/laravel-auth0) to protect your new Laravel application's routes. The SDK offers a range of middleware types and router controllers which help integrate authentication and protect the application's routes.

In your project's root directory, use Composer to install the SDK in your application:

```sh
composer require auth0/login
```

## Configure the SDK {{{ data-action=code data-code=".env" }}}

Create the SDK's configuration file from the project's root directory. Use Laravel's the `vendor:publish` command to import the configuration file into the application:

```sh
php artisan vendor:publish --tag=auth0-config
```

Now, configure your Auth0 integration by adding options to the `.env` file in the project's root directory. Open that `.env` file and add some essential details for our project.

## Configure the application {{{ data-action=code data-code="config/auth.php" }}}

Now connect your Laravel application with the SDK so you can work with your Auth0 integration. For this connection, make changes to your `config\auth.php` file. This file contains different settings, but you only need to make a few small changes.

- In the `defaults` section, set the default `guard` to `auth0`.
- In the `guards` section, add a guard for `auth0`.
- In the `providers` section, add a provider for `auth0`.

## Authentication routes {{{ data-action=code data-code="routes/web.php#1:3" }}}

Set-up authentication routes with the SDK plug-and-play router controllers. 

Inside `routes/web.php`:

- Direct end users to the `/login` route so they can use Auth0's Universal Login page to authenticate with your application.
- The `/logout` route redirects users to Auth0's logout endpoint and signs them out of your application.
- The `/auth0/callback` route handles some important final authentication matters after the user logs in, and aligns the user's local session with our application.

## Configure route protection {{{ data-action=code data-code="routes/web.php#5:16" }}}

We can configure our routes using the SDK's middleware to automatically protect parts of our application. For this type of application, two types of middleware are available:

- `auth0.authenticate.optional`: This middleware resolves an available user session (allows access to the user's profile through the `Auth::user()` method) but won't block requests without a session. Thoses requests are treated as "guest" requests.
- `auth0.authenticate`: This middleware rejects requests from end users that aren't authenticated and limits that route to requests from users with accounts.

Edit the `routes/web.php` file, and add the corresponding routes to that file.

## Add views

Finally, create a few blade views you defined in those routes.

Create the `resources/views/auth0/guest.blade.php` file:

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

In a real world application, you want to be more elaborate with your views, but this serves as a demonstration.

## Run the application

So far you have installed Laravel and the SDK, configured your application, and set up some routes — all that's left is to try out our new application:

```sh
php artisan serve --port=3000
```

You're all set. Your new application is live and waiting for use. Give it a try by loading [http://localhost:3000](http://localhost:3000) in your web browser.

::::checkpoint

:::checkpoint-default

Now that you have configured your Laravel application to use Auth0, run your application to verify that:
* When users navigate to the `/login` route, they redirect to Auth0.
* Users redirect back to your application after sucessfully entering their credentials, indicating they are authenticated. 
* Users not authenticated are prohibited from accessing the `/required` route. 
* When users navigate to the `/logout` route, they redirect to Auth0's logout endpoint and sign them out of our application.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain, Client ID and Client Secret are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::
