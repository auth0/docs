---
title: Connect Users to Your Identity Platform
description: Learn about Auth0 features for connecting users to your identity platform and get links to all the related documents.
contentType: concept
template: microsite
topics: users
useCase: manage-users
---
::: full-panel
# Overview
To make your login process easy-to-use and as seamless as possible, you'll need to keep track of where you want to route users inside your application once Auth0 redirects users back to your application after authentication.

You can use the Auth0 Authentication API to create client-side and server-side web applications that use [OpenID Connect](/protocols/oidc) and [OAuth 2.0](/protocols/oauth2) to authenticate users and get their authorization to access protected resources. Authenticate users of your mobile/desktop applications using one of the following methods:

* Use the **Lock** drop-in authentication widget which provides a standard set of behaviors and a customizable user interface. For more information, refer to [Lock Reference Docs](/libraries#lock).

* Use one of the **Auth0 SDKs** which are client-side libraries that allow you to customize the authentication behavior and the appearance of the login screen. For more information, refer to [Auth0 Libraries](/libraries).

* Call the **Authentication API** endpoints which help you integrate with Auth0 without requiring the Auth0's libraries. For more information, refer to [Authentication API](/api/authentication). You can call endpoints through an embedded browser in your native application. After authentication completes, you can return an [ID Token](/tokens/id-token) (which contains information about the identity of the user) and an [Access Token](/tokens/access-token).

During a user's authentication, the redirect_uri request parameter is used as a callback URL. This is where your application will receive and process the response from Auth0, and where the users will be redirected once the authentication is complete. For more information on how the redirect_uri works, see [OAuth 2.0](/protocols/oauth2).
:::

::: full-panel
# Learn More 

The documents listed below will show you how to perform all these tasks as well as provide you with high-level conceptual and reference information. 
:::

::: half-panel
## Tutorials
* [Request the Name and Profile Picture](/application-auth/current/client-side-web#request-the-name-and-profile-picture)
* [Request a User Login with GitHub](/application-auth/current/client-side-web#request-a-user-log-in-with-github)
:::

::: half-panel
## How-tos
* [Call an Identity Provider API](/connections/calling-an-external-idp-api)
* [Add Scopes/Permissions to Call Identity Provider's APIs](/connections/adding-scopes-for-an-external-idp)
* [Pass Parameters to Identity Providers](/connections/pass-parameters-to-idps)
* [Test a Partner Connection](/connections/how-to-test-partner-connection)
* [Create Database Connections](/connections/database)
* [Passwordless Authentication User Guide](/connections/passwordless/user-guide)
* [Manage User Access to Applications](/user-profile/manage-user-access-to-applications)
* [Register Your Application](/application-auth/current/client-side-web#register-your-applications)
* [Call the Authorization URL](/application-auth/current/client-side-web#call-the-authorization-url)
* [Handle the Callback](/application-auth/current/client-side-web#handle-the-callback)
* [Create a Random Key and Code Challenge](/application-auth/current/mobile-desktop#step-1-create-a-random-key-and-the-code-challenge)
* [Authorize the User](/application-auth/current/mobile-desktop#step-2-authorize-the-user)
* [Obtain an ID Token](/application-auth/current/mobile-desktop#step-3-obtain-an-id-token)
:::

::: half-panel
## Concepts
* [Authentication Modes with Lock](/libraries/lock/v11/authentication-modes)
* [The Authentication Flow](/application-auth/current/client-side-web#the-authentication-flow)
* [GDPR Overview](/compliance/overview-gdpr)
:::

::: half-panel
## References
* [Passwordless FAQs](/connections/passwordless/faq)
* [Password Security Tips](/anomaly-detection/password-security-tips)
* [Identity Providers Supported](/connections/identity-providers-supported)
* [Identity Provider Access Tokens](/tokens/idp)
* [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
* [Authorization Extensions](/extensions/authorization-extension/v2/index)
* [A Basic Authentication Request](/application-auth/current/client-side-web#a-basic-authentication-request)
* [Lock Library](https://github.com/auth0/lock)
* [Lock Reference Docs](/libraries#lock)
* [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
* [Authentication API](/api/authentication)
* [Auth0 Libraries](/libraries)
* [OAuth 2.0 Protocol](/protocols/oauth2)
:::

::: full-panel
# What's Next

* [Manage Users and User Profiles](microsite-manage-users-and-user-profiles)
* [Manage User Metadata](microsite-manage-user-metadata)
:::