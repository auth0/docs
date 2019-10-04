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

## Mobile/native applications

During authentication, mobile/native applications can use the OAuth 2.0 Authorization Code Flow, but they require additional security because they:

* Cannot securely store a Client Secret. Decompiling the app will reveal the Client Secret. The Client Secret is bound to the app and is the same for all users and devices.
* May make use of a custom URL scheme to capture redirects (e.g., MyApp://) potentially allowing malicious applications to receive an Authorization Code from your Authorization Server.

To mitigate this, OAuth 2.0 provides a version of the Authorization Code Flow which makes use of a Proof Key for Code Exchange (PKCE) (defined in [OAuth 2.0 RFC 7636](https://tools.ietf.org/html/rfc7636)). 

The PKCE-enhanced Authorization Code Flow introduces a secret created by the calling application that can be verified by the authorization server; this secret is called the Code Verifier. Additionally, the calling app creates a transform value of the Code Verifier called the Code Challenge and sends this value over HTTPS to retrieve an Authorization Code. This way, a malicious attacker can only intercept the Authorization Code, and they cannot exchange it for a token without the Code Verifier.

## Single-page applications

During authentication, single-page applications (SPAs) have some special requirements. Since the SPA is a public client, it is unable to securely store information such as a Client Secret. As such, traditional guidance suggested using a special authentication flow called the OAuth 2.0 Implicit Flow (defined in [OAuth 2.0 RFC 6749, section 4.2](https://tools.ietf.org/html/rfc6749#section-4.2)). New guidance suggests using Authorization Code Flow with PKCE instead.

Using the Implicit Flow streamlines authentication by returning tokens without introducing any unnecessary additional steps, but often returns tokens in the URL, which can be problematic in certain cases. In such cases, you should use Authorization Code Flow with PKCE. For a more detailed explanation, see our blog post [OAuth2 Implicit Grant and SPA: Everything you always wanted to know (but were afraid to ask)](https://auth0.com/blog/oauth2-implicit-grant-and-spa/).

::: panel Should I use Authorization Code Flow with PKCE or Implicit Flow for my SPA?
Use Authorization Code Flow with PKCE if:
* you are building a brand new SPA; why not use the latest recommendation when starting from the beginning?
* you are passing Access Tokens through the URL and have no steps in place to mitigate the known issues introduced by this approach.
* you are passing Access Tokens through the URL and it's worth it to you to update your code to adhere to the new recommendations.

Use Implicit Flow if:
* your pre-built SPA retrieves ID Tokens and directly consumes them.
* your pre-built SPA sends tokens to a server via a POST.
* your pre-built SPA already includes steps to mitigate the known issues with passing Access Tokens via the URL.
:::

## How it works

Because the PKCE-enhanced Authorization Code Flow builds upon the [standard Authorization Code Flow](/flows/concepts/auth-code), the steps are very similar.

![Authorization Code Flow with PKCE Authentication Sequence](/media/articles/flows/concepts/auth-sequence-auth-code-pkce.png)

1. The user clicks **Login** within the native/mobile application.
2. Auth0's SDK creates a cryptographically-random `code_verifier` and from this generates a `code_challenge`.
3. Auth0's SDK redirects the user to the Auth0 Authorization Server ([**/authorize** endpoint](/api/authentication#authorization-code-grant-pkce-)) along with the `code_challenge`.
4. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
5. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the mobile application.
6. Your Auth0 Authorization Server stores the `code_challenge` and redirects the user back to the application with an authorization `code`.
7. Auth0's SDK sends this `code` and the `code_verifier` (created in step 2) to the Auth0 Authorization Server ([**/oauth/token** endpoint](/api/authentication?http#authorization-code-flow-with-pkce44)).
8. Your Auth0 Authorization Server verifies the `code_challenge` and `code_verifier`.
9. Your Auth0 Authorization Server responds with an ID Token and Access Token (and optionally, a <dfn data-key="refresh-token">Refresh Token</dfn>).
10. Your application can use the Access Token to call an API to access information about the user.
11. The API responds with requested data.


## How to implement it

### Mobile/native applications

The easiest way to implement the Authorization Code Flow with PKCE is to follow our [Mobile/Native Quickstarts](/quickstart/native).

You can also use our mobile SDKs:

* [Auth0 Swift SDK](/libraries/auth0-swift)
* [Auth0 Android SDK](/libraries/auth0-android)

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/add-login-auth-code-pkce) or [Call Your API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce).

### Single-page applications

The easiest way to implement the Authorization Code Flow with PKCE is to follow our [Single-Page Quickstarts](/quickstart/spa).

You can also use our single-page app SDK:

* [Auth0 Single-Page App SDK](/libraries/auth0-spa-js)

::: note
The existing Auth0 JavaScript SDKs are based on the traditional guidance using Implicit Flow. If you are using these rather than the Auth0 Single-Page App SDK, please ensure you are implementing mitigations that are appropriate for your SPA architecture.
:::

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/add-login-auth-code-pkce) or [Call Your API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce).

## Keep reading

- Auth0 offers many ways to personalize your user's login experience using [rules](/rules) and [hooks](/hooks).
- [Tokens](/tokens)
