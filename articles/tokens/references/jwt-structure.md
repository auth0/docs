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

::: note
All Auth0-issued JSON Web Tokens (JWTs) are JSON Web Signatures (JWS), meaning they are signed rather than encrypted. As such, this document describes the JWS structure of a JWT.
:::

A well-formed <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> consists of three concatenated Base64url-encoded strings, separated by dots (`.`): 

- **Header**: contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
- **Payload** (set of [claims](/tokens/concepts/jwt-claims)): contains verifiable security statements, such as the identity of the user and the permissions they are allowed.
- **Signature**: used to validate that the token is trustworthy and has not been tampered with. You must [verify this signature](/tokens/guides/validate-id-tokens#verify-the-signature) before storing and using a JWT.

A JWT typically looks like this:
![Encoded JWT](/media/articles/jwt/encoded-jwt3.png)

To see for yourself what is inside a JWT, use the [JWT.io Debugger](http://jwt.io). It will allow you to quickly check that a JWT is well formed and manually inspect the values of the various claims.

![JWT.IO Debugger](/media/articles/jwt/legacy-app-auth-5.png)

::: panel Where can I find my secret or public key?

For RS256:
1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.
2. Scroll to the bottom of the page, click **Advanced Settings**, and click the **Certificates** tab. You will find the Public Key in the **Signing Certificate** field.

For HS256:
1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view. You will find your Secret in the **Client Secret** field.
:::

## Header

The header *typically* consists of two parts: the hashing algorithm being used (e.g., HMAC SHA256 or RSA) and the type of the token (JWT).

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```


## Payload

The payload contains statements about the entity (typically, the user) and additional entity attributes, which are called [claims](/tokens/concepts/jwt-claims). In this example, our entity is a user.

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

::: note
When working with [JWT claims](https://tools.ietf.org/html/rfc7519#section-4), you should be aware of the different [claim types and naming rules](/tokens/concepts/jwt-claims). 
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
How ever you use a JWT, you must [check its signature](/tokens/guides/validate-jwts) before storing and using it.
:::

## Keep reading

* [JSON Web Tokens](/tokens/concepts/jwts)
* [Validate JSON Web Tokens](/tokens/guides/validate-jwts)
* [Locate JSON Web Token Key Sets](/tokens/guides/locate-jwks)
* [JSON Web Key Sets](/tokens/concepts/jwks)
* [JSON Web Key Set Properties](/tokens/references/jwkw-properties)
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
