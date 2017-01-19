---
section: libraries
description: How to migrate from auth0.js v7 to auth0.js v8
url: /libraries/auth0js/migration-guide
---

# Auth0.js v7 to v8 Migration Guide

The following instructions assume you are migrating from **auth0.js v7** to **auth0.js v8**. 

The goal of this migration guide is to provide you with all of the information you would need to update Auth0.js in your application. Of course, your first step is to include the latest version of auth0.js. Beyond that, take a careful look at each of the areas on this page. You will need to change your implementation of auth0.js to reflect the new changes. Note that we especially recommend migrating to auth0.js v8 if you have the OAuth2 flag enabled in your tenant. 

Take a look below for more information about changes and additions to auth0.js in version 8!

## Initialization of auth0.js

Initialization of auth0.js in your application will now use `auth0.WebAuth` instead of `Auth0`
```html
<script src="https://cdn.auth0.com/js/auth0/8.1.0/auth0.min.js"></script>
<script type="text/javascript">
  var webAuth = new auth0.WebAuth({
    domain:       'YOUR_AUTH0_DOMAIN',
    clientID:     'YOUR_CLIENT_ID'
  });
</script>
```

## Login

The `login` method of version 7 was divided into several different methods in version 8, based on the type of auth you need, rather than the old `login` method.

### webAuth.authorize()

The `authorize` method can be used for logging in users via the [Hosted Login Page](/libraries/auth0js#hosted-login-page), or via social connections, as exhibited below. 

For hosted login, one must call the authorize endpoint


```js
webAuth.authorize({ 
  //Any additional options can go here 
});
```

For social logins, the connection will need to be specified

```js
webAuth.authorize({
  connection: 'twitter'
});
```

### webAuth.popup.authorize()

For popup authentication, the `popup.authorize` method can be used. 

Hosted login with popup

```js
webAuth.popup.authorize({ 
  //Any additional options can go here 
});
```

And social login with popup

```js
webAuth.popup.authorize({
  connection: 'twitter'
});
```

### webAuth.redirect.loginWithCredentials()

To login with credentials to enterprise connections, the `redirect.loginWithCredentials` method is used.

With redirect

```js
webAuth.redirect.loginWithCredentials({
  connection: 'Username-Password-Authentication',
  username: 'testuser',
  password: 'testpass',
  scope: 'openid'
});
```

### webAuth.popup.loginWithCredentials()

Or, popup authentication can be performed with `popup.loginWithCredentials`.

```js
webAuth.popup.loginWithCredentials({
  connection: 'Username-Password-Authentication',
  username: 'testuser',
  password: 'testpass',
  scope: 'openid'
});
```

### webAuth.client.login()

The `client.login` method allows for non rediret auth using custom database connections, using /oauth/token.

```js
webAuth.client.login({
  realm: 'tests',
  username: 'testuser',
  password: 'testpass',
  scope: 'openid profile',
  audience: 'urn:test'
});
```

## Refreshing Tokens

Refreshing tokens is now done via the [renewAuth](/libraries/auth0js#using-renewauth-to-acquire-new-tokens) method. 


## User Management

Linking accounts and gathering info has also changed. You can now instantiate a Management client object and call the `getUser`, `patchUserMetadata`, and `linkUser` methods on it to get a user's profile, update their metadata, or link two user accounts together. For more information, read about [user management](/libraries/auth0js#user-management) in the auth0.js documentation.
