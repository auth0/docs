---
title: Update Hook Secrets
description: Learn how to update Hook Secrets using the Dashboard or Management API. Hook Secrets may also be imported and exported using the Auth0 Deploy Command-Line Interface (CLI) tool.
beta: true
topics:
    - hooks
    - secrets
    - dashboard
    - mgmt-api
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Update Hook Secrets

You can update Hook Secrets added to any given [Hook](/hooks) using the Dashboard or Management API.

Hook Secrets may also be imported and exported using the [Deploy Command-Line Interface (CLI) Extension](/extensions/deploy-cli).

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

## Update Hook Secrets using the Dashboard

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and click the pencil icon next to the Hook you want to edit.
2. In the Hook editor, click the wrench icon, and click **Secrets**.
3. Click the pencil and paper icon next to the value of the secret you want to edit.
4. Make your changes to the name and/or value of the selected secret, and click **Save**.

    </div>
    <div id="mgmt-api" class="tab-pane">

## Update Hook Secrets using the Management API

1. Make a `PATCH` call to the [Update Hook Secrets endpoint](/api/management/v2/#!/Hooks/patch_secrets). Be sure to replace `HOOK_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your hook ID and Management API Access Token, respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/hooks/HOOK_ID/secrets",
	"headers": [
    	{ "name": "Content-Type", "value": "application/json" },
   		{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text": "{ [ \"HOOK_SECRET_KEY\", \"HOOK_SECRET_VALUE\" ], [ \"HOOK_SECRET_KEY\", \"HOOK_SECRET_VALUE\" ] }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:hooks`. |
| `HOOK_ID` | ID of the hook for which you would like to update secrets. |
| `HOOK_SECRET_KEY` | Name of the secret that you would like to update for the specified hook. This endpoint accepts an object of key-value pairs. |
| `HOOK_SECRET_VALUE` | Value of the secret that you would like to update for the specified hook. This endpoint accepts an object of key-value pairs. |

::: warning
When retrieving secrets configured for a specified hook, values will contain the placeholder text: `_VALUE_NOT_SHOWN`. Be careful not to return this placeholder text during an update, or the secret's actual value will be overwritten.
:::

</div>
  </div>
</div>
