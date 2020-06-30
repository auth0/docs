### Firewalls

If custom code executing in Auth0 (such as in a Rule, Hook, or Custom DB scripts) will call a service inside your network, or if you configure an on-premise SMTP provider in Auth0, then you may need to configure your firewall to allow [inbound traffic from Auth0](/guides/ip-whitelist#inbound-calls). The IP addresses to allow through the firewall are specific to each region and are listed on the Rules, Hooks, Custom DB scripts, and email provider configuration screens in your Auth0 dashboard (as described in [Whitelist IP Addresses](/guides/ip-whitelist)).
