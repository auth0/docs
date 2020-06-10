---
section: private-cloud
description: Remote access options for the Managed Private Cloud
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Remote Access Options for the Managed Private Cloud

Auth0 provides multiple remote access options for Managed Private Cloud customers.

The Managed Private Cloud requires regular access by our Managed Services Engineering team to install patches, updates, and upgrades; troubleshoot and fix issues; and optimize security and performance.

::: panel Jump host
A jump host is a security-hardened virtual machine (VM) that acts as a secure communication relay using SSH. The jump host initiates the connection from Auth0 (using a whitelisted IP address) to the Managed Private Cloud VMs. (You would open access to the jump host to allow Auth0 access when necessary). 

Auth0's connections originate from a VPN-secured network using public key access to your jump host so that only authorized Managed Service Engineers can connect to your environment.
:::

## Option 1: Jumphost + Firewall Whitelist

In this configuration, an external Auth0-managed Jumphost is permitted sole SSH management access to the Managed Private Cloud.

![](/media/articles/private-cloud/one-jumphost.png)

Benefits: 

* Jump host provides a single point of access and auditing
* Auth0 handles tasks related to auditing, session recording, VPN access to jump host, and Identity Management
* Access can be disabled via firewall rules or security groups

## Option 2: Two Jumphosts

Similar to [option 1](#option-1-jumphost--firewall-whitelist), this configuration permits an external Auth0 jump host to connect via firewall whitelist to an internal, customer-managed jump host. This second jump host then provides actual access to the Managed Private Cloud nodes.

![](/media/articles/private-cloud/two-jumphosts.png)

Benefits: 

* Jump host provides a single point of access and auditing
* Auth0 handles tasks related to auditing, session recording, VPN access to jump host, and Identity Management
* Disabling Auth0 access is as simple as shutting down a server
* Can be installed in DMZ (if necessary)

Concerns: 

* Additional virtual jump host required in your infrastructure

## Unsupported configurations

Auth0 does not support other remote access options, such as VDI or Screen Sharing mechanisms. These alternative options introduce compliance concerns, including (but not limited to):

* Inability to internally audit connections and SSH sessions
* Inability to enforce identity management on Auth0 employee accounts
* Potential exposure to untrusted systems running non-standard software (from where the connections are generated to Auth0 VMs)
* Inability to verify the identity of participants on the other end
