---
title: JSON Web Token Structure
description: Understand how JSON Web Tokens (JWTs) are structured.
toc: true
topics:
  - tokens
  - jwt
contentType:
  - reference
useCase:
  - invoke-api
  - secure-api
  - add-login
---

# JSON Web Token Structure

A well-formed JSON Web Token (JWT) consists of three concatenated Base64url-encoded strings, separated by dots (`.`): 

- **Header**: contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
- **Payload** (set of claims): contains verifiable security statements, such as the identity of the user and the permissions they are allowed.
- **Signature**: used to validate that the token is trustworthy and has not been tampered with. You must [verify this signature](/tokens/guides/id-token/validate-id-token#verify-the-signature) before storing and using a JWT.

A JWT typically looks like this:
![Encoded JWT](/media/articles/jwt/encoded-jwt3.png)

To see for yourself what is inside a JWT, use the [JWT.io Debugger](http://jwt.io). It will allow you to quickly check that a JWT is well formed and manually inspect the values of the various claims.

![JWT.IO Debugger](/media/articles/jwt/legacy-app-auth-5.png)


## Header

The header *typically* consists of two parts: the hashing algorithm being used (e.g., HMAC SHA256 or RSA) and the type of the token (JWT).

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```


## Payload

The payload contains statements about the entity (typically, the user) and additional entity attributes, which are called claims. In this example, our entity is a user.

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

::: note
When working with [JWT claims](https://tools.ietf.org/html/rfc7519#section-4), you should be aware of the different [claim types and naming rules](/tokens/jwt-claims). 
:::


## Signature

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

To create the signature, the Base64-encoded header and payload are taken, along with a secret, and signed with the algorithm specified in the header.

For example, if you are creating a signature for a token using the HMAC SHA256 algorithm, you would do the following:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

::: warning
However you use a JWT, you must [verify its signature](/tokens/guides/id-token/validate-id-token#verify-the-signature) before storing and using it.
:::
