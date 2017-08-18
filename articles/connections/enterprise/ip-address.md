---
title: Using IP Address Authentication with Auth0
connection: IP Address Authentication
image: /media/connections/open-id.png
alias:
  - ip-based-auth
  - ip
  - address-authentication
seo_alias: ip-address
description: How to use IP Address Authentication with Auth0.
crews: crew-2
---
# Configure IP Address Authentication

In this type of connection Auth0 will check that the request is coming from an IP address that is within the range specified in the configuration. 

To configure this connection, navigate to [Dashboard > Connections](${manage_url}/#/connections/enterprise) and select the __IP Address Authentication__.

Click __Create New Connection__ and fill in the required information.

![IP Address Configuration](/media/articles/connections/enterprise/ip-address/ip.png)

- __Connection Name__: a descriptive name for the connection
- __IP Range__: comma-seperated list of IP Addresses, as specified in the [CIDR-notation](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) (for example, `62.1.62.25, 172.25.1.244`)
- __Default username__: (optional) set this to assign a generic username to anyone connecting from this range of IP addresses

Click __Save__. You will then see a list of your registered [clients](${manage_url}/#/clients) and be able to enable the connection for any of them, using a toggle.

That's it! You are now ready to test and start using your connection.
