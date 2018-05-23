---
title: Using LDAP Authentication with Auth0
connection: LDAP
image: /media/connections/ldap.png
seo_alias: ldap
description: Using LDAP Authentication with Auth0.
tags:
    - connections
    - enterprise
    - ldap
---

# Configure LDAP Authentication

Auth0 lets you create [Lightweight Directory Access Protocol (LDAP)](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) connections using the [Auth0 Dashboard](${manage_url}/#/connections/enterprise) and the [Active Directory/LDAP Connector](/connector).

## Create a New Connection

Start by creating a new connection. Navigate to [Dashboard > Connections > Enterprise](${manage_url}/#/connections/enterprise) and select **Active Directory / LDAP**.

Click __Create New Connection__ and complete the form.

Field | Description
------|------------
Connection Name | Descriptive name for the connection
Email domains (optional) | List of valid domains for the connection
Disable cache | Enable or disable caching
Use application SSL certificate authentication | Enable or disable application SSL certificate authentication
Use Windows Integrated Auth (Kerberos) | Enable or disable Kerberos authentication

![Active Directory / LDAP Connection Configuration](/media/articles/connections/enterprise/ldap/settings.png)

Click __SAVE__ to continue.

## Set Up the Active Directory/LDAP Connector

After creating the connection, you'll be prompted to set up the [Active Directory/LDAP Connector](/connector).

![Set Up AD/LDAP Connector](/media/articles/connections/enterprise/ldap/setup-connector.png)

Make note of the provided **Ticket URL** to use during the AD/LDAP Connector setup process, it should look something like this:

```text
https://${account.tenant}.auth0.com/p/ad/aBCdEfGh
```

Next, set up the AD/LDAP Connector by following the instructions for your platform:

- [Install the AD/LDAP Connector on Windows](/connector/install)
- [Install the AD/LDAP Connector on Non-Microsoft Platforms](/connector/install-other-platforms)

## Test the Connection

Once you've set up the AD/LDAP Connector, you can test your LDAP connection.

Navigate to [Dashboard > Connections > Enterprise](${manage_url}/#/connections/enterprise), select **Active Directory / LDAP**, and click the **Try** button for your LDAP connection. You'll be directed to a login page where you can log in as a user and try the connection.

That's it! You are now ready to start using your connection.
