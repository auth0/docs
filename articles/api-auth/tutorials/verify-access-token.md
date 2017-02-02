---
description: How an API can verify a bearer JWT access token
---

# Verify Bearer JWT Access Tokens

When an API receives a request with a bearer access token, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

This document lists all the validations that your API should perform:
- Check that the JWT is well formed
- Check the signature
- Validate the standard claims
- Check the Client permissions (scopes)

<div class="alert alert-info"><a href="https://jwt.io/">JWT.io</a> provides a list of libraries that can do most of the work for you: parse the JWT, verify the signature and the claims.</div>

<i class="notification-icon icon-budicon-764"></i> __NOTE__: [JWT.io](https://jwt.io/) provides a list of libraries that can do most of the work for you: parse the JWT, verify the signature and the claims.

<div class="auth0-notification frendly"><i class="notification-icon icon-budicon-764"></i>
  <p><a href="https://jwt.io/">JWT.io</a> provides a list of libraries that can do most of the work for you: parse the JWT, verify the signature and the claims.
</div>

## Parse the JWT

First, the API needs to parse the JSON Web Token (JWT) to make sure it's well formed. If this fails the token is considered invalid and the request must be rejected.

A well formed JWT, consists of three strings separated by dots (.): the header, the payload and the signature. Typically it looks like the following:

![Sample JWT](/media/articles/api-auth/sample-jwt.png)

The header and the payload are Base64Url encoded. The signature is created using these two, a secret and the hashing algorithm being used (as specified in the header: HMAC, SHA256 or RSA).

For details on the JWT structure refer to [What is the JSON Web Token structure?](/jwt#what-is-the-json-web-token-structure-).

### How can my API parse the JWT?

In order to parse the JWT you can either manually implement all the checks as described in the specification [RFC 7519 > 7.2 Validating a JWT](https://tools.ietf.org/html/rfc7519#section-7.2), or use one of the libraries listed in the _Libraries for Token Signing/Verification_ section of [JWT.io](https://jwt.io/).

For example, if my API is implemented with Node.js and I want to use the [node-jsonwebtoken library](https://github.com/auth0/node-jsonwebtoken), then I would call the [jwt.verify()](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method. If the parsing fails then the library will return a [JsonWebTokenError error](https://github.com/auth0/node-jsonwebtoken#jsonwebtokenerror) with the message `jwt malformed`.

### How can I visually inspect a token?

A quick way to see what is inside a JWT is by using the [JWT.io](https://jwt.io/) website (alternatively, you can use the [JWT Debugger Chrome Extension](https://chrome.google.com/webstore/detail/jwt-debugger/ppmmlchacdbknfphdeafcbmklcghghmd?hl=en)). It has a handy debugger which allows you to quickly check that a JWT is well formed, and also inspect the values of the various claims.

Just paste your token at the _Encoded_ text area and review the decoded results at the right.

![Decode JWT with JWT.io](/media/articles/api-auth/decode-jwt.png)

## Check the Signature

The API needs to check if the algorithm, as specified by the JWT header (property `alg`), matches the one expected by the API. If not, the token is considered invalid and the request must be rejected.

In this case the mismatch might be due to mistake (it is common that the tokens are signed using the `HS256` signing algorithm, but your API is configured for `RS256`, or vice versa), but it could also be due to an attack, hence the request has to be rejected.

### How can my API check the signature?

To check if the signature matches the API's expectations, you have to decode the JWT and retrieve the `alg` property of the JWT header.

Alternatively, you can use one of the libraries listed in the _Libraries for Token Signing/Verification_ section of [JWT.io](https://jwt.io/).

Following the Node.js example of the previous section, the [jwt.verify()](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method of the [node-jsonwebtoken library](https://github.com/auth0/node-jsonwebtoken), supports an `algorithms` argument, that contains a list of strings with the names of the allowed algorithms.

## Validate the Claims

### How can my API validate the claims?

## Check the Permissions

### How can my API check the permissions?

## More information

[RFC 7519 - JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)

[JSON Web Tokens (JWT) in Auth0](/jwt)
