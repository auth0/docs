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

To validate an ID Token, your application needs to:

1. Check that the ID Token is correctly formatted
2. Retrieve and filter your Auth0 JSON Web Key Set (JWKS)
3. Verify the ID Token's signature
4. Verify the claims found inside the ID Token

::: note
Most JWT libraries will take care of the token validation for you automatically, so be sure to reference the [Libraries for Token Signing/Verification section of JWT.io](https://jwt.io/#libraries-io) to find a JWT library for your platform and programming language.
:::


## Check that the ID Token is correctly formatted

Auth0 will generate the ID Token in [JSON Web Token (JWT) format](https://auth0.com/docs/jwt#what-is-the-json-web-token-structure-). Before doing anything else, your app should parse the ID Token to make sure it conforms to the structure of a JWT.

A correctly formatted, or well-formed, JWT consists of three concatenated Base64-encoded strings, separated by dots: 

* Header: contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
* Payload (set of claims): contains verifiable security statements such as the identity of the user and the permissions they are allowed.
* Signature: used to validate that the token is trustworthy and has not been tampered with.

To see for yourself what is inside a JWT, use the [JWT.io Debugger](https://jwt.io/#debugger). It will allow you to quickly check that a JWT is well formed and manually inspect the values of the various claims.

## Verify the signature

The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.

Remember that the ID Token is always a JWT, and the signature is created using its header and payload, a secret and the hashing algorithm being used (as specified in the header: `HMAC`, `SHA256` or `RSA`). The way to verify it, depends on the hashing algorithm:

- For `HS256`, the API's __Signing Secret__ is used. You can find this information at your [API's Settings](${manage_url}/#/apis). Note that the field is only displayed for APIs that use `HS256`.
- For `RS256`, the tenant's [JSON Web Key Set (JWKS)](/jwks) is used. Your tenant's JWKS is `https://${account.namespace}/.well-known/jwks.json`.

The most secure practice, and our recommendation, is to use `RS256`.

To check or update the algorithm your Application uses go to [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) > Show Advanced Settings > OAuth > JsonWebToken Signature Algorithm.


## Verify the claims

Check the standard claims contained in the decoded token's payload:

- **Token expiration** (`exp`, Unix timestamp): The expiration date/time must be after the current date/time.

- **Token issuer** (`iss`): The issuing authority inside the token must match the issuing authority identified in your Auth0 tenant's discovery document, which exists at https://YOUR_AUTH0_DOMAIN/.well-known/openid-configuration.

- **Token audience** (`aud`): The token audience identifies the receipient for which the token is intended. The value must match the Client ID of your Auth0 Application.
