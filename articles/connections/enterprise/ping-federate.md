---
title: Connect Your PingFederate Server to Auth0
connection: PingFederate
image: /media/connections/pingfederate.png
public: true
alias:
  - pingfederate
seo_alias: ping-federate
description: Create a connection between a PingFederate Server and Auth0.
tags:
    - connections
    - enterprise
    - pingfederate
---

# Connect Your PingFederate Server to Auth0

Auth0 lets you create [PingFederate Server](https://documentation.pingidentity.com/pingfederate/pf84/#gettingStartedGuide/concept/gettingStarted.html) connections using the [Auth0 Dashboard](${manage_url}/#/connections/enterprise).

## Create a New Connection

Navigate to [Dashboard > Connections > Enterprise](${manage_url}/#/connections/enterprise) and select **PingFederate**.

Click __Create New Connection__ and complete the form.

Field | Description
------|------------
Connection Name | A descriptive name for the connection.
Email Domains (Optional) |  A comma-separated list of valid domains. Only needed if you want to use the [Lock login widget](/libraries/lock).
PingFederate Server URL | The URL for your PingFederate Server.
X509 Signing Certificate | The PingFederate Server public key encoded in PEM or CER format. See the [PingFederate documentation](https://documentation.pingidentity.com/pingfederate/pf84/index.shtml#concept_digitalSignatureSettings.html) for instructions on managing your server's certificates.
Sign Request | Enable or disable signing of the SAML authentication request.  If enabled, you'll need to provide the PingFederate server with your [tenant's certificate](https://${account.namespace}/pem).
Sign Request Algorithm | The algorithm Auth0 will use to sign the SAML assertions. Ensure this matches your PingFederate Server's configuration.
Sign Request Algorithm Digest | The algorithm Auth0 will use for the sign request digest. Ensure this matches your PingFederate Server's configuration.

![PingFederate Connection Configuration](/media/articles/connections/enterprise/ping-federate/settings.png)

Click __SAVE__ to continue.

## Test the Connection

Once you've configured your PingFederate connection settings, you can test the connection.

Navigate to [Dashboard > Connections > Enterprise](${manage_url}/#/connections/enterprise), select **PingFederate**, and click the **Try** button for your PingFederate connection. You'll be directed to a login page where you can log in as a user and try the connection.

That's it! You are now ready to start using your connection.
