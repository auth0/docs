---
title: How to Verify a JSON Web Token's Signature using the JSON Web Key Set Endpoint
description: Learn how to verify a JSON Web Token's signature using JSON Web Keys (JWKs) discovered by using the JSON Web Key Set (JWKS) endpoint.
topics:
  - tokens
  - jwks
  - jwt
contentType:
  - how-to
useCase:
  - invoke-api
  - secure-api
  - add-logi n
---
# How to Verify a JSON Web Token's Signature using the JSON Web Key Set Endpoint

Auth0 exposes a discovery endpoint, which exists at `https://${account.namespace}/.well-known/openid-configuration`. You can use this endpoint to configure your application automatically and locate the [JSON Web Key Set (JWKS)](/tokens/jwks) endpoint (`jwks_uri`), which contains the JWKS used to sign all Auth0-issued [JSON Web Tokens (JWTs)](/tokens/jwt) for your API.

When verifying a JWT using a JWKS, you will need to:

1. Retrieve the JWKS and filter for potential signing keys. You will want to filter out any keys missing a public key or a `kid` property.
2. Extract the JWT from the request's authorization header and decode it.
3. Grab the `kid` property from the header of the decoded JWT.
4. Search your filtered JWKS for the key with the matching `kid` property.
5. Build a certificate using the corresponding `x5c` property in your JWKS.
6. Use the certificate to verify the JWT's signature.

For more information about the structure of a JWT, see [JSON Web Token Structure](/tokens/reference/jwt/jwt-structure).

## How many signing keys should I expect?

It's good practice to assume that multiple signing keys could be present in your JWKS. This may seem unnecessary since the Auth0 JWKS endpoint typically contains a single signing key; however, multiple keys can be found in the JWKS when rotating signing certificates.

## Should I cache my signing keys?

You can cache your signing keys to improve application performance and avoid running into [rate limits](/policies/rate-limits), but you will want to make sure that if decoding a token fails, you invalidate the cache and retrieve new signing keys before trying **only one** more time.
