---
description: This page answers several common questions regarding the PSaaS Appliance infrastructure.
section: appliance
---

# PSaaS Appliance Infrastructure Requirements: Frequently Asked Questions

## Are there any functional differences between the Auth0 Cloud and the Auth0 PSaaS Appliance?
If you have been developing applications with Auth0 in the cloud environment, please review the [differences between the two environments](/deployment).  Please speak to your Auth0 pre-sales engineer or customer success engineer if you’re unsure as to how this may impact your project.

## Can I configure an HTTP proxy for outbound Internet access in the PSaaS Appliance?
While proxies are currently unsupported, please speak to your Auth0 Customer Success Engineer if your needs require the user of a transparent proxy or NAT.

## Can I have SSH access to the machines?
No, the PSaaS Appliance is a managed service that runs within your network. You are responsible for managing the infrastructure around the PSaaS Appliance. Auth0 will manage the PSaaS Appliance internals.

## Can I install a monitoring agent in the PSaaS Appliance?
No, the PSaaS Appliance is a managed service that runs within your network. You are responsible for managing the infrastructure around the PSaaS Appliance. Auth0 will manage the PSaaS Appliance internals. The PSaaS Appliance [exposes monitoring information](/appliance/monitoring) in the Dashboard for common metrics (CPU/memory/and so on) or through the API, which can be used by your operations team and monitoring tools to determine how the PSaaS Appliance is performing.

[Testall](/appliance/monitoring/testall) is an unauthenticated endpoint that can be used by load balancers. There are also additional authenticated endpoints that provide detailed information.

## Can I install anti-virus software on the PSaaS Appliance?
While this is currently not supported, preinstalled anti-virus software may be included in future updates.

## Will Auth0 provide me with a CSR file for my SSL Certificate?
If Auth0 hosts the PSaaS Appliance, Auth0 will provide the required certificate(s).

## Why do both the DEV (non-prod) node and PROD cluster require unique certificates signed by a public Certificate Authority?
Webtasks and web extensions require this due to Node.js security requirements.

## Can I whitelist specific IP addresses on my firewall to the Internet sites the PSaaS Appliance requires outbound access to?
For Auth0 PSaaS Appliance updates, we can provide you with specific addresses that are required. For certain protocols, Internet connectivity is required during operation (such as social connections or emails).

## Can I use Lock with my PSaaS Appliance implementation?

Yes, you can use Lock with your PSaaS Appliance implementation. However, if you choose to operate the PSaaS Appliance in an Internet-restricted environment, you will *not* be able to use Lock, since you won't be able to access the CDN that hosts Lock.
