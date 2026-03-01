---
title: Log Users Out of SAML Identity Providers
description: Learn how to log users out of an external SAML identity provider. 
topics:
  - logout
  - SAML-logout
  - identity-providers
contentType: how-to
useCase:
  - manage-logout
---

# Log Users Out of SAML Identity Providers

To logout users from an external <dfn data-key="security-assertion-markup-language">SAML</dfn> identity provider, you must configure a [SAML logout URL](/saml-sp-generic#1-obtain-information-from-idp) in the SAML connection settings. If you don't configure a logout URL, Auth0 will use the __SAML login URL__.

Auth0 will initiate a logout by sending a SAML logout request to the external identity provider if the `federated` query string parameter is included when redirecting the user to the [logout endpoint](/api/authentication?javascript#logout).

The external SAML identity provider will need to know where to send SAML logout requests (if initiating the logout) and responses. The __SingleLogout service URL__ that will consume this SAML messages is the following:

```text
https://${account.namespace}/logout
```

When viewing the logout metadata for your Auth0 Connection, you will notice two `SingleLogoutService` bindings with the above URL.

* **SAML Request Binding** (also known as the **Protocol Binding**): Used for the transaction from Auth0 to the IdP. If the IdP provides a choice, select `HTTP-Redirect`.
   
* **SAML Response Binding**: Used for transactions from the IdP to Auth0. It indicates to Auth0 what protocol the IdP will use to respond. If the IdP provides a choice, indicate that `HTTP-POST` should be used for Authentication Assertions.

::: panel Unable to Logout Using a SAML Identity Provider
When logging in (with Auth0 as the SAML Service Provider), the SAML identity provider uniquely identifies the user's session with a `SessionIndex` attribute in the `AuthnStatement` element of the SAML assertion. The `SessionIndex` value must be used again when the user logs out.

Occasionally, the `SessionIndex` value may not be present in the initial login assertion. When the user logs out, the request to the SAML identity provider will fail due to the missing value.

In these cases, Auth0 may not be able to complete a logout request to the SAML identity provider even if the logout URL has been configured correctly.
:::

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Applications](logout/guides/logout-applications)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
