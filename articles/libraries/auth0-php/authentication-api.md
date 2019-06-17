---
section: libraries
toc: true
description: Using the Authentication API with Auth0-PHP
topics:
  - libraries
  - php
contentType: how-to
---
# Using the Authentication API with Auth0-PHP

The Auth0 PHP SDK provides you with methods you can use to access the [Authentication API](/api/authentication).

In this article, you'll find examples of common authentication operations. You will find additional information in the methods in the `\Auth0\SDK\API\Authentication` class.

::: warning
Do not use methods marked as `@deprecated`. Deprecated methods will be removed in the next major version release and will no longer be available.
:::

## Prerequisites

The examples below assume you completed the [Installation and Getting Started sections](/libraries/auth0-php#installation) and are using a `.env` file and loader to store credentials.

## Authorization Code Flow

An [Authorization Code grant](/api-auth/tutorials/authorization-code-grant) is the basic way to grant users access to your application. This flow is the same one used on the [Basic Use page](/libraries/auth0-php/basic-use#login). If you need more granular control over the login or <dfn data-key="callback">callback</dfn> process, this section walks through how to use the Authentication API directly.

In the example below, we're going to receive the <dfn data-key="access-token">Access Token</dfn> in the POST body instead of a URL parameter. First, the user must authenticate with Auth0 to generate the authorization code. This is done by redirecting to the `/authorize` endpoint for your tenant domain. The following code would appear on a page that requires authentication:

```php
// auth-required.php
use Auth0\SDK\API\Authentication;
use Auth0\SDK\Store\SessionStore;
use Auth0\SDK\API\Helpers\State\SessionStateHandler;

if (! isUserAuthenticated()) {
    // Generate and store a state value.
    $session_store = new SessionStore();
    $state_handler = new SessionStateHandler($session_store);
    $state_value   = $state_handler->issue();

    $auth0_api = new Authentication(
        getenv('AUTH0_DOMAIN'),
        getenv('AUTH0_CLIENT_ID')
    );

    // Generate the authorize URL.
    $authorize_url = $auth0_api->get_authorize_link(
        // Response expected by the application.
        'code',
        // Callback URL to respond to.
        getenv('AUTH0_REDIRECT_URI'),
        // Connection to use, null for all.
        null,
        // State value to send with the request.
        $state_value,
        [
            // Respond with the code and state in a POST body.
            'response_mode' => 'form_post',
            // Userinfo to allow.
            'scope' => 'openid email profile',
        ]
    );

    header('Location: '.$authorize_url);
    exit;
}

echo '<h1>Sensitive data!</h1>';

/**
 * Determine if a user session exists.
 *
 * @return boolean
 */
function isUserAuthenticated()
{
    $store    = new SessionStore();
    $userinfo = $store->get('user');
    return ! empty( $userinfo );
}
```

The process above does the following:

1. First, we check if there is a user session with `isUserAuthenticated()`. The implementation here just checks if the SDK has a persisted user. Your application might handle user sessions differently.
1. If there is no session, then we need to log the user in by redirecting to the <dfn data-key="universal-login">Universal Login</dfn> Page.
1. We set a state value with the login request and then verify that value when the code is returned on the callback URL. The `$state_handler->issue()` call above both generates a value and stores it in the PHP session store. This can also be done manually and stored in either the PHP session or cookies.
1. The `$auth0_api->get_authorize_link()` call builds the correct `/authorize` link with the correct response type (`code` in this case), redirect URI (wherein the application we will handle the response, explained below), state (from above), response mode (POST body), and <dfn data-key="scope">scopes</dfn> requested.
1. Then we redirect to this URL and wait for a response.

After authentication, the user is redirected to the callback URL, which is handled with the following:

```php
// auth-required-callback.php
use Auth0\SDK\API\Authentication;
use Auth0\SDK\Store\SessionStore;
use Auth0\SDK\API\Helpers\State\SessionStateHandler;

// Handle errors sent back by Auth0.
if (! empty($_POST['error']) || ! empty($_POST['error_description'])) {
    printf( '<h1>Error</h1><p>%s</p>', htmlspecialchars( $_GET['error_description'] ) );
    die();
}

// Nothing to do.
if (empty( $_POST['code'] )) {
    die('No authorization code found.');
}

// Validate callback state.
$session_store = new SessionStore();
$state_handler = new SessionStateHandler($session_store);
if (! isset( $_POST['state'] ) || ! $state_handler->validate( $_POST['state'] )) {
    die('Invalid state.');
}

// Instantiate the Authentication class with the client secret.
$auth0_api = new Authentication(
    getenv('AUTH0_DOMAIN'),
    getenv('AUTH0_CLIENT_ID'),
    getenv('AUTH0_CLIENT_SECRET')
);

try {
    // Attempt to get an access_token with the code returned and original redirect URI.
    $code_exchange_result = $auth0_api->code_exchange( $_POST['code'], getenv('AUTH0_REDIRECT_URI') );
} catch (Exception $e) {
    // This could be an Exception from the SDK or the HTTP client.
    die( $e->getMessage() );
}

try {
    // Attempt to get an access_token with the code returned and original redirect URI.
    $userinfo_result = $auth0_api->userinfo( $code_exchange_result['access_token'] );
} catch (Exception $e) {
    die( $e->getMessage() );
}

$session_store->set('user', $userinfo_result);
header('Location: /examples/auth-required.php');
exit;
```

Walking through the process in detail:

1. First, we check for returned errors. Errors returned should have an `error` key containing the error code and an `error_description` key containing human-readable information.
1. Next, we look for a non-empty `code` parameter in the POST body. In this case, we kill the process, but this could also redirect to a different page in case this URL is accessed directly.
1. Now we check to make sure we have a `state` value and make sure it matches the same one we generated. This is important to avoid CSRF attacks ([more information](/protocols/oauth2/oauth-state)).
1. After the state validation, we instantiate an instance of the `Authentication` class with the Domain, Client ID, and the Client Secret, which is used with the `code` to obtain an access token.
1. We attempt an exchange with the `$auth0_api->code_exchange()` call, making sure to pass in the same redirect URI we used to request the `code`.
1. If this succeeds, we know the exchange was successful, and we have an access token. We call the `/userinfo` endpoint with this token, which will return an object containing the data we requested in the `scopes` parameter on the authorize URL.
1. If this last step succeeds, we store the user and redirect back to our sensitive data.

## Client Credentials Flow

A [Client Credentials grant](/api-auth/tutorials/client-credentials) gives an application access to a specific API based on the scopes set in the dashboard. This is how applications can, for example, make calls to the Management API. Successful authentication will result in an Access Token being issued for the API requested.

First, turn on the **Client Credentials** grant on then **Advanced settings > Grant Types** tab on the Application settings page.

Next, authorize the Application for the API being used on the **Machine to Machine Applications** tab on the API's **Settings** page. Make sure all necessary scopes are selected (but no more) and **Update**. Switch back to the **Settings** tab and copy the **Identifier** value. This needs to be added to a `AUTH0_MANAGEMENT_AUDIENCE` key in your `.env` file.

Request an Access Token for the API using the example below:

```php
// Example #5
use \Auth0\SDK\API\Authentication;
use \Auth0\SDK\Exception\ApiException;
use \GuzzleHttp\Exception\ClientException;

$auth0_api = new Authentication( getenv('AUTH0_DOMAIN') );

$config = [
    'client_secret' => getenv('AUTH0_CLIENT_SECRET'),
    'client_id' => getenv('AUTH0_CLIENT_ID'),
    'audience' => getenv('AUTH0_MANAGEMENT_AUDIENCE'),
];

try {
    $result = $auth0_api->client_credentials($config);
    echo '<pre>' . print_r($result, true) . '</pre>';
    die();
} catch (ClientException $e) {
    echo 'Caught: ClientException - ' . $e->getMessage();
} catch (ApiException $e) {
    echo 'Caught: ApiException - ' . $e->getMessage();
}
```

If the grant was successful, you should see the following:

```
Array
(
    [access_token] => eyJ0eXAi...eyJpc3Mi...QoB2c24w
    [scope] => read:users read:clients ...
    [expires_in] => 86400
    [token_type] => Bearer
)
```

See the [Management API page](/libraries/auth0-php/management-api) for more information on how to use this Access Token.

## Register a new database user

Creating a new database user is done using the [`/dbconnections/signup` endpoint](/api/authentication#signup).

```php
use Auth0\SDK\API\Authentication;

$auth0_api = new Authentication(
    getenv('AUTH0_DOMAIN'),
    getenv('AUTH0_CLIENT_ID')
);

try {
    $result = $auth0_api->dbconnections_signup(
        // A valid email address that does not already exist for the connection.
        'user@example.com',
        // Password conforming to the password policy for the connection.
        'That_Is_1_Strong_Password!',
        // Database connection name.
        'Username-Password-Authentication'
    );
} catch (Exception $e) {
    // This could be an Exception from the SDK or the HTTP client.
    die( $e->getMessage() );
}

// This will include the user ID and email address.
var_dump( $result );
```

If the user creation was successful, you should see the following:

```
Array
(
    [_id] => 'jxuf4clnfz2jo2ugcvrp6hzc'
    [email_verified] => false
    [email] => user@example.com
)
```

- The `_id` key will contain the user ID for the Connection used. The Auth0 user ID will be this value with `auth0|` pre-pended, like `auth0|jxuf4clnfz2jo2ugcvrp6hzc`.
- The `email_verified` key will always be `false`.
- The `email` key will be the same email address that was passed to the endpoint.

## Single Sign-on Logout

Basic logout (covered on the [Basic Use page](/libraries/auth0-php/basic-use#logout)) closes the session in your application, but for customers using <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn>, they also need to close the session at Auth0. This means that the next time the user sees an Auth0 login form, they will be required to provide their credentials to log in. This step should be completed **after** the session is closed in your application.

First, determine where the user should end up after the logout has completed. Save this in the Auth0 Application settings in the "Allowed Logout URLs" field. Also, add an `AUTH0_LOGOUT_RETURN_URL` key with this URL as the value in your `.env` file.

Add the following to your application logout code:

```php
// logout.php
use Auth0\SDK\API\Authentication;

// ... application logout

// Setup the Authentication class with required credentials.
// No API calls are made on instantiation.
$auth0_auth_api = new Authentication(getenv('AUTH0_DOMAIN'));

// Get the Auth0 logout URL to end the Auth0 session.
$auth0_logout_url = $auth0_auth_api->get_logout_link(
    // Save this in the "Allowed Logout URLs" field in your Application settings.
    getenv('AUTH0_LOGOUT_RETURN_URL'),
    // Indicate the specific Application.
    getenv('AUTH0_CLIENT_ID')
);

header('Location: ' . $auth0_logout_url);
exit;
```

### Read More

::: next-steps
* [Auth0-PHP Introduction](/libraries/auth0-php)
* [Auth0-PHP Basic Use](/libraries/auth0-php/basic-use)
* [Auth0-PHP Management API](/libraries/auth0-php/management-api)
* [Auth0-PHP JWT Validation](/libraries/auth0-php/jwt-validation)
* [Auth0-PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
