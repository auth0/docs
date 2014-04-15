# Using Auth0 with PHP

This tutorial explains how to integrate Auth0 with a PHP application.

## Tutorial

### 1. Install the SDK

We recommend using [Composer](http://getcomposer.org/doc/01-basic-usage.md) to install the library.

Modify your `composer.json` to add the following dependencies


    {
        "require": {
            "auth0/auth0-php": "0.6.*",
            "adoy/oauth2": "dev-master"
        }
    }


and run

    php composer.phar install


### 2. Setup the callback action
Create a php page (or action if you are using an MVC framework) that will handle the callback from the login attempt.

In there, you should create an instance of the SDK with the proper configuration and ask for the user information.


    use Auth0SDK\Auth0;

    $auth0 = new Auth0(array(
        'domain'        => '@@account.namespace@@',
        'client_id'     => '@@account.clientId@@',
        'client_secret' => '@@account.clientSecret@@',
        'redirect_uri'  => '@@account.callback@@'
    ));

    $userInfo = $auth0->getUserInfo();


If the user was already logged in, `getUserInfo()` will retrieve that [user information](https://docs.auth0.com/user-profile) from the `PHP Session`. If not, it will try to exchange the code given to the callback to get an access token, id token and the [user information](https://docs.auth0.com/user-profile) from auth0.

This makes it possible to use the same code in the callback action and any other page, so to see if there is a logged in user, you can call



    // ...
    // code from above

    if (!$userInfo) {
        // print login button
    } else {
        // Say hello to $userInfo['name']
        // print logout button
    }


### 3. Setup the callback action in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a POST to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>
</div>

    '@@account.callback@@'


### 4. Triggering login manually or integrating the Auth0 widget

@@sdk2@@

### 5. (Optional) Configure session data

By default, the SDK will store the [user information](https://docs.auth0.com/user-profile) in the `PHP Session` and it will discard the access token and the id token. If you like to persist them as well, you can pass `'persist_access_token' => true` and `'persist_id_token' => true` to the SDK configuration in step 2. You can also disable session all together by passing `'store' => false`.

If you want to change `PHP Session` and use Laravel, Zend, Symfony or other abstraction to the session, you can create a class that implements `get`, `set`, `delete` and pass it to the SDK as following.


    $laravelStore = new MyLaravelStore();
    $auth0 = new Auth0(array(
        // ...
        'store' => $laravelStore,
        // ...
    ));



#### See the examples

Browse the examples on <a target="_new" href="https://github.com/auth0/Auth0-PHP/tree/master/examples">GitHub</a>.
