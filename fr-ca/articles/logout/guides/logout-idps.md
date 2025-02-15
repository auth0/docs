---
title: Log Users Out of Identity Providers
description: Learn how to force a user to log out of their identity provider. 
topics:
  - logout
  - federated-logout
contentType: how-to
useCase:
  - manage-logout
---
# Log Users Out of Identity Providers

Although this is not common practice, you can force the user to log out of their identity provider. 

For many providers, Auth0 will give you this behavior by simply having you add the `federated` query parameter to the redirect to `/v2/logout`. This will then additionally redirect the user to their identity provider and log them out there as well.  

To do this, add a `federated` querystring parameter to the logout URL:

```text
https://${account.namespace}/v2/logout?federated
```

## Limitations

There are a few limitations to federated logout to keep in mind:
 
* No validation is performed on any URL provided as a value to the returnTo parameter, nor any querystring or hash information provided as part of the URL.

* The behavior of federated logouts with social providers is inconsistent. Each provider will handle the returnTo parameter differently and for some, it will not work. Please check your social provider's settings to determine how it will behave.

* If you are working with social identity providers such as Google or Facebook, you must set your Client ID and Secret for these providers in the Dashboard for the logout to function properly.

* If you are an Auth0 Enterprise user, you will typically have SSO enabled for multiple applications, for example, SharePoint, a few .NET applications, a few Java applications, Zendesk, etc. In this case, it's very common that when users sign out, this needs to happen for all of their applications.  

::: panel-warning Single logout
Redirecting users to the Auth0 `logout` endpoint does not cover all scenarios where users need to be signed out of all of the applications they use. Other than when Auth0 is using SAML, Auth0 does not natively support Single Logout. Single Logout can be achieved by having each application check the active session after their tokens expire, or you can force log out by terminating your application sessions at the application level. 

You can configure Single Logout URLs for SAML that can log out of all SAML sessions, although Auth0 supports front-channel SAML SLO only, Auth0 does not support back-channel SLO.
Auth0 provides quickstart guides that show you how to implement logout functionality in your specific type of application and provides sample code. These quickstarts support native/mobile apps, single-page apps, and web apps. 
:::

## Federated logout support

The following identity providers support federated logout:

* Evernote
* Facebook
* Fitbit
* GitHub
* Google
  * Apps
  * OAuth 2.0
* Microsoft
  * Active Directory Federation Services
  * Office 365
  * Windows Azure Active Directory
  * Windows Live
* Salesforce/Salesforce Sandbox
* Twitter
* Yahoo
* Yammer

::: panel-warning Clear your application session
The Auth0 [logout endpoint](/api/authentication?javascript#logout) logs you out from Auth0 and, optionally, from your identity provider. It does *not* log you out of your application! This is something that you must implement on your side. You need to log out the user from your application by clearing their session. 
:::

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Applications](logout/guides/logout-applications)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
* [Sessions](/sessions)
