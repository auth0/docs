---
title: Rotate Signing Keys
description: Learn how to rotate your tenant's application signing key using the Auth0 Dashboard and Auth0 Management API. Application signing keys are used to sign ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions that are sent to your application.
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

# Rotate Signing Keys

You can rotate your tenant's application signing key using the Auth0 Dashboard and Auth0 Management API. The application signing key is used to sign ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions sent to your application. To learn more, see [Manage Signing Keys](/tokens/guides/manage-signing-keys).

::: warning
To allow you time to update your application with the new key, all tokens signed with the previous key will still be valid until you revoke the previous key. To learn more, see [Revoke Signing Keys](/dashboard/guides/tenants/revoke-signing-keys), or learn how to [rotate and revoke signing keys at the same time](/dashboard/guides/tenants/revoke-signing-keys#rotate-and-revoke-signing-key).
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

2. Scroll to the **Rotation Settings** section, locate **Rotate Signing Key**, and click **Rotate Key**.

![View Signing Key Tenant Settings](/media/articles/dashboard/tenants/tenant-settings-signing-keys.png)

3. Confirm rotation by clicking **Rotate**.

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




