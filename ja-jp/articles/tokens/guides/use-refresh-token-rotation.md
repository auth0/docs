---
title: Use Refresh Token Rotation
description: Learn how to use Refresh Token rotation for you received during authorization.
topics:
  - refresh-tokens
  - refresh-token-rotation
contentType:
  - how-to
useCase:
  - use-refresh-token-rotation
---
# Use Refresh Token Rotation

To use Refresh Token rotation, you will use the [Auth0 Single Page App SDK](/libraries/auth0-spa-js). The Auth0 SPA SDK handles token storage, session management, and other details for you.

## Prerequisite

[Configure Refresh Token Rotation](/tokens/guides/configure-refresh-token-rotation)

## Enable useRefreshTokens

<%= include('../_includes/_rtr_enabled') %>

Use the option `useRefreshTokens` on `createAuth0Client` which defaults to `false`. With this option set to `false`, when `getTokenSilently()` is invoked and a new Access Token is required, the SDK attempts to acquire a new Access Token using a hidden iframe and `prompt=none`.

If you set to this option to `true`, the `offline_access` scope is automatically requested when using `loginWithRedirect(), loginWithPopup()` and `getTokenSilently()`. When `getTokenSilently()` is invoked and the Access Token has expired, the SDK attempts to renew the ID and Access Tokens by calling the `/token` endpoint using the `refresh_token` grant type along with the Refresh Token from the cache.

Silent re-authentication is achieved by sending a `prompt=none` parameter upon the authentication request and using a hidden iframe, provided that there is an active user session on the authorization server. The SDK uses the iframe method if you have set `useRefreshTokens` to `true` but no Refresh Token is available in the cache. This helps users to silently migrate to using Refresh Tokens without making them log in again.

::: note
If the exchange fails because `useRefreshTokens` is `true` but there isn't a Refresh Token in the cache, then it falls back to the iframe method (which could also fail if third-party cookies are blocked).
:::

For more details and examples, see [Use rotating Refresh Tokens](/libraries/auth0-spa-js#use-rotating-refresh-tokens). 

## Token storage

With SPAs, ID and Access Tokens are obtained from the authorization server and typically cached in memory. Token renewal (due to refreshing the browser, memory cache eviction budgets, or expiration) is handled by the SDK. See [Token Storage](/tokens/concepts/token-storage) for details. 

## Example

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

## Keep reading

* [Refresh Token Rotation](/tokens/concepts/refresh-token-rotation)
* [Configure Refresh Token Rotation](/tokens/guides/configure-refresh-token-rotation)
* [Disable Refresh Token Rotation](/tokens/guides/disable-refresh-token-rotation)
* [Revoke Refresh Tokens](/tokens/guides/revoke-refresh-tokens)
* [Token Storage](/tokens/concepts/token-storage)