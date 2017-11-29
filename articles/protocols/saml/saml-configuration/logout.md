---
  description: How to log out of SAML providers
---

# Logout

When integrating with a SAML provider, there are many ways to implement logout or user session termination.

::: note
Please see [Logout](/logout) for additional information.
:::

## Auth0 as SAML Identity Provider

If Auth0 acts as the identity provider, you'll need to specify a logout URL for your Auth0 Client's addon:

1. Log into the [Management Dashboard](${manage_url})
2. Navigate to your [Client's Addons page](${manage_url}/#/clients/${account.clientId}/addons).
3. Click to open the **SAML2 Web App** addon.
4. In the **Settings** editor, uncomment the `logout` portion and update it with your callback URL:

  ```json
  "logout": {
    "callback": "CALLBACK_URL"
  }
  ```

5. Click **Save**.

For SAML-complient endpoints, Auth0 uses this URL to send logout requests or logout responses (the exact choice depends on whether the service provider initiated the session or not). If you don't want to notify the service provider about a session termination, you can set the `slo_enabled` key inside logout to `false`:

```json
"logout": {
  "callback": "CALLBACK_URL",
  "slo_enabled": "false"
}
```
