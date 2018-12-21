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

Browser local storage (or session storage) is not secure. Any data stored there may be vulnerable to [cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)). If an attacker steals a token, they can gain access to and make requests to your API. Treat tokens like credit card numbers or passwords: don’t store them in local storage.

## If a backend is present

If your application has a backend server at all, then tokens should be handled server-side using the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow), [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow), or [Hybrid Flow](/api-auth/grant/hybrid).

## Single-page applications

If you have a single-page application (SPA) with no corresponding backend server, your SPA should request new tokens on page load and store them in memory without any persistence. To make API calls, your SPA would then use the in-memory copy of the token.

## Using cookies

You can also use cookies to store the JWT. The exact way to set a cookie depends on the client side language you are using.

There are different options to control the lifetime of a cookie:

* Cookies can be destroyed after the browser is closed (session cookies).
* Implement a server side check (typically done for you by the web framework in use), and you could implement expiration or sliding window expiration.
* Cookies can be persistent (not destroyed after the browser is closed) with an expiration.
* Cookies can be read by both the JavaScript and the server side code or only server side if the `httpOnly` flag is set.
* You can set the `secure=true` flag so cookies can only be set over an encrypted connection.

### Understanding sessions and cookies

<%= include('../_includes/_video', { id: 'paxlbixuya' }) %>

This video will show you how to handle session data when building a web app. It will help you understand how your application uses cookies and sessions to manage the state of an authenticated user. This video example uses Node.js with Passport, but the techniques apply to any traditional server-based web application.

### Disadvantages of cookies

*  The max size of a cookie is only 4kb so that may be problematic if you have many claims attached to the token.
* Cookies can be vulnerable to cross-site request forgery (CSRF or XSRF) attacks. Using a web app framework’s CSRF protection makes cookies a secure option for storing a JWT. CSRF can also be partially prevented by checking the HTTP `Referer` and `Origin` header. You can also set the `SameSite=strict` cookie flag to prevent CSRF attacks.
*  Can be difficult to implement if the application requires cross-domain access. Cookies have additional properties (Domain/Path) that can be modified to allow you to specify where the cookie is allowed to be sent.

## Keep reading

::: next-steps
* [Understanding Sessions & Cookies Video](/videos/session-and-cookies)
* [Auth0 Blog: 10 Things You Should Know about Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Auth0 Blog: Cookies vs Tokens: The Definitive Guide](https://auth0.com/blog/cookies-vs-tokens-definitive-guide/)
:::
