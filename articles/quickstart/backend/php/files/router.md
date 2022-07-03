---
name: router.php
language: php
---

```php
<?php

  declare(strict_types=1);

  use Steampixel\Route;

  function routeResponse(
    array $response
  ) {
    header('Content-Type: application/json');
    print(json_encode($response, JSON_PRETTY_PRINT));
  }

  Route::add('/api/public', function() use ($token) {
    routeResponse([
      'message' => 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
      'token' => $token
    ]);
  });

  Route::add('/api/private', function() use ($token) {
    if ($token === null) {
      http_response_code(401);
      exit;
    }

    routeResponse([
      'message' => 'Hello from a private endpoint! You need to be authenticated to see this.',
      'token' => $token,
    ]);
  });

  Route::add('/api/private-scoped', function() use ($token) {
    if ($token === null) {
      http_response_code(401);
      exit;
    }

    if (! in_array('read:messages', $token['scopes'], true)) {
      http_response_code(401);
      exit;
    }

    routeResponse([
      'message' => 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
      'token' => $token,
    ]);
  });

  // The following route is just to avoid confusion.
  // We're not using an 'index route' in this app, so redirect requests to /api/public.
  Route::add('/', function() {
    header('Location: /api/public');
  });

  Route::run();
```
