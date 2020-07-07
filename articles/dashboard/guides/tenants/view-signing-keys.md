---
title: View Signing Keys
description: Learn how to view your tenant's application signing keys using the Auth0 Dashboard and Auth0 Management API. Application signing keys are used to sign ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions that are sent to your application.
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

# View Signing Keys

You can view your tenant's application signing keys using the Auth0 Dashboard and Auth0 Management API. The application signing key is used to sign ID Tokens, Access Tokens, SAML assertions, and WS-Fed assertions sent to your application. To learn more, see [Manage Signing Keys](/tokens/guides/manage-signing-keys).

::: note
Note that these keys are different from those used to sign interactions with connections, including signing SAML Requests to IdPs and encrypting responses from IdPs.

By default, SAML assertions for IdP connections are signed, which we recommend. To learn more, see [SAML Identity Provider Configuration: Signed Assertions](/protocols/saml/samlp#signed-assertions). 
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

2. Scroll to the **Settings** section, and locate **List of Valid Keys** and **List of Revoked Keys**.

![View Signing Key Tenant Settings](/media/articles/dashboard/tenants/tenant-settings-signing-keys.png)

The **List of Valid Keys** section lists the current signing key being used by your tenant, plus the next signing key that will be assigned should you choose to rotate your signing keys. If you have previously rotated signing keys, this section also lists the previously used keys.

The **List of Revoked Keys** section lists the last three revoked keys for your tenant. 
    </div>
    <div id="mgmt-api" class="tab-pane">

## Get all signing keys

1. Make a `GET` call to the [Get All Signing Keys endpoint](/api/management/v2#!/signing_keys/get_signing_keys). Be sure to replace the `MGMT_API_ACCESS_TOKEN` placeholder value with your Management API Access Token.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/keys/signing",
  "headers": [
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:signing_keys`. |

## Get a single signing key

1. Make a `GET` call to the [Get a Signing Key endpoint](/api/management/v2#!/signing_keys/get_signing_key). Be sure to replace the `YOUR_KEY_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your signing key's ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/keys/signing/YOUR_KEY_ID",
  "headers": [
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `YOUR_KEY_ID` | ID of the signing key to be viewed. To learn how to find your signing key ID, see [Locate JSON Web Key Sets](/tokens/guides/locate-jwks). |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:signing_keys`. |

</div>
  </div>
</div>




