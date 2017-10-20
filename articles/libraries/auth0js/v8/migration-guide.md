---
section: libraries
title: Auth0.js v7 to v8 Migration Guide
description: How to migrate from auth0.js v7 to auth0.js v8
toc: true
---
# Auth0.js v7 to v8 Migration Guide

The following instructions assume you are migrating from **auth0.js v7** to **auth0.js v8**.

The goal of this migration guide is to provide you with all of the information you would need to update Auth0.js in your application. Of course, your first step is to include the latest version of auth0.js. Beyond that, take a careful look at each of the areas on this page. You will need to change your implementation of auth0.js to reflect the new changes.

Take a look below for more information about changes and additions to Auth0.js in version 8!

## Reasons to Migrate

The first question to answer before getting into the changes is why to migrate your app to the new version at all. Here are a few quick points that address that:

* With version 8 of the Auth0.js SDK, you can use [our latest and most secure authentication pipeline](/api-auth/intro), compliant with the OpenID Connect specification. For more information, refer to the below section [Use of API Auth and Metadata](#use-of-api-auth-and-metadata).
* Auth0.js v8 was rewritten from scratch, improving its cohesion and performance and coming with more tests to be utilized.
* Long term support - As is often the case with new iterations of projects, v8 will be supported for significantly longer than v7.

### Use of API Auth and Metadata

There are often situations where your APIs will need to authorize limited access to users, servers, or servers on behalf of users. Managing these types of authorization flows and access to your APIs is much easier with Auth0. If you need to use these [API Auth](/api-auth) features, we recommend that you upgrade to [auth0.js v8](/libraries/auth0js/v8).

However, if your application is currently relying on being able to request metadata via scopes (as described in the legacy [scopes documentation](/scopes/legacy)), and you do not wish to use API Auth features to handle that instead, you have two choices:

* Continue to use Auth0.js v7 until it is no longer an option
* Use Auth0.js v8 without using API Auth. 
  * Do not mark your client as OIDC Conformant in the dashboard
  * Do not pass the `audience` parameter when using `authorize()`, or use methods which do not support API Auth, such as `loginWithCredentials()`, `signupAndLogin()` or `loginWithResourceOwner()` (note that `loginWithResourceOwner()` requires the legacy Resource Owner grant in order to be used and is unavailable to some customers).

Alternatively, you could also simply request the metadata in a different way, for example with a rule to add custom claims to either the returned `id_token` or `access_token` as described in the [custom claims](/scopes/current#custom-claims) section of the scopes documentation.

::: note
You can find detailed information about supported methods in the [Auth0.js v8](/libraries/auth0js) documentation, and generated documentation on all methods [here](http://auth0.github.io/auth0.js/global.html) for further reading.
:::

## Initialization of auth0.js

Initialization of auth0.js in your application will now use `auth0.WebAuth` instead of `Auth0`

```html
<script src="${auth0js_urlv8}"></script>
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

The `authorize` method can be used for logging in users via the [Hosted Login Page](/hosted-pages/login), or via social connections, as exhibited below.

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

## The parseHash Method

The `parseHash` method now validates the id_token. In order for this to work properly, the token should be signed using RS256, and will fail if the token is signed using HS256.

This can be avoided by either switching how your id_tokens are signed, or by manually parsing hashes, rather than using the `parseHash` method.

### Switching from HS256 to RS256

::: panel-warning Before Changing the Signing Algorithm
Please note that altering the signing algorithm for your client will immediately change the way your user's tokens are signed. This means that if you have already implemented JWT verification for your client somewhere, your tokens will not be verifiable until you update the logic to account for the new signing algorithm.
:::

To switch from HS256 to RS256 for a specific client, follow these instructions:

1. Go to [Dashboard > Clients](${manage_url}/#/clients)
1. Select your client
1. Go to _Settings_
1. Click on __Show Advanced Settings__
1. Click on the _OAuth_ tab in Advanced Settings
1. Change the __JsonWebToken Signature Algorithm__ to `RS256`

Remember that if the token is being validated anywhere else, changes might be needed there as well in order to comply.

### Manually Parsing Hashes

If you would rather manually parse hashes, to avoid the `parseHash` method since it only works with RS256, feel free to take a look at [what parseHash is doing](https://github.com/auth0/auth0.js/blob/master/src/web-auth/index.js) to help you get started replicating that.

## Refreshing Tokens

When a token is nearing expiration, or is expired, you may wish to simply renew the token rather than requiring a new transaction.

In [auth0.js v7](/libraries/auth0js/v7#refresh-token), the `renewIdToken()` and `refreshToken()` methods were used to refresh tokens. In [auth0.js v8](/libraries/auth0js#using-checksession-to-acquire-new-tokens), refreshing tokens is done via the `checkSession()` method. If a user is already authenticated, `checkSession()` can be used to acquire a new token for that user.

## Delegation

Delegation is now done via the `delegation` method, which takes an `options` object containing the following potential parameters:

* __client_id__ (required): a string; the Auth0 client identifier
* __grant_type__ (required): a string; must be `urn:ietf:params:oauth:grant-type:jwt-bearer`
* __id_token__ (required): a string; either a valid id_token or a valid refresh_token is required
* __refresh_token__: a string; either a valid refresh_token or a valid id_token is required
* __target__: a string; the target client id of the delegation
* __scope__: a string; either `'openid'` or `'openid profile email'`
* __api_type__: a string; the api to be called

```js
webAuth.client.delegation({
  client_id: '${account.clientId}',
  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
  id_token: 'valid idToken here',
  target: 'target client id here',
  scope: 'openid'
});
```

## User Management

Linking accounts and gathering info has also changed. You can now instantiate a Management client object and call the `getUser`, `patchUserMetadata`, and `linkUser` methods on it to get a user's profile, update their metadata, or link two user accounts together. For more information, read about [user management](/libraries/auth0js#user-management) in the auth0.js documentation.
