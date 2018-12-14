---
description: How to create a new Rule from the Dashboard or with the Management API.
toc: true
topics:
  - rules
  - extensibility
  - create
contentType: how-to
useCase: extensibility-rules
---

# Create a New Rule

You can create new Rules from the [Dashboard](${manage_url}) or using the Auth0 [Management API](/api/management/v2/).

## From the Dashboard

To create a new Rule from the Dashboard, go to [Rules > New Rule](${manage_url}/#/rules/new). You can pick the empty Rule template to start from scratch, or use a pre-made Rule template adjust it to suit your needs.

## With the Management API

Rules can also be created with a POST request to `/api/v2/rules` using the [Management APIv2](/api/management/v2#!/Rules/post_rules).

This creates a new Rule according to the following input parameters:

| Parameter | Type | Description |
|-|-|-|
| **name** | `string` | The name of the Rule. It can only contain alphanumeric characters, spaces, and hypens (`-`). The name cannot start or end with hyphens or spaces.
| **script** | `string` | Τhe script that contains the Rule's code. This is the same as what you would enter when creating a new Rule using the [Dashboard](${manage_url}/#/rules/create).
| **order** | `number` | (optional) This number represents the Rule's order in relation to other Rules. A Rule with a lower order than another Rule executes first. If no order is provided, it will automatically be one greater than the current maximum. |
| **enabled** | `boolean` | (optional) If set to `true`, the Rule is enabled. If `false`, the Rule is disabled.

Example of a body schema:

```
{
  "name": "my-rule",
  "script": "function (user, context, callback) {\n  callback(null, user, context);\n}",
  "order": 2,
  "enabled": true
}
```

Use this to create the POST request:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/rules",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"name\":\"my-rule\",\"script\":\"function (user, context, callback) {callback(null, user, context);}\",\"order\":2,\"enabled\":true}"
  }
}
```