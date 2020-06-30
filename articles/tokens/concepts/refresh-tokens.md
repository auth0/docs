---
description: Understand how refresh tokens work to allow the application to ask Auth0 to issue a new Access Token or ID Token without having to re-authenticate the user.
topics:
  - tokens
  - refresh-tokens
contentType: concept
useCase:
  - invoke-api
---
# Refresh Tokens

Auth0 issues an <dfn data-key="access-token">[Access Token](/tokens/concepts/access-tokens)</dfn> or an [ID Token](/tokens/concepts/id-tokens) in response to an [authentication request](/api-auth). You can use Access Tokens to make authenticated calls to a secured API, while the ID Token contains user profile attributes represented in the form of *claims*. Both are [JWTs](/tokens/concepts/jwts) and therefore have expiration dates indicated using the `exp` claim, as well as security measures, like signatures. Typically, a user needs a new Access Token when gaining access to a resource for the first time, or after the previous Access Token granted to them expires.

A Refresh Token is a special kind of token used to obtain a renewed Access Token. You can request new Access Tokens until the Refresh Token is blacklisted. Applications must [store Refresh Tokens securely](/tokens/concepts/token-storage) because they essentially allow a user to remain authenticated forever.

For native applications, refresh tokens improve the authentication experience significantly. The user has to authenticate only once, through the web authentication process. Subsequent re-authentication can take place without user interaction, using the Refresh Token.

You can increase security by using [Refresh Token rotation](/tokens/concepts/refresh-token-rotation) which issues a new Refresh Token and invalidates the predecessor token with each request made to Auth0 for a new Access Token. Rotating the Refresh Token reduces the risk of a compromised Refresh Token. 

::: panel OIDC-Conformant Apps
The Refresh Token behavior is applicable to [OIDC-conformant applications](/api-auth/tutorials/adoption/oidc-conformant). You can configure an application to be OIDC-conformant in one of the following two ways:

1. Enabling the **OIDC Conformant** flag for an app.
2. Passing an <dfn data-key="audience">`audience`</dfn> to the `/authorize` endpoint of the Authentication API.

For more information on our authentication pipeline, see [Introducing OIDC-Conformant Authentication](/api-auth/intro).
:::

## SDK support

### Web apps

Auth0 SDKs support Refresh Tokens including: 

- [Node.js](/quickstart/webapp/nodejs)
- [ASP.NET Core](/quickstart/webapp/aspnet-core)
- [PHP](/quickstart/webapp/php)
- [Java](/dev-centers/java)

For a complete listing, see [Quickstarts](/quickstart/webapp).

### Single-page apps

Providing secure authentication in SPAs has a number of challenges based on your application’s use case. New browser privacy controls like Intelligent Tracking Prevention (ITP) adversely impact the user experience in SPAs by preventing access to third-party cookies.

Auth0 recommends using [Refresh Token Rotation](/tokens/concepts/refresh-token-rotation) which provides a secure method for using Refresh Tokens in SPAs while providing end-users with seamless access to resources without the disruption in UX caused by browser privacy technology like ITP.

Auth0’s former guidance was to use the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce) in conjuntion with [Silent Authentication](/api-auth/tutorials/silent-authentication) in SPAs. This is more secure solution than the Implicit Flow but not as secure as the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce) with Refresh Token Rotation. If you want a more detailed explanation about the challenges of using the Implicit Flow in SPAs, please read this blog article [OAuth2 Implicit Grant and SPA](https://auth0.com/blog/oauth2-implicit-grant-and-spa/).

### Native/Mobile apps

For information on using Refresh Tokens with our mobile SDKs, see:

* [Mobile / Native Quickstarts](/quickstart/native)
* [Lock Android: Refreshing JWT Tokens](/libraries/lock-android/refresh-jwt-tokens)
* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/v2)

## Restrictions and limitations

* You can only get a Refresh Token if you are implementing the following flows:
  - [Authorization Code Flow](/flows/concepts/auth-code)
  - [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
  - [Resource Owner Password Grant](/api-auth/grant/password)
  - [Device Authorization Flow](/flows/concepts/device-auth)

* If you limit offline access to your API, a safeguard configured via the **Allow Offline Access** switch on the [API Settings](${manage_url}/#/apis), Auth0 will not return a Refresh Token for the API (even if you include the `offline_access` <dfn data-key="scope">scope</dfn> in your request).

* Rules will run for the [Refresh Token Exchange](/tokens/guides/use-refresh-tokens). To execute special logic, you can look at the `context.protocol` property in your rule. If the value is `oauth2-refresh-token`, then the rule is running during the exchange.

  ::: warning
  If you try to do a <a href="/rules/redirect">redirect</a> with <code>context.redirect</code>, the authentication flow will return an error.
  :::

* If you have added custom claims to your tokens using a rule, the custom claims will appear in new tokens issued when using a Refresh Token for as long as your rule is in place. Although new tokens do not automatically inherit custom claims, rules run during the Refresh Token flow, so the same code will be executed. This allows you to add or change custom claims in newly-issued tokens without forcing previously-authorized applications to obtain a new Refresh Token.

## Keep reading

* [Get Refresh Tokens](/tokens/guides/get-refresh-tokens)
* [Use Refresh Tokens](/tokens/guides/use-refresh-tokens)
* [Revoke Refresh Tokens](/tokens/guides/revoke-refresh-tokens)
* [Refresh Token Rotation](/tokens/concepts/refresh-token-rotation)
* [Token Storage](/tokens/concepts/token-storage)
