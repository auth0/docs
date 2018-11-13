---
description: Learn how to programmatically parse and validate a JSON Web Token (JWT).
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
# Programmatically Parse and Validate a JWT

To programmatically parse and verify a JWT, you can either:

* manually implement all the checks as described in [specification RFC 7519 > 7.2 Validating a JWT](https://tools.ietf.org/html/rfc7519#section-7.2)
* choose a third-party library from [JWT.io](https://jwt.io/#libraries)
* use any existing middleware for your web framework

If you choose a third-party library, remember to pick a library that supports the signing algorithm you selected when you registered your API with Auth0.

Also, be aware that not all libraries validate all JWT claims. At [JWT.io](https://jwt.io/), you can see which validations each library supports (look for the green check marks).
