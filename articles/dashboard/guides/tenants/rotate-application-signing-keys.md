---
title: Rotate Application Signing Keys
description: Learn how to rotate your tenant's application signing key, which is used to sign tokens and SAML assertions, using the Auth0 Dashboard and Auth0 Management API.
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

# Rotate Application Signing Keys

This guide will show you how to rotate your tenant's application signing key using the Auth0 Dashboard and Auth0 Management API. The application signing key is used to sign ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions sent to your application.

::: warning
Make sure you have updated your application with the new key before you revoke the previous key.

All tokens signed with the previous key will still be valid until the previous key is revoked.
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

3. When asked to confirm, if you have already updated certificates and signing keys in all of your applications, select the **Yes, revoke the currently used signing key** checkbox, and click **Rotate**.

![Confirm Signing Key Rotation](/media/articles/dashboard/tenants/tenant-settings-signing-keys-rotate-confirm.png)
    </div>
    <div id="mgmt-api" class="tab-pane">

1. Make a `POST` call to the [Rotate Signing Keys endpoint](/api/management/v2#!/signing_keys/post_signing_key). Be sure to replace the `MGMT_API_ACCESS_TOKEN` placeholder value with your Management API Access Token.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/keys/signing/rotate",
  "headers": [
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scopes</dfn> `create:signing_keys` and `update:signing_keys`. |

</div>
  </div>
</div>




