---
description: Learn how to validate an ID Token.
toc: true
topics:
  - tokens
  - id-tokens
contentType:
  - how-to
useCase:
  - invoke-api
  - secure-api
---
# Validate an ID Token

In order to validate an ID Token, an application needs to verify the signature of the token, as well as validate the standard claims of the token. Each of these steps are discussed in more detail below.

::: note
Most JWT libraries will take care of the token validation for you automatically, so be sure to reference the [Libraries for Token Signing/Verification section of JWT.io](https://jwt.io/#libraries-io) to find a JWT library for your platform and programming language.
:::

### Verify the signature

The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.

Remember that the ID Token is always a JWT, and the signature is created using its header and payload, a secret and the hashing algorithm being used (as specified in the header: `HMAC`, `SHA256` or `RSA`). The way to verify it, depends on the hashing algorithm:

- For `HS256`, the API's __Signing Secret__ is used. You can find this information at your [API's Settings](${manage_url}/#/apis). Note that the field is only displayed for APIs that use `HS256`.
- For `RS256`, the tenant's [JSON Web Key Set (JWKS)](/jwks) is used. Your tenant's JWKS is `https://${account.namespace}/.well-known/jwks.json`.

The most secure practice, and our recommendation, is to use `RS256`.

To check or update the algorithm your Application uses go to [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) > Show Advanced Settings > OAuth > JsonWebToken Signature Algorithm.

### Validate the Claims

Once the application verifies the token's signature, the next step is to validate the standard claims of the token's payload. The following validations need to be made:

- **Token expiration**: The current date/time _must_ be before the expiration date/time listed in the `exp` claim (which is a Unix timestamp).

- **Token issuer**: The `iss` claim denotes the issuer of the JWT. The value **must** match the URL of your Auth0 tenant. For JWTs issued by Auth0, `iss` holds your Auth0 domain with a `https://` prefix and a `/` suffix: `https://${account.namespace}/`.

- **Token audience**: The `aud` claim identifies the recipients that the JWT is intended for. The value _must_ match the Client ID of your Auth0 Application.
