---
public: false

image: "/media/landings/what-is-jwt/what-is-jwt.png"
imageAlt: "JSON Web Tokens are a compact and self-contained way of transmitting information."
imagePosition: "center"
budicon: 789
color: "#222228"
title: "JSON Web Tokens"
---

JSON Web Token (JWT) is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. There are many reasons that JWT authentication is preferable:

**Compact and self-contained**: all data needed for authentication exists in the token. It can be transmitted quickly because of its small size.

**Digitally signed**: tokens are verified against a secret key on the server. They are secure because the content of the JWT can’t be tampered with unless the secret key is known.

**Simple**: JWTs are conceptually straight-forward and have low overhead. Since they provide a stateless means for authentication, they can be used across multiple servers and domains without running into CORS issues.