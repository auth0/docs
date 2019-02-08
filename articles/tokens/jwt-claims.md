---
title: JSON Web Token Claims
description: Learn about the JSON Web Token (JWT) claims and the rules you should be aware of when naming them.
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

# JSON Web Token Claims

There are two types of [JSON Web Token (JWT)](/tokens/jwt) claims:

* **Reserved**: Claims defined by the [JWT specification](https://tools.ietf.org/html/rfc7519) to ensure interoperability with third-party, or external, applications.
* **Custom**: Claims that you define yourself. Name these claims carefully to avoid collision with reserved claims or other custom claims. When collisions occur, it can be challenging to tease apart two claims of the same name that contain differing information.

### Reserved claims

The JWT specification defines seven reserved claims that are not required, but are recommended to allow interoperability with [third-party applications](/applications/concepts/app-types-first-third-party#third-party-applications). These are:

* iss (issuer): Issuer of the JWT
* sub (subject): Subject of the JWT (the user)
* aud (audience): Recipient for which the JWT is intended
* exp (expiration time): Time after which the JWT expires
* nbf (not before time): Time before which the JWT must not be accepted for processing
* iat (issued at time): Time at which the JWT was issued; can be used to determine age of the JWT
* jti (JWT ID): Unique identifier; can be used to prevent the JWT from being replayed (allows a token to be used only once)

You can see a full list of reserved claims at the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims).

### Custom claims

For your specific use case, you can define your own [custom claims](/scopes/current/custom-claims). You can name a custom claim anything that is not already listed in the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims). 

#### Public claims

You can create custom claims for public consumption, which might contain generic information like "name" and "email". If you create public claims, you should either register them or use collision-resistant names, such as by adding your domain name as the prefix.

In the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims), you can see some examples of public claims registered by OpenID Connect: 

* auth_time
* acr
* nonce

#### Private claims

You can create private custom claims to share information specific to your application. For example, while a public claim might contain generic information like "name" and "email", private claims would be more specific, such as "employee ID", "authorization scope", and "department name".

Name private claims cautiously to avoid collision. They should not share names with reserved or public claims.
