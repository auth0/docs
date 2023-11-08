---
title: Add Login to Your Single-Page App
description: Everything you need to know to implement login for a single-page app (SPA)
ctaText: Go to Quickstart
ctaLink: /docs/quickstart/spa
public: false
template: microsite
topics:
  - authentication
  - oauth2
  - single-page-apps
  - client-side
useCase:
  - add-login
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token that will be passed back to your application.

## How it works

In a single-page application (SPA): 

1. The user clicks your "login" button or link, and our SDK redirects the user to your Auth0 Authorization Server.
2. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, <dfn data-key="security-assertion-markup-language">SAML</dfn>).
3. Your app requests the user's ID Token.
4. Auth0 responds with the user's ID Token.

For security in SPAs, Auth0 uses the [Authorization Code Flow with PKCE](/flows/concepts/auth-code-pkce).

<img src="/media/articles/microsites/overview-flow-add-login-single-page-app-pkce.png" alt="Flow Overview for Single-Page Apps with Auth Code Flow with PKCE" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure the sign-in methods</h4>Auth0 supports a wide range of authentication methods: regular username/password (users can be stored in Auth0 or your own database), social (i.e., Google, Facebook, and 50+ other providers), <dfn data-key="passwordless">passwordless</dfn> (email magic link, email code, and phone code), and enterprise (e.g., SAML-based, ADFS, Ping, Okta).<br/><br/>Go to the dashboard and turn on the methods you want to allow; they will automatically show up in the login/sign-up page. By default, email/password and Google are enabled.

  2. <h4>Customize the sign-in UI (optional)</h4>The default experience is demonstrated in the image below and can be completely customized in the dashboard, from changing the logo and primary colors to completely overriding it with your own login screen.<br/><br/><img src="/media/articles/microsites/login-screen-default-web.png" alt="Default Login Screen for Native/Mobile Apps" width="70%">

  3. <h4>Use the Auth0 SDK to trigger the flow</h4>The SDK will take care of the details of redirecting to Auth0, parsing the response back, and validating the ID Token.<br/><br/>Your app can keep the ID Token in memory.<br/><br/>The easiest way to implement the Authorization Code Flow with PKCE is to follow our <a href="/quickstart/spa">Single-Page App Quickstarts</a>. You can also use our <a href="/libraries/auth0-spa-js">Auth0 Single-Page App SDK</a>.
:::

:::: further-reading

::: guides
  * [Auth0 Single-Page App Quickstarts](/quickstart/spa)
  * [Add login using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/add-login-auth-code-pkce)
  * [Add login using the Implicit Flow](/flows/guides/implicit/add-login-implicit)
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
  * [Access Tokens](/tokens/concepts/access-tokens)
:::

::::

::: whats-next
  * Auth0 offers many ways to personalize your user's login experience and customize tokens using [rules](/rules) and [hooks](/hooks).
  * Many single-page apps access APIs to retrieve data, which can also be done using Auth0. Learn how to call your API from your app: [Call Your API from Your Single-Page App](/microsites/call-api/call-api-single-page-app).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
:::

