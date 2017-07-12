---
description: How to obtain, use and renew an id_token.
toc: true
---
# ID Token

## Overview

The ID token, usually referred to in our docs as `id_token`, is a [JSON Web Token (JWT)](/jwt) that contains user profile information (like the user's name, email, and so forth), represented in the form of _claims_. These claims are statements about the user, which can be trusted if the consumer of the token can [verify its signature](#validate-an-id-token).

You will need to decode this token to read the claims (or attributes) of the user. The JWT website provides a [list of libraries you can use to decode](https://jwt.io/#libraries-io) the `id_token`.

The `id_token` is consumed by the client and the claims included, are typically used for UI display. It was added to the OIDC specification as an optimization so the client can know the identity of the user, without having to make an additional network requests.

::: note
If you need a refresher on OIDC refer to [OpenID Connect](/protocols/oidc).
:::

The `id_token` conforms to an industry standard (IETF [RFC 7519](https://tools.ietf.org/html/rfc7519)) and contains three parts: a header, a body and a signature.

- The header contains the type of token and the hash algorithm used on the contents of the token.

- The body, also called the payload, contains identity claims about a user.  There are some claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added. For the cases where the `id_token` is returned in URLs, care must be taken to keep the JWT within the browser size limitations for URLs.

- The signature is used by the recipient to verify that the sender of the JWT is who it says and to ensure that the message wasn't changed along the way.

## Get an ID token

The `id_token` can be returned when calling any of the Auth0 functions which invoke authentication.  This includes calls to the Lock widget, to the auth0.js library, the [Authentication API](/api/authentication), or the libraries for other languages. You can view the implementation details for retrieving the `id_token` at the [Lock web library](/libraries/lock) and [Auth0.js library](/libraries/auth0js) documents.

## Validate an ID token

In order to validate an `id_token`, an application needs to verify the signature of the token, as well as validate the standard claims of the token. Each of these steps are discussed in more detail below.

::: note
Most JWT libraries will take care of the token validation for you automatically, so be sure to reference the [Libraries for Token Signing/Verification section of JWT.io](https://jwt.io/#libraries-io) to find a JWT library for your platform and programming language.
:::

### Verify the signature

Verifying the signature of an `id_token` depends on the hash algorithm used by your Client:

- If you used `HS256` then the token is signed with the Client Secret, using the HMAC algorithm. You can verify the signature using the Client Secret value, which you can find at the _[Client Settings](${manage_url}/#/clients/${account.clientId}/settings)_ page.

- If you used `RS256` then the token is signed with a public/private key pair, using RSA. You can verify the signature using the Public Key or Certificate, which you can find at the _[Client Settings](${manage_url}/#/clients/${account.clientId}/settings) > Show Advanced Settings > Certificates_ page.

To check or update the algorithm your Client uses go to _[Client Settings](${manage_url}/#/clients/${account.clientId}/settings) > Show Advanced Settings > OAuth > JsonWebToken Signature Algorithm_. The most secure practice, and our recommendation, is to use `RS256`.

### Validate the Claims

Once the application verifies the token's signature, the next step is to validate the standard claims of the token's payload. The following validations need to be made:

- _Token expiration_: The current date/time _must_ be before the expiration date/time listed in the `exp` claim (which is a Unix timestamp).

- _Token issuer_: The `iss` claim denotes the issuer of the JWT. The value _must_ match the the URL of your Auth0 tenant. For JWTs issued by Auth0, `iss` holds your Auth0 domain with a `https://` prefix and a `/` suffix: `https://${account.namespace}/`.

- _Token audience_: The `aud` claim identifies the recipients that the JWT is intended for. The value _must_ match the Client ID of your Auth0 Client.

## Control the contents of an ID token

In order to retrieve an `id_token` the `responseType` should include the `id_token`, both for client-side and server-side authentication flows.

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

### Add Custom Claims

You can add custom claims to your ID token (or [Access Token](/tokens/access-token)) using [Rules](/rules).

The claim name must conform to a namespaced format, which basically means addind any non-Auth0 HTTP or HTTPS URL as a prefix. The Auth0 namespaces you cannot use are `auth0.com`, `webtask.io` and `webtask.run`. The format you should follow is this:  `http://my-namespace/claim-name`.

For more information on the namespaced format of custom claims, refer to [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).

For an example of how to add a custom claim, refer to [Add Custom Claims](/scopes/current#example-add-custom-claims).

### ID Token Payload

::: note
The [JWT.io website](https://jwt.io) has a debugger that allows you to debug any JSON Web Token. This is useful if you want to quckly decode a JWT to see the information it contains.
:::

The payload's claims can include some or all of the following:

| Parameter | Description |
|:------------------|:---------|
| name | The name of the user which is returned from the Identity Provider. |
| email | The email address of the user which is returned from the Identity Provider. |
| picture | The profile picture of the user which is returned from the Identity Provider. |
| sub | The unique identifier of the user. This is guaranteed to be unique per user and will be in the format `(identity provider)&#124;(unique id in the provider)`, e.g. `github&#124;1234567890`. |
| iss | The _issuer_. A case-sensitive string or URI that uniquely identiﬁes the party that issued the JWT. For an Auth0 issued `id_token`, this will be **the URL of your Auth0 tenant**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| aud | The _audience_. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued `id_token`, this will be the **Client ID of your Auth0 Client**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| exp | The _expiration time_. A number representing a speciﬁc date and time in the format “seconds since epoch” as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim sets the exact moment from which this **JWT is considered invalid**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| iat | The _issued at time_. A number representing a speciﬁc date and time (in the same format as `exp`) at which this **JWT was issued**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |

The exact claims contained in the `id_token` will depend on the `scope` parameter you sent to the `/authorize` endpoint. An Auth0 `id_token` will always include the **registered claims** and the `sub` claim, but the others depends on the `scope`.

## Token Lifetime

The purpose of the `id_token` is to cache user information for better performance and experience, and by default, the token is valid for 36000 seconds, or 10 hours. You may change this setting as you see fit; if there are security concerns, you may certainly shorten the time period before the token expires, but remember that the `id_token` helps ensure optimal performance by reducing the need to contact the Identity Provider every time the user performs an action that requires an API call.

The expiration time can be changed in the [Dashboard > Clients > Settings](${manage_url}/#/clients/${account.clientId}/settings) screen using the `JWT Expiration (seconds)` field.

There are cases where you might want to renew your `id_token`. In order to do so, you can either perform another authorization flow with Auth0 (using the `/authorize` endpoint) or use a [Refresh Token](/tokens/refresh-token).

When performing the initial authorization flow, you can ask for a `refresh_token`, by adding `offline_access` at the `scope` parameter, for example `scope=openid offline_access`. The `refresh_token` is stored in session, alongside with the `id_token`. Then when a session needs to be refreshed (for example, a preconfigured timeframe has passed or the user tries to perform a sensitive operation), the app uses the `refresh_token` on the backend to obtain a new `id_token`, using the `/oauth/token` endpoint with `grant_type=refresh_token`.

This method is not an option for Single Page Apps (SPAs), since for security reasons you cannot get a `refresh_token` from the [Implicit Grant](/api-auth/grant/implicit) (the OAuth flow typically used from Client-side Web Apps). In that case you would have to use [silent authentication](/api-auth/tutorials/silent-authentication).

If you are using [auth0.js](/libraries/auth0js) on an SPA, then you can fetch a new token using the `renewAuth()` method.

```js
auth0.renewAuth({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order',
  redirectUri: 'https://example.com/auth/silent-callback',

  // this will use postMessage to comunicate between the silent callback
  // and the SPA. When false the SDK will attempt to parse the url hash
  // should ignore the url hash and no extra behaviour is needed.
  usePostMessage: true
  }, function (err, authResult) {
    // Renewed tokens or error
});
```

## Revoke access

Once issued, tokens can not be revoked in the same fashion as cookies with session id’s for server-side sessions.  As a result, tokens should be issued for relatively short periods, and then [renewed](#lifetime) periodically if the user remains active.

## Keep Reading

* [Overview of JSON Web Tokens](/jwt)
* [Silent Authentication for Single Page Apps](/api-auth/tutorials/silent-authentication)
* [IETF RFC for JWT](https://tools.ietf.org/html/rfc7519)
* [Debugger for viewing JSON Web Tokens](http://jwt.io/)
* [Vulnerabilities in use of JWT’s by libraries](https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/)
* [Cookies vs Tokens](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
* [Ten things about tokens](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/)
* [What happens if the ID token is too large?](https://auth0.com/forum/t/id-token-is-too-large/3116)
