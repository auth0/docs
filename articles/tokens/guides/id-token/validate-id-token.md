---
title: Validate an ID Token
description: Learn how to validate an ID Token.
toc: true
topics:
  - tokens
  - api-authentication
  - oidc
  - id-tokens
contentType:
  - tutorial
useCase:
  - add-login
  - development
---
# Validate an ID Token 

An [ID Token](/tokens/concepts/id-tokens), which contains user profile attributes, is consumed by an Application and typically used for user interface display. Auth0 issues all ID Tokens in <dfn data-key="json-web-token">[JSON Web Token (JWT)](/jwt)</dfn> format.

To validate an ID Token, you will need to:

1. Perform standard JWT validation
2. Check additional standard claims

If any of these checks fail, the token is considered invalid, and the request must be rejected.

## Perform standard JWT validation

Because the ID Token is a JWT, you will first need to perform the standard JWT validation steps. To learn about JWT validation, see [Validate a JSON Web Token](/tokens/guides/jwt/validate-jwt).

## Check additional standard claims

If you've performed the standard JWT validation, you have already decoded the [JWT's Payload](/tokens/references/jwt-structure#payload) and looked at its standard claims. Additional claims to verify for ID Tokens include:

* **Token audience** (`aud`, string): The audience value for the token must match the client ID of the application as defined in your [Application's Settings](${manage_url}/#/applications) in the **Client ID** field.
* **Nonce** (`nonce`, string): Passing a nonce in the token request is recommended (required for the [Implicit Flow](/flows/concepts/implicit)) to help prevent replay attacks. The nonce value in the token must exactly match the original nonce sent in the request. To learn more how to use nonces in token requests, see [Mitigate Replay Attacks](/api-auth/tutorials/nonce).

If any of these checks fail, the token is considered invalid, and the request must be rejected.

## Read more

* [ID Tokens](/tokens/concepts/id-tokens)
* [Get an ID Token](/tokens/guides/id-token/get-id-tokens)
