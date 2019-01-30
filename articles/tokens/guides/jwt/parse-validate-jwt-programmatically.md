---
title: Programmatically Parse and Validate a JSON Web Token
description: Understand how to programmatically parse and validate a JSON Web Token (JWT).
toc: true
topics:
  - jwt
  - tokens
  - id-tokens
contentType:
  - how-to
useCase:
  - invoke-api
  - secure-api
  - add-login
---
# Programmatically Parse and Validate a JSON Web Token

To programmatically parse and validate a JSON Web Token (JWT), you can:

* Choose a third-party library from [JWT.io](https://jwt.io/#libraries)
* Use any existing middleware for your web framework
* Manually implement all the checks as described in [specification RFC 7519 > 7.2 Validating a JWT](https://tools.ietf.org/html/rfc7519#section-7.2)

## Third-party libraries

The safest way is to use one of the existing open source third-party libraries. At [JWT.io](https://jwt.io/#libraries), you can find libraries for various platforms and languages, such as .NET, Python, Java, Ruby, Objective-C, Swift, and PHP.

If you choose a third-party library, remember to pick a library that supports the signing algorithm you selected when you registered your application or API with Auth0.

Also, be aware that not all libraries validate all JWT claims. At [JWT.io](https://jwt.io/), you can see which validations each library supports (look for the green check marks).

### Keep reading

* [JSON Web Token Structure](/tokens/reference/jwt/jwt-structure)
