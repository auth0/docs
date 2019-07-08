---
title: Log Users Out of Applications
description: Learn how to force a user to log out of applications using the Auth0 logout endpoint. 
topics:
  - logout
contentType: 
  - how-to
useCase:
  - manage-logout
---

# Log Users Out of Applications

Enterprise users typically have <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> enabled for multiple applications (e.g., SharePoint, a few .NET applications, a few Java applications, Zendesk). In this case, when users sign out, often they must be signed out for all of their applications.

<%= include('../_includes/_logout-endpoint') %>

Redirecting users to the logout endpoint **does not** cover the scenario where users need to be signed out of all of the applications they used. If you need to provide this functionality you will have to handle this in one of two ways:
*  Have short timeouts on your local session and redirect to Auth0 at short intervals to re-authenticate. NOTE: this can be done by calling `checkSession` from the client which does this redirect in a hidden iFrame.  If you take the hidden iFrame approach you need to be aware of rate limits and third-party cookie issues.
* Handle this entirely at the application level by providing your applications a way to notify all other applications when a logout occurs.

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
