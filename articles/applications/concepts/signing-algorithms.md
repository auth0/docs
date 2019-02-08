---
title: Signing Algorithms
description: Learn the basics of signing algorithms and recommendations for configuring them in the Auth0 Dashboard.
topics:
  - api-authentication
  - oidc
  - apis
  - applications
  - signing-algorithms
  - RS256
  - HS256
contentType: concept
useCase:
  - add-login
  - secure-api
  - call-api
---
# Signing Algorithms

The algorithm used to sign tokens issued for your application or API. The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.

::: note
A signature is part of a [JSON Web Token (JWT)](/docs/jwt). If you are not familiar with the JWT structure please refer to: [JSON Web Token Structure](/tokens/reference/jwt/jwt-structure).
:::

You can select from the following signing algorithms:

- **RS256** (RSA Signature with SHA-256): An [asymmetric algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography), which means that there are two keys: one public and one private (secret). Auth0 has the private key used to generate the signature, and the consumer of the JWT [retrieves a public key](/api-auth/guides/retrieve-public-key) to validate the signature from the metadata endpoints provided by Auth0.

- **HS256** (HMAC with SHA-256): A [symmetric algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm), which means that there is only one private (secret) key, and it is shared between the two parties. Since the same key is used both to generate the signature and to validate it, care must be taken to ensure that the key is not compromised.

## Our recommendation

The most secure practice, and our recommendation, is to use **RS256**. Some of the reasons are:

- With RS256 you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.

- With RS256, you can request a token that is valid for multiple audiences.

- With RS256, if the secret key is compromised, you can implement key rotation without having to re-deploy the API with the new secret (which you would have to do under HS256).

For a more detailed overview of the JWT signing algorithms, see our blog post: [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).

