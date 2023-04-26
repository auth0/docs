---
title: Protecting Routes
description: "You can protect a Laravel application's routes using the Auth0 SDK's middleware."
topics:
  - quickstart
  - backend
  - laravel
  - authorization
  - php
  - laravel
contentType: tutorial
useCase: quickstart
github:
  path: app
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

**The SDK provides middleware that protects routes for your application.** It acts as a mechanism for filtering HTTP requests entering your application. The SDK's middleware checks if a bearer token is provided with the request, and can allow or deny requests to specific routes based on how your configure it.

### Middleware

| Middleware                 | Purpose                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `auth0.authorize`          | Requires a valid token to access. Rejected requests will receive a `401` (Unauthorized) response.                |
| `auth0.authorize.optional` | All requests are allowed. If a bearer token is provided, it will be verified and be made available to the route. |

#### Require Scopes

**All of the SDK's middleware can be optionally configured to require a specific scope.**

```php
Route::get('/example', function () {
  return response->json(['message' => 'This route requires visitors have the `read:messages` scope granted.']);
})->middleware('auth0.authorize:read:messages');
```

In the above example, if the provided bearer token does not have the `read:messages` scope, the request will be denied with a `403` (Forbidden) response. You can [learn more about scopes here.](https://auth0.com/docs/get-started/apis/scopes)

### Example

This example will demonstrate adding three middleware-protected routes to the application:

| Method | Route        | Middleware                 | Parameters      | Purpose                                                                                              |
| ------ | ------------ | -------------------------- | --------------- | ---------------------------------------------------------------------------------------------------- |
| `GET`  | `/`          | `auth0.authorize.optional` | -               | **Public route.** Anyone can access. If a bearer token is provided, it'll be verified and available. |
| `GET`  | `/protected` | `auth0.authorize`          | -               | **Protected route.** Requires a valid bearer token to access.                                        |
| `GET`  | `/scoped`    | `auth0.authorize`          | `read:messages` | **Scope-Protected route.** Requires a valid bearer token with the `read:messages` scope to access.   |

**Replace the contents of your application's `routes/api.php` file with the following:**

```php
<?php

use Illuminate\Support\Facades\Route;

Route::middleware('guard:my-example-guard')->group(function () {

  Route::get('/', function () {
    if (auth()?->check()) {
      $user = json_encode(auth()?->user()?->getAttributes(), JSON_PRETTY_PRINT);

      return response(<<<"HTML"
        <h1>Welcome! You are logged in.</h1>
        <div><pre>{$user}</pre></div>
        <p>Would you like to <a href="/logout">logout</a>?</p>
      HTML);
    }

    return response(<<<'HTML'
      <h1>Hello, Guest!</h1>
      <p>Would you like to <a href="/login">login</a>?</p>
    HTML);
  })->middleware('auth0.authenticate.optional');

  Route::get('/protected', function () {
    return response(<<<'HTML'
      <h1>Hello! This is a protected route.</h1>
      <p>Any logged in users can see this.</p>

      <p>Would you like to <a href="/">go home</a>?</p>
    HTML);
  })->middleware('auth0.authenticate');

  Route::get('/scoped', function () {
    return response(<<<'HTML'
      <h1>This is a protected route with a scope requirement.</h1>
      <p>Only logged in users granted with the `read:messages` scope can see this.</p>

      <p>Would you like to <a href="/">go home</a>?</p>
    HTML);
  })->middleware('auth0.authenticate:read:messages');

});
```

### Checkpoint

Your application now has protected routes. **Next, you'll [how to work with your application's users.](/quickstart/backend/laravel/02-users)**
