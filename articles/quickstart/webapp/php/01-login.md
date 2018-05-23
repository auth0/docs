---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 PHP SDK to add authentication and authorization to your web app.
budicon: 448
github:
  path: 00-Starter-Seed
---

<%= include('../_includes/_getting_started', { library: 'PHP', callback: 'http://localhost:3000/' }) %>

## Add the Dependencies

${snippet(meta.snippets.dependencies)}

::: note
This sample uses [Composer](https://getcomposer.org/doc/00-intro.md), a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs. Then, it installs them in your project.
:::

## Configure Auth0 PHP SDK

Configure the Auth0 PHP SDK for each page that will use it.

```php
// index.php

use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain' => '${account.namespace}',
  'client_id' => '${account.clientId}',
  'client_secret' => 'YOUR_CLIENT_SECRET',
  'redirect_uri' => '${account.callback}',
  'audience' => 'https://${account.namespace}/userinfo',
  'scope' => 'openid profile',
  'persist_id_token' => true,
  'persist_access_token' => true,
  'persist_refresh_token' => true,
]);
```

## Add the Auth0 Callback Handler

Call `$auth0->getUser()` to retrieve user information. If you call it from the page that handles the callback, it will use the code provided by Auth0 to get the information after the successful login.

```php
// index.php

...
$userInfo = $auth0->getUser();

if (!$userInfo) {
    // We have no user info
    // redirect to Login
} else {
    // User is authenticated
    // Say hello to $userInfo['name']
    // print logout button
}
```

The user's information is stored in the session. Each time you call `getUser()`, it retrieves the information from the session.

## Trigger Login with the Auth0 PHP SDK

```html
<!-- index.php -->

<a class="btn btn-primary btn-lg btn-login btn-block" href="login.php">SignIn</a>
```

```php
// login.php

<?php
  // ...
  $auth0->login();
```

::: note
The `redirect_uri` specified in the `Auth0` constructor must match the URL specified in the [ Add the Auth0 Callback Handler](#add-the-auth0-callback-handler) step.
:::

## Access User Information

You can access user information with the `getUser` method from Auth0.

```php
<?php
// index.php

// ...
$userInfo = $auth0->getUser();
?>
<html>
  <body class="home">
    <div><?php echo $userInfo['name'] ?></div>
  </body>
</html>
```

To learn about all the available properties from the user's profile, read the [user profile](/user-profile) documentation. 

::: note
Some of the user profile properties depend on the social provider you use.
:::

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
