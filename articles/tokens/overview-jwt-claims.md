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

The JWT specification defines seven claims that can be included in a token:

* iss
* sub
* aud
* exp
* nbf
* iat
* jti


### Public claim names

For your specific use case, you can also use public claim names, such as:

* auth_time
* acr
* nonce

### Private claim names

You can use private claim names to convey identity-related information, such as name or department.

