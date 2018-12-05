---
description: Learn how the M2M flow works and why you should use it for machine-to-machine (M2M) apps.
topics:
  - M2M
  - client-credentials
  - api-authorization
  - grants
  - authentication
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Machine-to-Machine (M2M) Flow

With machine-to-machine (M2M) applications, such as CLIs, daemons, or services running on your back-end, the system authenticates and authorizes the app rather than a user. For this scenario, typical authentication schemes like username + password or social logins don't make sense. Instead, M2M apps use the Client Credentials Flow (defined in [OAuth 2.0 RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)), in which they pass along their Client ID and Client Secret to authenticate themselves and get a token.

## How it works

![M2M Flow Authentication Sequence](/media/articles/flows/concepts/auth-sequence-m2m-flow.png)


1. Your app authenticates with the Auth0 Authorization Server using its Client ID and Client Secret (**/token** endpoint).
2. Your Auth0 Authorization Server validates the Client ID and Client Secret.
3. Your Auth0 Authorization Server responds with an Access Token.
4. Your application can use the Access Token to call an API on behalf of itself.
5. The API responds with requested data.


## How to implement it

The easiest way to implement the M2M Flow is to follow our [Machine-to-Machine Quickstarts](/quickstart/backend).

You can also follow our tutorial to use our API endpoints to [Call Your API Using the M2M Flow](/flows/guides/m2m-flow/call-api-using-m2m-flow).

## Keep reading

- Auth0 offers many ways to customize your tokens using [rules](/rules) and [hooks](/hooks).
- [Tokens used by Auth0](/tokens)
