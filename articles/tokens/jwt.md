---
url: /jwt
title: JSON Web Tokens (JWT) in Auth0
description: JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This article introduces you to all of the concepts needed to fully understand JWTs.
toc: true
tags:
  - tokens
  - jwt
---

# JSON Web Tokens (JWT) in Auth0

::: note
For more information on all the types of tokens used by Auth0, see [Tokens](/tokens).
:::

<%= include('../_includes/_video', { id: 'dxfz716cw9' }) %>

## What is JSON Web Token?

JSON Web Token (JWT) is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the **HMAC** algorithm) or a public/private key pair using **RSA**.

Let's explain some concepts of this definition further.

- **Compact**: Because of its smaller size, JWTs can be sent through a URL, POST parameter, or inside an HTTP header. Additionally, the smaller size means transmission is fast.

- **Self-contained**: The payload contains all the required information about the user, avoiding the need to query the database more than once.

## What a JSON Web Token is used for?

Here are some scenarios where JSON Web Tokens are useful:

- **Authentication**: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.

- **Information Exchange**: JSON Web Tokens are a good way of securely transmitting information between parties, because as they can be signed, for example using public/private key pairs, you can be sure that the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

## What is the JSON Web Token structure?

JSON Web Tokens consist of three parts separated by dots (`.`), which are:

- Header
- Payload
- Signature

Therefore, a JWT typically looks like the following.

`xxxxx.yyyyy.zzzzz`

Let's break down the different parts:

### Header

The header *typically* consists of two parts: the type of the token, which is JWT, and the hashing algorithm being used, such as HMAC SHA256 or RSA.

For example:

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Then, this JSON is **Base64Url** encoded to form the first part of the JWT.

### Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional metadata.

When working with [JWT claims](https://tools.ietf.org/html/rfc7519#section-4), there are some rules you should be aware of when it comes to naming (especially if you are using self-defined custom claims).

The JWT specification defines seven claims that can be included in a token. These are **registered claim names**, and they are:

* iss
* sub
* aud
* exp
* nbf
* iat
* jti

For your specific use case, you might then use what are called **public claim names**. Examples of these include:

* auth_time
* acr
* nonce

Finally, there are **private claim names**, which you can use to convey identity-related information, such as name or department.

Because public and private claims are not registered, take care to avoid name collisions. If a collision does occur, it can be difficult to tease apart two claims of the same name, but with differing information.

An example of payload could be:

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

The payload is then **Base64Url** encoded to form the second part of the JSON Web Token.

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

### Putting all together

The output is three Base64 strings separated by dots that can be easily passed in HTML and HTTP environments, while being more compact when compared to XML-based standards such as SAML.

The following shows a JWT that has the previous header and payload encoded, and it is signed with a secret.
![Encoded JWT](/media/articles/jwt/encoded-jwt3.png)

If you want to play with JWT and put these concepts into practice, you can use [jwt.io Debugger](http://jwt.io) to decode, verify, and generate JWTs.

![JWT.IO Debugger](/media/articles/jwt/legacy-app-auth-5.png)

## How do JSON Web Tokens work?

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned and must be saved locally (typically in local storage, but cookies can be also used), instead of the traditional approach of creating a session in the server and returning a cookie.

::: warning
You __must__ [verify a JWT's signature](/tokens/id-token#verify-the-signature) before storing and using it.
:::

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the **Authorization** header using the **Bearer** schema. The content of the header should look like the following:

```text
Authorization: Bearer <token>
```

This is a stateless authentication mechanism as the user state is never saved in server memory.
The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources. As JWTs are self-contained, all the necessary information is there, reducing the need to query the database multiple times.

This allows you to fully rely on data APIs that are stateless and even make requests to downstream services. It doesn't matter which domains are serving your APIs, so Cross-Origin Resource Sharing (CORS) won't be an issue as it doesn't use cookies.

The following diagram shows this process:

![How a JSON Web Token works](/media/articles/jwt/jwt-diagram.png)

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
* [JWT Handbook](https://auth0.com/e-books/jwt-handbook)
* [10 Things You Should Know About Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/angularjs-authentication-with-cookies-vs-token/)
:::
