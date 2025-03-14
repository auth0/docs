---
description: How to install multiple instances of the connector for higher availability.
topics:
  - connector
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Deploy the Connector in a High Availability (HA) Environment

The connector is a critical component. Therefore we recommend a highly available deployment with redundancy (that is, installing multiple instances of it).

## How high availability helps

Each instance of the high-availability cluster will be always up and running and connected to Auth0. Auth0 will send login transactions and other requests to any of the available connectors.

If one of the instances fails because of a network or a hardware issue, Auth0 will redirect the login transactions to the other connector.

Having a highly available deployment also allows you to update the connector with zero downtime.

## Overview of the multiple-connector installation process

Installing multiple instances of the connector in a high-availability deployment involves:

- **A regular first-time installation.** This is where you provide the ticket URL that links the connector to a specific connection in your Auth0 tenant and other configuration parameters.
- **Making copies of the original installation and populating it to other servers.** This ensures that the same configuration and certificates securing communications are used in each instance.

::: note
The following instructions are for Windows/Linux users only.
:::

### Step 1. Setting up your first server

1. [Install the connector](/connector/install) on the first server. 
1. Once the connector is installed, configured, and working correctly on your first server, copy **config.json**, **lib/profileMapper.js** and everything in the **certs** folder from:
  -  *For Windows users*: **C:\Program Files (x86)\Auth0\AD LDAP Connector\**
  -  *For Linux users*: **/opt/auth0/ad-ldap**
1. Back up the files copied from the step above, since you will use them to configure the additional instances of the connector on your other server(s).

### Step 2. Setting up additional servers

1. [Install the connector](/connector/install) on the additional servers. **Do not configure the connector on the additional server yet.**
2. Replace the configuration files for your additional servers **with the files you saved from configuring your first server.** When done, you'll over overwritten the additional servers' **config.json** and **lib/profileMapper.js** files, as well as the **./certs/** folder.
3. Restart the **Auth0 ADLDAP** and **Auth0 ADLDAP** Admin Windows Services on the secondary servers.
4. Open the troubleshooting screen (accessible at **http://localhost:8357/#troubleshoot**) and run the troubleshooting test. Make sure all tests pass.

### Verify your connection

Once you've completed the installation process, you verify your installation using the **Connections** section of the Auth0 Dashboard. The AD Connection will have a green dot next to its name to indicate that it can use the connection successfully.

## Kerberos or certificate-based authentication considerations

If you enable [Kerberos](/connector/kerberos) or [client certificates](/connector/client-certificates) based authentication in your AD/LDAP connections, users will contact the connector directly instead of going through the Auth0 server.

In scenarios where multiple connector instances exist, we recommend fronting them with a network load balancer. The `SERVER_URL` parameter can be used to publish the public location where the connector will be listening to incoming requests. 

The `SERVER_URL` should be then mapped in the network load balancer to all internal instances of the deployed connectors. No special distribution policy is required (e.g., uniform round-robin, with no sticky sessions, works).
