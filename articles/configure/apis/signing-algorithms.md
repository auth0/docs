---
title: API Signing Algorithms
description: Overview of algorithms used to sign tokens for APIs.
topics:
  - api-authentication
  - oidc
  - apis
contentType: concept
useCase:
  - secure-api
  - call-api
---

# API Signing Algorithms

When you create an API you have to select the algorithm your tokens will be signed with. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

::: note
The signature is part of a JWT. If you are not familiar with the JWT structure, please see [JSON Web Tokens (JWTs) in Auth0](/jwt#what-is-the-json-web-token-structure-).
:::

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. That algorithm, which is part of the JWT header, is the one you select for your API: `HS256` or `RS256`.

- **RS256** is an [asymmetric algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography) which means that there are two keys: one public and one private (secret). Auth0 has the secret key, which is used to generate the signature, and the consumer of the JWT has the public key, which is used to validate the signature.

- **HS256** is a [symmetric algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) which means that there is only one secret key, shared between the two parties. The same key is used both to generate the signature and to validate it. Special care should be taken in order for the key to remain confidential.

The most secure practice, and our recommendation, is to use **RS256**. Some of the reasons are:

- With RS256 you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.

- Under HS256, if the secret key is compromised (e.g. by the application) you would have to re-deploy the API with the new secret.

- With RS256 you can request a token that is valid for multiple <dfn data-key="audience">audiences</dfn>.

- With RS256 you can implement key rotation without having to re-deploy the API with the new secret.

::: panel Verify an RS256 signed token
Go to [Dashboard > Applications](${manage_url}/#/applications). Open the **Settings** of your applications, scroll down and open **Advanced Settings**. Open the **Certificates** tab and you will find the Public Key in the **Signing Certificate** field.

If you want to use the Public Key to verify a JWT signature on [JWT.io](https://jwt.io/), you can copy the Public Key and paste it in the **Public Key or Certificate** field under the **Verify Signature** section on the [JWT.io](https://jwt.io/) website.

If you want to verify the signature of a token from one of your applications, we recommend that you get the Public Key from your tenant's [JSON Web Key Set (JWKS)](/jwks). Your tenant's JWKS is `https://${account.namespace}/.well-known/jwks.json`.
:::

For a more detailed overview of the JWT signing algorithms, see [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).