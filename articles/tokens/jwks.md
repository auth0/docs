---
url: /jwks
title: JSON Web Key Set (JWKS)
description: A JSON Web Key set is a JSON object which represents a set of JSON Web Keys (a JSON object that represents a cryptographic key).
toc: true
topics:
  - tokens
  - jwks
contentType:
  - how-to
  - concept
useCase:
  - invoke-api
---
# JSON Web Key Set (JWKS)

When creating applications and resources servers (APIs) in Auth0, two algorithms are supported for signing [JSON Web Tokens (JWTs)](/jwt): **RS256** and **HS256**. RS256 generates an asymmetric signature, which means a private key must be used to sign the JWT and a different public key must be used to verify the signature.

Auth0 uses the [JWK](https://tools.ietf.org/html/rfc7517) specification to represent the cryptographic keys used for signing RS256 tokens. This specification defines two high level data structures: **JSON Web Key (JWK)** and **JSON Web Key Set (JWKS)**. Here are the definitions directly from the specification:

> **JSON Web Key (JWK)**
>
> A JSON object that represents a cryptographic key. The members of the object represent properties of the key, including its value.

> **JSON Web Key Set (JWKS)**
> 
> A JSON object that represents a set of JWKs. The JSON object MUST have a `keys` member, which is an array of JWKs.

At the most basic level, the JWKS is a set of keys containing the public keys that should be used to verify any JWT issued by the authorization server. Auth0 exposes a JWKS endpoint for each tenant, which is found at `https://${account.namespace}/.well-known/jwks.json`. This endpoint will contain the JWK used to sign all Auth0 issued JWTs for this tenant. 



::: note
Currently Auth0 only supports a single JWK for signing, however it is important to assume this endpoint could contain multiple JWKs. As an example, multiple keys can be found in the JWKS when rotating signing certificates.
:::




## Keep reading

* [JWKS Properties](/tokens/jwt/reference/jwks-properties)
* [Verify a JWT's Signature using the JWKS Endpoint](/tokens/jwt/guides/verify-jwt-using-jwks)
* [Programmatically Parse and Validate a JWT](/tokens/guides/parse-validate-jwt-programmatically)

Sample implementations:
* [Backend/API Quickstarts](/quickstart/backend)
* [Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/) (uses Node.js)
