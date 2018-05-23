---
title: AD/LDAP Connector Overview
description: An overview of what the AD/LDAP Connector is and why it's necessary.
tags:
  - connector
---

# AD/LDAP Connector Overview

Auth0 [integrates with Active Directory/LDAP](/connections/enterprise/active-directory) through an **AD/LDAP Connector** installed on your network.

The **AD/LDAP Connector** acts as a bridge between your **Active Directory** service and the **Auth0**. This is necessary, since AD typically runs and is accessible to your internal network, while Auth0 is a cloud service (and therefore running in a different context from your AD service).

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

## Notes

* All connections from the Connector to the Auth0 Server are outbound only, so you do not need to make any changes to your firewall.
* For [high availability and load balancing](/connector/high-availability), you can install multiple instances of the AD/LDAP Connector.
