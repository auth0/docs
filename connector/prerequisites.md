# Prerequisites

## Internet Connectivity

The connector must be installed on a server with outbound connectivity to at the very least `https://@@account.namespace@@` on port **443**.

The connector can be installed and configured behind a __proxy server__ but we don't recommend this.

> You can enable a proxy through the environment variable `HTTP_PROXY`.

No inbound rules are required unless **Kerberos** or **Certificate authentication** is enabled. In these cases, the server(s) where the connector is installed on must be reachable from your users browsers. If more than one instance of the connector is installed, you should use a load balancer to direct traffic to one connector and the other.

It is very important to have the server clock automatically synchronized with an NTP server. Otherwise the connector will fail to start and report __clock skew error__.

## Connectivity to LDAP

The connector must be installed on a server with access to the LDAP server on port **389 for ldap** or **636 for ldaps**.

## Hardware requirements

-  **Architecture**: x86 or x86-64
-  **CPU cores**: min. 1, recommended 2
-  **Storage**: 500MB of free space on disk
-  **Operating System**: The connector can run on Windows or Linux
-  **RAM**: min. 2GB

## Windows Version

The connector can run on Windows 7+ or Windows 2008R2+. We recommend Windows 2012.
