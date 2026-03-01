---
description: Learn how to log users out of Auth0 as the SAML identity provider.
topics:
  - saml
  - logout
  - session-termination
contentType:
  - how-to
useCase:
  - add-idp
  - manage-logout
  - user-management
---
# Log Users Out of Auth0 as the SAML Identity Provider

When integrating with a <dfn data-key="security-assertion-markup-language">SAML</dfn> identity provider, there are many ways to implement logout or *user session termination*.

SAML logout is configured differently depending on whether Auth0 acts as the service provider (when you create a SAML **connection**) the identity provider (when you have an application with the SAML2 Web App addon) or both.

## Logout scenarios

When Auth0 is acting as a [SAML Identity Provider](/protocols/saml/saml-idp-generic), you can have the following two scenarios:

* Single logout
* Non-single logout

### SAML Single Logout (SLO) Scenario

After determining that your service provider supports SAML SLO, configure the service provider to call `https://${account.namespace}/samlp/CLIENT_ID/logout` (also listed in the SAML IdP metadata). 

When a logout request is triggered by the service provider, a SAML logout request is sent to this endpoint. Auth0 starts the SAML SLO flow by notifying the existing session participants using a frontend channel.

1. Log into the [Management Dashboard](${manage_url})

2. Navigate to your [Application's Addons page](${manage_url}/#/applications/${account.clientId}/addons).

3. Click to open the **SAML2 Web App** addon.

4. In the **Settings** editor, uncomment the `logout` portion and update it with your <dfn data-key="callback">callback URL</dfn>:

  ```json
  "logout": {
    "callback": "CALLBACK_URL"
  }
  ```

   To prevent a session participant from being notified, you can set `logout.slo_enabled` to `false` in the `SAML2 Web App` application addon's settings. 

5. Click **Save**.

For SAML-compliant endpoints, Auth0 uses this URL to send SAML logout requests or logout responses (the exact choice depends on whether the service provider initiated the session or not). If you don't want to notify the service provider about a session termination, you can set the `slo_enabled` key inside logout to `false`:

```json
"logout": {
  "callback": "CALLBACK_URL",
  "slo_enabled": false
}
```

By default, SAML logout responses are sent using the **HTTP-POST** protocol binding. If you want to use **HTTP-Redirect** you can configure the `binding` key to `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect`:

```json
"logout": {
  "callback": "CALLBACK_URL"
},
"binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
```

### Non-Single Logout Scenario

If your service provider does not support SAML SLO, but provides a redirect URL where the user will be redirected to after logging out of the service provider, configure the redirect URL to `https://${account.namespace}/v2/logout`. This won't notify other session participants that a logout was initiated, but it will remove the session from Auth0.

## Keep reading

* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Logout](/logout)
