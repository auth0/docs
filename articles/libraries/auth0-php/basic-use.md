---
section: libraries
toc: true
description: Integrate a frictionless login and signup experience for your PHP applications.
topics:
  - libraries
  - php
contentType:
  - how-to
  - reference
useCase:
  - add-login
---
# PHP: Basic Usage

The Auth0 PHP SDK bundles three core classes: `Auth0\SDK\Auth0`, `Auth0\SDK\API\Authentication` and `Auth0\SDK\API\Management`, each offering interfaces for different functionality across Auth0's APIs. If you're building a stateful web application that needs to keep track of users' sessions, the base `Auth0` class is what you'll be working with the most. It provides methods for handling common authentication and session handling tasks such as logging in and out, retrieving user credentials, checking of an available session, and <dfn data-key="callback">callback</dfn> handling. These tasks are explained below.

## Prerequisites

The documentation below assumes that you followed the steps in the [PHP getting started guide](/libraries/auth0-php), and continue off from the code provided there.

## Logging In

The default login process in the PHP SDK uses an [Authentication Code grant](/api-auth/tutorials/authorization-code-grant) combined with Auth0's <dfn data-key="universal-login">Universal Login</dfn> Page. In short, that process is:

1. A user requesting access is redirected to the Universal Login Page.
2. The user authenticates using one of [many possible connections](https://auth0.com/docs/identityproviders): social (Google, Twitter, Facebook), database (email and password), <dfn data-key="passwordless">passwordless</dfn> (email, SMS), or enterprise (ActiveDirectory, ADFS, Office 365).
3. The user is redirected or posted back to your application's callback URL with `code` and `state` values if successful or an `error` and `error_description` if not.
4. If the authentication was successful, the `state` value is validated.
5. If the `state` is valid, the `code` value is exchanged with Auth0 for an <dfn data-key="id-token">ID Token</dfn> and/or an <dfn data-key="access-token">Access Token</dfn>.
6. The identity from the ID token can be used to create an account, to start an application-specific session, or to persist as the user session.

Auth0-PHP handles most of these steps automatically for you. Your application will need to:

1. Call `Auth0\SDK\Auth0::login()` when users need to login (for example: click a link, visit walled content, etc.)
2. Call `Auth0\SDK\Auth0::exchange()` when users are redirected to your callback URL.
3. Call `Auth0\SDK\Auth0::getCredentials()` when you need to check if a user is logged in and retrieve user information.

A simple implementation of these steps looks like this:

```php
// 👆 We're continuing from the "getting started" guide linked in "Prerequisites" above. Append this to the index.php file you created there.

// getExchangeParameters() can be used on your callback URL to verify all the necessary parameters are present for post-authentication code exchange.
if ($auth0->getExchangeParameters()) {
    // If they're present, we should perform the code exchange.
    $auth0->exchange();
}

// Check if the user is logged in already
$session = $auth0->getCredentials();

if ($session === null) {
    // User is not logged in!
    // Redirect to the Universal Login Page for authentication.
    header("Location: " . $auth0->login());
    exit;
}

// 🎉 At this point we have an authenticated user session accessible from $session; your application logic can continue from here!
echo "Authenticated!";
```

Finally, you'll need to add you're application's URL to your Auth0 Application's "Allowed Callback URLs" field on the settings page. After that, loading your scripted page should:

1. Immediately redirect you to an Auth0 login page for your tenant.
2. After successfully logging in using any connection, redirect you back to your app.
3. Display a simple page showing 'Authenticated!'.

## Profile

Now that we have authenticated a user, we can work with their persisted session data to do things like display user profiles.

```php
// 👆 We're continuing from code above. Append this to the index.php file.

printf(
    '<h1>Hi %s!</h1>
    <p><img width="100" src="%s"></p>
    <p><strong>Last update:</strong> %s</p>
    <p><strong>Contact:</strong> %s %s</p>
    <p><a href="logout.php">Logout</a></p>',
    isset($session->user['nickname']) ? strip_tags($session->user['nickname']) : '[unknown]',
    isset($session->user['picture']) ? filter_var($session->user['picture'], FILTER_SANITIZE_URL) : 'https://gravatar.com/avatar/',
    isset($session->user['updated_at']) ? date('j/m/Y', strtotime($session->user['updated_at'])) : '[unknown]',
    isset($session->user['email']) ? filter_var($session->user['email'], FILTER_SANITIZE_EMAIL) : '[unknown]',
    ! empty($session->user['email_verified']) ? '✓' : '✗'
);
```

## Logout

In addition to logging in, we also want users to be able to log out. When users log out, they must invalidate their session for the application. For this SDK, that means destroying their persistent user and token data:

```php
// Log out of the application.
header("Location: $auth0->logout());
```

If you're using <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> and also want to end their Auth0 session, see the [SSO Logout section here](/libraries/auth0-php/authentication-api#sso-logout). More information about logging out, in general, can be found [here](/logout).

### Read more

::: next-steps
* [PHP Getting Started](/libraries/auth0-php)
* [PHP Authentication API](/libraries/auth0-php/authentication-api)
* [PHP Management API](/libraries/auth0-php/management-api)
* [PHP JWT Validation](/libraries/auth0-php/jwt-validation)
* [PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
