---
title: Connecting SAML Providers with Auth0
connection: SAMLP
image: /media/connections/saml.png
alias:
  - saml
seo_alias: samlp
description: Connecting SAML Providers with Auth0
tags:
    - connections
    - enterprise
    - saml
	- saml-p
---

# Create a SAMLP Identity Provider Connection

Auth0 allows you to create SAMLP Identity Provider connections using either the Management [Dashboard](${manage_url}/#/connections/enterprise) or [API](/api/management/v2#!/Connections/post_connections).

## Obtain IdP Signing Certificates

When you're setting up a SAMLP Connection, Auth0 acts as the service provider. As such, you will need to retrieve and provide to Auth0 an X509 signing certificate from the SAML IDP in PEM or CER format. The methods for retrieving this certificate vary, so please see your identity provider for additonal assistance if necessary.

### Convert the Signing Certificate to Base64

Prior to uploading the X509 signing certificate to Auth0, you'll need to convert the file to Base64. You can use a simple online tool like [this one](https://www.base64decode.org/), or you can run the following in Bash: `cat signing-cert.crt | base64`

## Create a Connection Using the Management Dashboard

Log into the [Management Dashboard](${manage_url}), and navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise).

![](/media/articles/connections/enterprise/samlp/enterprise-connection.png)

Scroll down to the row for *SAMLP Identity Provider* and click **Add New** (which is represented by the plus symbol). You'll see the *Settings* page for your new Connection.

![](/media/articles/connections/enterprise/samlp/create-new-connection.png)

Provide the following information for your new Connection:

* **Connection Name**: The logical identifier for your Connection
* **Email Domains** (optional): A comma-separated list of domains for [use with Lock](/libraries/lock)
* **Sign In URL**: The SAML single login URL
* **X509 Signing Certificate**: The signing certificate (encoded in PEM or CER) provided by the identity provider
* **Sign Out URL** (optional): The SAML single logout URL
* **User ID Attribute** (optional): The attribute in the SAML token that maps to the Auth0 `user_id` property
* **Debug Mode**: Toggle this to enable/disable verbose logging during the authentication process
* **Sign Request**: Toggle this to enable/disable signing of the authentication request (be sure to download and provide the accompanying certificate so the identity provider can validate the assertion's signature)
* **Sign Request Algorithm**: The algorithm you want Auth0 to use to sign the SAML assertions
* **Sign Request Digest Algorithm**: The algorithm you want to use for the sign request digest
* **Protocol Binding**: The HTTP binding supported by the identity provider
* **Request Template** (optional): The template that formats the SAML request

Click **Save** to persist your changes.

You will then see a pop-up window with the next steps you need to take.

![](/media/articles/connections/enterprise/samlp/admin-url.png)

If you do not have the appropriate administrative permissions to complete the integration, you will see a URL to provide to someone who does. If you do, click **Continue** to see the instructions on how to configure the identity provider you want to use with this integration. You will also be provided the custom parameters needed to integrate your Auth0 tenant with the identity provider.

![](/media/articles/connections/enterprise/samlp/config-instructions.png)

## Create a Connection Using the Management API

Instead of using the [Management Dashboard](${manage_url}), you can use the [Management API](/api/management/v2#!) to create your SAMLP Connection. You'll need to make the appropriate `POST` call to the [`post_connections` endpoint](/api/management/v2#!/Connections/post_connections).

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

Here's how you might include the call within your application's code:

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
		"text": "{ \"strategy\": \"samlp\", \"name\": \"CONNECTION_NAME\", \"options\": { \"signInEndpoint\": \"SIGN_IN_ENDPOINT_URL\", \"signOutEndpoint\": \"SIGN_OUT_ENDPOINT_URL\", \"signatureAlgorithm\": \"rsa-sha256\", \"digestAlgorithm\": \"sha256\", \"fieldsMap\": {}, \"signingCert\": \"BASE64_SIGNING_CERT\" } }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Enable the Connection for Your Auth0 Application

To use your newly-created Connection, you'll need to enable it for your Auth0 Application(s).

1. Go to the [Applications](${manage_url}/#/applications) page of the Management Dashboard.
2. Select the Application for which you want to enable the Connection.
3. Click the **Connections** icon for your Application.
4. Scroll down to the *Enterprise* section of the Connections page, and your Connection. Click the slider to enable the Connection. If successful, the slide turns green.
