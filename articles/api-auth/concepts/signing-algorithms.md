---
url: /concepts
title: Signing Algorithms
description: Learn the basics of signing algorithms and recommendations for configuring in Auth0 Dashboard.
topics:
  - api-authentication
  - oidc
  - apis
  - signing algorithms
  - RS256
  - HS256
contentType: concept
useCase:
  - secure-api
  - call-api
---


# Signing Algorithms

When you create an API, you have to select the algorithm with which your tokens will be signed. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

::: note
The signature is part of a JWT. If you are not familiar with the JWT structure please refer to: [JSON Web Tokens (JWTs) in Auth0](/jwt#what-is-the-json-web-token-structure-).
:::

To create the signature part, you have to take the encoded header, the encoded payload, a secret, and the algorithm specified in the header, and sign that. The algorithm that signs it all, which is the algorithm that is part of the JWT header, is the one you select for your API: `HS256` or `RS256`.

- **RS256** (RSA Signature with SHA-256) is an [asymmetric algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography), which means that there are two keys: one public and one private (secret). Auth0 has the private key used to generate the signature, and the consumer of the JWT [retrieves a public key](/api-auth/guides/retrieve-public-key) to validate the signature from the metadata endpoints provided by Auth0.

- **HS256** (HMAC with SHA-256) is a [symmetric algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm), which means that there is only one private (secret) key, and it is shared between the two parties. Since the same key is used both to generate the signature and to validate it, care must be taken to ensure that the key is not compromised.

## Our recommendation

The most secure practice, and our recommendation, is to use **RS256**. Some of the reasons are:

- With RS256 you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.

- With RS256, you can request a token that is valid for multiple audiences.

- With RS256, if the secret key is compromised, you can implement key rotation without having to re-deploy the API with the new secret (which you would have to do under HS256).

For a more detailed overview of the JWT signing algorithms refer to: [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).

