## Laravel API Tutorial

This tutorial shows you how to use the Laravel framework as a REST server using [Json Web Token (JWT)](http://openid.net/specs/draft-jones-json-web-token-07.html) for securing the calls. The token should be sent as a *Bearer Token* in the *Authorization header*.

There are several ways to get the JWT that you are going to use to make the API calls. You can get it via a *WebApp SDK*, *Mobile app*, *Single Page Application* or using the delegation API call (from Auth0).

You can see an example of usage [here](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication/laravel)

### 1. Install the plugin and its dependencies

To install this plugin add the following dependency to your composer.json

    "auth0/laravel-auth0" : "1.0.3"


and run `composer update`

### 2. Enable it in Laravel
Add the following in the list of the services providers, located in `app/config/app.php`


    'providers' => array(
        // ...
        'Auth0\Login\LoginServiceProvider',
    );


Optionally, if you want to use the [facade](http://laravel.com/docs/facades) called `Auth0` you should also add an alias in the same file


    'aliases' => array(
        // ...
        'Auth0' => 'Auth0\Login\Facade\Auth0'
    );


That lets you call the service method like `Auth0::jwtuser()`.

### 3. Configure it

To configure the plugin, you need to publish the plugin configuration by executing the following command

    php artisan config:publish auth0/login

and then modify the config file `app/config/packages/auth0/login/api.php` using the credentials used to create the JWT.

    return array(
        'audience'   => '@@account.clientId@@',
        'secret'     => '@@account.clientSecret@@',
    );

### 4. Configure Apache
By default, Apache doesn't provide the **Authorization header** to the request, we can solve that by enabling *mod_rewrite* and adding the following rule

    RewriteCond %{HTTP:Authorization} ^(.*)
    RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]

### 5. Enable CORS (optional)
This is optional, but you are probably going to need it, in order to activate CORS in Laravel, edit `app/filters.php` and add the following


    App::before(function($request) {
        if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            $statusCode = 204;

            $headers = array(
                'Access-Control-Allow-Origin'      => '*',
                'Access-Control-Allow-Methods'     => 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers'     => 'Origin, Content-Type, Accept, Authorization, X-Requested-With',
                'Access-Control-Allow-Credentials' => 'true'
            );

            return Response::make(null, $statusCode, $headers);
        }
    });

    App::after(function($request, $response) {
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        return $response;
    });

### 6. Use it!

Now you can secure your REST calls like this

    Route::get('/api/protected', array('before'=>'auth-jwt', function() {
        return "Hello " . Auth0::jwtuser()->name;
    }));

Note that the filter will validate the JWT and return a 401 if the token is not valid. If the token is valid, you can access the user information using `Auth0::jwtuser()`

Enjoy!


