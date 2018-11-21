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

[Connections](/connections) are sources of users. They are categorized into Database, Social, Enterprise and Passwordless and can be shared among different applications.

Connect users to your identity platform using popular social media providers like [Facebook, Google, and Twitter](/identityproviders), or in an enterprise environment, you can use SD, LDAP, and SAML to authenticate users. You can also create connections that don't require your users to [remember passwords](/connections/passwordless/user-guide) and specify which users have access to [which apps](/users/guides/manage-user-access-to-applications). 

## How it works

As an example, suppose ou have two separate domains (public facing and internal), or two groups of connections you'd like to make available to users. The best solution is to create a second Auth0 tenant via the settings menu in the top right on the Dashboard. This will allow you to have separate sets of users, applications, and connections for the two groups of users and applications you need to support.

Let's suppose that you have two applications: an internal timesheets application and a customer portal. Users should log in to the timesheets application either using their Active Directory credentials or their Google apps social connection. The customer portal on the other hand should be accessible via [Facebook, Google, or LinkedIn](/identityproviders) authentication.

*add flow diagram here*

## Implement connections

You can configure any number of connections for your applications to use in your Dashboard. To view all the connections that you have configured or create new ones navigate to Dashboard and select the connection type you want.

* **For Social Connections**: Use your credentials for social connections to obtain a Client ID and Client Secret and review the requested data. Auth0 provides [default credentials](/connections/social/devkeys) for social connections to help you get started. You should replace these temporary credentials with your own to avoid restrictions.
* **For Database Connections**: Set password policy for database connections. Disable user signup if it's not appropriate for each database connection. Review applications enabled for each connection. 
* **For Enterprise Connections**: Use RSA-SHA256 for SAML connections. 

Authenticate users of your mobile/desktop applications using one of the following methods:

* Use the [Lock](/libraries#lock) drop-in authentication widget which provides a standard set of behaviors and a customizable user interface. 
* Use one of the [Auth0 SDKs](/libraries) which are client-side libraries that allow you to customize the authentication behavior and the appearance of the login screen. 
* Call the [Authentication API](/api/authentication) endpoints which help you integrate with Auth0 without requiring the Auth0's libraries. You can call endpoints through an embedded browser in your native application. After authentication completes, you can return an [ID Token](/tokens/id-token) (which contains information about the identity of the user) and an [Access Token](/tokens/concepts/overview-access-tokens).

To make your login process as easy and seamless as possible, you'll need to decide where you want to route users within your application once they are [redirected](/users/guides/redirect-users-after-login) back to your application. 

:::: further-reading
::: concepts
  * [Identity Provider Access Tokens](/tokens/concepts/overview-idp-access-tokens)
  * [Lock Authentication Modes](/libraries/lock/v11/authentication-modes)
  * [The Authentication Flow](/application-auth/current/client-side-web#the-authentication-flow)
    * [GDPR Overview](/compliance/overview-gdpr)
:::

::: guides
  * [Redirect Users After Login](/users/guides/redirect-users-after-login)
  * [Redirect Users From Rules](/rules/current/redirect)
  * [Redirect Users After Logout](/logout#redirect-users-after-logout)
  * [Call an Identity Provider API](/connections/calling-an-external-idp-api)
  * [Add Scopes/Permissions to Call Identity Provider's APIs](/connections/adding-scopes-for-an-external-idp)
  * [Pass Parameters to Identity Providers](/connections/pass-parameters-to-idps)
  * [Test a Partner Connection](/connections/how-to-test-partner-connection)
  * [Create Database Connections](/connections/database)
  * [Passwordless Authentication User Guide](/connections/passwordless/user-guide)
  * [Manage User Access to Applications](/users/guides/manage-user-access-to-applications)
  * [Register Your Applications](/application-auth/current/client-side-web#register-your-applications)
  * [Call the Authorization URL](/application-auth/current/client-side-web#call-the-authorization-url)
  * [Handle the Callback](/application-auth/current/client-side-web#handle-the-callback)
  * [Create a Random Key and Code Challenge](/application-auth/current/mobile-desktop#step-1-create-a-random-key-and-the-code-challenge)
  * [Authorize the User](/application-auth/current/mobile-desktop#step-2-authorize-the-user)
  * [Obtain an ID Token](/application-auth/current/mobile-desktop#step-3-obtain-an-id-token)
:::

::: references
  * [A Basic Authentication Request](/application-auth/current/client-side-web#a-basic-authentication-request)
  * [Recommended Connection Settings](/best-practices/connection-settings)
  * [Identity Providers Supported by Auth0](/identityproviders)
  * [OpenID Connect](/protocols/oidc)
  * [OAuth 2.0](protocols/oauth2)
  * [Authorization Extensions](/extensions/authorization-extension/v2/index)
  * [Lock Library](https://github.com/auth0/lock)
  * [Passwordless FAQs](/connections/passwordless/faq)
  * [Password Security Tips](/anomaly-detection/password-security-tips)
  * [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
:::
::::

::: whats-next

* [Define and Maintain Custom User Data](/microsites/manage-my-users/define-maintain-custom-user-data)
:::