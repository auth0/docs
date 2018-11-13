---
description: Learn how to verify a JSON Web Token (JWT)'s signature using JSON Web Keys (JWKS).
toc: true
topics:
  - tokens
  - jwks
contentType:
  - how-to
useCase:
  - invoke-api
  - secure-api
---
# Verify a JWT's Signature using the JWKS Endpoint

Auth0 exposes a discovery endpoint, which exists at `https://${account.namespace}/.well-known/openid-configuration`. You can use this endpoint to automatically configure your application and locate the JWKS endpoint (`jwks_uri`), which contains the JWKS used to sign all Auth0-issued JWTs for your API.

When verifying a JWT using a JWKS, here are the high level steps you will need to follow:

1. Retrieve the JWKS and filter for potential signing keys. You will want to filter our any keys missing a public key or a `kid` property.
2. Extract the JWT from the request's authorization header and decode it.
3. Grab the `kid` property from the header of the decoded JWT.
4. Search your filtered JWKS for the key with the matching `kid` property.
5. Build a certificate using the corresponding `x5c` property in your JWKS.
6. Use the certificate to verify the JWT's signature.


## How many signing keys should I expect?

It's good practice to assume that multiple signing keys could be present in your JWKS. This may seem unnecessary since the Auth0 JWKS endpoint typically contains a single signing key; however, multiple keys can be found in the JWKS when rotating signing certificates.


## Should I cache my signing keys?

You can cache your signing keys to improve application performance and avoid running into [rate limits](/policies/rate-limits#authentication-api), but you will want to make sure that if decoding a token fails, you invalidate the cache and retrieve new signing keys before trying **only one** more time.
