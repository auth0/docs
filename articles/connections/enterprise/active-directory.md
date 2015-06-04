---
title: Connecting Active Directory with Auth0
connection: Active Directory
image: /media/connections/windows.png
alias:
  - ad
---


# Connecting Active Directory with Auth0

Auth0 integrates with Active Directory/LDAP through the __Active Directory/LDAP Connector__ that you install in your network.

The __AD/LDAP Connector (1)__, is a bridge between your __Active Directory (2)__  and the __Auth0 Service (3)__. This bridge is necessary because AD is typically locked down to your internal network, and Auth0 is a cloud service running on a completely different context.

<img src="https://docs.google.com/drawings/d/1X30jQAsatQTibLXgxKgDanbCH1RJ9ZAfoDmHV33jdBY/pub?w=630&amp;h=526">

You can install multiple instances of the connector for high availability and load balancing. Also, all connections are out-bound: from the connector to the Auth0 Server, so in general no changes to the firewall need to be applied.

Configuring an AD/LDAP connection in Auth0 requires two simple steps:

###1. Creating an AD/LDAP Connection in Auth0

The first step is creating a new Connection on the dashboard:

__Connections > Enterprise > AD/LDAP__

![](/media/articles/connections/enterprise/active-directory/ldap-create.png)

Name the connection and check whether you want `Kerberos` enabled for this connection. If you enable this, you need to enter the range of IP addresses from where `Kerberos` authentication will be enabled. These would typically be the intranet where `Kerberos` would work.

In addition, the `Email domains` field, whitelists email suffixes that will be recognized before redirecting users to this particular AD/LDAP connection.

![](/media/articles/connections/enterprise/active-directory/ldap-create-2.png)

__Save__ the configuration. You are done on the Auth0 side! You will then be prompted to download the __AD/LDAP Connector__ to your machine.

![](/media/articles/connections/enterprise/active-directory/ldap-create-3.png)

> We ship different versions of the Connector to install it on multiple platforms: Windows and Linux.

Keep the __TICKET URL__ at hand as you will need it later.

[Continue to the instructions to install the connector.](/connector).
