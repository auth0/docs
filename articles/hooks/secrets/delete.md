---
title: Delete Hook Secrets
description: Learn how to delete Hook Secrets using the Dashboard and Management API. Hook Secrets may also be imported and exported using the Auth0 Deploy Command-Line Interface (CLI) tool.
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
# Delete Hook Secrets

When you no longer need Hook Secrets for a given [Hook](/hooks), you can delete them using either the Dashboard or Management API.

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

## Delete Hook Secrets using the Dashboard

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and click the pencil icon next to the Hook you want to edit.
2. In the Hook editor, click the wrench icon, and click **Secrets**.
3. Locate the Hook Secret you want to delete, click the trash can icon, and confirm.

    </div>
    <div id="mgmt-api" class="tab-pane">

## Delete Hook Secrets using the Management API

1. Make a `DELETE` call to the [Delete Hook Secrets endpoint](/api/management/v2/#!/Hooks/delete_secrets). Be sure to replace `HOOK_ID`, `HOOK_SECRET_NAME`, and `MGMT_API_ACCESS_TOKEN` placeholder values with your hook ID, your hook secret name(s), and Management API Access Token, respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/hooks/HOOK_ID/secrets",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	],
    "postData": {
    "mimeType": "application/json",
    "text": "{ [ \"HOOK_SECRET_NAME\", \"HOOK_SECRET_NAME\" ] }"
  }
}
```

| Value | Description |
| - | - |
| `HOOK_ID` | ID of the Hook for which you want to delete secrets. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `delete:hooks`. |
| `HOOK_SECRET_NAME` | Name(s) of the secret(s) you would like to delete from the specified Hook. This endpoint accepts an array of secret names to delete. |

</div>
  </div>
</div>