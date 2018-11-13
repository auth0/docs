---
description: Learn how to programmatically parse a JSON Web Token (JWT).
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
# Programmatically Parse a JWT

To programmatically parse a JWT, you can either:

* manually implement all the checks as described in specification RFC 7519 > 7.2 Validating a JWT
* choose a third-party library from JWT.io
* use any existing middleware for your web framework

If you choose a third-party library, remember to pick a library that supports the signing algorithm you selected when you registered your API with Auth0. Also, since you will probably use this library again when you validate the JWT's standard claims, be aware that not all libraries validate all claims. At [JWT.io](), you can see which validations each library supports (look for the green check marks).

