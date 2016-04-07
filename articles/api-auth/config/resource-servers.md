# API Auth: Configuring the Resource Servers
<%=include('../_preview-warning') %>

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
  "identifier": "urn:organizer-api",
  "scopes": [
      { "value": "contacts", "description": "Manage your contacts" },
      { "value": "appointments", "description": "Manage your appointments" },
      { "value": "tasks", "description": "Manage your tasks" }
  ]
}
```
