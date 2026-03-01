---
section: libraries
toc: true
description: Using Auth0's Authentication API with your PHP applications.
topics:
  - libraries
  - php
contentType:
  - how-to
  - reference
useCase:
  - add-login
---
# PHP: Using the Authentication API

The Auth0 PHP SDK provides a `Auth0\SDK\API\Authentication` class, which houses the methods you can use to access the [Authentication API](/api/authentication) directly. Please note that this interface is intended for more advanced applications and in general does provide a means of keeping track of user sessions. For most use cases, you'll want to work with the [Auth0 base class](/libraries/auth0-php/basic-use).

In this article, you'll find examples of common authentication operations.

## Prerequisites

The documentation below assumes that you followed the steps in the [PHP getting started guide](/libraries/auth0-php), and continue off from the code provided there.

## Authorization Code Flow

An [Authorization Code grant](/api-auth/tutorials/authorization-code-grant) is the basic way to grant users access to your application. This flow is the same one used on the [Basic Use page](/libraries/auth0-php/basic-use#login). If you need more granular control over the login or <dfn data-key="callback">callback</dfn> process, this section walks through how to use the Authentication API directly.

Users must authenticate with Auth0 to generate the authorization code. This is done by redirecting to the `/authorize` endpoint for your tenant domain. The following code would appear on a page that requires authentication:

```php
// 👆 We're continuing from the "getting started" guide linked in "Prerequisites" above. Append this to the index.php file you created there.

// Setup a PHP session, which we'll use as a custom session store for the authenticated user.
session_start();

// $user will be null if no session is available; otherwise it will contain user data.
$user = $_SESSION['user'] ?? null;

// Has the user authenticated with us yet?
if ($user === null) {
    // Generates cryptographically secure pseudo-random bytes to use as a CSRF mitigating value.
    // Store this for retrieval after authentication.
    $_SESSION['state'] = bin2hex(random_bytes(16));

    // Generate the authorize URL, and redirect the user to it.
    header('Location: ' . $auth0->authentication()->getLoginLink($_SESSION['state']));
    exit;
}

echo '<h1>Sensitive data!</h1>';
```

The process above does the following:

1. We check if there is an authenticated user state stored in our custom session handler. Your application might handle user sessions differently.
2. If there is no session, then we need to log the user in by redirecting them to the <dfn data-key="universal-login">Universal Login</dfn> Page.
3. We set a state value with the login request and then verify that value when the code is returned on the callback URL. We're storing this in our PHP session under the 'state' key.
4. The `getLoginLink()` call builds the correct `/authorize` link with the correct response type (`code` in this case), redirect URI (wherein the application we will handle the response, explained below), and state (from above).
5. We then redirect to this URL and wait for the user to be redirected back to us.

After authentication, the user is redirected back to our application at the callback URL, which is handled with the following:

```php
// 👆 We're continuing from the "getting started" guide linked in "Prerequisites" above. Append this to the index.php file you created there.

// Ensure we have our PHP session open so we can retrieve our stored state for comparison.
session_start();

// Extract `code` and `state` parameters from the request query, if present.
$code = filter_var($_GET['code'] ?? null, FILTER_UNSAFE_RAW, FILTER_NULL_ON_FAILURE);
$state = filter_var($_GET['state'] ?? null, FILTER_UNSAFE_RAW, FILTER_NULL_ON_FAILURE);

// Check if a code is present in the request query.
if ($code === null) {
    die('No authorization code found.');
}

// Check if a state is present, and compare it with the one we generated and stored before redirecting the user.
if ($state === null || $state !== $_SESSION['state']) {
    die('Invalid state.');
}

// We have compared states, we should discard this stored value now.
unset($_SESSION['state']);

// Attempt to get an access_token with the code returned and original redirect URI. (This returns a PSR-7 ResponseInterface.)
$response = $auth0->authentication()->codeExchange($code);

// Does the status code of the response indicate failure?
if ($response->getStatusCode() !== 200) {
    die("Code exchange failed.");
}

// Decode the JSON response into a PHP array:
$response = json_decode(response->getBody()->__toString(), true, 512, JSON_THROW_ON_ERROR);

// Create an array to store our session information in.
$session = [
    'id_token' => $response['id_token'] ?? null,
    'access_token' => $response['access_token'] ?? null,
    'scope' => $response['scope'] ?? null,
    'refresh_token' => $response['refresh_token'] ?? null,
    'expires_in' => $response['expires_in'] ?? null,
    'user' => null
];

// We retrieved an ID token; let's process it!
if ($session['id_token'] !== null) {
    // The Auth0 SDK includes a helpful token processing utility we'll leverage for this:
    $token = new \Auth0\SDK\Token($auth0->configuration(), $session['id_token'], \Auth0\SDK\Token::TYPE_ID_TOKEN);

    // Verify the token, and validate it's claims. These will throw an \Auth0\SDK\Exception\InvalidTokenException if a check fails.
    $token->verify();
    $token->validate();

    $session['user'] => $token->toArray();
}

// Store our authenticated session state.
$_SESSION['user'] = $session;

// Let's echo the user claims/identity as a demo of a successful authentication flow:
print_r($session['user']);
```

Walking through the process in detail:

1. We look for a `code` parameter in a request query. If it's missing, we abort authentication.
2. We check to make sure we have a `state` value and make sure it matches the same one we generated. This is important to avoid CSRF attacks ([more information](/protocols/oauth2/mitigate-csrf-attacks).)
3. We attempt a code exchange with the `codeExchange()` call, making sure to pass in the `code` Auth0 gave our application when it returned the authenticating user back to us.
4. If this succeeds, we know the exchange was successful, and we have an <dfn data-key="id-token">ID Token</dfn> and an <dfn data-key="access-token">Access Token</dfn> among other potential values.
5. We validate the <dfn data-key="id-token">ID Token</dfn> and use the claims for the user identity.
6. If this last step succeeds, we store the user and redirect back to our sensitive data.

## Client Credentials Flow

A [Client Credentials grant](/api-auth/tutorials/client-credentials) gives an application access to a specific API based on the scopes set in the Auth0 Dashboard. This is how applications can, for example, make calls to the Management API. Successful authentication will result in an Access Token being issued for the API requested.

First, turn on the **Client Credentials** grant on then **Advanced settings > Grant Types** tab on the Application settings page.

Next, authorize the Application for the API being used on the **Machine to Machine Applications** tab on the API's **Settings** page. Make sure all necessary scopes are selected (but no more) and **Update**. Switch back to the **Settings** tab and copy the **Identifier** value. This needs to be added to a `AUTH0_MANAGEMENT_AUDIENCE` key in your `.env` file.

Request an Access Token for the API using the example below:

```php
// 👆 We're continuing from the "getting started" guide linked in "Prerequisites" above.

// Begin a client credentials exchange:
$response = $auth0->authentication()->clientCredentials([
    'audience' => $env['AUTH0_MANAGEMENT_AUDIENCE']
]);

// Does the status code of the response indicate failure?
if ($response->getStatusCode() !== 200) {
    die("Code exchange failed.");
}

// Decode the JSON response into a PHP array:
$response = json_decode(response->getBody()->__toString(), true, 512, JSON_THROW_ON_ERROR);

// Echo the response to the browser
print_r($response, true);
```

If the grant was successful, you should see something like the following:

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

## Single Sign-on Logout

While destroying the local session with a `session_destroy()` would be sufficient in deauthenticating a user from your application, you should close your end user's session with Auth0 as well. This ensures that the next time the user sees an Auth0 login form, they will be required to provide their credentials to log in.

First, determine where the user should end up after the logout has completed. Save this in the Auth0 Application settings in the "Allowed Logout URLs" field. Also, add an `AUTH0_LOGOUT_RETURN_URL` key with this URL as the value in your `.env` file.

Add the following to your application logout code:

```php
// 👆 We're continuing from the "getting started" guide linked in "Prerequisites" above.

// Deauthenticate the user's local session in your application.
session_destroy();

// Redirect to Auth0's logout URL to end their Auth0 session:
header("Location: " . $auth0->authentication()->getLogoutLink($env['AUTH0_LOGOUT_RETURN_URL']);
```

### Read more

::: next-steps
* [PHP Getting Started](/libraries/auth0-php)
* [PHP Basic Use](/libraries/auth0-php/basic-use)
* [PHP Management API](/libraries/auth0-php/management-api)
* [PHP JWT Validation](/libraries/auth0-php/jwt-validation)
* [PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
