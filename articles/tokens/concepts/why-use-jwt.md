---
title: Why Use JSON Web Tokens (JWT)
description: Understand the benefits of JSON Web Tokens (JWT) when compared to Simple Web Tokens (SWT) and Security Assertion Markup Language (SAML) Tokens.
topics:
  - tokens
  - jwt
contentType:
  - concept
useCase:
  - invoke-api
  - secure-api
  - add-login
---

# Why Use JSON Web Token (JWT)

Let's talk about the benefits of **<dfn data-key="json-web-token">JSON Web Token (JWT)</dfn>** when compared to **Simple Web Token (SWT)** and **<dfn data-key="security-assertion-markup-language">Security Assertion Markup Language (SAML)</dfn> tokens**.

## More compact

JSON is less verbose than XML, so when it is encoded, a JWT is smaller than a SAML token. This makes JWT a good choice to be passed in HTML and HTTP environments.

![Comparing the length of an encoded JWT and an encoded SAML](/media/articles/jwt/comparing-jwt-vs-saml2.png)
_Comparison of the length of an encoded JWT and an encoded SAML_

## More secure

JWT can use a public/private key pair in the form of an X.509 certificate for signing. A JWT can also be symmetrically signed by a shared secret using the HMAC algorithm. And while SAML tokens can use public/private key pairs like JWT, signing XML with XML Digital Signature without introducing obscure security holes is very difficult when compared to the simplicity of signing JSON. Read more about JWT [signing algorithms](/tokens/concepts/signing-algorithms) in our [blog](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).

## More common

JSON parsers are common in most programming languages because they map directly to objects. Conversely, XML doesn't have a natural document-to-object mapping. This makes it easier to work with JWT than SAML assertions.

## Easier to process

JWT is used at internet scale. This means that it is easier to process on user's devices, especially mobile.
