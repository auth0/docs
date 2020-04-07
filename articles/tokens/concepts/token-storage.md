---
description: Understand how and where to store tokens used in token-based authentication.
toc: true 
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

### Next.js static site scenarios

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

### Traditional web app scenarios

If your app is using a sign in scenario that doesn't require API calls, only an ID Token is required. There is no need to store it. You can validate it and get the data from it that you required. 

If your app needs to call APIs on behalf of the user, Access Tokens and (optionally) Refresh Tokens are needed. These can be stored server-side or in a session cookie. The cookie needs to be encrypted and have a maximum size of 4 KB. If the data to be stored is large, storing tokens in the session cookie is not a viable option. 

Use the following flow types in these scenarios: 

- [Authorization Code Flow](/flows/concepts/auth-code)
- [Regular Web App Quickstarts](/quickstart/webapp)

### Native/Mobile app scenarios

Store tokens in a secure storage that the OS offers and limit access to that storage. For example, leverage KeyStore for Android and KeyChain for iOS.

Use the following flow types in these scenarios:

- [Authorization Code Flow with Proof Key for Code Exchange](/flows/concepts/auth-code-pkce)
- [Saving and Renewing Tokens for Android](/libraries/auth0-android/save-and-refresh-tokens)
- [Saving and Renewing Tokens for Swift](/libraries/auth0-swift/save-and-refresh-jwt-tokens)
- [Native/Mobile Apps Quickstarts](/quickstart/native)

### SPA backend scenarios

When the SPA calls only an API that is served from a domain that can share cookies with the domain of the SPA, no tokens are needed. OAuth adds additional attack vectors without providing any additional value and should be avoided in favour of a traditional cookie based approach.

When the SPA calls multiple APIs living in a different domain, access and optionally refresh tokens are needed.

-  If the SPA backend can handle the API calls, the tokens should be handled and stored similarly to a Web App scenario.

- If the SPA backend cannot handle the API calls, the tokens should be stored in the SPA backend but the SPA needs to fetch the tokens from the backend to perform requests to the API. A protocol needs to be established between the backend and the SPA to allow the secure transfer of the token from the backend to the SPA.

### Browser in-memory scenarios

Auth0 recommends that you use [JavaScript closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Emulating_private_methods_with_closures) when storing tokens in memory to emulate private methods. Use [auth0-sp-js](https://github.com/auth0/auth0-spa-js). This is the most secure method for browser storage, however it **does not** provide persistence across page refreshes and browser tabs. 

### Browser local storage scenarios

Storing tokens in browser local storage provides persistence across page refreshes and browser tabs, however if an attacker can achieve running JavaScript in the SPA, they can retrieve the tokens stored in local storage using a cross-site scripting (XSS) attack. A vulnerability leading to a successful XSS attack can be either in the SPA source code or in any third-party JavaScript code (such as bootstrap, jQuery, or Google Analytics) included in the SPA.

Using browser local storage can be viable alternative to mechanisms that require retrieving the Access Token from an iframe and to cookie-based authentication across domains when these are not possible due to browser restrictions (e.g. ITP2).

::: panel Reduce Security Risks with Local Storage
If the SPA is using Implicit (although it is recommended that authorization code with PKCE is used) or Hybrid Flows, the absolute token expiration time can be reduced. This will reduce the impact of a reflected XSS (but not of a persistent one). To do so, go to **Dashboard > APIs > Settings > Token Expiration For Browser Flows (Seconds)**.

Reduce the amount of third party JavaScript code included from a source outside your domain to the minimum needed (such as links to jQuery, Bootstrap, Google Analytics etc.) Reducing third-party JS code reduces the possibility of an XSS vulnerability. Performing [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) checking in third-party scripts (where possible) to verify that the resources fetched are delivered without unexpected manipulation is also more secure.
:::

## Keep reading

* [ID Tokens](/tokens/concepts/id-tokens)
* [Access Tokens](/tokens/concepts/access-tokens)
* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Token Best Practices](/best-practices/token-best-practices)
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
* [The Ultimate Guide to Next.js Authentication with Auth0](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/?utm_source=twitter&utm_medium=sc&utm_campaign=nextjs_authn_guide)