---
title: Protecting Routes
description: "You can protect a Laravel application's routes using the Auth0 SDK's middleware, and optionally redirect visitors to the application's login route if they are not authenticated."
topics:
  - quickstarts
  - webapp
  - laravel
  - authentication
  - login
contentType: tutorial
useCase: quickstart
github:
  path: app
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

In Laravel, middleware can be used to perform a variety of tasks, including authentication, authorization, logging, and more. **The SDK provides middleware that protects routes and sets up user states for your application.** It acts as a mechanism for filtering HTTP requests entering your application. The SDK's middleware checks if visitors are logged in, and can optionally redirect unauthenticated users to the application's login route.

### Middleware

| Middleware                    | Purpose                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `auth0.authenticate`          | Require a user to be logged in to access a route. Unauthenticated visitors will be redirected to the login route.         |
| `auth0.authenticate.optional` | Allows anyone to access a route. This is useful when you want to display different content to logged-in users and guests. |

#### Require Scopes

**All of the SDK's middleware can be optionally configured to require a specific scope.**

```php
Route::get('/example', function () {
  return response('This route requires visitors have the `read:messages` scope granted.');
})->middleware('auth0.authenticate:read:messages');
```

In the above example, if the user is not logged in, they will be redirected to the login route. If the user is logged in but does not have the required scope, they will be redirected to the application's `403` error page.

You can [learn more about scopes here.](https://auth0.com/docs/get-started/apis/scopes)

### Example

This example will demonstrate adding three middleware-protected routes to the application:

| Method | Route        | Middleware                    | Purpose                                                                                                            |
| ------ | ------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/`          | `auth0.authenticate.optional` | **Public route.** Anyone can access it. Authenticated users will see different content.                            |
| `GET`  | `/protected` | `auth0.authenticate`          | **Protected route.** Only authenticated users can access it.                                                       |
| `GET`  | `/scoped`    | `auth0.authenticate`          | **Protected route with scope requirement.** Only authenticated users with the `read:messages` scope can access it. |

**Replace the contents of your application's `routes/web.php` file with the following:**

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

Your application now has protected routes, but users need to be able to log in before they can use them.

**Next, you'll [how to add authentication your application.](/quickstart/webapp/laravel/01-login)**
