---
description: What is a Refresh Token and how you can use it.
toc: true
topics:
  - tokens
  - refresh-tokens
contentType:
  - how-to
  - concept
  - index
useCase:
  - invoke-api
---
# Refresh Tokens

Refresh Tokens contain the information required to obtain a new <dfn data-key="access-token">Access Token</dfn> or [ID Token](/tokens/concepts/id-tokens).

Typically, a user needs a new Access Token when gaining access to a resource for the first time, or after the previous Access Token granted to them expires.

Refresh Tokens:

* Are subject to strict storage requirements to ensure that they are not leaked
* [Can be revoked](#revoke-a-refresh-token) by the Authorization Server

::: panel-warning OIDC-conformant applications
The behavior in this document is applicable to [OIDC-conformant applications](/api-auth/tutorials/adoption/oidc-conformant). You can configure an application to be OIDC-conformant in one of the following two ways:

1. Enabling the **OIDC Conformant** flag for an Application
2. Passing an <dfn data-key="audience">`audience`</dfn> to the `/authorize` endpoint of the Authentication API 

For more information on our authentication pipeline, see [Introducing OIDC-Conformant Authentication](/api-auth/intro).
:::

## Overview

Auth0 can issue an Access Token and/or an ID Token in response to an [authentication request](/api-auth). You can use Access Tokens to make authenticated calls to a secured API, while the ID Token contains user profile attributes represented in the form of *claims*. Both are [JWTs](/jwt) and therefore have expiration dates indicated using the `exp` claim, as well as security measures, like signatures.

A Refresh Token allows the application to ask Auth0 to issue a new Access Token or ID Token without having to re-authenticate the user. This will work as long as the Refresh Token has not been revoked.

## Restrictions on Refresh Token Usage

You can only get a Refresh Token if you are implementing the [Authorization Code Flow](/flows/concepts/auth-code), [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce), [Resource Owner Password Grant](/api-auth/grant/password), or [Device Authorization Flow](/flows/concepts/device-auth).

A Single-Page Application (normally implementing [Implicit Flow](/flows/concepts/implicit)) should not ever receive a Refresh Token. A Refresh Token is essentially a user credential that allows a user to remain authenticated indefinitely. This sensitive information should be stored securely and *not* exposed client-side in a browser.

If you are implementing an SPA using [Implicit Flow](/flows/concepts/implicit) and you need to renew a token, the only secure option for doing so is to use [Silent Authentication](/api-auth/tutorials/silent-authentication).

If you limit offline access to your API, a safeguard configured via the **Allow Offline Access** switch on the [API Settings](${manage_url}/#/apis), Auth0 will not return a Refresh Token for the API (even if you include the `offline_access` <dfn data-key="scope">scope</dfn> in your request).

## Rules

Rules will run for the [Refresh Token Exchange](#use-a-refresh-token). To execute special logic, you can look at the `context.protocol` property in your rule. If the value is `oauth2-refresh-token`, then this is the indication that the rule is running during the [Refresh Token Exchange](#use-a-refresh-token).

::: warning
If you try to do a <a href="/rules/redirect">redirect</a> with <code>context.redirect</code>, the authentication flow will return an error.
:::

## Custom Claims

If you have added custom claims to your tokens using a rule, the custom claims will appear in new tokens issued when using a Refresh Token for as long as your rule is in place. Although new tokens do not automatically inherit custom claims, rules run during the Refresh Token flow, so the same code will be executed. This allows you to add or change custom claims in newly-issued tokens without forcing previously-authorized applications to obtain a new Refresh Token.

## SDK Support

### Web Apps

All our main SDKs support Refresh Tokens out of the box. Some are [Node.js](/quickstart/webapp/nodejs), [ASP.NET Core](/quickstart/webapp/aspnet-core), [PHP](/quickstart/webapp/php), [Java](/dev-centers/java), and many more. For a complete listing, see [Quickstarts](/quickstart/webapp).

### Single-Page Apps

[Silent Authentication](/api-auth/tutorials/silent-authentication) is the method that is used to refresh a token for web apps that execute in a browser. [Auth0.js](/libraries/auth0js), our client-side library, provides methods for this functionality:

- The `authorize` method, redirects the user to the `/authorize` endpoint, to log in and provide consent.
- The `parseHash` method, parses a URL hash fragment to extract the result of an Auth0 authentication response.
- The `checkSession` method, attempts to get a new token from Auth0, using [silent authentication](/api-auth/tutorials/silent-authentication). For more details refer to [Using checkSession to Acquire New Tokens](/libraries/auth0js#using-checksession-to-acquire-new-tokens). An example is as follows:

```js
auth0.checkSession({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order'
  }, function (err, authResult) {
    // Renewed tokens or error
});
```

### Mobile / Native Apps

For information on using Refresh Tokens with our mobile SDKs, see:

* [Mobile / Native Quickstarts](/quickstart/native)

* [Lock Android: Refreshing JWT Tokens](/libraries/lock-android/refresh-jwt-tokens)

* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/v2)

## Keep reading

* [Get Refresh Tokens](/tokens/guides/refresh-token/get-refresh-tokens)
* [Use Refresh Tokens](/tokens/guides/refresh-token/use-refresh-tokens)
* [Revoke Refresh Tokens](/tokens/guides/refresh-token/revoke-refresh-tokens)
* [Refresh Tokens: When to use them and how they interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
