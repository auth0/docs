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

 This document explains how to securely store tokens used in token-based authentication. The following assumes a basic knowledge of JSON Web Tokens (JWTs). To learn more about JWTs see:

 * [Auth0 Tokens](/tokens)
 * [JSON Web Tokens (JWT) in Auth0](/jwt)

## Where to Store Your JWTs

::: warning
You __must__ [verify a JWT's signature](/tokens/id-token#verify-the-signature) before storing and using it.
:::

With token-based authentication, you are given the choice of where to store the JWT. We strongly recommend that you store your tokens in local storage/session storage or a cookie.

### Web Storage (local storage/session storage)

Commonly, the JWT is placed in the browsers local storage and this works well for most use cases.

When logging in a user with a username and password, the response body contains the Access Token JWT. Then you need to handle this response in the client side code. This token can then be stored in localStorage or sessionStorage.

[Click here for an example using sessionStorage](https://github.com/auth0-blog/angular-token-auth/blob/master/auth.client.js#L31)

Both `localStorage` and `sessionStorage` both extend `Storage`. The only difference between them is the persistance of the data:

`localStorage` - data persists until explicitly deleted. Changes made are saved and available for all current and future visits to the site.

`sessionStorage` - Changes made are saved and available for the current page, as well as future visits to the site on the same window. Once the window is closed, the storage is deleted.

#### Web Storage Disadvantages

* Unlike cookies, local storage is sandboxed to a specific domain and its data cannot be accessed by any other domain including sub-domains.
* Web Storage is accessible through JavaScript on the same domain so any JavaScript running on your site will have access to web storage, and because of this can be vulnerable to cross-site scripting (XSS) attacks.
* The developer must ensure that the JWT is always sent over HTTPS and never HTTP.

### Using Cookies

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

## How to implement

Many of our Quickstarts demonstrate how to store tokens, and the exact implementation will be different based on the technology being used. Please refer to the Quickstarts at the top of our [Documentation Home Page](/), select the appropriate Quickstart based on your application type, and follow the code samples provided.

## Keep reading

::: next-steps
* [Understanding Sessions & Cookies Video](/videos/session-and-cookies)
* [Auth0 Blog: 10 Things You Should Know about Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Auth0 Blog: Cookies vs Tokens: The Definitive Guide](https://auth0.com/blog/cookies-vs-tokens-definitive-guide/)
:::
