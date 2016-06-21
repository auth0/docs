---
title: Authenticate
description: This tutorial will show you how to use the Auth0 PHP Laravel SDK to add authentication and authorization to your API.
---

## PHP Laravel API Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Composer 1.0-dev
* PHP 5.6.18
* Laravel 5.1.31
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'laravel-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/laravel-api',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

**Otherwise, Please follow the steps below to configure your existing PHP Laravel app to use it with Auth0.**

### 1. Add the needed dependencies and configure `composer.json`

We need to add **laravel-auth0** dependency to your composer.json.

Once that's done, just run the following:

${snippet(meta.snippets.dependencies)}

> This sample uses **[Composer](https://getcomposer.org/doc/00-intro.md)**, a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.

### 2. Enable Auth0 in Laravel API

Add the following in the list of the services providers, located in `config/app.php`

${snippet(meta.snippets.setup)}

Optionally, if you want to use the [facade](http://laravel.com/docs/facades) called `Auth0` you should also add an alias in the same file

```php
'aliases' => array(
    // ...
    'Auth0' => 'Auth0\Login\Facade\Auth0'
);
```

Now, you will be able to access to the logged user info with `Auth0::getUser()` and hook to the onLogin event  `Auth0::onLogin(function(...))`.

If you want to restrict access with the Auth0 Middleware, you will need to add it in `app/Http/Kernel.php`

```php
...

protected $routeMiddleware = [
	...
	'auth0.jwt' => 'Auth0\Login\Middleware\Auth0JWTMiddleware',
];

...

```

Finally, you will need to bind a class that provides the users (your app model user) each time a user is logged in or a JWT is decoded. You can use the `Auth0UserRepository` provided by this package or build your own (which should implement the `\Auth0\Login\Contract\Auth0UserRepository` interface).
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
