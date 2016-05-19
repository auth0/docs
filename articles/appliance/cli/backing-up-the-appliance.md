# How to Back Up Appliance Instances Using the CLI

You may use Appliance CLI to perform a MongoDB backup on a specific node.

## Prior to Beginning

Please ensure that:
1. Your workstation has been [configured to perform operations](/configure-cli) on your Appliance instances;
2. You have run [mongodump](https://docs.mongodb.com/manual/reference/program/mongodump/) on the specified node to compress it;
3. The node you are backing up has sufficient disk space (the space available should be at least twice as large as the amount of Auth0 data present).

Please be aware that, throughout this document, the following sample values are used:

* IP address of the node to be backed up: `192.168.1.186`;
* Password used for encryption: `Passw0rd`;
* The replicaset connection string: `a0/a0-1:27017,a0-2:27017,a0-3:27017`.

## Generating a New Backup

To initial a backup, run the following command in your local command-line interface:

`a0cli -t {IP-ADDRESS-OF-NODE} backup {PASSWORD}`

For example, if you were to run the above command using the provided sample values, you would run:

`a0cli -t 192.168.1.186 backup Passw0rd`

If the command successfully begins the backup process, you will see the message, "Backup in progress."

The backup will be encrypted using the `aes-256-crt` algorithm.

> Only one backup may performed at any given time. Prior to generating a new backup, the existing backup must be deleted.

### Checking the Status of the Backup

Prior to downloading a backup, we recommend checking to ensure that it is available.
