---
description: Overview of OIDC Connect scopes
topics:
  - scopes
contentType:
  - how-to
useCase:
  - development
---
# OpenID Connect Scopes

OpenID Connect (OIDC) is an authentication protocol that sits on top of OAuth2, and allows the application to verify the identity of the users and obtain basic profile information about them in a interoperable way. This information can be returned in the ID Token and/or in the response from [the /userinfo endpoint](/api/authentication#get-user-info) (depending on the type of request).

The basic (and required) scope for OpenID Connect is the `openid` scope. This scope represents the intent of the application to use the OIDC protocol to verify the identity of the user.

In OpenID Connect (OIDC), we have the notion of __claims__. There are two types of claims:

* [Standard](#standard-claims) (which means that they meet OIDC specification)
* [Custom](/scopes/current/custom-claims)

## Standard claims

OpenID Connect specifies a set of [standard claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). These claims are user attributes and are intended to provide the application with user details such as email, name and picture.

The basic claim returned for the `openid` scope is the `sub` claim, which uniquely identifies the user (`iss`, `aud`, `exp`, `iat` and `at_hash` claims will also be present in the ID Token). Applications can ask for additional scopes, separated by spaces, to request more information about the user. The following additional scopes apply:

- `profile`: will request the claims representing basic profile information. These are `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `picture` and `updated_at`.
- `email`: will request the `email` and `email_verified` claims.

## Example: ask for standard claims

In this example, we will use the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to authenticate a user and retrieve an ID Token that contains the user's name, nickname, profile picture, and email information.

To initiate the authentication flow, send the user to the authorization URL and request an ID Token:

```text
https://${account.namespace}/authorize?
  scope=openid%20profile%20email&
  response_type=id_token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

::: note
For details on the params and how to implement this flow refer to our tutorial, [Add Login Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow).
:::

Notice that we included three values at the `scope` param: `openid`, `profile` (to get `name`, `nickname` and `picture`) and email (to get the `email` claim).

After Auth0 has redirected back to the app, you can extract the ID Token from the hash fragment of the URL.

When decoded, the ID Token contains the following claims:

```json
{
  "name": "John Doe",
  "nickname": "john.doe",
  "picture": "https://myawesomeavatar.com/avatar.png",
  "updated_at": "2017-03-30T15:13:40.474Z",
  "email": "john.doe@test.com",
  "email_verified": false,
  "iss": "https://${account.namespace}/",
  "sub": "auth0|USER-ID",
  "aud": "${account.clientId}",
  "exp": 1490922820,
  "iat": 1490886820,
  "nonce": "crypto-value",
  "at_hash": "IoS3ZGppJKUn3Bta_LgE2A"
}
```

Your app now can retrieve these values and use them to personalize the UI.