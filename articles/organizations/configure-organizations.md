---
title: Configure Organizations
description: Learn to create organizations using Auth0's Organizations feature.
topics:
  - organizations
contentType: 
    - how-to
    - concept
useCase:
  - build-an-app
toc: true
---

# Configure Organizations

To begin using the Organizations feature, you must create and configure your organizations.

## Create organizations

When you create an organization, the settings you define are used to customize the login page and email templates that end-users see when they authenticate in the context of the organization.

When using Organizations out-of-the-box, these settings will override the settings for the new Universal Login pages. If you'd like to further customize the login page or email templates, see [Customize prompts and email templates](#customize-prompts-and-email-templates).

You can create organizations using either the Auth0 Dashboard or the Management API.

### Auth0 Dashboard

To create an organization via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Organizations](${manage_url}/#/organizations).
2. Select **Create Organization**.
3. Enter basic information for your organization, and select **Add Organization**:

| Field | Description |
| - | - |
| **Name** | Name of the organization you would like to create. This is the name that an end-user would type in the pre-login prompt to identify which organization they wanted to log in through. Unique logical identifier, which cannot be changed. May only contain lowercase, alphabetical characters and numbers. |
| **Display Name** | User-friendly name to display. |

4. Locate the **Branding** section and customize your organization, then select **Save changes**:

| Field | Description |
| - | - |
| **Organization Logo** | Logo to display. |
| **Primary Color** | Color for primary elements. |
| **Page&nbsp;Background Color** | Color for background. |

4. Locate the **Metadata** section and add any necessary metadata key/value pairs to the organization, then select **Add**.

### Management API

To create an organization via the Management API:

Make a `POST` call to the `Create Organizations` endpoint. Be sure to replace `MGMT_API_ACCESS_TOKEN`, `ORG_NAME`, `ORG_DISPLAY_NAME`, `ORG_LOGO`, `ORG_PRIMARY_COLOR`, `ORG_BACKGROUND_COLOR`, and `KEY`/`VALUE` placeholder values with your Management API Access Token, organization name, organization display name, organization logo, organization primary color, organization background color, and organization metadata keys and values, respectively.

```har
{
   "method": "POST",
   "url": "https://YOUR_AUTH0_DOMAIN/api/v2/organizations",
 "headers": [
   { "name": "Content-Type", "value": "application/json" },
   { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
   { "name": "Cache-Control", "value": "no-cache" }
   ],
   "postData": {
   "mimeType": "application/json",
   "text" : "{ \"name\": \"ORG_NAME\", \"display_name\": \"ORG_DISPLAY_NAME\", \"branding\": [ { \"logo_uri\": \"ORG_LOGO\", \"colors\": [ { \"primary\": \"ORG_PRIMARY_COLOR\", \"page_background\": \"ORG_PAGE_BACKGROUND\" } ] } ], \"metadata\": [ { \"KEY\": \"VALUE\", \"KEY\": \"VALUE\", \"KEY\": \"VALUE\" } ] }"
   }
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `create:organizations`. |
| `ORG_NAME` | Name of the organization you would like to create. This is the name that an end-user would type in the pre-login prompt to identify which organization they wanted to log in through. Unique logical identifier, which cannot be changed. May only contain lowercase, alphabetical characters and numbers. |
| `ORG_DISPLAY_NAME` | User-friendly name of the organization to display. |
| `ORG_LOGO` | URL of the organization’s logo. |
| `ORG_PRIMARY_COLOR` | HEX color code for primary elements. |
| `ORG_BACKGROUND_COLOR` | HEX color code for background. |
| `KEY`/`VALUE` | String key/value pairs that represent metadata for the organization. Maximum of 255 characters each. Maximum of 10 metadata pairs. |

#### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `201` | | Organization successfully created. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `create:organizations`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `409` | `organization_conflict` | An organization with the same name already exists. | An organization with the same name already exists. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |

## Customize prompts and email templates

When using Organizations with Universal Login out-of-the-box prompts, the branding settings you configure when you [create organizations](#create-organizations) override the branding for the new Universal Login pages and email templates. If you would like to further modify the Universal Login pages and emails that the end-user receives, you can customize page and email templates.

### Page templates

::: note
To access page template customization, you must use custom domains, which is a feature of any paid pricing plan.
:::

To modify Universal Login page, customize a page template using the [Liquid template language](https://shopify.github.io/liquid/) and [template variables](#template-variables), then apply the template using the [Universal Login Page Templates API](/universal-login/new-experience/universal-login-page-templates#page-templates-api).

Because the same template is used for all pages, you can implement consistent login pages with minimum effort.

The simplest template you can write is:

```html
<!DOCTYPE html><html>
  <head>
    {%- auth0:head -%}
  </head>
  <body>
    {%- auth0:widget -%}
  </body></html>
```

The following tags must be present in the template:

* **`auth0:widget`**: Contains the HTML that structures the widget displayed on every page type (e.g., Login, Reset Password).
* **`auth0:head`**: Contains tags required to render the widget.

To center the widget in the page, replace the `<body>` tag with  `<body class="_widget-auto-layout">`.

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
| - | - |
| `ORG_ID` | ID of the organization you want to delete. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `delete:organizations`. |

#### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | The organization was deleted. | |
| `400` | `invalid_uri` | Invalid request URI. The message will vary depending on the cause. | The path is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `delete:organizations`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `404` | | The organization does not exist. | |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |

## Retrieve organizations

When working with organizations programmatically, you may need to retrieve either a list of all organizations or organizations individually by name or ID.

Although you can can see organizations through the Auth0 Dashboard by navigating to [Auth0 Dashboard > Organizations](${manage_url}/#/organizations), retrieving organizations is mainly useful when using the Management API.

### Retrieve organizations

You can retrieve organizations for a tenant via the Management API.

::: warning
Up to 1000 organizations can be displayed using the Auth0 Dashboard or Management API, though more may exist.
:::

Make a `GET` call to the `Get Organizations` endpoint. Be sure to replace the `MGMT_API_ACCESS_TOKEN` placeholder value with your Management API Access Token.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/organizations",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `read:organizations`. |

#### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `200` | | Organizations successfully retrieved. | |
| `400` | `invalid_paging` | Requesting page exceeds the allowed maximum of 1000 records. | API has been limited to only return up to 1000 records. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `read:organizations`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |

### Retrieve organization by ID

You can retrieve an organization by its ID through the Management API.

Make a `GET` call to the `Get Organization` endpoint. Be sure to replace the `ORG_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your organization ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/organizations/ORG_ID",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization you want to retrieve. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `read:organizations`. |

#### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `200` | | Organization successfully retrieved. | |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `read:organizations`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |

### Retrieve organization by name

You can retrieve an organization by its name through the Management API.

Make a `GET` call to the `Get Organization by Name` endpoint. Be sure to replace the `ORG_NAME` and `MGMT_API_ACCESS_TOKEN` placeholder values with your organization ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/organizations/name/ORG_NAME",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `ORG_ NAME` | Name of the organization you want to retrieve. Maximum length of 50 characters. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `read:organizations`. |

#### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `200` | | Organizations successfully retrieved. | |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `read:organizations`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |