---
title: Customize the Consent Dialog
description: Learn how to customize the consent dialog for your users.
topics:
  - scopes
  - apis
contentType:
  - how-to
useCase:
  - development
  - secure-api
---
# Customize the Consent Prompt

When users are asked to authorize scopes, they see a consent prompt. By default, this prompt groups all scopes for a resource and displays the actions for the resource in a single line.

For example, let's say you have an Auth0-registered API with the following defined scopes:

* `read:messages`: Be able to read your email messages
* `write:messages`: Write messages

The consent prompt will display: **Messages: read and write your messages**. Notice that this uses the defined scope **name** to generate the text.

Instead, you can use your defined scope **description** to generate this text. In this case, the consent dialog would display: **Be able to read your email messages**, **Write messages**.

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
::: warning
This change made at the tenant level will affect consent prompts for all APIs on the tenant.
:::

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
