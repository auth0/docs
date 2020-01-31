---
title: Create Hooks
description: Learn how to create Hooks using the Dashboard and Management API. Hooks may also be imported and exported using the Auth0 Deploy Command-Line Interface (CLI) tool.
beta: true
topics:
    - hooks
    - dashboard
    - mgmt-api
contentType: how-to
useCase: extensibility-hooks
v2: true
---

# Create Hooks

You can create multiple Hooks for any given [extensibility point](/hooks/extensibility-points) using the Dashboard or Management API.

Hooks may also be imported and exported using the [Deploy Command-Line Interface (CLI) Extension](/extensions/deploy-cli).

<%= include('./_includes/_hook_enabled_limit') %>

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

## Create Hooks using the Dashboard

<%= include('./_includes/_default_hook_enable_behavior') %> 

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/), and click **Create a Hook**.
2. Enter a descriptive name for your Hook, select the extensibility point for which the Hook should execute, and click **Create**.
3. Locate the section for the extensibility point you selected, and click the pencil icon next to the hook you created.
4. Update the Hook using the Hook Editor, and click the disk icon to save.

    </div>
    <div id="mgmt-api" class="tab-pane">

## Create Hooks using the Management API

<%= include('./_includes/_default_hook_enable_behavior') %> 

1. Make a `POST` call to the [Create a Hook endpoint](/api/management/v2/#!/Hooks/post_hooks). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `HOOK_NAME`, `HOOK_SCRIPT`, and `EXTENSIBILITY_POINT_NAME` placeholder values with your Management API Access Token, Hook name, Hook script, and extensibility point name, respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/hooks",
  "headers": [
  	{ "name": "Content-Type", "value": "application/json" },
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"name\": \"HOOK_NAME\", \"script\": \"HOOK_SCRIPT\", \"triggerId\": \"EXTENSIBILITY_POINT_NAME\" }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:hooks`. |
| `HOOK_NAME` | Name of the hook you would like to create. |
| `HOOK_SCRIPT` | Script that contains the code for the hook. Should match what you would enter if you were creating a new hook using the Dashboard. |
| `EXTENSIBILITY_POINT_NAME` | Name of the extensibility point for which the hook should execute. Options include: `credentials-exchange`, `pre-user-registration`, `post-user-registration`, `post-change-password`. To learn more about extensibility points, see [Extensibiity Points](/hooks/extensibility-points). |

</div>
  </div>
</div>

<%= include('./_includes/_handle_rate_limits') %>

::: note
Optionally, you can add secrets (such as Twilio Keys or database connection strings) to Hooks. To learn more, see [Hook Secrets](/hooks/secrets).
:::

### Explore starter code and sample Hook scripts

To explore starter code and sample Hook scripts, see the documentation for your chosen [extensibility point](/hooks/extensibility-points):

* [Client Credentials Exchange](/hooks/extensibility-points/client-credentials-exchange)
* [Post Change Password](/hooks/extensibility-points/post-change-password)
* [Post User Registration](/hooks/extensibility-points/post-user-registration)
* [Pre User Registration](/hooks/extensibility-points/pre-user-registration)
