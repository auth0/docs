---
section: appliance
---

# How to Back Up Appliance Instances Using the CLI

You may use Appliance CLI to perform a backup on a specific node.

## Prior to Beginning the Backup

Please ensure that your workstation has been [configured to perform operations](/appliance/cli/configure-cli) on your Appliance instances;

> Do not perform backups on Appliance instances that are **not** running update **build 6868** or later. Backups are only allowed on nodes added to the `backup` role. Please see [Adding a Node to the Backup Role](/appliance/cli/adding-node-to-backup-role) for additional information.

Please be aware that, throughout this document, the following sample values are used:

* IP address of the node to be backed up: `192.168.1.186`. Generically, the node may also be referred to as `<target node>`.
* Password used for encryption: `Passw0rd`.

## Generating a New Backup

To initiate a backup, run the following command in your local command-line interface:

`a0cli -t <target node> backup <password>`

For example, if you were to run the above command using the provided sample values, you would run:

`a0cli -t 192.168.1.186 backup Passw0rd`

If the command successfully begins the backup process, you will see the message, "Backup in progress."

The backup will be encrypted using the `aes-256-crt` algorithm.

> Only one backup may performed and stored at any given time. Prior to generating a new backup of a node, the existing backup must be deleted.

## Retrieving a Backup

Prior to downloading a backup, we recommend checking to ensure that one is available.

### Checking the Status of the Backup

You can check on the status of a backup by running the following command in your local command-line instance:

`a0cli -t <target node> backup-status`

If a backup is available, you will see a message similar to the following:

```text
{
    "message": "Backup found",
    "arguments": {
        "name": "file-name.tar.gz"
        "md5": "<md5sum>"
    }
}
```

### Retrieving an Existing Backup

To retrieve an existing backup, you will use the "backup-retrieve" message in your local command-line instance:

`a0cli -t <target node> backup-retrieve`

This will download the backup inside of a file called `backup-retrieve.tar.gz.enc`.

> Auth0 recommends checking the md5sum of the retrieved file against that received as part of the back-up status message. Please remember that the files are encrypted using the `aes-256-crt` algorithm.

### Deleting a Backup

To delete an existing backup, you will use the "backup-delete" message in your local command-line instance:

`a0cli -t <target node> backup-delete`

## Restoring a Backup

Please work contact Auth0 to work with a Customer Success Engineer to restore a backup.
