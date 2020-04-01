---
title: Revoke Application Signing Keys
description: Learn how to revoke your tenant's application signing key using the Auth0 Dashboard and Auth0 Management API. Application signing keysmare used to sign ID Tokens, Access Tokens, SAML assertions and WS-Fed assertions that are sent to your application.
topics:
  - tokens
  - access-tokens
  - id-tokens
  - assertions
  - SAML
  - signing-keys
  - certificates
  - dashboard
  - mgmt-api
contentType:
  - how-to
useCase:
  - secure-api
  - add-login
  - call-api
---

# Revoke Application Signing Keys

This guide will show you how to revoke your tenant's application signing key using the Auth0 Dashboard and Auth0 Management API. The application signing key is used to sign tokens and SAML assertions.

::: warning
Rotating your application signing key will cause all your applications to require the signing key currently in queue for validating new tokens. All previously-validated tokens will still be valid with the previous key until the previous key is revoked.
:::

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

1. Navigate to the [Tenant Settings](${manage_url}/#/tenant) page in the [Auth0 Dashboard](${manage_url}/), and click the [**Signing Keys**](${manage_url}/#/tenant/signing_keys) tab.

![View Advanced Tenant Settings](/media/articles/dashboard/tenants/tenant-settings.png)

2. Scroll to the **Settings** section, locate **Rotate Application Signing Key**, and click **Rotate Key**.

![View Signing Key Tenant Settings](/media/articles/dashboard/tenants/tenant-settings-signing-keys.png)

3. When asked to confirm, å, select the **Yes, revoke the currently used signing key** checkbox. Click **Rotate**.

![Confirm Signing Key Rotation](/media/articles/dashboard/tenants/tenant-settings-signing-keys-rotate-confirm.png)
    </div>
    <div id="mgmt-api" class="tab-pane">

1. Make a `PUT` call to the [Revoke Signing Key endpoint](/api/management/v2#!/signing_keys/post_signing_key). Be sure to replace the `YOUR_KEY_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your signing key's kid and Management API Access Token, respectively.

```har
{
	"method": "PUT",
	"url": "https://${account.namespace}/api/v2/keys/signing/YOUR_KEY_ID/revoke",
  "headers": [
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `YOUR_KEY_ID` | ID of the signing key to be revoked. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:signing_keys`. |

</div>
  </div>
</div>




