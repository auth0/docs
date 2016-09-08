# Appliance: Disaster Recovery

You have several options to choose from when preparing for the possibility of Appliance downtime.

## Simplified Diaster Recovery

This section outlines how you can implement a simplified disaster recovery solution.

> This solution does not require the assistance of an Auth0 Customer Success Engineer.

The overall approach is as follows:

1. Ensure that you have a snapshot of your virtual machine.
2. Restore your virtual machine using your snapshot.
3. Use the [Appliance Command Line Interface (CLI)](/appliance/cli) to [reconfigure the IP addresses](/appliance/cli/reconfiguring-ip) of the virtual machines.

If you are interested in automating any part of your disaster recovery workflow, please consult the following subsections for more specific information.

### Amazon Web Services

### Microsoft Azure
Microsoft Azure offers a [Site Recovery](https://azure.microsoft.com/en-us/services/site-recovery/) solution that automates the protection and disaster recovery of your virtual machines.

In addition to being useful for Azure-hosted solutions, you can use Site Recovery for virtual machines hosted elsewhere, including on your own physical servers.


### VMware
VMware offers a solution called the [Site Recovery Manager (SRM)](http://www.vmware.com/products/site-recovery-manager.html), which automates the execution of a disaster recovery plan, including: failover, orchestration workflows, and the recovery of network and security settings.

## Geographic High-Availability Appliance Implementations

If your requirements demand little to no downtime, we recommend a [Geographic High-Availability Appliance](/appliance/geo-ha) implementation.
