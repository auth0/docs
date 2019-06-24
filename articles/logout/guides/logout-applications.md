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

Enterprise users typically have SSO enabled for multiple applications (e.g., SharePoint, a few .NET applications, a few Java applications, Zendesk). In this case, when users sign out, often they must be signed out for all of their applications.

<%= include('../_includes/_logout-endpoint') %>

Redirecting users to the logout endpoint **does not** cover the scenario where users need to be signed out of all of the applications they used.  If you need to provide this functionality you will have to either handle this by calling redirect to Auth0 to attempt to log in at some interval in your application, or tracking this at your application level and providing a way for one application to call the other applications to force logout. 

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
