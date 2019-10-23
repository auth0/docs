---
title: Connect Your App to OpenID Connect Identity Providers
connection: OpenID Connect
image: /media/connections/oidc.png
public: true
seo_alias: oidc
description: Learn how to connect to OpenID Connect (OIDC) Identity Providers using an enterprise connection.
crews: crew-2
toc: true
topics:
    - connections
    - enterprise
    - oidc
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect to an OpenID Connect Identity Provider

::: warning
If you are using the Lock login widget with an OpenID Connect (OIDC) connection, you must use Lock version 11.16 or higher.
:::

## Prerequisites

**Before beginning:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

To connect your application to an OIDC Identity Provider, you must:

1. [Set up your app in the OpenID Connect Identity Provider](#set-up-your-app-in-the-openid-connect-identity-provider).
2. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0) and download the installer.
3. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
4. [Test the connection](#test-the-connection).

## Set up your app in the OpenID Connect Identity Provider

To allow users to log in using an OIDC Identity Provider, you must register your application with the IdP. The process of doing this varies depending on the OIDC Identity Provider, so you will need to follow your IdP's documentation to complete this task.

Generally, you will want to make sure that at some point you enter your <dfn data-key="callback">callback URL</dfn>: `https://${account.namespace}/login/callback`.

<%= include('../_find-auth0-domain-redirects.md') %>

During this process, your OIDC Identity Provider will generate a unique identifier for the registered API, usually called a **Client ID** or an **Application ID**. Make note of this value; you will need it later.

## Create an enterprise connection in Auth0

Next, you will need to create and configure a OIDC Enterprise Connection in Auth0. Make sure you have the **Application (client) ID** and the **Client secret** generated when you set up your app in the OIDC provider.

### Create an enterprise connection using the Dashboard

::: warning
To be configurable through the Auth0 Dashboard, the OpenID Connect (OIDC) Identity Provider (IdP) needs to support [OIDC Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html). Otherwise, you can configure the connection using the [Management API](#configure-the-connection-using-the-management-api).
:::

1. Navigate to the [Connections > Enterprise](${manage_url}/#/connections/enterprise) page in the [Auth0 Dashboard](${manage_url}/), and click the `+` next to **OpenID Connect**.

![Create Connection Type](/media/articles/dashboard/connections/enterprise/conn-enterprise-list.png)

2. Enter general information for your connection:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **Display name** (optional) | Text used to customize the login button for Universal Login. When set, the Universal Login login button reads: "Continue with {Display name}". |
| **Logo URL** (optional) | URL of image used to customize the login button for Universal Login. When set, the Universal Login login button displays the image as a 20px by 20px square. |
| **Issuer URL** | URL where Auth0 can find the **OpenID Provider Configuration Document**, which should be available in the `/.well-known/openid-configuration` endpoint. You can enter the base URL or the full URL. You will see a green checkmark if it can be found at that location, a red mark if it cannot be found, or an error message if the file is found but the required information is not present in the configuration file. |
| **Client ID** | Unique identifier for your registered Azure AD application. Enter the saved value of the **Client ID** for the app you registered with the OIDC Identity Provider. |

![Configure General OIDC Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-oidc-settings-1.png)

3. Enter additional information for your connection, and click **Create**:

| Field | Description |
| ----- | ----------- |
| **Callback URL** | URL to which Auth0 redirects users after they authenticate. Ensure that this value is configured for the app you registered with the OIDC Identity Provider.
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

<%= include('../_find-auth0-domain-redirects.md') %>

![Configure Advanced OIDC Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-oidc-settings-2.png)

### Create an enterprise connection using the Management API

These examples will show you the variety of ways you can create the [connection](/connections) using Auth0's Management API. You ca configure the connection by either providing a metadata URI or by setting the OIDC URLs explicitly.

**Use Front Channel with discovery endpoint**

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/connections",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"strategy\": \"oidc\", \"name\": \"CONNECTION_NAME\", \"options\": { \"type\": \"front_channel\", \"discovery_url\": \"https://IDP_DOMAIN/.well-known/openid-configuration\", \"client_id\" : \"IDP_CLIENT_ID\",  \"scopes\": \"openid profile\" } }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

**Use Back Channel with discovery endpoint**

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/connections",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"strategy\": \"oidc\", \"name\": \"CONNECTION_NAME\", \"options\": { \"type\": \"back_channel\", \"discovery_url\": \"https://IDP_DOMAIN/.well-known/openid-configuration\", \"client_id\" : \"IDP_CLIENT_ID\", \"client_secret\" : \"IDP_CLIENT_SECRET\", \"scopes\": \"openid profile\" } }"

	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

**Use Front Channel specifying issuer settings**

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/connections",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"strategy\": \"oidc\", \"name\": \"CONNECTION_NAME\", \"options\": { \"type\": \"front_channel\", \"issuer\": \"https://IDP_DOMAIN\", \"authorization_endpoint\": \"https://IDP_DOMAIN/authorize\", \"token_endpoint\": \"https://IDP_DOMAIN/oauth/token\", \"jwks_uri\": \"https://IDP_DOMAIN/.well-known/jwks.json\", \"client_id\" : \"IDP_CLIENT_ID\",  \"client_secret\" : \"IDP_CLIENT_SECRET\", \"scopes\": \"openid profile\" } }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

**Use Back Channel specifying issuer settings**

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/connections",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"strategy\": \"oidc\", \"name\": \"CONNECTION_NAME\", \"options\": { \"type\": \"back_channel\", \"issuer\": \"https://IDP_DOMAIN\", \"authorization_endpoint\": \"https://IDP_DOMAIN/authorize\", \"jwks_uri\": \"https://IDP_DOMAIN/.well-known/jwks.json\", \"client_id\" : \"IDP_CLIENT_ID\",  \"scopes\": \"openid profile\" } }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Enable the enterprise connection for your Auth0 application

To use your new Azure AD enterprise connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).

## Manually configure Issuer metadata 

If you click `Show Issuer Details` on the Issuer URL endpoint, you can see the data and adjust it if you need to.

## Federate with Auth0

The OpenID Connect enterprise connection is extremely useful when federating to another Auth0 tenant. Just enter your Auth0 tenant URL (for example, `https://<tenant>.auth0.com` in the **Issuer** field, and enter the Client ID for any application in the tenant to which you want to federate in the **Client ID** field.

## Provide Feedback

While in Beta, we'll be answering questions and receiving feedback in our [Community Section for the OIDC Connection Beta Program](https://community.auth0.com/c/auth0-beta-programs/new-oidc-connection-beta).
