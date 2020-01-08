---
title: Locate JSON Web Key Sets
description: Learn how to use the JSON Web Keys (JWKs) discovered using the JSON Web Key Set (JWKS) endpoint to verify a JWT signature.
topics:
  - tokens
  - jwks
  - jwt
contentType:
  - how-to
useCase:
  - invoke-api
  - secure-api
  - add-login
---
# Locate JSON Web Key Sets

Auth0 exposes a discovery endpoint, which exists at `https://${account.namespace}/.well-known/openid-configuration`. You can use this endpoint to configure your application or API to automatically locate the [JSON Web Key Set (JWKS)](/tokens/concepts/jwks) endpoint (`jwks_uri`), which contains the JWKS used to sign all Auth0-issued <dfn data-key="json-web-token">JSON Web Tokens (JWTs)</dfn> signed with the RS256 [signing algorithm](/tokens/concepts/signing-algorithms).

When [validating a JWT](/tokens/guides/validate-jwts) using a JWKS, you will need to:

1. Retrieve the JWKS from the Auth0 discovery endpoint, and filter for potential signing keys (e.g., any keys missing a public key or with a `kid` property).
2. Grab the `kid` property from the Header of the decoded JWT.
3. Search your filtered JWKS for the key with the matching `kid` property.
4. Build a certificate using the corresponding `x5c` property in your JWKS.
5. Use the certificate to verify the JWT's signature.

For an example that uses JWKS to verify a JWT's signature, see [Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/) (uses Node.js), or check out our [Backend/API Quickstarts](/quickstart/backend).

For more info about the structure of a JWT, see [JSON Web Token Structure](/tokens/references/jwt-structure).

::: note
It's good practice to assume that multiple signing keys could be present in your JWKS. This may seem unnecessary since the Auth0 JWKS endpoint typically contains a single signing key; however, multiple keys can be found in the JWKS when rotating signing certificates.
:::

::: panel Best Practice
You can cache your signing keys to improve application performance and avoid running into [rate limits](/policies/rate-limits), but you will want to make sure that if decoding a token fails, you invalidate the cache and retrieve new signing keys before trying **only one** more time.
:::

## Keep reading

* [JSON Web Key Sets](/tokens/concepts/jwks)
* [JSON Web Key Set Properties](/tokens/references/jwks-properties)
* [JSON Web Token Structure](/tokens/references/jwt-structure)
* [Validate a JSON Web Token](/tokens/guides/validate-jwt)
* [Backend/API Quickstarts](/quickstart/backend)
* [Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/) (uses Node.js)