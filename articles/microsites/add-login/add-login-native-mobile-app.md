---
title: Add Login to My Native/Mobile App
description: Everything you need to know to implement login for a native/mobile app.
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
  - add-login
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to [accounts.google.com](http://accounts.google.com) whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token and Access Token that will be passed back to your application. The Access Token can then be used to call an API and extract attributes for that user (such as name, email, role, or a custom attribute).

## How it works

In a native/mobile application, the default experience will open a SafariViewController in iOS, or a Custom Chrome Tab in Android. 

1. The user clicks your **Login** button or link.
2. Our SDK redirects the user to your Auth0 Authorization Server.
3. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, SAML).
4. Auth0 responds with the user's ID Token and Access Token.
5. The Access Token can be used to call an API and retrieve their information.

For security in native/mobile devices, Auth0 uses the [Mobile Login Flow](/flows/concepts/mobile-login-flow).

![Flow Overview for Native/Mobile Apps](/media/articles/microsites/add-login/overview-flow-native-mobile-app.png)


## Implementation overview

::: steps [{ data-title="Steps for adding login" }]
  1. Configure the sign-in methods. 
  
  Auth0 supports a wide range of authentication methods: regular username/password (users can be stored in Auth0 or your own database), social (like Google, Facebook, and 50+ other providers), passwordless (email magic link, email code, and phone code), and enterprise (e.g., SAML-based, ADFS, Ping, Okta).

Go to the dashboard and turn on the methods you want to allow; they will automatically show up in the login/signup page. By default, email/password and Google are enabled.

  2. Customize the sign-in UI (optional).
  
  The default experience is demonstrated in the image below and can be completely customized in the dashboard, from changing the logo and primary colors to completely overriding it with your own login screen.
  
  ![Default Login Screen for Native/Mobile Apps](/media/articles/microsites/add-login/login-screen-native-mobile-app.png)
  
  3. Use the Auth0 SDK to trigger the flow.
  
  The SDK will take care of the details of opening the SafariViewController or Chrome Custom Tab, parsing the response back from Auth0, and validating the ID Token. Your app can store the Access Token and a Refresh Token used to renew the Access Token without asking the user to re-enter their credentials. Follow one of our [Native/Mobile Quickstarts](/quickstart/native) to get started with the integration.

:::


## Alternative: Use Embedded Login

If you prefer to embed your own login pages within your native/mobile app, you can implement our login widget (Lock UI) directly into your app with our:

* [iOS Lock UI Component library](/libraries/lock-ios/v2)
* [Android Lock UI Component library](/libraries/lock-android/v2)

:::: further-reading

::: guides
  * [Auth0 Mobile/Native App Quickstarts](/quickstart/native)
  * [Add login using the mobile login flow](/flows/guides/mobile-login-flow/add-login-using-mobile-login-flow)
  * [Customize the hosted login page](/hosted-pages/login#how-to-customize-your-login-page)
:::

::: references
  * [Identity Providers supported by Auth0](/connections/identity-providers-supported)
  * [SDKs](/libraries)
:::

::: concepts
  * [User Profile Overview](/user-profile/overview-user-profile)
  * [Normalized User Profile](/user-profile/normalized/auth0)
  * [User Profiles Returned from OIDC-compliant Pipelnes](/user-profile/normalized/oidc)
  * [Progressive Profiling](/user-profile/progressive-profiling)
  * [GDPR Overview](/compliance/overview-gdpr)
  
  * [Universal vs. Embedded Login](/guides/login/universal-vs-embedded)
  * [ID Tokens](/tokens/id-token)
  * [Access Tokens](/tokens/access-token)
  * [Where to store tokens](/security/store-tokens)
:::

::::

::: whats-next
  * Now that you have the authentication set up and ready to go, learn how you can manage your users. To see everything Auth0 has to offer on this area, [see Manage My Users](microsite-connect-users-to-your-identity-platform)
  * Most SPAs access RESTful APIs to retrieve data. You can do that as well using Auth0. For more information on this, see Call an API.
  * If you are building your own API and you want to secure the endpoints using Auth0, see Protect My API.
:::

