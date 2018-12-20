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

OpenID Connect (OIDC) is an authentication protocol that sits on top of OAuth 2.0, and allows an application to verify the identity of a user and request basic profile information for them. The requested information can be returned in the ID Token and/or in a response from the [/userinfo endpoint](/api/authentication#get-user-info), depending on the type of request.

The basic (and required) scope for OIDC is `openid`, which indicates that the application intends to use the OIDC protocol to verify the user's identity.

Beyond that, an application can ask for additional scopes, but this will depend on which user attributes that the application needs. In OIDC, each scope returns a set of user attributes, which are called _claims_ and fall into two categories:

* [Standard](#standard-claims): Claims that provide user details, such as name and email. Defined and identified in the OIDC specification.
* [Custom](/scopes/current/custom-claims): 

## Standard claims

Standard claims are intended to provide an appliction with user details, such as name, email, and picture. These are defined and identified for the OIDC protocol. Some information on the most commonly used scopes is included below, but for a full list, refer to the [OIDC specification: Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).


| Scope     | Claims          |
|-----------|-----------------|
| `openid`  | Returns the `sub` claim, which uniquely identified the user. In an ID Token, `iss`, `aud`, `exp`, `iat`, and `at_hash` claims will also be present. |
| `profile` | Returns claims that represent basic profile information, including `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `picture`, and `updated_at`. |
| `email`   | Returns the `email` claim, which contains the user's email address, and `email_verified`, which is a boolean indicating whether the email address was verified by the user. |

## Example: Request standard claims

In this example, we will use the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to authenticate a user and retrieve an ID Token that contains the user's name, nickname, profile picture, and email information. For details on the parameters or to learn how to implement this flow, refer to our tutorial: [Add Login Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow).

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

Notice that the `scope` parameter includes three values: `openid` (to indicate that the application intends to use OIDC and would like an ID Token, `profile` (to get `name`, `nickname`, and `picture`) and email (to get `email` and `email_verified`).

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

Your app now can retrieve these values and use them to personalize the UI.
