---
section: libraries
toc: true
description: Auth0-PHP Basic Use
topics:
  - libraries
  - php
contentType: how-to
---

# Auth0-PHP Basic Use

The Auth0-PHP SDK comes with a base `Auth0` class that handles common authentication tasks like logging in, logging out, getting user information, and <dfn data-key="callback">callback</dfn> processing. These tasks are explained below with examples. For additional information on these capabilities and more, please see the [documentation page for the Authentication API](/libraries/auth0-php/authentication-api).

## Prerequisites

The examples below assume that you followed the steps in the [Installation and Getting Started sections](/libraries/auth0-php#installation) and are using a `.env` file and loader to store credentials.

### Login

The default login process in Auth0-PHP uses an [Authentication Code grant](/api-auth/tutorials/authorization-code-grant) combined with Auth0's <dfn data-key="universal-login">Universal Login</dfn> Page. In short, that process is:

1. A user requesting access is redirected to the Universal Login Page.
2. The user authenticates using one of [many possible connections](https://auth0.com/docs/identityproviders): social (Google, Twitter, Facebook), database (email and password), <dfn data-key="passwordless">passwordless</dfn> (email, SMS), or enterprise (ActiveDirectory, ADFS, Office 365).
3. The user is redirected or posted back to your application's callback URL with `code` and `state` values if successful or an `error` and `error_description` if not.
4. If the authentication was successful, the `state` value is validated.
5. If the `state` is valid, the `code` value is exchanged with Auth0 for an <dfn data-key="id-token">ID Token</dfn> and/or an <dfn data-key="access-token">Access Token</dfn>.
6. The identity from the ID token can be used to create an account, to start an application-specific session, or to persist as the user session.

Auth0-PHP handles most of these steps automatically. Your application needs to:

1. Determine a login action (for example: click a link, visit walled content, etc.) and call  `Auth0\SDK\Auth0::login()`
2. Handle returned errors, if present, or get the user information with `Auth0\SDK\Auth0::getUser()`

A simple implementation of these steps looks like this:

```php
// login.php
use Auth0\SDK\Auth0;
use Auth0\SDK\Exception\CoreException;
use Auth0\SDK\Exception\ApiException;

// Handle errors sent back by Auth0.
if (! empty($_GET['error']) || ! empty($_GET['error_description'])) {
    printf( '<h1>Error</h1><p>%s</p>', htmlspecialchars( $_GET['error_description'] ) );
    die();
}

// Initialize the Auth0 class with required credentials.
$auth0 = new Auth0([
    'domain' => getenv('AUTH0_DOMAIN'),
    'client_id' => getenv('AUTH0_CLIENT_ID'),
    'client_secret' => getenv('AUTH0_CLIENT_SECRET'),
    'redirect_uri' => getenv('AUTH0_REDIRECT_URI'),

    // The scope determines what data is provided in the ID token.
    // See: https://auth0.com/docs/scopes/current
    'scope' => 'openid email profile',
]);

// If there is a user persisted (PHP session by default), return that.
// Otherwise, look for a "state" and "code" URL parameter to validate and exchange.
// If the state validation and code exchange are successful, return `userinfo`.
try {
    $userinfo = $auth0->getUser();
} catch (Exception $e) {
    die( $e->getMessage() );
}

// No user information so redirect to the Universal Login Page.
if (empty($userinfo)) {
    $auth0->login();
}

// We either have a persisted user or a successful code exchange.
var_dump($userinfo);

// This is where a user record in a local database could be retrieved or created.
// End with a redirect to a new page.
```

In this case, we're using a file `login.php` at the root of our domain (like `https://example.com/login.php`). For this to work properly, we'll need to add this URL to the Auth0 Application's "Allowed Callback URLs" field on the settings page. We'll also need this same value saved in our `.env` file for `AUTH0_REDIRECT_URI`. After that, loading the script above in your browser should:

1. Immediately redirect you to an Auth0 login page for your tenant.
2. After successfully logging in using any connection, redirect you back to your app.
3. Display the returned user information:

```
array(1) { ["sub"]=> string(30) "strategy|user_id" }
```

### Profile

Once a user has authenticated, we can use their persisted data to determine whether they are allowed to access sensitive site pages, like a user profile.

Using the example above, we'll add additional [scopes](/api-auth/tutorials/adoption/scope-custom-claims) to make the profile a little more interesting:

```php
// login.php

// ...
    'scope' => 'openid email name nickname picture',
// ...
```

Once someone has logged in requesting the new user claims, let's redirect to a profile page instead of outputting the user information:

```php
// login.php

//...
// var_dump($userinfo);
header('Location: /profile.php');
```

This profile page will return all the data we retrieved from the `/userinfo` endpoint and stored in our session. The <dfn data-key="scope">`scope`</dfn> parameter controls the data displayed here we passed to the `Auth0` class. More information on the claims we can pass to `scope` is [here](/api-auth/tutorials/adoption/scope-custom-claims).

```php
// profile.php
use Auth0\SDK\Store\SessionStore;

// Get our persistent storage interface to get the stored userinfo.
$store = new SessionStore();
$user  = $store->get('user');

if ($user) {
    // The $userinfo keys below will not exist if the user does not have that data.
    printf(
        '<h1>Hi %s!</h1>
        <p><img width="100" src="%s"></p>
        <p><strong>Last update:</strong> %s</p>
        <p><strong>Contact:</strong> %s %s</p>
        <p><a href="logout.php">Logout</a></p>',
        isset($user['nickname']) ? strip_tags($user['nickname']) : '[unknown]',
        isset($user['picture']) ? filter_var($user['picture'], FILTER_SANITIZE_URL) : 'https://gravatar.com/avatar/',
        isset($user['updated_at']) ? date('j/m/Y', strtotime($user['updated_at'])) : '[unknown]',
        isset($user['email']) ? filter_var($user['email'], FILTER_SANITIZE_EMAIL) : '[unknown]',
        ! empty($user['email_verified']) ? '✓' : '✗'
    );
} else {
    echo '<p>Please <a href="login.php">login</a> to view your profile.</p>';
}
```

### Logout

In addition to logging in, we also want users to be able to log out. When users log out, they must invalidate their session for the application. For this SDK, that means destroying their persistent user and token data:

```php
// logout.php
use Auth0\SDK\Auth0;

$auth0 = new Auth0([
    'domain' => getenv('AUTH0_DOMAIN'),
    'client_id' => getenv('AUTH0_CLIENT_ID'),
    'redirect_uri' => getenv('AUTH0_LOGIN_BASIC_CALLBACK_URL'),
]);

// Log out of the local application.
$auth0->logout();
```

If you're using <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> and also want to end their Auth0 session, see the [SSO Logout section here](/libraries/auth0-php/authentication-api#sso-logout). More information about logging out, in general, can be found [here](/logout).

### Read more

::: next-steps
* [Auth0-PHP Introduction](/libraries/auth0-php)
* [Auth0-PHP Authentication API](/libraries/auth0-php/authentication-api)
* [Auth0-PHP Management API](/libraries/auth0-php/management-api)
* [Auth0-PHP JWT Validation](/libraries/auth0-php/jwt-validation)
* [Auth0-PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
