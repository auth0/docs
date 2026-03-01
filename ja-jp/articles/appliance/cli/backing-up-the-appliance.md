---
section: appliance
description: How to back up the PSaaS Appliance using its CLI
toc: true
topics:
    - appliance
    - cli
    - backups
contentType: how-to
useCase: appliance
applianceId: appliance12
sitemap: false
---

# How to Back Up the PSaaS Appliance Using the CLI

You may use the PSaaS Appliance CLI to perform a Mongo backup on a specific node.

Beginning with version `11638`, the backup doesn't include sensitive configuration information such as encryption keys.

## Prior to Beginning the Backup

Please ensure that:
* You have configured the [Command Line Interface](/appliance/cli/configure-cli) on your PSaaS Appliance instances;
* The node has disk space equal to or greater than twice the amount of Auth0 data present.

::: note
Beginning with PSaaS Appliance version `6868`, you may only back up nodes [added to the `backup` role](/appliance/cli/adding-node-to-backup-role).
:::

Please be aware that we use the following sample values throughout this document:

* IP address of the node on the replica set to be backed up: `192.168.1.186`. Generically, the node may also be referred to as `<target node>`.
* Password used for encryption: `Passw0rd`.
* The replica set connection string: `a0/a0-1:27017,a0-2:27017,a0-3:27017`.

## Generate a New Backup

To initiate a backup, run the following command in your local command-line interface:

```bash
a0cli -t <target node> backup <password>
```

For example, if you were to run the above command using the provided sample values, you would run:

```bash
a0cli -t 192.168.1.186 backup --password Passw0rd
```

If the command successfully begins the backup process, you will see the message, "Backup in progress."

![](/media/articles/appliance/cli/backup-in-progress.png)

The backup will be encrypted using the `aes-256-crt` algorithm.

::: note
Only one backup may performed and stored at any given time. Prior to generating a new backup of a node, you must [delete the existing backup](#deleting-the-backup).
:::

## Back up Sensitive Configuration Info

Beginning with PSaaS Appliance version `11638`, the `backup` command does **not** save sensitive configuration information such as encryption keys. You need to manually back up these keys (and any other sensitive information) if you want to fully recover an PSaaS Appliance installation using a backup copy.

To do this, you can use the `backup-sensitive` command, which works the same way as `backup`. You must run the command on a node where you previously ran `set-as-backup`.

The full instructions (along with the commands you'll need to run) are as follows:

1. Request a backup: `a0cli -t node_IP_address backup-sensitive --password 0therPassw0rd`;
2. Check the status of a backup: `a0cli -t node_IP_address backup-sensitive-status`;
3. Retrieve backup of sensitive information: `a0cli -t node_IP_address backup-sensitive-retrieve`;
4. Delete the sensitive backup from the node: `a0cli -t node_IP_address backup-sensitive-delete`.

## Check the Status of the Backup

You can check on the status of a backup (or whether a backup exists) by running the following command in your local command-line instance:

```bash
a0cli -t <target node> backup-status
```

If a backup is available, you will see a message similar to the following:

```json
{
    "message": "Backup found",
    "arguments": {
        "name": "file-name.tar.gz"
        "md5": "<md5sum>"
    }
}
```

![](/media/articles/appliance/cli/backup-available.png)

### Retrieve an Existing Backup

Before retrieving a backup, we recommend [checking to see if there is one](#checking-the-status-of-the-backup) first.

To retrieve an existing backup, you will use the "backup-retrieve" message in your local command-line instance:

```bash
a0cli -t <target node> backup-retrieve
```

This will download the backup inside of a file called `backup-retrieve.tar.gz.enc`.

Auth0 recommends checking the md5sum of the retrieved file against that received as part of the back-up status message.

```bash
md5 backup.tar.gz.enc
```

Please remember that the files are encrypted using the `aes-256-crt` algorithm.

## Delete a Backup

To delete an existing backup, you will use the "backup-delete" message in your local command-line instance:

```bash
a0cli -t <target node> backup-delete
```

## Restore a Backup

To restore a backup, please open up a ticket requesting assistance via the [Auth0 Support Center](https://support.auth0.com/).
