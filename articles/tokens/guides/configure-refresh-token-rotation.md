---
description: Learn how to configure and use Refresh Token rotation.
toc: true 
topics:
  - tokens
  - refresh-tokens
  - refresh-token-rotation
contentType: how-to
useCase:
  - enable-refresh-token-rotation
  - configure-refresh-token-rotation
  - disable-refresh-token-rotation
---
# Configure Refresh Token Rotation

Configure Refresh Token Rotation for each application using the Management API. When Refresh Token Rotation is enabled, the transition for the end-user will be seamless. The application will use the previous non-rotating Refresh Token, which will be expired and swapped for a rotating Refresh Token. Request a new Refresh Token/Access Token pair when Refresh Token Rotation is enabled.

Migration scenarios accommodate automatic token revocation when migrating from a non-rotating Refresh Token to a rotating Refresh Token and vice-versa.

- Exchanging a non-rotating Refresh Token when Refresh Token Rotation is enabled will delete all the non-rotating tokens issued for the same `client_id`, resource server, and user and tenant.
- Exchanging a rotating Refresh Token when Refresh Token Rotation is disabled will issue a non-rotating Refresh Token and revoke the Rotating Refresh Token family.

## Prerequisite

Install the latest version of the `auth0-spa-js` SDK.

```text
npm install @auth0/auth0-spa-js
```

## Enable Refresh Token rotation for an application

Use the Managment API to enable Refresh Token rotation:

```js
PATCH /api/v2/clients/{client_id}
{
  "refresh_token": {
    "rotation_type": "rotating"
    "expiration_type": "expiring"
    "token_lifetime": "2592000"
    "leeway": 3
  }
}
```

### Refresh Token expiration

The default Refresh Token expiration period when Refresh Token Rotation is enabled is 30 days. You can configure up to 90 days using the Management API. 

### Refresh Token leeway (latency compensation)

You can use the `leeway` attribute to allow the same Refresh Token to be used within the time period to account for potential network concurrency issues that would otherwise invalidate the token should the client attempt to retry using the same Refresh Token. By default leeway is disabled.

The concept of a *leeway* is to avoid concurrency issues when exchanging the Rotating Refresh Token multiple times within a given timeframe. During the leeway window which is configurable on a per second basis, the breach detection features don't apply and therefore a new Rotating Refresh Token is issued. Only the previous token can be reused, meaning if the second to last one is exchanged, the breach detection will apply. 

### Revoke Refresh Tokens and re-use detection

If a previously invalidated token is used, the entire set of Refresh Tokens issued since that invalidated token was issued will be immediately revoked, requiring the end-user to re-authenticate.

Use the `/oath/revoke` endpoint to revoke a Refresh Token. 

Use the `/api/v2/device-credentials` endpoint to revoke Refresh Tokens configured for rotation. Note that using this endpoint revokes the entire grant not just a specific token.

## Use Refresh Token rotation functionality


To use the Refresh Token rotation functionality, use the option `useRefreshTokens` on `createAuth0Client` which defaults to `false`.

* With this option set to `true`, the `offline_access` scope is automatically requested when using `loginWithRedirect(), loginWithPopup()` and `getTokenSilently()`. When `getTokenSilently()` is invoked and the access token has expired, the SDK attempts to renew the ID and Access Tokens by calling the `/token` endpoint using the `refresh_token` grant type along with the Refresh Token from the cache. 

* With this option set to `false`, when `getTokenSilently()` is invoked and a new Access Token is required, the SDK attempts to acquire a new Access Token using a hidden iframe and `prompt=none`.

If the exchange fails because `useRefreshTokens` is `true` but there isn't a Refresh Token in the cache, then it falls back to the iframe method (which could also fail if third-party cookies are blocked).

### Example

The following example shows how to configure the SDK to use both local storage and refresh tokens:

```js
const auth0 = await createAuth0Client({
    domain: '<your Auth0 domain>',
    client_id: '<your Auth0 client ID>',
    cacheLocation: 'localstorage',
    useRefreshTokens: true
});

// Logging-in will automatically request the offline_access scope
// and store the resulting refresh token
auth0.loginWithRedirect();

// Silently refreshing the access token will use the /token endpoint
// with ‘refresh_token’ grant and the refresh token from the cache
await auth0.getTokenSilently();
```

## Disable Refresh Token rotation

Disable Refresh Token Rotation for each application using the Management API. 

```js
PATCH /api/v2/clients/{client_id}
{
  "refresh_token": {
    "rotation_type": "reusable"
    "expiration_type": "non-expiring"
  }
}
```

## Keep reading

* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Refresh Token Rotation](/tokens/concepts/refresh-token-rotation)
* [Token Storage](/tokens/concepts/token-rotation)