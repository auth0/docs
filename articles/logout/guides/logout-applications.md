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

Redirecting users to the logout endpoint **does not** cover the scenario where users need to be signed out of all of the applications they used.  If you need to provide this functionality you will have to either handle this by calling redirecting to Auth0 to attempt to log in at some interval in your application, or tracking this at your application level and providing a way for one application to call the other applications to force logout. 

## Limitations

The complete single sign-out flow is based on the SSO cookie in Auth0 and rendering IFRAMES. Take into account that:

* For the IFRAMES, there's no way to detect if the IFRAME rendered correctly. You can only detect if it completed or not. For slow applications, if it takes more than 5 seconds to sign out the sample will show a red line instead of the green line.

* Depending on specific browser settings there might be issues with the SSO cookie or the rendering of the IFRAME.
In IE for example a setting called "Protected Mode" should be disabled or your applications will need a P3P header for this to work correctly.

* In Safari (depending on your settings) cookies might be restricted to a specific tab (and not shared over different tabs).

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
