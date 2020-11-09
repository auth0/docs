---
title: Configure connections
description: Learn to enable and disable connections for Auth0's Organizations feature.
topics:
  - organizations
contentType: 
    - how-to
    - concept
useCase:
  - build-an-app
---

# Configure connections

Each organization can have specific connections enabled, which represent the login options you can offer your users for that organization. To enable a connection for an organization, you must have already created the connection in your tenant. Available connections include [database connections](/connections/database), [social connections](/connections/identity-providers-social), and [enterprise connections](/connections/identity-providers-enterprise).

::: warning
Currently, when organizations are enabled for an organization, connections enabled for the application are merged with connections enabled for the organizations. This means that when an end-user navigates to an organization login page (either directly from your application, or selecting an organization in the pre-login organization prompt), they will see a combined list of the connections that are enabled at the organization and application level.
:::

## Enable connections

You can enable connections for organizations using either the Auth0 Dashboard or the Management API.

### Auth0 Dashboard

To enable a connection via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Organizations](${MANAGE_URL}/#/organizations), and select the organization for which you want to configure connections.
2.  Select the **Connections** view, and select **Enable Connections**.
3. Select the connection you want to enable, and select **Enable Connection**.

### Management API

To enable a connection via the Management API:

Make a `POST` call to the `Create Organization Connections` endpoint. Be sure to replace `ORG_ID`, `MGMT_API_ACCESS_TOKEN`, and `CONNECTION_ID` placeholder values with your organization ID, Management API Access Token, and connection ID, respectively.

```har
{
   "method": "POST",
   "url": "https://YOUR_AUTH0_DOMAIN/api/v2/organizations/ORG_ID/enabled_connections",
 "headers": [
   { "name": "Content-Type", "value": "application/json" },
   { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
   { "name": "Cache-Control", "value": "no-cache" }
   ],
   "postData": {
   "mimeType": "application/json",
   "text" : "{ \"connection_id\": \"CONNECTION_ID\" }"
   }
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to enable a connection. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `create:organization_connections`. |
| `CONNECTION_ID` | ID of the connection you want to enable for the specified organization. |

#### Responses

Possible responses are as follows:

| Code | Error code | Message | Cause |
| - | - | - | - |
| `201` | | Connection successfully added to organization. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `create:organizations_connections`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |

## Disable connections

You can disable connections for organizations using either the Auth0 Dashboard or the Management API.

### Auth0 Dashboard

To disable a connection via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Organizations](${MANAGE_URL}/#/organizations), and select the organization for which you want to configure connections.
2. Select the **Connections** view, locate the connection you want to remove, and expand its **More Options** (**...**) menu.
3. Select **Remove Connection**, and confirm.

### Management API

Make a `DELETE` call to the `Delete Organization Connections` endpoint. Be sure to replace the `ORG_ID`, `MGMT_API_ACCESS_TOKEN`, and `CONNECTION_ID` placeholder values with your organization ID, Management API Access Token, and connection ID, respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/organizations/ORG_ID/enabled_connections/CONNECTION_ID",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to disable a connection. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `delete:organization_connections`. |
| `CONNECTION_ID` | ID of the connection you want to disable for the organization. |

#### Responses

Possible responses are as follows:

| Code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | Connection successfully removed from organization. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `delete:organization_connections`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |
