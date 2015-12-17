---
public: false

image: "/media/landings/what-is-jwt/what-is-jwt.png"
imageAlt: "JSON Web Tokens are a compact and self-contained way of transmitting information."
imagePosition: "center"
budicon: 789
color: "#2F383D"
title: "What is JSON Web Token?"
---
**JSON Web Token (JWT)** is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with **HMAC** algorithm) or a public/private key pair using **RSA**.

Let's explain some concepts of this definition further.

- **Compact**: Because of its size, it can be sent through an URL, POST parameter, or inside an HTTP header. Additionally, due to its size its transmission is fast.

- **Self-contained**: The payload contains all the required information about the user, to avoid querying the database more than once.