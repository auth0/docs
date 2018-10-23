---
url: /overview-jwt-claims
title: Naming Rules for JSON Web Token (JWT) Claims
description: Describes the rules you should be aware of when naming JSON Web Token (JWT) claims.
toc: true
topics:
  - tokens
  - jwt
  - claims
contentType:
  - concept
useCase:
  - invoke-api
  - secure-api
---

# Naming Rules for JSON Web Token (JWT) Claims

When naming JSON Web Token (JWT) claims, make sure you avoid name collisions, especially if you are using self-defined [custom claims]. When collisions occur, it can be difficult to tease apart two claims of the same name that contain differing information.

## Types of claim names

There are three types of claim names:

* Registered
* Public
* Private

### Registed claim names

The JWT specification defines seven reserved claims that can be included in a token:

* iss (issuer): Issuer of the JWT
* sub (subject): Subject of the JWT (the user)
* aud (audience): Audience for the JWT
* exp (expiration time): Time after which the JWT expires
* nbf (not before time): Time before which the JWT must not be accepted for processing
* iat (issued at time): Time at which the JWT was issued that can be used to determine age of the JWT
* jti (JWT ID): Unique identifier that can be used to prevent the JWT from being replayed (allows a token to be used only once)

You can see a full list of reserved claims at the IANA Registry.


### Public claim names

For your specific use case, you can also create your own claims, such as:

* auth_time
* acr
* nonce

### Private claim names

A producer and consumer may agree to use claim names that are private.

You can use private claim names to convey identity-related information, such as name or department.

