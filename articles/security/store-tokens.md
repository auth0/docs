---
description: Explains how to securely store tokens used in token-based authentication. 
---

# Where to Store Tokens

 This document explains how to securely store tokens used in token-based authentication. The following assumes a basic knowledge of JSON Web Tokens (JWTs). To learn more about JWTs see:

 * [Auth0 Tokens](/tokens)
 * [JSON Web Tokens (JWT) in Auth0](/jwt)

## Where to Store Your JWTs

With token-based auth, you are given the choice of where to store the JWT. We strongly recommend that you store your tokens in local storage/session storage or a cookie. 

### Web Storage (local storage/session storage)

Commonly, the JWT is placed in the browsers local storage and this works well for most use cases. There are some issues with storing JWTs in local storage to be aware of. Unlike cookies, local storage is sandboxed to a specific domain and its data cannot be accessed by any other domain including sub-domains.

When logging in a user with a username and password, the response body contains the `access_token` JWT. Then you need to handle this response in the client side code. This token can then be stored in localStorage or sessionStorage.

[Click here for an example using sessionStorage](https://github.com/auth0-blog/angular-token-auth/blob/master/auth.client.js#L31)

Both `localStorage` and `sessionStorage` both extend `Storage`. The only difference between them is the persistance of the data:

`localStorage` - data persists until explicitly deleted. Changes made are saved and available for all current and future visits to the site.

`sessionStorage` - Changes made are saved and available for the current page, as well as future visits to the site on the same window. Once the window is closed, the storage is deleted.

### Using Cookies

You can also use cookies to store the JWT. But the max size of a cookie is only 4kb so that may be problematic if you have many claims attached to the token. The exact way to set a cookie depends on the client side language you are using.

There are different options to control the lifetime of a cookie:

* Cookies can be destroyed after the browser is closed (session cookies).
* Implement a server side check (typically done for you by the web framework in use), and you could implement expiration or sliding window expiration.
* Cookies can be persistent (not destroyed after the browser is closed) with an expiration.
* Cookies can be read by both the JavaScript and the server side code or only server side if the `httpOnly` flag is set.

**Additional Resources:**

* [Understanding Sessions & Cookies Video](/videos/session-and-cookies)
* [Auth0 Blog: 10 Things You Should Know about Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Auth0 Blog: Cookies vs Tokens: The Definitive Guide](https://auth0.com/blog/cookies-vs-tokens-definitive-guide/)

* From Stormpath: [Where to Store your JWTs – Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
