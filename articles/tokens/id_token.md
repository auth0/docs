---
title: Auth0 id_token
---

# Auth0 `id_token`

## Overview

The `id_token` is referred to by several names, including `id_token`, the [JSON Web Token](/jwt) or abbreviated as the JWT.  It conforms to an industry standard (IETF RFC 7519) and contains three parts: A header, a body and a signature. The header contains the type of token and the hash algorithm used on the contents of the token.  The body, also called the payload, contains identity claims about a user.  There are some non-mandatory claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added, though care must be taken to keep the JWT within the browser size limitations for URLs.  The third part of the JWT is the signature which is used by the recipient of a JWT to validate the integrity of the information conveyed in the JWT.

## How to get the `id_token`

The `id_token` is returned when calling any of the Auth0 functions which invoke authentication.  This includes calls to the Lock widget, to the auth0.js library, or the libraries for other languages.  In our code samples for Lock and auth0.js for example, there is a variable called `id_token` in the callback function passed to Lock and auth0.js which receives the `id_token`.

### Lock libraries:

* [Lock web library](/libraries/lock)
* [Lock iOS library](/libraries/lock-ios)
* [Lock Android library](/libraries/lock-android)

### Auth0.js

* [Auth0.js library](/libraries/auth0js)
* [Auth0.js in Github](https://github.com/auth0/auth0.js)

### Tutorials showing libraries for other languages

[List of Tutorials](/tutorials)

## How to control contents of `id_token`

The contents of the `id_token`, specifically the claims contained within it, are controlled by the use of a [parameter called `scope`](/libraries/lock/v10/sending-authentication-parameters#scope-string-) which is passed to the authentication functions mentioned above.  For example, the `options` object used in Lock’s instantiation can specify optional [authentication parameters](/libraries/lock/v10/customization#customization#auth-object-) as follows:

```js
var options = {
  auth: {
    responseType: 'token',
    params: {scope: 'openid name email'}
  }
}; 

var lock = new Auth0Lock(
  'YOUR_CLIENT_ID',
  'YOUR_NAMESPACE',
  options
);

lock.show();
```

The above sample, specifying `openid name email` will result in a JWT with claims for the name and email attributes within the user profile.  The `responseType` should be `token` for client-side authentication flows and `code` for server-side authentication flows as described for the `/authorize` endpoint in the [authentication API](https://auth0.com/docs/api/authentication)

The scope of the id_token JWT can also be altered via Rules, through the context.jwtConfiguration.scopes object as documented [here](/rules#context)

There is a [sample for altering scopes in a Rule](https://github.com/auth0/rules/blob/dff2a3e72f01d33af3086414be7cf115b19eea0c/rules/custom-scopes.md)

Additional information on the `id_token` is [here](/jwt)

A valid JWT can be pasted into the [jwt.io website](https://jwt.io) to view the contents of the JWT.

A [blog entry on JWT](https://auth0.com/blog/2015/07/21/jwt-json-webtoken-logo/) provides an explanation of why it is getting to be more popular.

[Additional samples](https://github.com/auth0/auth0.js) show use of the auth0.js library.

## Validity

The `id_token` is valid for 10 hours (36000 seconds) by default.  The expiration of this token can be set in the `Apps/APIs` -> Settings screen using the `JWT expiration` field.

The validity period of the token can be altered via Auth0 Rules using the context.jwtConfiguration.lifetimeInSeconds object as documented [here](/rules#context)

For example, the following code in a Rule would set the id_token JWT expiration to 1 hour.
```
context.jwtConfiguration.lifetimeInSeconds = 3600;
```

## Renewing the token

A new `id_token` can be obtained using an existing, unexpired `id_token` or by using a refresh token and the `/delegation` endpoint.

To use an existing, unexpired `id_token` to obtain a new one, use the `renewIdToken` function within auth0.js library as shown [here](https://github.com/auth0/auth0.js#refresh-token)

To get a new `id_token` when the existing `id_token` has expired, use a refresh token to get a new `id token`, as explained in the Refresh Token section below and also in the [Refresh Token article](/refresh-token)

The [auth0.js library refresh token call](https://github.com/auth0/auth0.js#refresh-token) can also be used to refresh an `id token`.

## Termination of the token

Once issued, tokens can not be revoked in the same fashion as cookies with session id’s for server-side sessions.  As a result, tokens should be issued for relatively short periods, and then renewed periodically if the user remains active.  See the above section on renewing id tokens.

## Uses

The `id_token` is designed to be used to pass information about a user between websites,  web programs and APIs in an industry standard, URL-friendly fashion.  One advantage of using an `id_token` for this purpose is that the recipient can validate the token without having to make a call back to the issuer of the token.  The token is also designed to enable being passed from one web property to another, via an untrusted client, such that the client cannot alter the token without such tampering being evident to the recipient.

The `id_token` can be used to call the /tokeninfo endpoint within the Auth0 authentication API to retrieve the user’s complete profile.  See the [/tokeninfo endpoint documentation](/auth-api#user-profile) for more details.

The `id_token` can also be used to call the /delegation endpoint within the Auth0 authentication API to obtain another token for another API.  See the [/delegation endpoint documentation](/auth-api#delegated) for more information.

The `id_token` can also be used to call other APIs.

The [Delegation token request sample](https://github.com/auth0/auth0.js#delegation-token-request) provides further examples of using the id_token for other APIs.

This [Animated Sequence Diagram](/sequence-diagrams) shows the sequence of calls used to get an `id_token`.

## Best Practices

This section contains pointers on best practices related to the `id_token`.

### Token Validation

Single Page Applications or mobile apps do not need to validate the JWT as they just pass it to something else.  Server side APIs that receive the JWT, however, do need to validate  it. There are server-side APIs to do such validation such as this [example for node.js](https://github.com/auth0/node-jsonwebtoken).

There is a [blog post with advice about vulnerabilities to avoid in use of JWTs](https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/).

If there is any sensitive information included in the JWT, it should be encrypted, but the need for this is not common.

## More Information on JSON Web Tokens

* [Overview of JSON Web Tokens](/jwt)
* [A writeup on the contents of a JSON Web Token](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
* [Wikipedia page on JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token)
* [IETF RFC for JWT](https://tools.ietf.org/html/rfc7519)
* [Debugger for viewing JSON Web Tokens](http://jwt.io/)
* [Blog posts related to tokens Using JWTs as API keys](https://auth0.com/blog/2014/12/02/using-json-web-tokens-as-api-keys/)
* [Blacklisting JWTs](https://auth0.com/blog/2015/03/10/blacklist-json-web-token-api-keys/)
* [Blog Post on vulnerabilities in use of JWT’s by libraries](https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/)
* [Blog Post: Cookies vs Tokens](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
* [Blog Post: Ten things about tokens](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/)
* [Description of the JWT expiration](/applications)
* [Discussion of web apps vs apis, cookies vs tokens](/apps-apis)
* [What happens if the ID token is too large?](https://auth0.com/forum/t/id-token-is-too-large/3116)
