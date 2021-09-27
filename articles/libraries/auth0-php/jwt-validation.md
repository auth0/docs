---
section: libraries
toc: true
description: Validating JSON Web Tokens (JWTs) with your PHP applications.
topics:
  - libraries
  - php
contentType:
  - how-to
  - reference
---
# PHP: Validating JWTs

The Auth0 PHP SDK provides a `Auth0\SDK\Token` class used for processing <dfn data-key="json-web-token">JSON Web Tokens (JWT)</dfn>. It enables you to decode, validate and verify tokens for use by your application. More information on JWTs and how to build and decode them can be found [jwt.io](https://jwt.io/).

The class can process both HS256 and RS256 tokens. Both types require the algorithm and valid <dfn data-key="audience">audiences</dfn> to be configured with the SDK before processing. HS256 tokens require the client secret to be configured. RS256 tokens require an authorized issuer, which is used to fetch a JWKs file during the decoding process.

## Prerequisites

The documentation below assumes that you followed the steps in the [PHP getting started guide](/libraries/auth0-php), and continue off from the code provided there.

## Example Usage

The following is an example of a small, URL-based JSON Web Token processor based on the SDK's `Token` class.

```php
<?php

// Import the Composer Autoloader to make the SDK classes accessible:
require 'vendor/autoload.php';

// Load our environment variables from the .env file:
(Dotenv\Dotenv::createImmutable(__DIR__))->load();

$token = filter_var($_GET['token'] ?? null, FILTER_UNSAFE_RAW, FILTER_NULL_ON_FAILURE);
$algorithm = filter_var($_GET['algorithm'] ?? 'HS256', FILTER_UNSAFE_RAW, FILTER_NULL_ON_FAILURE);

if ($token === null) {
    die('No `token` request parameter.');
}

if (! in_array($algorithm, ['HS256', 'RS256'])) {
    die('Invalid `algorithm` supplied.');
}

// The Auth0 SDK includes a helpful token processing utility we'll leverage for this:
$token = new \Auth0\SDK\Token([
    'domain' => $env['AUTH0_DOMAIN'],
    'clientId' => $env['AUTH0_CLIENT_ID'],
    'clientSecret' => $env['AUTH0_CLIENT_SECRET'],
    'tokenAlgorithm' => $algorithm
], $token, \Auth0\SDK\Token::TYPE_ID_TOKEN);

// Verify the token: (This will throw an \Auth0\SDK\Exception\InvalidTokenException if verification fails.)
$token->verify();

// Validate the token claims: (This will throw an \Auth0\SDK\Exception\InvalidTokenException if validation fails.)
$token->validate();

echo '<pre>';
print_r($token->toArray(), true);
echo '</pre>';
```

Both `verify()` and `validate()` offer a number of options arguments that can be used to customize their behavior, including validating nonce claims, restricting maximum time since a token's `auth_time`, `leeway` clock tolerance for time checks, and more. These methods are fully commented for review of these options either via the source code or your IDE of choice.

### Read more

::: next-steps
* [PHP Getting Started](/libraries/auth0-php)
* [PHP Basic Use](/libraries/auth0-php/basic-use)
* [PHP Authentication API](/libraries/auth0-php/authentication-api)
* [PHP Management API](/libraries/auth0-php/management-api)
* [PHP Troubleshooting](/libraries/auth0-php/troubleshooting)
:::
