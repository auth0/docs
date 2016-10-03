---
title: Auth0 id_token
---

# Auth0 ID Token

## Overview

The id token, usually referred to as `id_token` in code samples, is a JWT that contains user profile data. It is consumed by the client and used to get user information like the users name, email, and so forth, typically used for UI display. It was added to the OIDC specification as an optimization so the client can know the identity of the user, without having to make an additional network requests.

The `id_token` conforms to an industry standard (IETF [RFC 7519](https://tools.ietf.org/html/rfc7519)) and contains three parts: a header, a body and a signature.
- The header contains the type of token and the hash algorithm used on the contents of the token.  
- The body, also called the payload, contains identity claims about a user.  There are some claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added, though care must be taken to keep the JWT within the browser size limitations for URLs.  
- The signature which is used by the recipient of a JWT to validate the integrity of the information conveyed in the JWT.

## How to get the id_token

The `id_token` is returned when calling any of the Auth0 functions which invoke authentication.  This includes calls to the Lock widget, to the auth0.js library, or the libraries for other languages. For example, you can view the implementation details for retrieving the `id_token` at the [Lock web library](/libraries/lock) and [Auth0.js library](/libraries/auth0js) documents.

## How to control the contents of the id_token

The contents of the `id_token`, specifically the claims contained within it, are controlled by the use of a [parameter called `scope`](/scopes) which is passed to the authentication functions mentioned above.  For example, the `options` object used in Lock’s instantiation can specify optional [authentication parameters](/libraries/lock/v10/customization#auth-object-) as follows:

```js
var options = {
  auth: {
    responseType: 'token',
    params: {scope: 'openid name email'}
  }
};

var lock = new Auth0Lock(
  ${account.clientId},
  ${account.namespace},
  options
);

lock.show();
```

The above sample, specifying `openid name email` will result in a JWT with claims for the name and email attributes within the user profile.  The `responseType` should be `token` for client-side authentication flows and `code` for server-side authentication flows as described for the `/authorize` endpoint in the [authentication API](/api/authentication).

The scope of the id_token JWT can also be altered via Rules, through the `context.jwtConfiguration.scopes` object, as documented in [Context Argument Properties in Rules](/rules/context).

## Validity

The `id_token` is valid for 10 hours (36000 seconds) by default.  The expiration of this token can be set in the [Dashboard > Clients > Settings](${manage_url}/#/clients/${account.clientId}/settings) screen using the `JWT Expiration (seconds)` field.

The validity period of the token can also be altered via [Auth0 Rules](/rules) using the `context.jwtConfiguration.lifetimeInSeconds` object as documented in [Context Argument Properties in Rules](/rules/context).

For example, the following code in a rule would set the `id_token` JWT expiration to 1 hour.

```
context.jwtConfiguration.lifetimeInSeconds = 3600;
```

## Renewal of the token

A new `id_token` can be obtained using an existing, unexpired `id_token` or by using a [refresh token](/tokens/refresh-token) and the `/delegation` endpoint.

To use an existing, unexpired `id_token` to obtain a new one, you can use the `renewIdToken` function of the `auth0.js` library.

```js
auth0.renewIdToken(current_id_token, function (err, delegationResult) {
  // Get here the new delegationResult.id_token
});
```

To get a new `id_token` when the existing `id_token` has expired, you can use a [refresh token](/tokens/refresh-token) and the [`/delegation`](/api/authentication#!#post--delegation) endpoint.

Alternatively, you can use the `refreshToken` function of the `auth0.js` library.

```js
auth0.refreshToken(refresh_token, function (err, delegationResult) {
  // Get here the new delegationResult.id_token
});
```

## Termination of the token

Once issued, tokens can not be revoked in the same fashion as cookies with session id’s for server-side sessions.  As a result, tokens should be issued for relatively short periods, and then [renewed](#renewing-the-token) periodically if the user remains active.

## More Information

* [Overview of JSON Web Tokens](/jwt)
* [A writeup on the contents of a JSON Web Token](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
* [Wikipedia page on JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token)
* [IETF RFC for JWT](https://tools.ietf.org/html/rfc7519)
* [Debugger for viewing JSON Web Tokens](http://jwt.io/)
* [Using JWTs as API keys](https://auth0.com/blog/2014/12/02/using-json-web-tokens-as-api-keys/)
* [Blacklisting JWTs](https://auth0.com/blog/2015/03/10/blacklist-json-web-token-api-keys/)
* [Vulnerabilities in use of JWT’s by libraries](https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/)
* [Cookies vs Tokens](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
* [Ten things about tokens](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/)
* [Description of the JWT expiration](/applications)
* [Discussion of web apps vs apis, cookies vs tokens](/apps-apis)
* [What happens if the ID token is too large?](https://auth0.com/forum/t/id-token-is-too-large/3116)
* [Why JWT is getting more popular](https://auth0.com/blog/2015/07/21/jwt-json-webtoken-logo/)
* [Sample for altering scopes in a Rule](https://github.com/auth0/rules/blob/dff2a3e72f01d33af3086414be7cf115b19eea0c/rules/custom-scopes.md)
