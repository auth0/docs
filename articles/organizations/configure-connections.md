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
Currently, when organizations are enabled for an organization, connections enabled for the application are merged with connections enabled for the organizations. This means that when an end-user navigates to an organization login page (either directly from your application, or selecting an organization in the pre-login organization prompt), they will see a combined list of the connections that are enabled at the organization and application level.
:::

## Enable connections

You can enable connections for organizations using either the Auth0 Dashboard or the Management API.

### Auth0 Dashboard

To enable a connection via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Organizations](${manage_url}/#/organizations), and select the organization for which you want to configure connections.
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

#### Responses

Possible responses are as follows:

| Code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | Connection successfully removed from organization. | |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `delete:organization_connections`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |


### Email templates

To modify emails the end-user receives, customize an email template using the [Liquid template language](https://shopify.github.io/liquid/) and [template variables](#template-variables).

The following email templates can be further customized for organizations:

* **Welcome**: Received by the end-user once they verify their email address or, if email verification is disabled, when they sign up (or log in for the first time).
* **Password Change**: Received by the end-user when they request a password change. Contains a link that redirects them to the Password Reset page.
* **Invite User**: Received by the end-user when they are invited to an organization. Contains a link that redirects them to a custom invitation page. To learn more, see [Invite members](/organizations/configure-membership#invite-members).

### Template variables

Page and email templates may access a set of context variables that you can use to impact how the template is rendered.

For lists of available variables, see [Available page template variables](/universal-login/new-experience/universal-login-page-templates#available-variables) and [Common email template variables](/auth0-email-services/customize-email-templates#common-variables).

Additional variables are available to the page template when an end-user logs in through an organization:

* `organization.id`
* `organization.display_name`
* `organization.name`
* `organization.metadata`
* `organization.branding.logo_url`
* `organization.branding.colors.primary`
* `organization.branding.colors.page_background`

## Delete organizations

When deleting an organization, the association between all users’ membership and the deleted organization will be removed, though the users themselves will not be deleted from your tenant. 

::: warning
Once confirmed, this operation cannot be undone.
:::

You can delete organizations using either the Auth0 Dashboard or the Management API.

### Auth0 Dashboard

To delete an organization via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Organizations](${manage_url}/#/organizations), and select the organization you want to delete.
2. Scroll to locate the **Danger Zone** section, select **Delete**, and confirm.

### Management API

Make a `DELETE` call to the `Delete Organization` endpoint. Be sure to replace the `ORG_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your organization ID and Management API Access Token, respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/organizations/ORG_ID",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| `ORG_ID` | ID of the organization you want to delete. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `delete:organizations`. |

#### Responses

Possible responses are as follows:

| Code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | The organization was deleted. | |
| `400` | `invalid_uri` | Invalid request URI. The message will vary depending on the cause. | The path is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `delete:organizations`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `404` | | The organization does not exist. | |
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
| `ORG_ID` | ID of the organization for which you want to retrieve enabled connections. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `read:organization_connections`. |

#### Responses

Possible responses are as follows:

| Code | Error code | Message | Cause |
| - | - | - | - |
| `200` | | Connections successfully retrieved. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `read:organization_connections`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |