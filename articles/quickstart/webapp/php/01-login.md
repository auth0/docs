---
title: Login
default: true
beta: true
description: This guide demonstrates how to integrate Auth0 with a PHP application using the Auth0 PHP SDK.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - php
contentType: tutorial
useCase: quickstart
github:
  path: /
---

<%= include('../\_includes/\_getting_started', { library: 'PHP', callback: 'http://127.0.0.1:3000/' }) %>

<%= include('../../../\_includes/\_logout_url', { returnTo: 'http://127.0.0.1:3000' }) %>

This guide demonstrates a basic Auth0 authentication integration into a PHP application. The accompanying [Quickstart app on GitHub](https://github.com/auth0-samples/auth0-php-web-app/tree/8.x) offers a more complete example of a modern PHP integration, and this guide provides a scaled back version of the same approach appropriate for written format.

## Install the PHP SDK

${snippet(meta.snippets.install)}

### Install HTTP Client and Messaging Factories

### Configure the SDK

${snippet(meta.snippets.configure)}

### Setup your application routes

Modern PHP applications use a routing pattern to pass incoming HTTP requests to the code that handles them, which determines what should happen when our users visit a certain "page" in our app. There is no single, correct way of implementing routing in your application, and there are many libraries to choose from to implement it. We'll be using one particular library for our sample application's purposes, but in a real world application feel free to choose your own.

From our project directory, let's run the following command to install the routing library:

```sh
composer require steampixel/simple-php-router
```

Next, let's open our `index.php` back up and give our application life! Let's start by configuring the route's our sample application will need:

```php
// 🧩 Continued from above. Append the following code to your index.php file.

// Import our router library:
use Steampixel\Route;

// This will respond to visits to '/', or so-called index route, where we'll display information about the user if they're logged in:
Route::add('/', 'onIndexRoute');

// This will respond to visits to '/login', where we'll preparing our users' sessions and redirect them to Auth0's Universal Login Page:
Route::add('/login', 'onLoginRoute');

// This will respond to visits to '/callback', where Auth0 will return our users after they've logged in. It's where our application can handle any session setup logic, and decide where to redirect them to.
Route::add('/callback', 'onCallbackRoute');

// This will respond to visits to '/logout', where we'll clear our users' sessions and redirect them to Auth0's logout endpoint:
Route::add('/logout', 'onLogoutRoute');

// This tells our router that we're done configuring routes, and to begin handling requests:
Route::run('/');
```

Let's also define our sample application's route's full URLs as named constants for convenience sake, as we'll need to reference them in a few places through our sample application:

```php
// 🧩 Continued from above. Append the following code to your index.php file.

define('ROUTE_URL_INDEX', rtrim($_ENV['AUTH0_BASE_URL'], '/'));
define('ROUTE_URL_LOGIN', ROUTE_URL_INDEX . '/login');
define('ROUTE_URL_CALLBACK', ROUTE_URL_INDEX . '/callback');
define('ROUTE_URL_LOGOUT', ROUTE_URL_INDEX . '/logout');
```

Now we can move on to adding our application's route handling logic, and the SDK integrations:

### Checking for a session

The Auth0 PHP SDK has a convenient method for checking if our end user has authenticated and returning their profile, `getCredentials()`. Let's install this on our index route to print the user profile if they're logged in, or report that they need to login.

```php
// 🧩 Continued from above. Append the following code to your index.php file.

function onIndexRoute() {
  $session = $auth0->getCredentials();

  if ($session === null) {
    // The user isn't logged in.
    echo 'Please <a href="/login">log in</a>.</p>';
    return;
  }

  // The user is logged in.
  print_r($session->user);

  echo 'You can now <a href="/logout">log out</a>.</p>';
}
```

We can access all the properties of our user's profile from the `user` property response, which is an array. So, for example, we can pull the user's nickname using `$session->user['nickname']`, or their email address from `$session->user['email']`. The structure is a [normalized user profile](https://auth0.com/docs/users/user-profile-structure), which you can learn more about [here](https://auth0.com/docs/users/normalized-user-profiles).

It's important to note that the content of the user profile will vary depending on the social provider(s) you use, so you should never assume that a particular value will always be there within your application logic. Use PHP language constructs like `isset` or null coalescence to gracefully handle a value's presence, or lack thereof, for example:

```php
$name = $session->user['name'] ?? $session->user['nickname'] ?? $session->user['email'] ?? 'Unknown';
```

### Logging in

Now let's create our /login route, which will use the Auth0 PHP SDK's `login()` method to setup the user session and return a customized URL to Auth0's Universal Login Page for this user to login.

```php
// 🧩 Continued from above. Append the following code to your index.php file.

function onLoginRoute() {
    // It's a good idea to reset user sessions each time they go to login to avoid "invalid state" errors, should they hit network issues or other problems that interrupt a previous login process:
    $auth0->clear();

    // Setup the user's session and generate a ULP URL:
    $loginUrl = $auth0->login(ROUTE_URL_CALLBACK);

    // Finally, redirect the user to the Auth0 Universal Login Page.
    header("Location: " . $loginUrl);
    exit;
}
```

## Handling authentication callback

When we redirect our end users using the `login()` URL above, they'll be taken to Auth0's Universal Login Page to process their authentication. After that step, our users are returned to our sample application at our callback route, /callback, which is what we'll be handling in this step.

When Auth0 passes our users back to us, it includes a few important parameters in the query of the HTTP request. The Auth0 PHP SDK's `exchange()` method handles working with those, so finishing our authentication flow is very simple:

```php
// 🧩 Continued from above. Append the following code to your index.php file.

function onCallbackRoute() {
    // Have the SDK complete the authentication flow:
    $auth0->exchange(ROUTE_URL_CALLBACK);

    // Finally, redirect our end user back to the / index route, to display their user profile:
    header("Location: " . ROUTE_URL_INDEX);
    exit;
}
```

## Logging out

Last, but not least, let's properly handle logging our users out. The `logout()` method of the Auth0 PHP SDK handles clearing our sample application's session cookies, redirecting the user to Auth0's [/logout endpoint](https://auth0.com/docs/logout) (which handles logging out Auth0 session layer and any identify provider session layers), and then returning the end user back to our / index route.

```php
// 🧩 Continued from above. Append the following code to your index.php file.

function onLogoutRoute() {
    // Setup the user's session and generate a ULP URL:
    $logoutUrl = $auth0->logout(ROUTE_URL_INDEX);

    // Finally, redirect the user to the Auth0 Universal Login Page.
    header("Location: " . $logoutUrl);
    exit;
}
```
