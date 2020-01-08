---
title: JSON Web Key Set
description: A JSON Web Key set is a JSON object which represents a set of JSON Web Keys (a JSON object that represents a cryptographic key).
topics:
  - tokens
  - jwks
  - jwt
contentType:
  - concept
useCase:
  - invoke-api
  - secure-api
  - add-login
---
# JSON Web Key Set

The JSON Web Key Set (JWKS) is a set of keys which contains the public keys used to verify any <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> issued by the authorization server and signed using the RS256 [signing algorithm](/tokens/concepts/signing-algorithms). 

When creating applications and APIs in Auth0, two algorithms are supported for signing JWTs: **RS256** and **HS256**. RS256 generates an asymmetric signature, which means a private key must be used to sign the JWT and a different public key must be used to verify the signature.

Auth0 uses the [JSON Web Key (JWK) specification](https://tools.ietf.org/html/rfc7517) to represent the cryptographic keys used for signing RS256 tokens. This specification defines two high-level data structures: **JSON Web Key (JWK)** and **JSON Web Key Set (JWKS)**. Here are the definitions from the specification:

| Item | Description |
| - | - |
| **JSON Web Key (JWK)** | A JSON object that represents a cryptographic key. The members of the object represent properties of the key, including its value. |
| **JSON Web Key Set (JWKS)** | A JSON object that represents a set of JWKs. The JSON object MUST have a `keys` member, which is an array of JWKs. |

Auth0 exposes a JWKS endpoint for each tenant, which is found at `https://${account.namespace}/.well-known/jwks.json`. This endpoint will contain the JWK used to sign all Auth0-issued JWTs for this tenant.

::: note
Currently, Auth0 only supports a single JWK for signing; however, it is important to assume this endpoint could contain multiple JWKs. As an example, multiple keys can be found in the JWKS when rotating signing certificates.
:::

## Keep reading

* [JSON Web Key Set Properties](/tokens/references/jwks-properties)
* [Validate JSON Web Tokens](/tokens/guides/validate-jwts)
* [Locate JSON Web Key Sets](/tokens/guides/locate-jwks)
* [Backend/API Quickstarts](/quickstart/backend)
* [Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/) (uses Node.js)
