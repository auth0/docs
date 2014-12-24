# Updating the AD/LDAP Connector

If there are multiple instances of the AD/LDAP Connector in a deployment, it is recommended that the set of steps below be done to each instance, one at a time, so that only one instance is down at a time.

These are the steps to update the AD/LDAP Connector to the latest version:

###1. Verify the version you have installed

Hover over the Connector status indicator on the dashbaord:

![](https://cdn.auth0.com/docs/img/adldap-connector-version.png)

The tooltip will indicate the current status and the installed version.

The latest version of the AD/LDAP Connector is always available on the [GitHub repository](https://github.com/auth0/ad-ldap-connector/commits/master) or as [an installer](https://cdn.auth0.com/adldap.msi) for Windows based machines.

###2. Backup your current config

Before updating the connector backup these files from `%Program Files(x86)%\Auth0\AD LDAP Connector\`:

*  `config.json`
*  `certs`
*  `lib\profileMapper.js`

> The PATH above works for Windows based machines. Installations in other platforms will be located somewhere else, but contain the same assets.

###3. Download the latest version

Download and install the latest AD/LDAP Connector from [https://cdn.auth0.com/adldap.msi](https://cdn.auth0.com/adldap.msi).

Start the installer and follow the instructions.

###4. Restore files

Copy all the files from __Step 2__ into `%Program Files(x86)%\Auth0\AD LDAP Connector\`.

Restart the **"Auth0 AD LDAP"** service from the service console.
