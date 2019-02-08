---
url: /jwt
title: JSON Web Tokens
description: JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This article introduces you to all of the concepts needed to understand JWTs fully.
toc: true
topics:
  - tokens
  - jwt
contentType:
  - how-to
  - concept
useCase:
  - invoke-api
  - secure-api
---

# JSON Web Token

::: note
For more information on all the types of tokens used by Auth0, see [Tokens](/tokens).
:::

JSON Web Token (JWT), pronounced "jot", is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

* **Compact**: Because of its relatively small size, a JWT can be sent through a URL, through a POST parameter, or inside an HTTP header, and it is transmitted quickly.
* **Self-contained**: A JWT contains all the required information about an entity to avoid querying a database more than once. The recipient of a JWT also does not need to call a server to validate the token.

The information contained within the JSON object can be verified and trusted because it is digitally signed. Although JWTs can also be encrypted to provide secrecy between parties, we will focus on *signed* tokens, which can *verify the integrity* of the claims contained within them, while encrypted tokens *hide* those claims from other parties.

JWTs can be signed using a secret (with the **HMAC** algorithm) or a public/private key pair using **RSA** or **ECDSA**. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.

::: note
For additional information about why to use JWT over other token formats, including Simple Web Tokens (SWT) and SAML tokens, see [Why Use JSON Web Token](/tokens/concepts/why-use-jwt).
:::

## Use of JWTs

Remember that JWT is a standard, which means that all JWTs are tokens, but not all tokens are JWTs. Keeping that in mind, JWTs can be used in varying ways:

- **Authentication**: When a user successfully logs in using their credentials, an [ID Token](/tokens/id-token) is returned. According to the [OpenID specs](https://openid.net/specs/openid-connect-core-1_0.html#IDToken), an ID Token is always a JWT.

- **Authorization**: Once a user is successfully logged in, an application may request to access routes, services, or resources on behalf of that user. To do so, it uses an [Access Token](/tokens/overview-access-tokens), which may be in the form of a JWT. Each subsequent request includes the JWT. Single Sign On widely uses JWT nowadays because of JWT's small overhead and its ability to easily be used across different domains.

- **Information Exchange**: JWTs are a good way of securely transmitting information between parties because they can be signed, which means you can be sure that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with.

::: warning
However you use JWTs, be sure to follow [best practices for tokens](/tokens/concepts/token-best-practices) and make sure you [verify the signature](/tokens/guides/id-token/validate-id-token#verify-the-signature) before storing and using a JWT. For more information on how to implement JWT, see [Programmatically Parse and Validate JSON Web Tokens](/tokens/guides/jwt/parse-validate-jwt-programmatically).
:::

## Read More

::: next-steps
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
* [10 Things You Should Know About Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Web Apps vs Web APIs / Cookies vs Tokens](/design/web-apps-vs-web-apis-cookies-vs-tokens)
* [Best Practices for Tokens](/tokens/concepts/token-best-practices)
* [Why Use JSON Web Token](/tokens/concepts/why-use-jwt)
* [JSON Web Token Structure](/tokens/reference/jwt/jwt-structure)
* [JSON Web Token Claims](/tokens/jwt-claims)
* [Programmatically Parse and Validate JSON Web Tokens](/tokens/guides/jwt/parse-validate-jwt-programmatically)
:::
