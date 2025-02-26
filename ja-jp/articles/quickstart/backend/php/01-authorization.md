---
title: Authorization
default: true
description: This guide demonstrates how to integrate Auth0 with a PHP backend API using the Auth0 PHP SDK.
budicon: 448
topics:
  - quickstart
  - backend
  - authorization
  - api
  - php
contentType: tutorial
useCase: quickstart
github:
  path: app
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Integrating your PHP Backend API

Let's create a sample application that authorizes an Auth0-signed token with a backend API we've written in PHP. We'll take a simple approach here, appropriate for the written format. Still, you should check out the accompanying [Quickstart app on GitHub](https://github.com/auth0-samples/auth0-php-api-samples/) for a more robust example.

### Installing HTTP Client and Messaging Factories

The Auth0 PHP SDK supports many PHP-FIG standards to offer maximum interoperability with your project's architecture, but two of particular importance are [PSR-17](https://www.php-fig.org/psr/psr-17/) and [PSR-18](https://www.php-fig.org/psr/psr-18/). These standards allow you to "plugin" networking components of your choice to handle messaging and requests. You will need to install compatible libraries in your project for the SDK to use.

The most prolific networking library for PHP is Guzzle, although many are available to pick from within the PHP community. Let's use Guzzle for this sample application:

```sh
composer require guzzlehttp/guzzle guzzlehttp/psr7 http-interop/http-factory-guzzle
```

### Installing the PHP SDK

${snippet(meta.snippets.install)}

### Configure the SDK

To begin, let's create a `.env` file within the root of your project directory to store our sample application's configuration and fill in the environment variables:

```sh
# The URL of our Auth0 Tenant Domain.
# If we're using a Custom Domain, be sure to set this to that value instead.
AUTH0_DOMAIN='https://${account.namespace}'

# Our Auth0 application's Client ID.
AUTH0_CLIENT_ID='${account.clientId}'

# Our Auth0 application's Client Secret.
AUTH0_CLIENT_SECRET='${account.clientSecret}'

# Our Auth0 API's Identifier.
AUTH0_AUDIENCE='YOUR_API_IDENTIFIER'
```

As PHP isn't able to read our `.env` file by itself, we'll want to install a library to help with that. Although we'll be using a particular library for our sample application's purposes, any 'dotenv' loader of preference will work in a real-world application. From our project directory, let's run the following shell command to install the library:

```sh
composer require vlucas/phpdotenv
```

Next, let's create the PHP source file we'll be using for these code samples, `index.php`, and let's configure an instance of the Auth0 PHP SDK for our sample application:

```php
<?php

// Import the Composer Autoloader to make the SDK classes accessible:
require 'vendor/autoload.php';

// Load our environment variables from the .env file:
(Dotenv\Dotenv::createImmutable(__DIR__))->load();

// Now instantiate the Auth0 class with our configuration:
$auth0 = new \Auth0\SDK\Auth0([
    'strategy' => \Auth0\SDK\Configuration\SdkConfiguration::STRATEGY_API,
    'domain' => $_ENV['AUTH0_DOMAIN'],
    'clientId' => $_ENV['AUTH0_CLIENT_ID'],
    'clientSecret' => $_ENV['AUTH0_CLIENT_SECRET'],
    'audience' => ($_ENV['AUTH0_AUDIENCE'] ?? null) !== null ? [trim($_ENV['AUTH0_AUDIENCE'])] : null,
]);
```


### Authenticating the user

For this sample application, we're focusing on [authorization](https://auth0.com/intro-to-iam/authentication-vs-authorization/). There's numerous routes you could go for authenticating your users before they hit your backend API for authorization, such as using [Auth0's SPA.js library](https://github.com/auth0/auth0-spa-js). This approach is demonstrated in [this Quickstart app accompanying Github project](https://github.com/auth0-samples/auth0-php-api-samples/). Regardless of the approach you take, this sample application expects you to pass your Access Token to it through a request parameter or header to work.

### Authorizing an Access Token

First, we need to extract the JSON Web Token (JWT) from the incoming HTTP request. Let's look for a `?token` parameter in a GET request or an `HTTP_AUTHORIZATION` or `Authorization` header.

```PHP
// 👆 We're continuing from the steps above. Append this to your index.php file.

$jwt = $_GET['token'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['Authorization'] ?? null;
```

Next, let's decode the token, if one is present:

```PHP
// 👆 We're continuing from the steps above. Append this to your index.php file.

// If a token is present, process it.
if ($jwt !== null) {
    // Trim whitespace from token string.
    $jwt = trim($jwt);

    // Remove the 'Bearer ' prefix, if present, in the event we're getting an Authorization header that's using it.
    if (substr($jwt, 0, 7) === 'Bearer ') {
        $jwt = substr($jwt, 7);
    }

    // Attempt to decode the token:
    try {
        $token = $auth0->decode($jwt, null, null, null, null, null, null, \Auth0\SDK\Token::TYPE_TOKEN);
        define('ENDPOINT_AUTHORIZED', true);
    } catch (\Auth0\SDK\Exception\InvalidTokenException $exception) {
        // The token wasn't valid. Let's display the error message from the Auth0 SDK.
        // We'd probably want to show a custom error here for a real world application.
        die($exception->getMessage());
    }
}
```

Depending on how you configure your API routing, how exactly you integrate these checks might look a little different, but the principle is the same: check the token, and in the event your API endpoint requires authorization, deny access if the token isn't valid or acceptable:

```PHP
// 👆 We're continuing from the steps above. Append this to your index.php file.

// Is the request authorized?
if (defined('ENDPOINT_AUTHORIZED')) {
    // Respond with a JSON response:
    echo json_encode([
        'authorized' => true,
        'data' => $token->toArray()
    ], JSON_PRETTY_PRINT);

    exit;
}

// Issue a HTTP 401 Unauthorized status:
http_response_code(401);

// Respond with a JSON response:
echo json_encode([
    'authorized' => false,
    'error' => [
        'message' => 'You are NOT authorized to be here!'
    ]
], JSON_PRETTY_PRINT);
```

### Caching

This works, but in a real-world application, we'll want to use caching to ensure we don't hit our Auth0 rate limits or slow down our application with unnecessary network requests. The Auth0 PHP SDK supports a caching interface called [PSR-6](https://www.php-fig.org/psr/psr-6), which you can plug [any compatible caching library](https://packagist.org/providers/psr/cache-implementation) into for the SDK to fit in nicely with your architecture.

For our sample, let's use the [Symfony caching component](https://symfony.com/doc/current/components/cache.html) library. From our root project directory, issue the following shell command:

```sh
composer require symfony/cache
```

Next, we need to update our SdkConfiguration to tell the SDK to use it:

```PHP
// ✋ Insert this BEFORE the token handling we added in the step above, so the SDK uses the cache.

$tokenCache = new \Symfony\Component\Cache\Adapter\FilesystemAdapter();
$auth0->configuration()->setTokenCache($tokenCache);
```

Our sample application will now cache our token-related network requests.
