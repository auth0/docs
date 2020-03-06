---
title: Authorization Code Flow with Proof Key for Code Exchange (PKCE)
description: Learn how the Authorization Code flow with Proof Key for Code Exchange (PKCE) works and why you should use it for native and mobile apps.
topics:
  - authorization-code
  - pkce
  - api-authorization
  - grants
  - authentication
  - native-apps
  - mobile-apps
contentType: concept
useCase:
  - secure-api
  - call-api
  - add-login
---
# Authorization Code Flow with Proof Key for Code Exchange (PKCE)

When public clients (e.g., native and single-page applications) request Access Tokens, some additional security concerns are posed that are not mitigated by the Authorization Code Flow alone. This is because:

**Native apps**

* Cannot securely store a Client Secret. Decompiling the app will reveal the Client Secret, which is bound to the app and is the same for all users and devices.
* May make use of a custom URL scheme to capture redirects (e.g., MyApp://) potentially allowing malicious applications to receive an Authorization Code from your Authorization Server.

**Single-page apps**

* Cannot securely store a Client Secret because their entire source is available to the browser.

To mitigate this, OAuth 2.0 provides a version of the Authorization Code Flow which makes use of a Proof Key for Code Exchange (PKCE) (defined in [OAuth 2.0 RFC 7636](https://tools.ietf.org/html/rfc7636)). 

The PKCE-enhanced Authorization Code Flow introduces a secret created by the calling application that can be verified by the authorization server; this secret is called the Code Verifier. Additionally, the calling app creates a transform value of the Code Verifier called the Code Challenge and sends this value over HTTPS to retrieve an Authorization Code. This way, a malicious attacker can only intercept the Authorization Code, and they cannot exchange it for a token without the Code Verifier.

## How it works

Because the PKCE-enhanced Authorization Code Flow builds upon the [standard Authorization Code Flow](/flows/concepts/auth-code), the steps are very similar.

![Authorization Code Flow with PKCE Authentication Sequence](/media/articles/flows/concepts/auth-sequence-auth-code-pkce.png)

1. The user clicks **Login** within the application.
2. Auth0's SDK creates a cryptographically-random `code_verifier` and from this generates a `code_challenge`.
3. Auth0's SDK redirects the user to the Auth0 Authorization Server ([**/authorize** endpoint](/api/authentication#authorization-code-grant-pkce-)) along with the `code_challenge`.
4. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
5. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the application.
6. Your Auth0 Authorization Server stores the `code_challenge` and redirects the user back to the application with an authorization `code`.
7. Auth0's SDK sends this `code` and the `code_verifier` (created in step 2) to the Auth0 Authorization Server ([**/oauth/token** endpoint](/api/authentication?http#authorization-code-flow-with-pkce44)).
8. Your Auth0 Authorization Server verifies the `code_challenge` and `code_verifier`.
9. Your Auth0 Authorization Server responds with an ID Token and Access Token (and optionally, a <dfn data-key="refresh-token">Refresh Token</dfn>).
10. Your application can use the Access Token to call an API to access information about the user.
11. The API responds with requested data.


## How to implement it

The easiest way to implement the Authorization Code Flow with PKCE is to follow our [Native Quickstarts](/quickstart/native) or [Single-Page Quickstarts](/quickstart/spa).

Depending on your application type, you can also use our mobile or single-page app SDKs:

**Mobile**

* [Auth0 Swift SDK](/libraries/auth0-swift)
* [Auth0 Android SDK](/libraries/auth0-android)

**Single-page**

* [Auth0 Single-Page App SDK](/libraries/auth0-spa-js)

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/add-login-auth-code-pkce) or [Call Your API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce).

## Keep reading

- Auth0 offers many ways to personalize your user's login experience using [rules](/rules) and [hooks](/hooks).
- [Tokens](/tokens)
