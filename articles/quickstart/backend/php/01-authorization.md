---
title: Authorization
default: true
beta: true
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
  path: /
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

Let's create a sample application that authorizes an Auth0-signed token with a backend API we've written in PHP. We'll take a simple approach here, appropriate for the written format. Still, you should check out the accompanying [Quickstart app on GitHub](https://github.com/auth0-samples/auth0-php-api-samples/) for a more robust example.

## Installing the PHP SDK

${snippet(meta.snippets.install)}

### Installing HTTP Client and Messaging Factories

The Auth0 PHP SDK supports many PHP-FIG standards to offer maximum interoperability with your project's architecture, but two of particular importance are [PSR-17](https://www.php-fig.org/psr/psr-17/) and [PSR-18](https://www.php-fig.org/psr/psr-18/). These standards allow you to "plugin" networking components of your choice to handle messaging and requests. You will need to install compatible libraries in your project for the SDK to use.

The most prolific networking library for PHP is Guzzle, although many are available to pick from within the PHP community. Let's use Guzzle for this sample application:

```sh
composer require guzzlehttp/guzzle guzzlehttp/psr7 http-interop/http-factory-guzzle
```

### Configure the SDK

${snippet(meta.snippets.configure)}

### Authenticating the user

For this sample application, we're focusing on [authorization](https://auth0.com/intro-to-iam/authentication-vs-authorization/). There's numerous routes you could go for authenticating your users before they hit your backend API for authorization, such as using [Auth0's SPA.js library](https://github.com/auth0/auth0-spa-js). This approach is demonstrate in [this Quickstart app accompanying Github project](https://github.com/auth0-samples/auth0-php-api-samples/). Regardless of the approach you decide to use, this sample application expects you to pass your access token to it through a 'Authorization' header to work.

### Authorizing a token

First, we need to extract the token from the incoming HTTP request.

```PHP
// 👆 We're continuing from the steps above. Append this to your index.php file.

$authorized = false;
$token = $_GET['token'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['Authorization'] ?? null;
```

This will look for a ?token parameter in a GET request, or a HTTP_AUTHORIZATION or Authorization header. Next, if the token is present, let's process it!

```PHP
// 👆 We're continuing from the steps above. Append this to your index.php file.

// If a token is present, process it.
if ($token !== null) {
    // Trim whitespace from token string.
    $token = trim($token);

    // Remove the 'Bearer ' prefix, if present, in the event we're getting an Authorization header that's using it.
    if (substr($token, 0, 7) === 'Bearer ') {
        $token = substr($token, 7);
    }

    // Attempt to decode the token:
    try {
        $token = $auth0->decode($token);
        $authorized = true;
    } catch (\Auth0\SDK\Exception\InvalidTokenException $exception) {
        // The token wasn't valid. Let's display the error message from the Auth0 SDK.
        // We'd probably want to show a custom error here for a real world application.
        die($exception->getMessage());
    }
}

// For our simple purposes, let's define a named constant, ENDPOINT_AUTHORIZED, which we can check from our secure endpoints to determine authorization.
define('ENDPOINT_AUTHORIZED', $authorized);
```

Depending on how you setup your API routing, how exactly you integrate these checks might look a little different, but the principle is the same: check the token, and in the event your API endpoint requires authorization, deny access if the token isn't valid or acceptable:

```PHP
// 👆 We're continuing from the steps above. Append this to your index.php file.

if (ENDPOINT_AUTHORIZED) {
    // Respond with a JSON response:
    echo json_encode([
        'authorized' => true,
        'data' => [
            'message' => 'You are authorized to be here!'
        ]
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

Great! This works for our simple needs, but in a real-world application, we'll want to use caching to ensure we don't hit our Auth0 rate limits or slow down our application with unnecessary network requests. The Auth0 PHP SDK supports a caching interface called [PSR-6](https://www.php-fig.org/psr/psr-6), which you can plug any compatible caching library into for the SDK to fit in nicely with your architecture.

For an example, let's use the Symfony caching library:

```sh
composer require symfony/cache
```

Next, we need to update our SdkConfiguration to tell the SDK to use it:

```PHP
// ✋ Insert this BEFORE the token handling we added in the step above, so the SDK uses the cache.

$tokenCache = new \Symfony\Component\Cache\Adapter\FilesystemAdapter();
$configuration->setTokenCache($tokenCache);
```

Our sample application will now cache our token-related network requests.
