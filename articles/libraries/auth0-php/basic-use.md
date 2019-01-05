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

The Auth0-PHP SDK comes with a base `Auth0` class that handles common authentication tasks like logging in, logging out, getting user information, and callback processing. These tasks are explained below with examples. For additional information and capabilities, please see the [documentation page for the Authentication API](/libraries/auth0-php/authentication-api).

The examples below assume that you followed the steps in the [Installation and Getting Started sections](/libraries/auth0-php#installation) and are using a `.env` file and loader to store credentials.

### Login

The basic login process in Auth0-PHP uses an [Authentication Code grant](/api-auth/tutorials/authorization-code-grant) combined with Auth0's Universal Login page. In short, that process is:

1. A user requesting access is redirected to the Universal Login Page.
2. The user authenticates using one of many possible connections: social (Twitter or Facebook); database (email and password); passwordless (email or a mobile device).
3. The user is redirected back to your application's callback URL with a `code` and `state` parameter if successful or an `error` and `error_description` if not.
4. If the authentication was successful, the `state` parameter is validated.
5. If the `state` is valid, the `code` parameter is exchanged with Auth0 for an access token.
6. If the exchange is successful, the access token is used to call an Auth0 `/userinfo` endpoint, which returns the authenticated user's information.
7. This information can be used to create an account, to start an application-specific session, or to persist as the user session.

Auth0-PHP handles most of these steps automatically. Your application needs to:

1. Determine a login action (for example: click a link, visit walled content, etc.) and call  `Auth0::login()`
2. Handle returned errors.

A simple implementation of these steps looks like this:

```php
// Example #1
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

    // The scope determines what data is provided by the /userinfo endpoint.
    // There must be at least one valid scope included here.
    'scope' => 'openid',
]);

// If there is a user persisted (PHP session by default), return that.
// Otherwise, look for a "state" and "code" URL parameter to validate and exchange.
// If the state validation and code exchange are successful, return the userinfo.
try {
    $userinfo = $auth0->getUser();
} catch ( CoreException $e ) {
    // Invalid state or session already exists.
    die( $e->getMessage() );
} catch ( ApiException $e ) {
    // Access token not present.
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
array(1) { ["sub"]=> string(30) "auth0|4b12v471de68e34446mq7c2v" }
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

This profile page will return all the data we retrieved from the `/userinfo` endpoint and stored in our session. The data displayed here is controlled by the `scope` parameter we passed to the `Auth0` class. More information on the claims we can pass to `scope` is [here](/api-auth/tutorials/adoption/scope-custom-claims).


```php
// Example #2
// profile.php
use Auth0\SDK\Store\SessionStore;

// Get our persistent storage interface to get the stored userinfo.
$store = new SessionStore();
$userinfo = $store->get('user');

if ($userinfo) {
    // The $userinfo keys below will not exist if the user does not have that data.
    printf(
        '<h1>Hi %s!</h1>
        <p><img width="100" src="%s"></p>
        <p><strong>Contact:</strong> %s %s</p>',
        isset($userinfo['nickname']) ? strip_tags($userinfo['nickname']) : '[unknown]',
        isset($userinfo['picture'])
            ? filter_var($userinfo['picture'], FILTER_SANITIZE_URL)
            : 'https://www.gravatar.com/avatar',
        isset($userinfo['email'])
            ? filter_var($userinfo['email'], FILTER_SANITIZE_EMAIL)
            : '[unknown]',
        !empty($userinfo[ 'email_verified' ]) ? '✓' : '✗'
    );
} else {
    echo '<p>Please <a href="login.php">login</a> to view your profile.</p>';
}
```

### Logout

In addition to logging in, we also want users to be able to log out. When users log out, they must invalidate their session for the application. For this SDK, that means destroying their persistent user and token data:

```php
// Example #2
// logout.php
use Auth0\SDK\Auth0;
use Auth0\SDK\API\Authentication;

$auth0 = new Auth0([
    'domain' => getenv('AUTH0_DOMAIN'),
    'client_id' => getenv('AUTH0_CLIENT_ID'),
    'client_secret' => getenv('AUTH0_CLIENT_SECRET'),
    'redirect_uri' => getenv('AUTH0_REDIRECT_URI'),
]);

// Log out of the local application.
$auth0->logout();
```

If you're using SSO and want this to also end their session at Auth0, see the [SSO Logout section here](/libraries/auth0-php/authentication-api#sso-logout). More information about logging out in general can be found [here](/logout).

**Read More**

::: next-steps
* [Auth0-PHP Introduction](/libraries/auth0-php)
* [Auth0-PHP Authentication API](/libraries/auth0-php/authentication-api)
* [Auth0-PHP Management API](/libraries/auth0-php/management-api)
* [Auth0-PHP JWT Verification](/libraries/auth0-php/jwt-validation)
* [Auth0-PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
