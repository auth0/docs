---
title: Call My API from Another API
description: Learn how to call your API from another API.
template: microsite
---

# Call My API from Another API - DRAFT

With machine-to-machine (M2M) apps, the system authenticates and authorizes the app rather than a user. For this scenario, typical authentication schemes like username + password or social logins don't make sense. Instead, M2M apps use the Client Credentials Flow, in which they pass along their Client ID and Client Secret to authenticate themselves and get a token.

## How it works

*insert data flow diagram here*

::: steps
  1. Your app authenticates with the Auth0 Authorization Server using its Client ID and Client Secret (/authorize endpoint).
  2. Your Auth0 Authorization Server validates the Client ID and Client Secret.
  3. Your Auth0 Authorization Server responds with an Access Token.
  4. Your application can use the Access Token to call an API on behalf of itself.
:::

## How to implement it

The easiest way to implement the M2M Flow is to follow our [M2M Quickstarts](/quickstart/backend).

You can also follow our tutorial to [Implement the M2M Flow](/flows/guides/m2m-flow/implement-m2m-flow) using our API endpoints.

:::: further-reading
::: concepts
  * [Client Credentials Grant](/api-auth/grant/client-credentials)
  * [Architecture Scenario: Server + API](/architecture-scenarios/application/server-api)
  * [Access Tokens](/tokens/access-token)
  * [Scopes](/scopes/current)
::::

::: guides
  * [Implement the Client Credentials Grant](/api-auth/tutorials/client-credentials)
  * [Change Scopes and Add Custom Claims to Tokens Using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
:::

::: references
  * [API Authorization](/api-auth)
  * [Authentication API](/api/authentication)
  * [0Auth 2.0](/protocols/oauth2)
:::
::::

::: whats-next
  * Auth0 offers many ways to personalize your user's login experience using [rules](/rules/current) and [hooks](/hooks).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect My API](/microsites/protect-my-api).
:::
