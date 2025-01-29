---
title: Add Login to Your Native/Mobile App
description: Everything you need to know to implement login for a native/mobile app
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
  - add-login
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token that will be passed back to your application.

## How it works

In a native/mobile application, the default experience will open a SafariViewController in iOS or a Custom Chrome Tab in Android. 

1. The user clicks your "login" button or link, and our SDK redirects the user to your Auth0 Authorization Server.
2. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, <dfn data-key="security-assertion-markup-language">SAML</dfn>).
3. Your app requests the user's ID Token.
4. Auth0 responds with the user's ID Token.

For security in native/mobile devices, Auth0 uses the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce).

<img src="/media/articles/microsites/overview-flow-add-login-native-mobile-app.png" alt="Flow Overview for Native/Mobile Apps" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure the sign-in methods</h4>Auth0 supports a wide range of authentication methods: regular username/password (users can be stored in Auth0 or your own database), social (i.e., Google, Facebook, and 50+ other providers), <dfn data-key="passwordless">passwordless</dfn> (email magic link, email code, and phone code), and enterprise (e.g., SAML-based, ADFS, Ping, Okta).<br/><br/>Go to the dashboard and turn on the methods you want to allow; they will automatically show up in the login/sign-up page. By default, email/password and Google are enabled.

  2. <h4>Customize the sign-in UI (optional)</h4>The default experience is demonstrated in the image below and can be completely customized in the dashboard, from changing the logo and primary colors to completely overriding it with your own login screen.<br/><br/><img src="/media/articles/microsites/login-screen-default-mobile.png" alt="Default Login Screen for Native/Mobile Apps" width="30%">

  3. <h4>Use the Auth0 SDK to trigger the flow</h4>The SDK will take care of the details of opening the SafariViewController or Chrome Custom Tab, parsing the response back from Auth0, and validating the ID Token.<br/><br/>Your app can store the Access Token and a <dfn data-key="refresh-token">Refresh Token</dfn> used to renew the Access Token without asking the user to re-enter their credentials. Follow one of our <a href="/quickstart/native">Native/Mobile Quickstarts</a> to get started with the integration.

:::

## Alternative: Use Embedded Login

While we strongly recommend that you use our hosted universal login page, if you prefer to embed your own login pages within your native/mobile app, you can implement our login widget (Lock UI) directly into your app with our:

* [iOS Lock UI Component library](/libraries/lock-ios/v2)
* [Android Lock UI Component library](/libraries/lock-android/v2)

:::: further-reading

::: guides
  * [Auth0 Mobile/Native App Quickstarts](/quickstart/native)
  * [Add login using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/add-login-auth-code-pkce)
  * [Add Facebook Login to Native Apps](/connections/nativesocial/facebook)
  * [Add Sign In with Apple to Native iOS Apps](/connections/nativesocial/apple)
  * [Embedded Passwordless Login in Native Applications](/connections/passwordless/embedded-login-native)
  * [Customize the universal login page](/universal-login)
  * [Token Storage](/tokens/concepts/token-storage)
:::

::: references
  * [SDKs](/libraries)
  * [Identity Providers supported by Auth0](/connections)
:::

::: concepts  
  * [Universal vs. Embedded Login](/guides/login/universal-vs-embedded)
  * [ID Tokens](/tokens/concepts/id-tokens)
  * [Access Tokens](/tokens/access-token)
:::

::::

::: whats-next
  * Auth0 offers many ways to personalize your user's login experience and customize tokens using [rules](/rules) and [hooks](/hooks).
  * Most native/mobile apps access APIs to retrieve data, which can also be done using Auth0. Learn how to call your API from your app: [Call Your API from Your Native/Mobile App](/microsites/call-api/call-api-native-mobile-app).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
:::

