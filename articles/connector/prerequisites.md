---
description: Lists all the prerequisites to installing and configuring the connector.
---

# Prerequisites

Typically the AD/LDAP Connector needs to be installed by a sys admin or an operations engineer vs. a developer, since it often requires access to production resources. Following is a checklist of things they should consider ahead of the actual install:

## Host Servers

The Connector can be installed on an existing server, even a Domain Controller. However, more often it's installed on virtual machines provisioned just for the Connector. Regardless, the host server should have the following hardware and software specifications/configurations:

#### Hardware Requirements

-  **Architecture**: x86 or x86-64
-  **CPU cores**: min. 1, recommended 2
-  **Storage**: 500MB of free space on disk
-  **Operating System**: The connector can run on Windows or Linux.  Windows is required if Kerberos authentication will be used.
-  **RAM**: min. 2GB

#### Windows Version

We recommend use of Windows Server 2012.
The connector can run on Windows 7+ or Windows 2008R2+ 

#### Time Synchronization

It is very important to have the Connector host server clock automatically synchronized with an NTP server. Otherwise the connector will fail to start and report a __clock skew error__.

## Outbound Connectivity

The host server requires outbound network connectivity to the following services:

#### Auth0

The connector must be installed on a server with outbound connectivity to the Auth0 service at:  `https://${account.namespace}` on port **443**.

The connector can be installed and configured behind a __proxy server__ but we don't recommend this.

> You can enable a proxy through the environment or configuration variable `HTTP_PROXY`.

#### LDAP

The Connector must be installed on a server with access to the LDAP server on port **389 for ldap** or **636 for ldaps**. Before installing the Connector you should know the **LDAP Connection String** and the **Base DN** required to connect to your LDAP directory ([more infomation](/connector/install#link-to-ldap)).

## Inbound Connectivity

You do not need inbound connectivity enabled to the Connector unless **Kerberos** or **Client Certificate authentication** is enabled. In these cases, the server(s) on which the connector is installed must be reachable from your users' browsers on port 443. If more than one instance of the connector is installed, you should use a load balancer to direct traffic to one connector or the another.

## Service Account

The Connector will be run using a service account that must be a domain user that at a minimum has read access to the directory. You will need the username/password of this account when performing the install.

## One Connector per Auth0 Account/Connection

If you establish multiple Auth0 accounts, perhaps to isolate development and production environments, you will need to set up an AD/LDAP connection and set up a Connector for each Auth0 account that needs this form of authentication.  A Connector is tied to a specific Connection within an Auth0 account.  It is possible to have multiple Connectors within one Auth0 account.  This is needed if you have multiple AD/LDAP directories against which users will authenticate, for example to support different departments or customers, each with their own directory. In addition, multiple Connectors can point to the same AD or LDAP directory, but a Connector can only be used by one Auth0 Connection within one Auth0 account.

## High Availability

The Connector can be installed on multiple host servers for redundancy (most organizations provision two) in case one server becomes unavailable. Each server will have the same requirements listed above. No load balancer is required as that is performed by the Auth0 server itself, unless you enable __Kerberos__ or __Client Certificate__ based authentication.
