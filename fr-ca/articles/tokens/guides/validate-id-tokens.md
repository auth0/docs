---
title: Validate ID Tokens
description: Learn how to validate an ID Token.
topics:
  - tokens
  - api-authentication
  - oidc
  - id-tokens
contentType:
  - how-to
useCase:
  - add-login
  - development
---
# Validate ID Tokens 

An [ID Token](/tokens/concepts/id-tokens), which contains user profile attributes, is consumed by an app and is typically used for user interface display. Auth0 issues all ID Tokens in <dfn data-key="json-web-token">[JSON Web Token (JWT)](/tokens/concepts/jwts)</dfn> format.

::: warning
If any of these checks fail, the token is considered invalid, and the request must be rejected.
:::

1. [Validate the JSON Web Token](/tokens/guides/validate-jwts). 

2. Check additional standard claims. If you've performed the standard JWT validation, you have already decoded the [JWT's Payload](/tokens/references/jwt-structure#payload) and looked at its standard claims. Additional claims to verify for ID Tokens include:

    * **Token audience** (`aud`, string): The audience value for the token must match the client ID of the application as defined in your [Application's Settings](${manage_url}/#/applications) in the **Client ID** field.
    * **Nonce** (`nonce`, string): Passing a nonce in the token request is recommended (required for the [Implicit Flow](/flows/concepts/implicit)) to help prevent replay attacks. The nonce value in the token must exactly match the original nonce sent in the request. To learn more how to use nonces in token requests, see [Mitigate Replay Attacks](/api-auth/tutorials/nonce).

## Keep reading

* [ID Tokens](/tokens/concepts/id-tokens)
* [Get ID Tokens](/tokens/guides/get-id-tokens)
* [Invalid Token Errors](/troubleshoot/references/invalid-token)
