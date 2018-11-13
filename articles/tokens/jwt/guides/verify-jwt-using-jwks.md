---
description: Learn how to verify a JSON Web Token (JWT) using JSON Web Keys (JWKS).
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
# Verify a JWT using the JWKS Endpoint

Auth0 exposes a discovery endpoint, which exists at https://YOUR_AUTH0_DOMAIN/.well-known/openid-configuration. You can use this endpoint to automatically configure your application and locate the JWKS endpoint (jwks_uri), which contains the JWKs used to sign all Auth0-issued JWTs for your API.

When verifying a JWT using a JWKS, here are the high level steps you will need to follow:

* Retrieve the JWKS and filter for potential signing keys.
* Extract the JWT from the request's authorization header.
* Decode the JWT and grab the `kid` property from the header.
* Find the signing key in the filtered JWKS with a matching `kid` property.
* Using the `x5c` property build a certificate which will be used to verify the JWT signature.


Confirm that the Access Token is correctly signed using the proper key
To do this, you will need to:

Grab the `kid` property from the header of the decoded token
Search your filtered JWKS for the key with the matching `kid` property
Build a certificate using the corresponding `x5c` property in your JWKS
Use the certificate to verify the Access Token's signature




How many signing keys should I expect?

It's good practice to assume that multiple signing keys could be present in your JWKS. This may seem unnecessary since the Auth0 JWKS endpoint typically contains a single signing key; however, multiple keys can be found in the JWKS when rotating signing certificates.

You will also probably want to filter out any keys missing a public key or a kid property since later, you will use the kid property to match the key in your JWKS with the key specified in the Access Token.

Should I cache my signing keys?

You can cache your signing keys to improve application performance and avoid running into rate limits, but you will want to make sure that if decoding a token fails, you invalidate the cache and retrieve new signing keys before trying only one more time.
