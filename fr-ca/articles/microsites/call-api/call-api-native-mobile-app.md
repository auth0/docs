---
title: Call Your API from Your Native/Mobile App
description: Everything you need to know to call your API from your native/mobile app
ctaText: Go to Quickstart
ctaLink: /docs/quickstart/native
public: false
template: microsite
topics:
  - authentication
  - oauth2
  - mobile-apps
  - desktop-apps
  - native-apps
useCase:
  - call-api
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token and Access Token that will be passed back to your application. The Access Token can then be used to call your API.

## How it works

In a native/mobile application, the default experience will open a SafariViewController in iOS or a Custom Chrome Tab in Android. 

When your app needs to fetch user data from your API:

1. If the user is not already authenticated, our SDK redirects the user to your Auth0 Authorization Server.
2. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, <dfn data-key="security-assertion-markup-language">SAML</dfn>).
3. Your app requests an ID Token, Access Token, and <dfn data-key="refresh-token">Refresh Token</dfn>.
4. Auth0 responds with the requested tokens.
5. The Access Token can be used to call your API and retrieve requested data.

For security in native/mobile devices, Auth0 uses the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce).

<img src="/media/articles/microsites/overview-flow-call-api-native-mobile-app.png" alt="Flow Overview for Native/Mobile Apps" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure your API</h4>Once you have created your API, you will need to configure any scopes that applications can request during authorization.

  2. <h4>Get an Access Token</h4>Your app requests an Access Token (and optionally, a Refresh Token) from your Auth0 Authorization Server using the <a href="/flows/concepts/auth-code-pkce">Authorization Code Flow with PKCE</a>.

  3. <h4>Call your API</h4>When your app calls your API, it includes the retrieved Access Token in the HTTP Authorization header.
  
  4. <h4>Refresh your Access Token</h4>When the Access Token expires you can use the Refresh Token to get a new one from your Auth0 Authorization Server.

:::


The easiest way to implement the Authorization Code Flow with PKCE is to [follow our Mobile/Native Quickstarts](/quickstart/native).

You can also use our mobile SDKs:

* [Auth0 Swift SDK](/libraries/auth0-swift)
* [Auth0 Android SDK](/libraries/auth0-android)

Finally, to use our API endpoints, you can follow our tutorial: [Call Your API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce).

:::: further-reading

::: guides
  * [Auth0 Mobile/Native App Quickstarts](/quickstart/native)
  * [Call Your API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce)
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
  * If you would like to make your native/mobile app work with input-constrained devices, see [Call Your API from an Input-Constrained Device](/microsites/call-api/call-api-device).
  * If you need to add login to your own native/mobile app, learn how at: [Add Login to Your Native/Mobile App](/microsites/add-login/add-login-native-mobile-app).
:::
