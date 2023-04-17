---
name: routes/web.php
language: php
---

```php
<?php

use Illuminate\Support\Facades\{Auth, Route};
use Auth0\Laravel\Http\Controller\Stateful\{Login, Logout, Callback};

Auth::shouldUse('myAuth0Guard');

Route::get('/api/public', function () {
  return response()->json([
    'message' => 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
    'authorized' => Auth::check(),
    'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
  ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize.optional']);

Route::get('/api/private', function () {
  return response()->json([
    'message' => 'Hello from a private endpoint! You need to be authenticated to see this.',
    'authorized' => Auth::check(),
    'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
  ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize']);

Route::get('/api/private-scoped', function () {
  return response()->json([
    'message' => 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
    'authorized' => Auth::check(),
    'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
  ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize:read:messages']);
```
