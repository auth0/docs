---
title: Call Another API from Your API
description: Everything you need to know to call another API from your API.
template: microsite
topics:
  - authorization
  - oauth2
  - on-behalf-of
  - token-exchange
useCase:
  - call-api
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token and Access Token that will be passed back to your application. The Access Token can then be used to call your API.

Sometimes your API will need to call another API. To do so, it will need to propagate the user's identity and permissions through the request chain. Then Auth0 will generate another Access Token that can be used from your API to call another API.

## How it works

When your app needs to fetch user data from your API:

1. The user authenticates using the appropriate [authentication flow](/flows), and your app requests an ID Token, Access Token, and Refresh Token.
2. Auth0 responds with the requested tokens.
3. Your app uses the Access Token to call API A.
4. API A requests an Access Token for API B.
5. Auth0 responds with Access Token B.
6. Access Token B can be used to call API B and retrieve requested data.

For additional APIs, Auth0 uses the [On-Behalf-0f Flow](/flows/concepts/on-behalf-of).

<img src="/media/articles/microsites/overview-flow-call-api-another-api.png" alt="Flow Overview for Another API" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure your APIs</h4>Once you have created your source and target APIs, you will need to pair your APIs and configure any scopes that applications can request during authorization.

  2. <h4>Get Access Token</h4>Your app requests an Access Token from your Auth0 Authorization Server using any <a href="/flows">authentication flow</a> appropriate for your application type.

  3. <h4>Call your source API</h4>When your app calls your source API, it includes the retrieved Access Token in the HTTP Authorization header.

  4. <h4>Exchange Access Token</h4>Your source API requests an Access Token for the target API from your Auth0 Authorization Server using the <a href="/flows/concepts/on-behalf-of">On-Behalf-Of Flow</a>.

  5. <h4>Call your target API</h4>When your source API calls your target API, it includes the retrieved Access Token in the HTTP Authorization header.
:::

To implement the On-Behalf-Of Flow, you can follow our tutorial: [Call Your API Using the On-Behalf-Of Flow](/flows/guides/on-behalf-of/call-api-on-behalf-of).

:::: further-reading

::: guides
  * [Auth0 Backend/API Quickstarts](/quickstart/backend)
  * [Call Your API Using the On-Behalf-Of Flow](/flows/guides/on-behalf-of/call-api-on-behalf-of)
  * [Change scopes and add custom claims to tokens using hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
:::

::: references
  * [SDKs](/libraries)
  * [Auth0 Authentication API](/api/authentication)
  * [OAuth 2.0](/protocols/oauth2)
:::

::: concepts  
  * [Access Tokens](/tokens/access-tokens)
  * [Where to store tokens](/security/store-tokens)
:::

::::

::: whats-next
  * Learn how to [Add Login to Your Native/Mobile App](/microsites/add-login/add-login-native-mobile-app), [Add Login to Your Regular Web App](/microsites/add-login-regular-web-app), or [Add Login to Your Single-Page App](/microsites/add-login-single-page-app).
  * Auth0 offers many ways to personalize your user's login experience and customize tokens using [rules](/rules) and [hooks](/hooks).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
  * Learn more about the ways Auth0 can help you [manage user profiles](/microsites/manage-users/manage-users-and-user-profiles) and [maintain custom user data](/microsites/manage-users/define-maintain-custom-user-data).
:::
