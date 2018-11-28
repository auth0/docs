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


## How to add login in to your Single App
::: prerequisites
  * Example Prereq One
    - Qui ut quasi praesentium voluptatem explicabo. Sed perferendis est nemo sint asperiores.Architecto vero ut sit sapiente.
  * Example Prereq Two
    - Qui ut quasi praesentium voluptatem explicabo. Sed perferendis est nemo sint asperiores.Architecto vero ut sit sapiente.
  * Example Prereq Three
    - Qui ut quasi praesentium voluptatem explicabo. Sed perferendis est nemo sint asperiores.Architecto vero ut sit sapiente.
  * Example Prereq Four
    - Qui ut quasi praesentium voluptatem explicabo. Sed perferendis est nemo sint asperiores.Architecto vero ut sit sapiente.
:::

::: steps [{ data-title="Steps for Adding login" }]
  1. [Add your application within the Auth0 Dashboard](/user-profile/overview-user-profile). This will be the entity that represents your application in Auth0. When you do that, a unique key is generated for your app (called Client Id). This must be part of the request every time you login a user.
  2. At the Dashboard > Application > Settings, specify the URL of your app where Auth0 will redirect users after they authenticate.
  3. Enable the login options you want to offer to your users (for example, username/password, social media, enterprise directories, multifactor authentication, etc).
  4. Edit your code to redirect to Auth0 when the user wants to authenticate. Use one of our libraries to do that or call directly our Authentication API.
  5. Parse the callback results and restore your application's previous state.  For example, if the user tried to access their profile information and at that point you asked them to login, once they do you must redirect them to the profile page they were trying to access.
:::

:::: further-reading
::: concepts
  * [User Profile Overview](/user-profile/overview-user-profile)
  * [Normalized User Profile](/user-profile/normalized/auth0)
  * [User Profiles Returned from OIDC-compliant Pipelnes](/user-profile/normalized/oidc)
  * [Progressive Profiling](/user-profile/progressive-profiling)
  * [GDPR Overview](/compliance/overview-gdpr)
:::

::: guides
  * [Search for Users](/search/v3)
  * [Fix Breached Passwords](/anomaly-detection/breached-passwords)
  * [View User Profiles](/user-profile/view-users)
  * [Update User Profiles Using Your Database](/user-profile/update-user-profiles-using-your-database)
  * [Create Users Using the Dashboard](/dashboard/create-users)
  * [Manage Users Using the Management API](/user-profile/manage-users-using-the-management-api)
  * [Delete Users](/user-profile/delete-users)
  * [Change User Pictures](/user-profile/change-user-pictures)
  * [Change User Passwords](/connections/database/password-change)
  * [Get User Information with Unbounce Landing Pages](get-user-information-with-unbounce-landing-pages)
  * [Redirect Users After Login](redirect-users-after-login)
  * [Fix Breached Passwords](/anomaly-detection/fix-breached-passwords)
  * [Block and Unblock Users](/user-profile/block-and-unblock-users)
  * [Impersonate Users Using the Dashboard](/user-profile/impersonate-users-using-the-dashboard)
  * [Impersonate Users Using the Impersonation API](/user-profile/impersonate-users-using-the-impersonation-api)
  * [User Import/Export Extension](/extensions/user-import-export)
  * [Authorization Extension](/extensions/authorization-extension/v2)
  * [Delegated Administration Extension](/extensions/delegated-admin/v3)
:::

::: references
  * [User Profile Structure](/user-profile/user-profile-structure)
  * [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
  * [User Search Best Practices](/user-profile/user-search-best-practices)
  * [User Search Query Syntax](/search/v3/query-syntax)
  * [Password Security Tips](/anomaly-detection/password-security-tips)
  * [Identity Providers Supported](/connections/identity-providers-supported)
  * [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
:::
::::

::: whats-next
  * Now that you have the authentication set up and ready to go, learn how you can manage your users. To see everything Auth0 has to offer on this area, [see Manage My Users](microsite-connect-users-to-your-identity-platform)
  * Most SPAs access RESTful APIs to retrieve data. You can do that as well using Auth0. For more information on this, see Call an API.
  * If you are building your own API and you want to secure the endpoints using Auth0, see Protect My API.
:::

