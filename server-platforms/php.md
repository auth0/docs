---
lodash: true
---

## PHP Webapp Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/auth0-PHP/master/create-package?path=examples/basic-webapp&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing PHP WebApp to use it with Auth0.**

### 1. Add Needed dependencies dependencies

Add the following dependencies to your `composer.json` and run `composer update`

````json
"require": {
  "auth0/auth0-php": "0.6.*",
  "adoy/oauth2": "dev-master",
  "vlucas/phpdotenv": "dev-master"
}
```

### 2. Configure Auth0 PHP Plugin

````php
use Auth0SDK\Auth0;

$auth0 = new Auth0(array(
    'domain'        => '@@account.namespace@@',
    'client_id'     => '@@account.clientId@@',
    'client_secret' => '@@account.clientSecret@@',
    'redirect_uri'  => '@@account.callback@@'
));
```

### 3. Add Auth0 callback handler

Now, we can call `$auth0->getUserInfo()` to retrieve the user information. If we call it from the page that will handle the callback, then it'll use the `code` provided by Auth0 to get the information after the successful login.

````php
// callback.php

...
$auth0->getUserInfo();

if (!$userInfo) {
    // We have no user info
    // redirect to Login
} else {
    // User is authenticated
    // Say hello to $userInfo['name']
    // print logout button
}
```

Once the user info is fetched, it'll be stored in the session. Therefore, from this moment on, each time you call `getUserInfo()` it will retrieve the information from the Session.

@@includes.callbackRegularWebapp@@

In this case, the callbackURL should look something like:

````
http://yourUrl/callback.php
```

### 4. Triggering login manually or integrating the Auth0 widget

@@widgetSDK2@@

> **Note:** Please note that the `callbackURL` specified in the `Auth0Widget` constructor **must match** the one specified in the previous step

### 5. Accessing user information

You can access the user information via the `getUserInfo` method from Auth0

````php
<?php
...
$userInfo = $auth0->getUserInfo();
?>
<html>
  <body class="home">
    <div><?php echo $userInfo['name'] ?></div>
  </body>
</html>
```

You can [click here](@@base_url@@/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 6. You've nailed it.

You have configured your PHP Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Configure session data

By default, the SDK will store the user information in the PHP Session and it will discard the access token and the id token. If you like to persist them as well, you can pass 'persist_access_token' => true and 'persist_id_token' => true to the SDK configuration in step 2. You can also disable session all together by passing 'store' => false.

If you want to change PHP Session and use Laravel, Zend, Symfony or other abstraction to the session, you can create a class that implements get, set, delete and pass it to the SDK as following.

````php
$laravelStore = new MyLaravelStore();
$auth0 = new Auth0(array(
    // ...
    'store' => $laravelStore,
    // ...
));
```
