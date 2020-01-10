---
title: Client Credentials Flow
description: Learn how the Client Credentials flow works and why you should use it for machine-to-machine (M2M) apps.
topics:
  - M2M
  - client-credentials
  - api-authorization
  - grants
  - authentication
  - m2m-apps
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Client Credentials Flow

With machine-to-machine (M2M) applications, such as CLIs, daemons, or services running on your back-end, the system authenticates and authorizes the app rather than a user. For this scenario, typical authentication schemes like username + password or social logins don't make sense. Instead, M2M apps use the Client Credentials Flow (defined in [OAuth 2.0 RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)), in which they pass along their Client ID and Client Secret to authenticate themselves and get a token.

## How it works

![Client Credentials Flow Authentication Sequence](/media/articles/flows/concepts/auth-sequence-client-credentials.png)


1. Your app authenticates with the Auth0 Authorization Server using its Client ID and Client Secret ([**/oauth/token** endpoint](/api/authentication?http#client-credentials-flow)).
2. Your Auth0 Authorization Server validates the Client ID and Client Secret.
3. Your Auth0 Authorization Server responds with an Access Token.
4. Your application can use the Access Token to call an API on behalf of itself.
5. The API responds with requested data.


## How to implement it

The easiest way to implement the Client Credentials Flow is to follow our [Backend Quickstarts](/quickstart/backend).

You can also follow our tutorial to use our API endpoints to [Call Your API Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials).

## Keep reading

- Auth0 offers many ways to customize your tokens using [rules](/rules) and [hooks](/hooks).
- [Tokens](/tokens)
