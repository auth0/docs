---
title: Using IP Address Authentication with Auth0
connection: IP Address Authentication
image: /media/connections/open-id.png
public: false
alias:
  - ip-based-auth
  - ip
  - address-authentication
seo_alias: ip-address
description: How to use IP Address Authentication with Auth0.
---

In this type of connection Auth0 will simply check that the request is coming from an IP address that is within the range specified in the configuration. An optional `username` can be assigned to a given range.

![](/media/articles/connections/enterprise/ip-address/ip.png)

Notice that ranges are specified in the [CIDR-notation](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing). Multiple ranges can be added by separating them with a comma.
