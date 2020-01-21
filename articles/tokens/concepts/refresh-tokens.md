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

A Refresh Token is a special kind of token that can be used to obtain a renewed access token. You are able to request new access tokens until the Refresh Token is blacklisted. It’s important that refresh tokens are [stored securely](/tokens/guides/store-tokens) by the application because they essentially allow a user to remain authenticated forever.

For native applications, refresh tokens improve the authentication experience significantly. The user has to authenticate only once, through the web authentication process. Subsequent re-authentication can take place without user interaction, using the Refresh Token.

Refresh Tokens [can be revoked](/tokens/guides/revoke-refresh-tokens) by the Authorization Server.

::: panel OIDC-Conformant Apps
The Refresh Token behavior is applicable to [OIDC-conformant applications](/api-auth/tutorials/adoption/oidc-conformant). You can configure an application to be OIDC-conformant in one of the following two ways:

1. Enabling the **OIDC Conformant** flag for an app.
2. Passing an <dfn data-key="audience">`audience`</dfn> to the `/authorize` endpoint of the Authentication API.

For more information on our authentication pipeline, see [Introducing OIDC-Conformant Authentication](/api-auth/intro).
:::

## Restrictions and limitations

* You can only get a Refresh Token if you are implementing the [Authorization Code Flow](/flows/concepts/auth-code), [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce), [Resource Owner Password Grant](/api-auth/grant/password), or [Device Authorization Flow](/flows/concepts/device-auth).

* A Single-Page Application (normally implementing [Implicit Flow](/flows/concepts/implicit)) should not ever receive a Refresh Token. A Refresh Token is essentially a user credential that allows a user to remain authenticated indefinitely. This sensitive information should be stored securely and *not* exposed client-side in a browser.

* If you are implementing an SPA using [Implicit Flow](/flows/concepts/implicit) and you need to renew a token, the only secure option for doing so is to use [Silent Authentication](/api-auth/tutorials/silent-authentication).

* If you limit offline access to your API, a safeguard configured via the **Allow Offline Access** switch on the [API Settings](${manage_url}/#/apis), Auth0 will not return a Refresh Token for the API (even if you include the `offline_access` <dfn data-key="scope">scope</dfn> in your request).

### Rules

Rules will run for the [Refresh Token Exchange](/tokens/guides/use-refresh-tokens). To execute special logic, you can look at the `context.protocol` property in your rule. If the value is `oauth2-refresh-token`, then the rule is running during the exchange.

::: warning
If you try to do a <a href="/rules/redirect">redirect</a> with <code>context.redirect</code>, the authentication flow will return an error.
:::

### Custom claims

If you have added custom claims to your tokens using a rule, the custom claims will appear in new tokens issued when using a Refresh Token for as long as your rule is in place. Although new tokens do not automatically inherit custom claims, rules run during the Refresh Token flow, so the same code will be executed. This allows you to add or change custom claims in newly-issued tokens without forcing previously-authorized applications to obtain a new Refresh Token.

## SDK support

### Web apps

All our main SDKs support Refresh Tokens out of the box. Some are [Node.js](/quickstart/webapp/nodejs), [ASP.NET Core](/quickstart/webapp/aspnet-core), [PHP](/quickstart/webapp/php), [Java](/dev-centers/java), and many more. For a complete listing, see [Quickstarts](/quickstart/webapp).

### Single-page apps

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

### Native/Mobile apps

For information on using Refresh Tokens with our mobile SDKs, see:

* [Mobile / Native Quickstarts](/quickstart/native)
* [Lock Android: Refreshing JWT Tokens](/libraries/lock-android/refresh-jwt-tokens)
* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/v2)

## Keep reading

* [Get Refresh Tokens](/tokens/guides/get-refresh-tokens)
* [Use Refresh Tokens](/tokens/guides/use-refresh-tokens)
* [Revoke Refresh Tokens](/tokens/guides/revoke-refresh-tokens)
