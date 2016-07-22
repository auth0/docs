# Overview

Auth0 integrates with Active Directory/LDAP through the __Active Directory/LDAP Connector__ that you install in your network.

The __AD/LDAP Connector (1)__, is a bridge between your __Active Directory (2)__  and the __Auth0 Service (3)__. This bridge is necessary because AD is typically locked down to your internal network, and Auth0 is a cloud service running on a completely different context.

<img src="https://docs.google.com/drawings/d/1X30jQAsatQTibLXgxKgDanbCH1RJ9ZAfoDmHV33jdBY/pub?w=630&amp;h=526">

You can install multiple instances of the Connector for high availability and load balancing. Also, all connections are out-bound: from the Connector to the Auth0 Server, so in general no changes to the firewall need to be applied.

The Connector supports __LDAP__, [__Kerberos__](/connector/kerberos) and [__Client Certificates__](/connector/client-certificates) based authentication.
