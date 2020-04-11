---
title: Enable Token Exchange for APIs
description: Learn how to enable token exchange for an API using the Auth0 Management Dashboard or Auth0 Management API. For use with Auth0's On-Behalf-Of Flow.
topics:
  - authorization
  - dashboard
  - mgmt-api
  - on-behalf-of
  - token-exchange
  - apis
contentType: 
    - how-to
useCase:
  - call-api
  - secure-api
---
# Enable Token Exchange for APIs

This guide will show you how to enable token exchange using Auth0's Dashboard or Auth0's Management API. When token exchange is enabled, the API will be able to act as a client to exchange [Access Tokens](/tokens/access-tokens) with other APIs using the [On-Behalf-Of Flow](/flows/concepts/on-behalf-of). For full configuration of APIs using the On-Behalf-Of Flow, see [Call API Using On-Behalf-Of Flow](/flows/guides/on-behalf-of/call-api-on-behalf-of).

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

2. Scroll to **Token Exchange Settings**, enable the **Enable Token Exchange** toggle, and click **Save**.

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
    "text" : "{ \"token_exchange\": [ { \"enabled_subject_token_types\": \"urn:ietf:params:oauth:token-type:access_token\" } ] }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `API_ID` | Τhe ID of the API for which you want to enable token exchange. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:resource_servers`. |

</ol>
    </div>
  </div>
</div>