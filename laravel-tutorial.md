# Laravel Auth0 Plugin
This plugin helps you integrate your Laravel WebApp with [Auth0](https://auth0.com/) to achieve Single Sign On with a few simple steps. You can see an example of usage [here](https://github.com/auth0/laravel-auth0-sample)

## Tutorial

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


That lets you call the service method like `Auth0::getUserInfo()` or `Auth0::onLogin(function(...))`.

### 3. Configure it

To configure the plugin, you need to publish the plugin configuration by executing the following command

    php artisan config:publish auth0/login

and then modify the config file `app/config/packages/auth0/login/config.php` using your Auth0 account information, as following.

    return array(
        'domain'        => '@@account.namespace@@',
        'client_id'     => '@@account.clientId@@',
        'client_secret' => '@@account.clientSecret@@',
        'redirect_uri'  => '@@account.callback@@'
    );



### 4. Setup the callback action

The plugin works with the [Laravel security system](http://laravel.com/docs/security), but instead of using the `Auth::attempt` in a controller that handles a login form submit, you have to hookup the callback uri.

In other words, you need to select a uri (for example /auth0/callback), configure it in your <a href="@@uiAppSettingsURL@@" target="_new">Application Settings</a> and add it as a route in Laravel.


    Route::get('/auth0/callback', 'Auth0\Login\Auth0Controller@callback');


### 5. Triggering login manually or integrating the Auth0 widget

@@sdk2@@


### 6. Defining a user and a user provider

The [Laravel Security System](http://laravel.com/docs/security) needs a *User Object* given by a *User Provider*. With this two abstractions, the user entity can have any structure you like and can be stored anywhere. You configure the *User Provider* indirectly, by selecting an auth driver in `app/config/auth.php`. The default driver is Eloquent, which persists the User model in a database using the ORM.

#### 6.1. Using the auth0 driver

The plugin comes with an authentication driver called auth0. This driver defines a user structure that wraps the [Normalized User Profile](@@base_url@@/user-profile) defined by Auth0, and it doesn't actually persist the object, it just stores it in the session for future calls.

This works fine for basic testing or if you don't really need to persist the user. In any point you can call `Auth::check()` to see if there is a user logged in and `Auth::user()` to get the wrapper with the user information.

#### 6.2. Using other driver

If you want to persist the user you can use the authentication driver you like. The plugin gives you a hook that is called with the *Normalized User Profile* when the callback is succesful, there you can store the user structure as you want. For example, if we use Eloquent, we can add the following code, to persist the user in the database


    Auth0::onLogin(function($auth0User) {
        // See if the user exists
        $user = User::where("auth0id", $auth0User->user_id)->first();
        if ($user === null) {
            // If not, create one
            $user = new User();
            $user->email = $auth0User->email;
            $user->auth0id = $auth0User->user_id;
            $user->nickname = $auth0User->nickname;
            $user->name = $auth0User->name;
            $user->save();
        }
        return $user;
    });


Note that this hook must return the new user, which must implement the `Illuminate\Auth\UserInterface`. The onLogin function is going to be called just once, when the callback uri is called, then its up to the selected auth driver to get the user from the database.

### 7. Use it!

Now you can use Laravel filters as you would normally do to restrict access, for example


    Route::get('admin', array('before' => 'auth', function() {
        // ...
    }));


Or add a logout action like this

    Route::get('/logout', function() {
        Auth::logout();
        return Redirect::home();
    });


Enjoy!


