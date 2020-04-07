---
description: Understand how Refresh Token rotation provides greater security by issuing a new Refresh Token with each request made to Auth0 for a new Access Token by a client using Refresh Tokens.
topics:
  - tokens
  - refresh-token-rotation
contentType: concept
useCase:
  - refresh-token-rotation
  - silent-authentication
---
# Refresh Token Rotation

[Refresh Token](/tokens/concepts/refresh-tokens) rotation provides greater security by issuing a new Refresh Token and invalidating its predecessor token with each request made to Auth0 for a new [Access Token](/tokens/cocncepts/access-tokens). The way Refresh Token rotation works in Auth0 conforms with the [OAuth 2.0 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-4.12) and works with the following flows:
* [Authorization Code Flow](/flows/concepts/auth-code)
* [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
* [Resource Owner Password Credentials Exchange](/api-auth/tutorials/adoption/password)
* [Device Authorization Flow](/flows/concepts/device-auth)

Typically, ID and Access Tokens are obtained from the authorization server and cached in memory. Token renewal (due to refreshing the browser, memory cache eviction budgets, or expiration) is handled by the SDK. Silent re-authentication is technically achieved by sending a `prompt=none` parameter upon the authentication request and using a hidden iframe, provided that there is an active user session on the authorization server. 

## SDK support

### Single-page apps

For SPAs, use the `auth0-spa-js` SDK to perform silent re-authentication.

* For Refresh Token support, [configure the Refresh Token Rotation feature](/tokens/guides/configure-refresh-token-rotation) for your tenant, and configure it on your client using the Management API.

* You have the option to use either memory or local storage to store all tokens. The SDK defaults to memory for token storage. See [Token Storage](/tokens/concepts/token-storage) for details on which option will work for your app. 

* You can use Refresh Tokens to retrieve new access tokens for the SPA JS to request the `offline_access` scope automatically and call the `/token` endpoint directly with a Refresh Token (if available). 

::: note
The SDK uses the iframe method if you have set `useRefreshTokens` to `true` but no Refresh Token is available in the cache. This helps users to silently migrate to using Refresh Tokens without making them log in again.
:::

### Other apps

For iOS, Android, Windows and any other type of app, there is no change. 

## Keep reading

* [Configure Refresh Token Rotation](/tokens/guides/configure-refresh-token-rotation)
* [Use Refresh Token Rotation](/tokens/guides/use-refresh-token-rotation)
* [Token Storage](/tokens/concepts/token-storage)
* [OAuth 2.0 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-4.12)
