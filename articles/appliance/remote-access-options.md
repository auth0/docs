---
title: PSaaS Appliance Remote Access Options
description: Remote Access Options Available for those with PSaaS Appliance
topics:
    - appliance
    - remote-access
contentType: reference
useCase: appliance
applianceId: appliance63
sitemap: false
---
# PSaaS Appliance Remote Access Options

The Auth0 Private SaaS (Software as a Service) Appliance, or PSaaS Appliance, is an Auth0 deployment that exists in a dedicated area of Auth0's cloud, a cloud under your control, or your own data center. This article covers the remote options available to you if you opt for the PSaaS Appliance.

## Customer Choices

When the PSaaS Appliance is hosted in your cloud environment or datacenter, it requires regular access by our managed service engineering team to keep it up to date, fix problems, and optimize security and performance. There is a trade-off between maintaining strict isolation behind the customer’s firewall and the service level that we can offer. The options presented below offer the best balance between a high degree of isolation and support. Note that all options provide end-to-end SSH encryption of PSaaS Appliance management traffic and allow the customer to disable Auth0 access if needed.

::: panel Jumphost
A Jumphost is a security-hardened virtual machine with the ability to act as a secure communication relay through SSH to the Auth0 PSaaS Appliance VMs. Jumphost initiates the connection from a whitelisted IP address provided by Auth0. You would open/close access to Jumphost on demand in situations where we require access, such as maintenance or support events. These connections originate from a VPN-secured network using public key access to your Jumphost, so that only authorized Auth0 managed service engineers can access your environment from a secure connection within Auth0.
:::

### Option 1: Jumphost + Firewall Whitelist

In this configuration, an external Auth0-managed Jumphost is permitted sole SSH management access to the PSaaS Appliance.

![](/media/articles/appliance/remote-access/jumpshot-fw.png)

*Pros*: 

* Jumphost provides a single point of access and auditing
* Audit, session recording, VPN access to Jumphost, and Identity Management done by Auth0
* Access could be disabled via Firewall rules or Security Groups.

### Option 2: Two Jumphosts

Similar to option 1, this configuration permits an external Auth0 Jumphost to connect via firewall whitelist to an internal, customer-managed Jumphost. This second Jumphost then provides actual access to the PSaaS Appliance nodes.

![](/media/articles/appliance/remote-access/jumpshot-fw-csjs.png)

*Pros*: 

* Jumphost provides a single point of access and auditing
* Audit, session recording, VPN access to Jumphost, and Identity Management is done by Auth0
* Disabling Auth0 access is as simple as shutting down a server
* Could be installed in DMZ if needed

*Cons*: 

* Additional virtual Jumphost required in customer infrastructure


### Unsupported Configurations

We do not support other methods, such as VDI or Screen Sharing mechanisms. They introduce compliance concerns, including (but not limited to) Auth0’s inability to internally audit connections and SSH sessions, enforce identity management on Auth0 employee accounts, exposure to untrusted systems on customer’s end running non-standard software (from where the connections are generated to Auth0 VMs), and inability to verify the identity of participants on the other end.
