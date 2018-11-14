---
title: Connect Users to My Identity Platform
description: An introduction to the concepts and tasks related to how Auth0 enables you to connect users to your apps based on their user profile information. 
contentType: microsite
topics:
  - users
  - user-management
  - connect-users
useCase: manage-users
template: microsite
v2: True
---

# Connect Users to My Identity Platform - DRAFT

You can connect users to your identity platform using popular social media providers like [Facebook, Google, and Twitter](/identityproviders). Alternatively, enterprises might opt to use SD, LDAP, SAML and more to authenticate users. You can also create connections that don't require your users to [remember passwords](/connections/passwordless/user-guide) and specify which users have access to [which apps](/user-profile/manage-user-access-to-applications). 

## How do I connect users based on their profile?

Use the Auth0 Authentication API to create client- and server-side web apps that use [OpenID Connect](/protocols/oidc) and [OAuth 2.0](protocols/oauth2) standards to authenticate users and get their authorization to access protected resources. Authenticate users of your mobile/desktop applications using one of the following methods:

* Use the [Lock](/libraries#lock) drop-in authentication widget which provides a standard set of behaviors and a customizable user interface. 
* Use one of the [Auth0 SDKs](/libraries) which are client-side libraries that allow you to customize the authentication behavior and the appearance of the login screen. 
* Call the [Authentication API](/api/authentication) endpoints which help you integrate with Auth0 without requiring the Auth0's libraries. You can call endpoints through an embedded browser in your native application. After authentication completes, you can return an [ID Token](/tokens/id-token) (which contains information about the identity of the user) and an [Access Token](/tokens/concepts/overview-access-tokens).

## Can I determine where to route users after authentication?

To make your login process as easy and seamless as possible, you'll need to decide where you want to route users within your application once they are redirected back to your application. After authentication, Auth0 uses the `redirect_uri` request parameter as the callback URL. This is where your application will receive and process the response from Auth0, and where the users will be redirected once the authentication is complete. For more information on how the `redirect_uri` works, see [OAuth 2.0](/protocols/oauth2).

:::: further-reading
::: concepts
  * [Identity Provider Access Tokens](/tokens/concepts/overview-idp-access-tokens)
  * [Lock Authentication Modes](/libraries/lock/v11/authentication-modes)
  * [The Authentication Flow](/application-auth/current/client-side-web#the-authentication-flow)
  * [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
  * [GDPR Overview](/compliance/overview-gdpr)
:::

::: guides
  * [Call an Identity Provider API](/connections/calling-an-external-idp-api)
  * [Add Scopes/Permissions to Call Identity Provider's APIs](/connections/adding-scopes-for-an-external-idp)
  * [Pass Parameters to Identity Providers](/connections/pass-parameters-to-idps)
  * [Test a Partner Connection](/connections/how-to-test-partner-connection)
  * [Create Database Connections](/connections/database)
  * [Passwordless Authentication User Guide](/connections/passwordless/user-guide)
  * [Manage User Access to Applications](/user-profile/manage-user-access-to-applications)
  * [Register Your Applications](/application-auth/current/client-side-web#register-your-applications)
  * [Call the Authorization URL](/application-auth/current/client-side-web#call-the-authorization-url)
  * [Handle the Callback](/application-auth/current/client-side-web#handle-the-callback)
  * [Create a Random Key and Code Challenge](/application-auth/current/mobile-desktop#step-1-create-a-random-key-and-the-code-challenge)
  * [Authorize the User](/application-auth/current/mobile-desktop#step-2-authorize-the-user)
  * [Obtain an ID Token](/application-auth/current/mobile-desktop#step-3-obtain-an-id-token)

:::

::: references
  * [Passwordless FAQs](/connections/passwordless/faq)
  * [Password Security Tips](/anomaly-detection/password-security-tips)
  * [Identity Providers Supported by Auth0](/identityproviders)
  * [Authorization Extensions](/extensions/authorization-extension/v2/index)
  * [A Basic Authentication Request](/application-auth/current/client-side-web#a-basic-authentication-request)
  * [Lock Library](https://github.com/auth0/lock)
  * [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
:::
::::

::: whats-next

* [Define and Maintain Custom User Data](/microsites/manage-my-users/define-maintain-custom-user-data)
:::