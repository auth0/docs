---
description: High-level overview of disaster recovery options for the PSaaS Appliance
section: appliance
topics:
    - appliance
    - disaster-recovery
contentType: concept
useCase: appliance
applianceId: appliance56
sitemap: false
---

# PSaaS Appliance: Disaster Recovery

When preparing for the possibility of issues with your PSaaS Appliance instances, your options depend on your tolerance for downtime. Below, you will find information on the advantages and disadvantages associated with the various disaster recovery (DR) options available.

Additionally, there is a difference between PSaaS Appliance availability and data availability/recovery. For example, the standard three-node cluster deployment has high availability and can survive a single-node failing. However, in cases of a data center failure or a logical data corruption, you would need a disaster recovery solution to help recover from that.

In cases where the data centers have very low latency, you can run individual PSaaS Appliance instances using three different data centers. For example, if you are using AWS, you can run each of your nodes in a different availability zone (though this may incur a higher service cost).

## Geographic High-Availability PSaaS Appliance Implementation

If your requirements demand regional resilience with little downtime, we recommend a [Geographic High-Availability PSaaS Appliance](/appliance/geo-ha) implementation. This is the only implementation that has automatic failover between data centers.

Issue detection and failover typically occur at the database level in 30 seconds or less. However, switching over and rerouting traffic from one data center to another is an expensive operation, so we've configured the infrastructure to detect false positives and *not* switch over if one occurs. This secondary detection process reroutes client traffic through failure detection time-out mechanisms that result in an *effective* failover time of approximately ten minutes.

**Advantages**:

Geo-HA is a PSaaS Appliance implementation that provides:
* Data center redundancy;
* Automatic failure handling;
* The highest form of PSaaS Appliance availability offered by Auth0.

**Disadvantages**:

Geo-HA involves:
* A higher cost due to increased complexity;
* Additional PSaaS Appliance Virtual Machines (VM) that need maintenance;
* An additional layer in front of the load balancer for GEO failover, such as F5 Global Traffic Manager or AWS Route 53;
* Additional configuration to handle logical corruption.

For more information, please see:
* [Geo HA](/appliance/geo-ha)
* [Disaster Recovery](/appliance/geo-ha/disaster-recovery)

## VM Snapshots
If you have some tolerance for downtime (either in terms of minutes or hours), you can consider using the Virtual Machine (VM) snapshot approach. A VM snapshot contains everything needed to rebuild a PSaaS Appliance. You would be responsible for regularly taking VM snapshots and either storing them either offsite or replicating them to other regions in the cloud.

**Advantages**:
* Recovery via VM snapshots is quicker than using database backups (though the process is slower than GEO-HA).

**Disadvantages**:
* You will need manual intervention from an Auth0 Managed Services Engineer (MSE) to restore your cluster.
* VM snapshots can become very large (snapshots are not compressed, and you would need a snapshot of each VM/drive), which makes storage tricky.
* The backup and recovery process requires manual intervention.

### Basic Steps for Recovering with VM Snapshots

The following outlines the basic steps required for restoring PSaaS Appliance instances using VM snapshots:

1. Ensure that you have a snapshot of your VM(s) and that it is stored at a secondary site. In the event of a disaster, your primary site may not be accessible.
2. Restore your VM(s) using your snapshots at your secondary site.
3. Contact a Managed Services Engineer via support ticket to complete the recovery of your environment

::: panel VMWare's Site Recovery Manager
Site Recovery Manager is not supported on current versions of Auth0 PSaaS Appliance. If you rely on this VMWare feature, please contact your Technical Account Manager for guidance.
:::

## Database Backups

Restoring your PSaaS Appliance with database backups requires you to provision new Virtual Machines (VMs). You will then need assistance from an Auth0 Customer Success Engineer (CSE) to configure the PSaaS Appliance and bring it back online with your restored data.

Database backups are not the same as a snapshot of the whole VM. They are compressed backups created by the [PSaaS Appliance Command Line Interface (CLI)](/appliance/cli). You can then download them from the PSaaS Appliance and store them at a secondary site for recovery in the event you need to implement a recovery scenario.

If you choose to use database backups as your DR strategy, please note that this process may take up to **24 hours**.

**Advantages**:
* Database backups are smaller and easier to move offsite than VM snapshots.

**Disadvantage**:
* You will need manual intervention from an Auth0 MSE to restore your PSaaS Appliance.
* Recovering with a database backup requires the greatest amount of time.

For more information, please see:
* [Backing Up PSaaS Appliance Instances](/appliance/admin/backing-up-the-appliance-instances)
* [Using the CLI to Backup PSaaS Appliance Instances](/appliance/cli/backing-up-the-appliance)
* [Adding an PSaaS Appliance Node to the Backup Role](/appliance/cli/adding-node-to-backup-role)

## Combining VM Snapshots and Database Backups

A middle ground between using VM snapshots and database backups is to take weekly VM snapshots while scheduling nightly database backups.

The recovery process still requires the assistance of an Auth0 CSE, but because the VMs can be automatically restored, only the database needs manual intervention/assistance. This eliminates some of the downtime resulting from using just database backups.
