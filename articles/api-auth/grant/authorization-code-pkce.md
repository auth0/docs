---
description: Describes the call APIs from mobile apps using the  Authentication Code Grant (PKCE).
---

# Calling APIs from Mobile Apps

In order to access an API from a [mobile app](/quickstart/native), you need to implement the **Authorization Code using Proof Key for Code Exchange (PKCE)** OAuth 2.0 grant. In this document we will see how this flow works.

<div class="alert alert-info">
  If you need a refresher on the OAuth 2.0 protocol, you can go through our <a href="/protocols/oauth2">OAuth 2.0</a> article.
</div>

## Overview of the flow

The **Proof Key for Code Exchange (PKCE)**, defined in [RFC 7636](https://tools.ietf.org/html/rfc7636), is a technique used to mitigate the authorization code interception attack when using the [Authorization Code Grant](/api-auth/grant/authorization-code) since the attacker can intercept the `authorization_code` returned by the Authorization Server and exchange it for an `access_token` (and possibly a `refresh_token`).
To mitigate this attack, the Client creates, for every authorization request, a cryptographically random key called `code_verifier` and it's transformed value called `code_challenge`, which is sent to the Authorization Server to obtain the `authorization_code`. When the Client receives the `authorization_code`, it will send the code and the `code_verifier` to the Authorization Server token endpoint to exchange them for the requested tokens.

![Authorization Code Grant using PKCE](/media/articles/api-auth/authorization-code-grant-pkce.png)

 1. The Client initiates the flow and redirects the user to the Authorization Server sending the `code_challenge` and `code_challenge_method` parameters
 2. The Authorization Server redirects the user to the Client with an `authorization_code` in the querystring
 3. The Client sends the `authorization_code` and `code_verifier` together with the Redirect Uri and the Client Id to the Authorization Server
 4. The Authorization Server validates this information and returns an `access_token` (and optionally a `refresh_token`)

## Use Case

 - Allow a Public Client to use the Authorization Code Grant without being susceptible to authorization code interception attack.

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
