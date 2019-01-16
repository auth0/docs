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

To do this, add a `federated` querystring parameter to the logout URL:

```text
https://${account.namespace}/v2/logout?federated
```

## Federated logout support

The following identity providers support federated logout:

* AOL
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
The Auth0 [logout endpoint](/api/authentication?javascript#logout) logs you out from Auth0 and, optionally, from your identity provider. It does *not* log you out of your application! This is something that you must implement on your side. You need to log out the user from your application by clearing their session. You might find [this video](/videos/session-and-cookies) helpful.
:::

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Applications](logout/guides/logout-applications)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
