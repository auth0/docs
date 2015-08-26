# Prerequisites

## Connectivity to Auth0

The connector must be installed on a server with outbound connectivity to the Auth0 service at:  `https://@@account.namespace@@` on port **443**.

The connector can be installed and configured behind a __proxy server__ but we don't recommend this.

> You can enable a proxy through the environment variable `HTTP_PROXY`.

## One Connector per Auth0 Account
If you establish multiple Auth0 accounts, perhaps to isolate development and production environments, you will need to set up one AD/LDAP connector per Auth0 account that will use AD/LDAP connections.  Multiple AD/LDAP connectors can point to the same AD or LDAP directory (or different instances, if appropriate), but there must be one AD/LDAP connector per Auth0 account.

## Special cases requiring connectivity from browsers 

You do not need inbound connectivity enabled to the AD/LDAP connector unless **Kerberos** or **Certificate authentication** is enabled. In these cases, the server(s) on which the connector is installed must be reachable from your users' browsers on port 443. If more than one instance of the connector is installed, you should use a load balancer to direct traffic to one connector or the other.

## Connectivity to LDAP

The AD/LDAP Connector must be installed on a server with access to the LDAP server on port **389 for ldap** or **636 for ldaps**.


## Time sync requirement

It is very important to have the AD/LDAP Connector server clock automatically synchronized with an NTP server. Otherwise the connector will fail to start and report __clock skew error__.

## Hardware requirements

-  **Architecture**: x86 or x86-64
-  **CPU cores**: min. 1, recommended 2
-  **Storage**: 500MB of free space on disk
-  **Operating System**: The connector can run on Windows or Linux.  Windows is required if Kerberos authentication will be used.
-  **RAM**: min. 2GB

## Windows Version

We recommend use of Windows Server 2012.
The connector can run on Windows 7+ or Windows 2008R2+ 
