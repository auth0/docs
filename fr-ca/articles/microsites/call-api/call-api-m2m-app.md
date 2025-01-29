---
title: Call Your API from a Machine-to-Machine App
description: Everything you need to know to call your API from your machine-to-machine (M2M) app
ctaText: Go to Quickstart
ctaLink: /docs/quickstart/backend
public: false
template: microsite
topics:
  - authentication
  - oauth2
  - m2m
useCase:
  - call-api
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

With machine-to-machine (M2M) apps, however, the system authenticates and authorizes the app rather than a user.

## How it works

When your app needs to fetch user data from your API:

1. Your M2M application authenticates with your Auth0 Authorization Server.
2. Auth0 responds with an Access Token.
3. The Access Token can be used to call your API and retrieve requested data.

For M2M applications, Auth0 uses the [Client Credentials Flow](/flows/concepts/client-credentials).

<img src="/media/articles/microsites/overview-flow-call-api-m2m-app.png" alt="Flow Overview for Machine-to-Machine Apps" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure your API</h4>Once you have created your API, you will need to authorize your M2M application and configure any scopes that applications can request during authorization.

  2. <h4>Get an Access Token</h4>Your app requests an Access Token from your Auth0 Authorization Server using the <a href="/flows/concepts/client-credentials">Client Credentials Flow</a>.

  3. <h4>Call your API</h4>When your app calls your API, it includes the retrieved Access Token in the HTTP Authorization header.
:::


To implement the Client Credentials Flow, [follow our Backend/API Quickstarts](/quickstart/backend). The "Calling your API" section shows the required steps.

Or, to use our API endpoints, you can follow our tutorial: [Call Your API Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials).

:::: further-reading

::: guides
  * [Auth0 Backend/API Quickstarts](/quickstart/backend)
  * [Call Your API Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials)
  * [Change scopes and add custom claims to tokens using hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
  * [Token Storage](/tokens/concepts/token-storage)
:::

::: references
  * [SDKs](/libraries)
  * [Auth0 Authentication API](/api/authentication)
  * [OAuth 2.0](/protocols/oauth2)
:::

::: concepts  
  * [Access Tokens](/tokens/concepts/access-tokens)
:::

::::

::: whats-next
  * Auth0 offers many ways to personalize your user's login experience and customize tokens using [rules](/rules) and [hooks](/hooks).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
  * Learn more about the ways Auth0 can help you [manage user profiles](/microsites/manage-users/manage-users-and-user-profiles) and [maintain custom user data](/microsites/manage-users/define-maintain-custom-user-data).
:::
