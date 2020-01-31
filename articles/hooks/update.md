---
title: Update Hooks
description: Learn how to update Hooks using the Dashboard or Management API. Hooks may also be imported and exported using the Auth0 Deploy Command-Line Interface (CLI) tool.
beta: true
topics:
    - hooks
    - dashboard
    - mgmt-api
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Update Hooks

You can update Hooks configured for any given [extensibility point](/hooks/extensibility-points) using the Dashboard or Management API.

Hooks may also be imported and exported using the [Deploy Command-Line Interface (CLI) Extension](/extensions/deploy-cli).

::: note
If you added a [Hook Secret](/hooks/secrets) and want to update it, see [Update Hook Secrets](/hooks/secrets/update).
:::

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

## Rename Hooks using the Dashboard

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and click the gear icon next to the Hook you want to rename.
2. Select **Rename**.
3. Enter the current name and new name of the hook, then click **Rename**.

![Rename Hooks prompt](/media/articles/hooks/rename-hook.png)

## Update Hook scripts using the Dashboard

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and click the pencil icon next to the Hook you want to update.

  ![List of Hooks](/media/articles/hooks/hooks-list.png)

2. Update the Hook using the Hook Editor, and click the disk icon to save.

  ![Update a Hook in the Hook Editor](/media/articles/hooks/webtask-editor.png)
    </div>
    <div id="mgmt-api" class="tab-pane">

## Update Hooks using the Management API

1. Make a `PATCH` call to the [Update a Hook endpoint](/api/management/v2/#!/Hooks/patch_hooks_by_id). Be sure to replace `HOOK_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your hook ID and Management API Access Token, respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/hooks/HOOK_ID",
	"headers": [
    	{ "name": "Content-Type", "value": "application/json" },
   		{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
      	"mimeType": "application/json",
      	"text" : "{ \"name\": \"HOOK_NAME\", \"script\": \"HOOK_SCRIPT\", \"enabled\": \"true\" }"
	}
}
```

| Value | Description |
| - | - |
| `HOOK_ID` | ID of the hook to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:hooks`. |
| `HOOK_NAME` | Name of the hook you would like to create. |
| `HOOK_SCRIPT` | Script that contains the code for the hook. Should match what you would enter if you were creating a new hook using the Dashboard. |

::: note
The `enabled` property represents whether the rule is enabled (`true`) or disabled (`false`). |
:::

</div>
  </div>
</div>

<%= include('./_includes/_handle_rate_limits') %>

::: note
Optionally, you can add secrets (such as Twilio Keys or database connection strings) to Hooks. To learn how to update secrets, see [Update Hook Secrets](/hooks/secrets/update).
:::