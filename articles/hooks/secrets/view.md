---
title: View Hook Secrets
description: Learn how to view Hook Secrets using the Dashboard and Management API.
beta: true
topics:
    - hooks
    - secrets
    - mgmt-api
    - dashboard
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# View Hook Secrets

To see configured secrets for a [Hook](/hooks), you can view them using the Dashboard or retrieve a list of them using the Management API.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

## View Hook Secrets using the Dashboard

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and click the pencil icon next to the Hook for which you want to view secrets.

2. In the Hook editor, click the wrench icon, and click **Secrets**.

All configured secrets for the selected Hook will be listed.

</div>
    <div id="mgmt-api" class="tab-pane">

## Get Hook Secrets using the Management API

1. Make a `GET` call to the [Get Hook Secrets endpoint](/api/management/v2/#!/Hooks/get_secrets). Be sure to replace `HOOK_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your Hook's ID and the Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/hooks/HOOK_ID/secrets",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `HOOK_ID` | ID of the Hook for which you want to retrieve secrets. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:hooks`. |

::: warning
Secrets are write-only. When retrieving secrets configured for a specified hook, values will contain the placeholder text: `_VALUE_NOT_SHOWN`.
:::

</div>
  </div>
</div>