---
title: Configure Login Page for Passwordless - Embedded + Lock (with Passwordless)
description: Learn how to configure a login page for use with passwordless authentication using Auth0's Lock widget embedded in your own login page.
topics:
    - connections
    - passwordless
    - lock
    - embedded-login
contentType: how-to
useCase: customize-connections
---

# Configure Login Page for Passwordless: Embedded + Lock (with Passwordless)

::: note
Lock's <dfn data-key="passwordless">Passwordless</dfn> mode is only available in Lock v11.2.0 and later. Please use the [latest release of Lock](https://github.com/auth0/lock/releases) for this feature!
:::

This guide gives an overview of how to set up a login page for use with [Passwordless](/connections/passwordless) authentication using our [Lock](/libraries/lock/v11) widget embedded in your own login page.

<%= include('../../../_includes/_embedded_login_warning') %>

## Initialization

To implement Lock's Passwordless mode, you must initialize Lock with `Auth0LockPasswordless` (instead of `Auth0Lock`):

```js
var lockPasswordless = new Auth0LockPasswordless(
 '${account.clientId}',
 '${account.namespace}'
);
```

## Configuration options

Lock's Passwordless mode has additional unique configuration options, which are set and provided during initialization.

### `allowedConnections` 

Indicates the passwordless connection type. Accepts a value of either `sms` or `email`.

```js
var passwordlessOptions = {
  allowedConnections: ['sms']
}
```

### `passwordlessMethod`

Indicates whether you want users to receive a one-time-use code or a magic link. Only configurable if your passwordless connection type is  `email`. Accepts a value of either `code` or `link`.

```js
var passwordlessOptions = {
  allowedConnections: ['email'],
  passwordlessMethod: 'code'
}
```

## Example implementation

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