---
section: private-saas
description: How to configure Private SaaS CLI
---

# Configuring and Using the Auth0 Private SaaS Command Line Interface

The Auth0 Private SaaS Command Line Interface (CLI) allows you to perform operations on your Private SaaS via authorized workstations.

## Downloading the CLI Setup Files

To download the files required to set up the CLI, please contact your Auth0 Customer Success Manager for your custom download link.

## Installing and Using the CLI

Once you have downloaded and unzipped the `a0cli-v.1.x.x` file, you will select the version that is appropriate for the operating system you are using. Auth0 provides installers for Windows, Macintosh, and Linux systems, and the installer will guide you through the installation process.

Once this process is complete, you will be able to run the `a0cli` program from your local command-line instance.

```text
Usage: a0cli [options] <command>


 Commands:

   create-key           Creates private/public keys pair on current path.
   show-key             Shows public key on current path.
   delete-key           Deletes keys pair from current path.
   update-commands      Retrieve availables commands from the specified node.

 Options:

   -h, --help           output usage information
   -V, --version        output the version number
   -t, --target <ip>    Host name or IP address of appliance instance.
   -p, --port <number>  Port number of appliance instance. Default port: 10121
```

However, if you have keys defined and you've run `update-commands`, you will see an extended list of commands:

```text
Usage: a0cli [options] <command>


 Commands:

   create-key                     Creates private/public keys pair on current path.
   show-key                       Shows public key on current path.
   delete-key                     Deletes keys pair from current path.
   update-commands                Retrieve availables commands from the specified node.
   backup <password>              Creates a new backup.
   backup-delete                  Deletes the current backup
   backup-retrieve                retrieves the current backup.
   backup-status                  Retrieves the status of the node backup.
   nslookup <host>                Performs an nslookup to a specified <host> from the target node.
   ping                           Sends a PING message to verify if the target node is up.
   re-up <host>                   Updates the host entries for instances in the database cluster. Example a0-1:10.1.0.21, a0-2:10.1.0.22
   set-as-backup [device] [force] Add the backup role to the target node.
   test-port <host> <port>        Verifies if the target ip can listen <port> on <host>.

 Options:

   -h, --help           output usage information
   -V, --version        output the version number
   -t, --target <ip>    Host name or IP address of appliance instance.
   -p, --port <number>  Port number of appliance instance. Default port: 10121
```


> Because the CLI sends commands to the server running on each Private SaaS node, please ensure that the server is both available and can accept inbound and outbound connections to port `10121`.

## Granting Access Rights to Users

Only workstations that you have authorized may perform operations on Private SaaS.

To authorize a new workstation for use with the CLI:

1. Generate a key pair by running, in your local command-line tool, `a0cli create-key`. This outputs a public key, which is now associated with that particular workstation. You will also need to copy for this key to complete the next step.

    ![](/media/articles/private-saas/cli/cli-create-key.png)

2. Navigate to the CLI page of the Private SaaS configuration area, and add the key to your configuration. For additional information on how to do this, please see the [configuration instructions for Private SaaS CLIs](/private-saas/dashboard/cli).

    ![](/media/articles/private-saas/cli/cli-config-with-key.png)

> Please note that any user on the workstation with access to the location where the key is stored locally will have access rights to perform operations on Private SaaS.

## Updating Command Lists

To send commands to the Private SaaS node, you will need to update the command list the node accepts by running the following command:

`a0cli -t <target node> update-commands`

You may test this process by sending a `ping` message:

`a0cli -t <target node> ping`

If the test was successful, you will see the following response:

`{"message": "PONG"}`

> To get a list of available commands, run `a0cli` (omitting all parameters).
