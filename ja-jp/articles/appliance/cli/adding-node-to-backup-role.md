---
section: appliance
description: How to add an PSaaS Appliance node in the backup node
topics:
    - appliance
    - backups
    - cli
    - nodes
contentType: how-to
useCase: appliance
applianceId: appliance11
sitemap: false
---

# PSaaS Appliance: Adding a Node to the Backup Role

## Prerequisites

* Backup can be configured on single or multiple-node setups. In multi-node setups, the backup must be placed on a non-primary device.
* **A separate, dedicated backup device** with sufficient space to store the backups on the node that you are assigning to the `backup` role.

## Adding a Node to the Backup Role

To add a node to the `backup` role, execute the `set-as-backup` command using the PSaaS Appliance's Command-Line Interface. When issuing this command, you will need to specify the device on the target node to be used to store backups.

`$a0cli -t <node_ip> set-as-backup <backup_device> [force]`

::: note
  If you have already created a backup folder on the node, the command will fail unless you set the `force` argument to `true`.
:::

## Additional Reading

* [Configuring and Using the PSaaS Appliance Command Line Interface](/appliance/cli/configure-cli)
* [How to Back Up the PSaaS Appliance Using the CLI](/appliance/cli/backing-up-the-appliance)
