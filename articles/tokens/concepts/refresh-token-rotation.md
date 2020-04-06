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

[Refresh Token](/tokens/concepts/refresh-tokens) rotation provides greater security by issuing a new Refresh Token and invalidating its predecessor token with each request made to Auth0 for a new [Access Token](/tokens/cocncepts/access-tokens). 

Refresh Token rotation in Auth0 conforms with the [OAuth 2.0 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-4.12). 

Refresh Token rotation is supported in conjunction with the following flows:
* [Authorization Code Flow](/flows/concepts/auth-code)
* [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
* [Resource Owner Password Credentials Exchange](/api-auth/tutorials/adoption/password)
* [Device Authorization Flow](/flows/concepts/device-auth)

## How it works

Typically, ID and Access Tokens are obtained from the authorization server and cached in memory. Token renewal (due to refreshing the browser, memory cache eviction budgets, or expiration) is handled by the SDK. Silent re-authentication is technically achieved by sending a `prompt=none` parameter upon the authentication request and using a hidden iframe, provided that there is an active user session on the authorization server. 

This method, however, is impacted by [Intelligent Tracking Prevention (ITP)](https://webkit.org/blog/7675/intelligent-tracking-prevention/). Starting with ITP2, this became a problem with sessions being prematurely terminated in Safari. This is especially a concern if you want to offer long-lived sessions. To address this issue, you can use Refresh Token rotation to leverage the use of Refresh Tokens in the browser that adhere to the OAuth 2.0 BCP. 

## SDK support

For single page apps, you can use the `auth0-spa-js` SDK to perform silent re-authentication.

* For Refresh Token support, [enable the Refresh Token Rotation feature](/tokens/guides/enable-refresh-token-rotation) for your tenant, and configure it on your client using the Management API or Dashboard.

* You have the option to use either memory or local storage to store all tokens. The SDK defaults to memory for token storage.

* You can use refresh tokens to retrieve new access tokens for the SPA JS to request the `offline_access` scope automatically and call the `/token` endpoint directly with a Refresh Token (if available). 

::: note
The SDK uses the iframe method if you have set `useRefreshTokens` to `true` but no Refresh Token is available in the cache. This helps users to silently migrate to using Refresh Tokens without making them log in again.
:::

## Keep reading

* [Enable Refresh Token Rotation](/tokens/guides/enable-refresh-token-rotation)
* [Disable Refresh Token Rotation](/tokens/guides/disable-refresh-token-rotation)
* [Rotate Refresh Tokens in SPAs Using auth0-sp-js SDK](/tokens/guides/rotate-refresh-tokens-sdk)
* [Token Storage](/tokens/concepts/token-storage)
* [OAuth 2.0 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-4.12)
