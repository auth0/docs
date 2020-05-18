---
section: private-cloud
description: Operations - Upgrades
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Private Cloud Upgrades

Your upgrade will be scheduled in one of the following ways:
* **Upgrade schedule**: The Auth0 Private Cloud Service Delivery Team will create a ticket within the Auth0 Support Center and confirm the planned upgrade timing.
* **Support ticket**: You will create a ticket within the Auth0 Support Center and the Private Cloud Service Delivery Team will work with you to coordinate the upgrade at a suitable time.

## Before upgrades 

Before an update can be scheduled Auth0 requires the following information:
* Environment to be updated
* Version updating to
* Date and time of the update (including timezone)
* If a conference call is required 

## During upgrades

The Auth0 support engineer will be responsible for providing updates to you including: 
* Informing you when the upgrade has started
* Staying in contact with you should there be an issue
* Informing you when the upgrade is complete and requesting you to perform a smoke test to ensure functionality of the environment is working as intended

## After upgrades

Upon confirmation of the smoke test completing successfully, the Auth0 managed service engineer will confirm that the upgrade is complete. 

## Customer-hosted on-premise environment considerations

Before your upgrade, you will need to provide remote access to the Auth0 managed service engineer and confirm that you have completed your backup. 

During your upgrade, ensure that you have a contact available to assist the Auth0 managed service engineer with any questions or issues. 

After your upgrade, you will be reponsible for smoke testing the upgraded environment and confirming success. 

## Recovery scenarios

In the unlikely event a customer-hosted on-premise three-node cluster is lost and needs to be restored from existing image based backup, the Auth0 management support engineer will help you coordinate the following tasks:

* Provide SSH access to the recovered instances 
* Create a working virtualization environment to host and start the image based backups
* Provide the target network configuration including: 
    * IP Addresses for each instance
    * Subnet Mask
    * Gateway address
    * DNS
* Provide access to the VMWare console for network reconfiguration using TTY1
* Restore the image based backup in the target virtualization host
* Provide the network information 
* Reconfigure the IP addresses on each node as per instructions
* Forward traffic to the three new nodes

## Keep reading

* [Private Cloud Releases](/private-cloud/operations-releases)
* [Private Cloud Testing](/private-cloud/operations-testing)
* [Open and Manage Support Tickets](/support/tickets)
* [Managed Private Cloud Remote Access Options](/private-cloud/onboarding/managed-private-cloud/remote-access-options)