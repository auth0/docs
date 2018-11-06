---
title: Protect My API: Register Your API with Auth0
description: Learn how to register your API with Auth0, the first step in protecting your API.
ctaText: Quickstarts
ctaLink: /docs/quickstart/backend
contentType: tutorial
template: microsite
topics: api
useCase: secure-api
---


# Protect My API: Validate an Access Token

So your API is configured with Auth0 and applications are now sending you requests that include Access Tokens. Let’s make sure that the sender of a token is who it says it is and ensure that the message wasn't changed along the way.

## Prerequisites

- [ ] [Register your API with Auth0](/microsites/protect-my-api/register-api-with-auth0)
- [ ] If you are calling an API from your own application, [Call an API]()

## To do

- [ ] Extract the Access Token
- [ ] Check that the Access Token is well formed
- [ ] Retrieve and filter your Auth0 JSON Web Key Set (JWKS)
- [ ] Verify the Access Token's signature
- [ ] Verify the claims found inside the Access Token
- [ ] Compare permissions included in the Access Token with scopes configured for your API

If any of these steps fail, then you must reject the request.

## Validate an Access Token

Are you ready to validate an Access Token? Let's go!

### Extract the Access Token
There are three ways by which your users can send the golden ticket...er, [Access Token](/tokens/concepts/overview-access-tokens) that grants them the right to call your API. The OAuth 2.0 specification calls for its [inclusion in the HTTP Authorization Header](/api-auth/tutorials/authorization-code-grant#3-call-the-api) whenever possible, so this is the method we recommend accepting. For code samples, choose your technology in our [Auth0 Backend/API Quickstarts](/quickstart/backend).

### Check that the Access Token is well formed
For your API, Auth0 will generate the Access Token in [JSON Web Token (JWT) format](/jwt#what-is-the-json-web-token-structure-). Before doing anything else, your API should parse the Access Token to make sure it conforms to the structure of a JWT.

A well-formed JWT consists of three concatenated Base64-encoded strings, separated by dots: 

- Header: contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
- Payload (set of claims): contains verifiable security statements such as the identity of the user and the permissions they are allowed.
- Signature: used to validate that the token is trustworthy and has not been tampered with.

To see for yourself what is inside a JWT, use the [JWT.io Debugger](https://jwt.io/#debugger). It will allow you to quickly check that a JWT is well formed and manually inspect the values of the various claims.

::: panel How can I programmatically parse the Access Token?

To programmatically parse the Access Token, you can either:

- manually implement all the checks as described in specification [RFC 7519 > 7.2 Validating a JWT](https://tools.ietf.org/html/rfc7519#section-7.2)
- choose a third-party library from [JWT.io](https://jwt.io/#libraries)
- use any existing middleware for your web framework

If you choose a third-party library, remember to pick a library that supports the signing algorithm you selected when you registered your API with Auth0. Also, since you will probably use this library again when you validate the JWT's standard claims, be aware that not all libraries validate all claims. At [JWT.io](https://jwt.io/), you can see which validations each library supports (look for the green check marks).
:::

### Retrieve and filter your Auth0 JSON Web Key Set (JWKS)
Auth0 follows the [JSON Web Key (JWK) specification](https://tools.ietf.org/html/rfc7517) when signing tokens. At the most basic level, your Auth0 [JSON Web Key Set (JWKS)](/jwks) is a set of keys containing the public keys that should be used to verify the Access Token.

Auth0 exposes a [discovery endpoint](/protocols/oidc/openid-connect-discovery), which exists at https://YOUR_AUTH0_DOMAIN/.well-known/openid-configuration. You can use this endpoint to automatically configure your application and locate the JWKS endpoint (`jwks_uri`), which contains the JWKs used to sign all Auth0-issued JWTs for your API.

::: panel How many signing keys should I expect?

It's good practice to assume that multiple signing keys could be present in your JWKS. This may seem unnecessary since the Auth0 JWKS endpoint typically contains a single signing key; however, multiple keys can be found in the JWKS when rotating signing certificates.

You will also probably want to filter out any keys missing a public key or a [`kid` property](/jwks) since later, you will use the `kid` property to match the key in your JWKS with the key specified in the Access Token.
:::

::: panel Should I cache my signing keys?
You can cache your signing keys to improve application performance and avoid running into [rate limits](/policies/rate-limits#authentication-api), but you will want to make sure that if decoding a token fails, you invalidate the cache and retrieve new signing keys before trying only one more time.
:::

### Verify the Access Token's signature

The last part of a JWT is the signature, which is used to verify that the token was signed by the sender and not altered in any way. You will need to Base64-decode the Access Token to do this.

#### Check the signing algorithm

Check that the algorithm (alg) specified in the header of the decoded Access Token matches the one you selected when you registered your API with Auth0.

#### Confirm that the Access Token is correctly signed using the proper key

To do this, you will need to:

- Grab the `kid` property from the header of the decoded Access Token
- Search your filtered JWKS for the key with the matching `kid` property
- Build a certificate using the corresponding `x5c` property in your JWKS
- Use the certificate to verify the Access Token's signature

### Verify the claims found inside the Access Token

Once your API verifies the token’s signature, it should check the claims contained in the decoded Access Token's payload.

Check that:

- the token expiration date/time (exp, Unix timestamp) has not passed
- the issuing authority (iss) inside the token matches the issuing authority (issuer) identified in your Auth0 tenant's discovery document, which exists at https://YOUR_AUTH0_DOMAIN/.well-known/openid-configuration
- the token audience (aud) identifies the recipients for which the JWT is intended–namely, the unique identifier of your API in the Auth0 Dashboard

::: panel What if my API needs user data?
[APIs should be accessed using Access Tokens](/api-auth/why-use-access-tokens-to-secure-apis), which are bearer tokens. Bearer tokens allow the bearer to access authorized resources without further identification. They may, however, contain the user_id in the sub claim. Thus, if your API needs user info, you can retrieve it by passing the Access Token to the [Auth0 Authentication API /userinfo endpoint](/api/authentication#user-profile).

Limitations:

- The `sub` claim is empty for Client Credentials grants since these are used for machine to machine applications (to which the token is issued rather than to an end user)
- The `scope` claim must include the value openid, and you must have selected RS256 as the signing algorithm for your API. When done, the `aud` claim of the JWT will include both your API's unique identifier and YOUR_AUTH0_DOMAIN/userinfo.
:::

### Compare permissions included in the Access Token with scopes configured for your API

To check the sender's permissions, you will need to evaluate the decoded Access Token's scope claim. The scope claim contains a space-separated list of requested permissions. If the permissions contained in this list are authorized for your API, then your API can process the request.

Example:
An API provides three endpoints that allow user records to be read (/read), created (/create), or deleted (/delete).

The /read endpoint requires the read:users scope
The /create endpoint requires the create:users scope
The /delete endpoint requires the delete:users scope
An application requests to access the /read endpoint, and the scope claim of its Access Token includes the value read:users. Your API should allow access.

An application requests to access the /create endpoint, but the scope claim does not include the value create:users. Your API should reject the request.

## What's next?
??

## Related reading

:::: card-panel--grid
::: card-panel
### Guides

[Verify Access Tokens for Custom APIs](/api-auth/tutorials/verify-access-token)
[Manually Verify an RS256-signed Token](/guides/manually-verify-signed-token)
[Revoke Access to Your API](/api-auth/blacklists-vs-grants)
[Restrict Application or User Requests for API Scopes](/api-auth/restrict-requests-for-scopes)
:::

::: card-panel--half
### Concepts

[Access Token](/tokens/concepts/overview-access-tokens)
[Why You Should Always Use Access Tokens to Secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
[Signing Algorithms](/concepts/signing-algorithms)
[JSON Web Key Set (JWKS)](/jwks)
[JSON Web Tokens (JWT) in Auth0](/jwt)
[Scopes](/scopes/current/index)
[API Scopes](/scopes/current/api-scopes)
[OIDC Scopes](/scopes/current/oidc-scopes)
[Custom Claims](/scopes/current/custom-claims)
:::

::: card panel--half
### References

[Auth0 Backend/API Quickstarts](/quickstart/backend)
[Auth0 Authentication API](/api/authentication)
:::
::::
