---
description: In this guide we outline how to store tokens used in token-based authentication.
toc: true
topics:
  - security
  - security-bulletins
  - tokens
  - token storage
contentType:
  - reference
useCase:
  - development
---

# Where to Store Tokens

Not sure where to store [tokens](/tokens)? This guide outlines how to securely store tokens used in token-based authentication.

## Regular web apps

ID Tokens, <dfn data-key="access-token">Access Tokens</dfn>, and (optional) <dfn data-key="refresh-token">Refresh Tokens</dfn> should be handled server-side in typical web applications. The application server use the tokens to call APIs on behalf of the user.

* [Authorization Code Flow](/flows/concepts/auth-code)
* [Regular Web App Quickstarts](/quickstart/webapp)

## Native/mobile apps

* [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
* [Native/Mobile App Quickstarts](/quickstart/native)
* [Auth0.Android Saving and Renewing Tokens](/libraries/auth0-android/save-and-refresh-tokens)
* [Auth0.swift Saving and Renewing Tokens](/libraries/auth0-swift/save-and-refresh-jwt-tokens)

## Single page apps

For single page apps (SPA), we recommend using the [Auth0 Single Page App SDK](/libraries/auth0-spa-js). The Auth0 SPA SDK handles token storage, session management, and other details for you.

### Don't store tokens in local storage

Browser local storage (or session storage) is [not a secure place to store sensitive information](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/HTML5_Security_Cheat_Sheet.md#local-storage). Any data stored there:

* Can be accessed through JavaScript.
* May be vulnerable to [cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).

If an attacker steals a token, they can gain access to and make requests to your API. Treat tokens like credit card numbers or passwords: don’t store them in local storage.

### If a backend is present

If your single-page app has a backend server at all, then tokens should be handled server-side using the [Authorization Code Flow](/flows/concepts/auth-code), [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce), or [Hybrid Flow](/api-auth/grant/hybrid).

### If no backend is present

If you have a single-page app (SPA) with no corresponding backend server, your SPA should request new tokens on login and store them in memory without any persistence. To make API calls, your SPA would then use the in-memory copy of the token.
