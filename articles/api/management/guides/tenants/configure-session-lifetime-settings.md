---
title: Configure Session Lifetime Settings
description: Learn how to configure session lengths and limits for a tenant using the Auth0 Management API.
topics:
  - idle-timeout
  - absolute-timeout
  - session-lifetime-limits
  - dashboard
contentType:
  - how-to
useCase:
  - integrate-saas-sso
  - configure-sso
  - build-an-app
---
# Configure Session Lifetime Settings

This guide will show you how to configure session settings for your tenant using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/tenants/configure-session-lifetime-settings).

1. Make a `PATCH` call to the [Tenant Settings endpoint](/api/management/v2#!/tenants/patch_settings). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `SESSION_LIFETIME`, and `IDLE_SESSION_LIFETIME` placeholder values with your Management API Access Token, session lifetime value, and idle session lifetime value, respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/tenants/settings",
  "headers": [
  	{ "name": "Content-Type", "value": "application/json" },
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"session_lifetime\": SESSION_LIFETIME_VALUE, \"idle_session_lifetime\": IDLE_SESSION_LIFETIME_VALUE }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:tenant_settings`. |
| `IDLE_SESSION_LIFETIME_VALUE` | Timeframe (in hours) after which a user's session will expire if they haven’t interacted with the Authorization Server. Will be superseded by system limits if over 72 hours (3 days) for self-service plans or 2,400 hours (100 days) for enterprise plans. |
| `SESSION_LIFETIME_VALUE` | Timeframe (in hours) after which a user will be required to log in again, regardless of their activity. Will be superseded by system limits if over 720 hours (30 days) for self-service plans or 8,760 hours (365 days) for enterprise plans. |
