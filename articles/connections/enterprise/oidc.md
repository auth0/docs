---
title: Connecting to OpenID Connect Identity Providers
connection: OpenId Connect
image: /media/connections/open-id.png
seo_alias: oidc
description: Connecting to OpenID Connect Identity Providers
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

::: warning
If you are using Lock with an OpenID Connect (OIDC) connection, you must use Lock version 11.16 or higher.
:::

# Connect to an OpenID Connect Identity Provider

Auth0 provides an OpenID Connect (OIDC) connection that enables you to connect to OIDC-compliant identity providers. 

To be configurable through the Auth0 Dashboard, the Open ID identity provider needs to support [OIDC Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html). Otherwise, you can configure it using the [Management API](#configuring_the_connection_using_the_management_api).

To create a new OIDC connection, you'll need to complete the following fields:

![](/media/articles/connections/enterprise/oidc/oidc-small.png)

* **Connection Name**: The logical identifier for your Connection. It cannot be changed and needs to be unique for the tenant.

* **Issuer URL**: The URL where Auth0 can find the **OpenID Provider Configuration Document**, which should be available in the `/.well-known/openid-configuration` endpoint. You can enter the base URL or the full URL. You will see a green checkmark if it can be found at that location, a red mark if it cannot be found, or an error message if the file is found but the required information is not present in the configuration file.

* **Client ID**: The Client ID for the client that is defined in the target identity provider. It's different for each provider, so please check the provider's documentation.

* **Client Secret**: In case the OIDC provider does not support front-channel authentication, Auth0 will prompt for the Client Secret. The client secret is usually available in the OIDC provider client configuration page.

You need to make sure that the **Callback URL** referenced is added as a valid callback URL in the client application that's referenced with the Client ID specified above. Note that if you are using a Custom Domain, the callback URL should point to it.

Click **Save**.

Next, you will see a list of your registered [applications](${manage_url}/#/applications) with the option to enable the new connection for any of them.

That's it! You are now ready to test and start using your connection.

## Additional customization options

If you edit the OIDC Connect Connection, you will see additional configuration options:

![](/media/articles/connections/enterprise/oidc/oidc-details.png)

* **Display Name**: The name that will be used in the Login screen for the New Universal Login Experience to identify the connection. In the Classic Universal Login Experience, the connection name will be used instead.

* **Icon URL**: The icon that will be used in the Login screen for the New Universal Login Experience to identify the connection. In the Classic Universal Login Experience, a default icon will be used.

* **Type**: Determines what ODIC options will be used when authenticating with the OIDC provider. You could need to adjust it if the ODIC metadata claims to support both but a specific client only supports Back Channel.

    * Front Channel: Auth0 will use `response_mode=form_post` and `response_type=id_token`. It's the preferred one as it does not require a client secret. 
    * Back Channel: Auth0 will use the authorization code flow with `response_type=code`.

* **IdP Domains**: The list of email domains that can be authenticated in the Identity Provider. This is only applicable when using Identifier First authentication in the Classic Universal Login Experience.

* **Scopes**: The list of OAuth scopes that will be requested when connecting to the identity provider. This will affect the data stored in the user profile. You are required to include at least the 'openid' scope. Note that the connection does not call `/userinfo` endpoint and expects the user claims to be present in the `id_token`.

## Manually configuring Issuer metadata 

If you click `Show Issuer Details` you can see the data returned by the Issuer URL endpoint and adjust it in case you need to.

## Federating with Auth0

The OpenID Connect connection is very useful when federating to another Auth0 tenant. Just enter your Auth0 tenant URL in the 'Issuer' field (such as `https://<tenant>.auth0.com`), and the Client ID for any application in that tenant in the 'Client ID' field.

## Configuring the connection using the Management API

The examples below show can you can configure the connection by either providing a metadata URI or by setting the OIDC URLs explicitly. 

**Using Front Channel with discovery endpoint**

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

**Using Back Channel with discovery endpoint**

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

**Using Front Channel specifying issuer settings**

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

**Using Back Channel specifying issuer settings**

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

## Providing Feedback

While in Beta, we'll be answering questions and receiving feedback in our [Community Section for the OIDC Connection Beta Program](https://community.auth0.com/c/auth0-beta-programs/new-oidc-connection-beta).


