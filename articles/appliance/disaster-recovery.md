---
description: High-level overview of disaster recovery options for the Appliance
---

# Appliance: Disaster Recovery

When preparing for the possibility of issues with your Appliance instances, your options depend on your tolerance for downtime. Below, you will find a discussion of the advantages and disadvantages associated with the various disaster recovery (DR) options available.

Additionally, there is a difference between Appliance availability and data availability/recovery. For example, the standard three-node cluster deployment has high availability and can survive a single-node failing. However, in cases of a data center failure or a logical data corruption, you would need a disaster recovery solution to help recover from that.

In cases where the data centers have very low latency, you can run individual Appliance instances using three different data centers. For example, if you are using AWS, you can run each of your nodes in a different availability zone (though this may incur a higher service cost).

## Geographic High-Availability Appliance Implementation

If your requirements demand very little to no downtime, we recommend a [Geographic High-Availability Appliance](/appliance/geo-ha) implementation. This is the only implementation that has automatic failover with recovery on the order of 1 minute.

**Advantages**:

Geo-HA is an Appliance implementation that provides:
* Data center redundancy;
* Automatic failure handling;
* The highest form of Appliance availability offered by Auth0.

**Disadvantages**:

Geo-HA involves:
* A higher cost due to increased complexity;
* Additional Appliance Virtual Machines (VM) that need maintenance;
* An additional layer in from of the load balancer for GEO failover, such as F5 Global Traffic Manager or AWS Route 53);
* Additional configuration to handle logical corruption, since this is not a scenario that is covered by the typical setup.

For more information, please see:
* [Geo HA](/appliance/geo-ha)
* [Disaster Recovery](/appliance/geo-ha/disaster-recovery)

## VM Snapshots
If you have some tolerance for downtime (either in terms of minutes or hours), you can consider using the Virtual Machine (VM) snapshot approach. A VM snapshot contains everything you need to rebuild an Appliance. You would be responsible for regularly taking VM snapshots and either storing them either offsite or replicating them to other regions in the cloud.

**Advantages**:
* Recovery via VM snapshots is faster than using database backups (though the process is slower than GEO-HA).
* You may not need manual intervention from an Auth0 Customer Success Engineer (CSE) to restore your cluster.

**Disadvantages**:
* VM snapshots can become very large in size (snapshots are not compressed, and you would need a snapshot of each VM/drive), which makes storage tricky.
* The backup and recovery process requires manual intervention.

### Basic Steps for Recovering with VM Snapshots

The following outlines the basic steps required for restoring your Appliance instances using VM snapshots:

1. Ensure that you have a snapshot of your VM(s) and that it is stored at a secondary site. In the event of a disaster, your primary site may not be accessible.
2. Restore your VM(s) using your snapshots at your secondary site.
Use the [Appliance Command Line Interface (CLI)](/appliance/cli) to [reconfigure the IP addresses](/appliance/cli/reconfiguring-ip) of the VM(s).

::: panel-info VMWare's Site Recovery Manager
If you are hosting your Appliance instances using VMware, you may also implement a similar backup/recovery scenario using VMWare's  Site Recovery Manager (SRM). SRM provides an automated mechanism to move your snapshots to a secondary site, where they can be retrieved if you ever need your data restored. If you choose this option, Auth0 will help you set up and test your implementation. SRM will change the IP address(es) for your instance(s), and you can

We have tested that it will change the IP for the box and you can [run re-ip](/appliance/cli/reconfiguring-ip) as long as you have prepared the [Appliance Command Line Interface (CLI)](/appliance/cli) ahead of time and uploaded the certificate.
:::

## Database Backups

Restoring your Appliance with database backups requires you to provision new Virtual Machines (VMs). You will then need assistance from an Auth0 Customer Success Engineer (CSE) to configure the Appliance and bring it back online with your restored data.

Database backups are not the same as a snapshot of the whole VM. They are compressed backups created by the [Appliance Command Line Interface (CLI)](/appliance/cli). You can then download them from the Appliance and store them at a secondary site for recovery in the event you need to implement a recovery scenario.

If you choose to use database backups as your DR strategy, please note that this process may take up to **24 hours**.

**Advantages**:
* Database backups are smaller and easier to move offsite than VM snapshots.

**Disadvantage**:
* You will need manual intervention from an Auth0 CSE to restore your Appliance.
* Recovering with a database backup requires the greatest amount of time.

For more information, please see:
* [Backing Up Appliance Instances](/appliance/admin/backing-up-the-appliance-instances)
* [Using the CLI to Backup Appliance Instances](/appliance/cli/backing-up-the-appliance)
* [Adding an Appliance Node to the Backup Role](/appliance/cli/adding-node-to-backup-role)

**Note**: This option is available to Appliances on version **7247** or later.

## Combining VM Snapshots and Database Backups

A middle ground between using VM snapshots and database backups is to take weekly VM snapshots, while scheduling nightly database backups.

The recovery process still requires the assistance of an Auth0 CSE, but because the VMs can be automatically restored, only the database needs manual intervention/assistance. This eliminates some of the downtime resulting from using just database backups.
