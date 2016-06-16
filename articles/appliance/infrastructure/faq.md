# Auth0 Appliance Infrastructure Requirements: Frequently Asked Questions

### Are there any functional differences between the Auth0 Cloud and the Auth0 Appliance?
If you have been developing applications with Auth0 in the cloud environment, please review the [differences between the two environments](deployment).  Please speak to your Auth0 pre-sales engineer or customer success engineer if you’re unsure as to how this may impact your project.

### Can I configure an HTTP proxy for outbound Internet access in the Appliance?
While this is currently not supported, please speak with Auth0 if you would like to use a transparent proxy or NAT.

### Can I have SSH access to the machines?
No, the Appliance is a managed service that runs within your network. You are responsible for managing the infrastructure around the appliance. Auth0 will manage the Appliance’s internals.

### Can I install a monitoring agent in the Appliance?
No, the Appliance is a managed service that runs within your network. You are responsible for managing the infrastructure around the appliance. Auth0 will manage the Appliance’s internals. The Appliance [exposes monitoring information](/appliance/monitoring) in the Dashboard for common metrics (CPU/memory/etc) or through the API, which can be used by your operations team and monitoring tools to determine how the Appliance is performing. The Appliance also includes a New Relic agent for monitoring purposes.

[Testall](/appliance/monitoring/testall) is an unauthenticated endpoint that can be used by load balancers. There are also additional authenticated endpoints that provide detailed information.

### Can I install anti-virus software on the Appliance?
While this is currently not supported, preinstalled anti-virus software may be included in future updates.

### Will Auth0 provide me with a CSR file for my SSL Certificate?
If Auth0 hosts the Appliance, Auth0 will provide the required certificate(s).

### Can I whitelist specific IP addresses on my firewall to the Internet sites the Appliance requires outbound access to?
For Auth0 Appliance updates, we can provide you with specific addresses that are required. For certain protocols, Internet connectivity is required during operation (such as social connections or emails).
