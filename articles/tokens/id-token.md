---
description: How to obtain, use, and renew an ID Token.
toc: true
topics:
  - tokens
  - id-tokens
contentType:
  - how-to
  - concept
useCase:
  - invoke-api
---
# ID Token

## Overview

The ID Token is a [JSON Web Token (JWT)](/jwt) that contains user profile information (like the user's name, email, and so forth), represented in the form of **claims**. These claims are statements about the user, which can be trusted if the consumer of the token can [verify its signature](#validate-an-id-token).

You can get an ID Token for a user after they successfully authenticate.

::: warning
Υou __must__ [verify the ID Token's signature](#verify-the-signature) before storing and using it.
:::

You will need to decode this token to read the claims (or attributes) of the user. The JWT website provides a [list of libraries you can use to decode](https://jwt.io/#libraries-io) the ID Token.

The ID Token is consumed by the application and the claims included, are typically used for UI display. It was added to the OIDC specification as an optimization so the application can know the identity of the user, without having to make an additional network requests.

::: note
If you need a refresher on OIDC refer to [OpenID Connect](/protocols/oidc).
:::

The ID Token conforms to an industry standard (IETF [RFC 7519](https://tools.ietf.org/html/rfc7519)) and contains three parts: a header, a body and a signature.

- The header contains the type of token and the hash algorithm used on the contents of the token.

- The body, also called the payload, contains identity claims about a user.  There are some claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added. For the cases where the ID Token is returned in URLs, care must be taken to keep the JWT within the browser size limitations for URLs.

- The signature is used by the recipient to verify that the sender of the JWT is who it says and to ensure that the message wasn't changed along the way.

## Get an ID Token

The ID Token can be returned when calling any of the Auth0 functions which invoke authentication. This includes calls to the Lock widget, to the auth0.js library, the [Authentication API](/api/authentication), or the libraries for other languages. You can view the implementation details for retrieving the ID Token at the [Lock web library](/libraries/lock) and [Auth0.js library](/libraries/auth0js) documents.

## Validate an ID Token

In order to validate an ID Token, an application needs to verify the signature of the token, as well as validate the standard claims of the token. Each of these steps are discussed in more detail below.

::: note
Most JWT libraries will take care of the token validation for you automatically, so be sure to reference the [Libraries for Token Signing/Verification section of JWT.io](https://jwt.io/#libraries-io) to find a JWT library for your platform and programming language.
:::

### Verify the signature

The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.

Remember that the ID Token is always a JWT, and the signature is created using its header and payload, a secret and the hashing algorithm being used (as specified in the header: `HMAC`, `SHA256` or `RSA`). The way to verify it, depends on the hashing algorithm:

- For `HS256`, the API's __Signing Secret__ is used. You can find this information at your [API's Settings](${manage_url}/#/apis). Note that the field is only displayed for APIs that use `HS256`.
- For `RS256`, the tenant's [JSON Web Key Set (JWKS)](/jwks) is used. Your tenant's JWKS is `https://${account.namespace}/.well-known/jwks.json`.

The most secure practice, and our recommendation, is to use `RS256`.

To check or update the algorithm your Application uses go to [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) > Show Advanced Settings > OAuth > JsonWebToken Signature Algorithm.

### Validate the Claims

Once the application verifies the token's signature, the next step is to validate the standard claims of the token's payload. The following validations need to be made:

- **Token expiration**: The current date/time _must_ be before the expiration date/time listed in the `exp` claim (which is a Unix timestamp).

- **Token issuer**: The `iss` claim denotes the issuer of the JWT. The value **must** match the URL of your Auth0 tenant. For JWTs issued by Auth0, `iss` holds your Auth0 domain with a `https://` prefix and a `/` suffix: `https://${account.namespace}/`.

- **Token audience**: The `aud` claim identifies the recipients that the JWT is intended for. The value _must_ match the Client ID of your Auth0 Application.

## Control the contents of an ID Token

In order to retrieve an ID Token, the `responseType` should include `id_token`, both for client-side and server-side authentication flows.

The attributes included in the issued ID Token are controlled by the use of a [parameter called `scope`](/scopes).
- If `scope` is set to `openid`, then the ID Token will contain only the `iss`, `sub`, `aud`, `exp` and `iat` claims.
- If `scope` is set to `openid email`, then the ID Token will contain additionally the `email` and `email_verified` claims.
- If `scope` is set to `openid profile`, then the ID Token will contain all default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.

If you are using Lock, the `options` object used in Lock’s instantiation can specify optional [authentication parameters](/libraries/lock/v11/configuration#auth-object-) as follows:

```js
var options = {
  auth: {
    responseType: 'id_token',
    params: {scope: 'openid email'}
  }
};

var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}',
  options
);

lock.show();
```

The ID Token will contain only the claims specified as the value of the `scope` parameter.

### Add Custom Claims

You can add custom claims to your ID Token (or [Access Token](/tokens/overview-access-tokens)) using [Rules](/rules).

The claim name must conform to a namespaced format, which basically means adding any non-Auth0 HTTP or HTTPS URL as a prefix. The Auth0 namespaces you cannot use are `auth0.com`, `webtask.io`, and `webtask.run`. The format you should follow is this:  `http://my-namespace/claim-name`.

For more information on the namespaced format of custom claims, refer to [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).

For an example of how to add a custom claim, refer to [Add Custom Claims](/scopes/current#example-add-custom-claims).

### ID Token Payload

::: note
The [JWT.io website](https://jwt.io) has a debugger that allows you to debug any JSON Web Token. This is useful if you want to quickly decode a JWT to see the information it contains.
:::

The payload's claims can include some or all of the following:

| Parameter | Description |
|:------------------|:---------|
| name | The name of the user which is returned from the Identity Provider. |
| email | The email address of the user which is returned from the Identity Provider. |
| picture | The profile picture of the user which is returned from the Identity Provider. |
| sub | The unique identifier of the user. This is guaranteed to be unique per user and will be in the format `(identity provider)|(unique id in the provider)`, such as `github|1234567890`. |
| iss | The _issuer_. A case-sensitive string or URI that uniquely identiﬁes the party that issued the JWT. For an Auth0 issued ID Token, this will be **the URL of your Auth0 tenant**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| aud | The _audience_. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued ID Token, this will be the **Client ID of your Auth0 Application**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| exp | The _expiration time_. A number representing a speciﬁc date and time in the format “seconds since epoch” as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim sets the exact moment from which this **JWT is considered invalid**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| iat | The _issued at time_. A number representing a speciﬁc date and time (in the same format as `exp`) at which this **JWT was issued**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |

The exact claims contained in the ID Token will depend on the `scope` parameter you sent to the `/authorize` endpoint. An Auth0 ID Token will always include the **registered claims** and the `sub` claim, but the others depends on the `scope`.

## Token Lifetime

The purpose of the ID Token is to cache user information for better performance and experience, and by default, the token is valid for 36000 seconds, or 10 hours. You may change this setting as you see fit; if there are security concerns, you may certainly shorten the time period before the token expires, but remember that the ID Token helps ensure optimal performance by reducing the need to contact the Identity Provider every time the user performs an action that requires an API call.

The expiration time can be changed in the [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings) screen using the `JWT Expiration (seconds)` field.

There are cases where you might want to renew your ID Token. In order to do so, you can either perform another authorization flow with Auth0 (using the `/authorize` endpoint) or use a [Refresh Token](/tokens/refresh-token).

When performing the initial authorization flow, you can ask for a Refresh Token, by adding `offline_access` at the `scope` parameter, for example `scope=openid offline_access`. The Refresh Token is stored in session, along with the ID Token. Then, when a session needs to be refreshed (for example, a preconfigured timeframe has passed or the user tries to perform a sensitive operation), the app uses the Refresh Token on the backend to obtain a new ID Token, using the `/oauth/token` endpoint with `grant_type=refresh_token`.

This method is not an option for Single-Page Apps (SPAs), since for security reasons you cannot get a Refresh Token from the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) (the OAuth flow typically used for client-side web apps). In this case, you would have to use [silent authentication](/api-auth/tutorials/silent-authentication).

If you are using [auth0.js](/libraries/auth0js) on an SPA, then you can fetch a new token using the `checkSession()` method.

```js
auth0.checkSession({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order'
  }, function (err, authResult) {
    // Renewed tokens or error
});
```

## Revoke access

Once issued, tokens can not be revoked in the same fashion as cookies with session ids for server-side sessions. As a result, tokens should be issued for relatively short periods, and then [renewed](#lifetime) periodically if the user remains active.

## Keep Reading

::: next-steps
* [Overview of JSON Web Tokens](/jwt)
* [IETF RFC for JWT](https://tools.ietf.org/html/rfc7519)
* [Debugger for Viewing JSON Web Tokens](http://jwt.io/)
:::
