---
title: Log Users Out of Auth0
description: Learn how to force a user to log out of Auth0 using the Auth0 logout endpoint. 
topics:
  - logout
contentType: how-to
useCase:
  - manage-logout
---

# Log Users Out of Auth0

The [logout endpoint](/api/authentication?javascript#logout) in Auth0 works in one of two ways:

1. **Clears the <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> cookie in Auth0.** To force a logout, redirect the user to the following URL:

```text
https://${account.namespace}/v2/logout
```

2. **Clears the SSO cookie in Auth0 and sign out the user from the IdP (such as ADFS or Google).** To [log the user out of both Auth0 *and* the IdP](/logout/guides/logout-idps), you must include the `federated` querystring parameter with your call to the logout endpoint.

Redirecting the user to this URL clears all <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> cookies set by Auth0 for the user.

## Keep reading

* [Log Users Out of Applications](logout/guides/logout-applications)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
