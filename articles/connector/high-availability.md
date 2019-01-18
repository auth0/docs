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

# High availability

The connector is a very important component, therefore we recommend a highly available deployment through redundancy: installing multiple instances of it.

Each instance of the high-availability cluster will be always up and running, connected to Auth0. Auth0 will send login transactions and other requests to any of the available connectors.

If one of the instances fails either because of a network issue or hardware issue, Auth0 will redirect the login transactions to the other connector.

Having a highly available deployment also allows updating the connector with zero downtime.

## Installing multiple instances

Installing multiple instances of the connector in a high-availability deployment involves:

- a regular first-time installation. This is where you provide the ticket URL that links the connector to a specific connection in your Auth0 tenant and other configuration parameters.
- making copies of this installation to other servers. This ensures that the same configuration and certificates used to secure communications are used in each instance.

### Instructions for Windows

1. Install the connector as explained [here](/connector/install).
2. Make sure all steps are complete and the connector is up and running.
3. Navigate to the Admin Console and export the configuration: [http://localhost:8357/#export](http://localhost:8357/#export)
4. Install the connector on a second server following the same instructions as above.
5. When prompted for the __Ticket URL__, go to the __Import / Export__ tab and import the configuration there.

![](/media/articles/connector/high-availability/connector-high-avail-console.png)

### Instructions for Linux

1. Install the connector as explained [here](/connector/install).
2. Make sure all steps are complete and the connector is up and running.
3. Copy **config.json**, **lib/profileMapper.js** and everything under the **certs** folder from:
  -  Windows: `C:\Program Files (x86)\Auth0\AD LDAP Connector\`
  -  Linux: `/opt/auth0/ad-ldap`

4. Install the connector on a second server following the same instructions as above. When prompted for the __Ticket URL__ close the dialog.
5. On the **second server**, overwrite the default files, `config.json`, `lib/profileMapper.js` and the files in `certs` directory, with the versions of those files from the **first server** that were copied/saved in step 3 above.
6. Restart the service on the second server.

## Kerberos or certificate based authentication considerations

If you enable [Kerberos](/connector/kerberos) or [application certificates](/connector/application-certificates) based authentication in your AD/LDAP connections, users will contact the connector directly, instead of going through the Auth0 server. In these scenarios where multiple connector instances exist, we recommend fronting them with a network load balancer. The `SERVER_URL` parameter can be used to publish the public location where the connector will be listening to incoming requests. 

This URL should be then mapped in the network load balancer to all internal instances of the deployed connectors. No special distribution policy is required (for example, uniform round-robin, with no sticky sessions, should work).

