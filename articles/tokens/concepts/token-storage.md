---
description: Understand store tokens in browsers used in token-based authentication.
topics:
  - security
  - tokens
  - token storage
contentType:
  - concept
useCase:
  - store-tokens
---

# Token Storage

Securing single page apps (SPAs) that make API calls come with their own set of concerns. You'll need to ensure that tokens and other sensitive data are not vulnerable to [cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) and can't be read by malicious JavaScript.

We recommend using the [Auth0 Single Page App SDK](/libraries/auth0-spa-js). The Auth0 SPA SDK handles token storage, session management, and other details for you.

## Session token storage

Session storage (or browser local storage) is [not a secure place to store sensitive information](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/HTML5_Security_Cheat_Sheet.md#local-storage). Any data stored there:

* Can be accessed through JavaScript
* May be vulnerable to [cross-site scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS))

If an attacker steals a token, they can gain access and make requests to your API. Treat tokens like credit card numbers or passwords. Avoid storing them in local storage.

## Cookies

Under certain circumstances, you can use cookies to authenticate SPAs:

* if your SPA is served to the client using your own backend
* if your SPA has the same domain as your backend
* if your SPA makes API calls that require authentication to your backend

For an overview of this approach and an example implementation, see [Single-Page App Authentication Using Cookies](/login/spa/authenticate-with-cookies).

If your SPA has a backend server, handle tokens server-side using the [Authorization Code Flow](/flows/concepts/auth-code), [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce), or [Hybrid Flow](/api-auth/grant/hybrid).

If you have a SPA with **no** corresponding backend server, your SPA should request new tokens on login and store them in memory without any persistence. To make API calls, your SPA would then use the in-memory copy of the token.

## Token storage scenarios

### Next.js static site example

When you're building a Next.js application, authentication might be needed in the following cases:

1. When accessing a page: "My Invoices"
2. When accessing an API route: /api/my/invoices
3. When your application calls an API hosted outside of your Next.js application on behalf of the user: from `www.mycompany.com` to `billing.mycompany.com/api`.

Now that we understand where and when our application might require authentication, let's explore the authentication strategies that can be implemented for different Next.js deployment models.

Where a server is available, it can handle the interaction with Auth0 and create a session, but in this model, we don't have a backend. All of the work happens on the frontend:

1. The user is redirected to Auth0.
2. When the user is successfully signed in, they will be redirected back to the application.
3. The client-side will complete the code exchange with Auth0 and retrieve the user's `id_token` and `access_token` which will be stored in memory.

![In-Memory Token Storage](/media/articles/tokens/in-memory-token-storage.png)

### 

## Keep reading

* [ID Tokens](/tokens/concepts/id-tokens)
* [Access Tokens](/tokens/concepts/access-tokens)
* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Token Best Practices](/best-practices/token-best-practices)
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
* [The Ultimate Guide to Next.js Authentication with Auth0](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/?utm_source=twitter&utm_medium=sc&utm_campaign=nextjs_authn_guide)