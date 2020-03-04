---
title: JSON Web Tokens
description: Understand what a JWT is and how it is used.
topics:
  - tokens
  - jwt
  - id-token
  - access-token
contentType:
  - concept
useCase:
  - development
  - add-login
  - invoke-api
  - secure-api
---
# JSON Web Tokens

JSON Web Token (JWT), pronounced "jot", is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Because of its relatively small size, a JWT can be sent through a URL, through a POST parameter, or inside an HTTP header, and it is transmitted quickly. A JWT contains all the required information about an entity to avoid querying a database more than once. The recipient of a JWT also does not need to call a server to validate the token.

Let's talk about the benefits of JWT when compared to Simple Web Token (SWT) and <dfn data-key="security-assertion-markup-language">Security Assertion Markup Language (SAML)</dfn> tokens.

* **More compact**: JSON is less verbose than XML, so when it is encoded, a JWT is smaller than a SAML token. This makes JWT a good choice to be passed in HTML and HTTP environments.

  ![Comparing the length of an encoded JWT and an encoded SAML](/media/articles/jwt/comparing-jwt-vs-saml2.png)
  _Comparison of the length of an encoded JWT and an encoded SAML_

* **More secure**: JWTs can use a public/private key pair in the form of an X.509 certificate for signing. A JWT can also be symmetrically signed by a shared secret using the HMAC algorithm. And while SAML tokens can use public/private key pairs like JWT, signing XML with XML Digital Signature without introducing obscure security holes is very difficult when compared to the simplicity of signing JSON. Read more about JWT [signing algorithms](/tokens/concepts/signing-algorithms) in our [blog](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).

* **More common**: JSON parsers are common in most programming languages because they map directly to objects. Conversely, XML doesn't have a natural document-to-object mapping. This makes it easier to work with JWT than SAML assertions.

* **Easier to process**: JWT is used at internet scale. This means that it is easier to process on user's devices, especially mobile.

JWT is a standard, which means that **all JWTs are tokens, but not all tokens are JWTs**. JWTs can be used in various ways:

- **Authentication**: When a user successfully logs in using their credentials, an [ID Token](/tokens/concepts/id-tokens) is returned. According to the <dfn data-key="openid">[OpenID Connect (OIDC) specs](https://openid.net/specs/openid-connect-core-1_0.html#IDToken)</dfn>, an ID Token is always a JWT. 

- **Authorization**: Once a user is successfully logged in, an application may request to access routes, services, or resources (e.g., APIs) on behalf of that user. To do so, in every request, it must pass an <dfn data-key="access-token">Access Token</dfn>, which *may* be in the form of a JWT. <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> widely uses JWT because of the small overhead of the format, and its ability to easily be used across different domains. 

- **Information Exchange**: JWTs are a good way of securely transmitting information between parties because they can be signed, which means you can be sure that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with.

## Security

The information contained within the JSON object can be verified and trusted because it is digitally signed. Although JWTs can also be encrypted to provide secrecy between parties, Auth0-issued JWTs are JSON Web Signatures (JWS), meaning they are signed rather than encrypted. As such, we will focus on *signed* tokens, which can *verify the integrity* of the claims contained within them, while encrypted tokens *hide* those claims from other parties.

In general, JWTs can be signed using a secret (with the **HMAC** algorithm) or a public/private key pair using **RSA** or **ECDSA** (although Auth0 supports only HMAC and RSA). When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.

Before a received JWT is used, it should be [properly validated using its signature](/tokens/guides/validate-jwts#check-the-signature). Note that a successfully validated token only means that the information contained within the token has not been modified by anyone else. This doesn't mean that others weren't able to see the content, which is stored in plain text. Because of this, you should never store sensitive information inside a JWT and should take other steps to ensure that JWTs are not intercepted, such as by sending JWTs only over HTTPS, following [best practices](/best-practices/token-best-practices), and using only secure and up-to-date libraries.

## Keep reading

* [JSON Web Token Structure](/tokens/references/jwt-structure)
* [JSON Web Token Claims](/tokens/concepts/jwt-claims)
* [Validate JSON Web Tokens](/tokens/guides/validate-jwts)
* [Locate JSON Web Key Sets](/tokens/guides/locate-jwks)
* [Tokens Best Practices](/best-practices/token-best-practices)
* [Web Apps vs. Web APIs / Cookies vs Tokens](/design/web-apps-vs-web-apis-cookies-vs-tokens)
* [10 Things You Should Know About Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
