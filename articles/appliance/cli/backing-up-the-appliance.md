---
section: appliance
description: How to back up the Appliance using its CLI
---

# How to Back Up Appliance Instances Using the CLI

You may use Appliance CLI to perform a Mongo backup on a specific node.

Beginning with version `11638`, the backup doesn't include sensitive configuration information such as encryption keys.

## Prior to Beginning the Backup

Please ensure that:
* You have configured the [Command Line Interface](/appliance/cli/configure-cli) on your Appliance instances;
* The node has disk space equal to or greater than twice the amount of Auth0 data present.

::: panel Backup Role
Beginning with Appliance version `6868`, you may only back up nodes [added to the `backup` role](/appliance/cli/adding-node-to-backup-role).
:::

Please be aware that we use the following sample values throughout this document:

* IP address of the node on the replica set to be backed up: `192.168.1.186`. Generically, the node may also be referred to as `<target node>`.
* Password used for encryption: `Passw0rd`.
* The replica set connection string: `a0/a0-1:27017,a0-2:27017,a0-3:27017`

## Generate a New Backup

To initiate a backup, run the following command in your local command-line interface:

`a0cli -t <target node> backup <password>`

For example, if you were to run the above command using the provided sample values, you would run:

`a0cli -t 192.168.1.186 backup --password Passw0rd`

If the command successfully begins the backup process, you will see the message, "Backup in progress."

![](/media/articles/appliance/cli/backup-in-progress.png)

The backup will be encrypted using the `aes-256-crt` algorithm.

::: panel Existing Backups
Only one backup may performed and stored at any given time. Prior to generating a new backup of a node, you must [delete the existing backup](#deleting-the-backup).
:::

## Back Up Sensitive Configuration Info

Beginning with Appliance version `11638`, the `backup` command does **not** save sensitive configuration information such as encryption keys. You need to manually back up these keys (and any other sensitive information) if you want to fully recover an Appliance installation using a backup copy.

To do this, you can use the `backup-sensitive` command, which works the same way as `backup`. You must run the command on a node where you previously ran `set-as-backup`.

The full instructions (along with the commands you'll need to run) are as follows:

1. Request a backup: `a0cli -t node_IP_address backup-sensitive --password 0therPassw0rd`
2. Check the status of a backup: `a0cli -t node_IP_address backup-sensitive-status`
3. Retrieve backup of sensitive information: `a0cli -t node_IP_address backup-sensitive-retrieve`
4. Delete the sensitive backup from the node: `a0cli -t node_IP_address backup-sensitive-delete`

## Check the Status of the Backup

You can check on the status of a backup (or whether a backup exists) by running the following command in your local command-line instance:

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

![](/media/articles/appliance/cli/backup-available.png)

### Retrieve an Existing Backup

Before retrieving a backup, we recommend [checking to see if there is one](#checking-the-status-of-the-backup) first.

To retrieve an existing backup, you will use the "backup-retrieve" message in your local command-line instance:

`a0cli -t <target node> backup-retrieve`

This will download the backup inside of a file called `backup-retrieve.tar.gz.enc`.

Auth0 recommends checking the md5sum of the retrieved file against that received as part of the back-up status message.

```text
md5 backup.tar.gz.enc
```

Please remember that the files are encrypted using the `aes-256-crt` algorithm.

## Delete a Backup

To delete an existing backup, you will use the "backup-delete" message in your local command-line instance:

`a0cli -t <target node> backup-delete`

## Restore a Backup

::: panel-warning Sensitive Configuration Information
Beginning with Appliance version `11638`, you will need to restore your backup **and** the backup of your sensitive configuration information.
:::

To restore the Appliance using a backup:

### Step 1: Decrypt the Backup

Because you created the backup using `aes-256-ctr` encryption, you need to decrypt it before you can use it to restore your Appliance. You can use the run the `decrypt` script to decrypt the `backup.tar.gz.enc` file:

`node decrypt Passw0rd backup.tar.gz.enc backup.tar.gz`

The `decrypt` script:

```js
'use strict';
const fs     = require('fs');
const crypto = require('crypto');

const ALGO = 'aes-256-ctr';

const password = process.argv[2]
const input = process.argv[3];
const output = process.argv[4];

const decrypt = crypto.createDecipher(ALGO, password);
const out = fs.createWriteStream(output);

fs.createReadStream(input)
  .pipe(decrypt)
  .pipe(out);
```

### Step 2: Copy the Backup to the Node You Want to Restore

Use the following command to copy your backup to the node you're restoring:

`scp backup.tar.gz username@IP_ADDRESS:`

Then, log into the node and untar the backup file inside a new folder:

```text
ssh username@IP_ADDRESS
mkdir backup
tar xf backup.tar.gz backup
```

### Step 3: Restore the Backup Using `mongorestore`

::: panel mongorestore
For more information on the restore process, see MongoDB's [docs](https://docs.mongodb.org/manual/reference/program/mongorestore/).
:::

Begin the restoration by running the following:

`mongorestore --db DATABASE_NAME --username USERNAME --host REPLICA_SET/ -p`

The CLI then prompts you for the database password, as well as restore the backup on the specified replica set.
