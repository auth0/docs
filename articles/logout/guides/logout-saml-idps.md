---
title: Log Users Out of SAML Identity Providers
description: Learn how to log users out of an external SAML identity provider. 
topics:
  - logout
  - SAML-logout
contentType: how-to
useCase:
  - manage-logout
---

# Log Users Out of SAML Identity Providers

SAML logout is configured differently depending on whether Auth0 acts as the Service Provider (i.e. when you create a SAML **connection**) or when Auth0 acts as the Identity Provider (i.e. when you have an application with the SAML2 Web App addon).

## Logout for Auth0 as SAML Service Provider

To logout users from an external SAML identity provider, you must configure a [SAML logout URL](/saml-sp-generic#1-obtain-information-from-idp) in the SAML connection settings. If you don't configure a logout URL, Auth0 will use the __SAML login URL__.

Auth0 will initiate a logout by sending a SAML logout request to the external identity provider if the `federated` query string parameter is included when redirecting the user to the [logout endpoint](/api/authentication?javascript#logout) as [described above](#log-out-a-user).

The external SAML identity provider will need to know where to send SAML logout requests (if initiating the logout) and responses. The __SingleLogout service URL__ that will consume this SAML messages is the following:

```text
https://${account.namespace}/logout
```

When viewing the logout metadata for your Auth0 Connection, you might notice two `SingleLogoutService` bindings with the above URL.

* The first is the **SAML Request Binding** (also known as the **Protocol Binding**), which is used for the transaction from Auth0 to the IdP. If the IdP provides a choice, select `HTTP-Redirect`.
* The second is the **SAML Response Binding**, which is used for transactions from the IdP to Auth0. It indicates to Auth0 what protocol the IdP will use to respond. If the IdP provides a choice, indicate that `HTTP-POST ` should be used for Authentication Assertions.

## Unable to Logout Using a SAML Identity Provider

When logging in (with Auth0 as the SAML Service Provider), the SAML identity provider uniquely identifies the user's session with a `SessionIndex` attribute in the `AuthnStatement` element of the SAML assertion. The `SessionIndex` value must be used again when the user logs out.

Occasionally, the `SessionIndex` value may not be present in the initial login assertion. When the user logs out, the request to the SAML identity provider will fail due to the missing value.

In these cases, Auth0 may not be able to complete a logout request to the SAML identity provider even if the logout URL has been configured correctly.

## Logout for Auth0 as SAML IdP

When Auth0 is acting as a [SAML Identity Provider](/protocols/saml/saml-idp-generic), you can have the following scenarios:

### Single Logout Scenario

If your Service Provider supports SAML Single Logout, you will need to configure the Service Provider to call `https://${account.namespace}/samlp/CLIENT_ID/logout` (also listed in the SAML IdP Metadata). When a logout request is triggered by the Service Provider, a logout request will be sent to this endpoint and Auth0 starts the SAML SLO flow by notifying the existing session participants using a frontend channel.

* To prevent a session participant from being notified, you can set `logout.slo_enabled` to `false` in the `SAML2 Web App` application addon's settings. 
* To send the SAML Logout response using `HTTP-Redirect` bindings (instead of the default `HTTP-POST`), you can set `binding` to `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect`.

### Non Single Logout Scenario

If your Service Provider does not support SAML SLO, but provides a redirect URL where the user will be redirected to after logging out of the SP, the best thing to do is configure the redirect URL to `https://${account.namespace}/v2/logout`. This won't notify other session participants that a logout was initiated, but it will at remove the session from Auth0.
