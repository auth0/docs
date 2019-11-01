---
title: Migration Guide: Use of /passwordless/start from Confidential Applications
description: Auth0 is deprecating the usage of the /passwordless/start endpoint from confidential applications without a client secret in the request.
topics:
  - passwordless
  - migrations
contentType:
  - concept
  - how-to
useCase:
  - customize-connections
---

# Migration Guide: Use of /passwordless/start from Confidential Applications

Auth0 is deprecating the use of the `/passwordless/start` endpoint from confidential applications when no client secret is included in the request. Most applications which are not Single Page Applications (SPA) or Native apps are confidential.

## Does this affect me?

If your applications currently call the `/passwordless/start` endpoint directly to begin passwordless transactions, or you use the Auth0.js library to do so, and you are calling the endpoint from a confidential client (not a SPA or a Native App) and not including your client secret, this deprecation does affect you.

## How to perform passwordless authentication from confidential applications

The migration path is straightforward. For any such calls to `/passwordless/start`, confidential applications must simply include their client secret as an attribute.

If making a POST request directly to `/passwordless/start`, it might resemble this example, being sure to include the `client_secret` attribute: 

```js
POST https://YOUR_AUTH0_DOMAIN/passwordless/start
Content-Type: application/json
{
"client_id": "${manage_url}",
“client_secret”: “YOUR_CLIENT_SECRET”,
"connection": "email",
"email": "EMAIL",
"send": "code",
"authParams": { 
   "scope": "openid",
   "state": "YOUR_STATE"
   }
}
```

If using Auth0.js in your Universal Login page, you will want to include the `client_secret` attribute in the `passwordlessStart()` call:

```js
webAuth.passwordlessStart({
    connection: 'email',
    send: 'code',
    email: 'foo@bar.com',
    client_secret: 'YOUR_CLIENT_SECRET'
  }, function (err,res) {
    // handle errors or continue
  }
);
```

### Verifying your migration

Once you have changed your calls to `/passwordless/start` to include client secrets where necessary, you can check your [Dashboard](${manage_url}/#/logs) for any logs related to this to ensure that you've changed everything you needed to. Once this is done, you can turn on the setting **Enforce client authentication for passwordless connections** in your Advanced tenant settings to prevent any future issues.
