---
title: Revoke Signing Keys
description: Learn how to revoke your tenant's application signing key using the Auth0 Dashboard and Auth0 Management API. Application signing keys are used to sign ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions that are sent to your application.
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

# Revoke Signing Keys

You can revoke your tenant's application signing key using the Auth0 Dashboard and Auth0 Management API. The application signing key is used to sign ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions sent to your application. To learn more, see [Manage Signing Keys](/tokens/guides/manage-signing-keys).

::: warning
Before you can revoke a previously-used application signing key, you must first have rotated the key. To learn how, see [Rotate Signing Keys](/dashboard/guides/tenants/rotate-signing-keys), or learn how to [rotate and revoke signing keys at the same time](/dashboard/guides/tenants/revoke-signing-keys#rotate-and-revoke-signing-key).

Make sure you have updated your application with the new key before you revoke the previous key.
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

## Revoke signing key

1. Navigate to the [Tenant Settings](${manage_url}/#/tenant) page in the [Auth0 Dashboard](${manage_url}/), and click the [**Signing Keys**](${manage_url}/#/tenant/signing_keys) tab.

![View Advanced Tenant Settings](/media/articles/dashboard/tenants/tenant-settings.png)

2. Scroll to the **List of Valid Keys** section, locate the **Previously Used** key, click its more options (**...**) menu, and select **Revoke Key**.

![View Signing Key Tenant Settings](/media/articles/dashboard/tenants/tenant-settings-signing-keys-revoke.png)

3. Confirm revocation by clicking **Revoke**.

![Confirm Revoking Signing Key](/media/articles/dashboard/tenants/tenant-settings-signing-keys-revoke-confirm.png)

## Rotate and revoke signing key

1. Navigate to the [Tenant Settings](${manage_url}/#/tenant) page in the [Auth0 Dashboard](${manage_url}/), and click the [**Signing Keys**](${manage_url}/#/tenant/signing_keys) tab.

![View Advanced Tenant Settings](/media/articles/dashboard/tenants/tenant-settings.png)

2. In the **Rotation Settings** section, locate the **Rotate & Revoke Signing Key** section, and select **Rotate & Revoke Key**.

![View Signing Key Tenant Settings](/media/articles/dashboard/tenants/tenant-settings-signing-keys.png)

3. Confirm rotation and revocation by clicking **Rotate & Revoke**.

![Confirm Revoking Signing Key](/media/articles/dashboard/tenants/tenant-settings-signing-keys-rotate-revoke-confirm.png)
    </div>
    <div id="mgmt-api" class="tab-pane">

::: warning
You may only revoke the previously used signing key.
:::

1. Make a `PUT` call to the [Revoke Signing Key endpoint](/api/management/v2#!/signing_keys/post_signing_key). Be sure to replace the `YOUR_KEY_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your signing key's ID and Management API Access Token, respectively.

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
| `YOUR_KEY_ID` | ID of the signing key to be revoked. To learn how to find your signing key ID, see [Locate JSON Web Key Sets](/tokens/guides/locate-jwks). |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:signing_keys`. |

</div>
  </div>
</div>
