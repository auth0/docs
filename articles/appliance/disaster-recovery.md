# Appliance: Disaster Recovery

You have several options to choose from when preparing for the possibility of Appliance downtime.

## Simplified Diaster Recovery

This section outlines how you can implement a simplified disaster recovery solution.

> This solution does not require the assistance of an Auth0 Customer Success Engineer.

The overall approach is as follows:

1. Ensure that you have a snapshot of your virtual machine.
2. Restore your virtual machine using your snapshot.
3. Use the [Appliance Command Line Interface (CLI)](/appliance/cli) to [reconfigure the IP addresses](/appliance/cli/reconfiguring-ip) of the virtual machines.

## Geographic High-Availability Appliance Implementations

If your requirements demand little to no downtime, we recommend a [Geographic High-Availability Appliance](/appliance/geo-ha) implementation.
