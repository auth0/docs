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
# Consent dialog

By default, the user consent page groups scopes for the same resource and displays all actions for that resource in a single line. For example, let's say you have an API defined with the following scopes:

* `read:messages`: Be able to read your email messages
* `write:messages`: Write messages

The consent page would display: **Messages: read and write your messages**.

However, you can set your tenant's **use_scope_descriptions_for_consent** flag to **true** to have the consent page display the **Description** field instead. This affects consent prompts for all APIs on the tenant.

With this flag enabled, the consent page would display: **Be able to read your email messages**, **Write messages**.

To set the **use_scope_descriptions_for_consent** flag, you will need to make the following call to the API:

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
