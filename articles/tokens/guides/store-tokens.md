---
description: Learn how to store tokens used in token-based authentication.
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

# Store Tokens

How and where to securely store [tokens](/tokens) used in token-based authentication depends on the type of app you are using.

## Regular web apps

ID Tokens, <dfn data-key="access-token">Access Tokens</dfn>, and (optional) <dfn data-key="refresh-token">Refresh Tokens</dfn> should be handled server-side in typical web applications. The application server use the tokens to call APIs on behalf of the user.

* [Authorization Code Flow](/flows/concepts/auth-code)
* [Regular Web App Quickstarts](/quickstart/webapp)

## Native/mobile apps

* [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
* [Native/Mobile App Quickstarts](/quickstart/native)
* [Auth0.Android Saving and Renewing Tokens](/libraries/auth0-android/save-and-refresh-tokens)
* [Auth0.swift Saving and Renewing Tokens](/libraries/auth0-swift/save-and-refresh-jwt-tokens)

## Single-page apps

Securing single page apps (SPAs) comes with its own set of concerns. You'll need to ensure that tokens and other sensitive data are not vulnerable to [cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) and can't be read by malicious JavaScript.

We recommend using the [Auth0 Single Page App SDK](/libraries/auth0-spa-js). The Auth0 SPA SDK handles token storage, session management, and other details for you.

### Don't store tokens in local storage

Browser local storage (or session storage) is [not a secure place to store sensitive information](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/HTML5_Security_Cheat_Sheet.md#local-storage). Any data stored there:

* Can be accessed through JavaScript.
* May be vulnerable to [cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).

If an attacker steals a token, they can gain access to and make requests to your API. Treat tokens like credit card numbers or passwords: don’t store them in local storage.

### Using cookies

Under certain circumstances, you can use cookies to authenticate a single-page application:

* if your SPA is served to the client using your own backend
* if your SPA has the same domain as your backend
* if your SPA makes API calls that require authentication to your backend

For an overview of this approach and an example implementation, see [Single-Page App Authentication Using Cookies](/login/spa/authenticate-with-cookies).

### If a backend is present

If your single-page app has a backend server at all, then tokens should be handled server-side using the [Authorization Code Flow](/flows/concepts/auth-code), [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce), or [Hybrid Flow](/api-auth/grant/hybrid).

### If no backend is present

If you have a single-page app (SPA) with no corresponding backend server, your SPA should request new tokens on login and store them in memory without any persistence. To make API calls, your SPA would then use the in-memory copy of the token.

## Keep reading

* [ID Tokens](/tokens/concepts/id-tokens)
* [Access Tokens](/tokens/concepts/access-tokens)
* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Token Best Practices](/best-practices/token-best-practices)
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)