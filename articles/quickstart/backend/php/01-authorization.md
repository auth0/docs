---
title: Authentication
description: This tutorial demonstrates how to add authorization to a PHP API.
github:
  path: 01-Authenticate-RS256
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new', { sampleLink: 'https://github.com/auth0-samples/auth0-php-api-samples/tree/master/02-Authenticate-HS256' }) %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Install dependencies

In this example token validation is done in the `JWTVerifier` class from the **auth0-PHP** library which can be applied to any endpoints you wish to protect. 

The **router** library can be used to create simple routes. 

Install the libraries with **composer**.

```bash
composer require bramus/router:dev-master auth0/auth0-php:~5.0
```

::: note
**[Composer](https://getcomposer.org/)** is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you. See Composer's [getting started](https://getcomposer.org/doc/00-intro.md) doc for information on how to use it.
:::

### Configure JWT Validation

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

  // This endpoint doesn't need authentication
  public function publicEndpoint() {
    return array(
      "status" => "ok",
      "message" => "Hello from a public endpoint! You don't need to be authenticated to see this."
    );
  }

  public function privateEndpoint() {
    return array(
      "status" => "ok",
      "message" => "Hello from a private endpoint! You need to be authenticated to see this."
    );
  }
}
```

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

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

// Check JWT on private routes
$router->before('GET', '/api/private.*', function() use ($app) {

  $requestHeaders = apache_request_headers();

  if (!isset($requestHeaders['authorization']) && !isset($requestHeaders['Authorization'])) {
    header('HTTP/1.0 401 Unauthorized');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array("message" => "No token provided."));
    exit();
  }

  $authorizationHeader = isset($requestHeaders['authorization']) ? $requestHeaders['authorization'] : $requestHeaders['Authorization'];

  if ($authorizationHeader == null) {
    header('HTTP/1.0 401 Unauthorized');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array("message" => "No authorization header sent."));
    exit();
  }

  $authorizationHeader = str_replace('bearer ', '', $authorizationHeader);
  $token = str_replace('Bearer ', '', $authorizationHeader);

  try {
    $app->setCurrentToken($token);
  }
  catch(\Auth0\SDK\Exception\CoreException $e) {
    header('HTTP/1.0 401 Unauthorized');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array("message" => $e->getMessage()));
    exit();
  }
});
```

With this configuration, any time an endpoint which includes `/api/private` is reached, a valid JWT `access_token` will be required before the resource can be released. With this in place, private routes can be defined.

```php
// index.php

// This route doesn't need authentication
$router->get('/api/public', function() use ($app){
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($app->publicEndpoint());
});

$router->get('/api/private', function() use ($app){
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($app->privateEndpoint());
});
```

### Protect endpoints with specific scopes

To add authorization you need to define the method `checkScope` to check for a particular scope in the `access_token`.

```php
// src/Main.php

//..

public function checkScope($scope){
  if ($this->tokenInfo){
    $scopes = explode(" ", $this->tokenInfo->scope);
    foreach ($scopes as $s){
      if ($s === $scope)
        return true;
    }
  }

  return false;
}

// ...

public function privateScopedEndpoint() {
  return array(
    "status" => "ok",
    "message" => "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
  );
}
```

The function `privateScopedEndpoint` will return the message when a request is made from a protected endpoint, and the `access_token` has a scope of `read:messages`.

Add a `before` hook to the router to configure routes that require the scope of `read:messages`.

```php
// index.php

// Check for read:messages scope
$router->before('GET', '/api/private-scoped', function() use ($app) {
  if (!$app->checkScope('read:messages')){
    header('HTTP/1.0 403 forbidden');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array("message" => "Insufficient scope."));
    exit();
  }
});

// ...

$router->get('/api/private-scoped', function() use ($app){
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($app->privateScopedEndpoint());
});
```

The route `/api/private-scoped` will be accessible only if has a valid `access_token` with the scope `read:messages`.
