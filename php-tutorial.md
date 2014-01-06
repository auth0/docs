# Using Auth0 with PHP

This tutorial explains how to integrate Auth0 with a PHP application.

## Tutorial

### 1. Install Auth0-PHP-SDK package

Use <a target="_new" href="http://getcomposer.org/doc/01-basic-usage.md">Composer</a> to install Auth0 package:

```
"require": {
    "auth0/auth0-php-sdk": "0.6.*"
}
```

	php composer.phar install

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a POST to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

<pre><code>http://localhost:PORT/callback.php</pre></code>
</div>

### 3. Handle authentication with Auth0

Edit the callback page to create an instance of the Auth0 class in order to exchange the authorization code (provided by Auth0) for an access_token:

```
use Auth0SDK\Auth0;

$auth0 = new Auth0(array(
	'domain'        => '@@account.namespace@@',
    'client_id'     => '@@account.clientId@@',
    'client_secret' => '@@account.clientSecret@@',
    'redirect_uri'  => '@@account.callback@@',
    'debug'         => true
));

$access_token = $auth0->getAccessToken();
```

### 4. Triggering login manually or integrating the Auth0 widget

@@sdk2@@

### 5. Accessing user information

Once the user successfully authenticated to the application, you can retrieve his profile:

    $userProfile = $auth0->getUserInfo();

The user profile is normalized regardless of where the user came from. We will always include these: `user_id`, `name`, `email`, `nickname` and `picture`. For more information about the user profile [read this](user-profile).


**Congratulations!**

----

### More information...

#### Download the sample

Browse the sample on <a target="_new" href="https://github.com/auth0/Auth0-PHP/tree/master/examples">GitHub</a>.
