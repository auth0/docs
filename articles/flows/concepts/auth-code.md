---
title: Authorization Code Flow
description: Learn how the Authorization Code flow works and why you should use it for regular web apps.
topics:
  - authorization-code
  - api-authorization
  - grants
  - authentication
  - regular-web-apps
contentType: concept
useCase:
  - secure-api
  - call-api
  - add-login
---
# Authorization Code Flow

Because regular web apps are server-side apps where the source code is not publicly exposed, they can use the Authorization Code Flow (defined in [OAuth 2.0 RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.1)), which exchanges an Authorization Code for a token. Your app must be server-side because during this exchange, you must also pass along your application's Client Secret, which must always be kept secure, and you will have to store it in your client.

## How it works

![Authorization Code Flow Authentication Sequence](/media/articles/flows/concepts/auth-sequence-auth-code.png)


1. The user clicks **Login** within the regular web application.
2. Auth0's SDK redirects the user to the Auth0 Authorization Server ([**/authorize** endpoint](/api/authentication#authorization-code-grant)).
3. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
4. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the regular web application.
5. Your Auth0 Authorization Server redirects the user back to the application with an authorization `code`.
6. Auth0's SDK sends this `code` to the Auth0 Authorization Server ([**/oauth/token** endpoint](/api/authentication?http#authorization-code-flow43)) along with the application's Client ID and Client Secret.
7. Your Auth0 Authorization Server verifies the code, Client ID, and Client Secret.
8. Your Auth0 Authorization Server responds with an ID Token and Access Token (and optionally, a <dfn data-key="refresh-token">Refresh Token</dfn>).
9. Your application can use the Access Token to call an API to access information about the user.
10. The API responds with requested data.


## How to implement it

The easiest way to implement the Authorization Code Flow is to follow our [Regular Web App Quickstarts](/quickstart/webapp).

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Authorization Code Flow](/flows/guides/auth-code/add-login-auth-code) or [Call Your API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code).

## Keep reading

- Auth0 offers many ways to personalize your user's login experience using [rules](/rules) and [hooks](/hooks).
- [Tokens](/tokens)
