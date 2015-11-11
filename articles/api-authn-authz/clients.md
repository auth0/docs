---
sitemap: false
title: OAuth2-as-a-Service: Configuring the Clients
---

# OAuth2-as-a-Service: Configuring the Clients

After having created the [Resource Servers](/oauth2-as-a-service/resource-servers) the next step is to define the **Clients** that will be able to get limited access to the **Resource Server**.

In order for this to work you will need to generate a token for Auth0's API v2 you will need to generate a token with the `create:clients` scope.

With this token you can call the `/api/v2/clients` endpoint to create a new **Client**:

```
POST https://${account.namespace}/api/v2/resource-servers

Authorization: Bearer {APIV2_TOKEN}
Content-Type: application/json

{
  "name": "{CLIENT_NAME}",
  "resource_servers": [
    {
      "identifier": "{RESOURCE_SERVER_IDENTIFIER}",
      "scopes": [ "{SCOPE_VALUE}", "{SCOPE_VALUE}" ]  
    }
  ],
  "callbacks": [ "{CLIENT_CALLBACK_URL}" ]
}
```

When creating a **Clients** you'll need to specify the following:

 - `name`: The display name of the **Client**.
 - `resource_servers`: A list of **Resource Servers** the client will be able to get a token for. For each **Resource Server** it will also be possible to define which scopes a **Client** can request (it could be that a given client is only allowed to request a subset of scopes that are defined by the **Resource Server**)
 - `callbacks`: One or more callback urls for the client.

For example:

```
POST https://${account.namespace}/api/v2/clients

Authorization: Bearer {APIV2_TOKEN}
Content-Type: application/json

{
  "name": "Savings App",
  "resource_servers": [
      {
        "identifier": "urn:bank-api",
        "scopes": [ "read:accounts" ]
      }
  ]
}
```
