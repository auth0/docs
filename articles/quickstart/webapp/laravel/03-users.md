---
title: Working with Users
description: "Retrieving user information from Auth0 for authenticated users is simple. In this guide, we will demonstrate how your application can access this information."
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

**Now that users can authenticate with your application using Auth0, you can retrieve their profile information.** Since Auth0 is the identity provider, your application will use the user information returned by Auth0.

It's important to note that user information is stored within the Auth0 service, and not within your application's database. It's best practice to store as little user information in your application's databases as necessary for it to function. You can manage your users through the Auth0 Dashboard, and your application can call the [Auth0 Management API](https://github.com/auth0/laravel-auth0/blob/main//docs/User%20Models%20and%20Repositories.md) to make changes.

### Checking for Authentication State

You can check if a user is authenticated using the authenticator API. Routes *must* use [an `auth0.*` middleware](/quickstart/webapp/laravel/02-middleware) (like `auth0.authenticate`) for this to work, as the middleware sets up the user state.

Using the Auth facade:
```php
use Illuminate\Support\Facades\Auth;

if (Auth::check()) {
  // User is logged in
}
```

::: note
If you prefer note to use Facades, you can use the `auth` helper (`auth()->check()`). If you have multiple guards configured, it's a good idea to specify your Auth0 guard's name as well: `auth('someGuardName')->check()`.
:::

### Retrieving the User Identifier

The Auth helper's `id()` method returns the user's unique identifier. If you need to tie a user to a record in your application's database, you'll usually want to use this value.

```php
use Illuminate\Support\Facades\Auth;

if (Auth::check()) {
  dd('Hello ' . Auth::id());
}
```

::: note
Identifiers will always be returned as strings. If you're storing user identifiers in a database, you should use a string column type.
:::

### Retrieving User Information

The authenticator API also provides a `user()` method that returns the authenticated user's profile information.

```php
use Illuminate\Support\Facades\Auth;

if (Auth::check()) {
  dd([
    'id' => Auth::id(),
    'user' => Auth::user()?->getAttributes(),
  ]);
}
```

### Updating Information

You can make changes to users by making calls to the [Auth0 Management API](https://github.com/auth0/laravel-auth0/blob/main//docs/User%20Models%20and%20Repositories.md). In the following example, we'll update the user's `user_metadata` to include a `favorite_color` property with a random value assigned:

```php
use Illuminate\Support\Facades\Auth;

$colors = ['black', 'white', 'red', 'blue', 'yellow', 'green'];

app('auth0')
  ->management()
  ->users()
  ->update(
    id: Auth::->id(),
    body: [
      'user_metadata' => [
        'favorite_color' => $colors[rand(0, count($colors))],
      ],
    ]
  );
```

::: note
Please refer to the [PHP SDK's documentation](https://github.com/auth0/auth0-PHP) for more information on available Management endpoint classes.
:::

Note that changes to user information through the Management API will not be reflected for the user until the next time they log in. You can force a refresh of user information by using the SDK Guard's `refreshUser()` method:

```php
use Illuminate\Support\Facades\Auth;

Auth::refreshUser();
```

This retrieves the latest user information from Auth0 and updates the user's local session cache. You should avoid calling this method [too frequently](https://auth0.com/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/authentication-api-endpoint-rate-limits). In a real-world application, it would be best to use Laravel queues or scheduled tasks to delay this operation for a time when it's less likely to impact your users.

### Checkpoint

Now that your application has functioning authentication, route protection, and the ability to retrieve and update user information, it's time to put it all together.

**Next, you'll [start up your application and try it out.](/quickstart/webapp/laravel/04-checkpoint)**
