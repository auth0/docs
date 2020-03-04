---
title: Whitelist IP Addresses
description: Identify Auth0 IP addresses to whitelist if you are behind a firewall.
topics:
    - connections
    - custom-database
    - scripts
contentType:
    - reference
    - how-to
useCase:
    - customize-connections
---

# Whitelist IP Addresses

If you are behind a firewall, the following features may require whitelisting of the appropriate Auth0 IP addresses to ensure proper functionality:

* [Custom Database Connections](/connections/database/custom-db)
* [Hooks](/hooks)
* [Rules](/rules)

## Outbound Calls

::: warning
Please note that IP addresses are subject to change. In the event of a change, Auth0 will send notifications several months before any IP address changes take place. The lists provided are up-to-date at the time of writing, but check the [Dashboard](${manage_url}) for the latest list.
:::

When Auth0 makes outbound calls, the IP addresses are static. Auth0 translates internal IP addresses to one of the displayed options when reaching out using NAT. 

Please be sure to **allow** inbound connections from the region-specific set of IP addresses listed in the [Dashboard](${manage_url}). The specific set of IP addresses you should use is provided when you create your new [Custom Database Connection](${manage_url}/#/connections/database), [Hook](${manage_url}/#/hooks), or [Rule](${manage_url}/#/rules/create).

The IP addresses are region-specific.

### United States

```text
35.167.74.121, 35.166.202.113, 35.160.3.103, 54.183.64.135, 54.67.77.38, 54.67.15.170, 54.183.204.205, 35.171.156.124, 18.233.90.226, 3.211.189.167
```

### Europe

```text
52.28.56.226, 52.28.45.240, 52.16.224.164, 52.16.193.66, 34.253.4.94, 52.50.106.250, 52.211.56.181, 52.213.38.246, 52.213.74.69, 52.213.216.142, 35.156.51.163, 35.157.221.52, 52.28.184.187, 52.28.212.16, 52.29.176.99, 52.57.230.214, 54.76.184.103, 52.210.122.50, 52.208.95.174
```

### Australia

```text
52.64.84.177, 52.64.111.197, 54.153.131.0, 13.210.52.131, 13.55.232.24, 13.54.254.182, 52.62.91.160, 52.63.36.78, 52.64.120.184, 54.66.205.24, 54.79.46.4
```

## Inbound Calls

IP addresses related to inbound calls to Auth0 may be variable due to the lack of fixed IP addresses on the load balancers. In this case firewall rules should operate on the name of the service (e.g. `<YOUR_TENANT>.auth0.com`).
