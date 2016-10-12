---
title: Connect Active Directory with Auth0
connection: Active Directory
image: /media/connections/ms.png
alias:
  - ad
seo_alias: active-directory
description: How to connect to Active Directory with Auth0.
---


# Connect Active Directory with Auth0

Auth0 integrates with Active Directory/LDAP through the **Active Directory/LDAP Connector** that you install on your network.

The **AD/LDAP Connector** (1), is a bridge between your **Active Directory** (2)  and the **Auth0 Service** (3). This bridge is necessary because AD is typically restricted to your internal network, and Auth0 is a cloud service running in a completely different context.

![](/media/articles/connections/enterprise/active-directory/ldap-connect.png)

For [high availability and load balancing](/connector/high-availability), you can install multiple instances of the connector. All connections are out-bound from the connector to the Auth0 Server, so changes to your firewall are generally unnecessary.

Configuring an AD/LDAP connection in Auth0 requires two steps:

1. Create an AD/LDAP Connection in Auth0 and download the installer.
2. Install the connector on your network.

### Create an AD/LDAP Connection in Auth0

Select **Connections > Enterprise > AD/LDAP** from the Auth0 dashboard menu. Click the **+ CREATE NEW CONNECTION** button and name the connection.

![](/media/articles/connections/enterprise/active-directory/ldap-create.png)

In the *Email domains* field, list the user email domains that will be allowed to login to this particular AD/LDAP connection.

If you want to use **Kerberos** with this connection, enter a range of IP addresses where **Kerberos** authentication will be enabled from. Typically, these would be intranet addresses.

If you would like to disable caching, enable the appropriate slider.

![](/media/articles/connections/enterprise/active-directory/ldap-create-2.png)

Click **Save**. You are done on the Auth0 side. Click the button on the next page to download the **AD/LDAP Connector** installer to your machine.

![](/media/articles/connections/enterprise/active-directory/ldap-create-3.png)

**Note:** We ship different versions of the connector to install on Windows or Linux platforms.

Keep the **TICKET URL** on hand as you will need it later.

### Install the connector on your network

Continue to the instructions on how to [Install the Connector](/connector).
