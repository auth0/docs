---
section: appliance
description: How to add an Appliance node in the backup node
---

# Appliance: Adding a Node to the Backup Role

> This document applies beginning with Appliance update **build 7247**.

## Prerequisites

* A cluster with two or more nodes;
    * At least one node must **not** be assigned a `backup` role.
* **A separate, dedicated backup device** with sufficient space to store the backups on the node that you are assigning to the `backup` role.

## Adding a Node to the Backup Role

To add a node to the `backup` role, execute the `set-as-backup` command using the Auth0 Appliance's Command-Line Interface. When issuing this command, you will need to specify the device on the target node to be used to store backups.

`$a0cli -t <node_ip> set-as-backup <backup_device> [force]`

**Note:** If you have already created a backup folder on the node, the command will fail unless you set the `force` argument to `true`.



## Additional Reading:
* [Configuring and Using the Auth0 Appliance Command Line Interface](/appliance/cli/configure-cli)
* [How to Back Up Appliance Instances Using the CLI](/appliance/cli/backing-up-the-appliance)
