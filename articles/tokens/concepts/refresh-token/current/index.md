---
description: Learn about refresh tokens and their role in the authorization process allowing an app to obtain a new access token without prompting the user. 
toc: true
topics:
  - tokens
  - refresh-tokens
contentType: concept
useCase:
  - invoke-api
---
# Refresh Tokens

Modern secure applications often use <dfn data-key="access-token">Access Token</dfn> to ensure a user has access to the appropriate resources, and these access tokens typically have a limited lifetime. Limiting the lifetime of the Access Token reduces the amount of time an attacker can use a stolen token. In addition, the information contained in or referenced by the access token could become stale.
 
When Access Tokens expire or become invalid but the application still needs to access a protected resource, the application faces the problem of getting a new Access Token without forcing the user to once again grant permission. To solve this problem, OAuth 2.0 introduced an artifact called a *Refresh Token*. A refresh token allows an application to obtain a new Access Token without prompting the user.

Refresh Tokens contain the information required to obtain a new [Access Token](/tokens/concepts/access-tokens) or [ID Token](/tokens/concepts/id-tokens).

## Get Refresh Tokens

A refresh token can be requested by an application as part of the process of obtaining an access token. Most authorization servers implement the [refresh token request mechanism](https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess) defined in the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html). In this case, an application must include the `offline_access` scope when initiating a request for an authorization code. After the user successfully authenticates and grants consent for the application to access the protected resource, the application will receive an authorization code that can be exchanged at the token endpoint for both an access and a refresh token.

## Use Refresh Tokens

When a new access token is needed, the application can make a `POST` request back to the token endpoint using a grant type of `refresh_token`. Web applications will need to include a client secret. To use a refresh token to obtain a new ID token, the authorization server would need to support OpenID Connect and the [scope](/scopes/current) of the original request would need to include `openid`.

While refresh tokens are often long-lived, the authorization server can invalidate them. Some of the reasons a refresh token may no longer be valid include:

* the authorization server has revoked the refresh token
* the user has revoked their consent for authorization
* the refresh token has expired
* the authentication policy for the resource has changed (e.g., originally the resource only used usernames and passwords, but now it requires [MFA](/multifactor-authentication))

Because refresh tokens have the potential for a long lifetime, developers should ensure that strict storage requirements are in place to keep them from being leaked. For example, on web applications, refresh tokens should only leave the backend when being sent to the authorization server, and the backend should be secure. The client secret should be protected in a similar fashion. Mobile applications do not require a client secret, but they should still be sure to store refresh tokens somewhere only the client application can access.

## Refresh Tokens at Auth0

With Auth0, you can get a refresh token when using the Authorization Code Flow (for [regular web](/flows/concepts/regular-web-app-login-flow) or [native/mobile apps](/flows/concepts/mobile-login-flow)), the Device Flow, or the [Resource Owner Password Grant](/api-auth/grant/password). All of Auth0’s main SDKs support acquiring, using, and revoking refresh tokens out of the box, without you having to worry about formatting messages. Languages with SDK support include Node.js, .NET, PHP, and many more!

::: panel-warning OIDC-conformant applications
The behavior descrobed here is applicable to [OIDC-conformant applications](/api-auth/tutorials/adoption/oidc-conformant). You can configure an application to be OIDC-conformant in one of the following two ways:

1. Enabling the **OIDC Conformant** flag for an Application
2. Passing an <dfn data-key="audience">`audience`</dfn> to the `/authorize` endpoint of the Authentication API 

For more information on our authentication pipeline, see [Introducing OIDC-Conformant Authentication](/api-auth/intro).
:::

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
