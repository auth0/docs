---
title: Add Login to Your Regular Web App
description: Everything you need to know to implement login for a regular web app
ctaText: Go to Quickstart
ctaLink: /docs/quickstart/webapp
template: microsite
topics:
  - authentication
  - oauth2
  - regular-web-apps
  - server-side
useCase:
  - add-login
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token that will be passed back to your application.

## How it works

In a regular web application: 

1. The user clicks your "login" button or link, and our SDK redirects the user to your Auth0 Authorization Server.
3. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, SAML).
3. Your app requests the user's ID Token.
4. Auth0 responds with the user's ID Token.

For security in server-side web apps, Auth0 uses the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow).

<img src="/media/articles/microsites/overview-flow-add-login-regular-web-app.png" alt="Flow Overview for Regular Web Apps" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure the sign-in methods</h4>Auth0 supports a wide range of authentication methods: regular username/password (users can be stored in Auth0 or your own database), social (i.e., Google, Facebook, and 50+ other providers), passwordless (email magic link, email code, and phone code), and enterprise (e.g., SAML-based, ADFS, Ping, Okta).<br/><br/>Go to the dashboard and turn on the methods you want to allow; they will automatically show up in the login/sign-up page. By default, email/password and Google are enabled.

  2. <h4>Customize the sign-in UI (optional)</h4>The default experience is demonstrated in the image below and can be completely customized in the dashboard, from changing the logo and primary colors to completely overriding it with your own login screen.<br/><br/><img src="/media/articles/microsites/login-screen-default-web.png" alt="Default Login Screen for Native/Mobile Apps" width="70%">

  3. <h4>Use an SDK for your chosen platform to trigger the flow</h4>An open-source OpenID Connect SDK for your chosen platform can redirect to the Auth0 Universal Login page and handle the response, validating the ID Token.<br/><br/>Your app can store the ID Token. Follow one of our <a href="/quickstart/webapp">Regular Web App Quickstarts</a> to get started with the integration.
:::

:::: further-reading

::: guides
  * [Auth0 Regular Web App Quickstarts](/quickstart/webapp)
  * [Add login using the regular web app login flow](/flows/guides/regular-web-app-login-flow/add-login-using-regular-web-app-login-flow)
  * [Customize the hosted login page](/hosted-pages/login#how-to-customize-your-login-page)
:::

::: references
  * [SDKs](/libraries)
  * [Identity Providers supported by Auth0](/connections)
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
  * Most regular web apps access APIs to retrieve data, which can also be done using Auth0. Learn how to call your API from your app: [Call Your API from Your Regular Web App](/microsites/call-api/call-api-regular-web-app).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
:::


