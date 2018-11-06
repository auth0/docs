---
description: What is a Refresh Token and how you can use it.
toc: true
topics:
  - tokens
  - refresh-tokens
contentType:
  - concept
useCase:
  - invoke-api
---

# Refresh Token

In this article we will discuss what a Refresh Token is, how to get one, and how you can use it to refresh your tokens when they expire.

Note that this document applies to [applications that use Auth0's latest authentication pipeline](/api-auth/tutorials/adoption/oidc-conformant). If you don't know what that means, see [Introducing OIDC Conformant Authentication](/api-auth/intro).

To ensure that your application follows the latest pipeline, go to *[Dashboard](${manage_url}) > Applications > Settings > Show Advanced Settings > OAuth* and enable the **OIDC Conformant** toggle.

:::note
It will be easier for you to follow this article, if you are already familiar with [OpenID Connect](/protocols/oidc) and [OAuth 2.0](/protocols/oauth2).
:::

## What is a Refresh Token

A Refresh Token is a special kind of token that you can use to get a new [Access Token](/tokens/concepts/overview-access-tokens) or [ID Token](/tokens/id-token), when the ones you got expire. This allows you to have short-lived Access Tokens which is a security best practice. You ask for this token during a user’s initial authentication flow, alongside the Access and/or ID Tokens.

Refresh Tokens are subject to strict storage requirements to ensure that they are not leaked. However, if this happens, [Refresh Tokens can be revoked](#how-to-revoke-a-refresh-token).

## Why use Refresh Tokens

If an attacker steals an Access Token, then they can use it to access protected resources they are not allowed to. You can minimize this risk a) by being careful of how you handle and store Access Tokens, and b) by getting Access Tokens with a short expiration time. 

If your Access Token is short-lived you minimize the security risk but you have to ask for new Access Tokens every time they expire and involve the user in the process. This is not a good user experience, and you can work around it with Refresh Tokens. Every time your Access Token expires, you can get a new one without involving the user, using your Refresh Token.

If an attacker steals a Refresh Token, you have the option to [revoke it](#how-to-revoke-a-refresh-token).

## Restrictions of Refresh Tokens

You can only get a Refresh Token if you are implementing one of the following OAuth 2.0 grants:
- [Authorization Code Grant](/api-auth/grant/authorization-code) (used by web apps running on a server)
- [Authorization Code Grant (PKCE)](/api-auth/grant/authorization-code-pkce) (used by native apps), or 
- [Resource Owner Password Grant](/api-auth/grant/password) (used by trusted apps)

A Single Page Application (normally implementing the [Implicit Grant](/api-auth/grant/implicit)) should **not** under any circumstances get a Refresh Token. The reason for that is the sensitivity of this piece of information. You can think of it as user credentials, since a Refresh Token allows a user to remain authenticated essentially forever. Therefore you cannot have this information in a browser, it must be stored securely.

If you are implementing an SPA using [Implicit Grant](/api-auth/grant/implicit) and you need to renew a token, the only secure option is to use [Silent Authentication](/api-auth/tutorials/silent-authentication).

Another safeguard is that the API should allow offline access. This is configured via the **Allow Offline Access** switch on [Dashboard > API Settings](${manage_url}/#/apis). If the switch is disabled, Auth0 will not return a Refresh Token for this API, even if you ask for it.

## How to get a Refresh Token

Refresh Tokens can be issued by Auth0, every time a user logs in in your application. This includes:
- calls using the [Lock widget](/libraries/lock)
- calls using the [Auth0.js library](/libraries/auth0js)
- calls using the [Authentication API](/api/authentication)
- or any of the other Auth0 [Libraries](/libraries)

To ask Auth0 for one, include the `offline_access` [scope](/scopes) at your authentication request.

If you use a library, see [SDK Support](#sdk-support). 

If you call the Authentication API directly to authenticate users, see [How to get a Refresh Token using the Authentication API](/tokens/refresh-token/get-refresh-token-using-api).

### SDK Support

All our main SDKs for web apps (running on a server) and mobile apps support Refresh Tokens out of the box. For details on the technology to use, see our [Quickstarts page](/quickstarts). 

If your app is an Android or an iOS one, you might find the following helpful:
- [How to refresh tokens with the Lock Android library](/libraries/lock-android/refresh-jwt-tokens)
- [How to refresh tokens with the Auth0.swift library](/libraries/auth0-swift/save-and-refresh-jwt-tokens)

For web apps that execute on the browser, the way to refresh a token is using [Silent Authentication](/api-auth/tutorials/silent-authentication). [Auth0.js](/libraries/auth0js), our client-side library, provides methods for this out of the box:
- The `authorize` method, redirects the user to the `/authorize` endpoint, in order to login and provide consent.
- The `parseHash` method, parses a URL hash fragment to extract the result of an Auth0 authentication response.
- The `checkSession` method, attempts to get a new token from Auth0, using [silent authentication](/api-auth/tutorials/silent-authentication). For more details refer to [Using checkSession to Acquire New Tokens](/libraries/auth0js#using-checksession-to-acquire-new-tokens).

## How to use a Refresh Token

Once you have a Refresh Token, you can use it to ask for a new Access and/or ID Token, when the ones you have expire (and only then, we have rate limits in place).

For information on how to do that, see [How to use a Refresh Token using the Authentication API](/tokens/refresh-token/use-refresh-token-using-api).

## How to revoke a Refresh Token

Since Refresh Tokens never expire, it is important to be able to revoke them in case they get compromised.

Auth0 handles token revocation as though the token has been potentially exposed to malicious adversaries. Hence each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that **all Refresh Tokens that have been issued for the same user, application, and audience will be revoked**.

You can revoke a Refresh Token either by posting a request to [the Authentication API /oauth/revoke endpoint](/api/authentication#revoke-refresh-token) or using the [dashboard](${manage_url}).

For more information on how to do that, see [How to revoke a Refresh Token](/tokens/refresh-token/revoke-refresh-token).

## Rules and Refresh Tokens

[Rules](/rules) will run for the [Refresh Token Exchange](#use-a-refresh-token). To execute special logic, you can look at the `context.protocol` property in your rule. If the value is `oauth2-refresh-token`, then this is the indication that the rule is running during the [Refresh Token Exchange](#use-a-refresh-token).

::: warning
If you try to do a <a href="/rules/redirect">redirect</a> with <code>context.redirect</code>, the authentication flow will return an error.
:::

## Keep reading

::: next-steps
* [How to get a Refresh Token using the Authentication API](/tokens/refresh-token/get-refresh-token-using-api)
* [How to use a Refresh Token using the Authentication API](/tokens/refresh-token/use-refresh-token-using-api)
* [How to revoke a Refresh Token](/tokens/refresh-token/revoke-refresh-token)
:::
