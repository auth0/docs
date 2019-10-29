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

## Steps

To connect your application to a SAML Identity Provider, you must:

1. [Get the signing certificate from the IdP](#get-the-signing-certificate-from-the-idp) and [convert it to Base64](#convert-signing-certificate-to-base64).
2. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0).
3. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
4. [Set up mappings](#set-up-mappings) (unnecessary for most cases).
5. [Test the connection](#test-the-connection).

## Get the signing certificate from the IdP

With SAML Login, Auth0 acts as the service provider, so you will need to retrieve an X.509 signing certificate from the SAML IdP (in PEM or CER format); later, you will upload this to Auth0. The methods for retrieving this certificate vary, so please see your IdP's documentation if you need additional assistance.

### Convert signing certificate to Base64

Before you upload the X.509 signing certificate to Auth0, you must convert the file to Base64. To do this, either use a [simple online tool](https://www.base64decode.org/) or run the following command in Bash: `cat signing-cert.crt | base64`.

## Create an enterprise connection in Auth0

Next, you will need to create and configure a SAML Enterprise Connection in Auth0 and upload your X.509 signing certificate. This task can be performed using either Auth0's Dashboard or Management API.

### Create an enterprise connection using the Dashboard

1. Navigate to the [Connections > Enterprise](${manage_url}/#/connections/enterprise) page in the [Auth0 Dashboard](${manage_url}/), and click the `+` next to **SAML**.

![Create Connection Type](/media/articles/dashboard/connections/enterprise/conn-enterprise-list.png)

2. Enter general information for your connection:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **Display name** (optional) | Text used to customize the login button for Universal Login. When set, the Universal Login login button reads: "Continue with {Display name}". |
| **Logo URL** (optional) | URL of image used to customize the login button for Universal Login. When set, the Universal Login login button displays the image as a 20px by 20px square. |
| **IdP Domains** (optional) | Comma-separated list of valid domains. Only needed if using the <dfn data-key="lock">Lock</dfn> login widget. |
| **Sign In URL** | SAML single login URL. |

![Configure General SAML Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-saml-settings-1.png)

3. Enter signing information for your connection:

| Field | Description |
| ----- | ----------- |
| **X.509 Signing Certificate** | Signing certificate (encoded in PEM or CER) you retrieved from the IdP earlier in this process. |
| **Sign Out URL** (optional) | SAML single logout URL. |
| **User ID Attribute** (optional) | Attribute in the SAML token that will be mapped to the `user_id` property in Auth0. |
| **Debug Mode** | When enabled, more verbose logging will be performed during the authentication process. |
| **Sign Request** | When enabled, the SAML authentication request will be signed. (Be sure to download and provide the accompanying certificate so the SAML IdP can validate the assertions' signature.) |
| **Sign Request Algorithm** | Algorithm Auth0 will use to sign the SAML assertions. |
| **Sign Request Digest Algorithm** | Algorithm Auth0 will use for the sign request digest. |
| **Protocol Binding** | HTTP binding supported by the IdP. |

![Configure Signing SAML Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-saml-settings-2.png)

4. Enter advanced settings for your connection, and click **Create**:

| Field | Description |
| ----- | ----------- |
| **Request Template** (optional) | Template that formats the SAML request. |
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

![Configure Advanced SAML Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-saml-settings-3.png)

5. If you have appropriate administrative permissions to complete the integration, click **Continue** to learn about the custom parameters needed to configure your IdP. Otherwise, provide the given URL to your administrator so that they can adjust the required settings.

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

## Enable the enterprise connection for your Auth0 application

To use your new SAML enterprise connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Set up mappings

::: warning
If you're configuring a SAML enterprise connection for a non-standard PingFederate Server, you **must** update the attribute mappings.
:::

1. If necessary, click on the **Mappings** tab, enter mappings between the `{}`, and click **Save**.

![Configure SAML Mappings](/media/articles/dashboard/connections/enterprise/conn-enterprise-saml-mappings.png)

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

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).
