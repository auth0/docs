---
description: Describes the call APIs from mobile apps using the  Authentication Code Grant (PKCE).
---

# Calling APIs from Mobile Apps

In order to access an API from a [mobile app](/quickstart/native), you need to implement the **Authorization Code using Proof Key for Code Exchange (PKCE)** OAuth 2.0 grant. In this document we will see how this flow works.

<div class="alert alert-info">
  If you need a refresher on the OAuth 2.0 protocol, you can go through our <a href="/protocols/oauth2">OAuth 2.0</a> article.
</div>

## Overview of the flow

The [Authorization Code Grant](/api-auth/grant/authorization-code) has some security issues, when implemented on native applications. For instance, a malicious attacker can intercept the `authorization_code` returned by Auth0 and exchange it for an [Access Token](/tokens/access-token) (and possibly a [Refresh Token](/tokens/preview/refresh-token)).

The **Proof Key for Code Exchange (PKCE)** (defined in [RFC 7636](https://tools.ietf.org/html/rfc7636)) is a technique used to mitigate this authorization code interception attack.

With PKCE, the Client creates, for every authorization request, a cryptographically random key called `code_verifier` and its transformed value called `code_challenge`, which is sent to Auth0 to get the `authorization_code`. When the Client receives the `authorization_code`, it will send the code and the `code_verifier` to Auth0's token endpoint to exchange them for the requested tokens.

![Authorization Code Grant using PKCE](/media/articles/api-auth/authorization-code-grant-pkce.png)

 1. The native app initiates the flow and redirects the user to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant-pkce-)), sending the `code_challenge` and `code_challenge_method` parameters.

 2. Auth0 redirects the user to the native app with an `authorization_code` in the querystring.

 3. The native app sends the `authorization_code` and `code_verifier` together with the `redirect_uri` and the `client_id` to Auth0. This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code-pkce-).

 4. Auth0 validates this information and returns an `access_token` (and optionally a `refresh_token`).

 5. The native app can use the `access_token` to call the API on behalf of the user.

 __NOTE__: In OAuth 2.0 terms, the native app is the _Client_ , the end user the _Resource Owner_, the API the _Resource Server_, the browser the _User Agent_, and Auth0 the _Authorization Server_.

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce).

## Read more

[Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)

[How to configure an API in Auth0](/apis)

[Mobile/Native App Quickstarts](/quickstart/native)

[Client Authentication for Mobile & Desktop Apps](/client-auth/mobile-desktop)

[Authentication API: GET /authorize](/api/authentication#authorization-code-grant-pkce-)

[Authentication API: POST /oauth/token](/api/authentication#authorization-code-pkce-)

[The OAuth 2.0 protocol](/protocols/oauth2)

[The OpenID Connect protocol](/protocols/oidc)

[Tokens used by Auth0](/tokens)

[RFC 6749 - The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)

[RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636)
