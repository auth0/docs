---
title: View Hooks
description: Learn how to view Hooks using the Dashboard and Management API. Hooks may also be imported and exported using the Auth0 Deploy Command-Line Interface (CLI) tool.
beta: true
topics:
    - hooks
    - mgmt-api
    - dashboard
contentType: how-to
useCase: extensibility-hooks
v2: true
---
# View Hooks

To see configured Hooks, you can view them using the Dashboard or retrieve a list of them using the Management API.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

## View Hooks using the Dashboard

1. Navigate to the [Hooks](${manage_url}/#/hooks) page in the [Auth0 Dashboard](${manage_url}/).

All configured Hooks will be listed by the extensibility point at which they are executed. A green dot next to a Hook indicates that it is enabled.

    </div>
    <div id="mgmt-api" class="tab-pane">

## Get Hooks using the Management API

1. Make a `GET` call to the [Get Hooks endpoint](/api/management/v2/#!/Hooks/get_hooks). Be sure to replace `MGMT_API_ACCESS_TOKEN` placeholder value with your Management API Access Token.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/hooks",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:hooks`. |

</div>
  </div>
</div>