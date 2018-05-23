---
title: Connecting WS-Federation Providers with Auth0
connection: WS-Federation
image: /media/connections/wsfed.png
public: true
seo_alias: ws-fed
description: Connecting WS-Federation Providers with Auth0
tags:
    - connections
    - enterprise
    - ws-fed
---

# Connecting WS-Federation Providers with Auth0

To create a connection for a WS-Federation Identity Provider (such as Azure ACS/AD or IdentityServer) use the [ADFS connection](/connections/enterprise/adfs) type when creating your new connection.

To configure this connection, navigate to [Dashboard > Connections > Enterprise](${manage_url}/#/connections/enterprise) and select the __ADFS__.

![Enterprise Connections](/media/articles/connections/enterprise/ws-fed/connections-enterprise.png)

Click __Create New Connection__ and enter the following information:

* __Connection Name__ - A descriptive name for the connection
* __Email Domains__ - (Optional) A comma-separated list of valid domains. Only needed if you want to use the [Lock login widget](/libraries/lock).

Next, you must either provide the URL for your WS-Federation server in the __ADFS URL__ field or upload a Federation Metadata file.

![New Connection](/media/articles/connections/enterprise/ws-fed/new.png)

::: note
If you configure the connection with a WS-Federation server URL, Auth0 will retrieve the Federation Metadata endpoint and import the required parameters, certificates, and URLs.
:::

Click __Save__.

Next you will see a list of your registered [applications](${manage_url}/#/applications) with the option to enable the new connection for any of them.

That's it! You are now ready to test and start using your connection.
