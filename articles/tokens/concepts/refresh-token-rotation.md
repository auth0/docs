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

## Maintaining user sessions in SPAs

Until very recently, SPAs overcame the challenge of maintaining the user’s session by using the Authorization Code Flow with PKCE in conjunction with [Silent Authentication](/api-auth/tutorials/silent-authentication). Recent developments in browser privacy technology, such as Intelligent Tracking Prevention (ITP) prevent access to the Auth0 session cookie, thereby requiring users to reauthenticate. 

Refresh Token Rotation offers a remediation to end-user sessions being lost due to side-effects of browser privacy mechanisms. Because Refresh Token Rotation does not rely on access to the Auth0 session cookie, it is not affected by ITP or similar mechanisms.

The following state diagram illustrates how Refresh Token Rotation is used in conjunction with the Authorization Code Flow with PKCE, but the general principle of getting a new refresh token with each exchange applies to all supported flows.

![Refresh Token Rotation State Diagram](/media/articles/tokens/rtr-state-diagram.png)

## SDK support

* For SPAs, use the [Auth0 SPA SDK](/libraries/auth0-spa-js) to request new access tokens and new refresh tokens. Auth0 recommends that you use the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce). With SPAs, you have the option to use either memory or local storage to store all tokens. The SDK defaults to memory for token storage. See [Token Storage](/tokens/concepts/token-storage) for details on which option will work for your app. 
* For iOS, make sure you update to the latest version (1.23.0 or later) of [Auth0.swift](/libraries/auth0-swift).
* For Android, make sure you update to the latest version (1.23.0 or later) of [Auth0.android](/libraries/auth0-android).

## Keep reading

* [Configure Refresh Token Rotation](/tokens/guides/configure-refresh-token-rotation)
* [Use Refresh Token Rotation](/tokens/guides/use-refresh-token-rotation)
* [Revoke Refresh Tokens](/tokens/guides/revoke-refresh-tokens)
* [Disable Refresh Token Rotation](/tokens/guides/disable-refresh-token-rotation)
* [Token Storage](/tokens/concepts/token-storage)
* [OAuth 2.0 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-4.12)
