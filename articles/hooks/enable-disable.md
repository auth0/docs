---
title: Enable/Disable Hooks
description: Learn how to enable and disable Hooks using the Dashboard  and Management API.
beta: true
topics:
    - hooks
    - dashboard
    - mgmt-api
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Enable/Disable Hooks

You can enable or disable Hooks that have been configured for any given [extensibility point](/hooks/extensibility-points) using the Dashboard or Management API.

<%= include('./_includes/_hook_enabled_limit') %>

<%= include('./_includes/_default_hook_enable_behavior') %>

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

## Enable/Disable Hooks using the Dashboard

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and locate the extensibility point for which you want to enable or disable a Hook.

2. Click on the dropdown box located immediately under the extensibility point's name and description.

  ![View Avalilable Hooks for an Extensibility Point](/media/articles/hooks/select-hook-to-enable.png)

3. Select the Hook you want to enable, and confirm. If you want to disable all Hooks, select `None`.

A green dot will appear next to the name of any enabled Hooks.
    </div>
    <div id="mgmt-api" class="tab-pane">

## Enable/Disable Hooks using the Management API

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
      	"text" : "{ \"enabled\": \"true\" }"
	}
}
```

| Value | Description |
| - | - |
| `HOOK_ID` | ID of the hook to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:hooks`. |

::: note
The `enabled` property represents whether the rule is enabled (`true`) or disabled (`false`). |
:::

</div>
  </div>
</div>
