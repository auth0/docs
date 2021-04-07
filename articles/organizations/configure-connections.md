---
title: Configure Connections
description: Learn to enable and disable connections for Auth0's Organizations feature.
topics:
  - organizations
contentType: 
    - how-to
    - concept
useCase:
  - build-an-app
toc: true
---

# Configure Connections

Each organization can have specific connections enabled, which represent the login options you can offer your users for that organization. To enable a connection for an organization, you must have already created the connection in your tenant. Available connections include [database connections](/connections/database), [social connections](/connections/identity-providers-social), and [enterprise connections](/connections/identity-providers-enterprise).

::: warning
Only connections enabled at the organization level are displayed when an end-user navigates to an organization login page (either directly from your application or by selecting an organization in the pre-login organization prompt).
:::

## Enable connections

You can enable connections for organizations using either the Auth0 Dashboard or the Management API.

### Auth0 Dashboard

To enable a connection via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Organizations](${manage_url}/#/organizations), and select the organization for which you want to configure connections.
2.  Select the **Connections** view, and select **Enable Connections**.
3. Select the connection you want to enable, and select **Enable Connection**.
4. Locate **Membership On Authentication**, and choose whether to enable or disable auto-membership which will allow all users logging in with the connection to automatically be added as members of the organization.
5. Select **Save**.

### Management API

To enable a connection via the Management API:

Make a `POST` call to the `Create Organization Connections` endpoint. Be sure to replace `ORG_ID`, `MGMT_API_ACCESS_TOKEN`, `CONNECTION_ID`, and `JIT_MEMBERSHIP_VALUE` placeholder values with your organization ID, Management API Access Token, and connection ID, respectively.

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
   "text" : "{ \"connection_id\": \"CONNECTION_ID\", \"assign_membership_on_login\": \"JIT_MEMBERSHIP_VALUE\" }"
   }
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to enable a connection. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `create:organization_connections`. |
| `CONNECTION_ID` | ID of the connection you want to enable for the specified organization. |
| `JIT_MEMBERSHIP_VALUE` | Indicates whether you want users that log in with this connection to automatically be granted membership in the organization. When set to `true`, users will automatically be granted membership. When set to `false`, they will not automatically be granted membership. |

#### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `201` | | Connection successfully added to organization. | |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `create:organizations_connections`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |

## Disable connections

You can disable connections for organizations using either the Auth0 Dashboard or the Management API.

### Auth0 Dashboard

To disable a connection via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Organizations](${manage_url}/#/organizations), and select the organization for which you want to configure connections.
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

#### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | Connection successfully removed from organization. | |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `delete:organization_connections`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |

## Retrieve organization connections

When working with organizations programmatically, you may need to retrieve a list of connections enabled for an organization.

Although you can can see enabled connections for an organization through the Auth0 Dashboard by navigating to [Auth0 Dashboard > Organizations](${manage_url}/#/organizations), selecting the organization, and selecting the **Connections** view, retrieving enabled organization connections is mainly useful when using the Management API.

Make a `GET` call to the `Get Organization Connections` endpoint. Be sure to replace the `ORG_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your organization ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/organizations/ORG_ID/enabled_connections",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to retrieve enabled connections. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `read:organization_connections`. |

### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `200` | | Connections successfully retrieved. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `read:organization_connections`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |