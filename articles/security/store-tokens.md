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

## Don't store tokens in local storage

Browser local storage (or session storage) is [not a secure place to store sensitive information](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/HTML5_Security_Cheat_Sheet.md#local-storage). Any data stored there:

* Can be accessed through JavaScript.
* May be vulnerable to [cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).

If an attacker steals a token, they can gain access to and make requests to your API. Treat tokens like credit card numbers or passwords: don’t store them in local storage.

## If a backend is present

If your application has a backend server at all, then tokens should be handled server-side using the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow), [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow), or [Hybrid Flow](/api-auth/grant/hybrid).

## Single-page applications

If you have a single-page application (SPA) with no corresponding backend server, your SPA should request new tokens on login and store them in memory without any persistence. To make API calls, your SPA would then use the in-memory copy of the token.

For an example of how to handle sessions in SPAs, check out the [Handle Authentication Tokens](/quickstart/spa/vanillajs#handle-authentication-tokens) section of the [JavaScript Single-Page App Quickstart](/quickstart/spa/vanillajs).
