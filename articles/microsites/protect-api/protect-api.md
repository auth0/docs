---
title: Protect Your API
description: Everything you need to know to protect your API
template: microsite
topics:
  - authentication
  - oauth2
  - apis
useCase:
  - secure-api
---

Using Auth0 to protect your API means that you will be "outsourcing" the authentication process to a centralized service that will help you ensure only approved applications can access your data. The calling application will authenticate the user, and Auth0 will generate tokens that can be passed to your API. Auth0 can also help you verify the tokens you receive from the applications that call your API.

## How it works

Your API will receive a request including an Access Token: 

1. An app authenticates a user with Auth0.
2. Auth0 responds with the user's ID Token and Access Token.
3. The app calls your API, passing along the Access Token.
4. Your API validates the Access Token.
5. Your API responds with the requested information.

<img src="/media/articles/microsites/overview-flow-protect-api.png" alt="Flow Overview for Protect API" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure your API</h4>Auth0 supports access from various application types. If you expect a machine-to-machine (M2M) app to call your API, go to the dashboard and authorize them to request Access Tokens.<br/>You can also allow your API to skip user consent for your own apps and identify your API's scopes. If you're building a public-facing API, you'll need to let external callers know which of these scopes are available to them and provide guidance on how they can call your API.

  2. <h4>Use a JWT validation library to validate tokens</h4>The library will take care of the details of parsing and validating the received tokens. This consists of a series of steps, and if any of these fails, then you must reject the application's request. Follow one of our <a href="/quickstart/backend">Backend/API Quickstarts</a> to get started.

  3. <h4>Respond to the request</h4>Once your token has been successfully validated, respond to the calling application with their requested data.

:::


:::: further-reading

::: guides
  * [Configure an API](/apis#how-to-configure-an-api-in-auth0)
  * [Auth0 Backend/API Quickstarts](/quickstart/backend)
  * [Validate an Access Token for custom APIs](/tokens/guides/validate-access-tokens)
:::

::: references
  * [OAuth 2.0](/protocols/oauth2)
  * [Auth0 Authentication API](/api/authentication)
:::

::: concepts  
  * [Tokens](/tokens)
  * [Access Tokens](/tokens/concepts/access-tokens)
  * [Scopes](/scopes)
  * [Dynamic client registration](/api-auth/dynamic-client-registration)
:::

::::

::: whats-next
  * Auth0 offers many ways to personalize your user's login experience and customize tokens using [rules](/rules) and [hooks](/hooks).
  * Learn how to call your API from your app: [Call Your API from My Native/Mobile App](/microsites/call-api/call-api-native-mobile-app), [Call Your API from My Regular Web App](/microsites/call-api/call-api-regular-web-app), [Call Your API from Your Single-Page App](/microsites/call-api/call-api-single-page-app), or [Call Your API from a M2M App](/microsites/call-api/call-api-m2m-app).
  * If you are building your own application and you want to log users in using Auth0, learn to add login to your app: [Add Login to Your Native/Mobile App](/microsites/add-login/add-login-native-mobile-app), [Add Login to Your Regular Web App](/microsites/add-login/add-login-regular-web-app), or [Add Login to Your Single-Page App](/microsites/add-login/add-login-single-page-app).
:::


