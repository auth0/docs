---
title: Customize the Consent Prompt
description: Learn how to customize the consent prompt presented to users during authorization.
topics:
  - scopes
  - permissions
  - authorization
  - consent-prompt
  - mgmt-api
contentType:
  - how-to
useCase:
  - development
  - secure-api
---
# Customize the Consent Prompt

When a third-party application requests <dfn data-key="scope">scopes</dfn>, users see a consent prompt. By default, this prompt uses the scope **name** to generate text and groups all scopes for a resource, displaying the resource's actions in a single line.

<%= include('../../../_includes/_parental-consent') %>

For example, let's say you have an Auth0-registered API with the following defined scopes:

* `read:messages`: Be able to read your email messages
* `write:messages`: Write messages

The consent prompt will display: **Messages: read and write your messages**.

Instead, you can use your defined scope **description** to generate this text. In this case, the consent dialog would display: **Be able to read your email messages**, **Write messages**.

::: warning
This change is made at the tenant level, so it will affect consent prompts for all APIs on the tenant.
:::

## Use scope descriptions to generate consent prompt text

Set your tenant's **use_scope_descriptions_for_consent** flag to `true` by making the following API call:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/tenants/settings",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
      "mimeType": "application/json",
      "text" : "{ \"flags\": { \"use_scope_descriptions_for_consent\": true } }"
  }
}
```

## Use scope names to generate consent prompt text

Set your tenant's **use_scope_descriptions_for_consent** flag to `false` by making the following API call:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/tenants/settings",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
      "mimeType": "application/json",
      "text" : "{ \"flags\": { \"use_scope_descriptions_for_consent\": false } }"
  }
}
```

## Keep reading

- [How to Define Scopes for an API Using the Auth0 Dashboard](/scopes/current/guides/define-api-scopes-dashboard)
