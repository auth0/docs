---
description: Understand scopes and claims used with the OpenID Connect (OIDC) protocol.
topics:
  - scopes
contentType:
  - concept
  - how-to
useCase:
  - development
  - add-login
---
# OpenID Connect Scopes

:::note 
This document discusses scopes included within the OpenID Connect (OIDC) authentication protocol. For more info about OIDC itself, see our docs on [OpenID Connect](/protocols/oidc).
:::

As an [application](/applications) developer, when you make your initial authorization request, you specify the scopes you want your users to have for your application. When the user responds, they are asked to authorize these scopes for your app.

For example, let's say you have built a regular web application, registered it with Auth0, and have configured it to allow a user to log in using Google. Once a user is logged into your app, you want to auto-generate and send a personalized welcome email, including the user's name.

1. A user clicks Login within your app.
2. Your app redirect the user to the Auth0 Authorization Server (/authorize endpoint), including the following scopes: `profile` (so you can personalize the email with the user's name) and `email` (so you know where to send the welcome email).
3. Your Auth0 Authorization Server redirects the user to the login prompt.
4. The user authenticates using Google and sees a consent page listing the permissions Auth0 will give to your app, which include access to their profile information and email address.
5. The user accepts and authorizes your app to have this level of access to the information stored by Google.
6. Your app now has access to the user's profile information and email address.

OpenID Connect (OIDC) scopes are used during authentication to authorize access to a user's details. The basic (and required) scope for OIDC is `openid`, which indicates that an application intends to use the OIDC protocol to verify a user's identity. Beyond that, an application can ask for additional scopes by listing the requested scope names in the `scope` parameter, separated by spaces. 

In OIDC, each scope returns a set of user attributes, which are called _claims_. The scopes an application should request depend on which user attributes the application needs. Once the user authorizes the requested scopes, the claims are returned in an ID Token and are also available through the [/userinfo endpoint](/api/authentication#get-user-info).

## Standard claims

Standard claims are intended to provide an application with user details, such as name, email, and picture, and are pre-defined for the OIDC protocol. Standard claims included in the most commonly-used scopes are listed below, but for a full list of available standard claims, refer to the [OIDC specification: Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).


| Scope     | Claims          |
|-----------|-----------------|
| `openid`  | Returns the `sub` claim, which uniquely identifies the user. In an ID Token, `iss`, `aud`, `exp`, `iat`, and `at_hash` claims will also be present. For more information about the ID Token claims, see [ID Tokens](/tokens/id-token#id-token-payload). |
| `profile` | Returns claims that represent basic profile information, including `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `picture`, and `updated_at`. |
| `email`   | Returns the `email` claim, which contains the user's email address, and `email_verified`, which is a boolean indicating whether the email address was verified by the user. |

## Example: Request standard claims

In this example, we will use the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to authenticate a user and retrieve an ID Token that contains the user's name, nickname, profile picture, and email information. For details on the parameters or to learn how to fully implement this flow, refer to our tutorial: [Add Login Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow).

1. Initiate the authentication flow by sending the user to the authorization URL and requesting an ID Token:

```text
https://${account.namespace}/authorize?
  scope=openid%20profile%20email&
  response_type=id_token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

Notice that the `scope` parameter includes three values: 

* `openid` (to indicate that the application intends to use OIDC and would like an ID Token)
* `profile` (to get `name`, `nickname`, and `picture`)
* `email` (to get `email` and `email_verified`)


2. After Auth0 redirects back to your app, extract the ID Token from the hash fragment of the URL and decode it.

You should see the following claims:

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

Your app now can retrieve these values and use them to personalize your UI.
