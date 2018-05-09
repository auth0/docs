## Whitelist IP Addresses

If you are using any of the following features, you will need to whitelist the appropriate Auth0 IP addresses to ensure proper functionality:

* [Custom Database Connections](/connections/database/custom-db)
* [Hooks](/hooks)
* [Rules](/rules)

Please refer to the Dashboard for the **region-specific** set of IP addresses you should whitelist. The specific set of IP addresses is provided when you create your new [Custom Database Connection](${manage_url}/#/connections/database), [Hook](${manage_url}/#/hooks), or [Rule](${manage_url}/#/rules/create).

### Outbound Calls

When making outbound calls, the IP addresses are static. Auth0 translates internal IP addresses to one of the displayed options when reaching out using NAT.

### Inbound Calls

IP addresses related to inbound calls to Auth0 may be variable due to the lack of fixed IP addresses on the load balancers.