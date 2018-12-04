---
title: Call My API from My Native/Mobile App
description: Everything you need to know to call your API from your native/mobile app.
ctaText: Go to Quickstart
ctaLink: /docs/quickstarts/native
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

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to [accounts.google.com](http://accounts.google.com) whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token and Access Token that will be passed back to your application. The Access Token can then be used to call your API and extract attributes for that user (such as name, email, role, or a custom attribute)

## How it works

In a native/mobile application, the default experience will open a SafariViewController in iOS or a Custom Chrome Tab in Android. 

When your app needs to fetch user data from your API:

1. If the user is not already authenticated, our SDK redirects the user to your Auth0 Authorization Server.
2. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, SAML).
3. Your app requests tokens on behalf of the user.
4. Auth0 responds with the user's ID Token and an Access Token.
5. The Access Token can be used to call your API and retrieve requested data.

For security in native/mobile devices, Auth0 uses the [Mobile Login Flow](/flows/concepts/mobile-login-flow).

<img src="/media/articles/microsites/call-api/overview-flow-call-api-native-mobile-app.png" alt="Flow Overview for Native/Mobile Apps" width="100%">

## Implementation overview

::: steps
  1. <strong>Configure your API</strong><br/><br/>Once you have created your API, you will need to configure any scopes that applications can request during authorization.

  2. <strong>Get an Access Token</strong><br/><br/>Your app requests an Access Token (and optionally, a Refresh Token) from your Auth0 Authorization Server using the [Mobile Login Flow](/flows/concepts/mobile-login-flow).

  3. <strong>Call your API</strong><br/><br/>When your app calls your API, it includes the retrieved Access Token in the HTTP Authorization header.
  
  4. <strong>Refresh your Access Token</strong><br/><br/>When the Access Token expires you can use the Refresh Token to get a new one from your Auth0 Authorization Server.

:::


## How to implement

The easiest way to implement the Mobile Login Flow is to follow our Mobile/Native Quickstarts.

You can also use our mobile SDKs:

Auth0 Swift SDK
Auth0 Android SDK
Finally, to use our API endpoints, you can follow our tutorial: Call My API Using the Mobile Login Flow.

:::: further-reading

::: guides
  * [Auth0 Mobile/Native App Quickstarts](/quickstart/native)
  * [Add login using the mobile login flow](/flows/guides/mobile-login-flow/add-login-using-mobile-login-flow)
  * [Customize the hosted login page](/hosted-pages/login#how-to-customize-your-login-page)
:::

::: references
  * [SDKs](/libraries)
  * [Identity Providers supported by Auth0](/connections/identity-providers-supported)
:::

::: concepts  
  * [Universal vs. Embedded Login](/guides/login/universal-vs-embedded)
  * [ID Tokens](/tokens/id-token)
  * [Access Tokens](/tokens/access-token)
  * [Where to store tokens](/security/store-tokens)
:::

::::

::: whats-next
  * Auth0 offers many ways to personalize your user's login experience and customize tokens using [rules](/rules) and [hooks](/hooks).
  * Most native/mobile apps access APIs to retrieve data, which can also be done using Auth0. Learn how to call your API from your app in our tutorial: [Call My API from My Native/Mobile App](/microsites/call-api/call-api-native-mobile-app).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect My API](/microsites/protect-api/protect-api).
:::
