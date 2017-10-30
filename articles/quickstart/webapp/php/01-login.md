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
    'PHP 5.6.14 and up'
  ]
}) %>

## Add the Dependencies

${snippet(meta.snippets.dependencies)}

::: note
This sample uses [Composer](https://getcomposer.org/doc/00-intro.md), a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs. Then, it installs them in your project.
:::

## Configure the Auth0 PHP Plugin

```php
use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain' => '${account.namespace}',
  'client_id' => '${account.clientId}',
  'client_secret' => '${account.clientSecret}',
  'redirect_uri' => '${account.callback}',
  'audience' => 'https://${account.namespace}/userinfo',
  'persist_id_token' => true,
  'persist_access_token' => true,
  'persist_refresh_token' => true,
]);
```

### Optional: Configure session data

By default, the SDK stores user information in the PHP session and discards the access and ID tokens. 

To keep the tokens, to the SDK configuration, pass the following:
* `'persist_access_token' => true`
* `'persist_id_token' => true`

To disable the session, pass `'store' => false` to the SDK configuration.

## Add the Auth0 Callback Handler

Call `$auth0->getUser()` to retrieve user information. If you call it from the page that handles the callback, it will use the code provided by Auth0 to get the information after the successful login.

```php
// callback.php

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

${include('../_callbackRegularWebApp')}

In this case, `redirectUrl` should look like this:

```text
http://yourUrl/callback.php
```

## Integrate Auth0.js

```html
<!-- index.php -->

<a class="btn btn-primary btn-lg btn-login btn-block">SignIn</a>
```

```js
// public/app.js

$(document).ready(function() {
  var webAuth = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: '${account.callback}',
    audience: `https://${account.namespace}/userinfo`,
    responseType: 'code',
    scope: 'openid profile'
  });

  $('.btn-login').click(function(e) {
    e.preventDefault();
    webAuth.authorize();
  });
});
```

::: note
The `redirectUrl` specified in the `webAuth` constructor must match the URL specified in the previous step.
:::

## Access User Information

You can access the user's information with the `getUser` method from Auth0.

```php
<?php
...
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

## Optional 

Instead of using the PHP session to store information, you can use Laravel, Zend, Symfony or similar techniques. To do that, create a class that implements the get, set and delete methods and pass it to the SDK.

```php
$laravelStore = new MyLaravelStore();
$auth0 = new Auth0(array(
    // ...
    'store' => $laravelStore,
    // ...
));
```
