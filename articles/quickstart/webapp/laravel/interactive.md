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

# Add Login to your Laravel application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Laravel web application using the Auth0 Laravel SDK. 

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/auth0/callback',
  returnTo: 'http://localhost:3000/'
}) %>

## Create a Laravel application

::: note
If you already have a Laravel 9 application prepared, you can skip this step.
:::

Let's begin by setting up a new Laravel application. Open a shell and run the following command — replacing `DIRECTORY_NAME` with a directory name of preference to create and install Laravel within. The directory cannot already exist.

```sh
composer create-project --prefer-dist laravel/laravel DIRECTORY_NAME dev-master
```

We'll refer to this new directory as our project's root directory. As we work through this tutorial, we'll run any instructed shell commands from within that directory.

Alternatively, you can download a sample project using the **Download Sample** button.

## Install the SDK

Install [Auth0's Laravel SDK](https://github.com/auth0/laravel-auth0) to protect our new Laravel application's routes. The SDK offers a range of middleware types and router controllers that will help us integrate authentication and protect our application's routes.

From a shell opened to our project's root directory, let's use Composer to install the SDK in our application:

```sh
composer require auth0/login
```

## Configure the SDK {{{ data-action=code data-code=".env" }}}

Create the SDK's configuration file by opening a shell to the projects root directory,  and use Laravel's the `vendor:publish` command to import the configuration file into the application:

```sh
php artisan vendor:publish --tag=auth0-config
```

Now we can begin configuring our Auth0 integration by adding options to the `.env` file in our project's root directory. Open that `.env` file and add some essential details for our project.

## Configure the application {{{ data-action=code data-code="config/auth.php" }}}

Now let's connect our Laravel application with the SDK so we can begin working with our Auth0 integration. For this, we will be making changes to our `config\auth.php` file. This file contains a lot of settings, but we only need to make a few small changes.

- In the `defaults` section, set the default `guard` to `auth0`.
- In the `guards` section, add a guard for `auth0`.
- In the `providers` section, add a provider for `auth0`.

## Authentication routes {{{ data-action=code data-code="routes/web.php#1:3" }}}

To make setting up authentication a cinch, the SDK includes some plug-and-play router controllers we can setup some routes with. 

Inside `routes/web.php`:

- Direct the end users to the `/login` route when they want to login, where they'll use Auth0's Universal Login Page to authenticate with our application.
- The `/logout` route will redirect them to Auth0's logout endpoint and sign them out of our application.
- The `/auth0/callback` route handles some important final authentication matters for us after the user logs in, and sets up the user's local session with our application.

## Protecting routes {{{ data-action=code data-code="routes/web.php#5:16" }}}

We can setup our routes using the SDK's middleware to automatically protect parts of our application. For this type of application there are two types of middleware available.

- `auth0.authenticate.optional`: This middleware will resolve an available user session (allowing you to access the user's profile through the `Auth::user()` method) but won't block requests without a session, allowing you to treat those as "guest" requests.
- `auth0.authenticate`: This middleware will reject requests from end users that aren't authenticated, limiting that route to requests from users with accounts.

Edit the `routes/web.php` file, and add the corresponding routes to that file.

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

::::checkpoint

:::checkpoint-default

Now that you have configured your Laravel application to use Auth0, run your application to verify that:
* Navigating to the `/login` route will redirect the user to Auth0
* After entering their credentials, the user is redirected back to the application, indicating they are authenticated. 
* Accessing the `/required` route is prohibited for users that are not authenticated.
* Navigating to the `/logout` route will redirect them to Auth0's logout endpoint and sign them out of our application.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain, Client ID and Client Secret are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

:::_: