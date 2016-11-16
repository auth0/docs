---
addon: Azure Service Bus
thirdParty: true
url: /addons/azure-sb
alias:
  - Azure Service Bus
image: /media/platforms/azure.png
tags:
  - quickstart
articles:
  - authenticate
description: This tutorial will show you how to use the Auth0 to authenticate and authorize Azure Service Bus.
---

# Azure Service Bus Addon

Here's a sample call to the delegation endpoint to get the SAS:

```text
POST https://${account.namespace}/delegation
Content-Type: 'application/json'
{
  "client_id":   "${account.clientId}",
  "grant_type":  "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "id_token":    "{YOUR_ID_TOKEN}",
  "target":      "${account.clientId}",
  "api_type":    "azure_sb",
  "scope":       "openid"
}
```

* The `client_id` value identifies the requesting app (e.g. your website) and `{YOUR_ID_TOKEN}` identifies the user you are requesting this on behalf-of. (Notice that the `id_token` is signed with the `client_id` corresponding `clientSecret`).
* The `target` parameter identifies this API endpoint in Auth0 (often the same as `{CLIENT ID}`. This is the `client_id` of the app where this add-on has been enabled.
* `api_type` must be `azure_sb`.
* `scope` must be `openid`.

The result of calling the delegation endpoint will be something like:

```json
{
  "azure_sb_sas": "SharedAccessSignature sig=k8bNfT81R8L...LztXvY%3D&se=14098336&skn=PolicyName&sr=http%3A%2F%2Fnamespace.servicebus.windows.net%2Fmy_queue"
}
```
