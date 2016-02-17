---
sitemap: false
title: API Auth: Configuring the Resource Servers
url: /api-auth/config/resource-servers
---

# API Auth: Configuring the Resource Servers

The first step in the OAuth 2.0 setup is defining your own APIs as Resource Servers, which is done through Auth0's API v2. On the [API explorer](/api/v2) you will need to generate a token with the `create:resource_servers` scope.

With this token you can call the `/api/v2/resource-servers` endpoint to create a new **Resource Server**:

```text
POST https://${account.namespace}/api/v2/resource-servers

Authorization: Bearer {APIV2_TOKEN}
Content-Type: application/json

{
  "identifier": "{RESOURCE_SERVER_IDENTIFIER}",
  "scopes": [
      { "value": "{SCOPE_VALUE}", "description": "{SCOPE_DESCRIPTION}" },
      { "value": "{SCOPE_VALUE}", "description": "{SCOPE_DESCRIPTION}" }
  ]
}
```

When creating a **Resource Server** you'll need to specify the following:

 - `identifier`: The unique identifier of the **Resource Server**, this is typically a urn or a url (eg: `urn:myapi`).
 - `scopes`: A list of scopes that are available in the **Resource Server**. These are the scopes that can be requested by a **Client** (if allowed) and when a user is presented with the consent page the `description` will be used to show which scopes have been requested by the **Client**

For example:

```text
POST https://${account.namespace}/api/v2/resource-servers

Authorization: Bearer {APIV2_TOKEN}
Content-Type: application/json

{
  "identifier": "urn:bank-api",
  "scopes": [
      { "value": "read:accounts", "description": "Allow the application to list my bank accounts." },
      { "value": "read:accounts_balance", "description": "Allow the application to list the balance of my accounts." }
  ]
}
```
