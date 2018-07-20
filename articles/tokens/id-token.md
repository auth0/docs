---
description: How to obtain, use, and renew an ID Token.
toc: true
topics:
  - tokens
  - id-tokens
contentType:
  - concept
useCase:
  - add-login
  - build-an-app
---

# ID Token

In this article we will discuss what an ID Token is, what it looks like, and how you can use it to retrieve information about the user that just logged in in your application.

:::note
It will be easier for you to follow this article, if you are already familiar with [OpenID Connect](/protocols/oidc) and [OAuth 2.0](/protocols/oauth2).
:::

## What is an ID Token

Every time a user logs in in your application, Auth0 will send in the response an ID Token that will contain information about the logged in user. This is a [JSON Web Token (JWT)](/jwt) that contains information, like the user's name and email address, in the form of claims, which are basically name/value pairs. 

Typically you extract this information and use them to customize your app's UI for your user with information like their name.

The ID Token was added to the [OpenID Connect specification](/protocols/oidc) as an optimization so the application can know the identity of the user, without having to make an additional network request.

::: warning
Υou __must__ [verify the ID Token's signature](/tokens/validate-id-token) before you use it.
:::


## What an ID Token looks like

An ID Token is an alphanumeric string that looks like the following:

```text
eyJraWQiOiIxZTlnZGs3IiwiYWxnIjoiUlMyNTYifQ.ewogImlzcyI6ICJodHRwOi8vc2VydmVyLmV4YW1wbGUuY29tIiwKICJzdWIiOiAiMjQ4Mjg5NzYxMDAxIiwKICJhdWQiOiAiczZCaGRSa3F0MyIsCiAibm9uY2UiOiAibi0wUzZfV3pBMk1qIiwKICJleHAiOiAxMzExMjgxOTcwLAogImlhdCI6IDEzMTEyODA5NzAsCiAibmFtZSI6ICJKYW5lIERvZSIsCiAiZ2l2ZW5fbmFtZSI6ICJKYW5lIiwKICJmYW1pbHlfbmFtZSI6ICJEb2UiLAogImdlbmRlciI6ICJmZW1hbGUiLAogImJpcnRoZGF0ZSI6ICIwMDAwLTEwLTMxIiwKICJlbWFpbCI6ICJqYW5lZG9lQGV4YW1wbGUuY29tIiwKICJwaWN0dXJlIjogImh0dHA6Ly9leGFtcGxlLmNvbS9qYW5lZG9lL21lLmpwZyIKfQ.rHQjEmBqn9Jre0OLykYNnspA10Qql2rvx4FsD00jwlB0Sym4NzpgvPKsDjn_wMkHxcp6CilPcoKrWHcipR2iAjzLvDNAReF97zoJqq880ZD1bwY82JDauCXELVR9O6_B0w3K-E7yM2macAAgNCUwtik6SjoSUZRcf-O5lygIyLENx882p6MtmwaL1hd6qn5RZOQ0TLrOYu0532g9Exxcm-ChymrB4xLykpDj3lUivJt63eEGGN6DH5K6o33TcxkIjNrCD4XB1CKKumZvCedgHHF3IAK4dVEDSUoGlH9z4pP_eWYNXvqQOjGs-rDaQzUHl6cQQWNiDpWOl_lxXjQEvQ
```

It contains three base64url encoded segments separated by period characters. The three segments represent a header, a payload and a signature. Hence the format of an ID Token is `Header.Payload.Signature`.

- The header contains the type of token and the hash algorithm used on the contents of the token.

- The body, also called the payload, contains identity claims about a user.  There are some claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added. For the cases where the ID Token is returned in URLs, care must be taken to keep the JWT within the browser size limitations for URLs.

- The signature is used by the recipient to verify that the sender of the JWT is who it says and to ensure that the message wasn't changed along the way.

:::note
For more details on the ID Token's format see [JSON Web Tokens (JWT) in Auth0](/jwt).
:::

You will need to decode this token to read the claims (or attributes) of the user. The JWT website provides a [list of libraries you can use to decode](https://jwt.io/#libraries-io) the ID Token. The website also has a debugger that allows you to debug any JSON Web Token. This is useful if you want to quickly decode a JWT to see the information it contains.

### Decoding the payload

When we decode an ID Token we can see the claims it contains. Typically it looks like this:

```json
{
  "name": "Jerrie Pelser",
  "email": "jerrie@j...",
  "picture": "https://s.gravatar.com/avatar/6222081fd7dcea7dfb193788d138c457?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
  "iss": "https://auth0pnp.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129,
  "nonce": "..."
}
```

The payload's claims can include some or all of the following:

| Parameter | Description |
|:------------------|:---------|
| name | The name of the user which is returned from the Identity Provider. |
| email | The email address of the user which is returned from the Identity Provider. |
| picture | The profile picture of the user which is returned from the Identity Provider. |
| iss | The _issuer_. A case-sensitive string or URI that uniquely identiﬁes the party that issued the JWT. For an Auth0 issued ID Token, this will be **the URL of your Auth0 tenant**. |
| sub | The unique identifier of the user. This is guaranteed to be unique per user and will be in the format `(identity provider)|(unique id in the provider)`, such as `github|1234567890`. |
| aud | The _audience_. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued ID Token, this will be the **Client ID of your Auth0 Application**. |
| exp | The _expiration time_. A number representing a speciﬁc date and time in the format “seconds since epoch” as [deﬁned by POSIX6](https://en.wikipedia.org/wiki/Unix_time). This claim sets the exact moment from which this **JWT is considered invalid**. |
| iat | The _issued at time_. A number representing a speciﬁc date and time (in the same format as `exp`) at which this **JWT was issued**. |
| nonce | A string value which was sent with the request to the `/authorize` endpoint. This is used to [prevent token replay attacks](/api-auth/tutorials/nonce). |

## How to get an ID Token

ID Tokens can be issued by Auth0, every time a user logs in in your application. This includes:
- calls using the [Lock widget](/libraries/lock)
- calls using the [Auth0.js library](/libraries/auth0js)
- calls using the [Authentication API](/api/authentication)
- or any of the other Auth0 [Libraries](/libraries)

If you are using a library follow the relevant links to see how you can get one. 

If you were to call the Authentication API directly to authenticate users, then you would get your ID Tokens from the [Authorization endpoint](/api/authentication#authorize-application). This is the initial endpoint to which a user must be redirected. This will handle checking whether any SSO session is active, authenticating the user and also potentially redirect the user directly to any Identity Provider to handle authentication. See the [Authorization endpoint](/api/authentication#authorize-application) documentation for a sample request and details on the parameters.

### Before you use the token

After you get an ID Token, and before you use it, it is imperative for security reasons, that you verify it. For information on how to do that, see [How to verify an ID Token](/tokens/validate-id-token).

## How to control the contents of an ID Token

In order to get an ID Token after user authentication, the `responseType` request parameter must include the value `id_token`.

You can control the information that the ID Token will contain using the request parameter [scope](/scopes).

| **Scope value** | **Claims included in the token** |
|--|--|
| `openid` | iss, sub, aud, exp, iat |
| `openid email` | iss, sub, aud, exp, iat, email, email_verified |
| `openid profile` | name, family_name, given_name, middle_name, nickname, preferred_username, profile, picture, website, gender, birthdate, zoneinfo, locale, updated_at|

### How to add more user info in the token

You can add additional information to your ID Token (in the form of claims) using [Rules](/rules).

For an example, see [Custom Claims](/scopes/custom-claims).

## Token Lifetime

The purpose of the ID Token is to cache user information for better performance and experience, and by default, the token is valid for 36000 seconds, or 10 hours. You may change this setting as you see fit; if there are security concerns, you may certainly shorten the time period before the token expires, but remember that the ID Token helps ensure optimal performance by reducing the need to contact the Identity Provider every time the user performs an action that requires an API call.

The expiration time can be changed in the [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings) screen using the **JWT Expiration (seconds)** field.

There are cases where you might want to renew your ID Token. In order to do so, you can either perform another authorization flow with Auth0 (using the `/authorize` endpoint) or use a [Refresh Token](/tokens/refresh-token).

When performing the initial authorization flow, you can ask for a Refresh Token, by adding `offline_access` at the `scope` parameter, for example `scope=openid offline_access`. The Refresh Token is stored in session, along with the ID Token. Then, when a session needs to be refreshed (for example, a preconfigured timeframe has passed or the user tries to perform a sensitive operation), the app uses the Refresh Token on the backend to obtain a new ID Token, using the `/oauth/token` endpoint with `grant_type=refresh_token`.

This method is not an option for Single Page Apps (SPAs), since for security reasons you cannot get a Refresh Token from the [Implicit Grant](/api-auth/grant/implicit) (the OAuth flow typically used from Client-side Web Apps). In that case, you would have to use [silent authentication](/api-auth/tutorials/silent-authentication).

If you are using [auth0.js](/libraries/auth0js) on an SPA, then you can fetch a new token using the `checkSession()` method.

```js
auth0.checkSession({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order'
  }, function (err, authResult) {
    // Renewed tokens or error
});
```

## How to revoke an ID Token

ID Tokens cannot be revoked. Therefore, they should be issued for relatively short periods, and then [renewed](#token-lifetime) periodically if the user remains active.

## Keep reading

::: next-steps
* [Overview of JSON Web Tokens](/jwt)
* [IETF RFC for JWT](https://tools.ietf.org/html/rfc7519)
* [Debugger for Viewing JSON Web Tokens](http://jwt.io/)
:::
