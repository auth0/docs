---
title: Add login to my Single Page App
description: Everything you need to know to implement the login flow for Single Page Applications (SPAs)
template: microsite
---

Welcome! Let's see what you have to do to add login to your Single Page Application (SPA) and no, 
you won't have to study any protocols to get this working.

## Overview

### How does login work with Auth0?

Every time one of your users clicks Log In or Sign Up, your app calls Auth0. Auth0 loads your app's configuration, redirects the user to the login page hosted by Auth0, and displays the available login options such as, username/password, Login with Google, etc.. Auth0 verifies your user's identity and sends the basic user information back to your app included in a signed token. Once the user successfully authenticates, Auth0 redirects the user back to your app (to a preconfigured URL that you specify) informing your app at the same time about the logged in user's information. If you have a user database you can use it with Auth0. If not, no problem. You can use Auth0's user data store, social connections (like Google or Facebook), or enterprise directories (like Active Directory).  You can also choose to use a combination of those, based on your needs.  Think of Auth0 as an identity hub that supports all major identity providers and various protocols. Want to add Google login to your app? You can enable it with a flip of a switch in the Auth0 Dashboard, add your Google keys, and have it available on the next login. And if GDPR affects you, we are here for you. We have tools you can use to comply with this regulation. 
We have a lot of additional building blocks you can use like Single Sign-On, Multi-factor Authentication, Password policies, Anomaly Detection, and more.

### What standards does Auth0 use?

The standards that this flow uses are OAuth 2.0 and OpenID Connect.

OAuth 2.0 grants authorization. It enables you to authorize the Web App A to access your information from Web App B, without sharing your credentials. Instead Web App A authenticates with an Authorization Server (in our case, Auth0) once, and the server sends to the application a token that can be used as credentials in order to access the protected resources of Web App B. These tokens are called Access Tokens. The issue with OAuth 2.0 is that it doesn't include any authentication mechanisms to let you know who the user is that authenticated and granted authorization to the app. Access Tokens are meant for APIs and they must be validated before they are used.

OpenID Connect (OIDC) builds on OAuth 2.0. It enables users verify their identity and give some basic profile information without sharing their credentials. An example is a to-do application which lets users log in using their Google account and then push their to-do items as calendar entries to their Google Calendar. The part where they authenticate their identity is implemented via OpenID Connect, while the part where they authorize the to-do application to modify their calendar by adding entries is implemented via OAuth 2.0. OIDC uses tokens called ID Tokens that contain information about the user, and what they authorized, as a JSON object. ID Tokens are meant for applications and they must be validated before they are used.
OAuth 2.0 comes in different flavors and the one we use for SPAs is the Implicit Grant.

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
