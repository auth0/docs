---
lodash: true
---

##PHP Laravel API

<div class="package">
  <blockquote>
    <a href="https://docs.auth0.com/laravel-auth0/master/create-package?path=examples/laravel-api&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span>Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing PHP Laravel app to use it with Auth0.**

### 1. Add the needed dependencies and configure `composer.json`

We need to add **laravel-auth0** dependency to your composer.json. As it depends on some packages that don't yet have tags (firebase/php-jwt for example), you need to first change your `composer.json` `minimum-stability` property to dev.

Once that's done, just run the following:

````bash
composer require auth0/login:1.0.*
```

### 2. Enable Auth0 in Laravel API

Add the following in the list of the services `providers`, located in `app/config/app.php`

````php
'providers' => array(
    // ...
    'Auth0\Login\LoginServiceProvider',
);
```

Optionally, if you want to use the (facede)[http://laravel.com/docs/facades] called Auth0 you should also add an `alias` in the same file. That lets you call the service method like `Auth0::jwtuser()`.

````php
'aliases' => array(
    // ...
    'Auth0' => 'Auth0\Login\Facade\Auth0'
);
```

### 3. Configure it

To configure the plugin, you need to publish the plugin configuration by executing the following command

````bash
php artisan config:publish auth0/login
```

and then modify the config file `app/config/packages/auth0/login/api.php` using your Auth0 app credentials.

````php
return array(
    'audience'   => '@@account.clientId@@',
    'secret'     => '@@account.clientSecret@@',
);
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
Route::get('/api/protected', array('before'=>'auth-jwt', function() {
    return "Hello " . Auth0::jwtuser()->name;
}));
```

You can run the server by doing `php artisan serve --port=3001` to try all this out.

### 6. You've nailed it.

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
