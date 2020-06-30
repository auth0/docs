---
title: Create Rules
description: Learn how to create a rule using the Auth0 Management API. You can use rules to customize and extend Auth0's capabilities.
topics:
  - mgmt-api
  - rules
  - extensibility
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Create Rules

This guide will show you how to create [rules](/rules) using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/rules/create-rules).

1. Make a `POST` call to the [Create Rule endpoint](/api/management/v2#!/Rules/post_rules). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `RULE_NAME`, `RULE_SCRIPT`, `RULE_ORDER`, and `RULE_ENABLED` placeholder values with your Management API Access Token, rule name, rule script, rule order number, and rule enabled value, respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/rules",
  "headers": [
  	{ "name": "Content-Type", "value": "application/json" },
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"name\": \"RULE_NAME\", \"script\": \"RULE_SCRIPT\" }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:rules`. |
| `RULE_NAME` | Name of the rule you would like to create. The rule name can only contain alphanumeric characters, spaces, and hyphens; it may not start or end with spaces or hyphens. |
| `RULE_SCRIPT` | Script that contains the code for the rule. Should match what you would enter if you were [creating a new rule using the Dashboard](/dashboard/guides/rules/create-rules). |
| `RULE_ORDER` (optional) | Integer that represents the order in which the rule should be executed in relation to other rules. Rules with lower numbers are executed before rules with higher numbers. If no order number is provided, the rule will execute last.
| `RULE_ENABLED` (optional) | Boolean that represents whether the rules is enabled (`true`) or disabled (`false`). |