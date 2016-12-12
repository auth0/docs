---
title: ID token
description: How to obtain, use and renew an id_token.
---

# ID Token

## Overview

The ID token, usually referred to as `id_token` in code samples, is a [JSON Web Token (JWT)](/jwt) that contains user profile attributes represented in the form of _claims_. These claims are statements about the user, which can be trusted if the consumer of the token can verify its signature, which is generated with the Auth0 app's Client Secret in the case of `HS256`. In case the client uses `RS256` encryption then the `id_token` will be signed with a private key and verified with a public key.

The `id_token` is consumed by the client and used to get user information like the user's name, email, and so forth, typically used for UI display. It was added to the OIDC specification as an optimization so the client can know the identity of the user, without having to make an additional network requests.

The `id_token` conforms to an industry standard (IETF [RFC 7519](https://tools.ietf.org/html/rfc7519)) and contains three parts: a header, a body and a signature.
- The header contains the type of token and the hash algorithm used on the contents of the token.  
- The body, also called the payload, contains identity claims about a user.  There are some claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added. For the cases where the `id_token` is returned in URLs, care must be taken to keep the JWT within the browser size limitations for URLs.
- The signature is used by the recipient to verify that the sender of the JWT is who it says and to ensure that the message wasn't changed along the way.

## How to get an ID token

The `id_token` can be returned when calling any of the Auth0 functions which invoke authentication.  This includes calls to the Lock widget, to the auth0.js library, or the libraries for other languages. You can view the implementation details for retrieving the `id_token` at the [Lock web library](/libraries/lock) and [Auth0.js library](/libraries/auth0js) documents.

## How to validate an ID token

The way to validate an ID token depends on the hash algorithm used by your Client:
- If you used `HS256` then the token is signed with the Client Secret, using the HMAC algorithm. You can verify the signature using the Client Secret value, which you can find at the _[Client Settings](${manage_url}/#/clients/${account.clientId}/settings)_ page.
- If you used `RS256` then the token is signed with a public/private key pair, using RSA. You can verify the signature using the Public Key or Certificate, which you can find at the _[Client Settings](${manage_url}/#/clients/${account.clientId}/settings) > Show Advanced Settings > Certificates_ page.

To check or update the algorithm your Client uses go to _[Client Settings](${manage_url}/#/clients/${account.clientId}/settings) > Show Advanced Settings > OAuth > JsonWebToken Signature Algorithm_. The most secure practice, and our recommendation, is to use `RS256`.

## How to control the contents of an ID token

In order to retrieve an `id_token` the `responseType` should be set to `id_token`, both for client-side and server-side authentication flows.

::: panel-warning OAuth2 as a Service
If you are not using *OAuth2 as a Service*, then you should use `code` for server side flows and `token` for client side flows.
:::

The attributes included in the issued `id_token` are controlled by the use of a [parameter called `scope`](/scopes).
- If `scope` is set to `openid`, then the `id_token` will contain only the `iss`, `sub`, `aud`, `exp` and `iat` claims.
- If `scope` is set to `openid email`, then the `id_token` will contain additionally the `email` and `email_verified` claims.
- If `scope` is set to `openid profile`, then the `id_token` will contain all default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.

If you are using Lock, the `options` object used in Lock’s instantiation can specify optional [authentication parameters](/libraries/lock/v10/customization#auth-object-) as follows:

```js
var options = {
  auth: {
    responseType: 'id_token',
    params: {scope: 'openid email'}
  }
};

var lock = new Auth0Lock(
  ${account.clientId},
  ${account.namespace},
  options
);

lock.show();
```

The `id_token` will contain only the claims specified as the value of the `scope` parameter.

**NOTE:** You can also add claims to the `id_token` using [Rules](/rules), with the following format: `context.idToken['http://my-custom/claim'] = 'some-value'`.

## Lifetime

The `id_token` is valid for 10 hours (36000 seconds) by default.  The value can be changed in the [Dashboard > Clients > Settings](${manage_url}/#/clients/${account.clientId}/settings) screen using the `JWT Expiration (seconds)` field.

There are cases where you might want to renew your `id_token`. In order to do so, you can either perform another authorization flow with Auth0 (using the `/authorize` endpoint) or use a [Refresh Token](/tokens/refresh-token).

If you are using auth0.js then you can fetch a new token using:

```js
auth0.silentAuthentication({}, function(err, result){
  // Get here the new result.id_token
})
```

For more information refer to [Silent Authentication](https://github.com/auth0/auth0.js#silent-authentication).

When performing the initial authorization flow, you can ask for a `refresh_token`, by adding `offline_access` at the `scope` parameter, for example `scope=openid offline_access`. The `refresh_token` is stored in session, alongside with the `id_token`. Then when a session needs to be refreshed (for example, a preconfigured timeframe has passed or the user tries to perform a sensitive operation), the app uses the `refresh_token` on the backend to obtain a new `id_token`, using the `/oauth/token` endpoint with `grant_type=refresh_token`.

For more information on refresh tokens and how to use them refer to: [Refresh Token](/tokens/refresh-token).

## Revoke access

Once issued, tokens can not be revoked in the same fashion as cookies with session id’s for server-side sessions.  As a result, tokens should be issued for relatively short periods, and then [renewed](#lifetime) periodically if the user remains active.

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
