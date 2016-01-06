---
public: false

image: "/media/landings/why-should-you-use-jwt/why-should-you-use-jwt.png"
imageAlt: "Comparing the lenght of an encoded JWT and an encoded SAML"
imageExtraClass: "code"
imagePosition: "center"
budicon: 704
color: "#1CB38F"
title: "Why should you use JSON Web Tokens?"
---

Let's talk about the benefits of **JSON Web Tokens (JWT)** comparing it to **Simple Web Tokens (SWT)** and **Security Assertion Markup Language Tokens (SAML)**.

As JSON is less verbose than XML, when it is encoded is size is also smaller; making JWT more compact than SAML. This makes JWT a good choice to be passed in HTML and HTTP environments.

Security-wise, SWT can only be symmetric signed by a shared secret using the HMAC algorithm. While JWT and SAML tokens can also use a public/private key pair in the form of a X.509 certificate to sign them. However, signing XML with XML Digital Signature without introducing obscure security holes is very difficult compared to the simplicity of signing JSON.

JSON parsers are common in most programming languages, because they map directly to objects, conversely XML doesn't have a natural document-to-object mapping. This makes it easier to work with JWT than SAML assertions.

Regarding usage, JWT is used at an Internet scale. This highlights the ease of client side processing of JWTs on multiple platforms, especially, mobile.