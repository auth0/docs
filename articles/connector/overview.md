---
title: AD/LDAP Connector Overview
description: An overview of what the AD/LDAP Connector is and why it's necessary.
topics:
  - connector
contentType: concept
useCase:
  - add-login
  - customize-connections
  - add-idp
---

# AD/LDAP Connector Overview

Auth0 [integrates with Active Directory/LDAP](/connections/enterprise/active-directory) through an **AD/LDAP Connector** installed on your network.

The **AD/LDAP Connector** acts as a bridge between your **Active Directory** service and the **Auth0**. This is necessary, since AD typically runs and is accessible to your internal network, while Auth0 is a cloud service (and therefore running in a different context from your AD service).

::: panel-warning AD/LDAP Connector and Your Customer's Servers
The AD/LDAP Connector is designed for scenarios where your company controls the AD/LDAP server. The connector should **not** be installed on your customer's servers.

For B2B scenarios where you want to allow your customer's users to access your applications using their enterprise credentials, connect to your customer's federation service (e.g., their own Auth0 service, ADFS, or any SAML identity provider) using one of the available enterprise connections.

Installing an AD/LDAP connector on your customer's servers that is then connected directly to your Auth0 domain results in you handling the passwords of your customer's users directly. Auth0 strongly recommends against these types of deployments and does not support them.
:::

![](/media/articles/connector/ad-data-flow.png)

The Connector supports authentication based on the following:

* [LDAP](/protocols/ldap)
* [Kerberos](/connector/kerberos)
* [Application Certificates](/connector/application-certificates)

## Cache

By default, an AD/LDAP Connection caches user profiles and credentials to ensure optimal uptime and performance (note that Auth0 stores a *hash* of the user's password). This data is updated each time a user logs in. The cache itself is only used when connector is down or unreachable. The cached data is always stored unless caching credentials is disabled.

To disable credential caching at the [connection](/identityproviders) level:
1. Go to [Dashboard > Enterprise Connections](${manage_url}/#/connections/enterprise)
2. Click on the **Settings** icon for the **Active Directory / LDAP** connection
3. Toggle **Disable Cache**

::: warning
Values in the cache are case sensitive, which means that login attempts will only succeed if end users provide the exact username that was cached.
:::

## Notes

* All connections from the Connector to the Auth0 Server are outbound only, so you do not need to make any changes to your firewall.
* For [high availability and load balancing](/connector/high-availability), you can install multiple instances of the AD/LDAP Connector.
