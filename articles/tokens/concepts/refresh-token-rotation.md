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

Typically, ID and Access Tokens are obtained from the authorization server and cached in memory. Token renewal (due to evicted memory or expiration) is handled by the SDK, relieving the developer of this burden. Silent re-authentication is technically achieved by sending a `prompt=none` parameter on the authentication request and using a hidden iframe, provided that there is still an active user session on the authorization server. This method, however, is impacted by [Intelligent Tracking Prevention (ITP)](https://webkit.org/blog/7675/intelligent-tracking-prevention/). 

Starting with ITP2, this became a problem with sessions being prematurely terminated in Safari. This is especially a concern if you want to offer long-lived sessions. To address this issue, you can use Refresh Token rotation to leverage the use of Refresh Tokens in the browser that adhere to the OAuth 2.0 BCP. 

## SDK support

For single page apps, you can use the `auth0-spa-js` SDK to perform silent re-authentication.

* For refresh token support, the Auth0 tenant must have the Refresh Token Rotation feature [enabled](/tokens/guides/enable-refresh-token-rotation), and configured on a client using the Management API or Dashboard.

* Developers have the option to use either memory or local storage to store all tokens (ID, access, refresh tokens). The SDK defaults to memory, as the more security-conscious option.

* Developers now also have a config option to use Refresh Tokens to retrieve new access tokens. With this option enabled, SPA JS will now request the offline_access scope automatically, and call the token endpoint directly with a refresh token (if available). The default  iframe method with prompt=none will not be used if Refresh Tokens are enabled.

## Keep reading

* [Enable Refresh Token Rotation](/tokens/guides/enable-refresh-token-rotation)
* [Disable Refresh Token Rotation](/tokens/guides/disable-refresh-token-rotation)
* [Rotate Refresh Tokens in SPAs Using auth0-sp-js SDK](/tokens/guides/rotate-refresh-tokens-sdk)
* [Token Storage](/tokens/concepts/token-storage)
* [OAuth 2.0 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-4.12)
