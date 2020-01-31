---
title: Create Hook Secrets
description: Learn how to create Hook Secrets using the Dashboard and Management API. Hook Secrets may also be imported and exported using the Auth0 Deploy Command-Line Interface (CLI) tool.
topics:
    - hooks
    - secrets
    - dashboard
    - mgmt-api
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Create Hook Secrets

You can create multiple Hook Secrets for any [Hook](/hooks) using the Dashboard or Management API.

Hook Secrets may also be imported and exported using the [Deploy Command-Line Interface (CLI) Extension](/extensions/deploy-cli).

<%= include('../_includes/_hook_secrets_limit') %>

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

## Create Hook Secrets using the Dashboard 

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and click the pencil icon next to the Hook you want to edit.
2. In the Hook editor, click the wrench icon, and click **Secrets**.
3. Click **Add Secret**.
4. Enter a descriptive name and value for your secret, and click **Save**.

    </div>
    <div id="mgmt-api" class="tab-pane">

## Create Hook Secrets using the Management API

1. Make a `POST` call to the [Add Hook Secrets endpoint](/api/management/v2/#!/Hooks/post_secrets). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `HOOK_ID`, `HOOK_SECRET_KEY`, and `HOOK_SECRET_VALUE` placeholder values with your Management API Access Token, Hook ID, and Hook key-value pair(s), respectively.

```har
{
	"method": "POST",
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
| `HOOK_ID` | ID of the hook for which you would like to add secrets. |
| `HOOK_SECRET_KEY` | Name of the secret that you would like to add to the specified hook. This endpoint accepts an object of key-value pairs. |
| `HOOK_SECRET_VALUE` | Value of the secret that you would like to add to the specified hook. This endpoint accepts an object of key-value pairs. |

</div>
  </div>
</div>
