---
url: /jwt
title: JSON Web Tokens (JWT) in Auth0
description: JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This article introduces you to all of the concepts needed to fully understand JWTs.
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

# JSON Web Tokens (JWT) in Auth0

::: note
For more information on all the types of tokens used by Auth0, see [Tokens](/tokens).
:::

JSON Web Token (JWT), pronounced "jot", is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

* **Compact**: Because of its relatively small size, a JWT can be sent through a URL, through a POST parameter, or inside an HTTP header, and it is transmitted quickly.
* **Self-contained**: A JWT contains all the required information about an entity to avoid querying a database more than once. The recipient of a JWT also does not need to call a server to validate the token.

## Use of JWTs

Remember that JWT is a standard, which means that all JWTs are tokens, but not all tokens are JWTs. Keeping that in mind, JWTs can be used in varying ways:

- **Authentication**: When a user successfully logs in using their credentials, an [ID Token](/tokens/id-token) is returned. According to the [OpenID specs](https://openid.net/specs/openid-connect-core-1_0.html#IDToken), an ID Token is always a JWT.

- **Authorization**: Once a user is successfully logged in, an application may request to access routes, services, or resources on behalf of that user. To do so, it uses an [Access Token](/tokens/overview-access-token), which may be in the form of a JWT. Each subsequent request includes the JWT. Single Sign On widely uses JWT nowadays because of JWT's small overhead and its ability to easily be used across different domains.

- **Information Exchange**: JWTs are a good way of securely transmitting information between parties because they can be signed, which means you can be sure that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with.

::: warning
However you use JWTs, be sure to follow [best practices for tokens](/tokens/concepts/token-best-practices).
:::


## How do JSON Web Tokens work?

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials, great care must be taken to prevent security issues. In general, you should not keep tokens longer than required.

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the **Authorization** header using the **Bearer** schema. The content of the header should look like the following:

```text
Authorization: Bearer <token>
```

This can be, in certain cases, a stateless authorization mechanism. The server's protected routes will check for a valid JWT in the `Authorization` header, and if it's present, the user will be allowed to access protected resources. If the JWT contains the necessary data, the need to query the database for certain operations may be reduced, though this may not always be the case.

If the token is sent in the `Authorization` header, Cross-Origin Resource Sharing (CORS) won't be an issue as it doesn't use cookies.

The following diagram shows how a JWT is obtained and used to access APIs or resources:

![How a JSON Web Token works](/media/articles/jwt/client-credentials-grant.png)

1. The application or client requests authorization to the authorization server. This is performed through one of the different authorization flows. For example, a typical [OpenID Connect](http://openid.net/connect/) compliant web application will go through the `/oauth/authorize` endpoint using the [authorization code flow](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth).
2. When the authorization is granted, the authorization server returns an access token to the application.
3. The application uses the access token to access a protected resource (like an API).

## How to implement JWT

The information contained within the JSON object can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the **HMAC** algorithm) or a public/private key pair using **RSA** or **ECDSA**.

Although JWTs can be encrypted to also provide secrecy between parties, we will focus on *signed* tokens. Signed tokens can *verify the integrity* of the claims contained within them, while encrypted tokens *hide* those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.


To learn about the structure of a JWT, refer to [JSON Web Token (JWT) Structure](/tokens/reference/jwt/jwt-structure).

::: warning
However you use a JWT, you must [verify its signature](/tokens/guides/id-token/validate-id-token#verify-the-signature) before storing and using it.
:::

The safest way to implement JWT-based authentication, is to use one of the existing open source libraries. In [JWT.io](https://jwt.io/#libraries-io) you can find several, for .NET, Python, Java, Ruby, Objective-C, Swift, PHP, and more.

To verify JWT (or manually create one), you can use the [JWT.io Debugger](https://jwt.io/#debugger-io).

## JWT vs SWT vs SAML

Let's talk about the benefits of **JSON Web Tokens (JWT)** when compared to **Simple Web Tokens (SWT)** and **Security Assertion Markup Language Tokens (SAML)**.

As JSON is less verbose than XML, when it is encoded its size is also smaller, making JWT more compact than SAML. This makes JWT a good choice to be passed in HTML and HTTP environments.

Security-wise, SWT can only be symmetrically signed by a shared secret using the HMAC algorithm. However, JWT and SAML tokens can use a public/private key pair in the form of a X.509 certificate for signing. Signing XML with XML Digital Signature without introducing obscure security holes is very difficult when compared to the simplicity of signing JSON.

JSON parsers are common in most programming languages because they map directly to objects. Conversely, XML doesn't have a natural document-to-object mapping. This makes it easier to work with JWT than SAML assertions.

Regarding usage, JWT is used at Internet scale. This highlights the ease of client-side processing of the JSON Web token on multiple platforms, especially mobile.

![Comparing the length of an encoded JWT and an encoded SAML](/media/articles/jwt/comparing-jwt-vs-saml2.png)
_Comparison of the length of an encoded JWT and an encoded SAML_


## Read More

::: next-steps
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
* [10 Things You Should Know About Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/angularjs-authentication-with-cookies-vs-token/)
* [Best Practices for Tokens](/tokens/concepts/token-best-practices)
:::
