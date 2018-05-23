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
tags:
    - connections
    - enterprise
    - ip-addresses
---
# Configure IP Address Authentication

For this type of connection, Auth0 checks if the request is coming from an IP Address within the specified range. 

To configure this connection, navigate to [Dashboard > Connections](${manage_url}/#/connections/enterprise) and select the __IP Address Authentication__.

Click __Create New Connection__ and fill in the required information.

Field | Description
------|------------
Connection Name | Descriptive name for the connection
IP Range | Comma-separated list of IP Addresses, as specified in the [CIDR-notation](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) (for example, `192.168.100.14/24`)
Default Username (Optional) | Default username assigned to anyone connecting from this range of IP addresses

![IP Address Configuration](/media/articles/connections/enterprise/ip-address/ip.png)

Click __Save__.

Next you will see a list of your registered [applications](${manage_url}/#/applications) with the option to enable the connection for any of them.

That's it! You are now ready to test and start using your connection.
