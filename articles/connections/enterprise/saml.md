---
title: Connect Your App to SAML Identity Providers
connection: SAML
image: /media/connections/saml.png
public: true
alias:
  - saml
seo_alias: saml
description: Learn how to connect to SAML Identity Providers using an enterprise connection.
topics:
    - connections
    - enterprise
    - saml
    - saml-p
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Your App to SAML Identity Providers

Auth0 lets you create <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider (IdP) connections. 

## Prerequisites

**Before beginning:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.
* Decide on the name of this enterprise connection
  * The Post-back URL (also called Assertion Consumer Service URL) becomes: `https://YOUR_DOMAIN/login/callback?connection=YOUR_CONNECTION_NAME`
  * The Entity ID becomes: `urn:auth0:YOUR_TENANT:YOUR_CONNECTION_NAME`

## Steps

To connect your application to a SAML Identity Provider, you must:

1. Enter the Post-back URL and Entity ID at the IdP (read the separate article here: https://auth0.com/docs/protocols/saml-configuration-options/saml-identity-provider-configuration-settings)
2. [Get the signing certificate from the IdP](#get-the-signing-certificate-from-the-idp) and [convert it to Base64](#convert-signing-certificate-to-base64).
3. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0).
4. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
5. [Set up mappings](#set-up-mappings) (unnecessary for most cases).
6. [Test the connection](#test-the-connection).

## Get the signing certificate from the IdP

With SAML Login, Auth0 acts as the service provider, so you will need to retrieve an X.509 signing certificate from the SAML IdP (in PEM or CER format); later, you will upload this to Auth0. The methods for retrieving this certificate vary, so please see your IdP's documentation if you need additional assistance.

### Convert signing certificate to Base64

Before you upload the X.509 signing certificate to Auth0, you must convert the file to Base64. To do this, either use a [simple online tool](https://www.base64decode.org/) or run the following command in Bash: `cat signing-cert.crt | base64`.

## Create an enterprise connection in Auth0

Next, you will need to create and configure a SAML Enterprise Connection in Auth0 and upload your X.509 signing certificate. This task can be performed using either Auth0's Dashboard or Management API.

### Create an enterprise connection using the Dashboard

1. Navigate to [Auth0 Dashboard > Authentication > Enterprise](${manage_url}/#/connections/enterprise), locate **SAML**, and select its `+`.

![Create Connection Type](/media/articles/connections/dashboard-connections-enterprise-list.png)

2. Enter details for your connection, and select **Create**:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant and the same name used when setting the Post-back URL and Entity ID at the IdP. Once set, this name can't be changed. |
| **Sign In URL** | SAML single login URL. |
| **X.509 Signing Certificate** | Signing certificate (encoded in PEM or CER) you retrieved from the IdP earlier in this process. |
| **Sign Out URL** (optional) | SAML single logout URL. |
| **User ID Attribute** (optional) | Attribute in the SAML token that will be mapped to the `user_id` property in Auth0. |
| **Debug Mode** | When enabled, more verbose logging will be performed during the authentication process. |
| **Sign Request** | When enabled, the SAML authentication request will be signed. (Be sure to download and provide the accompanying certificate so the SAML IdP can validate the assertions' signature.) |
| **Sign Request Algorithm** | Algorithm Auth0 will use to sign the SAML assertions. |
| **Sign Request Digest Algorithm** | Algorithm Auth0 will use for the sign request digest. |
| **Protocol Binding** | HTTP binding supported by the IdP. |
| **Request Template** (optional) | Template that formats the SAML request. |
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

![Configure SAML Settings](/media/articles/connections/dashboard-connections-enterprise-create_saml_default-empty.png)

3. In the **Login Experience** view, configure how users log in with this connection.

<%= include('./_login-experience-tab.md') %>

4. If you have appropriate administrative permissions to complete the integration, click **Continue** to learn about the custom parameters needed to configure your IdP. Otherwise, provide the given URL to your administrator so that they can adjust the required settings.

### Create an enterprise connection using the Management API

You can also use the [Management API](/api/management/v2#!) to create your SAML Connection. When doing so, you may choose to specify each SAML configuration field manually or else specify a SAML metadata document that contains the configuration values.

#### Create a connection using specified values

1. Make a `POST` call to the [Create a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `CONNECTION_NAME`, `SIGN_IN_ENDPOINT_URL`, `SIGN_OUT_ENDPOINT_URL`, and `BASE64_SIGNING_CERT` placeholder values with your Management API Access Token, connection name, sign in URL, sign out URL, and Base64-encoded signing certificate (in PEM or CER format), respectively.

```har
{
	"method": "POST",
  	"url": "https://${account.namespace}/api/v2/connections",
  	"headers": [
    	{ "name": "Content-Type", "value": "application/json" },
    	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    	{ "name": "Cache-Control", "value": "no-cache" }
  	],
  	"postData": {
    	"mimeType": "application/json",
		"text": "{ \"strategy\": \"samlp\", \"name\": \"CONNECTION_NAME\", \"options\": { \"signInEndpoint\": \"SIGN_IN_ENDPOINT_URL\", \"signOutEndpoint\": \"SIGN_OUT_ENDPOINT_URL\", \"signatureAlgorithm\": \"rsa-sha256\", \"digestAlgorithm\": \"sha256\", \"fieldsMap\": {}, \"signingCert\": \"BASE64_SIGNING_CERT\" } }"
  	}	
}
```

| Value | Description |
| - | - |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:connections`. |
| `CONNECTION_NAME` | Τhe name of the connection to be created. |
| `SIGN_IN_ENDPONT_URL` | SAML single login URL for the connection to be created. |
| `SIGN_OUT_ENDPOINT_URL` | SAML single logout URL for the connection to be created. |
| `BASE64_SIGNING_CERT` | X.509 signing certificate (encoded in PEM or CER) you retrieved from the IdP.|

Or, in JSON:

```json
{
	"strategy": "samlp",
  	"name": "CONNECTION_NAME",
  	"options": {
    	"signInEndpoint": "SIGN_IN_ENDPOINT_URL",
    	"signOutEndpoint": "SIGN_OUT_ENDPOINT_URL",
    	"signatureAlgorithm": "rsa-sha256",
    	"digestAlgorithm": "sha256",
    	"fieldsMap": {
     		...
    	},
    	"signingCert": "BASE64_SIGNING_CERT"
  	}
}
```

#### Create a connection using SAML metadata

Rather than specifying each SAML configuration field, you can specify a SAML metadata document that contains the configuration values. When specifying a SAML metadata document, you may provide either the XML content of the document (`metadataXml`) or the URL of the document (`metadataUrl`). When providing the URL, content is downloaded only once; the connection will not automatically reconfigure if the content of the URL changes in the future.

##### Provide metadata document content

Use the `metadataXml` option to provide content of the document:

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/connections",
  	"headers": [
   	 	{ "name": "Content-Type", "value": "application/json" },
    	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    	{ "name": "Cache-Control", "value": "no-cache" }
  	],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"strategy\": \"samlp\", \"name\": \"CONNECTION_NAME\", \"options\": { \"metadataXml\": \"<EntityDescriptor entityID='urn:saml-idp' xmlns='urn:oasis:names:tc:SAML:2.0:metadata'>...</EntityDescriptor>\" } }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

##### Provide a metadata document URL

Use the `metadataUrl` option to provide the URL of the document:

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/connections",
	"headers": [
		{ "name": "Content-Type", "value": "application/json" },
      	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
      	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"strategy\": \"samlp\", \"name\": \"CONNECTION_NAME\", \"options\": { \"metadataUrl\": \"https://saml-idp/samlp/metadata/uarlU13n63e0feZNJxOCNZ1To3a9H7jX\" } }"
	}
}
```

When providing the URL, content is downloaded only once; the connection will not automatically reconfigure if the content of the URL changes in the future.

##### Refresh existing connection information with metadata URL

::: note
This process will only work if the connection was created with `metadataUrl` manually. 
:::

If you have a B2B implementation and federate to Auth0 with your own SAML identity provider, you may need to refresh connection information stored in Auth0, such as signing certificate changes, endpoint URL changes, or new assertion fields. Auth0 does this automatically for ADFS connections, but not for SAML connections. 

You can create a batch process (cron job) to do a periodic refresh. The process can run every few weeks and perform a PATCH call to `/api/v2/connections/CONNECTION_ID` endpoint, passing a body containing `{options: {metadataUrl: '$URL'}}` where `$URL` is the same metadata URL with which you created the connection. You use the metadata URL to create a new temporary connection, then compare the properties of the old and new connections. If anything is different, update the new connection and then delete the temporary connection.

1. Create SAML connection with `options.metadataUrl`. The connection object will be populated with information from the metadata.

2. Update metadata content in the URL.

3. Send a PATCH to the `/api/v2/connections/CONNECTION_ID` endpoint with `{options: {metadataUrl: '$URL'}}`. Now the connection object is updated with the new metadata content.

## Specify a custom Entity ID

To specify a custom Entity ID, use the Management API to override the default `urn:auth0:YOUR_TENANT:YOUR_CONNECTION_NAME.` Set the `connection.options.entityID` property when the connection is first created or by updating an existing connection. 

The JSON example below can be used to create a new SAML connection using the SAML IdP’s metadata URL while also specifying a custom Entity ID. The Entity ID is still unique since it is created using the name of the connection.

```json
{
  "strategy": "samlp", 
  "name": "CONNECTION_NAME", 
  "options": { 
    "metadataUrl": "https://saml-idp/samlp/metadata/uarlU13n63e0feZNJxOCNZ1To3a9H7jX",
    "entityId": "urn:your-custom-sp-name:YOUR_CONNECTION_NAME"
  }
}
```

## Enable the enterprise connection for your Auth0 application

To use your new SAML enterprise connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Set up mappings

::: warning
If you're configuring a SAML enterprise connection for a non-standard PingFederate Server, you **must** update the attribute mappings.
:::

Select the **Mappings** view, enter mappings between the `{}`, and select **Save**.

![Configure SAML Mappings](/media/articles/dashboard/connections/enterprise/dashboard-connections-enterprise-edit_view-mappings_saml.png)

**Mappings for non-standard PingFederate Servers:**

```json
{
    "user_id": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
}
```

**Mappings for SSO Circle**

```json
{
  "email": "EmailAddress",
  "given_name": "FirstName",
  "family_name": "LastName"
}
```

**Map either of two claims to one user attribute**

```json
{
  "given_name": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  ]
}
````

**How to map name identifier to a user attribute**

```json
{
  "user_id": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  ]
}
```

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).
