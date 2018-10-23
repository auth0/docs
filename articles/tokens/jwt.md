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

<%= include('../_includes/_video', { id: 'dxfz716cw9' }) %>

## What is JSON Web Token?

JSON Web Token (JWT), pronounced "jot", is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. The information contained within the JSON object can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the **HMAC** algorithm) or a public/private key pair using **RSA** or **ECDSA**.

Although JWTs can be encrypted to also provide secrecy between parties, we will focus on *signed* tokens. Signed tokens can *verify the integrity* of the claims contained within them, while encrypted tokens *hide* those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.

## What are JSON Web Tokens used for?

Here are some scenarios where JSON Web Tokens are useful:

- **Authorization**: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On widely uses JWT nowadays because of its small overhead and its ability to easily be used across different domains.

- **Information Exchange**: JSON Web Tokens are a good way of securely transmitting information between parties because since they can be signed, you can be sure that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with.

## What is the JSON Web Token structure?

JSON Web Tokens consist of three Base64-encoded strings separated by dots (`.`), which can easily be passed in HTML and HTTP environments and are more compact than XML-based standards like SAML. These strings include:

- Header
- Payload
- Signature

Therefore, a JWT typically looks like the following:
![Encoded JWT](/media/articles/jwt/encoded-jwt3.png)


### Header

The header *typically* consists of two parts: the type of the token (JWT) and the hashing algorithm being used (e.g., HMAC SHA256 or RSA):

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```


### Payload

The payload contains statements about the entity (typically, the user) and additional data, which are called claims:

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

When working with [JWT claims](https://tools.ietf.org/html/rfc7519#section-4), you should be aware of [naming rules]. 



### Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

## Practice
To play with JWT and put these concepts into practice, you can use [jwt.io Debugger](http://jwt.io) to decode, verify, and generate JWTs.

![JWT.IO Debugger](/media/articles/jwt/legacy-app-auth-5.png)

## How do JSON Web Tokens work?

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials, great care must be taken to prevent security issues. In general, you should not keep tokens longer than required.

::: warning
You __must__ [verify a JWT's signature](/tokens/id-token#verify-the-signature) before storing and using it.
:::

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

## Best Practices

* **Keep it secret. Keep it safe.** The signing key should be treated like any other credentials and revealed only to services that absolutely need it.

* **Do not add sensitive data to the payload.** Tokens are signed to protect against manipulation and are easily decoded. Add the bare minimum number of claims to the payload for best performance and security.

* **Give tokens an expiration.** Technically, once a token is signed – it is valid forever – unless the signing key is changed or expiration explicitly set. This could pose potential issues so have a strategy for expiring and/or revoking tokens.

* **Embrace HTTPS.** Do not send tokens over non-HTTPS connections as those requests can be intercepted and tokens compromised.

* **Consider all of your authorization use cases.** Adding a secondary token verification system that ensure tokens were generated from your server, for example, may not be common practice, but may be necessary to meet your requirements.

## Read More

::: next-steps
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
* [10 Things You Should Know About Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/angularjs-authentication-with-cookies-vs-token/)
:::
