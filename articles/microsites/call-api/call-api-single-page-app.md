---
title: Call My API from a Single Page App
description: Learn how to call your API from Single Page Apps (SPAs).
template: microsite
---

# Call My API from a Single Page App - DRAFT

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token and Access Token that will be passed back to your application. The Access Token can then be used to call an API and extract attributes for that user (such as name, email, role, or a custom attribute).

## How it works

In a single page application:

::: steps 
  1. The user clicks your **Login** button or link.
  2. Our SDK redirects the user to your Auth0 Authorization Server.
  3. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, SAML).
  4. Auth0 responds with the user's ID Token.
  5. The Access Token can be used to call an API and retrieve their information.
:::

For security in single page applications, Auth0 uses the 0Auth 2.0 Hybrid Login Flow.

*insert data flow diagram here*

## How to implement it

::: steps
  1. Configure the sign in methods. 
     - Auth0 supports a wide range of authentication methods: regular username/password (users can be stored in Auth0 or your own database), social (like Google, Facebook, and 50+ other providers), passwordless (email magic link, email code, and phone code), and enterprise (e.g., SAML-based, ADFS, Ping, Okta).
     - Go to the dashboard and turn on the methods you want to allow; they will automatically show up in the login/signup page. By default, email/password and Google are enabled.
  2. Customize the sign in UI (optional). 
     - The default experience is demonstrated in the image below and can be completely customized in the dashboard, from changing the logo and primary colors to completely overriding it with your own login screen.
  3. Use the Auth0 SDK to trigger the flow.
     - Our SDK will take care of the details of opening the login screen, parsing the response back from Auth0, and validating the ID Token. Your application can store the Access Token and a Refresh Token used to renew the Access Token without asking the user to re-enter their credentials. Follow one of our [Single Page App Quickstarts](/quickstart/spa) to get started with the integration.

### Alternative method: Use Embedded Login

If you prefer to embed your own login pages within your single page application, you can implement our login widget (Lock UI) directly into your application with our [Lock v11 for Web](/libraries/lock/v11).


:::: further-reading
::: concepts
  * [Universal vs. Embedded Login](/guides/login/universal-vs-embedded)
  * [ID Tokens](/tokens/id-token)
  * [Access Tokens](/tokens/access-token)
:::

::: guides
  * [Implement the Hybrid Login Flow](/api-auth/tutorials/hybrid-flow)
  * [Customize Hosted Login Page](/hosted-pages/login#how-to-customize-your-login-page)
  * [Refresh Users' Sessions](/api-auth/tutorials/silent-authentication)
:::

::: references
  * [Where to Store Tokens](/security/store-tokens)
  * [Identity Providers Supported by Auth0](/identityproviders)
  * [Single Page App Quickstart](/quickstart/spa)
  * [Auth0 SDKs](/libraries)
:::
::::

::: whats-next
  * Auth0 offers many ways to personalize your user's login experience using [rules](/rules/current) and [hooks](/hooks).
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect My API](/microsites/protect-my-api).
:::
