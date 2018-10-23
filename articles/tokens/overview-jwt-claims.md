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

## Types of claims

There are two types of claims:

* Reserved
* Custom

### Reserved claims

The JWT specification defines seven reserved claims that can be included in a token:

* iss (issuer): Issuer of the JWT
* sub (subject): Subject of the JWT (the user)
* aud (audience): Recipient for which the JWT is intended
* exp (expiration time): Time after which the JWT expires
* nbf (not before time): Time before which the JWT must not be accepted for processing
* iat (issued at time): Time at which the JWT was issued; can be used to determine age of the JWT
* jti (JWT ID): Unique identifier; can be used to prevent the JWT from being replayed (allows a token to be used only once)

You can see a full list of reserved claims at the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims).

None of these are required to be set, so you can just use your own claims. However, if you don't use the registered claims, don't expect your tokens to have any interoperability with other third-party applications.


### Custom claims

For your specific use case, you can define your own claim names. You can name a custom claim anything that is not already listed in the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims). 


#### Public claims

If you have created custom claims and you plan to allow third-party applications to use them, you should either register them in the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims) or use a collision-resistant name, such as by adding your domain name as the prefix.

In the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims), you can see some examples of public claims created by OpenID Connect: 

* auth_time
* acr
* nonce


#### Private claims

You can create a custom claim name 
A producer and consumer of a JWT may agree to any claim name that is not a Reserved Name Section 4.1 or a Public Name Section 4.2. Unlike Public Names, these private names are subject to collision and should be used with caution.

This is usually the information that is more specific to your application. While a public claim might contain information like "name" and "email", private claims would be more specific like "user ID", or "authorization scope".
A producer and consumer may agree to use claim names that are private.

You can use private claim names to convey identity-related information, such as name or department.

