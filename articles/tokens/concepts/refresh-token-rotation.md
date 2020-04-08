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

Refresh Token rotation has an advantage with browser intelligent tracking prevention (ITP) mechanisms where cookies could be lost. Because of that, the Auth0 session is lost and the user has to re-authenticate, where with a rotating Refresh Token there is no link with the Auth0 session, and therefore isn't affected by ITP mechanisms.

## SDK support

For SPAs, use the [Auth0 SPA SDK](/libraries/auth0-spa-js) to perform silent re-authentication. Auth0 recommends that you use the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce).

With SPAs, you have the option to use either memory or local storage to store all tokens. The SDK defaults to memory for token storage. See [Token Storage](/tokens/concepts/token-storage) for details on which option will work for your app. 

For iOS, Android, Windows and any other type of app, there are no changes. 

## Keep reading

* [Configure Refresh Token Rotation](/tokens/guides/configure-refresh-token-rotation)
* [Use Refresh Token Rotation](/tokens/guides/use-refresh-token-rotation)
* [Revoke Refresh Tokens](/tokens/guides/revoke-refresh-tokens)
* [Disable Refresh Token Rotation](/tokens/guides/disable-refresh-token-rotation)
* [Token Storage](/tokens/concepts/token-storage)
* [OAuth 2.0 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-4.12)
