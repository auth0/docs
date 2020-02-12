---
title: Delete Hooks
description: Learn how to delete Hooks using the Dashboard and Management API. Hooks may also be imported and exported using the Auth0 Deploy Command-Line Interface (CLI) tool.
beta: true
topics:
    - hooks
    - mgmt-api
    - dashboard
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# Delete Hooks

When you no longer need Hooks, you can delete them using either the Dashboard or Management API.

Hooks may also be imported and exported using the [Deploy Command-Line Interface (CLI) Extension](/extensions/deploy-cli).

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

## Delete Hooks using the Dashboard

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and click the gear icon next to the Hook you want to delete.
2. Select **Delete**, and confirm.
    </div>
    <div id="mgmt-api" class="tab-pane">

## Delete Hooks using the Management API

1. Make a `DELETE` call to the [Delete a Hook endpoint](/api/management/v2/#!/Hooks/delete_hooks_by_id). Be sure to replace `HOOK_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your hook ID and Management API Access Token, respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/hooks/HOOK_ID",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| Value | Description |
| - | - |
| `HOOK_ID` | ID of the Hook you would like to delete. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `delete:hooks`. |

</div>
  </div>
</div>