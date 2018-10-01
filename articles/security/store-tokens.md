---
description: Explains how to securely store tokens used in token-based authentication.
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

This document explains how to securely store [tokens](/tokens) used in token-based authentication.

## Do not store tokens in the browser

You should not store tokens in the browser's local storage or session storage. Data stored in the browser is vulnerable to [cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) and malicious parties can potentially steal or alter that data.

## Store tokens when a backend is present

If your application has a backend server at all, then you should use the [Authorization Code flow](/application-auth/current/server-side-web) for authentication. Native applications should use the [Authorization Code flow with Proof Key for Code Exchange](/application-auth/current/mobile-desktop).

## Store tokens without a backend

If you have a single page application (SPA) with no corresponding backend server, your SPA should request new tokens on page load and store them in memory without any persistence. To make API calls, your SPA would then use the in-memory copy of the token.

## Using Cookies

You can also use cookies to store the JWT. The exact way to set a cookie depends on the client side language you are using.

There are different options to control the lifetime of a cookie:

* Cookies can be destroyed after the browser is closed (session cookies).
* Implement a server side check (typically done for you by the web framework in use), and you could implement expiration or sliding window expiration.
* Cookies can be persistent (not destroyed after the browser is closed) with an expiration.
* Cookies can be read by both the JavaScript and the server side code or only server side if the `httpOnly` flag is set.

## Understanding Sessions and Cookies

:::warning
Please be sure to refer to the [Lock API documentation](/libraries/lock/v10/api) for the most up-to-date code snippets.
:::

<%= include('../_includes/_video', { id: 'paxlbixuya' }) %>

This video will show you how to handle session data when building a web app. It will help you understand how your application uses cookies and sessions to manage the state of an authenticated user. This video example uses Node.js with Passport, but the techniques apply to any traditional server-based web application.

#### Cookie Disadvantages

*  The max size of a cookie is only 4kb so that may be problematic if you have many claims attached to the token.
* Cookies can be vulnerable to cross-site request forgery (CSRF or XSRF) attacks. This type of attack occurs when a malicious web site causes a user’s web browser to perform an unwanted action on a trusted site where the user is currently authenticated. This is an exploit of how the browser handles cookies. Using a web app framework’s CSRF protection makes cookies a secure option for storing a JWT. CSRF can also be partially prevented by checking the HTTP `Referer` and `Origin` header.
*  Can be difficult to implement if the application requires cross-domain access. Cookies have additional properties (Domain/Path) that can be modified to allow you to specify where the cookie is allowed to be sent.

## Keep reading

::: next-steps
* [Understanding Sessions & Cookies Video](/videos/session-and-cookies)
* [Auth0 Blog: 10 Things You Should Know about Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Auth0 Blog: Cookies vs Tokens: The Definitive Guide](https://auth0.com/blog/cookies-vs-tokens-definitive-guide/)
:::
