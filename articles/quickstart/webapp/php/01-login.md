---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 PHP SDK to add authentication and authorization to your web app
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-php-web-app',
  path: '00-Starter-Seed/basic-webapp',
  requirements: [
    'Apache 2.4.4',
    'PHP 5.6.14 and up',
    'Auth0-PHP 5.0 and up'
  ]
}) %>


<%= include('../_includes/_getting_started', { library: 'PHP', callback: 'http://localhost:3000' }) %>

## Add the Dependencies

${snippet(meta.snippets.dependencies)}

::: note
This sample uses **[Composer](https://getcomposer.org/doc/00-intro.md)**, a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.
:::

## Configure Auth0 PHP SDK

Configure the Auth0 PHP SDK in each page that will use it.

```php
use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain' => '${account.namespace}',
  'client_id' => '${account.clientId}',
  'client_secret' => '${account.clientSecret}',
  'redirect_uri' => '${account.callback}',
  'audience' => 'https://${account.namespace}/userinfo',
  'scope' => 'openid profile',
  'persist_id_token' => true,
  'persist_access_token' => true,
  'persist_refresh_token' => true,
]);
```
::: note
The `redirect_uri` specified in the `Auth0` constructor **must match** the one specified in the previous step
:::

## Add Auth0 Callback Handler

When you call `$auth0->getUser()`, the SDK will look for the `code` included by Auth0 when redirecting to the callback page, and retrieve the user information. 

In this example, we will use the `index.php` as the callback page, and will include the lines below:

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

Once the user info is fetched, it'll be stored in the session. Therefore, from this moment on, each time you call `getUser()` it will retrieve the information from the Session.

## Trigger Login With Auth0 PHP SDK

Add a button in the home page that redirects to `login.php`.

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

## Accessing User Information

You can access the user information via the `getUser` method from Auth0.

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

You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of these depend on the social provider being used.

### Optional steps

#### Configure session data

By default, the SDK will store the user information in the PHP Session and it will discard the access token and the id token. If you like to persist them as well, you can pass `'persist_access_token' => true` and `'persist_id_token' => true` to the SDK configuration in step 2. You can also disable session altogether by passing `'store' => false`.

If you want to change PHP Session and use Laravel, Zend, Symfony or other abstraction to the session, you can create a class that implements get, set, delete and pass it to the SDK as following.

```php
$laravelStore = new MyLaravelStore();
$auth0 = new Auth0(array(
    // ...
    'store' => $laravelStore,
    // ...
));
```
