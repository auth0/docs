---
description: Learn how to rotate fresh tokens in SPAs using the auth0-spa-js.
topics:
  - tokens
  - refresh-token-rotation
contentType: how-to
useCase:
  - refresh-token-rotation
  - silent-authentication
---
# Rotate Refresh Tokens in SPAs Using auth0-sp-js SDK

To take advantage of the Refresh Token rotation functionality, the option `useRefreshTokens` has been added to `createAuth0Client`, which defaults to `false`.

* With this option set to `true`, the `offline_access` scope is automatically requested when using `loginWithRedirect(), loginWithPopup()` and `getTokenSilently()`. Furthermore, when `getTokenSilently()` is invoked and the access token has expired, the SDK will attempt to renew the ID and Access Tokens by calling the `/token` endpoint using the `refresh_token` grant type along with the Refresh Token from the cache. 

* With this option set to `false`, when `getTokenSilently()` is invoked and a new Access Token is required, the SDK will attempt to acquire a new Access Token using a hidden iframe and `prompt=none`.

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

* [Enable Refresh Token Rotation for Applications](/tokens/guides/enable-refresh-token-rotation)
* [Disable Refresh Token Rotation for Applications](/tokens/guides/disable-refresh-token-rotation)
