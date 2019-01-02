---
title: Call Your API from Your Single-Page App
description: Everything you need to know to call your API from your single-page app (SPA)
ctaText: Go to Quickstart
ctaLink: /docs/quickstart/spa
template: microsite
topics:
  - authentication
  - oauth2
  - single-page-apps
  - client-side-apps
useCase:
  - call-api
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token and Access Token that will be passed back to your application. The Access Token can then be used to call your API.

## How it works

When your app needs to fetch user data from your API:

1. If the user is not already authenticated, our SDK redirects the user to your Auth0 Authorization Server, requesting an ID Token.
2. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, SAML), 
3. Auth0 responds with the user's ID Token and Access Token.
3. The Access Token can be used to call your API and retrieve requested data.

For single-page web apps, Auth0 uses the [Single-Page Login Flow](/flows/concepts/single-page-login-flow).

<img src="/media/articles/microsites/overview-flow-call-api-single-page-app.png" alt="Flow Overview for Single-Page Apps" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure your API</h4>Once you have created your API, you will need to configure any scopes that applications can request during authorization.

  2. <h4>Get an Access Token</h4>Your app requests an Access Token from your Auth0 Authorization Server using the <a href="/flows/concepts/single-page-login-flow">Single-Page Login Flow</a>.

  3. <h4>Call your API</h4>When your app calls your API, it includes the retrieved Access Token in the HTTP Authorization header.
:::


The easiest way to implement the Single-Page Login Flow is to [follow our Single-Page App Quickstarts](/quickstart/spa).

You can also use our [Auth0.js](/libraries#auth0-sdks) SDK.

Finally, to use our API endpoints, you can follow our tutorial: [Call Your API Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow).

:::: further-reading

::: guides
  * [Auth0 Single-Page App Quickstarts](/quickstart/spa)
  * [Call Your API Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow)
  * [Change scopes and add custom claims to tokens using hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
:::

::: references
  * [SDKs](/libraries)
  * [Auth0 Authentication API](/api/authentication)
  * [OAuth 2.0](/protocols/oauth2)
:::

::: concepts  
  * [Access Tokens](/tokens/access-token)
  * [Where to store tokens](/security/store-tokens)
:::

::::

::: whats-next
  * Auth0 offers many ways to personalize your user's login experience and customize tokens using [rules](/rules) and [hooks](/hooks).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
  * If you need to add login to your own single-page app, learn how at: [Add Login to Your Single-Page App](/microsites/add-login/add-login-single-page-app).
:::
