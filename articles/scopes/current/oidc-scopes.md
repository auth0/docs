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

As an [application](/applications) developer, you specify the access level you want your app to have to a user's details in the `scope` parameter when you make your authorization request. Then, during the login process, the user is asked to allow this access level for your app. In this scenario, the scopes available to you include those implemented by the OpenID Connect (OIDC) protocol.

For example, let's say you have built a regular web application, registered it with Auth0, and have configured it to allow a user to log in using Google. Once a user logs in to your app, you want to auto-generate and send a personalized welcome email, including the user's name.

1. A user clicks **Login** within your app.
2. Your app redirects the user to the Auth0 Authorization Server (**/authorize** endpoint), including the following scopes: 
* `profile` (so you can personalize the email with the user's name)
* `email` (so you know where to send the welcome email)
3. Your Auth0 Authorization Server redirects the user to the login prompt.
4. The user authenticates using Google and sees a consent page listing the permissions Auth0 will give to your app, which include access to their profile information and email address.
5. The user accepts and authorizes your app to have this level of access to their information stored by Google.
6. Your app now has access to the user's profile information and email address.


## OIDC Scopes

OIDC scopes are used during authentication to authorize access to a user's details. The basic (and required) scope for OIDC is `openid`, which indicates that an application intends to use the OIDC protocol to verify a user's identity. Beyond that, an application can ask for additional scopes by listing the requested scope names in the `scope` parameter, separated by spaces. 

In OIDC, each scope returns a set of user attributes, which are called _claims_. The scopes an application should request depend on which user attributes the application needs. Once the user authorizes the requested scopes, the claims are returned in an ID Token and are also available through the [/userinfo endpoint](/api/authentication#get-user-info).

## Standard claims

Standard claims are intended to provide an application with user details, such as name, email, and picture, and are pre-defined for the OIDC protocol. Standard claims included in the most commonly-used scopes are listed below, but for a full list of available standard claims, refer to the [OIDC specification: Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).


| Scope     | Claims          |
|-----------|-----------------|
| `openid`  | Returns the `sub` claim, which uniquely identifies the user. In an ID Token, `iss`, `aud`, `exp`, `iat`, and `at_hash` claims will also be present. For more information about the ID Token claims, see [ID Tokens](/tokens/id-token#id-token-payload). |
| `profile` | Returns claims that represent basic profile information, including `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `picture`, and `updated_at`. |
| `email`   | Returns the `email` claim, which contains the user's email address, and `email_verified`, which is a boolean indicating whether the email address was verified by the user. |

For an example showing how to request standard claims for your application, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#authenticate-a-user-and-request-user-details).
