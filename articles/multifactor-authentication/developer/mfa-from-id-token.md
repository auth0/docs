---
title: Step-up Authentication with ID Tokens
description: Describes how to check if a user has logged in with Multifactor Authentication by examining their ID Token
---
# Step-up Authentication with ID Tokens

With Step-up Authentication, applications that allow access to different types of resources can require users to authenticate with a stronger mechanism to access sensitive information or perform certain transactions.

For instance, a user may be allowed to access views with sensitive data or reset their password only after confirming their identity using Multifactor Authentication (MFA).

When a user logs in you can get an [ID Token](/tokens/id-token) which is a [JSON Web Token](/jwt) that contains information relevant to the user's session, in the form of claims.

The claim that is relevant to this scenario is `amr`. If it contains the value `mfa` then you know that the user has authenticated using MFA. Note the following:
- `amr` **must** be present in the ID Token's payload (if you log in with username/password the claim will not be included in the payload)
- `amr` **must** contain the value `mfa` (`amr` can contain claims other than `mfa`, so its existence is not a sufficient test, its contents must be examined for the value `mfa`)

## How to check the ID Token

In order to check if a user logged in with MFA follow these steps:

1. Retrieve the ID Token
1. Verify the token's signature. The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.
1. Validate the standard claims: `exp` (when the token expires), `iss` (who issued the token), `aud` (who is the intented recipient of the token)
1. Verify that the token contains the `amr` claim.
  - If `amr` **is not** in the payload or it does not contain the value `mfa`, the user did not log in with MFA
  - If `amr` **is** in the payload and it contains the value `mfa`, then the user logged in with MFA

For more information on the signature verification and claims validation, see [ID Token](/tokens/id-token).

## Example

In this section we will see how you can check if a user logged in with MFA in a Node.js web app. The code snippets use the following modules:

- [jwks-rsa](https://github.com/auth0/node-jwks-rsa): Library that retrieves the RSA signing keys from a [**JWKS** (JSON Web Key Set)](/jwks) endpoint. We will use this to retrieve your RSA keys from Auth0 so we can verify the signed ID Token.
- [express-jwt](https://github.com/auth0/express-jwt): Library that validates JWT tokens in your Node.js applications. It provides several functions that make working with JWTs easier.

### 1. Authenticate the user

First, we need to authenticate a user and get an ID Token. To do that we will use the [OAuth 2.0 Authorization Code grant](/client-auth/server-side-web).


```text
https://${account.namespace}/authorize?
  audience=${account.namespace}/userinfo&
  scope=openid&
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  state=CRYPTOGRAPHIC_NONCE
```

Where:

| **Parameter** | **Description** |
|-|-|
| `audience` | Audience(s) that the generated [Access Token](/tokens/access-token) is intended for. This example's value will generate a token that can be used to retrieve the user's profile from the [Authentication API /userinfo endpoint](/api/authentication#get-user-info). |
| `scope` | Must contain the `openid` value in order to get an ID Token. For more info see [Scopes](/scopes). |
| `response_type` | Tells Auth0 which [OAuth 2.0 grant](/protocols/oauth2#authorization-grant-types) to execute. |
| `client_id` | Client ID of your app. Find it in [Client Settings](${account.namespace}/#/clients/${account.clientId}/settings). |
| `redirect_uri` | The URI to which Auth0 will send the response after the user authenticates. Set it to the URI that you want to redirect the user after login. Whitelist this value in [Client Settings](${account.namespace}/#/clients/${account.clientId}/settings). |
| `state` | An authentication parameter used to help mitigate CSRF attacks. For more info see [State](/protocols/oauth2/oauth-state)|

Call this URL when a user tries to log in. For example:

```html
<a href="https://${account.namespace}/authorize?scope=openid&audience=${account.namespace}/userinfo&response_type=code&client_id=${account.clientId}&redirect_uri=${account.callback}&state=123456">
  Log In
</a>
```

Provided that the user authenticates successfully, the response from Auth0 will be as follows:

```text
http://localhost:3000/?code=9nmp6bZS8GqJm4IQ&state=SAME_VALUE_YOU_SENT_AT_THE_REQUEST
```

You need to verify that the `state` value is the same with the one you sent at the request and extract the code parameter (we will use it in the next step).

## 2. Get an ID Token

## Keep reading

::: next-steps
* [Overview of ID Tokens](/tokens/id-token)
* [Overview of JSON Web Tokens](/jwt)
* [OpenID specification](http://openid.net/specs/openid-connect-core-1_0.html)
:::
