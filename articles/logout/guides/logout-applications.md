---
title: Log Users Out of Applications
description: Learn how to force a user to log out of applications using the Auth0 logout endpoint. 
topics:
  - logout
contentType: how-to
useCase:
  - manage-logout
---

# Log Users Out of Applications

Enterprise users will typically have SSO enabled for multiple applications (e.g.: SharePoint, a few .NET applications, a few Java applications, Zendesk). In this case it's very common that when users sign out, this needs to happen for all of their applications.

<%= include('../_includes/_logout-endpoint') %>

Redirecting users to the logout endpoint **does not** cover the scenario where users need to be signed out of all of the applications they used. In the user's SSO session, Auth0 keeps track of each application the user signs in to. 

## Single Sign-out configuration example

The following example shows how to use this information to sign out of each application before clearing the SSO cookie in Auth0. The example uses an Angular.js application which is also registered as an application in Auth0.

![Single Sign-Out Screen](/media/articles/logout/single-sign-out.png)

::: note
All applications you use, including the logout application, need to be enabled for SSO.
:::

When you call the `getSSOData` method on the client-side SDK, you'll see the following:

```js
{
 "err": null,
 "ssoData": {
  "sso": true,
  "sessionClients": [
   "ATqGIGvsX5d9AWiOypgPOEBGkOVbrf55",
   "ZDC7qh6mcXaQT6ilyiTWPmmfFI7L0aTs",
   "bOFty3tWgpijnwMcltysNFqHgO1ziz1I"
  ],
  "lastUsedClientID": "bOFty3tWgpijnwMcltysNFqHgO1ziz1I",
  "lastUsedUsername": "mary@fabrikamcorp.com",
  "lastUsedConnection": {
   "name": "FabrikamAD",
   "strategy": "ad"
  }
 }
}
```

This means the user logged in to three different applications (`sessionClients`). The sample application renders an iframe for all of the applications. 

::: note
It's the responsiblity of the logout application to know the logout endpoint URL. This information is not available in Auth0.
:::

```js
  var clients = {
    'ATqGIGvsX5d9AWiOypgPOEBGkOVbrf55': {
      name: 'JWT Debugger',
      logout_url: 'http://fabrikam-jwt.azurewebsites.net/'
    },
    'bOFty3tWgpijnwMcltysNFqHgO1ziz1I': {
      name: 'SharePoint Intranet',
      logout_url: 'http://sp.fabrikamcorp.com/_layouts/15/SignOut.aspx'
    },
    'h2NE1kxhzzFgLpNBvcCuyefjfwFVGx49': {
      name: 'Timesheet SaaS',
      logout_url: 'http://fabrikam-timesheets.azurewebsites.net/account/logoff'
    }
  };
```

Once the users are logged out of all of the applications,  they are redirected to the logout endpoint in Auth0 to clear the SSO cookie. If any of the applications fail to respond within the configured timeout (5 sec), an error appears. For this to work, all of the applications need to have a logout endpoint accessible from a GET.

### Sample scenario

Mary logged in to all of the applications configured in the Fabrikam account (JWT Debugger, SharePoint Intranet and Timesheet SaaS). When she hits the "Sign-out" button in one of these applications it should redirect to the "Single-Logout application" which Fabrikam is hosting somewhere (eg: https://fabrikam-logout.azurewebsites.net).

The logout application will use Mary's SSO cookie to determine from which applications she needs to sign out and render iframes pointing to the logout endpoints for each of these applications.

![Mary Signing Out](/media/articles/logout/signing-out-scenario1.png)

Once logout is complete in all of these applications, Mary can hit the continue button which redirects to Auth0 and removes her SSO cookie there (and optionally also sign out from the IdP, like ADFS). Finally, Mary returns to the logout appliation which shows she's been logged out.

![Mary Logout Complete](/media/articles/logout/signing-out-scenario2.png)

## Limitations

The complete single sign-out flow is based on the SSO cookie in Auth0 and rendering iframes. Take into account that:

* For the IFRAMES, there's no way to detect if the IFRAME rendered correctly. You can only detect if it completed or not. For slow applications, if it takes more than 5 seconds to sign out the sample will show a red line instead of the green line.

* Depending on specific browser settings there might be issues with the SSO cookie or the rendering of the IFRAME.
In IE for example a setting called "Protected Mode" should be disabled or your applications will need a P3P header for this to work correctly.

* In Safari (depending on your settings) cookies might be restricted to a specific tab (and not shared over different tabs).

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
