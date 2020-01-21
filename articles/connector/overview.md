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

Auth0 [integrates with Active Directory/LDAP](/connections/enterprise/active-directory-ldap) through an **AD/LDAP Connector** installed on your network.

The **AD/LDAP Connector** acts as a bridge between your **Active Directory (AD)** service and Auth0, which is required because AD typically runs and is accessible in your internal network while Auth0 is a cloud service (and therefore runs in a different context than your AD service).

::: panel-warning AD/LDAP Connector and Your Customer's Servers
The AD/LDAP Connector is designed for scenarios where your company controls the AD/LDAP server. The connector should **not** be installed on your customer's servers.

For B2B scenarios where you want to allow your customer's users to access your applications using their enterprise credentials, connect to your customer's federation service (e.g., their own Auth0 service, ADFS, or any <dfn data-key="security-assertion-markup-language">SAML</dfn> identity provider) using one of the available enterprise connections.

If you install an AD/LDAP connector on your customer's servers and it is connected directly to your Auth0 domain, you will have to handle the passwords of your customer's users directly. Auth0 strongly recommends against these types of deployments and does not support them.
:::

![](/media/articles/connector/ad-data-flow.png)

1. When a user authenticates with Auth0, they are redirected to the AD/LDAP Connector.
2. The AD/LDAP Connector validates the user against against your Active Directory (AD) service.
3. The AD/LDAP Connector sends the results of the validation back to Auth0.

The Connector supports authentication based on the following:

* [LDAP](/protocols/ldap)
* [Kerberos](/connector/kerberos)
* [Client Certificates](/connector/client-certificates)

## Cache

By default, an AD/LDAP Connection caches user profiles and credentials (note: Auth0 stores a *hash* of the user's password) to ensure optimal uptime and performance, and updates the data each time a user logs in. The cache is only used when the connector is down or unreachable. 

The cached data is always stored unless you [disable caching credentials](/dashboard/guides/connections/disable-cache-ad-ldap). 

::: warning
Values in the cache are case-sensitive, which means that login attempts will only succeed if users provide the exact username that was cached.
:::

## Notes

* All connections from the Connector to the Auth0 Server are outbound only, so you do not need to make any changes to your firewall.
* For [high availability and load balancing](/connector/high-availability), you can install multiple instances of the AD/LDAP Connector.
