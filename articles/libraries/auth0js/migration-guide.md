---
section: libraries
description: How to migrate from auth0.js v7 to auth0.js v8
url: /libraries/auth0js/migration-guide
---

# Auth0.js v7 to v8 Migration Guide

The following instructions assume you are migrating from **auth0.js v7** to **auth0.js v8**. 

The goal of this migration guide is to provide you with all of the information you would need to update Auth0.js in your application. Of course, your first step is to include the latest version of auth0.js. Beyond that, take a careful look at each of the areas on this page. You will need to change your implementation of auth0.js to reflect the new changes. Note that we especially recommend migrating to auth0.js v8 if you have [enabled the new API Authorization flows](/api-auth/tutorials/configuring-tenant-for-api-auth). 

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

## The parseHash Method

The `parseHash` method now validates the id_token. In order for this to work properly, the token should be signed using RS256, and will fail if the token is signed using HS256.

This can be avoided by either switching how your id_tokens are signed, or by manually parsing hashes, rather than using the `parseHash` method.

### Switching from HS256 to RS256

::: panel-warning Before Changing the Signing Algorithm
Please note that altering the signing algorithm for your client will immediately change the way your user's tokens are signed. This means that if you have already implemented JWT verification for your client somewhere, your tokens will not be verifiable until you update the logic to account for the new signing algorithm.
:::

To switch from HS256 to RS256 for a specific client, follow these instructions:
1. Go to [Dashboard > Clients](https://manage.auth0.com/#/clients)
1. Select your client
1. Go to _Settings_
1. Click on __Show Advanced Settings__
1. Click on the _OAuth_ tab in Advanced Settings
1. Change the __JsonWebToken Signature Algorithm__ to `RS256`

Remember that if the token is being validated anywhere else, changes might be needed there as well in order to comply.

### Manually Parsing Hashes 

If you would rather manually parse hashes, to avoid the `parseHash` method since it only works with RS256, feel free to take a look at [this example](https://github.com/auth0/auth0.js/blob/master/src/web-auth/index.js#L97) or [this one](https://github.com/auth0/auth0.js/blob/master/src/helper/qs.js#L10) to help you get started.

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

The `client.login` method allows for non redirect auth using custom database connections, using /oauth/token.

```js
webAuth.client.login({
  realm: 'tests',
  username: 'testuser',
  password: 'testpass',
  scope: 'openid profile',
  audience: 'urn:test'
});
```

### Passwordless Login

Passwordless authentication is no longer available using the v7 methods. Now, passwordless is a simpler process, begun by calling `passwordlessStart` and completed by calling `passwordlessVerify`. See the v8 [documentation on Passwordless Authentication](/libraries/auth0js#passwordless-login) for more details!

```js
webAuth.passwordlessStart({
    connection: 'Username-Password-Authentication',
    send: 'code', // code or link
    email: 'foo@bar.com' // either send an email param or a phoneNumber param
  }, function (err,res) {
    // handle errors or continue
  }
);
```

```js
webAuth.passwordlessVerify({
    connection: 'Username-Password-Authentication',
    email: 'foo@bar.com',
    verificationCode: '389945'
  }, function (err,res) {
    // handle errors or continue
  }
);
```

## Refreshing Tokens

In [auth0.js v7](/libraries/auth0js/v7#refresh-token), the `renewIdToken` and `refreshToken` methods were used to renew tokens. In [auth0.js v8](/libraries/auth0js#using-renewauth-to-acquire-new-tokens), 
refreshing tokens is now done via the `renewAuth` method. If a user is already authenticated, `renewAuth` can acquire a new token for that user.

## User Management

Linking accounts and gathering info has also changed. You can now instantiate a Management client object and call the `getUser`, `patchUserMetadata`, and `linkUser` methods on it to get a user's profile, update their metadata, or link two user accounts together. For more information, read about [user management](/libraries/auth0js#user-management) in the auth0.js documentation.
