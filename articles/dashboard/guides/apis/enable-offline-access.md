---
title: Enable Offline Access for APIs
description: Learn how to enable offline access for an API using the Auth0 Management Dashboard or Auth0 Management API.
topics:
  - authorization
  - dashboard
  - mgmt-api
  - offline-access
  - refresh-tokens
  - apis
contentType: 
    - how-to
useCase:
  - call-api
  - secure-api
---
# Enable Offline Access for APIs

This guide will show you how to enable offline access for an API using Auth0's Dashboard. When offline access is enabled, the API will be able to issue [Refresh Tokens](/tokens/access-tokens) to other APIs using the [On-Behalf-Of Flow](/flows/concepts/on-behalf-of).

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Scroll to **Access Settings**, enable the **Enable Offline Access** toggle, and click **Save**.

    </div>
    <div id="mgmt-api" class="tab-pane">
<ol>

1. Make a `PATCH` call to the [Update Resource Server endpoint](/api/management/v2#!/resource_servers/patch_resource_server). Be sure to replace `API_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your API ID and Management API Access Token, respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/resource-servers/API_ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"allow_offline_access\": \"true\" }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `API_ID` | Τhe ID of the API for which you want to enable offline access. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:resource_servers`. |

</ol>
    </div>
  </div>
</div>
