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

# High availability (HA)

The connector is a very important component, therefore we recommend a highly available deployment through redundancy: installing multiple instances of it.

Each instance of the high-availability cluster will be always up and running, connected to Auth0. Auth0 will send login transactions and other requests to any of the available connectors.

If one of the instances fails either because of a network issue or hardware issue, Auth0 will redirect the login transactions to the other connector.

Having a highly available deployment also allows updating the connector with zero downtime.

## Overview of a the (HA) installation process

Installing multiple instances of the connector in a high-availability deployment involves:

- a regular first-time installation. This is where you provide the ticket URL that links the connector to a specific connection in your Auth0 tenant and other configuration parameters.
- making copies of this installation to other servers. This ensures that the same configuration and certificates used to secure communications are used in each instance.

## Instructions for Windows & Linux servers

### 1. First instance installation 

1. Install the connector on the first server as explained [here](/connector/install).
2. Make sure all steps are complete and the connector is up and running.
3. Once the first server is configured and working correctly with your Auth0 connector, copy **config.json**, **lib/profileMapper.js** and everything under the **certs** folder from:
  -  Windows: `C:\Program Files (x86)\Auth0\AD LDAP Connector\`
  -  Linux: `/opt/auth0/ad-ldap`
4. Backup the files copied from step 3, you will use them to configure the additional instances in the instructions below.

### 2. Additional instance installation 

1. Install the connector on the additional server as explained [here](/connector/install). **Do not configure the connector on the additional server yet.**
2. Using the configuration files backed up from the first server's installation (Section 1 - Step 3), replace the additional instance files with the backup copies (`config.json`, `lib/profileMapper.js`, `./certs/*` folder)
3. Restart the windows services (`Auth0 ADLDAP` and `Auth0 ADLDAP Admin`) on the additional instance.
4. Open the troubleshooting screen [http://localhost:8357/#troubleshoot] and run the troubleshooting test. Make sure all tests are passing. 
5. You're complete, you can verify on the `Connections` section within Auth0 management dashboard, the AD connection will be green to indicate a successful connection.

## Kerberos or certificate based authentication considerations

If you enable [Kerberos](/connector/kerberos) or [application certificates](/connector/application-certificates) based authentication in your AD/LDAP connections, users will contact the connector directly, instead of going through the Auth0 server. In these scenarios where multiple connector instances exist, we recommend fronting them with a network load balancer. The `SERVER_URL` parameter can be used to publish the public location where the connector will be listening to incoming requests. 

This URL should be then mapped in the network load balancer to all internal instances of the deployed connectors. No special distribution policy is required (for example, uniform round-robin, with no sticky sessions, should work).

