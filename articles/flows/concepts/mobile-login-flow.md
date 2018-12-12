---
description: Learn how the mobile login flow works and why you should use it for mobile apps.
topics:
  - authorization-code
  - pkce
  - api-authorization
  - grants
  - authentication
contentType: concept
useCase:
  - secure-api
  - call-api
  - add-login
---
# Mobile Login Flow

During authentication, mobile/native applications can use the OAuth 2.0 Authorization Code Flow, but they require additional security because they:

* cannot securely store a Client Secret
* may make use of a custom URL scheme to capture redirects (e.g., MyApp://) potentially allowing malicious applications to receive an Authorization Code from your Authorization Server.

To mitigate this, OAuth 2.0 provides a version of the Authorization Code Flow which makes use of a Proof Key for Code Exchange (PKCE) (defined in [OAuth 2.0 RFC 7636](https://tools.ietf.org/html/rfc7636)). 

The PKCE-enhanced Authorization Code Flow introduces a secret created by the calling application that can be verified by the authorization server; this secret is called the Code Verifier. Additionally, the calling app creates a transform value of the Code Verifier called the Code Challenge and sends this value over HTTPS to retrieve an Authorization Code. This way, a malicious attacker can only intercept the Authorization Code, and they cannot exchange it for a token without the Code Verifier.

## How it works

Because the PKCE-enhanced Authorization Code Flow builds upon the standard Authorization Code Flow, the steps are very similar.

![Mobile Login Flow Authentication Sequence](/media/articles/flows/concepts/auth-sequence-mobile-login-flow.png)


1. The user clicks **Login** within the native/mobile application.
2. Auth0's SDK creates a cryptographically-random `code_verifier` and from this generates a `code_challenge`.
3. Auth0's SDK redirects the user to the Auth0 Authorization Server ([**/authorize** endpoint](/api/authentication#authorization-code-grant-pkce-)) along with the `code_challenge`.
4. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
5. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the mobile application.
6. Your Auth0 Authorization Server stores the `code_challenge` and redirects the user back to the application with an authorization `code`.
7. Auth0's SDK sends this `code` and the `code_verifier` (created in step 2) to the Auth0 Authorization Server ([**/token** endpoint](/api/authentication?http#authorization-code-pkce-)).
8. Your Auth0 Authorization Server verifies the `code_challenge` and `code_verifier`.
9. Your Auth0 Authorization Server responds with an ID Token and Access Token (and optionally, a Refresh Token).
10. Your application can use the Access Token to call an API to access information about the user.
11. The API responds with requested data.


## How to implement it

The easiest way to implement the Mobile Login Flow is to follow our [Mobile/Native Quickstarts](/quickstart/native).

You can also use our mobile SDKs:

* [Auth0 Swift SDK](/libraries/auth0-swift)
* [Auth0 Android SDK](/libraries/auth0-android)

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Mobile Login Flow](/flows/guides/mobile-login-flow/add-login-using-mobile-login-flow) or [Call Your API Using the Mobile Login Flow](/flows/guides/mobile-login-flow/call-api-using-mobile-login-flow).

## Keep reading

- Auth0 offers many ways to personalize your user's login experience using [rules](/rules) and [hooks](/hooks).
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [Tokens used by Auth0](/tokens)
