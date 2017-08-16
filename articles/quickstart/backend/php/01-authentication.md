---
title: Authentication
description: This tutorial demonstrates how to add authentication and authorization to a PHP API
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-php-api-samples',
  path: '01-Authenticate-RS256',
  requirements: [
    'PHP v5',
    'Composer 1.0',
  ]
}) %>

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done in the `JWTVerifier` class from the **auth0-PHP** library which can be applied to any endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Install the Dependencies

The **auth0-PHP** library and its `JWTVerifier` class can be used to verify incoming JWTs. The **router** library can be used to create simple routes. Install the libraries with **composer**.

```bash
composer require bramus/router:dev-master auth0/auth0-php:~5.0
```

## Configuration

<%= include('../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-php-api-samples/tree/master/02-Authenticate-HS256' }) %>

Create an instance of `JWTVerifier` and pass your API identifier to `valid_audiences` and your Auth0 domain to `authorized_iss`. You can also create a function which will be called to return a message when a request is made to a protected endpoint.

```php
// src/Main.php

<?php

namespace App;

use Auth0\SDK\JWTVerifier;

class Main {

  protected $token;
  protected $tokenInfo;

  public function setCurrentToken($token) {

      try {
        $verifier = new JWTVerifier([
          'supported_algs' => ['RS256'],
          'valid_audiences' => ['${apiIdentifier}'],
          'authorized_iss' => ['https://${account.namespace}/']
        ]);

        $this->token = $token;
        $this->tokenInfo = $verifier->verifyAndDecode($token);
      }
      catch(\Auth0\SDK\Exception\CoreException $e) {
        throw $e;
      }
  }

  public function privatePing() {
      return array(
          "status" => "ok",
          "message" => "Hello from a private endpoint! You DO need to be authenticated to see this."
      );
  }

}
```

## Configure Authenticated Routes

The `before` hook from the **router** package can be used to configure which routes are to be protected. For example, you may wish to protect all routes under a URL of `/api/private`.

```php
// index.php

// ...
// Require composer autoloader
require __DIR__ . '/vendor/autoload.php';

// Read .env
try {
  $dotenv = new Dotenv\Dotenv(__DIR__);
  $dotenv->load();
} catch(InvalidArgumentException $ex) {
  // Ignore if no dotenv
}

$app = new \App\Main();

// Create Router instance
$router = new \Bramus\Router\Router();

// Activate CORS
function sendCorsHeaders() {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Authorization");
  header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");
}

$router->options('/.*', function() {
    sendCorsHeaders();
});

sendCorsHeaders();

// Check JWT on /secured routes
$router->before('GET', '/api/private/.*', function() use ($app) {

  $requestHeaders = apache_request_headers();

  if (!isset($requestHeaders['authorization']) && !isset($requestHeaders['Authorization'])) {
      header('HTTP/1.0 401 Unauthorized');
      echo "No token provided.";
      exit();
  }

  $authorizationHeader = isset($requestHeaders['authorization']) ? $requestHeaders['authorization'] : $requestHeaders['Authorization'];

  if ($authorizationHeader == null) {
    header('HTTP/1.0 401 Unauthorized');
    echo "No authorization header sent";
    exit();
  }

  $authorizationHeader = str_replace('bearer ', '', $authorizationHeader);
  $token = str_replace('Bearer ', '', $authorizationHeader);

  try {
      $app->setCurrentToken($token);
  }
  catch(\Auth0\SDK\Exception\CoreException $e) {
    header('HTTP/1.0 401 Unauthorized');
    echo $e;
    exit();
  }

});
```

With this configuration, any time an endpoint which includes `/api/private` is reached, a valid JWT `access_token` will be required before the resource can be released. With this in place, private routes can be defined.

```php
// index.php

$router->get('/api/private/ping', function() use ($app){
    echo json_encode($app->privatePing());
});
```

<%= include('../_includes/_call_api') %>