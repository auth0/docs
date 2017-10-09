---
title:
description:
---
# Explaining Auth0 Private SaaS Appliance

The Auth0 Private SaaS (Software as a Service) Appliance, or PSaaS Appliance, is an Auth0 deployment that exists in a dedicated area of Auth0's cloud, a cloud under your control, or your own data center.

## What is the Auth0 PSaaS Appliance?

The Auth0 Private SaaS Appliance (PSaaS Appliance) is an option for your organization when compliance or other policy requirements prevent you from using a multi-tenant cloud service. The Auth0 PSaaS Appliance can be deployed in one of three places:

* A dedicated cloud environment hosted by Auth0
* Your cloud environment using Amazon AWS or Microsoft Azure
* Your own datacenter using VMWare or Microsoft Hyper-V (where the PSaaS Appliance is a managed service)

## Value Proposition

Because the PSaaS Appliance runs on dedicated cloud or customer infrastructure, customers can meet unique compliance and regulatory hurdles and customize certain implementation details to address specific use cases and threat profiles. Yet as a PSaaS Appliance, this solution is supported by a dedicated team of Auth0 engineers who provide hardened builds, up-to-date installation, guaranteed SLA, and rapid response times. Customers get the full benefits of private Auth0 security without the burden of managing Auth0 internals.

## Customer Choices

When the PSaaS Appliance is hosted in your cloud environment or datacenter, it requires regular access by our managed service engineering team to keep it up to date, fix problems, and optimize security and performance. There is a trade-off between maintaining strict isolation behind the customer’s firewall and the service level that we can offer. The options presented below offer the best balance between a high degree of isolation and support. Note that all options provide end-to-end SSH encryption of PSaaS Appliance management traffic and allow the customer to disable Auth0 access if needed.

::: panel Jumphost
A Jumphost is a security-hardened virtual machine with the ability to act as a secure communication relay through SSH to the Auth0 PSaaS Appliance VMs. Jumphost initiates the connection from a whitelisted IP address provided by Auth0. You would open/close access to Jumphost on demand in situations where we require access, such as maintenance or support events. These connections originate from a VPN-secured network using public key access to your Jumphost, so that only authorized Auth0 managed service engineers can access your environment from a secure connection within Auth0.
:::

### Option 1: Jumphost + Firewall Whitelist

In this configuration, an external Auth0-managed Jumphost is permitted sole SSH management access to the PSaaS Appliance.

*Pros*: 

* Jumphost provides a single point of access and auditing
* Audit, session recording, VPN access to Jumphost, and Identity Management done by Auth0
* Access could be disabled via Firewall rules or Security Groups.

### Option 2: Two Jumphosts

Similar to option 1, this configuration permits an external Auth0 Jumphost to connect via firewall whitelist to an internal, customer-managed Jumphost. This second Jumphost then provides actual access to the PSaaS Appliance nodes.

*Pros*: 

* Jumphost provides a single point of access and auditing
* Audit, session recording, VPN access to Jumphost, and Identity Management is done by Auth0
* Disabling Auth0 access is as simple as shutting down a server
* Could be installed in DMZ if needed

*Cons*: 

* Additional virtual Jumphost required in customer infrastructure

### Option 3: VPN

This configuration provides VPN access to the customer’s network either to Auth0 engineers individually or a dedicated, Jumphost-like Auth0 server.

*Pros*:

* Customers usually have VPN infrastructure in place
* No additional servers are required
* Auth0 access can be enabled and disabled using existing VPN account procedures

*Cons*: 

* Inability to audit management activity on the command line
* Customer responsible for provisioning VPN accounts for Auth0 engineers and Identity Management
* Customer responsible for securing VPN traffic only to PSaaS appliance
* Customer is responsible for VPN availability (critical to allow access during support events)

### Unsupported Configurations

We do not support other methods, such as VDI or Screen Sharing mechanisms. They introduce compliance concerns, including (but not limited to) Auth0’s inability to internally audit connections and SSH sessions, enforce identity management on Auth0 employee accounts,exposure to untrusted systems on customer’s end running non-standard software (from where the connections are generated to Auth0 VMs), and inability to verify the identity of participants on the other end.