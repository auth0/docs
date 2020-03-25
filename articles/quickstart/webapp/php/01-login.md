---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a PHP application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - php
contentType: tutorial
useCase: quickstart
github:
  path: 00-Starter-Seed
---
<%= include('../_includes/_getting_started', { library: 'PHP', callback: 'http://localhost:3000/' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Configure PHP to Use Auth0

### Add the Dependencies

::: note
This sample uses [Composer](https://getcomposer.org/doc/00-intro.md), a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and installs them in your project.
:::

${snippet(meta.snippets.dependencies)}

This will create a `vendor` folder and download all the dependencies needed to use the Auth0 PHP SDK. This will also create a `vendor/autoload.php` file which is used in the code samples below to load all necessary classes.

### Configure Auth0 PHP SDK

Configure the Auth0 PHP SDK for each page that will use it.

```php
<?php
// index.php
// ...

require 'vendor/autoload.php';
use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain' => '${account.namespace}',
  'client_id' => '${account.clientId}',
  'client_secret' => 'YOUR_CLIENT_SECRET',
  'redirect_uri' => 'http://localhost:3000/',
  'scope' => 'openid profile email',
]);
```

### Add the Auth0 Callback Handler

Call `$auth0->getUser()` to retrieve user information. If you call it from the page that handles the callback, it will use the code provided by Auth0 to get the information after the successful login.

```php
<?php
// index.php
// ...

$userInfo = $auth0->getUser();

if (!$userInfo) {
    // We have no user info
    // See below for how to add a login link
} else {
    // User is authenticated
    // See below for how to display user information
}
```

The user's information is stored in the session. Each time you call `getUser()`, it retrieves the information from the session.

## Trigger Authentication

```html
<!-- index.php -->

<a href="login.php">Log In</a>
```

```php
<?php
// login.php

require 'vendor/autoload.php';
use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain' => '${account.namespace}',
  'client_id' => '${account.clientId}',
  'client_secret' => 'YOUR_CLIENT_SECRET',
  'redirect_uri' => '${account.callback}',
  'scope' => 'openid profile email',
]);

$auth0->login();
```

::: note
The `redirect_uri` specified in the `Auth0` constructor must match the URL specified in the [Add the Auth0 Callback Handler](#add-the-auth0-callback-handler) step.
:::

## Display User Information

You can access user information with the `getUser` method from Auth0.

```php
<?php
// index.php
// ...

$userInfo = $auth0->getUser();
printf( 'Hello %s!', htmlspecialchars( $userInfo['name'] ) );
```

To learn about all the available properties from the user's profile, read the [user profile](/users/concepts/overview-user-profile) documentation.

::: note
Some of the user profile properties depend on the social provider you use.
:::

## Logout

```php
// index.php

// ...
<?php if(!$userInfo): ?>
  // Display login button
<?php else: ?>
  <a href="/logout.php">Logout</a>
<?php endif ?>
```

```php
// logout.php

// ...
$auth0->logout();
$return_to = 'http://' . $_SERVER['HTTP_HOST'];
$logout_url = sprintf('http://%s/v2/logout?client_id=%s&returnTo=%s', '${account.namespace}', '${account.clientId}', $return_to);
header('Location: ' . $logout_url);
die();
```

### Optional: Configure session data

By default, the SDK stores user information in the PHP session and discards the access and ID Tokens.

To keep the tokens, to the SDK configuration, pass the following:
* `'persist_access_token' => true`
* `'persist_id_token' => true`

To disable the session, pass `'store' => false` to the SDK configuration.

Instead of using the PHP session to store information, you can use Laravel, Zend, Symfony or similar techniques. To do that, create a class that implements the get, set and delete methods and pass it to the SDK.

```php
// index.php

$laravelStore = new MyLaravelStore();
$auth0 = new Auth0(array(
    // ...
    'store' => $laravelStore,
    // ...
));
```
