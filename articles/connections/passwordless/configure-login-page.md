---
title: Configure Embedded Login Pages for Passwordless with Lock v11 for Web
description: Learn how to configure login pages for Passwordless using Lock
topics:
    - connections
    - passwordless
    - lock
contentType: how-to
useCase: customize-connections
---

# Configure Embedded Login Pages for Passwordless with Lock v11 for Web

::: note
Lock's <dfn data-key="passwordless">Passwordless</dfn> Mode is only available in Lock v11.2.0 and later. Please use the [latest release of Lock](https://github.com/auth0/lock/releases) for this feature!
:::

In this guide, you'll get an overview of how to set up an embedded login page using [Lock](/libraries/lock/v11) with [Passwordless](/connections/passwordless).

With Lock's Passwordless Mode, users receive one-time use authetication codes or links for authentication. This means a user can login with just an email or mobile phone number without having to remembering a password.

<%= include('../../_includes/_embedded_login_warning') %>

## Initialization

In order to implement Passwordless Mode, you'll have to initialize Lock with `Auth0LockPasswordless` instead of with `Auth0Lock`:

```js
var lockPasswordless = new Auth0LockPasswordless(
 '${account.clientId}',
 '${account.namespace}'
);
```

### Configuration options

Lock's Passwordless Mode has several unique configuration options: `allowedConnections` and `passwordlessMethod`. You set these options and provide them during `Auth0LockPasswordless` initalization.


`allowedConnections` indicates the connection type, with either `email` or `sms` as the value:

```js
var passwordlessOptions = {
  allowedConnections: ['sms']
}
```

If you choose to use `email`, you have one more option to select - whether you wish your users to receive a code to input, or a "magic link" to use. This is done via the `passwordlessMethod` option, which takes values of `code` or `link`.

```js
var passwordlessOptions = {
  allowedConnections: ['email'],
  passwordlessMethod: 'code'
}
```

Here's a basic example:

```js
var passwordlessOptions = {
  allowedConnections: ['email'],
  passwordlessMethod: 'code',
  auth: {
    redirectUrl: 'http://localhost:3000/callback',   
    responseType: 'token id_token',
    params: {
      scope: 'openid email'               
    }          
  }
}

var lockPasswordless = new Auth0LockPasswordless(
 '${account.clientId}',
 '${account.namespace}',
 passwordlessOptions
);
```