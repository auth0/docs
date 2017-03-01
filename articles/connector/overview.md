---
description: An overview of what the AD/LDAP Connector is and why it's necessary.
---

# Overview

Auth0 [integrates with Active Directory/LDAP](/connections/enterprise/active-directory) through an **AD/LDAP Connector** installed on your network.

The **AD/LDAP Connector** acts as a bridge between your **Active Directory** service and the **Auth0**. This is necessary, since AD typically runs and is accessible to your internal network, while Auth0 is a cloud service (and therefore running in a different context from your AD service).

![](/media/articles/connector/ad-data-flow.png)

The Connector supports authentication based on the following:

* [LDAP](/protocols/ldap);
* [Kerberos](/connector/kerberos);
* [Client Certificates](/connector/client-certificates).

## Notes

* All connections from the Connector to the Auth0 Server are outbound only, so you do not need to make any changes to your firewall.
* By default, an AD/LDAP Connection caches user profiles and credentials to ensure optimal uptime and performance (Auth0 stores a *hash* of the user's password). You can disable credential caching at the [connections](/identityproviders) level.
* For [high availability and load balancing](/connector/high-availability), you can install multiple instances of the AD/LDAP Connector.
