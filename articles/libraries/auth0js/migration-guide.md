---
section: libraries
description: How to migrate from auth0.js v7 to auth0.js v8
url: /libraries/auth0js/migration-guide
---

# Auth0.js v7 to v8 Migration Guide

The following instructions assume you are migrating from **auth0.js v7** to **auth0.js v8**. 

The goal of this migration guide is to provide you with all of the information you would need to update Auth0.js in your application. Of course, your first step is to include the latest version of auth0.js. Beyond that, take a careful look at each of the areas on this page. You will need to change your implementation of auth0.js to reflect the new changes. Take a look below for more information!

## Initialization of auth0.js

Initialization of auth0.js in your application will now use `auth0.WebAuth` instead of `Auth0`
```html
<script src="https://cdn.auth0.com/js/auth0/8.0.4/auth0.min.js"></script>
<script type="text/javascript">
  var webAuth = new auth0.WebAuth({
    domain:       'YOUR_AUTH0_DOMAIN',
    clientID:     'YOUR_CLIENT_ID'
  });
</script>
```

## Login

Logging in has changed in v8 as well. Rather than using the `login` method, to [login using the Hosted Login page](/libraries/auth0js#hosted-login-page) you will need to use the `authorize` method. To [login using a custom username/password](/libraries/auth0js#custom-username-and-password), you'll use the `client.login` method.

Hosted Login:

```js
webAuth.authorize({
  audience: 'url:auth:some-audience',
  scope: 'read:something write:otherthing',
  responseType: 'token',
  redirectUri: 'https://example.com/auth/callback'
});
```

Custom Username/Password Login:

```js
webAuth.client.login({
  realm: 'Username-Password-Authentication', //connection name or HRD domain
  username: 'info@auth0.com',
  password: 'areallystrongpassword',
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order',
  }, function(err, authResult) {
    // Auth tokens in the result or an error
});
```

## Refreshing Tokens

Refreshing tokens is now done via the [renewAuth](/libraries/auth0js#using-renewauth-to-acquire-new-tokens) method. 


## User Management

Linking accounts and gathering info has also changed. You can now instantiate a Management client object and call the `getUser`, `patchUserMetadata`, and `linkUser` methods on it to get a user's profile, update their metadata, or link two user accounts together. For more information, read about [user management](/libraries/auth0js#user-management) in the auth0.js documentation.
