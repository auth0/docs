---
lodash: true
---

## PHP Laravel API Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/laravel-auth0/master/create-package?path=examples/laravel-api&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing PHP Laravel app to use it with Auth0.**

### 1. Add the needed dependencies and configure `composer.json`

We need to add **laravel-auth0** dependency to your composer.json. As it depends on some packages that don't yet have tags (firebase/php-jwt for example), you need to first change your `composer.json` `minimum-stability` property to dev.

Once that's done, just run the following:

````bash
composer require auth0/login:~2.1
```

> This sample uses **[Composer](https://getcomposer.org/doc/00-intro.md)**, a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.

### 2. Enable Auth0 in Laravel API

Add the following in the list of the services providers, located in `app/config/app.php`

```php
'providers' => array(
    // ...
    'Auth0\Login\LoginServiceProvider',
);
```

Optionally, if you want to use the [facade](http://laravel.com/docs/facades) called `Auth0` you should also add an alias in the same file

```php
'aliases' => array(
    // ...
    'Auth0' => 'Auth0\Login\Facade\Auth0'
);
```

Now, you will be able to access to the logged user info with `Auth0::getUserInfo()` and hook to the onLogin event  `Auth0::onLogin(function(...))`.

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

To configure the plugin, you need to publish the plugin configuration and complete the file `app/config/laravel-auth0.php` using the information of your Auth0 account.

To publish the example configuration file use this command

````bash
php artisan vendor:publish
```

### 4. Configure APACHE

By default, Apache doesn't provide the `Authorization header` to the request, we can solve that by enabling `mod_rewrite` and adding the following rule to your `.htaccess`:

````bash
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```

### 5. Use it & Run it

Now you can secure your REST calls like this:

````php
Route::get('/api/protected', array('middleware' => 'auth0.jwt', function() {
    return "Hello " . Auth0::jwtuser()->name;
}));
```

You can run the server by doing `php artisan serve --port=3001` to try all this out.

### 6. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Options Steps
#### Configure CORS

To configure CORS, you should add the `laravel-cors` dependency. You can [check it out here](https://github.com/barryvdh/laravel-cors).

After you've installed it, just set the following in the configuration file for `CORS`:

````php
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
