---
title: Connect Your PingFederate Server to Auth0
connection: PingFederate
image: /media/connections/pingfederate.png
public: true
alias:
  - pingfederate
seo_alias: ping-federate
description: Learn how to create an enterprise connection between a PingFederate Server and Auth0.
topics:
    - connections
    - enterprise
    - pingfederate
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Your PingFederate Server to Auth0

Auth0 lets you create [PingFederate Server](https://documentation.pingidentity.com/pingfederate/pf84/#gettingStartedGuide/concept/gettingStarted.html) connections. 

## Prerequisites

**Before beginning:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

As long as your server is configured in the standard way, to connect your PingFederate server to Auth0 you must:

1. [Get the signing certificate from the IdP](#get-the-signing-certificate-from-the-idp) and [convert it to Base64](#convert-signing-certificate-to-base64).
2. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0).
3. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
4. [Test the connection](#test-the-connection).

::: warning
If additional setup is required for your server (such as attribute mapping), then you must [create a new <dfn data-key="security-assertion-markup-language">SAML enterprise connection</dfn>](/connections/enterprise/saml) instead.
:::

## Get the signing certificate from the IdP

With PingFederate Server, Auth0 acts as the service provider, so you will need to retrieve an X.509 signing certificate from the IdP (in PEM or CER format); later, you will upload this to Auth0. The methods for retrieving this certificate vary, so please see the [PingFederate documentation](https://documentation.pingidentity.com/pingfederate/pf84/index.shtml#concept_digitalSignatureSettings.html) for instructions on managing your server's certificates.

### Convert signing certificate to Base64

Before you upload the X.509 signing certificate to Auth0, you must convert the file to Base64. To do this, either use a [simple online tool](https://www.base64decode.org/) or run the following command in Bash: `cat signing-cert.crt | base64`.

## Create an enterprise connection in Auth0

Next, if your server is configured in the standard way, you will need to create and configure a PingFederate Enterprise Connection in Auth0 and upload your X.509 signing certificate. This task can be performed using Auth0's Dashboard.

::: warning
If additional setup is required for your server (such as attribute mapping), then you must [create a new <dfn data-key="security-assertion-markup-language">SAML enterprise connection</dfn>](/connections/enterprise/saml) instead.
:::

1. Navigate to [Auth0 Dashboard > Authentication > Enterprise](${manage_url}/#/connections/enterprise), locate **Ping Federate**, and select its `+`.

![Create Connection Type](/media/articles/dashboard/connections/enterprise/conn-enterprise-list.png)

2. Enter details for your connection, and select **Create**:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **PingFederate Server URL** | URL for your PingFederate Server. |
| **X.509 Signing Certificate** | PingFederate Server public key (encoded in PEM or CER) you retrieved from the IdP earlier in this process. |
| **Sign Request** | When enabled, the SAML authentication request will be signed. (Be sure to download and provide the PingFederate server with your [tenant's certificate](https://${account.namespace}/pem).) |
| **Sign Request Algorithm** | Algorithm Auth0 will use to sign the SAML assertions. Ensure this matches your PingFederate Server's configuration. |
| **Sign Request Digest Algorithm** | Algorithm Auth0 will use for the sign request digest. Ensure this matches your PingFederate Server's configuration. |
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

![Configure Ping Federate Settings](/media/articles/connections/dashboard-connections-enterprise-create_ping-federate_default-empty.png)

3. In the **Login Experience** view, configure how users log in with this connection.

<%= include('./_login-experience-tab.md') %>

## Enable the enterprise connection for your Auth0 application

To use your new PingFederate enterprise connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).
