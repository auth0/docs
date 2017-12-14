---
section: libraries
title: Migrating from Auth0.js v7 to v9
description: How to migrate from Auth0.js v7 to v9
toc: true
---
# Migrating from Auth0.js v7 to v9

This guide includes all the information you need to update [Auth0.js](/libraries/auth0js) from v7 to v9. Find out if you should upgrade or not by reading [Migrating to Auth0.js v9](/libraries/auth0js/v9/migration-guide).

The [Auth0.js v7 to v8 Migration Guide](/libraries/auth0js/v8/migration-guide) has detailed information on how to migrate from v7 to v8, and that information is still valid, v7 is very similar to v8. This document will go over some common usage patterns, and focus on things that changed after that guide was created.

## Migration Steps

<%= include('../../_includes/_get_auth0_js_latest_version') %>

## Using Auth0.js to Log In Users

### Using Auth0.js v7

```js
var auth0 = new Auth0({
  domain:'${account.namespace}'),,
  clientID: '${account.clientId}',
  responseType: 'token'
});

// With the hosted login page
auth0.login({});

// With a social connection
auth0.login({
  connection: 'twitter'
});

// With username and password
auth0.login({
  connection: 'my-db-connection',
  username: 'the-username',
  password: 'the-password'
});
```

### Using Auth0.js v9

```js
var webAuth = new auth0.WebAuth({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  responseType: 'token id_token'
});

// with the hosted login page
webAuth.authorize({});

// with a social connection
webAuth.authorize({
  connection: 'twitter'
});

// with username and password
webAuth.login({
  realm: 'my-db-connection',
  username: 'the-username',
  //email: 'the@email.com',
  password: 'the-password'
});
```
## Using Auth0.js to Log-in Users in 'popup` mode

### Using Auth0.js v7

```js
var auth0 = new Auth0({
  domain: ''${account.namespace}'',
  clientID: ''${account.clientId}'',
  responseType: 'token'
});

// With the hosted login page
auth0.login({
  popup: true
});

//with a social connection
auth0.login({
  popup: true,
  connection: 'twitter'
});

//with username and password
auth0.login({
  popup: true,
  connection: 'my-db-connection',
  username: 'the-username',
  password: 'the-password'
});
```

### Using Auth0.js v9

```js
var webAuth = new auth0.WebAuth({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  responseType: 'token'
});

// with the hosted login page
webAuth.popup.authorize({});

// with a social connection
webAuth.popup.authorize({
  connection: 'twitter'
});

// with username and password
webAuth.popup.loginWithCredentials({
  connection: 'my-db-connection',
  username: 'the-username',
  //email: 'the@email.com',
  password: 'the-password'
});
```

## Using Auth0.js to Log-in Users Using Passwordless

### Using Auth0.js v7

```js
var auth0 = new Auth0({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  responseType: 'token'
});

// with a magic link sent via email
auth0.requestMagicLink(
  {
    email: 'the@email.com'
  },
  function(err) {}
);

// with a code sent via email
auth0.requestEmailCode(
  {
    email: 'the@email.com'
  },
  function(err) {}
);

// verifying the email code
auth0.verifyEmailCode(
  {
    email: 'the@email.com',
    code: 'the-code'
  },
  function(err, result) {}
);

// with a code sent via sms
auth0.requestSMSCode(
  {
    phoneNumber: '+the_phone_number'
  },
  function(err) {}
);

// verifying the sms code
auth0.verifySMSCode(
  {
    phoneNumber: '+the_phone_number',
    code: 'the-code'
  },
  function(err, result) {}
);
```

### Using Auth0.js v9

```js
var webAuth = new auth0.WebAuth({
  domain: ''${account.namespace}'',
  clientID: ''${account.clientId}'',
  responseType: 'token'
});

// with a magic link sent via email
webAuth.passwordlessStart({
  send: 'link',
  email: 'the@email.com',
  connection: 'email'
});

// with a code sent via email
webAuth.passwordlessStart({
  send: 'code',
  email: 'the@email.com',
  connection: 'email'
});

// verifying the email code
webAuth.passwordlessLogin({
  email: 'the@email.com',
  verificationCode: 'the-code',
  connection: 'email'
});

// with a code sent via sms
webAuth.passwordlessStart({
  phoneNumber: '+the_phone_number',
  connection: 'sms'
});

// verifying the sms code
webAuth.passwordlessLogin({
  phoneNumber: '+the_phone_number',
  verificationCode: 'the-code',
  connection: 'sms'
});
```

<%= include('../../_includes/_configure_embedded_login') %>
<%= include('../../_includes/_change_get_profile') %>
<%= include('../../_includes/_review_get_ssodata') %>

## Behavioral Changes

<%= include('../../_includes/_hosted_pages') %>
<%= include('../../_includes/_default_values') %>
