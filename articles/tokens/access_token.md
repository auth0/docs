---
title: Auth0 access_token
sitemap: false
---

# Auth0 `access_token`

## Overview

The Auth0 access token, usually called `access_token` in the code samples, is a [JSON Web Token](/jwt) which can be used to authorize users of your APIs when using our [API Authentication](/api-auth)

It conforms to an industry standard (IETF RFC 7519) and contains three parts: A header, a body and a signature. The header contains the type of token and the hash algorithm used on the contents of the token.  

The body, also called the payload, contains identity claims about a user.  There are some non-mandatory claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added, though care must be taken to keep the JWT within the browser size limitations for URLs.  

The third part of the JWT is the signature which is used by the recipient of a JWT to validate the integrity of the information conveyed in the JWT.

The [Auth0.js documentation](/libraries/auth0js) shows a sample of how to get the `access_token`.

::: warning-banner
The `access_token` used to be an opaque string that was used to call the Auth0 API, and in some circumstances it still is. For more details on when the `access_token` is a JWT, and when it is an opaque string, please see [Access Token vs ID Token](/tokens/access_token-vs-id_token)

!! Must still do this doc !!
:::


## How to get Auth0 access token

The Auth0 access token can be obtained in several ways.
Calls to Lock or library functions that invoke authentication will return the `access_token`.

* Calls to the Lock widget will return `access_token` as shown in the [Lock documentation](/libraries/lock) ?? Is this true - can we still use lock ??
* [Examples using auth0.js](https://github.com/auth0/auth0.js) ?? is this still true ??
* The [/i/oauth2/authorize endpoint in the authentication API](/auth-api) when using the Authorization Code Grant flow or Implicit Grant flow will return an `access_token`
* The [?? endpoint in the authentication API](??) when using Client Credentials Grant will issue an `access_token`
* Check the [List of tutorials](/tutorials) to see how to make calls to libraries for other languages/SDKs.

## How to control contents of access token

The contents of the `access_token`, specifically the claims contained within it, are controlled by the use of a parameter called `scope` which is passed to the authentication functions mentioned above.  For example, the call to the Lock widget’s `.show` function can specify optional authentication parameters as follows:

?? Is this still true - can we use lock ??

```
lock.show({
   responseType: ‘token’,
   authParams: {
      scope: ‘appointments contacts’
    }
 });
```
The above sample, specifying `appointments contacts` will result in a JWT with claims for accessing appointments and contacts. The responseType should be `token` for Implicit Grant flow and `code` for Authorization Code Grant flow.

The scope of the `access_token` JWT can also be altered via Rules, through the context.jwtConfiguration.scopes object as documented [here](https://github.com/auth0/docs/blob/32033877180affa26233b8f65cb28bd532514eab/articles/rules/index.md#context) ?? Should be still suggest this. Also AFAIK rules won't work anymore with the new endpoint ??

There is a [sample for altering scopes in a Rule](https://github.com/auth0/rules/blob/dff2a3e72f01d33af3086414be7cf115b19eea0c/rules/custom-scopes.md)

Additional information on the `access_token` is [here](/jwt)

A valid JWT can be pasted into the [jwt.io website](https://jwt.io) to view the contents of the JWT.

A [blog entry on JWT](https://auth0.com/blog/2015/07/21/jwt-json-webtoken-logo/) provides an explanation of why it is getting to be more popular.

[Additional samples](https://github.com/auth0/auth0.js) show use of the auth0.js library.

## Validity

In the case of the [authorization code grant](/api-auth/grant/authorization-code) and the [implicit code grant](/api-auth/grant/implicit) flows the `access_token` is valid for ???

In the case of the [client credentials flow](/api-auth/grant/client-credentials), the `access_token` is valid for 8000 seconds (roughly 2.25 hours) by default.  !!The expiration of this token can be set in the `Apps/APIs` -> Settings screen using the `JWT expiration` field!!

The validity period of the token can be configured per [Resource Server](??)

## Renewing the token

?? How do we get a refresh token ??
?? How do we use the refresh token to obtain a new access token ??

## Termination of the token

Once issued, tokens can not be revoked in the same fashion as cookies with session id’s for server-side sessions.  As a result, tokens should be issued for relatively short periods, and then renewed periodically if the user remains active.  See the above section on renewing access tokens.

## Uses

The `access_token` is designed to be used to pass information about a user between websites,  web programs and APIs in an industry standard, URL-friendly fashion.  One advantage of using an `access_token` for this purpose is that the recipient can validate the token without having to make a call back to the issuer of the token.  The token is also designed to enable being passed from one web property to another, via an untrusted client, such that the client cannot alter the token without such tampering being evident to the recipient.

It can also be used to call the /userinfo endpoint within the authentication API to get user profile information as documented [here](/auth-api#user-profile) (?? is this still valid ??)

The `access_token` can also be used to [call other APIs](/api-auth).


## Best practices

This section contains pointers on best practices related to the `access_token`.

### Token Validation

Single Page Applications or mobile apps do not need to validate the JWT as they just pass it to something else.  Server side APIs that receive the JWT, however, do need to validate  it. There are server-side APIs to do such validation such as this [example for node.js](https://github.com/auth0/node-jsonwebtoken).

There is a [blog post with advice about vulnerabilities to avoid in use of JWTs](https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/).

If there is any sensitive information included in the JWT, it should be encrypted, but the need for this is not common.

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
