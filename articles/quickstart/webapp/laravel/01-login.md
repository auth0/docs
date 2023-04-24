---
title: Authenticating Users
description: "Your Laravel application can have fully functional user authentication using Auth0 in just a few lines of code. In this guide, we will demonstrate how to add login, logout and callback routes to an application."
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

**The SDK provides several routing controllers as a simple, convenient way to add authentication to your application.** We will use these controllers to add the necessary routes to an application to support login, logout, and callback to our quickstart application.

- Visiting the `/login` route, the `Login` controller prepares a Laravel session for the user and redirects them to the Auth0 Universal Login Page.
- After authenticating with Auth0, the user is returned to the `/callback` route, and the `Callback` controller completes the authentication process before redirecting them to the application's home route.
- When visiting the `/logout` route, the `Logout` controller will clear the Laravel session, redirect them to the Auth0 logout endpoint, and then return them to the application's home route.

During authentication, Auth0 returns information about the user as an [ID token](https://auth0.com/docs/secure/tokens/id-tokens) (as a [JSON Web Token](https://auth0.com/docs/secure/tokens/json-web-tokens)). The SDK handles the process of decoding this information for your application, so it's easily accessible.

### Controllers

There are three controller types provided by the SDK:

| Controller                                        | Purpose                                                                                                                                                                                                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Auth0\Laravel\Http\Controller\Stateful\Login`    | Prepares the visitor with a user session, and redirects them to the Auth0 Universal Login Page for authentication.                                                                                                                                            |
| `Auth0\Laravel\Http\Controller\Stateful\Callback` | Destination users are returned to by Auth0 after authenticating. This controller completes the authentication flow and finishes setting up the user session. Afterward, it will redirect the user to their intended destination, or otherwise the home route. |
| `Auth0\Laravel\Http\Controller\Stateful\Logout`   | Clears the user's session and redirects them to the Auth0 logout endpoint to complete the process. The user is returned to your application's home route afterward.

### Example

If you're following along and building the quickstart application, **prefix your application's `routes/web.php` file with the following:**

```php
<?php

use Auth0\Laravel\Http\Controller\Stateful\{Login, Logout, Callback};

Route::middleware('guard:my-example-guard')->group(function () {
    Route::get('/login', Login::class)->name('login');
    Route::get('/logout', Logout::class)->name('logout');
    Route::get('/callback', Callback::class)->name('callback');
});
```

### Checkpoint

With users now able to log in and out of your application using Auth0, try accessing the middleware-protected routes you added in the [previous step](/quickstart/webapp/laravel/02-middleware).

**Next, you'll [learn how to retrieve and update user profile information.](/quickstart/webapp/laravel/03-users)**
