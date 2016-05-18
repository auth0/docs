# Configuring and Using the Auth0 Appliance Command Line Interface

The Auth0 Appliance Command Line Interface (CLI) allows you to perform operations on your Appliance instances.

## Downloading the CLI Setup Files

To download the files required to set up the CLI, please contact your Auth0 Customer Success Manager for your custom download link.

Once you have downloaded and navigated into the main folder containing your files via your local command-line interface, run `node cli`. After setup is complete and prior to the first run, you will need to execute the command `npm -i` from within the directory that contains your CLI files.

## Installing and Using the CLI

Because the CLI sends commands to the server running on each Appliance's node, you must ensure that the server is both available and can accept inbound and outbound connections to port `10121`.

## Granting Access Rights to Users

Only workstations that you have authorized may perform operations on the Appliance.

To authorize a new workstation for use with the CLI:

1. Generate a key pair by running, in your local command-line tool, `a0cli create-key`. This outputs a public key, which is now associated with that particular workstation. You will also need to copy for this key to complete the next step.
2. Navigate to the CLI page of the Appliance configuration area, and add the key to your configuration. For additional information on how to do this, please see the [configuration instructions for Appliance CLIs](/dashboard/cli).

> Please note that any user on the workstation with access to the location where the key is stored locally will have access rights to perform operations on the Appliance.
