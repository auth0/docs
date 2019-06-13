---
description: This page answers several common questions regarding the PSaaS Appliance infrastructure.
section: appliance
topics:
    - appliance
    - infrastructure
contentType: reference
useCase: appliance
applianceId: appliance33
sitemap: false
---

# PSaaS Appliance Infrastructure Requirements: Frequently Asked Questions

#### Are there any functional differences between the Auth0 Cloud and the Auth0 PSaaS Appliance?
If you have been developing applications with Auth0 in the cloud environment, please review the [differences between the two environments](/deployment).  Please speak to your Auth0 pre-sales engineer or customer success engineer if you’re unsure as to how this may impact your project.

#### Can I configure an HTTP proxy for outbound Internet access in the PSaaS Appliance?
While proxies are currently unsupported, please speak to your Auth0 Customer Success Engineer if your needs require the user of a transparent proxy or NAT.

#### Can I have SSH access to the machines?
No, the PSaaS Appliance is a managed service that runs within your network. You are responsible for managing the infrastructure around the PSaaS Appliance. Auth0 will manage the PSaaS Appliance internals.

#### Can I install a monitoring agent in the PSaaS Appliance?
No, the PSaaS Appliance is a managed service that runs within your network. You are responsible for managing the infrastructure around the PSaaS Appliance. Auth0 will manage the PSaaS Appliance internals. The PSaaS Appliance [exposes monitoring information](/appliance/monitoring) in the Dashboard for common metrics (CPU/memory/and so on) or through the API, which can be used by your operations team and monitoring tools to determine how the PSaaS Appliance is performing.

[Testall](/appliance/monitoring/testall) is an unauthenticated endpoint that can be used by load balancers. There are also additional authenticated endpoints that provide detailed information.

#### Can I install anti-virus software on the PSaaS Appliance?
While this is currently not supported, preinstalled anti-virus software may be included in future updates.

#### Will Auth0 provide me with a CSR file for my SSL Certificate?
No. The details of generating certificates, such as a CSR, vary among public certificate providers. Please work with your public certificate authority for these requirements.

If Auth0 hosts the PSaaS Appliance, Auth0 will provide the required `*.auth0.com` SSL certificates.

#### Why do both the DEV (non-prod) node and PROD cluster require unique certificates signed by a public Certificate Authority?
Webtasks and web extensions require this due to Node.js security requirements.

#### Can I whitelist specific IP addresses on my firewall to the Internet sites the PSaaS Appliance requires outbound access to?

For Auth0 PSaaS Appliance updates, we can provide you with specific addresses that are required.

For certain protocols, [Internet connectivity is required during operation](/appliance/infrastructure/internet-restricted-deployment) (such as social connections or emails).

Your server also needs to be able to access **cdn.auth0.com** if you run web extensions. The browsers used by your admins will also need to access the CDN if they navigate to the Management Dashboard.

#### Can I use Lock with my PSaaS Appliance implementation?

Yes, you can use Lock with your PSaaS Appliance implementation.

However, if you choose to operate your applications connected to the [PSaaS Appliance in an Internet-restricted environment](/appliance/infrastructure/internet-restricted-deployment), you will need to copy the library files to your network (you won't be able to access the CDN that hosts Lock).

If you choose this option, you are responsible for ensuring that your copy of the Lock source code stays up-to-date.

#### How is the Auth0 software installed? 

The PSaaS Appliance is a managed service that is deployed as [virtual machines](/appliance/infrastructure/virtual-machines) and runs on your network, so there is no traditional software installation involved.

Deployment of each PSaaS Appliance node is a manual process that must be performed by Auth0 Managed Service Engineers.

#### Can the PSaaS Appliance deployment be automated through Chef scripts?

Deployment of each PSaaS Appliance node is a manual process that must be performed by Auth0 Managed Service Engineers. 

While the images could be deployed via automation, configuration of the Appliance requires the services of an Auth0 Managed Service Engineer.

#### Can we deploy the PSaaS Appliance using Docker?

No, the Auth0 services cannot be deployed using Docker containers.

#### Does the PSaaS Appliance environment autoscale (that is, does it automatically spin up new nodes or remove nodes as load and demand requires)?

While the PSaaS Appliance can scale out its service layer, it is not currently designed to automatically scale up (or down) from the number of initial nodes deployed. 

Auth0 will work with you during the Sales/Onboarding process to ensure you are deploying the appropriate PSaaS Appliance architecture for your use case.

Our Professional Services team offers [Performance and Scalability](https://auth0.com/docs/services/performance-scalability) engagements to performance test and subsequently tune the PSaaS Appliance to your specific requirements.

#### How does Auth0 access customer-hosted PSaaS Appliance VMs?

Auth0 requires [remote access](/appliance/remote-access-options) to your PSaaS Appliance instances to configure, perform updates, perform maintenance, or troubleshoot. The remote access options are:

1. Jumphost + Firewall Whitelist
2. Two Jumphosts

We do not support other methods, such as VDI or Screen Sharing mechanisms.

#### We occasionally tear-down and rebuild environments, and we maintain our data by backing it up first. Is this a problem?

The Auth0 Appliance is not designed to be torn down and rebuilt easily, and such actions always requires Auth0 involvement. We therefore ask that you not tear down the environment on purpose.

To assist in the rebuilding of the environment, we would need to have an active Professional Services engagement in place with you, unless there has been a disaster situation.

#### What are the legal terms of the Private SaaS Appliance?

You can read the PSaaS Appliance terms [here](https://auth0.com/legal/baseline/PSaaS).

#### Does the PSaaS Appliance require internet access?

Please refer to [our documentation on the internet-related requirements](/appliance/infrastructure/internet-restricted-deployment) for the PSaaS Appliance.
