---
description: How to get an ID Token.
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
# Get an ID Token

The ID Token can be returned when invoking authentication with Auth0 via any available method. These methods include authentication attempts via Universal Login, the Lock widget or any of Auth0's language and framework specific SDKs, or calls directly to the [Authentication API](/api/authentication). The [Lock documentation](/libraries/lock) and the [Auth0.js documentation](/libraries/auth0js) both provide specifics about retrieving the ID Token after authentication.

## Control the contents of an ID Token

In order to retrieve an ID Token, the `responseType` should include `id_token`, both for client-side and server-side authentication flows.

The attributes included in the issued ID Token are controlled by the use of a [parameter called `scope`](/scopes).

- If `scope` is set to `openid`, then the ID Token will contain only the `iss`, `sub`, `aud`, `exp` and `iat` claims.
- If `scope` is set to `openid email`, then the ID Token will also contain the `email` and `email_verified` claims.
- If `scope` is set to `openid profile`, then the ID Token will contain all default profile claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.

## Add custom claims

You can add custom claims to your ID Token (or [Access Token](/tokens/overview-access-tokens)) using [Rules](/rules).

The claim name must conform to a namespaced format, which basically means adding any non-Auth0 HTTP or HTTPS URL as a prefix. The Auth0 namespaces you cannot use are `auth0.com`, `webtask.io`, and `webtask.run`. The format you should follow is this:  `http://my-namespace/claim-name`.

For more information on the namespaced format of custom claims, refer to [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).

For an example of how to add a custom claim, refer to [Add Custom Claims](/scopes/current/sample-use-cases#add-custom-claims-to-a-token).

## ID Token payload

::: note
The [JWT.io website](https://jwt.io) has a debugger that allows you to debug any JSON Web Token. This is useful if you want to quickly decode a JWT to see the information it contains.
:::

The payload's claims can include some or all of the following:

| Parameter | Description |
|:------------------|:---------|
| name | The name of the user which is returned from the Identity Provider. |
| email | The email address of the user which is returned from the Identity Provider. |
| picture | The profile picture of the user which is returned from the Identity Provider. |
| sub | The unique identifier of the user. This is guaranteed to be unique per user and for the database and social connections, it will be in the format `(identity provider)|(unique id in the provider)`, such as `github|1234567890`. For enterprise connections, this will be in the format `(strategy)|(name of the connection)|(unique id in the provider)`, such as `adfs|example-adfs-connection|user@example.com` |
| iss | The _issuer_. A case-sensitive string or URI that uniquely identiﬁes the party that issued the JWT. For an Auth0 issued ID Token, this will be **the URL of your Auth0 tenant**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| aud | The _audience_. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0-issued ID Token, this will be the **Client ID of your Auth0 Application**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| exp | The _expiration time_. A number representing a speciﬁc date and time in the format "seconds since epoch" as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim indicates the exact moment from which this **JWT is considered invalid**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |
| iat | The _issued at time_. A number representing a speciﬁc date and time in the format "seconds since epoch" as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim indicates the exact moment at which this **JWT was issued**.<br/><br/>**This is a [registered claim](https://tools.ietf.org/html/rfc7519#section-4.1) according to the JWT Specification** |

The exact claims contained in the ID Token will depend on the `scope` parameter you sent to the `/authorize` endpoint. An Auth0 ID Token will always include the **registered claims** and the `sub` claim, but the presence of other claims depends on the `scope`.

## Token lifetime

The purpose of the ID Token is to cache user information for better performance and experience, and by default, the token is valid for 36000 seconds, or 10 hours. You may change this setting as you see fit; if there are security concerns, you may certainly shorten the time period before the token expires, but remember that the ID Token helps ensure optimal performance by reducing the need to contact the Identity Provider every time the user performs an action that requires an API call.

The expiration time can be changed in the [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings) screen using the `JWT Expiration` field.

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